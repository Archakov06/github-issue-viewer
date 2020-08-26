import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { IssuesContent } from "../../components/issues/issuesContent";
import { Loader } from "../../components/Loader";

const CancelToken = Axios.CancelToken;

export const IssueDetailsPage = () => {
  const [issue, setIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { owner, repo, id } = useParams();

  useEffect(() => {
    const cancelSource = CancelToken.source();

    const fetchIssue = async () => {
      setIsLoading(true);

      const response = await Axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues/${id}`,
        { cancelToken: cancelSource.token }
      );
      setIssue(response.data);
      setIsLoading(false);
    };

    fetchIssue();

    return () => cancelSource.cancel();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {issue && (
        <IssuesContent
          id={id}
          title={issue.title}
          loading={isLoading}
          number={issue.number}
          username={issue.user.login}
          avatar_url={issue.user.avatar_url}
          created_at={issue.created_at}
          labels={issue.labels}
          textContent={issue.body}
        />
      )}
    </div>
  );
};
