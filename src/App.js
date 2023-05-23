import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import Layout from "Layout/Layout";
import styled from "styled-components";
// import Checkbox from "components/Checkbox/Checkbox";
import Checkbox from "@mui/material/Checkbox";

import { PiramideBrand } from "Brands/PiramideBrand/PiramideBrand";
// import { OceanicaBrand } from "../src/Brands/OceanicaBrand/OceanicaBrand";
import axios from "axios";
import { useBackdrop } from "Context/contextBackdrop";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import CONFIG from "Config/Config";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";

const ButtonCustom = styled(Button)`
  background: ${process.env.REACT_APP_COMPANY !== "OCEANICA"
    ? "red !important"
    : "#4abfaf !important"};
  color: white !important;
  border: none;
  padding: 15px;
  text-transform: capitalize;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const signatureRef = useRef();
  const [firma, setFirma] = useState(null);
  const [digitalInformation, setDigitalInformation] = useState(undefined);
  const [openTrue, setOpenTrue] = useState(false);
  const [openFalse, setOpenFalse] = useState(false);
  const [firmaServer, setFirmaServer] = useState()
  const [imageExist, setImageExist] = useState('')
  const [checkboxArrays, setCheckboxArrays] = useState([])

  const [newArrays, setNewArrays] = useState([])
  const { setOpenBackdrop } = useBackdrop();
  const { handleSubmit, ...objForm } = useForm();

  const name = digitalInformation?.nombre;
  const identification = digitalInformation?.cedula;
  const policy = digitalInformation?.poliza ;
  const email = digitalInformation?.correo ;

  const handleCloseTrue = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenTrue(false);
  };

  const handleCloseFalse = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFalse(false);
  };

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const handleSave = async () => {
    if (!signatureRef.current.isEmpty()) {
      const signature = signatureRef.current.toDataURL();
      const file = DataURIToBlob(signature);
      const formData = new FormData();
      formData.append("myFile", file, "image.jpg");
      setOpenBackdrop(true)
      const data = await axios.post(
        `${CONFIG.services.upload}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const response = data.data.url.split('/')[3]
      setFirmaServer(response)
      saveImageServer(response)
      conditionsSignature()
    } else {
      setOpenFalse(true);
    }
  };

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const getCustomerInformation = async () => {
    setOpenBackdrop(true);
    const currentUrl = window.location.href;
    var url = new URL(currentUrl);
    var idpol = url.searchParams.get("idpol");
    var numcert = url.searchParams.get("numcert");
    const data = await axios.post(
      `${CONFIG.services.getCustomerInformation}`,
      {
        id_policy: idpol,
        id_cert: numcert,
      }
    );
    // console.log(JSON.parse(data.data.result))
    setDigitalInformation(JSON.parse(data.data.result));
    setOpenBackdrop(false);
  };

  const serverImageExist = async () => {
    const data = await axios.post(
      `${CONFIG.services.serverImageExists}`,
      {
        name_image: firmaServer,
      }
    );
    setImageExist(data.data.result)
    if(imageExist == 'SI'){
      setOpenTrue(true);
      setOpenBackdrop(false)

    }else if(imageExist === undefined || imageExist === null){
      alert('No se pudo procesar la solicitud')
    }
    // console.log(data.data.result)
  };

  const saveImageServer = async (firma) => {
    const tipoid = digitalInformation.tipoid
    const numid = digitalInformation.numid
    const dvid = digitalInformation.dvid
    const data = await axios.post(
      `${CONFIG.services.saveImage}`,
      {
        ctipoid: tipoid,
        nnumid: numid,
        cdvid: dvid,
        carch_firma: firma,
      }
    );
  };

  const conditionsSignature = async () => {
    const tipoid = digitalInformation.tipoid
    const numid = digitalInformation.numid
    const dvid = digitalInformation.dvid
    const json = JSON.stringify(checkboxArrays)
    const data = await axios.post(`${CONFIG.services.conditions}`,{
      ctipoid: tipoid,
      nnumid: numid,
      cdvid: dvid,
      p_json_param: json
    })
  }

  function HandleArrayChecked(array,index) {
    return array.map((element,i) => {
      if(i <= index){
      return{
          codigo : element.CODIGO,
          checked : true
        }
      }
    }
    );
  }

  function HandleArrayUnChecked(array,index) {
    return []
  }

  const handleCheck = (isChecked, index) => {
  
    if (isChecked === true) {

      const arrayData = HandleArrayChecked(digitalInformation?.condiciones, index)
      setCheckboxArrays(arrayData)

      console.log(arrayData, 'arrayDataaa')
    }
    else {
      const arrayData = HandleArrayUnChecked(digitalInformation?.condiciones, index)
      setCheckboxArrays(arrayData)
    }
  }

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
    getCustomerInformation();
    serverImageExist()
  }, [firmaServer, imageExist]);
  // console.log(checkboxArrays)
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
                <div className="text-align">
                  {process.env.REACT_APP_COMPANY !== "OCEANICA" ? (
                    <PiramideBrand width="40%" height="40%" />
                  ) : (
                    <img
                      src={require("../src/Brands/OceanicaBrand/assets/images/Oceanica.png")}
                      alt="#"
                      style={{ width: "25%", height: "25%" }}
                    />
                  )}

                  {digitalInformation === undefined ? (
                    <></>
                  ) : (
                    <>
                      <p>{digitalInformation?.empresa === undefined ? null : digitalInformation?.empresa}</p>
                      <p>{digitalInformation?.solicitud === undefined ? null : digitalInformation?.solicitud}</p>
                      <p>
                        <strong>Nombre completo titular:</strong>
                        {name}
                      </p>
                      <p>
                        <strong>Cédula de identidad:</strong>
                        {identification}
                      </p>
                      <p>
                        <strong>Número de Póliza:</strong>
                        {policy}
                      </p>
                      <p>
                        <strong>Correo Electrónico:</strong>
                        {email.toLowerCase()}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: 'column'
                }}
              >
                <div className="text-greement-align">
                  <p
                    style={{
                      fontFamily: "sans-serif",
                      textAlign: "justify",
                      textDecoration: "underline",
                    }}
                  >
                    Declaro bajo fe de juramento que:
                  </p>

                  {digitalInformation?.condiciones?.map((item, i) => 
                  (
                        <>
                          <span style={{ display: "flex" }} key={i}>
                            <Checkbox
                            key={i}
                            onChange={(e) => handleCheck(e.target.checked, i)}
                            checked={checkboxArrays[i]?.checked === true ? true : false}
                            />
                            <p>{item.DESCRIP}</p>
                          </span>
                        </>
                      )
                  )}
                </div>
                <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  background: "#e7e9ec",
                  paddingTop: "0.5rem",
                  marginTop: "1rem",
                }}
              >
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
                <ButtonCustom variant="contained" onClick={handleClear}>Borrar firma</ButtonCustom>
                <ButtonCustom variant="contained" disabled={checkboxArrays.length >= 5 ? false : true}
                 onClick={
                  handleSave
                }>Guardar firma</ButtonCustom>
              </div>
              </div>

            </div>
          </div>
        </div>
        {!signatureRef?.current?.isEmpty() ? (
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={openTrue}
              autoHideDuration={2000}
              onClose={handleCloseTrue}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Alert
                onClose={handleCloseTrue}
                severity="success"
                sx={{ width: "100%" }}
              >
                Firma guardada de manera correcta!
              </Alert>
            </Snackbar>
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={openFalse}
              autoHideDuration={2000}
              onClose={handleCloseFalse}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Alert
                onClose={handleCloseFalse}
                severity="error"
                sx={{ width: "100%" }}
              >
                Debe llenar el campo de firma!
              </Alert>
            </Snackbar>
          </Stack>
        )}
      </Layout>
    </>
  );
}

export default App;
