import React, { Component } from "react";
import ImageComparator from "../image-comparator";
import Axios from "axios";
import { baseUrl } from "../../config.json";
export default class SealImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seals: [],
      seal: ""
    };
  }

  getInfoFromProps({ match }) {
    const { params, url } = match;
    const { seal = "" } = params;
    const iteration = url.split("/")[2];
    return { seal, iteration };
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
    const { seal, iteration } = this.getInfoFromProps(this.props);
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
      this.setState({ seals, seal });
    });
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps) {
    if (
      this.getInfoFromProps(this.props).seal !==
      this.getInfoFromProps(prevProps).seal
    ) {
      console.warn("going to fetch");
      this.setState({ seals: [] });
      this.fetchImages();
    }
  }

  render() {
    const { seals, seal } = this.state;
    const { seal: sealFromProps, iteration } = this.getInfoFromProps(
      this.props
    );

    return (
      <div>
        <h2>Images for {seal}</h2>

        {seal === sealFromProps &&
          seals.map(s => (
            <ImageComparator
              key={seal}
              id={seal}
              seal={s}
              baseUrl={baseUrl}
              iteration={iteration}
            />
          ))}
      </div>
    );
  }
}
