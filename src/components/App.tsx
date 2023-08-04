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
import {
  getSite,
  getSiteBadge,
  getSiteDeploys,
  postSiteNewBuild,
} from "../helpers";
import { useLocalStorage, useNetlifyAuth } from "../hooks";
import {
  NetlifyDeploy,
  NetlifySite,
  NetlifyDeployStatusBadgeConfig,
} from "../types";

const App = (props: { tool: SanityTool }) => {
  const toast = useToast();
  const config: NetlifyDeployStatusBadgeConfig = (props.tool.icon! as any)
    .props;
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
  const [state, setState] = React.useState("idle"); // (loading > site_404), (loading > ready | error), (loading > needs_auth > authenticating > error | ready)

  const isLoggedIn = !!authResponse?.access_token;
  const siteNotFound = state === STATE.SITE_404;
  const needsSetup = !config?.auth?.oauthClientId;
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

  const fetchSiteDetails = React.useCallback(() => {
    function init() {
      return Promise.all([
        getSiteBadge(siteId),
        getSite(siteId, requestOptions),
        getSiteDeploys(siteId, requestOptions),
      ]);
    }

    return init();
  }, [siteId, requestOptions]);

  // Check if we need auth, if not, good :)
  React.useEffect(() => {
    if (siteId) {
      setState(STATE.LOADING);
      fetchSiteDetails().then((result) => {
        const [siteBadgeDetails, siteDetails, siteDeploysDetails] = result;
        if (siteBadgeDetails?.[0]) {
          setState(STATE.SITE_404);
          return;
        }

        if (siteDetails?.[0]) {
          setSite(null);
          setDeploys([]);
          setIsSitePrivate(true);
          setState(STATE.NEEDS_AUTH);
          return;
        }

        // All good here :)
        setState(STATE.READY);
        setDeploys(siteDeploysDetails[1]);
        setSite(siteDetails[1]);
      });
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
            {siteNotFound ? (
              <Card padding={4} radius={2} shadow={1}>
                <Text muted size={1}>
                  Oops, we couldn't find the site you're trying to configure!
                </Text>
              </Card>
            ) : (
              <>
                {state !== STATE.IDLE && needsSetup && (
                  <SetupOAuthButton isSitePrivate={isSitePrivate} />
                )}

                {state !== STATE.IDLE && needsAuth && (
                  <SetupAuthButton
                    isSitePrivate={isSitePrivate}
                    onAuthorize={handleClickAuthorize}
                  />
                )}

                {state !== STATE.IDLE && isLoggedIn && (
                  <HeaderButtons
                    onLogout={handleClickLogout}
                    onTriggerBuild={handleTriggerBuild}
                    showTriggerDeployButton={state === "ready"}
                  />
                )}
              </>
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
