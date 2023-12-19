/** @format */

import React from "react";
import Icons from "../../assets/img/icons.svg";
import "./index.scss";

export default function Loading_Component() {
  return (
    <div className="spinner">
      <svg>
        <use xlinkHref={`${Icons}#icon-loader`} />
      </svg>
    </div>
  );
}
