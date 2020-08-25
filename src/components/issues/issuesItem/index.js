import React from "react";

import "./issuesItem.scss";

export function IssuesItem({ title, user, number }) {
  return (
    <div class="item-wrapper flex-auto">
      <a href="/" className="issues-item__tittle">
        {title}
      </a>
      <div class="mt-1 text-small text-gray">
        <span class="opened-by">
          #{number} opened by <a href="/">{user}</a>
        </span>
      </div>
    </div>
  );
}
