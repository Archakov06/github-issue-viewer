import React from 'react'
import { Col } from 'react-bootstrap';

import './Loader.scss'

export function Loader() {
    return (
        <Col>
            <div className="wrapper"><div className="lds-dual-ring"></div></div>
        </Col>
    )
}
