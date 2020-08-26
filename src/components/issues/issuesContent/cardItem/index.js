import React from "react";
import { Card, Image } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import { Labels } from "../Labels";

import "./cardItem.scss";

export function CardItem({
  avatar_url,
  created_at,
  labels,
  textContent,
  username,
}) {
  const date = new Date(created_at);
  return (
    <Card>
      <Card.Header>
        <Image src={avatar_url} roundedCircle />
        <span> {username} </span>
        commented {`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`}
      </Card.Header>
      <Card.Body>
        <blockquote className="card-body__text">
          <ReactMarkdown source={textContent} />
        </blockquote>
      </Card.Body>
      {labels.length > 0 && (
        <Card.Footer className="d-flex">
          {labels.map((l) => (
            <Labels key={l.id} name={l.name} color={l.color} />
          ))}
        </Card.Footer>
      )}
    </Card>
  );
}
