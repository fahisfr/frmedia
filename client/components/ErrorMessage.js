import React from "react";
import { BiSad } from "react-icons/bi";

function FailedToFetch({ error }) {
  return (
    <div className="post_failed_fetch">
      <div>
        <BiSad size={34} style={{ color: "var(--secondary-color)" }} />
      </div>
      <div>
        <span style={{ color: "var(--text-primary)" }}>{error}</span>
      </div>
    </div>
  );
}

export default FailedToFetch;
