import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import React from 'react'
import { DragEvent } from 'react' ;

function App() {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
 
  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };
 
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };
 
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
 
    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
 
    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      console.log("File is ", file.name, file.size, file.type);
      console.log(files);
    });
  };

  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Image Share system</h1>
    
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        width: "300px",
        border: "1px dotted",
        backgroundColor: isOver ? "lightgray" : "white",
      }}
    >
      Drag and drop some files here, Mike
    </div>
    </>
  )
}

export default App;