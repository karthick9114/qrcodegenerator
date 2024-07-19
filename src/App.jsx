import { useState } from "react";

function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrdata] = useState("");
  const [qrSize, setQrsize] = useState("");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error('Error generating QR code',error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error)=>{
        console.log("Error Downloading QR code",error);
      });
  }

  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1><br />
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className="image" alt="Generated QR Code" />}
      <div>
        <label htmlFor="datainput" className='input-label'>Data for QR code:</label>
        <input
          type="text"
          id="datainput"
          disabled={loading}
          placeholder='Enter data for QR code'
          value={qrData}
          onChange={(e) => setQrdata(e.target.value)}
        />
        <label htmlFor="sizeinput" className='input-label'>Image size (e.g., 150):</label>
        <input
          type="number"
          value={qrSize}
          id="sizeinput"
          placeholder='Enter the size'
          onChange={(e) => setQrsize(e.target.value)}
        />
        <br />
        <button className="generateButton" onClick={generateQR}>Generate QR code</button>
        <button className="downloadButton" onClick={downloadQR}>Download QR code</button>
      </div>
    </div>
  );
}

export default App;
