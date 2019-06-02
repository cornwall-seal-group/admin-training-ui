import React from "react";

export default function({ baseUrl, id, image }) {
  return (
    <div class="card">
      <span class="new badge blue" data-badge-caption="Image">
        Original
      </span>
      <img
        style={{ width: "100%" }}
        key={`originals${image}`}
        src={`${baseUrl}/${id}/originals/${image}`}
        alt="original img for {id}"
      />
    </div>
  );
}
