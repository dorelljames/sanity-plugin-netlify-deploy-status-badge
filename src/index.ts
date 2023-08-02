import { definePlugin } from "sanity";
import { NetlifyDeployStatusBadgeConfig } from "./types";
import { initTool } from "./components";
import { namespace } from "./config";

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {netlifyDeployStatusBadge} from 'sanity-plugin-netlify-status-badge'
 *
 * export default defineConfig({
 *   plugins: [
 *     netlifyDeployStatusBadge({
 *       apiId: 'YOUR_NETLIFY_API_OR_SITE_ID',
 *       auth: {
 *          oauthClientId: "YOUR_NETLIFY_OAUTH_APP_CLIENT_ID",
 *       }
 *     }),
 *   ]
 * });
 * ```
 */
export const netlifyDeployStatusBadge =
  definePlugin<NetlifyDeployStatusBadgeConfig>((config) => {
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
  });
