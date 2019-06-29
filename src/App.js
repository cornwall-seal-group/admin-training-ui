import React from "react";
import "./App.css";
import { Route, HashRouter as Router } from "react-router-dom";

import Menu from "./components/menu";
import ProjectScreen from "./screens/project-screen";
import ClassifierScreen from "./screens/classifier-tester";

function App() {
  return (
    <Router>
      <Menu />

      <main>
        <div className="section" id="index-banner">
          <div className="fullscreen">
            <div className="row">
              <div className="col s12 m12 xl12">
                <Route path="/project/:id" component={ProjectScreen} />
                <Route path="/classifier" component={ClassifierScreen} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Router>
  );
}

export default App;
