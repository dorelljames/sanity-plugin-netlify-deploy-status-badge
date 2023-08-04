/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  )
    .then(async (res) => {
      if (!res.ok) {
        return [res.status, null];
      }

      return [null, await res.text()];
    })
    .catch((err) => [err, null]);
};

export const getSiteDeploys = (
  siteId: NetlifySite["id"],
  // eslint-disable-next-line no-undef
  options?: RequestInit,
) =>
  fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, options)
    .then(async (res) => {
      if (!res.ok) {
        return [res.status, null];
      }

      return [null, await res.json()];
    })
    .catch((err) => [err, null]);

// eslint-disable-next-line no-undef
export const getSite = (siteId: NetlifySite["id"], options?: RequestInit) =>
  fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, options)
    .then(async (res) => {
      if (!res.ok) {
        return [res.status, null];
      }

      return [null, await res.json()];
    })
    .catch((err) => [err, null]);

export const postSiteNewBuild = ({
  siteId,
  clearCache,
  requestOptions,
}: {
  siteId: NetlifySite["id"];
  clearCache: boolean;
  // eslint-disable-next-line no-undef
  requestOptions?: RequestInit;
}) => {
  const options = {
    method: "POST",
    headers: requestOptions?.headers,
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
  publishedDeployId: null | string = null,
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
