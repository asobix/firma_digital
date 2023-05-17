import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import Layout from "../src/Layout/Layout";
import styled from "styled-components";
import Checkbox from '../src/Checkbox/Checkbox';
import { PiramideBrand } from "../src/Brands/PiramideBrand/PiramideBrand";
// import { OceanicaBrand } from "../src/Brands/OceanicaBrand/OceanicaBrand";
import axios from 'axios'

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
  const [digitalInformation, setDigitalInformation] = useState(undefined)

  const name = digitalInformation?.nombre?.split(':')
  const identification = digitalInformation?.cedula?.split(':')
  const policy = digitalInformation?.poliza?.split(':')
  const email = digitalInformation?.correo?.split(':')

  const handleClear = () => {
    signatureRef.current.clear();
  };

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  const handleSave = async () => {
    // const signature = signatureRef.current.getTrimmedCanvas().toDataURL();

    if (!signatureRef.current.isEmpty()) {
      const signature = signatureRef.current.toDataURL();
      const file = DataURIToBlob(signature)
      const formData = new FormData();
      formData.append('myFile', file, 'image.jpg') 
      console.log(signature)
      const data = await axios.post(`http://dev-segurospiramide.com/digitalizationImage/upload`,formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      })
      alert('Firma guardada')
    } else {
      alert('Debe registrar su firma para continuar')
      return
    }

  };

  

  const generateDigitalizationSignature = () => {
    const currentUrl = window.location.href;
		var url = new URL(currentUrl);
		var idpol = url.searchParams.get('idpol');
    var numcert = url.searchParams.get('numcert');
  }

  const getCustomerInformation = async ()  => {
    const data = await axios.post(`http://dev-segurospiramide.com/asg-api/dbo/digital_signature/get_customer_information`,{
      id_policy: 1783248,
      id_cert: 1,
    })
    setDigitalInformation(JSON.parse(data.data.result))
  }

  const serverImageExist = async () => {
    const data = await axios.post(`http://dev-segurospiramide.com/asg-api/dbo/digital_signature/server_image_exists`,{
      name_image: ''
    })
  }

  const saveImageServer = async () => {
    const data = await axios.post(`http://dev-segurospiramide.com/asg-api/dbo/digital_signature/save_image`,{
      ctipoid: '',
      nnumid: 28441014,
      cdvid: '',
      carch_firma: ''
    })
  }

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
    generateDigitalizationSignature()
    getCustomerInformation()
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
                    className="text-align"
                  >
                    {
                      process.env.REACT_APP_COMPANY !== 'OCEANICA' ? <PiramideBrand width="40%" height="40%" /> : <img src={require('../src/Brands/OceanicaBrand/assets/images/Oceanica.png')} alt="#" style={{width: '25%', height: '25%'}}/>
                    }
                    
                    {digitalInformation === undefined ?  <></> : 
                    <>
                    <p>
                      {digitalInformation.empresa}
                    </p>
                    <p>
                      {digitalInformation.solicitud}
                    </p>
                    <p>
                      <strong>{name[0]}:</strong>{name[1]}
                    </p>
                    <p>
                     <strong>{identification[0]}:</strong>{identification[1]}
                    </p>
                    <p>
                     <strong>{policy[0]}:</strong>{policy[1]}
                    </p>
                    <p>
                     <strong>{email[0]}:</strong>{email[1].toLowerCase()}
                    </p>
                    </>
                    }
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
                    className="text-greement-align"
                  >
                    <p
                      style={{ fontFamily: "sans-serif", textAlign: "justify", textDecoration: 'underline' }}
                    >
                      Declaro bajo fe de juramento que:
                    </p>
                    
                    {
                      digitalInformation?.condiciones?.map((item,i)=>(
                        <>
                        <span style={{display: 'flex'}} key={i}>
                        <Checkbox />
                    <p 
                    >
                     {item.DESCRIP}
                    </p>
                    </span>
                        </>
                      ))
                    }
                  
                  </div>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center', background: '#e7e9ec', paddingTop: '0.5rem', marginTop: '1rem'}}>
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
      </Layout>
    </>
  );
}

export default App;
