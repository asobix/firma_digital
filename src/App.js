import React, { useState, useEffect, useRef } from 'react';
// import logo from './logo.svg';
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import { Navbar } from "../src/Navbar/Navbar";
import { PiramideBrand } from "../src/Brands/PiramideBrand/PiramideBrand";
import LogoPiramide from './Image/icon_piramide.png'
import LogoOceanica from './Image/icon_oceanica.png'
import { OceanicaBrand } from '../src/Brands/OceanicaBrand/OceanicaBrand';
import styled from 'styled-components'

const Button = styled.button`
    background: ${process.env.REACT_APP_COMPANY !== 'OCEANICA' ? 'red' : '#4abfaf'} ;
    color: white;
    border: none;
    padding: 15px;
    text-transform: capitalize;
    border-radius: 5px;
    margin: 10px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    cursor: pointer;
`;

function App() {
  const signatureRef = useRef();
  const [firma, setFirma] = useState(null);

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    // const signature = signatureRef.current.getTrimmedCanvas().toDataURL();
    const signature = signatureRef.current.toDataURL();

    console.log(signature);
    const downloadLink = document.createElement('a');
    downloadLink.href = signature;
    downloadLink.download = 'image.jpg';
    downloadLink.click();
  };

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
  }, []);

  return (
    <>
      <Navbar brand={process.env.REACT_APP_COMPANY !== 'OCEANICA' ? <PiramideBrand width="85%" height="85%" /> : <OceanicaBrand width="85%" height="85%" />} />
      <div
        className={process.env.REACT_APP_COMPANY !== 'OCEANICA' ? "container-signature" : 'container-signature-oceanica'}
      >
        <div className="container-card">
          {/* <div className="card"> */}
            
            <div
             className="container-signature-limit"
            >
              <div
                className="container-sigCanvas"
              >
                <div className="container-logo">
                  <img src={process.env.REACT_APP_COMPANY !== 'OCEANICA' ? LogoPiramide : LogoOceanica} className="logo"/>
                </div>
                <SignatureCanvas
                  ref={signatureRef}
                  className="sigCanvas"
                  penColor="black"
                  backgroundColor='rgba(255,255,255)'
                  canvasProps={{
                    className: 'sigCanvas',
                  }}
                />
              </div>
            </div>
            <div className="container-button">
              <Button onClick={handleClear}>Borrar firma</Button>
              <Button onClick={handleSave}>Guardar firma</Button>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
