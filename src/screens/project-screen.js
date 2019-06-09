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
      seals: []
    };
  }

  getProjectFromProps({ match }) {
    const { params } = match;
    const { id = "" } = params;
    return id;
  }

  componentDidMount() {
    const url = baseUrl + `/seals.csv`;

    Axios.get(url).then(({ data }) => {
      const split = data.split("\n");
      const seals = split.splice(0, split.length - 1);
      this.setState({ seals });
    });
  }

  render() {
    const { seals } = this.state;
    const { match, location } = this.props;
    const { url } = match;
    const { search } = location;
    const values = search.split("&");
    const project = decodeURI(values[0].split("=")[1]);
    const iteration = decodeURI(values[1].split("=")[1]);

    return (
      <>
        <h3>Project: {project}</h3>
        <h4>Iteration: {iteration}</h4>
        {seals.map(seal => (
          <SealCard
            seal={seal}
            url={url}
            project={project}
            iteration={iteration}
          />
        ))}
        <h4>Select a Seal from the list above</h4>
        <Route path={`${url}/:seal`} component={SealImages} />
      </>
    );
  }
}
