import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Components/Header";
import Alert from './Components/Alert';
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import GenerateStory from "./Components/GenerateStory";
import StoryState from "./Context/StoryState";
import User from "./Components/User";



function App() {
  const key='mode';
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
      document.body.style.backgroundColor="white"
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
    <div 
      >
    <StoryState>
     <Router>
        <Header mode={mode} darkmode={darkmode} onSearch={handleSearch}/>
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home color={color} mode={mode} searchQuery={searchQuery}/>} />
          <Route exact path="/user" element={<User color={color} mode={mode} showalert={showalert} searchQuery={searchQuery}/>} />
          <Route exact path="/generatestory" element={<GenerateStory showalert={showalert} color={color} mode={mode}/>} />
          <Route exact path="/login" element={<Login color={color} mode={mode}/>} />
          <Route exact path="/signup" element={<Signup showalert={showalert} color={color} mode={mode}/>} />
        </Routes>
        <Footer color={color} mode={mode}/>
      </Router>
      </StoryState>
      </div>  );
}

export default App;
