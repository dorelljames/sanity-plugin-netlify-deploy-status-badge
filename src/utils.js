import { format, isToday, isYesterday } from "date-fns";

export const formatDeployTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (minutes === 0 && seconds === 0) {
    return "";
  }

  return `Deployed in ${minutes > 0 ? `${minutes}m` : ""} ${
    seconds > 0 ? `${seconds}s` : ""
  }`;
};

export const getSiteDeploys = (siteId, options) =>
  fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, options);

export const getSite = (siteId, options) =>
  fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, options);

export const triggerNewBuild = ({ siteId, clearCache, headers }) => {
  const options = {
    method: "POST",
    headers,
    // eslint-disable-next-line camelcase
    body: JSON.stringify({ clear_cache: clearCache }),
  };
  return fetch(
    `https://api.netlify.com/api/v1/sites/${siteId}/builds`,
    options
  );
};

export function formatDate(d) {
  if (isToday(d)) {
    return `Today at ${format(d, "p")}`;
  }

  if (isYesterday(d)) {
    return `Yesterday at ${format(d, "p")}`;
  }

  return `${format(d, "PP")} at ${format(d, "p")}`;
}