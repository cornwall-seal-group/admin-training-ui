import React from "react";
import "./App.css";
import { Route, HashRouter as Router } from "react-router-dom";

import Menu from "./components/menu";
import ProjectScreen from "./screens/project-screen";
function App() {
  return (
    <>
      <Menu />

      <main>
        <div className="section" id="index-banner">
          <div className="fullscreen">
            <div className="row">
              <div className="col s12 m12 xl12">
                <Router>
                  <Route path="/project/:id" component={ProjectScreen} />
                </Router>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
