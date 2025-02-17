import React, { useState, useRef } from 'react';

function ImageWatermarkTool() {
  const [image, setImage] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [position, setPosition] = useState("bottom-right");
  const [size, setSize] = useState(50);
  const [transparency, setTransparency] = useState(0.5);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleWatermarkUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setWatermarkImage(url);
    }
  };

  const drawWatermark = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = transparency;

      if (watermarkImage) {
        const watermarkImg = new Image();
        watermarkImg.src = watermarkImage;

        watermarkImg.onload = () => {
          const watermarkWidth = (img.width * size) / 100;
          const watermarkHeight = (watermarkImg.height * watermarkWidth) / watermarkImg.width;

          let x, y;
          switch (position) {
            case 'top-left':
              x = 10;
              y = 10 + watermarkHeight;
              break;
            case 'top-right':
              x = img.width - watermarkWidth - 10;
              y = 10 + watermarkHeight;
              break;
            case 'bottom-left':
              x = 10;
              y = img.height - 10;
              break;
            case 'bottom-right':
              x = img.width - watermarkWidth - 10;
              y = img.height - 10;
              break;
            case 'center':
              x = (img.width - watermarkWidth) / 2;
              y = (img.height + watermarkHeight) / 2;
              break;
            default:
              x = img.width - watermarkWidth - 10;
              y = img.height - 10;
          }

          ctx.drawImage(watermarkImg, x, y - watermarkHeight, watermarkWidth, watermarkHeight);
        };
      } else if (watermarkText) {
        ctx.font = `${size}px Arial`;
        ctx.fillStyle = `rgba(255, 255, 255, ${transparency})`;

        let x, y;
        switch (position) {
          case 'top-left':
            x = 10;
            y = size;
            break;
          case 'top-right':
            x = img.width - ctx.measureText(watermarkText).width - 10;
            y = size;
            break;
          case 'bottom-left':
            x = 10;
            y = img.height - 10;
            break;
          case 'bottom-right':
            x = img.width - ctx.measureText(watermarkText).width - 10;
            y = img.height - 10;
            break;
          case 'center':
            x = (img.width - ctx.measureText(watermarkText).width) / 2;
            y = (img.height + size) / 2;
            break;
          default:
            x = img.width - ctx.measureText(watermarkText).width - 10;
            y = img.height - 10;
        }

        ctx.fillText(watermarkText, x, y);
      }
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'watermarked-image.jpg';
    link.click();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{  marginBottom: '20px', fontSize: '24px', textAlign: 'center', color: `rgba(255, 255, 255, ${transparency})` }}>Image Watermarking Tool</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: '1' }}>
          <label htmlFor="imageUpload" style={{ fontWeight: 'bold', color: `rgba(255, 255, 255, ${transparency})`, marginBottom: '8px', display: 'block' }}>Upload Image</label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', color: `rgba(255, 255, 255, ${transparency})` }}
          />
        </div>
        <div style={{ flex: '1' }}>
          <label htmlFor="watermarkUpload" style={{ fontWeight: 'bold', color: `rgba(255, 255, 255, ${transparency})`, marginBottom: '8px', display: 'block' }}>Upload Watermark Image (Optional)</label>
          <input
            id="watermarkUpload"
            type="file"
            accept="image/*"
            onChange={handleWatermarkUpload}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', color: `rgba(255, 255, 255, ${transparency})` }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <input
          type="text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="Enter watermark text"
          style={{ flex: '1', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', color: '#555', backgroundColor: '#f8f9fa' }}
        />
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ flex: '1', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', color: '#333', backgroundColor: '#f8f9fa' }}
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="center">Center</option>
        </select>
      </div>
      <button onClick={drawWatermark} style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>Apply Watermark</button>
      { image && <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#f0f4f8', padding: '20px', borderRadius: '12px' }}>
         <canvas ref={canvasRef} style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} />
      </div> }
      <button onClick={handleDownload} style={{ marginTop: '20px', width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>Download Watermarked Image</button>
    </div>
  );
}

export default ImageWatermarkTool;
