import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, deleteRecipe } from "../../redux/actions/index";
import NavBar from "../NavBar/NavBar.jsx";
import "./RecipeDetail.css";

export default function RecipeDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = props.match.params.id;

  let recipe = useSelector((state) => state.recipe);

  function handleDelete(e) {
    dispatch(deleteRecipe(id));
    alert(`${recipe.name} has successfully been deleted`);
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);
  return (
    <div>
      <NavBar />

      <div className="container_detail">
        <h1 className="title">{recipe.name}</h1>
        <img className="image-detail" src={recipe.image} alt="not found" />
        <h3>SUMMARY: </h3>
        <p className="summary">{recipe.summary}</p>
        <h3>HEALTH SCORE: </h3>
        <p>{recipe.healthScore}</p>
        <div>
          <h3>DIETS: </h3>
          {recipe.diets?.map((diet) => (
            <li className="diets_list">
              <ul key={diet}>{diet.toUpperCase()}</ul>
            </li>
          ))}
        </div>
        <div className="steps">
          <h3>STEPS: </h3>
          {typeof recipe.steps !== "string"
            ? recipe.steps?.map((e) => (
                <ol>
                  <p className="step" key={e.number}>
                    {e.number} - {e.step}
                  </p>
                </ol>
              ))
            : recipe.steps}
        </div>
        <div>
          <h3>DISH TYPES: </h3>
          {recipe.dishTypes?.map((d) => (
            <li className="dishes_list">
              <ul key={d}>{d.toUpperCase()}</ul>
            </li>
          ))}
        </div>
      </div>
      <div className="button_detail_container">
        {id.length >= 12 ? (
          <button className="button_delete" onClick={(e) => handleDelete(e)}>
            {" "}
            Delete Recipe{" "}
          </button>
        ) : (
          ""
        )}
        {/* {recipe.createdInDb ? (
          <button className="button_delete" onClick={(e) => handleDelete(e)}>
            {" "}
            Delete Recipe{" "}
          </button>
        ) : (
          ""
        )} */}
        <Link to="/home">
          <button className="button_back">Back Home</button>
        </Link>
      </div>
    </div>
  );
}
