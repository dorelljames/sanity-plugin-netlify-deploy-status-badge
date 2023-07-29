import { format, isToday, isYesterday, getYear } from "date-fns";
import { NetlifyDeploy, NetlifySite } from "./types";

export const formatDeployTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (minutes === 0 && seconds === 0) {
    return "";
  }

  return `Deployed in ${minutes > 0 ? `${minutes}m` : ""} ${
    seconds > 0 ? `${seconds}s` : ""
  }`;
};

export const formatDeployDate = (d: number | Date) => {
  if (isToday(d)) {
    return `Today at ${format(d, "p")}`;
  }

  if (isYesterday(d)) {
    return `Yesterday at ${format(d, "p")}`;
  }

  const localizedDate = format(d, "PP").replace(`, ${getYear(d)}`, "");

  return `${localizedDate} at ${format(d, "p")}`;
};

export const getSiteBadge = (siteId: NetlifySite["id"]) => {
  const time = new Date().getTime();

  return fetch(
    `https://api.netlify.com/api/v1/badges/${siteId}/deploy-status?${time}`,
  );
};

export const getSiteDeploys = (siteId: NetlifySite["id"], options?: any) =>
  fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, options);

export const getSite = (siteId: NetlifySite["id"], options?: any) =>
  fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, options);

export const postSiteNewBuild = ({
  siteId,
  clearCache,
  headers,
}: {
  siteId: NetlifySite["id"];
  clearCache: boolean;
  headers: HeadersInit;
}) => {
  const options = {
    method: "POST",
    headers,
    // eslint-disable-next-line camelcase
    body: JSON.stringify({ clear_cache: clearCache }),
  };

  return fetch(
    `https://api.netlify.com/api/v1/sites/${siteId}/builds`,
    options,
  );
};

export const getDeployStatus = (
  deploy: NetlifyDeploy,
  publishedDeployId = null,
) => {
  if (publishedDeployId === deploy?.id) {
    return "published";
  }

  if (
    deploy.state === "error" &&
    deploy?.error_message?.toLowerCase().includes("canceled build") &&
    deploy?.plugin_state === "failed_build"
  ) {
    return "failed_due_to_plugin_error";
  }

  if (
    deploy?.state === "error" &&
    deploy?.error_message
      ?.toLowerCase()
      .includes("build script returned non-zero exit code")
  ) {
    return "failed";
  }

  if (
    deploy?.state === "error" ||
    deploy?.error_message?.toLowerCase().includes("canceled build")
  ) {
    return "canceled";
  }

  return "";
};
