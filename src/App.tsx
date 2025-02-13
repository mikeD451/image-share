import { useState, setStatus } from 'react'
import timenspace from './assets/timenspace.jpg'

import './App.css'
//import React from 'react'
import { DragEvent } from 'react' ;
import UploadFileToS3 from './UploadFileToS3' ;
// import dotenv from 'dotenv';
import { S3ClientConfig } from "@aws-sdk/client-s3";    




function App() {

//let returnCode = -1;
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
  const [status, setStatus] = useState({ type: ''})

  const [files, setFiles] = useState<File[]>([]);

  const [ selectedValue,setSelectedValue] = useState("poetry");
  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
 
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
            // const returnCode2 = await Upload();
          
            const returnCode = UploadFileToS3(awscreds, "imageshare", selectedValue + "/" + file.name, fileContent);
            
            
            console.log(`Return code ${returnCode}`)
            returnCode.then(value => {
              // const n = value;
              if(value === 0) {
                setStatus({ type: 'Success'})
                console.log("Return is a Success")
              } else {
                setStatus({ type: 'Error'})
                console.log("Return code not zero")
              }
            })   
           
          }
      };
      reader.onerror = (error) => {
          console.error("Error reading file", error);
          setStatus({ type: 'Error' });
      };
      reader.readAsArrayBuffer(file); 
      });
  };

  

  return (
    <>
      <div>
       
        
      <img src={timenspace} className="logo react" alt="React logo" />
        
      </div>
      <h1>Time and Space - Upload</h1>
      <p>Select upload file type</p>
      <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="poetry"
              checked={selectedValue === "poetry"}
              className="form-check-input"
              onChange={() =>
                handleRadioChange("poetry")
              }
            />
            Poetry
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="picture"
              className="form-check-input"
              checked={selectedValue === "picture"}
              onChange={() => handleRadioChange("picture")}
            />
            Picture
          </label>
        </div>

       
      <p className="read-the-docs">
        
      </p>
      <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        width: "300px",
        border: "1px dotted",
        backgroundColor: isOver ? "green" : "lightgray",
      }}
    >
      Drag and drop some files here
    </div>
    
    <div>
    {status?.type === 'Success' && (<p>"Success is uploading file"</p>)}
    {status?.type === 'Error' && (<p>"Error uploading file"</p>)}
    </div>
    </>
  )
}

export default App;