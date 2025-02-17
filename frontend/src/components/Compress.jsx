import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

function Compress() {
  const [image, setImage] = useState(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);
  const [maxSizeKB, setMaxSizeKB] = useState(1000); // Default max size in KB
  const [file, setFile] = useState(null); // Store the uploaded file

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setFile(file); // Store the file for later compression
    }
  };

  const handleSizeChange = (event) => {
    setMaxSizeKB(event.target.value);
  };

  const handleCompression = async () => {
    if (file) {
      try {
        const maxSizeMB = maxSizeKB / 1024;
        const options = {
          maxSizeMB: maxSizeMB,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const compressedUrl = URL.createObjectURL(compressedFile);
        setCompressedImageUrl(compressedUrl);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column"
      style={{
        height: '100%',
        backgroundImage: `url('/path/to/your/background/image.png')`, // Replace with actual path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        color: 'white',
      }}
    >
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-12 mb-3">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-12 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                }}
              />
            </div>
            <div className="col-lg-3 col-md-4 col-12 mb-2">
              <input
                type="number"
                min="10"
                step="10"
                value={maxSizeKB}
                onChange={handleSizeChange}
                className="form-control"
                placeholder="Max size in KB"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                }}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-12 mb-2 d-flex justify-content-center">
              <button
                onClick={handleCompression}
                className="btn btn-primary w-100"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                }}
              >
                Compress Image
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-5 col-12 mb-3 text-center">
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="img-fluid"
              style={{
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </div>

        <div className="col-md-5 col-12 mb-3 text-center">
          {compressedImageUrl && (
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '15px', borderRadius: '8px' }}>
              <h4 style={{ color: 'lightblue' }}>Compressed Image:</h4>
              <img
                src={compressedImageUrl}
                alt="Compressed"
                className="img-fluid mb-3"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                }}
              />
              <a
                href={compressedImageUrl}
                download="compressed-image.jpg"
                className="btn btn-primary"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                }}
              >
                Download Compressed Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Compress;
