import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Components/Header";
import Alert from './Components/Alert';
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import GenerateStory from "./Components/GenerateStory";
import StoryState from "./Context/StoryState";
import User from "./Components/User";
import clearskybg from './Components/pics/clearskybg.jpg'
import darkskybg from './Components/pics/darkskybg.avif'


function App() {
  const key='mode';
  const openaiapikey=process.env.REACT_APP_OPENAI_APIKEY
  const value=localStorage.getItem(key)
  const[alert,setalert]=useState(null)
  const[mode,setMode]=useState(()=>{
    if (value==='light'|| value===null) {
      return 'dark'
    }
    return 'light'
  }) // Set initial mode to "light" if no value found in local storage
  const[color,setcolor]=useState("black") // Set initial color to "black" if no value found in local storage

  document.body.style.backgroundColor=value==='dark'?'#060a14':'white'

  const darkmode=(e)=>{
    e.preventDefault()
    if (mode==='light') {
      setMode("dark")
      document.body.style.backgroundColor='white'
      setcolor('black')
      showalert('light mode is enabled','success')
    }
    else{
      setMode('light')
      document.body.style.backgroundColor='#060a14' 
      setcolor('white')
      showalert('dark mode is enabled','success')
    }
    localStorage.setItem("mode",mode)
  }
  const showalert=(message,type)=>{
    setalert({
         msg: message,
         type: type
    })
    setTimeout(()=>{
      setalert(null)
    },1000)
  }
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query in the parent component
  };

 
  return (
    <div style={{
      backgroundImage: value === "dark" ? `url(${darkskybg})` : `url(${clearskybg})`,
      // backgroundSize: "cover",
      backgroundRepeat: "repeat",
      overflow:'hidden'
      }}>    <StoryState>
     <Router>
        <Header mode={mode} darkmode={darkmode} onSearch={handleSearch}/>
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home color={color} mode={mode} searchQuery={searchQuery}/>} />
          <Route exact path="/user" element={<User color={color} mode={mode} showalert={showalert} searchQuery={searchQuery}/>} />
          <Route exact path="/generatestory" element={<GenerateStory showalert={showalert} color={color} mode={mode} openaiapikey={openaiapikey}/>} />
          <Route exact path="/login" element={<Login color={color} mode={mode}/>} />
          <Route exact path="/signup" element={<Signup showalert={showalert} color={color} mode={mode}/>} />
        </Routes>
      </Router>
      </StoryState>
      </div>  );
}

export default App;
