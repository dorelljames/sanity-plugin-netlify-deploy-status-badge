import React from "react";
import { siteId } from "../config";
import { getSiteBadge } from "../utils";

export const BADGE_REFRESH_INTERVAL = 10000;

export default function Icon(props) {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    getSiteBadge(siteId).then(setIcon);
  }, [siteId]);

  // Refresh icon on every interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      getSiteBadge(siteId).then(setIcon);
    }, BADGE_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
}
