import { Button, Box, Stack, Text } from "@sanity/ui";
import React from "react";
import { SetupOAuthButtonProps } from "../types";
import { LaunchIcon } from "@sanity/icons";

const SetupOAuthButton = ({
  isSitePrivate,
}: SetupOAuthButtonProps): React.ReactNode => {
  return (
    <>
      <Button
        as="a"
        text="Click here to learn how to setup OAuth"
        href="https://github.com/dorelljames/sanity-plugin-netlify-deploy-status-badge#configuration"
        target="_blank"
        rel="noopener noreferrer"
        iconRight={LaunchIcon}
      />
      <Text muted size={1}>
        {isSitePrivate
          ? "Setup Netlify's OAuth to be able to login and view site deploys and/or trigger a new build."
          : "Setup OAuth to trigger a new build."}
      </Text>
    </>
  );
};

export default SetupOAuthButton;
