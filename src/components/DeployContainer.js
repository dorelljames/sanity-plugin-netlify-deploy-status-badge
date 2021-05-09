/* eslint-disable react/jsx-no-bind */
import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import {
  Container,
  Heading,
  Card,
  Stack,
  Grid,
  Box,
  Flex,
  Text,
  Button,
  Badge,
  Tooltip as STooltip,
  Inline,
  Menu,
  MenuItem,
  MenuButton,
  useToast,
} from "@sanity/ui";
import { useNetlifyAuth } from "../hooks";
import { siteId, oauthClientId } from "../config";
import { prettyTime, getSiteDeploys, getSite, triggerNewBuild } from "../utils";
import { ArrowRightIcon } from "@sanity/icons";
import { NetlifyIcon } from "../assets/netlify-rectacle.svg";

export default function DeployContainer(props) {
  const toast = useToast();
  const { getAuthURL, authResponse, logout } = useNetlifyAuth();

  const [site, setSite] = React.useState(null);
  const [deploys, setDeploys] = React.useState([]);
  const [isSitePrivate, setIsSitePrivate] = React.useState(false);
  const [state, setState] = React.useState("idle"); // loading > error, ready

  const needsSetup = isSitePrivate && !oauthClientId;
  const needsAuth = isSitePrivate && oauthClientId && !authResponse;
  const isLoggedIn = authResponse;

  // Check if we need auth, if not, good :)
  React.useEffect(() => {
    getSiteDeploys(siteId)
      .then((res) => {
        if (!res.ok && res.status === 401) throw new Error(res.statusText);
        return res;
      })
      .then((res) => res.json())
      .then(setDeploys)
      .then(() => {
        getSite(siteId)
          .then((res) => res.json())
          .then(setSite);
      })
      .catch(() => {
        toast.push({
          title: "We need to login to display deploy logs!",
          status: "warning",
        });
        setIsSitePrivate(true);
      });
  }, [siteId]);

  // We need auth here
  React.useEffect(() => {
    if (isSitePrivate && siteId && authResponse) {
      setState("loading");
      const options = {
        headers: { Authorization: `Bearer ${authResponse.access_token}` },
      };
      getSiteDeploys(siteId, options)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res;
        })
        .then((res) => res.json())
        .then(setDeploys)
        .then(() => setTimeout(() => setState("ready"), 1000))
        .catch(() => setState("error"));
      getSite(siteId, options)
        .then((res) => res.json())
        .then(setSite);
    }
  }, [isSitePrivate, siteId, authResponse]);

  function handleTriggerBuild(clearCache = false) {
    const options = {
      headers: { Authorization: `Bearer ${authResponse.access_token}` },
    };
    triggerNewBuild({
      siteId: site.id,
      clearCache,
      headers: options.headers,
    }).then(() => {
      toast.push({
        title: `Successfully triggered new build ${
          clearCache ? "without cache" : ""
        }!`,
        status: "success",
      });
      setState("loading");
      getSiteDeploys(siteId, options)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res;
        })
        .then((res) => res.json())
        .then(setDeploys)
        .then(() => setTimeout(() => setState("ready"), 1000))
        .catch(() => setState("error"));
      getSite(siteId, options)
        .then((res) => res.json())
        .then(setSite);
    });
  }

  function handleClickAuthorize() {
    return (window.location.href = getAuthURL());
  }

  function handleLogout() {
    return logout().then(() => {
      setDeploys([]);
      setState("idle");
    });
  }

  return (
    <Container>
      <Box margin={2} padding={4} radius={2}>
        <Flex justify="space-between" align="center">
          <Stack space={4}>
            <Heading size={3} as={"h2"}>
              <Flex marginRight={5} align="center">
                <span style={{ marginRight: 10 }}>Site Deploys</span>
              </Flex>
            </Heading>
            <Text muted>Displaying your recent site deploys here.</Text>
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
                  You need to setup Netlify's OAuth to login.
                </Text>
              </>
            )}
            {needsAuth && (
              <>
                <Button
                  text="Login at Netlify"
                  onClick={handleClickAuthorize}
                  tone="positive"
                  icon={NetlifyIcon}
                />
                <Text muted size={1}>
                  Login in order to view your site's deploy and trigger a new
                  build.
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
                  <Button text="Logout" onClick={handleLogout} />
                </Inline>
              </Flex>
            )}
          </Stack>
        </Flex>
      </Box>

      <Card margin={4}>
        <Stack as={"ul"}>
          {state === "error" && (
            <Card padding={4} radius={2} tone="critical">
              <Stack space={4}>
                <Heading>Oh nooo! Something went wrong here...</Heading>
                <Text>
                  Please make sure you have access to the site configured. Try
                  refreshing this page. If error still persists, please contact
                  plugin author
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
            <Card borderBottom as={"li"} padding={4} radius={2}>
              <Text as="em">Getting things ready...</Text>
            </Card>
          )}

          {deploys?.map((deploy) => (
            <Card
              borderBottom
              as={"li"}
              padding={4}
              radius={2}
              key={deploy?.id}
            >
              <Grid columns={5} justify={"space-between"} align={"center"}>
                <Box column={4}>
                  <Stack space={3}>
                    <Flex align="center">
                      <Text weight="semibold">
                        <a
                          href={deploy?.deploy_url}
                          style={{ textTransform: `capitalize` }}
                        >
                          {deploy?.context.replace("-", " ")}
                        </a>
                      </Text>
                      <Text weight="semibold">
                        {" "}
                        :{deploy?.branch}@
                        <a href={deploy?.commit_url || ""}>
                          {deploy?.commit_ref?.substring(0, 7) || "HEAD"}{" "}
                        </a>
                      </Text>
                      {deploy.state === "new" && !deploy?.deploy_time && (
                        <Badge
                          mode="outline"
                          tone="caution"
                          padding={1}
                          marginLeft="1"
                        >
                          New
                        </Badge>
                      )}
                      {deploy.state === "building" && (
                        <Badge padding={1} marginLeft="1" tone="caution">
                          Building
                        </Badge>
                      )}
                      {site?.published_deploy?.id === deploy?.id && (
                        <Badge tone="positive" padding={1} marginLeft="1">
                          Published
                        </Badge>
                      )}
                      {deploy.state === "error" && !deploy?.deploy_time && (
                        <Badge model="outline" padding={1} marginLeft="1">
                          Cancelled
                        </Badge>
                      )}
                    </Flex>
                    <Text muted>{deploy?.title || "No deploy message"}</Text>
                  </Stack>
                </Box>
                <Flex justify={"flex-end"} align={"center"}>
                  <Stack space={3}>
                    <Text weight="semibold">
                      {formatDistanceToNow(new Date(deploy?.created_at))}
                    </Text>
                    <Text muted size={1}>
                      Deployed in {prettyTime(deploy?.deploy_time)}
                    </Text>
                  </Stack>
                  <Box marginLeft={2}>
                    <Tooltip text="View Deploy">
                      <Button
                        tone="primary"
                        icon={ArrowRightIcon}
                        mode="ghost"
                        as="a"
                        href={`https://app.netlify.com/sites/${deploy?.name}/deploys/${deploy?.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    </Tooltip>
                  </Box>
                </Flex>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Card>
    </Container>
  );
}

function Tooltip({ text, children }) {
  return (
    <STooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            {text}
          </Text>
        </Box>
      }
      fallbackPlacements={["right", "left"]}
      placement="top"
    >
      {children}
    </STooltip>
  );
}
Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
