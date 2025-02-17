import React, { useState } from 'react';
import GIF from 'gif.js.optimized';
import { Spinner } from 'react-bootstrap';

function GifMaker() {
  const [image, setImage] = useState(null);
  const [speed, setSpeed] = useState(500);
  const [effect, setEffect] = useState('none');
  const [gifUrl, setGifUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const transparency = 0.9; // Adjustable transparency for text

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  const handleEffectChange = (event) => {
    setEffect(event.target.value);
  };

  const createGif = () => {
    if (!image) return;

    setLoading(true);

    const gif = new GIF({
      workers: 2,
      quality: 10,
      delay: speed,
      repeat: 0,
    });

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      const totalFrames = 30; // Number of frames in the GIF

      const effects = {
        none: (ctx, frame) => {},
        rotate: (ctx, frame) => {
          ctx.translate(img.width / 2, img.height / 2);
          ctx.rotate((frame * 2 * Math.PI) / totalFrames);
          ctx.translate(-img.width / 2, -img.height / 2);
        },
        zoom: (ctx, frame) => {
          const scale = 1 + 0.05 * Math.sin((frame / totalFrames) * 2 * Math.PI);
          ctx.translate(img.width / 2, img.height / 2);
          ctx.scale(scale, scale);
          ctx.translate(-img.width / 2, -img.height / 2);
        },
        colorShift: (ctx, frame) => {
          ctx.filter = `hue-rotate(${(frame * 360) / totalFrames}deg)`;
        },
        fade: (ctx, frame) => {
          ctx.globalAlpha = 1 - frame / totalFrames;
        },
        slide: (ctx, frame) => {
          ctx.translate((frame * canvas.width) / totalFrames, 0);
        },
      };

      for (let i = 0; i < totalFrames; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effects[effect](ctx, i);
        ctx.drawImage(img, 0, 0);
        gif.addFrame(canvas, { copy: true, delay: speed });
      }

      gif.on('finished', (blob) => {
        setGifUrl(URL.createObjectURL(blob));
        setLoading(false);
      });

      gif.render();
    };
  };

  return (
    <div className="container my-5 text-light" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-center mb-4" style={{ color: `rgba(255, 255, 255, ${transparency})` }}>GIF Maker</h1>
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label
            htmlFor="imageUpload"
            className="form-label"
            style={{ color: `rgba(255, 255, 255, ${transparency})` }}
          >
            Upload Image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="form-control"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label
            htmlFor="speed"
            className="form-label"
            style={{ color: `rgba(255, 255, 255, ${transparency})` }}
          >
            Animation Speed (ms per frame)
          </label>
          <input
            id="speed"
            type="number"
            min="100"
            step="100"
            value={speed}
            onChange={handleSpeedChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label
            htmlFor="effect"
            className="form-label"
            style={{ color: `rgba(255, 255, 255, ${transparency})` }}
          >
            Effect
          </label>
          <select
            id="effect"
            value={effect}
            onChange={handleEffectChange}
            className="form-select"
          >
            <option value="none">None</option>
            <option value="rotate">Rotate</option>
            <option value="zoom">Zoom</option>
            <option value="colorShift">Color Shift</option>
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
          </select>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <button
            onClick={createGif}
            className="btn btn-primary w-100"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${transparency})`,
              color: 'black',
              border: 'none',
            }}
          >
            Create GIF
          </button>
        </div>
      </div>
      {loading && (
        <div className="row mb-4">
          <div className="col-12 text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Creating GIF...</span>
            </Spinner>
          </div>
        </div>
      )}
      {gifUrl && (
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h4 style={{ color: `rgba(255, 255, 255, ${transparency})` }}>Download Your GIF:</h4>
            <a
              href={gifUrl}
              download="animated.gif"
              className="btn btn-success"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${transparency})`,
                color: 'black',
                border: 'none',
              }}
            >
              Download GIF
            </a>
            <br />
            <img src={gifUrl} alt="Your GIF" className="img-fluid mt-3" style={{ borderRadius: '8px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default GifMaker;
