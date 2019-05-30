import React from "react";
import { Link } from "react-router-dom";
export default function({ seal }) {
  return (
    <Link className="waves-effect waves-light btn" to={`/${seal}`}>
      {seal}
    </Link>
  );
}
