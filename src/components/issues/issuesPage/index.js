import React from 'react'

import { CardItem } from './cardItem'
import { Labels } from './Labels'


import './issuesPage.scss'

export function IssuesPage() {
    let opened = 4;
    return (
        <div className="issues-page">

            <div className="issues-page__wrapper">
                <h1>No puedo iniciar sesion <span className="tittle_opened">#{opened}</span></h1>
                <p>opened by {`username`} on {`date`}</p>
                <div className="text-card">
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <Labels />
                </div>
            </div>
        </div>
    )
}
