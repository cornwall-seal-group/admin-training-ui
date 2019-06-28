import React, { Component } from "react";
import { Route } from "react-router-dom";
import Axios from "axios";
import { baseUrl } from "../config.json";
import SealCard from "../components/seal-picker/seal-card";
import SealImages from "../components/seal-images";

export default class ProjectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seals: {}
    };
  }

  getProjectFromProps({ match }) {
    const { params } = match;
    const { id = "" } = params;
    return id;
  }

  componentDidMount() {
    const url =
      baseUrl +
      `/classifier-test-images/41e2a93c-9091-4bbd-a3b4-14be00814812/seals.json`;

    Axios.get(url).then(({ data: seals }) => {
      this.setState({ seals });
    });
  }

  render() {
    const { seals = {} } = this.state;
    const seal = "LIZ296";

    const first =
      seals[
        `../classifier-test-images/41e2a93c-9091-4bbd-a3b4-14be00814812/${seal}`
      ] || {};

    return (
      <>
        <h1>Results for {seal}</h1>
        <div className="row">
          {Object.keys(first).map(key => {
            return (
              <>
                <div className="col col-6">
                  <img
                    alt="seal"
                    src={`${baseUrl}/classifier-test-images/41e2a93c-9091-4bbd-a3b4-14be00814812/${seal}/${key}`}
                  />
                </div>
                <div className="col col-6">
                  <ul>
                    {Object.keys(first[key])
                      .sort((a, b) => first[key][b] - first[key][a])
                      .map(prediction => {
                        return (
                          <li className={prediction === seal ? "green" : ""}>
                            {prediction}: {first[key][prediction]}{" "}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
}
