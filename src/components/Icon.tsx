import React from "react";
import { BADGE_REFRESH_INTERVAL } from "../config";
import { getSiteBadge } from "../utils";

export default function Icon(props: any) {
  const siteId = "d0139072-ed70-47b3-bdf6-2ca7e97283d3";
  const [icon, setIcon] = React.useState<string>("");

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
