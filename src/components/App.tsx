import {
  Card,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@sanity/ui";
import React from "react";
import { Tool as SanityTool } from "sanity";
import {
  DeployItem,
  ErrorCard,
  GettingReadyCard,
  HeaderButtons,
  SetupAuthButton,
  SetupOAuthButton,
} from "../components";
import { STATE, namespace } from "../config";
import { getSite, getSiteDeploys, postSiteNewBuild } from "../helpers";
import { useLocalStorage, useNetlifyAuth } from "../hooks";
import { NetlifyDeploy, NetlifySite, NetlifyStatusBadgeConfig } from "../types";

const App = (props: { tool: SanityTool }) => {
  const toast = useToast();
  const config: NetlifyStatusBadgeConfig = (props.tool.icon! as any).props;
  const siteId = config?.apiId;

  const { getAuthURL, authResponse, logout } = useNetlifyAuth(config);
  const [site, setSite] = useLocalStorage<NetlifySite | null>(
    `${namespace}--site`,
    null,
  );
  const [deploys, setDeploys] = useLocalStorage<NetlifyDeploy[]>(
    `${namespace}--deploys`,
    [],
  );
  const [isSitePrivate, setIsSitePrivate] = React.useState(false); // Deploy log visibility is set to "private"
  const [state, setState] = React.useState("idle"); // (loading > ready | error), (loading > needs_auth > authenticating > error | ready)

  const needsSetup = !config?.auth?.oauthClientId;
  const isLoggedIn = !!authResponse?.access_token;
  const needsAuth = !needsSetup && !isLoggedIn;
  const requestOptions = React.useMemo(
    () =>
      isLoggedIn
        ? { headers: { Authorization: `Bearer ${authResponse.access_token}` } }
        : undefined,
    [authResponse, isLoggedIn],
  );

  const handleClickAuthorize = React.useCallback(
    () => (window.location.href = getAuthURL()),
    [getAuthURL],
  );

  const handleClickLogout = React.useCallback(
    () =>
      logout().then(() => {
        window.localStorage.removeItem(`${namespace}--deploys`);
        window.localStorage.removeItem(`${namespace}--site`);
        setState(STATE.IDLE);
        setDeploys([]);
      }),
    [logout, setDeploys],
  );

  const handleTriggerBuild = React.useCallback(
    (clearCache = false) => {
      postSiteNewBuild({
        siteId,
        clearCache,
        requestOptions,
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
        })
        .catch(() => {
          toast.push({
            title: `Oops, unable to trigger new build`,
            status: "warning",
          });
        });
    },
    [siteId, requestOptions, toast],
  );

  // Check if we need auth, if not, good :)
  React.useEffect(() => {
    if (siteId) {
      setState(STATE.LOADING);

      Promise.all([
        getSiteDeploys(siteId, requestOptions)
          .then((res) => {
            if (!res.ok && res.status === 401) throw new Error(res.statusText);
            return res;
          })
          .then((res) => res.json()),
        getSite(siteId, requestOptions).then((res) => res.json()),
      ])
        .then((result) => {
          setDeploys(result[0]);
          setSite(result[1]);
        })
        .catch(() => {
          setState(STATE.NEEDS_AUTH);
          setDeploys([]);
          setIsSitePrivate(true);
        })
        .finally(() => setState(STATE.READY));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, requestOptions?.headers.Authorization]);

  return (
    <Container>
      <Card margin={2} padding={4} radius={2}>
        <Flex justify="space-between" align="center">
          <Stack space={4}>
            <Heading size={3} as="h2">
              <Flex marginRight={5} align="center">
                <span style={{ marginRight: 10 }}>Site Deploys</span>
              </Flex>
            </Heading>
            <Text muted>Showing your recent site deploys.</Text>
          </Stack>
          <Stack space={3}>
            {needsSetup && <SetupOAuthButton isSitePrivate={isSitePrivate} />}

            {needsAuth && (
              <SetupAuthButton
                isSitePrivate={isSitePrivate}
                onAuthorize={handleClickAuthorize}
              />
            )}

            {isLoggedIn && (
              <HeaderButtons
                onLogout={handleClickLogout}
                onTriggerBuild={handleTriggerBuild}
                showTriggerDeployButton={state === "ready"}
              />
            )}
          </Stack>
        </Flex>
      </Card>

      <Card margin={4}>
        <Stack as="ul">
          {state === "error" && <ErrorCard />}

          {(state === "loading" || (state === "needs_auth" && isLoggedIn)) && (
            <GettingReadyCard />
          )}

          {site &&
            deploys?.length > 0 &&
            deploys?.map((deploy: NetlifyDeploy) => (
              <DeployItem
                key={deploy.id}
                deploy={deploy}
                publishedDeployId={site?.published_deploy?.id}
              />
            ))}
        </Stack>
      </Card>
    </Container>
  );
};

export default App;
