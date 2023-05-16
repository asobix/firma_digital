import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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

