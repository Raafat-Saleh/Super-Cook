/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Error_Component from "../Loading_ERROR_Empty/Error_Component";
import Loading_Component from "../Loading_ERROR_Empty/Loading_Component";
import Empty_Component from "../Loading_ERROR_Empty/Empty_Component";
import "./index.scss";

export default function SearchResult({ data, loading, error, empty }) {
  if (loading) return <Loading_Component />;

  if (error) return <Error_Component />;

  if (empty) return <Empty_Component />;

  return (
    <ul className="results">
      {data.map((data) => {
        const id = window.location.hash.slice(1);
        return (
          <li className="preview" key={data.id}>
            <Link
              className={`preview__link ${
                data.id === id ? "preview__link--active" : ""
              }`}
              to={`/${data.id}`}
            >
              <figure className="preview__fig">
                <img src={data.image_url} alt={data.title} />
              </figure>
              <div className="preview__data">
                <h4 className="preview__title">{data.title}</h4>
                <p className="preview__publisher">{data.publisher}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
