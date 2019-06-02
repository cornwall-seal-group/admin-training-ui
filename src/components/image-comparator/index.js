import React from "react";
export default function({ id, baseUrl, seal }) {
  const { seal: orignalSeal, predictions = [] } = seal;

  return (
    <div className="row">
      <h5>Image: {orignalSeal}</h5>
      <div className="col s6 grey lighten-3">
        <img
          className="responsive-img"
          key={`orig${orignalSeal}`}
          src={`${baseUrl}/${id}/originals/${orignalSeal}`}
          alt="Original img for {orignalSeal}"
        />
      </div>
      <div className="col s6 grey lighten-2">
        {predictions.map(prediction => (
          <img
            className="responsive-img"
            key={`prediction${prediction}`}
            src={`${baseUrl}/${id}/predictions/${prediction}`}
            alt="Original img for {prediction}"
          />
        ))}
      </div>
    </div>
  );
}
