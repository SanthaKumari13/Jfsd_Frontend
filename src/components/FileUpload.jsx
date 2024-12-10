import React, { useState } from "react";
import { uploadCSVFile } from "../services/api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    try {
      const response = await uploadCSVFile(file);
      setMessage(response);
    } catch (error) {
      setMessage(error.message || "Error uploading file.");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload CSV File</h2>
      <div className="file-upload-form">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-button">Upload CSV</button>
        {message && <p className="message">{message}</p>}
      </div>

      <style>{`
        .file-upload-container {
          background-color: #f9f9f9;
          padding: 40px;
          border-radius: 8px;
          width: 80%;
          max-width: 600px;
          margin: 50px auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          font-size: 1.8rem;
          color: #6200ea;
          margin-bottom: 20px;
        }

        .file-upload-form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        input[type="file"] {
          margin-bottom: 20px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          width: 100%;
          max-width: 400px;
        }

        .upload-button {
          background-color: #6200ea;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .upload-button:hover {
          background-color: #3700b3;
        }

        .message {
          margin-top: 20px;
          text-align: center;
          font-size: 1rem;
          color: #4caf50;
        }

        .message.error {
          color: #f44336;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
