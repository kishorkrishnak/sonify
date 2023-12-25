import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Artist, Artists, Category, Discover, Home, Songs } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/category/:id" element={<Category />}></Route>
        <Route path="/artist/:id" element={<Artist />}></Route>
        <Route path="/artists" element={<Artists />}></Route>
        <Route path="/songs" element={<Songs />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
