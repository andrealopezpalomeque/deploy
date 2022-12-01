const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const router = Router();
const {
  getAllRecipes,
  getRecipeById,
  getRecipeByPk,
  deleteRecipe,
} = require("../controllers/recipes");

router.get("/", async (req, res) => {
  const { name } = req.query;
  let totalRecipes = await getAllRecipes();
  try {
    if (name) {
      let recipeName = await totalRecipes.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(404).send("No se encuentran recetas");
    } else {
      res.status(200).send(totalRecipes);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (id.length >= 12) {
    try {
      let dataInDb = await getRecipeByPk(id);
      return res.status(200).send(dataInDb);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  if (id) {
    try {
      let dataInApi = await getRecipeById(id);
      return res.status(200).send(dataInApi);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
});

router.post("/", async (req, res) => {
  const { name, summary, healthScore, diets, steps, image } = req.body;

  let recipeCreated = await Recipe.create({
    name,
    summary,
    healthScore,
    diets,
    steps,
    image,
  });
  let dietDb = await Diet.findAll({
    where: { name: diets },
  });
  recipeCreated.addDiet(dietDb);
  res.status(200).send("Receta creada con exito");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteRecipe(id);
    res.status(200).send("Recipe deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, summary, healthScore, steps, image } = req.body;

  try {
    const recipeToModify = await Recipe.findByPk(id);
    await recipeToModify.update({
      name: name,
      summary: summary,
      healthScore: healthScore,
      steps: steps,
      image: image,
    });

    await recipeToModify.save();

    return res.status(200).send("The recipe has successfully been updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
