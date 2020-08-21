import React from 'react';

import './issuesItem.scss';

export function IssuesItem() {
    let countOpened = 404
    let lastMesFrom = 'ycollet'
    return (
        <div class="item-wrapper flex-auto">
            <a href="/" className="issues-item__tittle">Spelling problem in linuxshell.md</a>
            <div class="mt-1 text-small text-gray">
                <span class="opened-by">
                    #{countOpened} opened
                    by <a href="/">{lastMesFrom}</a>
                </span>
            </div>
        </div>
    )
}
