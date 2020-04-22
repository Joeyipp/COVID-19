import React from 'react';

export default function TableHead(props) {
    return (
        <thead>
            <tr>
                {props.header.map(header => {
                    return (
                        <th key={header}>{header}</th>
                    )
                })}
            </tr>
        </thead>
    )
}
