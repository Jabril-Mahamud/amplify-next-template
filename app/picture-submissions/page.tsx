'use client'
import React, { ChangeEvent, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected');
      return;
    }

    try {
      await uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      });
      setUploadStatus('Upload successful');
    } catch (error) {
      console.error('Upload failed', error);
      setUploadStatus('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default App;