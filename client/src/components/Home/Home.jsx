import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getAllDiets,
  filterByDiets,
  orderRecipes,
  filterCreated,
} from "../../redux/actions/index";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import Loading from "../Loading/Loading.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import "./Home.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NavBar from "../NavBar/NavBar.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const error = useSelector((state) => state.error);

  const [orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllRecipes());
  }

  function handleFilterByDiets(e) {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value));
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderRecipes(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${e.target.value}`);
  }

  if (Object.keys(error).length) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  } else if (!recipes.length) {
    return (
      <div>
        <NavBar />
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <div>
          <div className="search-refresh">
            <SearchBar />
            <button
              className="button-refresh"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Refresh Recipes
            </button>
          </div>
          <div className="select-filters">
            <select onChange={(e) => handleOrder(e)}>
              <option value="all">Order</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="ascHealthScore">Health Score: 1-100</option>
              <option value="descHealthScore">Health Score: 100-1</option>
            </select>
            <select onChange={(e) => handleFilterByDiets(e)}>
              <option value="allDiets">All Diets</option>
              {diets?.map((d) => {
                return (
                  <option key={d.id} value={d.name}>
                    {d.name.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="All">All recipes</option>
              <option value="created">Created Recipes</option>
              <option value="api">API Recipes</option>
            </select>
          </div>
          <div>
            <Pagination
              recipesPerPage={recipesPerPage}
              recipes={recipes.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
          <div className="cards">
            {currentRecipes?.map((e) => (
              <Link className="text-link" to={`home/${e.id}`}>
                <RecipeCard
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  diets={e.diets}
                  healthScore={e.healthScore}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
