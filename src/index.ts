import { definePlugin } from "sanity";
import { NetlifyStatusBadgeConfig } from "./types";
import { initTool } from "./components/initTool";

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export const netlifyStatusBadge = definePlugin<NetlifyStatusBadgeConfig>(
  (options) => {
    if (!("apiId" in options) && !("auth" in options)) {
      throw new ConfigurationError(
        "'apiId' and 'auth' are required with either 'oauthClientId' or 'personalAccessToken'",
      );
    }

    return {
      name: "netlify-deploy-status-badge",
      // title: "‎", // invisible character
      title: "NS",
      tools: (prev) => {
        const tool = initTool(options);

        return [...prev, tool];
      },
    };
  },
);
