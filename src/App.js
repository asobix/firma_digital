import React, { useState, useEffect, useRef } from "react";
// import logo from './logo.svg';
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import Button from "@mui/material/Button";
import { Navbar } from "../src/Navbar/Navbar";
import { PiramideBrand } from "../src/Brands/PiramideBrand/PiramideBrand";
import Logo from './Image/icon_piramide.png'
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
    if (signature != firma) {
      alert("Firma guardada correctamente");
    } else {
      alert("Por favor Firme antes de guardar");
    }
  };

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
  }, []);

  return (
    <>
      <Navbar brand={<PiramideBrand width="85%" height="85%" />} />
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
        }}
        className="container-signature"
      >
        <div
          style={{
            border: "2px solid red",
            width: "100%",
            height: "100%",
            display: "grid",
            placeContent: "center",
          }}
        >
          <div
            style={{
              width: "500px",
              height: "22rem",
              display: "grid",
              placeContent: "center",
              borderRadius: "1rem",
              background: "white",
            }}
          >
            <div className="container-logo">
                <img src={Logo} className="logo"/>
              </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  border: "2px solid #c4c7cf",
                  width: "350px",
                  height: "150px",
                  background: "white",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: '1rem'
                }}
              >
                <SignatureCanvas
                  ref={signatureRef}
                  className="sigCanvas"
                  penColor="black"
                  canvasProps={{
                    className: "sigCanvas",
                  }}
                />
              </div>
            </div>
            <div style={{marginTop: '2rem'}}>
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
