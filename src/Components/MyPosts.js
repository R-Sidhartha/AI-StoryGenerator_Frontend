import React, { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import StoryContext from "../Context/StoryContext";
import Posts from './Posts.js';

export default function MyStories(props) {
  const { mode, color,sendDataToParent } = props;
  const context = useContext(StoryContext);
  const { getPosts,posts} = context;
  const [loading, setLoading] = useState(true); 

  // Get the JSON data from local storage
const userDataJSON = localStorage.getItem('userData');

// Parse the JSON data into a JavaScript object
const userData = JSON.parse(userDataJSON);

// Access the 'id' property from the userData object
const userId = userData._id;

  
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

  // useEffect(() => {
  //   // Calculate the length of posts and send it to the parent
  //   const postsLength = posts.length;

  //   // Use a callback function passed as a prop to send data to the parent
  //   sendDataToParent(postsLength);
  //   // eslint-disable-next-line
  // }, []);
  if (loading) {
    sendDataToParent(0)
  }else{
    sendDataToParent(posts.length);
  }

  const filterposts = posts.filter((post) =>
  post.genre.toLowerCase().includes(props.searchQuery?.toLowerCase() || '')
);


  return (
    <div>
          {loading  ? (
           <Spinner/>
          ) : 
          <div>
            <div className={`text-center my-3 posts ${posts.length===0 ? 'd-flex justify-content-center':''}`}>
            {// Show "NO NOTES TO DISPLAY" if there are no notes
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
             
            }
        </div>
      </div>
  }
    </div>
  );
}
