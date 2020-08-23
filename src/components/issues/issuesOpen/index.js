import React from 'react'
import { Tab, Tabs, InputGroup, FormControl } from 'react-bootstrap';

import { IssuesItem } from '../issuesItem'

import './issuesOpen.scss'

export function IssuesOpen() {
    let open = 23
    let close = 23
    return (


        <div className="issues-wrapper">
            <div className="issues-item">
                <Tabs id="controlled-tab-example">
                    <Tab
                        eventKey="Open"
                        title={`${open} Opened`}
                    >
                        <div className="finder">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
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

                    <Tab
                        eventKey="Closed"
                        title={`${close} Closed`}
                    >
                        <div className="finder">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
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

    )
}


