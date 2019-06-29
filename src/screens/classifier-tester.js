import React, { Component } from "react";
import Axios from "axios";
import { baseUrl } from "../config.json";

export default class ProjectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seals: {},
      selectedSeal: null
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

  pickSeal = seal => {
    this.setState({ selectedSeal: seal });
  };

  render() {
    const { seals = {}, selectedSeal = "" } = this.state;
    const seal = selectedSeal;

    const first =
      seals[
        `../classifier-test-images/41e2a93c-9091-4bbd-a3b4-14be00814812/${seal}`
      ] || {};

    return (
      <>
        {Object.keys(seals).map(seal => {
          const s = seal.split("/")[seal.split("/").length - 1];
          return (
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.pickSeal(s)}
            >
              {s}
            </button>
          );
        })}
        <h1>Results for {seal}</h1>
        {Object.keys(first)
          .sort((a, b) => a.split("-")[2] - b.split("-")[2])
          .map(key => {
            return (
              <div className="row">
                <div className="col s12">{key}</div>
                <div className="col s6">
                  <img
                    style={{ "max-width": "100%" }}
                    alt="seal"
                    src={`${baseUrl}/classifier-test-images/41e2a93c-9091-4bbd-a3b4-14be00814812/${seal}/${key}`}
                  />
                </div>
                <div className="col s6">
                  <ul>
                    {Object.keys(first[key])
                      .sort((a, b) => first[key][b] - first[key][a])
                      .map(prediction => {
                        return (
                          <li className={prediction === seal ? "green" : ""}>
                            {prediction}:{" "}
                            {(first[key][prediction] * 100).toFixed(2)}%
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            );
          })}
      </>
    );
  }
}
