import { Navbar, Dropdown } from "react-materialize";
import React, { Component } from "react";
import { trainingKey } from "../../config.json";
import Axios from "axios";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      iterations: []
    };
  }
  componentDidMount() {
    const url =
      "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Training/projects/";

    const options = {
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Training-Key": trainingKey,
        "API-Call-Origin": "Microsoft.Cognitive.CustomVision.Portal"
      }
    };
    Axios(options).then(({ data = [] }) => {
      this.setState({
        projects: data.map(project => ({ ...project, iterations: [] }))
      });
      data.map(project => this.getProjectIterations(project));
    });
  }

  getProjectIterations = project => {
    const { id } = project;
    const url = `https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Training/projects/${id}/iterations`;
    const options = {
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Training-Key": trainingKey,
        "API-Call-Origin": "Microsoft.Cognitive.CustomVision.Portal"
      }
    };

    Axios(options).then(({ data }) => {
      const { projects } = this.state;
      const projectToUpdate = projects.find(p => p.id === id);
      projectToUpdate.iterations = data;
      this.setState({ projects });
    });
  };

  render() {
    const { projects = [] } = this.state;
    return (
      <Navbar brand={<a />} alignLinks="right">
        {projects.map(project => (
          <Dropdown trigger={<a href="#">{project.name}</a>}>
            {project.iterations &&
              project.iterations.map(iter => (
                <a
                  key={iter.id}
                  href={`#project/${iter.id}?project=${
                    project.name
                  }&iterationName=${iter.publishName}`}
                  disabled={iter.publishName === ""}
                >
                  {iter.publishName} ({iter.name})
                </a>
              ))}
          </Dropdown>
        ))}
      </Navbar>
    );
  }
}
