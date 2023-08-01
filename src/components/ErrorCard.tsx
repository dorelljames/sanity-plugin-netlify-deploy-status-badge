import { Card, Stack, Heading, Text } from "@sanity/ui";

const ErrorCard = () => {
  return (
    <Card padding={4} radius={2} tone="critical">
      <Stack space={4}>
        <Heading>Oh nooo! Something went wrong here...</Heading>
        <Text>
          Please make sure you have access to the site configured. Try
          refreshing this page. If error still persists, please contact plugin
          author
          <a
            href="mailto:galangdj+netlify-deploy-status-badge@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            @dorelljames
          </a>{" "}
          or your developer.
        </Text>
      </Stack>
    </Card>
  );
};

export default ErrorCard;
