import React from "react";
import ReactDOM from "react-dom/client";
// import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "react-oidc-context";
import { StrictMode } from 'react';
import './index.css'
import App from './App.jsx'

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_ZmYnbDHUC",
  client_id: "3co3sql018v15f0no5i00sr2jg",
  redirect_uri: "http://localhost:5173/org/dashboard",
  response_type: "code",
  scope: "email openid phone",
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
