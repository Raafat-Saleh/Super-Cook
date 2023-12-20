/** @format */

import Icons from "../src/assets/img/icons.svg";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchResult from "./components/searchResult/SearchResult";
import Default from "./components/recipe/Default";
import Recipe from "./components/recipe/Recipe";
import "./App.scss";

function App() {
  const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [emptyData, setEmptyData] = useState(false);

  const searchSubmit = (event) => {
    event.preventDefault();
    setSearchLoading(true);
    setEmptyData(false);
    fetch(`${API_URL}?search=${search}`)
      .then((response) => {
        if (!response.ok) {
          setSearchError("Somthing wrong was happen");
        }
        setSearchLoading(false);
        return response.json();
      })
      .then((data) => {
        const items = data.data.recipes.slice(0, 12);
        if (items.length === 0) {
          setEmptyData(true);
        }
        setdata(items);
      })
      .catch((e) => {
        setSearchLoading(false);
        console.log(e);
        setSearchError("Somthing wrong was happen");
      });
  };

  return (
    <div>
      <div className="container">
        <header className="header">
          <form className="search" onSubmit={searchSubmit}>
            <input
              type="text"
              className="search__field"
              placeholder="Search for recipes..."
              onChange={(e) => setsearch(e.target.value)}
            />
            <button className="btn search__btn" type="submit">
              <svg className="search__icon">
                <use xlinkHref={`${Icons}#icon-search`} />
              </svg>
              <span>Search</span>
            </button>
          </form>
        </header>

        <section className="content-container">
          <div className="search-results">
            <SearchResult
              data={data}
              loading={searchLoading}
              error={searchError}
              empty={emptyData}
            />
          </div>
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/:id" element={<Recipe />} />
            <Route path="*" element={<Default />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
