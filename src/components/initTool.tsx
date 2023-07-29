import { NetlifyStatusBadgeConfig } from "../types";
import { ComponentType } from "react";
import { Tool as SanityTool } from "sanity";
import Icon from "./Icon";
import App from "./App";

export const initTool = (options: NetlifyStatusBadgeConfig): SanityTool => {
  const IconWithProps = <Icon {...options} />;

  return {
    title: "‎",
    // title: "NS2",
    name: "netlify-deploy-status-badge",
    icon: IconWithProps as unknown as ComponentType,
    component: App,
  };
};
