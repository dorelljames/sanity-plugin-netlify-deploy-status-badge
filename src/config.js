import config from "config:netlify-deploy-status-badge";

export const {
  apiId: siteId,
  auth: { oauthClientId, personalAccessToken },
} = config;
