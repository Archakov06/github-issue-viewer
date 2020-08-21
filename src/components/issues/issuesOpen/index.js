import React from 'react'
import { Tab, Nav, Row, Form, Button } from 'react-bootstrap';

import { IssuesItem } from '../issuesItem'

import './issuesOpen.scss'

export function IssuesOpen() {
    let open = 23
    let close = 23
    return (
        <div className="issues-wrapper">
            <div className="issues-item">
                <Tab.Container defaultActiveKey='first'>
                    <Row>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link eventKey='first'>
                                    <svg class="octicon octicon-issue-opened" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path></svg>
                                    <span>{`${open} Open`}</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='second'>
                                    <svg class="octicon octicon-check" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
                                    <span>{`${close} Closed`}</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>
                    <Row className="finder">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Issues name" />
                                <Button variant="primary" type="submit">
                                    <svg height={30} width={30}><g>
                                        <path d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735
		c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0
		c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z
		 M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0
		C21.517,9.026,21.517,14.63,18.073,18.074z"/>
                                    </g></svg>
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Tab.Content>
                        <Tab.Pane eventKey='first'>
                            < IssuesItem />< IssuesItem />< IssuesItem />< IssuesItem />
                        </Tab.Pane>
                        <Tab.Pane eventKey='second'>
                            < IssuesItem />< IssuesItem />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>

    )
}
