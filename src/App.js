import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

function App() {
  const [link, setLink] = useState('');
  const [qrData, setQrData] = useState('');
  const [error, setError] = useState(null);
  const qrRef = useRef(null); // Reference for the QRCode canvas element

  const handleInputChange = (event) => {
    setLink(event.target.value);
    setError(null); // Clear any previous errors
  };

  const handleGenerateQr = () => {
    try {
      // Use the user-provided link directly
      setQrData(link);  // Update QR code data with the user's input
    } catch (error) {
      setError(error.message || 'Error generating QR code');
    }
  };

  const downloadQRCodeAsImage = () => {
    const canvas = qrRef.current.querySelector('canvas'); // Get the canvas element reference
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png'); // Convert to PNG data URL

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'qr-code.png'; // Set filename

      // Simulate click without showing a visible link
      link.click();
    } else {
      console.error('QR code canvas not found!'); // Handle potential errors
    }
  };

  const downloadQRCodeAsPDF = () => {
    const canvas = qrRef.current.querySelector('canvas'); // Get the canvas element reference
    if (canvas) {
      html2canvas(canvas).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 180); // Add the image to the PDF
        pdf.save('qr-code.pdf'); // Save the PDF with a filename
      });
    } else {
      console.error('QR code canvas not found!'); // Handle potential errors
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <a href="https://aboutnikhildubey.netlify.app/" target="_blank" rel="noopener noreferrer">
      <button className="portfolio-button">Check my portfolio</button></a>
        <h1>QR Code Generator</h1>
        <p>Enter a valid URL to generate its QR code.</p>
       
      </header>
      <main className="App-main">
        <div className="input-container">
          <label htmlFor="link">Enter Link:</label>
          <input
            type="url"
            id="link"
            placeholder="https://example.com"
            value={link}
            onChange={handleInputChange}
          />
          <button onClick={handleGenerateQr}>Generate QR Code</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {qrData && (
          <div className="qr-code-container" ref={qrRef}>
            <QRCode value={qrData} size={256} level="H" />
            <br />
            <button className="download" onClick={downloadQRCodeAsImage}>Download QR Code as Image</button>
            <button className="download" onClick={downloadQRCodeAsPDF}>Download QR Code as PDF</button>
          </div>
        )}
      </main>
      <footer className="App-footer">
        <p className='footer'>Developed by Nikhil Dubey</p>
      </footer>
    </div>
  );
}

export default App;
