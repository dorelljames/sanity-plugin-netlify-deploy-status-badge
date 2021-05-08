import React from "react";
import { siteId } from "../config";

export const BADGE_REFRESH_INTERVAL = 10000;

export default function Icon(props) {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    retrieveSiteBadge(siteId).then(setIcon);
  }, [siteId]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      retrieveSiteBadge(siteId).then(setIcon);
    }, BADGE_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
}

const retrieveSiteBadge = (siteId) => {
  const time = new Date().getTime();

  return fetch(
    `https://api.netlify.com/api/v1/badges/${siteId}/deploy-status?${time}`
  ).then((res) => res.text());
};
