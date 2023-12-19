/** @format */

import React, { useState, useEffect } from "react";
import Icons from "../../assets/img/icons.svg";
import { useParams } from "react-router-dom";
import Error_Component from "../Loading_ERROR_Empty/Error_Component";
import Loading_Component from "../Loading_ERROR_Empty/Loading_Component";
import "./index.scss";

export default function Recipe() {
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  let { id } = useParams();

  const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}${id}`)
      .then((response) => {
        if (!response.ok) {
          setError("Somthing wrong was happen");
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setdata(data.data.recipe);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, [id]);

  if (Loading) return <Loading_Component />;

  if (Error) return <Error_Component />;

  return (
    <div className="recipe">
      <figure className="recipe__fig">
        <img src={data.image_url} alt={data.title} className="recipe__img" />
        <h1 className="recipe__title">
          <span>{data.title}</span>
        </h1>
      </figure>

      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use xlinkHref={`${Icons}#icon-clock`} />
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {data.cooking_time}
          </span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use xlinkHref={`${Icons}#icon-users`} />
          </svg>
          <span className="recipe__info-data recipe__info-data--people">
            {data.servings}
          </span>
          <span className="recipe__info-text">servings</span>
        </div>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>

        <ul className="recipe__ingredient-list">
          {data?.ingredients?.map((data, i) => {
            return (
              <li className="recipe__ingredient" key={i}>
                <svg className="recipe__icon">
                  <use xlinkHref={`${Icons}#icon-check`} />
                </svg>
                <div className="recipe__quantity">
                  {data.quantity ? data.quantity.toString() : ""}
                </div>
                <div className="recipe__description">
                  <span className="recipe__unit">{data.unit}</span>
                  {data.description}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was designed by&nbsp;
          <span className="recipe__publisher">{data.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          className="btn--small recipe__btn"
          href={`${data.source_url}`}
          target="_blank"
        >
          <span>Directions</span>
          <svg className="search__icon">
            <use xlinkHref={`${Icons}#icon-arrow-right`} />
          </svg>
        </a>
      </div>
    </div>
  );
}
