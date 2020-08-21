import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";

import { SearchPanel } from "./components/SearchPanel";
import { RepoList } from "./components/RepoList";
import { Loader } from "./components/Loader";
import { IssuesOpen } from "./components/issues/issuesOpen";
import { IssuesPage } from "./components/issues/issuesPage";

import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const response = await Axios.get("https://api.github.com/search/repositories?sort=stars&q=s");
      setRepos(response.data.items);
    };

    fetchRepos();
  }, []);

  const isLoad = true;

  console.log(repos);

  return (
    <div>
      <SearchPanel />
      <Container className="RepoList__wrapper">
        {repos.map((r) => (
          <RepoList key={r.id} fullName={r.full_name} description={r.description} forks={r.forks_count} lang={r.language} stars={r.stargazers_count} />
        ))}
      </Container>
      {/* < div className="d-flex">
        <IssuesOpen />
        <IssuesPage />
      </div> */}
    </div>
  );
}

export default App;
