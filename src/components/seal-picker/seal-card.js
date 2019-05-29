import React from "react";
export default function({ seal }) {
  return (
    <a className="waves-effect waves-light btn" href={`/${seal}`}>
      {seal}
    </a>
  );
}
