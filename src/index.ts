import { definePlugin } from "sanity";
import { NetlifyStatusBadgeConfig } from "./types";
import { initTool } from "./components";
import { namespace } from "./config";

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export const netlifyStatusBadge = definePlugin<NetlifyStatusBadgeConfig>(
  (config) => {
    // @todo: update configuration to make sure we have the required config
    if (!("apiId" in config) && !("auth" in config)) {
      throw new ConfigurationError(
        "'apiId' and 'auth' are required with either 'oauthClientId' or 'personalAccessToken'",
      );
    }

    return {
      name: namespace,
      tools: (prev) => {
        const tool = initTool(config);

        return [...prev, tool];
      },
    };
  },
);
