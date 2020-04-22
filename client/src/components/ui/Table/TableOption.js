import React from 'react';

export default function TableOption(props) {
    return (
        <div>
            <select className="table-select" id="table-option" onClick={props.onClick}>
                <option value="country">Cases By Country</option>
                <option value="state">Cases By US State</option>
                <option value="county">Cases By US County</option>
            </select>
        </div>
    )
}
