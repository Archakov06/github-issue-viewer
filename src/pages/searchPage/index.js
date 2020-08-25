import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import { SearchPanel } from "../../components/SearchPanel";
import { RepoList } from "../../components/RepoList";
import { Loader } from "../../components/Loader";
import { ReposContext, SearchContext } from "../../App";
import useDebounce from "../../hooks/Debounce";

const CancelToken = Axios.CancelToken;

export const SearchPage = () => {
  const { repos, setRepos } = useContext(ReposContext);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const history = useHistory();
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

      {loading ? (
        <Loader />
      ) : (
        <Container className="RepteoList__wrapper">
          <InfiniteScroll
            hasMore={true}
            initialLoad={false}
            loadMore={() => {
              console.log("Loading more...");
            }}
          >
            {repos
              .map((r) =>
                r.language === "C++" ? { ...r, language: "cpp" } : r
              )
              .map((r) => (
                <RepoList
                  key={r.id}
                  fullName={r.full_name}
                  description={r.description}
                  forks={r.forks_count}
                  lang={r.language}
                  stars={r.stargazers_count}
                  handleClick={() => history.push(`/issues/${r.full_name}`)}
                />
              ))}
          </InfiniteScroll>
        </Container>
      )}

      {searchText === null && repos.length === 0 ? (
        <Container className="search-text-wrapper">
          <div className="search-text">Search something</div>
        </Container>
      ) : null}
    </div>
  );
};
