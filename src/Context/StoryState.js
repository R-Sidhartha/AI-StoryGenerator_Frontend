import StoryContext from "./StoryContext";
import { useState } from "react";

const StoryState = (props) => {
  const host = "https://fictionfusionai-server-8xm2.onrender.com"
  const StoryInitial = [];
  const initialPosts = []
//   const [notes, setNotes] = useState(notesInitial)
  const [stories, setStories] = useState(StoryInitial)
  const [posts,setPosts]=useState(initialPosts)

  // Get all Notes
  const getStories = async () => {
    // API Call 
    const response = await fetch(`${host}/api/story/stories`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('authtoken'),
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(),
    });
  
    const json= await response.json() 
      setStories(json)
   
  }

  // Add a Note
  const addStory = async (prompt,genre,content) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/story/addstory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authtoken'),

      },
      body: JSON.stringify({prompt,genre,content})
    });

    const story = await response.json();
    setStories(stories.concat(story))
  }

  // Delete a Note
  const deletestory = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/story/deletestory/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authtoken'),

      }
    });
    const json = response.json(); 
    console.log(json)
    const newStories = stories.filter((story) => { return story._id !== id })
    setStories(newStories)
  }
  const fetchStoryById = async (id) => {
    try {
      const response = await fetch(`${host}/api/story/stories/${id}`,{

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('authtoken'),

        }
      });
      const data = await response.json();
      setStories(data)
    } catch (error) {
      console.error("Error fetching note:", error);
      throw error;
    }
  };

  // Edit a Note
  const editstory = async (id,content) => {
  await fetch(`${host}/api/story/editstory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authtoken'),

      },
      body: JSON.stringify({content})
    });

     let newStories = JSON.parse(JSON.stringify(stories))
    // Logic to edit in client
    for (let index = 0; index < newStories.length; index++) {
      const element = newStories[index];
      if (element._id === id) {
        newStories[index].content = content;
        break; 
      }
    }  
    setStories(newStories);
  }
  const [user,setUser]=useState(
    {
      name:"",
      UserName:""
  }
    )

 const handleuser = async () => {
    // API Call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authtoken'),


      },
    });
    const json = await response.json();
    setUser(json)
    localStorage.setItem("userData", JSON.stringify(json));
  };

  const createPost = async(prompt,genre,content)=>{
    const response = await fetch(`${host}/api/posts/createpost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authtoken'),

      },
      body: JSON.stringify({prompt,genre,content})
    });

    const post = await response.json();
    console.log(post)
    setPosts(posts.concat(post))
  }

  const getPosts = async (userId) => {
    try {
      // API Call
      const response = await fetch(`${host}/api/posts/userposts/${userId}`, {
        method: 'GET',
        headers: {
          "auth-token": localStorage.getItem('authtoken'),
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching posts. Status: ${response.status}`);
      }
  
      const json = await response.json();
      setPosts(json);
    } catch (error) {
      console.error('Error fetching posts');
      // Handle the error, e.g., display an error message to the user
    }
  };
  const deletePost = async (id) => {
    try {
      // API Call
      const response = await fetch(`${host}/api/posts/deletepost/${id}`, {
        method: 'DELETE',
        headers: {
          "auth-token": localStorage.getItem('authtoken'),
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching posts. Status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      const newposts = posts.filter((post) => { return post._id !== id })
      setPosts(newposts)
    } catch (error) {
      console.error('Error deleting posts:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  // Create a function to upvote a story by its ID
const upvoteStory = async (postId) => {
  try {
    // Make a POST request to the upvote endpoint with the storyId
    const response = await fetch(`${host}/api/upvotes/posts/${postId}/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken'), 
      },
    });

    if (!response.ok) {
      throw new Error(`Error upvoting story. Status: ${response.status}`);
    }

    // Optionally, you can handle the response or perform other actions
    const data = await response.json();
    console.log(data.message); // Log the success message

    // Return any data you want to use in your component
    return data;
  } catch (error) {
    console.error('Error upvoting story:', error);
    // Handle the error, display an error message, or return false if needed
    return false;
  }
};

const fetchAllPosts = async () => {
  try {
    // Replace 'your_api_endpoint_here' with the actual API endpoint
    const response = await fetch(`${host}/api/posts/allposts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken'),
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    } else {
      console.error('Failed to fetch posts');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
  

  const clearstories=()=>{
    setStories([])
  }
 
  
  return (
    <StoryContext.Provider value={{ stories,getStories, addStory, deletestory, editstory,fetchStoryById,user,handleuser,clearstories,createPost,getPosts,posts,deletePost,upvoteStory,fetchAllPosts }}>
      {props.children}
    </StoryContext.Provider>
  )

}
export default StoryState;