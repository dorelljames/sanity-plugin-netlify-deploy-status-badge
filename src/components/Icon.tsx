import React from "react";
import { NetlifyStatusBadgeConfig } from "../types";
import { getSiteBadge } from "../helpers";

const Icon = (props: NetlifyStatusBadgeConfig) => {
  const id = props.apiId;
  const [icon, setIcon] = React.useState("");

  const initialize = React.useCallback(() => {
    if (id) {
      getSiteBadge(id)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.text();
        })
        .then((result) => setIcon(result))
        .catch(() => setIcon(`Netlify Site 404`));
    }
  }, [id]);

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
};

export default Icon;
