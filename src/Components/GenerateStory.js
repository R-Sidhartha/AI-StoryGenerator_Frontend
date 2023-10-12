import React, { useContext, useState } from "react";
import StoryContext from "../Context/StoryContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
// require('dotenv').config();

function GenerateStory(props) {
  const context = useContext(StoryContext);
  const { addStory } = context;
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const generateStory = async () => {
    setIsLoading(true);
    const apiKey = props.openaiapikey;
    console.log(apiKey);
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `write a complete story with prompt ${prompt} in the ${genre} genre`,
          max_tokens: 2300,
          n: 1,
          stop: null,
          temperature: 1.0,
        }),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
      }

      const data = await response.json();
      setContent(data.choices[0].text);
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    addStory(prompt, genre, content);
    props.showalert("Story Saved", "success");
    navigate("/user"); // Redirect to the Notefolder component after adding the note
  };

  const inputstyle = {
    background: `${props.mode !== "dark" ? "rgba(41, 40, 40, 0.44)" : "white"}`,
    color: `${props.mode === "dark" ? "black" : "white"}`,
  };

  return (
    <div
      className="container my-3"
      style={{
        color: `${props.mode === "dark" ? "black" : "white"}`,
        minHeight: "110vh",
      }}
    >
      <h3 className="text-center">
        Create Your AI Story: Set the Prompt and Genre
      </h3>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="prompt">Prompt</label>
          <input
            type="text"
            className="form-control"
            id="prompt"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={inputstyle}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            placeholder="Comedy, Romantic, Suspence, Horror, Thriller, Drama, Fiction, Adventure ..."
            value={genre}
            onChange={(e) => setGenre(e.target.value.toLowerCase())}
            style={inputstyle}
            minLength={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          {isLoading ? (
            <Spinner /> 
          ) : (
            <textarea
              className="form-control"
              id="content"
              rows="17"
              value={content}
              style={inputstyle}
              readOnly={!isEditing} 
              onChange={(e) => {
                if (isEditing) {
                  setContent(e.target.value);
                }
              }}
            ></textarea>
          )}
        </div>
        <div className="btns d-flex justify-content-between">
          <div className="btn1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={generateStory}
              disabled={!genre || !prompt}
            >
              Generate Story
            </button>
          </div>
          <div className="btn2">
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={handleEdit}
              disabled={!content} // Disable the button if content is empty
            >
              Edit
            </button>
            <button
              type="submit"
              className="btn btn-success mx-1"
              disabled={!content}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default GenerateStory;
