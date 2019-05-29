import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ImageWrapper from "./components/image-wrapper";
import SealPicker from "./components/seal-picker";

function App() {
  return (
    <div className="container">
      <nav>
        <div className="nav-wrapper">
          <a href="#" class="brand-logo">
            Seal Training Admin UI
          </a>
        </div>
      </nav>
      <div className="divider" />
      <div className="section">
        <Router>
          <Route path="/" component={SealPicker} />
          <Route path="/:seal" component={ImageWrapper} />
        </Router>
      </div>
    </div>
  );
}

export default App;
