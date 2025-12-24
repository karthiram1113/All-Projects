import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DasherTippy = ({ content, children, placement = "top" }) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip>{content}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default DasherTippy;
