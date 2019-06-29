import React from "react";
import SealOriginal from "./seal-original";
import SealPrediction from "./seal-prediction";
export default function({ id, baseUrl, seal, iteration }) {
  const { seal: originalSeal, predictions = [] } = seal;

  return (
    <div className="row grey lighten-3 card">
      <div className="card-title grey lighten-2">Image: {originalSeal}</div>
      <div className="card-content">
        <div className="col s6">
          <SealOriginal
            baseUrl={baseUrl}
            id={id}
            image={originalSeal.replace(".jpg", ".jpeg")}
            key={originalSeal}
          />
        </div>
        <div className="col s6">
          {predictions.map(prediction => (
            <SealPrediction
              baseUrl={baseUrl}
              id={id}
              iteration={iteration}
              percentage={prediction.percentage}
              image={prediction.image}
              key={prediction.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
