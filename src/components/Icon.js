import React from "react";

export default function Icon() {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    fetch(
      `https://api.netlify.com/api/v1/badges/47fb429a-9ec0-49b2-a153-699e569e7a9a/deploy-status`
    )
      .then((res) => res.text())
      .then(setIcon);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
}
