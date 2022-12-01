require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const { Diet } = require("../db");
const router = Router();
const API_KEY = process.env.API_KEY;

// router.get("/", async (req, res) => {
//   const listOfDiets = [
//     "gluten free",
//     "dairy free",
//     "ketogenic",
//     "lacto ovo vegetarian",
//     "vegan",
//     "pescatarian",
//     "paleolithic",
//     "primal",
//     "fodmap friendly",
//     "whole 30",
//   ];
//   try {
//     listOfDiets.forEach((e) => {
//       Diet.findOrCreate({
//         where: { name: e },
//       });
//     });
//     const allDiets = await Diet.findAll();
//     res.status(200).send(allDiets);
//   } catch (error) {
//     res.status(404).send("No fue posible encontrar ninguna dieta");
//   }
// });

// router.get("/", async (req, res) => {
// const listDiets = [
//   "gluten free",
//   "dairy free",
//   "ketogenic",
//   "lacto ovo vegetarian",
//   "vegan",
//   "pescatarian",
//   "paleolithic",
//   "primal",
//   "fodmap friendly",
//   "whole 30",
// ];

// try {
//   //Si lo que busco ya esta dentro de mi tabla no lo creo
//   listDiets.forEach((e) => {
//     Diet.findOrCreate({
//       where: { name: e },
//     });
//   });
//   const all = await Diet.findAll();
//   res.status(200).send(all);
// } catch (error) {
//   res.status(404).send("Diets not found");
// }
/*   let arrDiets = [
    { diets: "gluten free" },
    { diets: "dairy free" },
    { diets: "ketogenic" },
    { diets: "lacto ovo vegetarian" },
    { diets: "vegan" },
    { diets: "paleo" },
    { diets: "primal" },
    { diets: "whole 30" },
    { diets: "paleolithic" },
    { diets: "pescatarian" },
  ];
  arrDiets.map((a) => {
    Diet.findOrCreate({ where: { diets: a.diets } });
  });
  try {
    let diets = await Diet.findAll();
    res.status(200).send(diets);
  } catch (error) {
    return res.status(404).send("Ooops 404 error");
  }
}); */
// const getDBDiets = async () => {
//   const apiInfo = await axios.get(
//     `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
//   );
//   let apiDiets = apiInfo.data.results.map((el) => el.diets);
//   apiDiets = [...new Set(apiDiets.flat()), "vegetarian"];

//   for (let i = 0; i < apiDiets.length; i++) {
//     await Diet.findOrCreate({ where: { name: apiDiets[i] } });
//   }

//   return await Diet.findAll();
// };
// router.get("/", async (req, res) => {
//   try {
//     res.status(200).json(await getDBDiets());
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const diets = [
//       "vegetarian",
//       "vegan",
//       "gluten free",
//       "dairy free",
//       "ketogenic",
//       "lacto ovo vegetarian",
//       "pescatarian",
//       "paleolithic",
//       "primal",
//       "fodmap",
//       "whole 30",
//     ];

//     let dietsDB = await Diet.findAll();
//     if (dietsDB.length === 0) {
//       for (let i = 0; i < diets.length; i++) {
//         await Diet.create({
//           name: diets[i],
//         });
//       }
//     }
//     dietsDB = await Diet.findAll();
//     return res.status(201).json(dietsDB);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
router.get("/", async (req, res) => {
  /* const apiInfo = await axios.get(
    `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
  ); */
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  let apiDiets = apiInfo.data.results.map((el) => el.diets);

  apiDiets = [...new Set(apiDiets.flat()), "vegetarian"];

  apiDiets.forEach((e) => {
    Diet.findOrCreate({ where: { name: e } });
  });

  const allDiets = await Diet.findAll();

  return res.status(200).json(allDiets);
});
module.exports = router;
