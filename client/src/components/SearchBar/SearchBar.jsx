import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions/index";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function validate(value) {
    let error = "";
    let testLetter = /^[a-zA-Z][^$()@!¡""#/=¿{},.?*-_%&|<>#]*$/; //validate letter
    if (!testLetter.test(value)) {
      error = "Only letters are allowed in the search";
    }
    return error;
  }

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    setError(validate(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("Please enter the name of a recipe");
    } else if (!error) {
      dispatch(getRecipesByName(name));
      setName("");
    } else {
      alert(error);
    }
  }
  return (
    <div className="search-container">
      <input
        className="inputsearch"
        type="text"
        value={name}
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button onClick={(e) => handleSubmit(e)} className="search-btn">
        Search Recipe
      </button>
    </div>
  );
}
