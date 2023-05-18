import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider, Helmet as Head } from "react-helmet-async";
import { BackDropProvider } from "../src/Context/contextBackdrop";
import CONFIG from 'Config/Config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<BackDropProvider>
    <HelmetProvider>
    <Head>
          <link rel="icon" href={CONFIG.environment.htmlFavicon} />
          <title>{CONFIG.environment.htmlTitle}</title>
        </Head>
    <App />
    </HelmetProvider>
    </BackDropProvider>
  </React.StrictMode>
);

