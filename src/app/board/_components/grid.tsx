import React, { useState } from "react";

const Grid: React.FC = () => {
  const [gridState, setGridState] = useState<number>(0);
  const states = ["none", "url(#grid)", "url(#dots)"];

  const toggleGrid = () => {
    setGridState((prev) => (prev + 1) % states.length);
  };

  const createPatterns = () => (
    <defs>
      <pattern
        id="smallGrid"
        width="30"
        height="30"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 30 0 L 0 0 0 30"
          fill="none"
          stroke="gray"
          strokeWidth="0.5"
        />
      </pattern>
      <pattern id="grid" width="300" height="300" patternUnits="userSpaceOnUse">
        <rect width="300" height="300" fill="url(#smallGrid)" />
        <path
          d="M 300 0 L 0 0 0 300"
          fill="none"
          stroke="gray"
          strokeWidth="1"
        />
      </pattern>
      <pattern
        id="dots"
        width="30"
        height="30"
        x="-10"
        y="-10"
        patternUnits="userSpaceOnUse"
      >
        <circle fill="gray" cx="10" cy="10" r="2" />
      </pattern>
    </defs>
  );

  return (
    <svg width="100%" height="100%" onClick={toggleGrid}>
      {createPatterns()}
      <rect width="100%" height="100%" fill={states[gridState]} />
    </svg>
  );
};

export default Grid;
