import React, { Component } from "react";
import ImageComparator from "../image-comparator";
import Axios from "axios";
import { baseUrl, iteration } from "../../config.json";
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

  comparePredictions(a, b) {
    const predA = parseFloat(a.percentage);
    const predB = parseFloat(b.percentage);

    let comparison = 0;
    if (predA < predB) {
      comparison = 1;
    } else if (predA > predB) {
      comparison = -1;
    }
    return comparison;
  }

  fetchImages() {
    const { match } = this.props;
    const { params } = match;
    const { seal } = params;
    const url = baseUrl + "/" + seal + "/" + seal + "-" + iteration + ".csv";

    Axios.get(url).then(({ data }) => {
      const split = data.split("\n");
      const storedSeals = split.splice(0, split.length - 1);
      const seals = storedSeals.reduce((acc, seal) => {
        const imagesPerSeal = seal.split(",");
        const originalImg = imagesPerSeal[0];
        const predictions = imagesPerSeal.slice(1);

        acc.push({
          seal: originalImg,
          predictions: predictions
            .reduce((acc, prediction) => {
              const predictionSplit = prediction.split("-");
              const name = predictionSplit[predictionSplit.length - 1];
              const ext = name.lastIndexOf(".");
              const percentage = name.substr(0, ext);

              acc.push({
                percentage: (percentage * 100).toFixed(2),
                image: prediction
              });
              return acc;
            }, [])
            .sort(this.comparePredictions)
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
      console.warn("going to fetch");
      this.fetchImages();
    }
  }

  render() {
    const { seals } = this.state;
    const sealID = this.getSealFromProps(this.props);
    console.warn(sealID);
    return (
      <div>
        <h2>Images for {sealID}</h2>
        {seals.map(seal => (
          <ImageComparator
            key={sealID}
            id={sealID}
            seal={seal}
            baseUrl={baseUrl}
            iteration={iteration}
          />
        ))}
      </div>
    );
  }
}
