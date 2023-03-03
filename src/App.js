import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import SignatureCanvas from 'react-signature-canvas';

import { Navbar } from '../src/Navbar/Navbar';
import { PiramideBrand } from '../src/Brands/PiramideBrand/PiramideBrand';
import { OceanicaBrand } from '../src/Brands/OceanicaBrand/OceanicaBrand';

function App() {
  const signatureRef = useRef();
  const [firma, setFirma] = useState(null);

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
  }, []);

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const signature = signatureRef.current.toDataURL();
    console.log(signature);
    if (signature != firma) {
      alert('Firma guardada correctamente');
    } else {
      alert('Por favor Firme antes de guardar');
    }
  };

  return (
    <>
      <Navbar
        brand={
          // CONFIG.environment.company === 'PIRAMIDE' ? (
          <PiramideBrand width="85%" height="85%" />
          // ) : (
          //   <OceanicaBrand width="100%" height="100%" />
          // )
        }
      />
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
        className="container-signature"
      >
        <SignatureCanvas
          ref={signatureRef}
          className="sigCanvas"
          penColor="black"
          canvasProps={{
            className: 'sigCanvas',
          }}
        />
        <div>
          <button onClick={handleClear}>Borrar firma</button>
          <button onClick={handleSave}>Guardar firma</button>
        </div>
      </div>
    </>
  );
}

export default App;
