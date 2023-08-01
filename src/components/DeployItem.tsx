/* eslint-disable camelcase */
import {
  Card,
  Stack,
  Grid,
  Box,
  Flex,
  Text,
  Button,
  Tooltip,
  Badge,
} from "@sanity/ui";
import { ArrowTopRightIcon } from "@sanity/icons";
import {
  formatDeployTime,
  formatDeployDate,
  getDeployStatus,
} from "../helpers";
import { DeployItemProps } from "../types";

const DeployItem = ({ deploy, publishedDeployId }: DeployItemProps) => {
  return (
    <Card borderBottom as="li" padding={4} radius={2} key={deploy?.id}>
      <Grid columns={6}>
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
                <Badge mode="outline" tone="caution" padding={1} marginLeft={1}>
                  New
                </Badge>
              )}
              {deploy.state === "building" && (
                <Badge mode="outline" tone="caution" padding={1} marginLeft={1}>
                  Building
                </Badge>
              )}
              {getDeployStatus(deploy, publishedDeployId) === "published" && (
                <Badge
                  mode="outline"
                  tone="positive"
                  padding={1}
                  marginLeft={1}
                >
                  Published
                </Badge>
              )}
              {getDeployStatus(deploy) === "canceled" && (
                <Badge mode="outline" padding={1} marginLeft={1}>
                  Canceled
                </Badge>
              )}
              {getDeployStatus(deploy) === "failed" && (
                <Badge
                  mode="outline"
                  tone="critical"
                  padding={1}
                  marginLeft={1}
                >
                  Failed
                </Badge>
              )}
              {getDeployStatus(deploy) === "failed_due_to_plugin_error" && (
                <Badge
                  mode="outline"
                  tone="critical"
                  padding={1}
                  marginLeft={1}
                >
                  Failed Due To Plugin Error
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
            {!!deploy?.deploy_time && (
              <Text muted size={1}>
                {formatDeployTime(deploy?.deploy_time)}
              </Text>
            )}
          </Stack>
          <Box marginLeft={2}>
            <Tooltip content={"View Deploy"}>
              <Button
                tone="primary"
                icon={ArrowTopRightIcon}
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
};

export default DeployItem;
