import React from "react";
import { createPlugin } from "sanity";
import Icon from "./components/Icon";
import App from "./components/App";

export interface NetlifyDeployStatusBadgeConfig {
  siteId: string;
  oauthClientId: string;
}

export const netlifyDeployStatusBadgePlugin =
  createPlugin<NetlifyDeployStatusBadgeConfig>((config) => {
    return {
      name: "netlify-deploy-status-badge",
      tools: (prev) => {
        return [
          ...prev,
          {
            name: "netlify-badge",
            title: "‎",
            icon: Icon,
            component: function component() {
              return <App {...config} />;
            },
          },
        ];
      },
    };
  });
