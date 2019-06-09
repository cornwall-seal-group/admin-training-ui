import React from "react";
export default function({ project, selectProject }) {
  const { id, name } = project;
  return (
    <div class="card">
      <h1 onClick={selectProject}>{name}</h1>
    </div>
  );
}
