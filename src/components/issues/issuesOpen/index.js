import React, { useEffect, useState } from "react";
import { Tab, Tabs, InputGroup, FormControl, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

import { IssuesItem } from "../issuesItem";

import "./issuesOpen.scss";
import { BackArrowIcon } from "../../icons/back-arrow";
import { Loader } from "../../Loader";

const CancelToken = Axios.CancelToken;

export function IssuesOpen() {
  const history = useHistory();

  const [issueOpen, setIssueOpen] = useState({ items: [], total_count: 0 });
  const [issueClose, setIssueClose] = useState({ items: [], total_count: 0 });

  const { owner, repo } = useParams();

  useEffect(() => {
    const cancelSource = CancelToken.source();

    const openRequest = Axios.get(
      `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:open&page=1&per_page=30`,
      {
        cancelToken: cancelSource.token,
      }
    );

    const closedRequest = Axios.get(
      `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:closed&page=1&per_page=30`,
      { cancelToken: cancelSource.token }
    );

    const fetchIssues = async () => {
      const [open, closed] = await Promise.all([openRequest, closedRequest]);

      setIssueOpen(open.data);
      setIssueClose(closed.data);
    };

    fetchIssues();

    return () => cancelSource.cancel();
  }, []);

  const fetchMore = async () => {
    console.log("Load more...");
    const page = issueOpen.items.length / 30;
    const response = await Axios.get(
      `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:closed&page=${page}&per_page=30`
    );
    setIssueClose({
      ...issueClose,
      items: [...issueClose.items, response.data.items],
    });
  };

  return (
    <div className="issues-wrapper">
      <div className="issues-item">
        <Button variant="light" onClick={() => history.goBack()}>
          <div className="back-btn">
            <BackArrowIcon color="#495057" size="32" />
            <span>BACK</span>
          </div>
        </Button>
        <Tabs id="controlled-tab-example">
          <Tab eventKey="Open" title={`${issueOpen.total_count} Opened`}>
            <div className="finder">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {<img src={require("bootstrap-icons/icons/search.svg")} />}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Issues search"
                  aria-label="Issues search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <div className="issues-content-wrapper">
              <div className="issues-content">
                {issueOpen.items.map((issue) => (
                  <IssuesItem
                    key={issue.id}
                    title={issue.title}
                    user={issue.user.login}
                    number={issue.number}
                  />
                ))}
              </div>
            </div>
          </Tab>

          <Tab eventKey="Closed" title={`${issueClose.total_count} Closed`}>
            <div className="finder">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {<img src={require("bootstrap-icons/icons/search.svg")} />}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Issues search"
                  aria-label="Issues search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <div className="issues-content-wrapper">
              <div className="issues-content">
                <InfiniteScroll
                  loader={<Loader />}
                  initialLoad={false}
                  hasMore={issueClose.total_count > issueClose.items.length}
                  loadMore={() => console.log("fetch")}
                  pageStart={0}
                >
                  {issueClose.items.map((issue) => (
                    <IssuesItem
                      key={issue.id}
                      title={issue.title}
                      user={issue.user.login}
                      number={issue.number}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
