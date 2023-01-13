import React from "react";

import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

export const Spinner = () => {
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="flex justify-center translate-y-48">
      <ClipLoader
        color={color}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
