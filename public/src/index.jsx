import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import {createRoot} from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';

const domNode = document.getElementById('root')
const root=createRoot(domNode)
/**
* Root of react site 
*
* Imports Helmet provider for the page head
* And App which defines the content and navigation
*/

// Render the site https://reactjs.org/docs/react-dom.html#render
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
