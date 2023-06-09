import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import Layout from "Layout/Layout";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import { red, blue } from "@mui/material/colors";
import ReCAPTCHA from "react-google-recaptcha";

import { PiramideBrand } from "Brands/PiramideBrand/PiramideBrand";
import axios from "axios";
import { useBackdrop } from "Context/contextBackdrop";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import CONFIG from "Config/Config";
import Button from "@mui/material/Button";
import registerStyles from "styles/registerStyle";
// import { useForm } from "react-hook-form";

const ButtonCustom = styled(Button)`
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

const NewDiv = styled("div")(({ theme }) => {
  return { ...registerStyles.tCenter };
});

const NewReCAPTCHA = styled(ReCAPTCHA)(({ theme }) => {
  return { ...registerStyles.gRecaptcha };
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const signatureRef = useRef();
  const [firma, setFirma] = useState(null);
  const [digitalInformation, setDigitalInformation] = useState(undefined);
  const [openTrue, setOpenTrue] = useState(false);
  const [openFalse, setOpenFalse] = useState(false);
  const [firmaServer, setFirmaServer] = useState();
  const [imageExist, setImageExist] = useState("");
  const [checkboxArrays, setCheckboxArrays] = useState([]);
  const [reCaptcha, setReCaptcha] = useState('')
  const captchaRef = useRef(null)
  
  const handleSubmit = (e) =>{
    setReCaptcha(e)
}

  const { setOpenBackdrop } = useBackdrop();

  const name = digitalInformation?.nombre;
  const identification = digitalInformation?.cedula;
  const policy = digitalInformation?.poliza;
  const email = digitalInformation?.correo;
  const date = digitalInformation?.fecemi;

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
    try {
      if (!signatureRef.current.isEmpty()) {
        const signature = signatureRef.current.toDataURL();
        const file = DataURIToBlob(signature);
        const formData = new FormData();
        formData.append("myFile", file, "image.jpg");
        const data = await axios.post(`${CONFIG.services.upload}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const response = data.data.url.split("/")[3];
        setFirmaServer(response);
        saveImageServer(response);
        conditionsSignature();
        updateForm();

      } else {
        setOpenFalse(true);
      }
    } catch (error) {
      console.log(error)
    }
   
  };

  const updateForm = async () => {
    try {
      setOpenBackdrop(true)
      const currentUrl = window.location.href;
      var url = new URL(currentUrl);
      var idpol = parseInt(url.searchParams.get("idpol"));
      var numcert = parseInt(url.searchParams.get("numcert"));
      const params = {
        id_policy: idpol,
        id_cert: numcert,
      };
      const data = await axios.post(`${CONFIG.services.updateForm}`, params);

      if (imageExist == "SI" || data.data.result == 'OK') {
        setOpenTrue(true);
        setTimeout(() => {
          window.location.reload(false);
        }, "3000");
      } else if (imageExist === undefined || imageExist === null) {
        alert("No se pudo procesar la solicitud");
      }
      setOpenBackdrop(false)
    } catch (error) {
      console.log(error);
    }

  };

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const getCustomerInformation = async () => {
    try {
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
      setDigitalInformation(JSON.parse(data.data.result));
      setOpenBackdrop(false);
    } catch (error) {
      console.log(error);
    }
  };

  const serverImageExist = async () => {
    try {
      const data = await axios.post(`${CONFIG.services.serverImageExists}`, {
        name_image: firmaServer,
      });
      setImageExist(data.data.result);
    } catch (error) {
      console.log(error);
    }

  };

  const saveImageServer = async (firma) => {
    try {
      const tipoid = digitalInformation.tipoid;
      const numid = digitalInformation.numid;
      const dvid = digitalInformation.dvid;
      const data = await axios.post(`${CONFIG.services.saveImage}`, {
        ctipoid: tipoid,
        nnumid: numid,
        cdvid: dvid,
        carch_firma: firma,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (isChecked, item) => {
    if (isChecked === true) {
      const arrayData = [...checkboxArrays, item];

      setCheckboxArrays(arrayData);
    } else {
      const arrayData = checkboxArrays.filter((e) => e.CODIGO !== item.CODIGO);
      setCheckboxArrays(arrayData);
    }
  };

  const conditionsSignature = async () => {
    try {
      const tipoid = digitalInformation.tipoid;
      const numid = digitalInformation.numid;
      const dvid = digitalInformation.dvid;
      const dataRecorrido = checkboxArrays.map((item) => {
        return {
          CODIGO: item.CODIGO,
        };
      });

      const valor = {
        condiciones: dataRecorrido,
      };

      const params = {
        ctipoid: tipoid,
        nnumid: numid,
        cdvid: dvid,
        p_json_param: JSON.stringify(valor),
      };

      const data = await axios.post(`${CONFIG.services.conditions}`, params);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checkboxArrays.length === 5) {
      signatureRef.current.on();
    } else {
      signatureRef.current.clear();
      signatureRef.current.off();
    }
  }, [checkboxArrays]);

  useEffect(() => {
    setFirma(signatureRef.current.toDataURL());
    serverImageExist();
  }, [firmaServer, imageExist]);

  useEffect(()=> {
    getCustomerInformation();
  },[])
  // console.log(reCaptcha);
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
                  {digitalInformation === undefined ? (
                    <></>
                  ) : (
                    <>
                      <p>
                        {digitalInformation?.empresa === undefined
                          ? null
                          : digitalInformation?.empresa}
                      </p>
                      <p>
                        {digitalInformation?.solicitud === undefined
                          ? null
                          : digitalInformation?.solicitud}
                      </p>
                      <div>
                        <p>
                          <strong>Nombre completo del titular: </strong>
                        </p>
                        <p>{name}</p>
                      </div>
                      <div>
                        <p>
                          <strong>Cédula de identidad: </strong>
                        </p>
                        <p>{identification}</p>
                      </div>
                      <div>
                        <p>
                          <strong>Número de Póliza: </strong>
                        </p>
                        <p>{policy}</p>
                      </div>
                      <div>
                        <p>
                          <strong>Correo Electrónico: </strong>
                        </p>
                        <p>{email === undefined ? "" : email.toLowerCase()}</p>
                      </div>
                      <div>
                        <p>
                          <strong>Fecha de emisión: </strong>
                        </p>
                        <p>{date}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <div className="text-greement-align">
                  <p
                    style={{
                      fontFamily: "sans-serif",
                      textAlign: "justify",
                      textDecoration: "underline",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Declaro bajo fe de juramento que:
                  </p>

                  {digitalInformation?.condiciones?.map((item, i) => (
                    <>
                      <span style={{ display: "flex" }} key={i}>
                        <Checkbox
                          key={i}
                          onChange={(e) => handleCheck(e.target.checked, item)}
                          sx={{
                            color:
                              process.env.REACT_APP_COMPANY !== "OCEANICA"
                                ? red[600]
                                : blue[600],
                            "&.Mui-checked": {
                              color:
                                process.env.REACT_APP_COMPANY !== "OCEANICA"
                                  ? red[600]
                                  : blue[600],
                            },
                          }}
                        />
                        <p>{item.DESCRIP}</p>
                      </span>
                    </>
                  ))}
                </div>
                <NewDiv>
                  <NewReCAPTCHA
                    ref={captchaRef}
                    // sitekey={captchaKey}
                    sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                    onChange={handleSubmit}
                  />
                </NewDiv>
             
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
                    maxWidth={1.1}
                    backgroundColor="rgba(255,255,255)"
                    canvasProps={{
                      className: "sigCanvas",
                    }}
                  />
                </div>
                {
                  reCaptcha !== '' && (
                    <>
                    <div className="container-button">
                  <ButtonCustom
                    variant="contained"
                    color={
                      process.env.REACT_APP_COMPANY !== "OCEANICA"
                        ? "error"
                        : "info"
                    }
                    onClick={handleClear}
                  >
                    Borrar firma
                  </ButtonCustom>
                  <ButtonCustom
                    color={
                      process.env.REACT_APP_COMPANY !== "OCEANICA"
                        ? "error"
                        : "info"
                    }
                    variant="contained"
                    disabled={checkboxArrays.length < 5 ? true : false}
                    onClick={handleSave}
                  >
                    Guardar firma
                  </ButtonCustom>
                </div>
                </>
                  )
                }
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
