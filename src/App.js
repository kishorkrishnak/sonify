import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Category from "./pages/Category";
import Discover from "./pages/Discover";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/category/:id" element={<Category />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
