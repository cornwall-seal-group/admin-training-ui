import React from "react";
import SealOriginal from "./seal-original";
import SealPrediction from "./seal-prediction";
export default function({ id, baseUrl, seal }) {
  const { seal: orignalSeal, predictions = [] } = seal;

  return (
    <div className="row grey lighten-3 card">
      <div className="card-title grey lighten-2">Image: {orignalSeal}</div>
      <div className="card-content">
        <div className="col s6">
          <SealOriginal
            baseUrl={baseUrl}
            id={id}
            image={orignalSeal}
            key={orignalSeal}
          />
        </div>
        <div className="col s6">
          {predictions.map(prediction => (
            <SealPrediction
              baseUrl={baseUrl}
              id={id}
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
