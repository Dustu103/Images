import React, { useState } from 'react';
import '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackgroundRemover = () => {
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [resultImage, setResultImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleBackgroundChange = (e) => setBackgroundImage(e.target.files[0]);

  const handleRemoveBackground = async () => {
    if (image && backgroundImage) {
      setLoading(true);
      const net = await bodyPix.load();
      const img = document.createElement('img');
      img.src = URL.createObjectURL(image);
      img.onload = async () => {
        const segmentation = await net.segmentPerson(img);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
          if (!segmentation.data[i / 4]) pixels[i + 3] = 0;
        }
        ctx.putImageData(imageData, 0, 0);

        const bgImg = document.createElement('img');
        bgImg.src = URL.createObjectURL(backgroundImage);
        bgImg.onload = () => {
          const finalCanvas = document.createElement('canvas');
          finalCanvas.width = bgImg.width;
          finalCanvas.height = bgImg.height;
          const finalCtx = finalCanvas.getContext('2d');
          finalCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
          const drawHeight = bgImg.height;
          const drawWidth = (canvas.width / canvas.height) * bgImg.height;
          const xOffset = (bgImg.width - drawWidth) / 2;
          finalCtx.drawImage(canvas, xOffset, 0, drawWidth, drawHeight);
          setResultImage(finalCanvas.toDataURL());
          setLoading(false);
        };
      };
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'updated_image.png';
    link.click();
  };

  return (
    <div className="container my-5 text-white">
      <h1 className="text-center mb-4">Background Remover</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="imageUpload" className="form-label">Upload Foreground Image</label>
          <input id="imageUpload" type="file" onChange={handleImageChange} className="form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="backgroundUpload" className="form-label">Upload Background Image</label>
          <input id="backgroundUpload" type="file" onChange={handleBackgroundChange} className="form-control" />
        </div>
      </div>
      <div className="mb-4">
        <button className="btn btn-primary w-100" onClick={handleRemoveBackground} disabled={!image || !backgroundImage}>
          Crop and Place on Background
        </button>
      </div>
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row">
        {image && (
          <div className="col-md-4 mb-4">
            <h4>Input Image</h4>
            <img src={URL.createObjectURL(image)} alt="Input" className="img-fluid rounded" />
          </div>
        )}
        {backgroundImage && (
          <div className="col-md-4 mb-4">
            <h4>Background Image</h4>
            <img src={URL.createObjectURL(backgroundImage)} alt="Background" className="img-fluid rounded" />
          </div>
        )}
        {resultImage && (
          <div className="col-md-4 mb-4">
            <h4>Result Image</h4>
            <img src={resultImage} alt="Result" className="img-fluid rounded" />
            {resultImage && (
              <button className="btn btn-success mt-3 w-100" onClick={handleDownload}>
                Download Image
              </button>
            )}
          </div>
        )}
      </div>
      <style jsx="true">{`
        body {
          background-color: #1c1c1c;
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Arial', sans-serif;
        }

        h1, h4 {
          color: rgba(255, 255, 255, 0.9);
        }

        label {
          color: rgba(255, 255, 255, 0.8);
        }

        img {
          max-height: 200px;
          object-fit: contain;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .spinner-border {
          width: 3rem;
          height: 3rem;
        }
      `}</style>
    </div>
  );
};

export default BackgroundRemover;
