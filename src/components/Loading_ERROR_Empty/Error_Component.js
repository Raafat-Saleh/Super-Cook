/** @format */

import React from "react";
import Icons from "../../assets/img/icons.svg";

export default function Error_Component() {
  return (
    <div className="error">
      <div>
        <svg>
          <use xlinkHref={`${Icons}#icon-alert-triangle`} />
        </svg>
      </div>
      <p>Error: Somthing wrong was happen </p>
    </div>
  );
}
