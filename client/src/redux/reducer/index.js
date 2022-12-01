import {
  GET_ALL_RECIPES,
  ERROR,
  POST_RECIPE,
  GET_ALL_DIETS,
  FILTER_BY_DIETS,
  ORDER_RECIPES,
  GET_RECIPES_BY_NAME,
  GET_RECIPE_BY_ID,
  FILTER_CREATED,
  /*  UPDATE_RECIPE, */
  DELETE_RECIPE,
} from "../actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  allRecipes2: [],
  diets: [],
  error: {},
  recipe: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        allRecipes2: action.payload,
      };
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    /* case UPDATE_RECIPE:
      return {
        ...state,
      }; */
    case DELETE_RECIPE:
      return {
        ...state,
      };
    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FILTER_BY_DIETS:
      const allRecipes = state.allRecipes;
      const dietsFiltered =
        action.payload === "allDiets"
          ? allRecipes
          : allRecipes.filter((e) => e.diets.includes(action.payload));
      return {
        ...state,
        recipes: dietsFiltered,
      };
    case ORDER_RECIPES:
      /*     let recipesInOrderAl =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: recipesInOrderAl,
      }; */
      switch (action.payload) {
        case "asc":
          state.recipes.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
          break;
        case "desc":
          state.recipes.sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase())
          );
          break;
        case "ascHealthScore":
          state.recipes.sort((a, b) => a.healthScore - b.healthScore);
          break;
        case "descHealthScore":
          state.recipes.sort((a, b) => b.healthScore - a.healthScore);
          break;
        default:
          return;
      }
      return {
        ...state,
        recipes: [...state.recipes],
      };
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipe: action.payload,
      };
    case FILTER_CREATED:
      const allRecipes2 = state.allRecipes;
      const createdFilter =
        action.payload === "created"
          ? allRecipes2.filter((e) => typeof e.id === "string")
          : allRecipes2.filter((e) => typeof e.id === "number");
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes2 : createdFilter,
      };
    default:
      return state;
  }
}
