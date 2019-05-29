import React from "react";
import { Link } from "react-router-dom";
export default function({ seal }) {
  return (
    <div class="row">
      <div class="col s6 teal lighten-3">
        <Link to={`/${seal}`}>{seal}</Link>
      </div>
    </div>
  );
}
