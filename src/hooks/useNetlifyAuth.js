import React from "react";
import { oauthClientId } from "../config";

export default function useNetlifyAuth() {
  const [authResponse, setAuthResponse] = React.useState(null);

  // Process our response from authorization
  React.useEffect(() => {
    if (document.location.hash) {
      const response = document.location.hash
        .replace(/^#/, "")
        .split("&")
        .reduce((result, pair) => {
          const keyValue = pair.split("=");
          result[keyValue[0]] = keyValue[1];
          return result;
        }, {});

      // Remove the token so it's not visible in the URL after we're done
      document.location.hash = "";

      setAuthResponse(response);
      window.localStorage.setItem("_auth", JSON.stringify(response));
    }
  }, []);

  // Set auth token from localStorage
  React.useEffect(() => {
    const authToken = window.localStorage.getItem("_auth");
    if (authToken) {
      setAuthResponse(JSON.parse(authToken));
    }
  }, []);

  const getAuthURL = () => {
    return `https://app.netlify.com/authorize?client_id=${oauthClientId}&response_type=token&redirect_uri=${window.location.href}`;
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem("_auth");
      if (!window.localStorage.getItem("_auth")) {
        setAuthResponse(null);
        resolve("OK");
      }

      reject("Unable to logout!");
    });
  };

  const getHeaders = () => {
    const headers = authResponse
      ? { headers: { Authorization: `Bearer ${authResponse.access_token}` } }
      : null;

    return headers;
  };

  return { authResponse, getAuthURL, getHeaders, logout };
}
