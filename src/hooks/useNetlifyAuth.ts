import React from "react";
import { namespace } from "../config";

interface OAuthResponse {
  access_token?: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useNetlifyAuth({
  oauthClientId,
}: {
  oauthClientId: string;
}) {
  const [authResponse, setAuthResponse] = React.useState<OAuthResponse>(null);

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
      window.localStorage.setItem(
        `${namespace}--auth`,
        JSON.stringify(response)
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
}
