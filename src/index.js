import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider, Helmet as Head } from "react-helmet-async";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Head>
          <link rel="icon" href={`${process.env.PUBLIC_URL}${process.env.REACT_APP_UTL_HTML_FAVICON}`} />
          <title>{process.env.REACT_APP_HTML_TITLE}</title>
        </Head>
    <App />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
