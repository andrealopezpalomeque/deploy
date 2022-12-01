import React from "react";
import "./RecipeCard.css";

export default function RecipeCard({ name, image, diets, healthScore }) {
  return (
    <div className="card">
      <div className="text">
        <img src={image} alt={name} className="card-img " />
        <h2>{name}</h2>
        <h3> {diets.map((e) => "- " + e + " ")}</h3>
        <h4>Health Score: {healthScore}</h4>
      </div>
    </div>
  );
}
