import React, { Component } from "react";
import SealCard from "./seal-card";
import Axios from "axios";
import { baseUrl } from "../../config.json";

export default class SealPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seals: []
    };
  }
  componentDidMount() {
    const url = baseUrl + "/seals.csv";

    Axios.get(url).then(({ data }) => {
      const split = data.split("\n");
      const seals = split.splice(0, split.length - 1);
      this.setState({ seals });
    });
  }

  render() {
    const { seals } = this.state;
    return seals.map(seal => <SealCard seal={seal} />);
  }
}
