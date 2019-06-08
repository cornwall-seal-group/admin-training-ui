import React from "react";

export default function({ baseUrl, id, percentage, image, iteration }) {
  return (
    <div class="card grey lighten-2">
      <span class="new badge" data-badge-caption="%">
        {percentage}
      </span>
      <img
        key={`prediction${image}`}
        style={{ "max-width": "100%" }}
        src={`${baseUrl}/${id}/${iteration}/${image}`}
        alt="Prediction img for {id}"
      />
    </div>
  );
}
