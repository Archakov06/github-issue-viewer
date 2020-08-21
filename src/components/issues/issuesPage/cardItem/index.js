import React from 'react'
import { Card, Image } from 'react-bootstrap';

import './cardItem.scss'

export function CardItem() {
    return (
        <Card>
            <Card.Header>
                <Image src="https://cdn1.thr.com/sites/default/files/2019/03/avatar-publicity_still-h_2019.jpg" roundedCircle />
                <span> {`anp121`} </span>
                commented 19 hours ago
            </Card.Header>
            <Card.Body>
                <blockquote className="card-body__text">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.
                                </p>
                </blockquote>
            </Card.Body>
        </Card>
    )
}
