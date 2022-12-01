const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipe.js");
const diets = require("./diet.js");

const router = Router();
router.use("/recipes", recipes);
router.use("/diets", diets);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
