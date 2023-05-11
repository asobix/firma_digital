import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import Layout from "../src/Layout/Layout";
import styled from "styled-components";
import Checkbox from '../src/Checkbox/Checkbox';
import { PiramideBrand } from "../src/Brands/PiramideBrand/PiramideBrand";
import { OceanicaBrand } from "../src/Brands/OceanicaBrand/OceanicaBrand";

const Button = styled.button`
  background: ${process.env.REACT_APP_COMPANY !== "OCEANICA"
    ? "red"
    : "#4abfaf"};
  color: white;
  border: none;
  padding: 15px;
  text-transform: capitalize;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
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
    const downloadLink = document.createElement("a");
    downloadLink.href = signature;
    downloadLink.download = "image.jpg";
    downloadLink.click();
  };

  const generateDigitalizationSignature = () => {
    const currentUrl = window.location.href;
		console.log(currentUrl);
		var url = new URL(currentUrl);
		var advisorCode = url.searchParams.get('id');
		console.log('advisorCode: ', advisorCode);
  }

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
    generateDigitalizationSignature()
  }, []);

  return (
    <>
      <Layout>
        <div
          className={
            process.env.REACT_APP_COMPANY !== "OCEANICA"
              ? "container-signature"
              : "container-signature-oceanica"
          }
        >
          <div>
            <div className="container-signature-limit">
              <div className="container-sigCanvas">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      lineHeight: "1rem",
                      position: "relative",
                    }}
                  >
                    {
                      process.env.REACT_APP_COMPANY !== 'OCEANICA' ? <PiramideBrand width="40%" height="40%" /> : <OceanicaBrand width="40%" height="40%" />
                    }
                    
                    <p style={{ fontFamily: "sans-serif" }}>
                      SEGUROS PIRAMIDE, C.A te da la bienvenida.
                    </p>
                    <p style={{ fontFamily: "sans-serif" }}>
                      Completa tu solicitud de póliza HCMI-001001-36660
                      confirmando la declaración
                    </p>
                    <p style={{ fontFamily: "sans-serif" }}>
                      Nombre Completo Titular: JOSE GREGORIO BADILLA GARCIA
                    </p>
                    <p style={{ fontFamily: "sans-serif" }}>
                      Cédula de Identidad: V-24554728-0
                    </p>
                    <p style={{ fontFamily: "sans-serif" }}>
                      Número de Póliza: HCMI-001001-36660
                    </p>
                    <p style={{ fontFamily: "sans-serif" }}>
                      Correo Electrónico: JOSEBADILLA03@GMAIL.COM
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      position: "relative",
                    }}
                  >
                    <p
                      style={{ fontFamily: "sans-serif", textAlign: "justify", textDecoration: 'underline' }}
                    >
                      Declaro bajo fe de juramento que:
                    </p>
                    <span style={{display: 'flex'}}>
                    <Checkbox/>
                    <p
                      style={{ fontFamily: "sans-serif", textAlign: "justify" }}
                    >
                      El dinero utilizado para el pago de la prima proviene de
                      una fuente ilícita y, por lo tanto, no tiene relación
                      alguna con fondos o recursos productos de actividades a
                      que se refiere la Ley Orgánica Contra la Delincuencia
                      Organizada y Financiamiento al Terrorismo
                    </p>
                    </span>
                    <span style={{display: 'flex'}}>
                    <Checkbox/>
                    <p
                      style={{ fontFamily: "sans-serif", textAlign: "justify" }}
                    >
                      La información suministrada es correcta y exacta, y no se
                      omite ningún hecho o circunstancia que pueda disminuir o
                      reducir la gravedad del riesgo, o alterar el análisis
                      correspondiente; por lo que cualquier omisión o
                      tergiversación en la información suministrada, o la falta
                      de remisión de los recaudos necesarios y exigidos por
                      Oceánica de Seguros, C.A./Pirámide de Seguros, C.A. podrá
                      dar lugar a la negativa de emisión de la póliza o
                      terminación del Contrato.
                    </p>
                    </span>
                   <span style={{display: 'flex'}}>
                   <Checkbox/>
                   <p
                      style={{ fontFamily: "sans-serif", textAlign: "justify" }}
                    >
                      Autorizo (amos) la verificación de la información
                      suministrada, así como para proveerla a terceros para
                      fines de la evaluación de riesgo y/o siniestros. La
                      presente Solicitud no otorga cobertura provisional, ni
                      implica compromiso de aceptar la cotización por parte del
                      Asegurador.
                    </p>
                   </span>
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <SignatureCanvas
                  ref={signatureRef}
                  className="sigCanvas"
                  penColor="black"
                  backgroundColor="rgba(255,255,255)"
                  canvasProps={{
                    className: "sigCanvas",
                  }}
                />
                </div>
               <div className="container-button">
              <Button onClick={handleClear}>Borrar firma</Button>
              <Button onClick={handleSave}>Guardar firma</Button>
            </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
