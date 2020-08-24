import React from "react";
import { Tab, Tabs, InputGroup, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { IssuesItem } from "../issuesItem";

import "./issuesOpen.scss";
import { BackArrowIcon } from "../../icons/back-arrow";

export function IssuesOpen() {
  const history = useHistory();
  let open = 23;
  let close = 23;
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
          <Tab eventKey="Open" title={`${open} Opened`}>
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
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
              </div>
            </div>
          </Tab>

          <Tab eventKey="Closed" title={`${close} Closed`}>
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
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
                <IssuesItem />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
