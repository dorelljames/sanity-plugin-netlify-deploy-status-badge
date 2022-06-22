import React from "react";
import PropTypes from "prop-types";
import { Tooltip as STooltip, Box, Text } from "@sanity/ui";

export default function Tooltip({ text, children }) {
  return (
    <STooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            {text}
          </Text>
        </Box>
      }
      fallbackPlacements={["right", "left"]}
      placement="top"
    >
      {children}
    </STooltip>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
