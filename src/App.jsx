import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import AllRecipes from "./components/AllRecipes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/allrecipes" element={<AllRecipes/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
