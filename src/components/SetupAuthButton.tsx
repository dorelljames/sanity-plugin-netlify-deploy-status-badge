import { Button, Text } from "@sanity/ui";
import type { SetupAuthButtonProps } from "../types";

const SetupAuthButton = (props: SetupAuthButtonProps) => {
  return (
    <>
      <Button
        text="Login at Netlify"
        onClick={props.onAuthorize}
        tone="positive"
      />
      <Text muted size={1}>
        {props.isSitePrivate
          ? "Login in order to trigger a new build and view site's deploy log"
          : "Login in order to trigger a new build"}
      </Text>
    </>
  );
};

export default SetupAuthButton;
