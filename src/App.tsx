import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import React from 'react'
import { DragEvent } from 'react' ;
import UploadFileToS3 from './UploadFileToS3' ;
// import dotenv from 'dotenv';
import { S3ClientConfig } from "@aws-sdk/client-s3";    




function App() {

const awskey = import.meta.env.VITE_ACCESS_KEY_ID
const secret = import.meta.env.VITE_SECRET_ACCESS_KEY

const awscreds: S3ClientConfig = {
    region: "eu-west-2",
    credentials: {
        accessKeyId: awskey , 
        secretAccessKey: secret
    }
};
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
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        if (fileContent) {
            UploadFileToS3(awscreds, "imageshare", file.name, fileContent);
        }
      };
      reader.onerror = (error) => {
          console.error("Error reading file", error);
      };
      reader.readAsArrayBuffer(file); 
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