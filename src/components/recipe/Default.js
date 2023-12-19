/** @format */

import React from "react";
import Icons from "../../assets/img/icons.svg";

export default function Default() {
  return (
    <div className="message">
      <div>
        <svg>
          <use xlinkHref={`${Icons}#icon-smile`} />
        </svg>
      </div>
      <p> Start by searching for a recipe or an ingredient.</p>
    </div>
  );
}
