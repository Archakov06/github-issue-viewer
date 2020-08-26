import React from "react";
import { Badge } from "react-bootstrap";
import "./Labels.scss";

export function Labels({ name, color }) {
  return (
    <div className="label-wrapper">
      <div>
        <Badge style={{ backgroundColor: `#${color}` }}>{name}</Badge>{" "}
      </div>
    </div>
  );
}
