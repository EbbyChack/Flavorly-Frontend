import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import AllRecipes from "./components/AllRecipes";
import Recipe from "./components/Recipe";
import UserProfile from "./components/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={PrivateRoute()}>
            <Route path="" element={UserProfile()} />
          </Route>
          <Route path="/recipe/:id" element={PrivateRoute()}>
            <Route path="" element={<Recipe />} />
          </Route>
          <Route path="/allrecipes" element={PrivateRoute()}>
            <Route path="" element={<AllRecipes />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
