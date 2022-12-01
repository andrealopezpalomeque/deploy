import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const ERROR = "ERROR";
export const POST_RECIPE = "POST_RECIPE";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const FILTER_CREATED = "FILTER_CREATED";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export function getAllRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/recipes");
      return dispatch({
        type: GET_ALL_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

export function postRecipe(data) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/recipes", data);
      return dispatch({
        type: POST_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

/* export function updateRecipe(recipe) {
  return async function (dispatch) {
    try {
      const response = await axios.put("http://localhost:3001/recipes", recipe);
      return dispatch({
        type: UPDATE_RECIPE,
        dispatch: response.data,
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
} */

export function deleteRecipe(id) {
  return async function (dispatch) {
    try {
      const response = axios.delete(`/recipes/${id}`);
      return dispatch({
        type: DELETE_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

export function getAllDiets() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/diets");
      return dispatch({
        type: GET_ALL_DIETS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipes?name=${name}`);
      return dispatch({
        type: GET_RECIPES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      // dispatch({ type: ERROR, payload: error });
      if (error.response) {
        alert("Recipe not found");
      }
    }
  };
}

export function getRecipeById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipes/${id}`);
      return dispatch({
        type: GET_RECIPE_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

export function filterByDiets(value) {
  return async function (dispatch) {
    return dispatch({ type: FILTER_BY_DIETS, payload: value });
  };
}

export function orderRecipes(value) {
  return async function (dispatch) {
    return dispatch({ type: ORDER_RECIPES, payload: value });
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
