import React from "react";
import { createRoot } from "react-dom/client"; // Updated import for createRoot
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider
import axios from "axios"; // Import Axios
import store from "./app/store"; // Import the Redux store
import App from "./App"; // Import the main App component

// Set Axios base URL globally
axios.defaults.baseURL = "http://localhost:8000";

// Create a root element using createRoot
const root = createRoot(document.getElementById("root"));

// Render the App with Auth0Provider and Redux Provider
root.render(
  <Auth0Provider
    domain="dev-dr2alzrvhdi5kr6t.us.auth0.com"
    clientId="nz10Et9DXjj9qM8G8q1eN6yTI0k8W1PL"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
