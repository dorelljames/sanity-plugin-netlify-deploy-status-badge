import React from "react";
import { namespace } from "../config";
import { AuthResponse, NetlifyStatusBadgeConfig } from "../types";

const useNetlifyAuth = (config: NetlifyStatusBadgeConfig) => {
  const oauthClientId = config.auth.oauthClientId;
  const [authResponse, setAuthResponse] = React.useState<AuthResponse | null>(
    null,
  );

  // Process our response from authorization
  React.useEffect(() => {
    if (document.location.hash) {
      const response = document.location.hash
        .replace(/^#/, "")
        .split("&")
        .reduce((result, pair) => {
          const keyValue = pair.split("=");
          if (keyValue.length !== 2) return result;

          const key = keyValue[0];
          const value = keyValue[1];

          (result as any)[key] = value;

          return result;
        }, {});

      // Remove the token so it's not visible in the URL after we're done
      document.location.hash = "";

      setAuthResponse(response as AuthResponse);
      window.localStorage.setItem(
        `${namespace}--auth`,
        JSON.stringify(response),
      );
    }
  }, []);

  // Set auth token from localStorage
  React.useEffect(() => {
    const authToken = window.localStorage.getItem(`${namespace}--auth`);
    if (authToken) {
      setAuthResponse(JSON.parse(authToken));
    }
  }, []);

  const getAuthURL = () => {
    return `https://app.netlify.com/authorize?client_id=${oauthClientId}&response_type=token&redirect_uri=${window.location.href}`;
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem(`${namespace}--auth`);
      if (!window.localStorage.getItem(`${namespace}--auth`)) {
        setAuthResponse(null);
        resolve("OK");
      }

      reject(new Error("Unable to logout!"));
    });
  };

  const getHeaders = () => {
    const headers = authResponse
      ? { headers: { Authorization: `Bearer ${authResponse.access_token}` } }
      : null;

    return headers;
  };

  return { authResponse, getAuthURL, getHeaders, logout };
};

export default useNetlifyAuth;
