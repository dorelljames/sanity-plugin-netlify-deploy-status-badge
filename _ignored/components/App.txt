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
import { useLocalStorage } from "../hooks";
import { namespace, APP_REFRESH_INTERVAL } from "../config";
import { ArrowRightIcon } from "@sanity/icons";

const STATE = {
  LOADING: "loading",
  READY: "ready",
  ERROR: "error",
  NEEDS_AUTH: "needs_auth",
  AUTHENTICATING: "authenticating",
  NOT_FOUND: "site_not_found",
};

export default function App(props) {
  const toast = useToast();
  const { getAuthURL, authResponse, logout } = useNetlifyAuth();

  const [site, setSite] = useLocalStorage(`${namespace}--site`);
  const [deploys, setDeploys] = useLocalStorage(`${namespace}--deploys`);
  const [isSitePrivate, setIsSitePrivate] = React.useState(false);
  const [state, setState] = React.useState("idle"); // (loading > ready | error), (loading > needs_auth > authenticating > error | ready)

  const needsSetup = !oauthClientId;
  const isLoggedIn = authResponse;
  const needsAuth = !needsSetup && !isLoggedIn;
  const requestOptions = isLoggedIn
    ? {
        headers: { Authorization: `Bearer ${authResponse.access_token}` },
      }
    : null;

  // Check if we need auth, if not, good :)
  React.useEffect(() => {
    setState(STATE.LOADING);
    getSiteDeploys(siteId)
      .then((res) => {
        if (!res.ok && res.status === 401) throw new Error(res.statusText);
        return res;
      })
      .then((res) => res.json())
      .then(setDeploys)
      .then(() => setTimeout(() => setState(STATE.READY), 1000))
      .then(() => {
        getSite(siteId)
          .then((res) => res.json())
          .then(setSite);
      })
      .catch(() => {
        setState(STATE.NEEDS_AUTH);
        setIsSitePrivate(true);
      });
  }, [siteId]);

  // We need auth here
  React.useEffect(() => {
    if (state === STATE.NEEDS_AUTH && isSitePrivate && siteId && isLoggedIn) {
      initOrRefreshApp();
    }
  }, [isSitePrivate, siteId, isLoggedIn]);

  // Refresh App on every interval
  React.useEffect(() => {
    let interval;
    if (state === STATE.READY) {
      interval = setInterval(() => {
        toast.push({
          title: `Refreshing site deploys...`,
          status: "info",
        });
        initOrRefreshApp();
      }, APP_REFRESH_INTERVAL);
    }
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
      .then(() => setTimeout(() => setState(STATE.READY), 1000))
      .catch(() => {
        if (isSitePrivate) {
          setState(STATE.ERROR);
        }
      });
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
        window.localStorage.removeItem(`${namespace}--site`);
        window.localStorage.removeItem(`${namespace}--deploys`);
      }
      setState(STATE.IDLE);
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
                    <Button
                      text="Logout"
                      onClick={handleClickLogout}
                      icon={ArrowRightIcon}
                    />
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

            {(state === "loading" ||
              (state === "needs_auth" && isLoggedIn)) && (
              <Card borderBottom as="li" padding={4} radius={2}>
                <Text as="em">Getting things ready...</Text>
              </Card>
            )}

            {deploys?.map((deploy) => (
              <DeployItem key={deploy.id} deploy={deploy} site={site} />
            ))}
          </Stack>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
