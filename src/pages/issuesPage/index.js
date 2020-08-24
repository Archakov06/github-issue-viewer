import React from "react";

import { IssuesOpen } from "../../components/issues/issuesOpen";
import { IssuesContent } from "../../components/issues/issuesContent";

import "./issuesPage.scss";

export const IssuesPage = () => {
  let empty = true;
  return (
    <div>
      <IssuesOpen />
      {empty ? (
        <div className="emptyIssues">HELLO, I'my wRAPER</div>
      ) : (
        <IssuesContent />
      )}
    </div>
  );
};
