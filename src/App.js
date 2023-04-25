import React, { useState, useEffect, useRef } from 'react';
// import logo from './logo.svg';
import './App.css';
import SignatureCanvas from 'react-signature-canvas';
import Button from '@mui/material/Button';
import { Navbar } from '../src/Navbar/Navbar';
import { PiramideBrand } from '../src/Brands/PiramideBrand/PiramideBrand';
import Logo from './Image/icon_piramide.png';
// import { OceanicaBrand } from '../src/Brands/OceanicaBrand/OceanicaBrand';

function App() {
  const signatureRef = useRef();
  const [firma, setFirma] = useState(null);

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const signature = signatureRef.current.getTrimmedCanvas().toDataURL();
    console.log(signature);
    const downloadLink = document.createElement('a');
    downloadLink.href = signature;
    downloadLink.download = 'image.png';
    downloadLink.click();
  };

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
  }, []);

  return (
    <>
      <Navbar brand={<PiramideBrand width="85%" height="85%" />} />
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
        className="container-signature"
      >
        <div className="container-card">
          <div className="card">
            <div className="container-logo">
              <img src={Logo} className="logo" />
            </div>
            <div className="container-signature-limit">
              <div className="container-sigCanvas">
                <SignatureCanvas
                  ref={signatureRef}
                  className="sigCanvas"
                  penColor="black"
                  canvasProps={{
                    className: 'sigCanvas',
                  }}
                />
              </div>
            </div>
            <div className="container-button">
              <button onClick={handleClear}>Borrar firma</button>
              <button onClick={handleSave}>Guardar firma</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
