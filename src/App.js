import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Category from "./pages/Category";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Artist from "./pages/Artist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/category/:id" element={<Category />}></Route>
        <Route path="/artist/:id" element={<Artist />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
