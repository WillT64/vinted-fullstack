import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Connect from "./pages/Connect";
import Register from "./pages/Register";
import Publish from "./pages/Publish";
import Buy from "./pages/Buy";

import Header from "./components/header";

import "./App.scss";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 1 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} handleToken={handleToken} />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/connect"
          element={<Connect handleToken={handleToken} />}
        />
        <Route
          path="/register"
          element={<Register handleToken={handleToken} />}
        />
        <Route path="/publish" element={<Publish userToken={userToken} />} />
        <Route path="/buy/:price/:name" element={<Buy />} />
      </Routes>
    </Router>
  );
}

export default App;
