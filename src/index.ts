import { definePlugin } from "sanity";
import { NetlifyDeployStatusBadgeConfig } from "./types";
import { initTool } from "./components";
import { namespace } from "./config";
import { z } from "zod";

const AuthSchema = z.object({
  oauthClientId: z.string(),
  personalAccessToken: z.string().optional(),
});
const ConfigurationSchema = z.object({
  apiId: z.string(),
  auth: AuthSchema.optional().refine(
    (data) => {
      // If the auth object is present, ensure oauthClientId is also present
      return !data || (data && data.oauthClientId);
    },
    { message: "If auth is present, oauthClientId is required." },
  ),
});

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
 *     }),
 *   ]
 * });
 * ```
 *
 * or if you need authentication because your site deploy's are private
 * and/or you want to trigger a new build.
 *
 * ```ts
 * export default defineConfig({
 *   plugins: [
 *     netlifyDeployStatusBadge({
 *       apiId: 'YOUR_NETLIFY_API_OR_SITE_ID',
 *        auth: {
 *          oauthClientId: "YOUR_NETLIFY_OAUTH_APP_CLIENT_ID",
 *        }
 *     }),
 *   ]
 * });
 * ```
 */
export const netlifyDeployStatusBadge =
  definePlugin<NetlifyDeployStatusBadgeConfig>((config) => {
    const checkConfig = ConfigurationSchema.safeParse(config);
    if (!checkConfig.success) {
      throw new ConfigurationError(checkConfig.error.message);
    }

    return {
      name: namespace,
      tools: (prev) => {
        const tool = initTool(config);

        return [...prev, tool];
      },
    };
  });
