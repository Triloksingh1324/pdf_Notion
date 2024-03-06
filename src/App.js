import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import Cards from "./components/Cards";
 import Jptopdf from "./components/Jptopdf";
 import Merge from "./components/Merge";
 import Split from "./components/Split";
import PdfPageRemover from "./components/Remove";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App(props) {
  const [mode, setMode] = useState('light');
  

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'black';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element:<><Navbar  mode={mode} toggleMode={toggleMode}/><Cards mode={mode}/></>
    },
    {
      path: "/jpgtopdf",
      element:<><Navbar  mode={mode} toggleMode={toggleMode}/><Jptopdf mode={mode}/></>
    },
    {
      path: "/merge",
      element:<><Navbar  mode={mode} toggleMode={toggleMode}/><Merge mode={mode}/></>
    },
    {
      path: "/split",
      element:<><Navbar  mode={mode} toggleMode={toggleMode}/><Split mode={mode}/></>
    },
    {
      path: "/removepage",
      element:<><Navbar  mode={mode} toggleMode={toggleMode}/><PdfPageRemover mode={mode}/></>
    },
  ]);
  
  


  return (
  <>
        
        
      
        <RouterProvider router={router} />
       
  </>
  );
}
export default App;
