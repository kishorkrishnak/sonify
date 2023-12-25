import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Artist from "./pages/Artist";
import Category from "./pages/Category";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Artists from "./pages/Artists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/category/:id" element={<Category />}></Route>
        <Route path="/artist/:id" element={<Artist />}></Route>
        <Route path="/artists" element={<Artists />}></Route>

      </Routes>
    </Router>
  );
}
export default App;
