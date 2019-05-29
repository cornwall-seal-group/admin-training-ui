import React from "react";

export default function({ baseUrl, id, seal }) {
  return (
    <div className="row">
      <h5>Image: {id}</h5>
      <div className="col s6 grey lighten-3">
        <img
          className="responsive-img"
          key={`orig${id}`}
          src={`${baseUrl}/${seal}/originals/${id}.jpg`}
          alt="Original img for {id}"
        />
      </div>
      <div className="col s6 grey lighten-2">
        <img
          className="responsive-img"
          key={`head${id}`}
          src={`${baseUrl}/${seal}/heads/${id}.jpg`}
          alt="Original img for {id}"
        />
      </div>
    </div>
  );
}
