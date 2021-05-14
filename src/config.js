import config from "config:netlify-deploy-status-badge";

export const {
  apiId: siteId,
  auth: { oauthClientId, personalAccessToken } = {},
} = config;

export const namespace = "netlify-deploy-status-badge";
export const APP_REFRESH_INTERVAL = 10000;
export const BADGE_REFRESH_INTERVAL = 10000;
