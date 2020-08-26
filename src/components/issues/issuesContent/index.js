import React from "react";

import { CardItem } from "./cardItem";

import "./issuesPage.scss";
import { Loader } from "../../Loader";

export function IssuesContent({
  title,
  number,
  username,
  body,
  labels,
  loading,
  id,
  avatar_url,
  created_at,
  textContent,
}) {
  return (
    <div className="issues-page">
      <div className="issues-page__wrapper">
        {id && loading && <Loader />}

        {id && !loading && (
          <>
            <h1>
              {title} <span className="tittle_opened">#{number}</span>
            </h1>
            <div className="text-card">
              <CardItem
                avatar_url={avatar_url}
                created_at={created_at}
                labels={labels}
                textContent={textContent}
                username={username}
              />
            </div>
          </>
        )}

        {!id && <h3 className="text-muted">Select an issue first</h3>}
      </div>
    </div>
  );
}
