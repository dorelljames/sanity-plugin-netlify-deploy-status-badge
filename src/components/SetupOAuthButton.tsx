import { Button, Text } from "@sanity/ui";
import React from "react";
import { SetupOAuthButtonProps } from "../types";

const SetupOAuthButton = ({
  isSitePrivate,
}: SetupOAuthButtonProps): React.ReactNode => {
  return (
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
  );
};

export default SetupOAuthButton;
