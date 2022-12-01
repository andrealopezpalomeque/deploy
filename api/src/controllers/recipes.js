require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const API_KEY = process.env.API_KEY;

const getApiInfo = async () => {
  /* const apiUrl = await axios.get(
    `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
  ); */
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      summary: e.summary?.replace(/<[^>]*>?/g, ""),
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets,
      steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  const infoDb = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const responseDb = infoDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      summary: e.summary,
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets.map((e) => e.name),
      steps: e.steps,
    };
  });
  return responseDb;
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const getRecipeById = async (id) => {
  const idInApi = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  return {
    name: idInApi.data.title,
    image: idInApi.data.image,
    diets: idInApi.data.diets,
    steps: idInApi.data.analyzedInstructions[0]?.steps.map((e) => {
      return {
        number: e.number,
        step: e.step,
      };
    }),
    healthScore: idInApi.data.healthScore,
    dishTypes: idInApi.data.dishTypes,
    summary: idInApi.data.summary?.replace(/<[^>]*>?/g, ""),
  };
};

const getRecipeByPk = async (id) => {
  const idInDb = await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
    },
  });
  return {
    name: idInDb.name,
    summary: idInDb.summary,
    healthScore: idInDb.healthScore,
    diets: idInDb.diets?.map((e) => e.name),
    steps: idInDb.steps,
    image: idInDb.image,
  };
};

const deleteRecipe = async (id) => {
  const deleteRecipeFromDb = await Recipe.findByPk(id);

  deleteRecipeFromDb.destroy();
  return deleteRecipeFromDb;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
  getRecipeById,
  getRecipeByPk,
  deleteRecipe,
};
