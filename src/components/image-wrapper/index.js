import React, { Component } from "react";
import ImageComparator from "../image-comparator";
import Axios from "axios";
import { baseUrl } from "../../config.json";
export default class ImageWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seals: []
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
      const storedSeals = split.splice(0, split.length - 1);
      const seals = storedSeals.reduce((acc, seal) => {
        const imagesPerSeal = seal.split(",");
        const originalImg = imagesPerSeal[0];
        const predictions = imagesPerSeal.slice(1);

        acc.push({
          seal: originalImg,
          predictions
        });

        return acc;
      }, []);
      this.setState({ seals });
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
    const { seals } = this.state;
    const sealID = this.getSealFromProps(this.props);
    return (
      <div>
        <h2>Images for {sealID}</h2>
        {seals.map(seal => (
          <ImageComparator
            key={sealID}
            id={sealID}
            seal={seal}
            baseUrl={baseUrl}
          />
        ))}
      </div>
    );
  }
}
