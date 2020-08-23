import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";

import { SearchPanel } from "./components/SearchPanel";
import { RepoList } from "./components/RepoList";
import { Loader } from "./components/Loader";
import { IssuesOpen } from "./components/issues/issuesOpen";
import { IssuesPage } from "./components/issues/issuesPage";
import useDebounce from "./hooks/Debounce";

import "./App.css";

const CancelToken = Axios.CancelToken;

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const debouncedSearchTerm = useDebounce(searchText, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);

      const cancelSource = CancelToken.source();

      const fetchData = async () => {
        const response = await Axios.get(
          `https://api.github.com/search/repositories?sort=stars&q=${debouncedSearchTerm}`,
          {
            cancelToken: cancelSource.token,
          }
        );
        setRepos(response.data.items);
        setLoading(false);
      };

      fetchData();

      return () => cancelSource.cancel("Fetch canceled.");
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <SearchPanel text={setSearchText} />

      {(loading ? (
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
        ))
      }

      {(searchText == null ? (
        <Container className="search-text-wrapper">
          <div className="search-text">Search something</div>
        </Container>
      ) : (null))}


      {/* < div className="d-flex">
        <div>
          <IssuesOpen />
          <IssuesPage />
        </div>
      </div> */}


    </div>
  );
}

export default App;
