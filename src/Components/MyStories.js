import React, { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import StoryContext from "../Context/StoryContext";
// import Notefolder from './Notefolder'
import Posts from './Posts.js';

export default function MyStories(props) {
  const { mode, color } = props;
  const context = useContext(StoryContext);
  const { getPosts,posts} = context;
  const [loading, setLoading] = useState(true); 

  // Get the JSON data from local storage
const userDataJSON = localStorage.getItem('userData');

// Parse the JSON data into a JavaScript object
const userData = JSON.parse(userDataJSON);

// Access the 'id' property from the userData object
const userId = userData._id;

// Use the 'userId' as needed
  
  // Fetch posts when userId is available
  useEffect(() => {
    if (userId !== null) { // Check if userId is available
      // Fetch posts
      getPosts(userId)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          // Handle any errors here and set loading to false
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [userId]);

  const filterposts = posts.filter((post) =>
  post.genre.toLowerCase().includes(props.searchQuery?.toLowerCase() || '')
);


  return (
    <div>
      <div>
        <div className="text-center my-3" style={{display:'grid',gridTemplateColumns:' 1fr 1fr',minHeight:'40vw'}}>
          {loading  ? (
           <Spinner/>// Replace with your spinner component
          ) : (
            // Show "NO NOTES TO DISPLAY" if there are no notes
            filterposts.length > 0 
              ? // Display the search results
               ( filterposts.map((post) => {
                  return (
                    <Posts
                      key={post._id}
                      post={post}
                      mode={mode}
                      color={color}
                    />
                    
                  );
                }) ||
                 posts.map((post) => {
                  return (
                    <Posts
                    key={post._id}
                    post={post}
                    mode={mode}
                    color={color}
                    />
                    );
                  })
               ):
             posts.length === 0 && "No Posts To DISPLAY"
            )} 
        </div>
      </div>
    </div>
  );
}
