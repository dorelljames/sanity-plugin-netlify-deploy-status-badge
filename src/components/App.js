/* eslint-disable react/jsx-no-bind */
import React from "react";
import {
  Container,
  Heading,
  Card,
  Stack,
  Box,
  Flex,
  Text,
  Button,
  Inline,
  Menu,
  MenuItem,
  MenuButton,
  useToast,
  ThemeProvider,
  studioTheme,
} from "@sanity/ui";
import DeployItem from "./DeployItem";
import { useNetlifyAuth } from "../hooks";
import { siteId, oauthClientId } from "../config";
import { getSiteDeploys, getSite, postSiteNewBuild } from "../utils";

export const APP_REFRESH_INTERVAL = 30000;

export default function App(props) {
  const toast = useToast();
  const { getAuthURL, authResponse, logout } = useNetlifyAuth();

  const [site, setSite] = React.useState(null);
  const [deploys, setDeploys] = React.useState([]);
  const [isSitePrivate, setIsSitePrivate] = React.useState(false);
  const [state, setState] = React.useState("idle"); // loading > error, ready

  const needsSetup = !oauthClientId;
  const needsAuth = oauthClientId && !authResponse;
  const isLoggedIn = authResponse;
  const requestOptions = authResponse
    ? {
        headers: { Authorization: `Bearer ${authResponse.access_token}` },
      }
    : null;

  // Check if we need auth, if not, good :)
  React.useEffect(() => {
    getSiteDeploys(siteId)
      .then((res) => {
        if (!res.ok && res.status === 401) throw new Error(res.statusText);
        return res;
      })
      .then((res) => res.json())
      .then(setDeploys)
      .then(() => setTimeout(() => setState("ready"), 1000))
      .then(() => {
        getSite(siteId)
          .then((res) => res.json())
          .then(setSite);
      })
      .catch(() => {
        setIsSitePrivate(true);
        setState("idle");
      });
  }, [siteId]);

  // We need auth here
  React.useEffect(() => {
    if (isSitePrivate && siteId && authResponse) {
      setState("loading");
      initOrRefreshApp();
    }
  }, [isSitePrivate, siteId, authResponse]);

  // Refresh App on every interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      toast.push({
        title: `Refreshing site deploys...`,
        status: "info",
      });
      initOrRefreshApp();
    }, APP_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  function initOrRefreshApp() {
    getSite(siteId, requestOptions)
      .then((res) => res.json())
      .then(setSite);
    getSiteDeploys(siteId, requestOptions)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res;
      })
      .then((res) => res.json())
      .then(setDeploys)
      .then(() => setTimeout(() => setState("ready"), 1000))
      .catch(() => setState("error"));
  }

  function handleTriggerBuild(clearCache = false) {
    postSiteNewBuild({
      siteId: site.id,
      clearCache,
      headers: requestOptions.headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res;
      })
      .then(() => {
        toast.push({
          title: `Successfully triggered new build ${
            clearCache ? "without cache" : ""
          }!`,
          status: "success",
        });
        initOrRefreshApp();
      })
      .catch(() => {
        toast.push({
          title: `Oops, unable to trigger new build`,
          status: "warning",
        });
      });
  }

  function handleClickAuthorize() {
    return (window.location.href = getAuthURL());
  }

  function handleClickLogout() {
    return logout().then(() => {
      if (isSitePrivate) {
        setDeploys([]);
      }
      setState("idle");
    });
  }

  return (
    <ThemeProvider theme={studioTheme}>
      <Container>
        <Box margin={2} padding={4} radius={2}>
          <Flex justify="space-between" align="center">
            <Stack space={4}>
              <Heading size={3} as="h2">
                <Flex marginRight={5} align="center">
                  <span style={{ marginRight: 10 }}>Site Deploys</span>
                </Flex>
              </Heading>
              <Text muted>Displaying your recent site deploys.</Text>
            </Stack>
            <Stack space={3}>
              {needsSetup && (
                <>
                  <Button
                    as="a"
                    text="Click here to setup OAuth"
                    href="https://github.com/dorelljames/sanity-plugin-netlify-deploy-status-badge#configuration"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <Text muted size={1}>
                    {isSitePrivate
                      ? "Setup Netlify's OAuth and login to view site deploys, etc."
                      : "Setup OAuth to trigger a new build."}
                  </Text>
                </>
              )}
              {needsAuth && (
                <>
                  <Button
                    text="Login at Netlify"
                    onClick={handleClickAuthorize}
                    tone="positive"
                  />
                  <Text muted size={1}>
                    {isSitePrivate
                      ? "Login in order to view site's deploy log and trigger a new build"
                      : "Login in order to trigger a new build"}
                  </Text>
                </>
              )}
              {isLoggedIn && (
                <Flex>
                  <Inline space={2}>
                    {state === "ready" && (
                      <MenuButton
                        button={<Button text="Trigger Deploy" />}
                        id="menu-button-example"
                        menu={
                          <Menu>
                            <MenuItem
                              text="Deploy site"
                              onClick={() => handleTriggerBuild()}
                            />
                            <MenuItem
                              text="Clear cache and deploy site"
                              onClick={() => handleTriggerBuild(true)}
                            />
                          </Menu>
                        }
                      />
                    )}
                    <Button text="Logout" onClick={handleClickLogout} />
                  </Inline>
                </Flex>
              )}
            </Stack>
          </Flex>
        </Box>

        <Card margin={4}>
          <Stack as="ul">
            {state === "error" && (
              <Card padding={4} radius={2} tone="critical">
                <Stack space={4}>
                  <Heading>Oh nooo! Something went wrong here...</Heading>
                  <Text>
                    Please make sure you have access to the site configured. Try
                    refreshing this page. If error still persists, please
                    contact plugin author
                    <a
                      href="mailto:netlify-deploy-status-badge+galangdj@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @dorelljames
                    </a>{" "}
                    or your developer.
                  </Text>
                </Stack>
              </Card>
            )}

            {state === "loading" && (
              <Card borderBottom as="li" padding={4} radius={2}>
                <Text as="em">Getting things ready...</Text>
              </Card>
            )}

            {state === "ready" &&
              deploys?.map((deploy) => (
                <DeployItem key={deploy.id} deploy={deploy} site={site} />
              ))}
          </Stack>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
