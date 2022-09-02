import React from "react";
import { BiSad } from "react-icons/bi";

function FailedToFetch({ error }) {
  return (
    <div className="post_failed_fetch">
      <div>
        <BiSad size={34} />
      </div>
      <div>
        <span>{error}</span>
      </div>
    </div>
  );
}

export default FailedToFetch;
