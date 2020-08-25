import React from "react";
import { Container, InputGroup, FormControl } from "react-bootstrap";

import "./SearchPanel.scss";

export const SearchPanel = ({ getRepo, text, defaultValue }) => {
  const handleChange = (e) => {
    text(e.target.value);
  };

  return (
    <Container>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            {<img src={require("bootstrap-icons/icons/search.svg")} />}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={handleChange}
          defaultValue={defaultValue}
          placeholder="Issues search"
          aria-label="Issues search"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </Container>
  );
};
