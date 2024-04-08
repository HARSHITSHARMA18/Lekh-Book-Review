import React from "react";
import lekhLogo from "../images/lekhLogo.png";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center justify-center">
      <img src={lekhLogo} alt="" width={width} />
    </div>
  );
}

export default Logo;
