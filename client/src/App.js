import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe.jsx";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail.jsx";
import axios from "axios";
axios.defaults.baseURL = "https://pi-food-app-production.up.railway.app/";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/home/:id" component={RecipeDetail} />
      <Route exact path="/home" component={Home}></Route>
      {/* <Route exact path="/update/:id" component={CreateRecipe} /> */}
      <Route exact path="/create" component={CreateRecipe} />
    </div>
  );
}

export default App;
