import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Axios from "axios";
import { Tabs, Tab, Card, Spinner, Button } from "react-bootstrap";

import { IssuesOpen } from "../../components/issues/issuesOpen";
import { IssuesContent } from "../../components/issues/issuesContent";
import "./issuesPage.scss";

const CancelToken = Axios.CancelToken;

const Issues = ({ switchDisplay, owner, repo, closed, onLoadCount }) => {
  const [issues, setIssues] = useState({ total_count: 0, items: [] });
  const [isLoading, setIsLoading] = useState(false);

  const fetchIssues = async (page) => {
    if (!isLoading) {
      setIsLoading(true);
      const response = await Axios.get(
        `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue+state:${closed}&page=${page}&per_page=30`
      );
      setIssues({
        ...issues,
        total_count: response.data.total_count,
        items: [...issues.items, ...response.data.items],
      });
      onLoadCount(response.data.total_count);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        height={500}
        loadMore={fetchIssues}
        hasMore={issues.total_count > issues.items.length}
        initialLoad={false}
        loader={<Spinner animation="border" variant="primary" />}
      >
        {issues.items.map((i) => (
          <Card
            onClick={() => switchDisplay(i.number)}
            key={i.id}
            style={{ margin: "10px 5px", minWidth: "200px" }}
          >
            <Card.Body>
              <Card.Title>{i.title}</Card.Title>
              <Card.Text>{`${i.body.substring(0, 128)}${
                i.body.length > 128 && "..."
              }`}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {`#${i.number} opened by ${i.user.login}`}
            </Card.Footer>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export const IssuesPage = () => {
  const { owner, repo } = useParams();
  const [displayWidth, setDisplayWidth] = useState(window.screen.width);
  const [selectedId, setSelectedId] = useState(null);
  const [issue, setIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openCount, setOpenCount] = useState("");
  const [closedCount, setClosedCount] = useState("");

  const handleOnLoadCountOpen = (count) => {
    setOpenCount(count);
  };
  const handleOnLoadCountClose = (count) => {
    setClosedCount(count);
  };

  const history = useHistory();

  const isCompact = displayWidth < 768;

  useEffect(() => {
    window.addEventListener("resize", () =>
      setDisplayWidth(window.screen.width)
    );
    console.log(displayWidth);
  }, [displayWidth]);

  useEffect(() => {
    const cancelSource = CancelToken.source();

    const fetchIssue = async () => {
      setIsLoading(true);

      const response = await Axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues/${selectedId}`,
        { cancelToken: cancelSource.token }
      );
      setIssue(response.data);
      setIsLoading(false);
    };

    fetchIssue();

    return () => cancelSource.cancel();
  }, [selectedId]);

  const handleIssueNavigation = (number) => {
    history.push(`/repo/${owner}/${repo}/issue/${number}`);
  };

  const handleIssueClick = useCallback(
    (id) => {
      setSelectedId(id);
    },
    [setSelectedId]
  );

  return (
    <div>
      {isCompact ? (
        <div className="issueMenu">
          <Button variant="light" onClick={() => history.goBack()}>
            Back
          </Button>
          <Tabs defaultActiveKey="open">
            <Tab eventKey="open" title={`${openCount} Open`}>
              <Issues
                switchDisplay={handleIssueNavigation}
                owner={owner}
                repo={repo}
                closed="open"
                onLoadCount={handleOnLoadCountOpen}
              />
            </Tab>
            <Tab eventKey="closed" title={`${closedCount} Closed`}>
              <Issues
                switchDisplay={handleIssueNavigation}
                owner={owner}
                repo={repo}
                closed="closed"
                onLeaderCountOpen={handleOnLoadCountOpen}
                onLoaderCountClosed={handleOnLoadCountClose}
                onLoadCount={handleOnLoadCountClose}
              />
            </Tab>
          </Tabs>
        </div>
      ) : (
        <div className="d-flex">
          <div className="issueMenu">
            <Button variant="light" onClick={() => history.goBack()}>
              Back
            </Button>
            <Tabs defaultActiveKey="open">
              <Tab eventKey="open" title={`${openCount} Open`}>
                <Issues
                  owner={owner}
                  repo={repo}
                  closed="open"
                  switchDisplay={handleIssueClick}
                  onLoadCount={handleOnLoadCountOpen}
                />
              </Tab>
              <Tab eventKey="closed" title={`${closedCount} Closed`}>
                <Issues
                  owner={owner}
                  repo={repo}
                  closed="closed"
                  switchDisplay={handleIssueClick}
                  onLoadCount={handleOnLoadCountClose}
                />
              </Tab>
            </Tabs>
          </div>
          <div>
            {issue ? (
              <IssuesContent
                id={selectedId}
                title={issue.title}
                loading={isLoading}
                number={issue.number}
                username={issue.user.login}
                avatar_url={issue.user.avatar_url}
                created_at={issue.created_at}
                labels={issue.labels}
                textContent={issue.body}
              />
            ) : (
              <IssuesContent loading={isLoading} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
