export const prettyTime = (time) => `${Math.floor(time / 60)}m ${time % 60}s`;

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
