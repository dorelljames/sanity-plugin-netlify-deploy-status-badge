import React from "react";
import { siteId } from "../config";
import { getSiteBadge } from "../utils";

export const BADGE_REFRESH_INTERVAL = 10000;

export default function Icon(props) {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    initializeBadge();
  }, [siteId]);

  // Refresh icon on every interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      initializeBadge();
    }, BADGE_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  function initializeBadge() {
    getSiteBadge(siteId)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      })
      .then(setIcon)
      .catch(() => setIcon(`Netlify Site 404`));
  }

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
}
