import React from "react";
import { Link } from "react-router-dom";
export default function({ seal, url, project, iteration }) {
  return (
    <Link
      className="waves-effect waves-light btn"
      to={`${url}/${seal}?project=${project}&iter=${iteration}`}
    >
      {seal}
    </Link>
  );
}
