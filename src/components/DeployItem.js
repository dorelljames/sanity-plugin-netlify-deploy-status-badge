/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import { Card, Stack, Grid, Box, Flex, Text, Button, Badge } from "@sanity/ui";
import { ArrowRightIcon } from "@sanity/icons";
import Tooltip from "./Tooltip";
import { formatDeployTime, formatDeployDate } from "../utils";

export default function DeployItem({ deploy, site }) {
  return (
    <Card borderBottom as="li" padding={4} radius={2} key={deploy?.id}>
      <Grid columns={6} justify="space-between" align="center">
        <Box column={4}>
          <Stack space={3}>
            <Flex align="center">
              <Text weight="semibold">
                <a
                  href={deploy?.deploy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textTransform: `capitalize` }}
                >
                  {deploy?.context.replace("-", " ")}
                </a>
              </Text>
              <Text weight="semibold">
                {" "}
                :{deploy?.branch}@
                <a
                  href={deploy?.commit_url || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {deploy?.commit_ref?.substring(0, 7) || "HEAD"}{" "}
                </a>
              </Text>
              {deploy.state === "new" && !deploy?.deploy_time && (
                <Badge mode="outline" tone="caution" padding={1} marginLeft="1">
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
        <Flex
          column={2}
          justify="flex-end"
          align="center"
          style={{ textAlign: "right" }}
        >
          <Stack space={3}>
            <Text weight="semibold">
              {formatDeployDate(new Date(deploy?.created_at))}
            </Text>
            <Text muted size={1}>
              {formatDeployTime(deploy?.deploy_time)}
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
  );
}

DeployItem.propTypes = {
  deploy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
    branch: PropTypes.string.isRequired,
    commit_url: PropTypes.string,
    commit_ref: PropTypes.string,
    deploy_time: PropTypes.number,
    state: PropTypes.string.isRequired,
    deploy_url: PropTypes.string.isRequired,
  }).isRequired,
  site: PropTypes.shape({
    published_deploy: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
