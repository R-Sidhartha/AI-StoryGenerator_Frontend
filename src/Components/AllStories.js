import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import StoryContext from "../Context/StoryContext";
import Stories from "./Stories";
// import Notefolder from './Notefolder'

export default function AllStories(props) {
  const { mode, color,showalert } = props;
  const context = useContext(StoryContext);
  const { getStories,stories,clearstories } = context;
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login");
    } else {
        // Fetch notes
        clearstories()
        getStories()
        .then(() => {
          setLoading(false);
          
        })
        .catch((error) => {
          // Handle any errors here and set loading to false
          console.error("Error fetching stories:", error);
          setLoading(false);
          
        });
    }
    // eslint-disable-next-line
  }, []);

  const filterstories = stories.filter(
    (story) =>
      story.genre.toLowerCase().includes(props.searchQuery?.toLowerCase() || '') ||
      story.content.toLowerCase().includes(props.searchQuery?.toLowerCase() || '')
  );
  

  return (
    <div>
      <div>
        <div className=" text-center my-3" style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
          {loading  ? (
           <Spinner/>// Replace with your spinner component
          ) : (
            // Show "NO NOTES TO DISPLAY" if there are no notes
            filterstories.length > 0 
              ? // Display the search results
               ( filterstories.map((story) => {
                  return (
                    <Stories
                      key={story._id}
                      story={story}
                      mode={mode}
                      showalert={showalert}
                      color={color}
                    />
                  );
                }) ||
                 stories.map((story) => {
                  return (
                    <Stories
                    key={story._id}
                    story={story}
                    mode={mode}
                    showalert={showalert}
                    color={color}
                    />
                    );
                  })
               ):
             stories.length === 0 && "NO Stories TO DISPLAY"
            )} 
        </div>
      </div>
    </div>
  );
}
