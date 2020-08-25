import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import { IssuesOpen } from "../../components/issues/issuesOpen";
import { IssuesContent } from "../../components/issues/issuesContent";
import "./issuesPage.scss";
import Axios from "axios";
import { Tabs, Tab, Card, Spinner, Button } from "react-bootstrap";

const Issues = ({ owner, repo, closed }) => {
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
      setIsLoading(false);
    }
  };

  console.log(issues);

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchIssues}
        hasMore={issues.total_count > issues.items.length}
        initialLoad={false}
        loader={<Spinner animation="border" variant="primary" />}
      >
        {issues.items.map((i) => (
          <Card key={i.id} style={{ margin: "10px 5px", minWidth: "200px" }}>
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

  const history = useHistory();

  return (
    <div className="issueMenu">
      <Button variant="light" onClick={() => history.goBack()}>
        Back
      </Button>
      <Tabs defaultActiveKey="open">
        <Tab eventKey="open" title="Open">
          <Issues owner={owner} repo={repo} closed="open" />
        </Tab>
        <Tab eventKey="closed" title="Closed">
          <Issues owner={owner} repo={repo} closed="closed" />
        </Tab>
      </Tabs>
    </div>
  );
};
