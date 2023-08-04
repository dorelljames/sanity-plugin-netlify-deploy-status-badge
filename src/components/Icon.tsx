import React from "react";
import { NetlifyDeployStatusBadgeConfig } from "../types";
import { getSiteBadge } from "../helpers";

const Icon = (props: NetlifyDeployStatusBadgeConfig) => {
  const id = props.apiId;
  const [icon, setIcon] = React.useState("");

  const initialize = React.useCallback(() => {
    if (id) {
      getSiteBadge(id)
        .then(([err, iconResult]) => {
          setIcon(err || iconResult);
        })
        .catch(() => setIcon(`Netlify Site 404`));
    }
  }, [id]);

  React.useEffect(() => {
    initialize();
  }, []);

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
};

export default Icon;
