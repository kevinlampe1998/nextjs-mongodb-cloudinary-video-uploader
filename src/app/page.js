'use client';

import { useState } from 'react';

export default function UploadVideo() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setVideo(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleUpload = async () => {
    if (!video) return alert('Bitte wähle ein Video aus');

    setUploading(true);
    try {
      const response = await fetch('/backend/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: preview }),
      });

      const result = await response.json();
      if (result.success) {
        setUploadedVideo(result.video.url);
      } else {
        alert('Fehler beim Hochladen');
      }
    } catch (error) {
      console.error('Upload Error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h2>Video hochladen</h2>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      {preview && <video src={preview} controls width="300" />}
      
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Hochladen...' : 'Video hochladen'}
      </button>

      {uploadedVideo && (
        <div>
          <h3>Hochgeladenes Video:</h3>
          <video src={uploadedVideo} controls width="400" />
        </div>
      )}
    </div>
  );
}
