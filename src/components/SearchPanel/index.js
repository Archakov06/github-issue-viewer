import React from "react";
import { Form, Button, Container } from "react-bootstrap";

import "./SearchPanel.scss";

export const SearchPanel = ({ getRepo, text }) => {
  const handleChange = (e) => {
    text(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={getRepo}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="searchName"
            placeholder="Repository name"
            onChange={handleChange}
          />
          <Button variant="primary" type="submit">
            <svg height={30} width={30}>
              <g>
                <path
                  d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735
		c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0
		c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z
		 M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0
		C21.517,9.026,21.517,14.63,18.073,18.074z"
                />
              </g>
            </svg>
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
