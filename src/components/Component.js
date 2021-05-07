import React from "react";
import {
  Container,
  Heading,
  Card,
  Stack,
  Grid,
  Box,
  Flex,
  Switch,
  Label,
  Text,
  Button,
} from "@sanity/ui";

export default function Component(props) {
  console.log("props", props);

  return (
    <Container width={3}>
      <Card margin={3} padding={4} radius={2}>
        <Heading size={4} as={"h2"}>
          <Flex marginRight={5} align="center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              aria-hidden="true"
              focusable="false"
              class="icon tw-w-3 tw-h-3"
            >
              <path
                fill-rule="evenodd"
                d="M8.252 14H0v4h8.252a8.003 8.003 0 0015.496 0H32v-4h-8.252a8.003 8.003 0 00-15.496 0zM16 20a4 4 0 100-8 4 4 0 000 8z"
              ></path>
            </svg>
            <span style={{ marginLeft: 10 }}>Site Deploys</span>
          </Flex>
        </Heading>
        <p>You'll need to login to your account to view recent site deploys.</p>
        <br />
        <Button text="Click here to login to Netlify" />
      </Card>

      <Card margin={3}>
        <Stack as={"ul"}>
          <Card borderBottom as={"li"} padding={4} radius={2}>
            <Grid columns={5} justify={"space-between"} align={"center"}>
              <Box column={4}>
                <Stack space={3}>
                  <Text size={2}>Producion: master@HEAD</Text>
                  <Text muted size={1}>
                    Deploy triggered by hook: oelsales-webhook
                  </Text>
                </Stack>
              </Box>
              <Flex justify={"center"} align={"center"}>
                <Stack space={3}>
                  <Label>Approved?</Label>
                  <Switch checked={false} indeterminate={true} />
                </Stack>
              </Flex>
            </Grid>
          </Card>
        </Stack>
      </Card>
    </Container>
  );
}
