import { ComponentType } from "react";
import { Tool as SanityTool, Tool } from "sanity";
import { namespace } from "../config";
import { NetlifyStatusBadgeConfig } from "../types";
import App from "./App";
import Icon from "./Icon";

const initTool = (options: NetlifyStatusBadgeConfig): SanityTool => {
  const IconWithConfig = <Icon {...options} />;

  return {
    title: "‎", // invisible character to make way for dynamic icon
    name: namespace,
    icon: IconWithConfig as unknown as ComponentType,
    component: App as unknown as ComponentType<{ tool: Tool<any> }>,
  };
};

export default initTool;
