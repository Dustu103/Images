import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function Textextract() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      Tesseract.recognize(file, 'eng', { logger: (info) => console.log(info) }).then(({ data }) => {
        console.log(data.text);
        setText(data.text);
      });
    }
  };

  return (
    <div
      className="container-fluid mt-4 d-flex flex-column"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100%',
        padding: '20px',
        color: 'white',
      }}
    >
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-12 d-flex justify-content-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="form-control mb-4"
            style={{
              maxWidth: '300px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
            }}
          />
        </div>
        <div className="col-md-6 col-12 ml-4">
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="img-fluid"
              style={{
                margin: '0 50px',
                maxWidth: '100%',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </div>
        <div className="col-md-6 col-12">
          <div style={{ margin: '0 4px', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: 'lightblue' }}>Extracted Text:</h3>
            <textarea
              value={text}
              readOnly
              rows="10"
              className="form-control"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: '8px',
                padding: '10px',
                border: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Textextract;
