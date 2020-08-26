import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { IssuesPage } from "./pages/issuesPage";
import { SearchPage } from "./pages/searchPage";

import "./App.css";
import { IssueDetailsPage } from "./pages/IssueDetails";

export const ReposContext = React.createContext(null);

function App() {
  const [repos, setRepos] = useState({ total_count: 0, items: [] });

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <ReposContext.Provider
            value={{
              repos,
              setRepos,
            }}
          >
            <SearchPage />
          </ReposContext.Provider>
        </Route>
        <Route path="/issues/:owner/:repo">
          <IssuesPage />
        </Route>
        <Route path="/repo/:owner/:repo/issue/:id">
          <IssueDetailsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
