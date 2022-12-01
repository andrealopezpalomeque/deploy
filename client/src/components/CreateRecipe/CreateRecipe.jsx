import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getAllDiets } from "../../redux/actions/index";
import NavBar from "../NavBar/NavBar.jsx";
import "./CreateRecipe.css";

function validate(input) {
  const regNum = new RegExp("^[0-9]+$");
  const regName = new RegExp("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");
  const regImageUrl = new RegExp("^http.+(png|jpeg|gif|jpg)$");
  let errors = {};
  if (!input.name) errors.name = "Name is required";
  else if (!regName.test(input.name)) errors.name = "Enter a valid name";
  if (!input.summary) errors.summary = "Summary must be completed";
  if (!input.healthScore) errors.healthScore = "Health Score is required";
  else if (
    input.healthScore > 100 ||
    input.healthScore < 0 ||
    !regNum.test(input.healthScore)
  )
    errors.healthScore =
      "Health Score must be completed with a number between 1 and 100";
  if (!input.image) errors.image = "Image is required";
  else if (!regImageUrl.test(input.image))
    errors.image = "Enter the URL of the image";
  if (!input.steps) errors.steps = "You must specify the steps for this recipe";
  return errors;
}

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...new Set([...input.diets, e.target.value])],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(postRecipe(input));
      alert("Recipe submitted");
      setInput({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
      });
      history.push("/home");
    } else {
      alert("You must enter all the required information correctly");
    }
  }

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <h1 className="create-title">Create a Recipe!</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name: </label>
            <input
              className="inputf"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="form_message_error">{errors.name}</p>}
            <br />
          </div>
          <div>
            <label>Image: </label>
            <input
              className="inputf"
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && (
              <p className="form_message_error">{errors.image}</p>
            )}
            <br />
          </div>
          <div>
            <label>Summary: </label>
            <textarea
              className="inputf"
              type="text"
              value={input.summary}
              name="summary"
              onChange={(e) => handleChange(e)}
            />
            {errors.summary && (
              <p className="form_message_error">{errors.summary}</p>
            )}
            <br />
          </div>
          <div>
            <label>Health Score: </label>
            <input
              className="inputf"
              type="text"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleChange(e)}
            />
            {errors.healthScore && (
              <p className="form_message_error">{errors.healthScore}</p>
            )}
            <br />
          </div>
          <div>
            <label>Steps: </label>
            <textarea
              className="inputf"
              type="text"
              value={input.steps}
              name="steps"
              onChange={(e) => handleChange(e)}
            />
            {errors.steps && (
              <p className="form_message_error">{errors.steps}</p>
            )}
            <br />
          </div>
          <div>
            <label>Diets: </label>
            <select onChange={(e) => handleSelect(e)}>
              {diets.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <ul>
            <li>{input.diets.map((e) => " - " + e)}</li>
          </ul>
          <br />
          <button type="submit" className="btn">
            Send Recipe!
          </button>
        </form>
      </div>
    </div>
  );
}
