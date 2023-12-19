/** @format */

import React from "react";
import Icons from "../../assets/img/icons.svg";

export default function Empty_Component() {
  return (
    <div className="error">
      <div>
        <svg>
          <use xlinkHref={`${Icons}#icon-alert-triangle`} />
        </svg>
      </div>
      <p>No recipes found! Please try again</p>
    </div>
  );
}
