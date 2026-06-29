import React from "react";
import { useParams } from "react-router-dom";
import { componentRegistry } from "../config/componentRegistry";

function ComponentPreview() {
  const { componentName } = useParams();

  const component = componentRegistry[componentName];

  if (!component) {
    return (
      <div className="text-white">
        Component not found
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* <h1>{component.title}</h1> */}

      {component.preview}
    </div>
  );
}

export default ComponentPreview;