import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";

import { SearchPanel } from "./components/SearchPanel";
import { RepoList } from "./components/RepoList";
import { Loader } from "./components/Loader";
import { IssuesOpen } from "./components/issues/issuesOpen";
import { IssuesPage } from "./components/issues/issuesPage";

import "./App.css";

const CancelToken = Axios.CancelToken;

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);

    const cancelSource = CancelToken.source();

    const fetchRepos = async () => {
      const response = await Axios.get(
        `https://api.github.com/search/repositories?sort=stars&q=${searchText}`,
        {
          cancelToken: cancelSource.token,
        }
      );

      setRepos(response.data.items);
      setLoading(false);
    };

    fetchRepos();

    return () => cancelSource.cancel("Stop search");
  }, [searchText]);

  return (
    <div>
      <SearchPanel text={setSearchText} />

      {loading ? (
        <Loader />
      ) : (
        <Container className="RepoList__wrapper">
          {repos
            .map((r) => (r.language === "C++" ? { ...r, language: "cpp" } : r))
            .map((r) => (
              <RepoList
                key={r.id}
                fullName={r.full_name}
                description={r.description}
                forks={r.forks_count}
                lang={r.language}
                stars={r.stargazers_count}
              />
            ))}
        </Container>
      )}

      {}

      {/* {loading ? (
        <Container className="RepoList__wrapper">
          {repos.length <= 0
            ? loading && <Loader />
            : repos.map((r) => (
                <RepoList
                  key={r.id}
                  fullName={r.full_name}
                  description={r.description}
                  forks={r.forks_count}
                  lang={r.language}
                  stars={r.stargazers_count}
                />
              ))}
        </Container>
      ) : (
        <Container className="search-text-wrapper">
          <div className="search-text">Search something</div>
        </Container>
      )} */}

      {/*  */}
      {/* < div className="d-flex">
        <IssuesOpen />
        <IssuesPage />
      </div> */}
    </div>
  );
}

export default App;
