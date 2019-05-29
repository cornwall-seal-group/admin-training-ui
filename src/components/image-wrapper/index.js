import React, { Component } from "react";
import ImageComparator from "../image-comparator";
import Axios from "axios";
import { baseUrl } from "../../config.json";
export default class ImageWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: []
    };
  }

  getSealFromProps({ match }) {
    const { params } = match;
    const { seal = "" } = params;
    return seal;
  }

  fetchImages() {
    const { match } = this.props;
    const { params } = match;
    const { seal } = params;
    const url = baseUrl + "/" + seal + "/" + seal + ".csv";

    Axios.get(url).then(({ data }) => {
      const split = data.split("\n");
      const ids = split.splice(0, split.length - 1);
      this.setState({ ids });
    });
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps) {
    if (
      this.getSealFromProps(this.props) !== this.getSealFromProps(prevProps)
    ) {
      this.fetchImages();
    }
  }

  render() {
    const { ids } = this.state;
    const seal = this.getSealFromProps(this.props);
    return (
      <div>
        <h2>Images for {seal}</h2>
        {ids.map(id => (
          <ImageComparator key={id} id={id} seal={seal} baseUrl={baseUrl} />
        ))}
      </div>
    );
  }
}
