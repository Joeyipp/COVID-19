import React from 'react'

export default function Card(props) {
    const {card, title, subtitle} = props;
    return (
        <div className={card}>   
            <div className="card-block">
                <h5>{title}</h5>
                <h1>{subtitle}</h1>
            </div>
        </div>

    )
}
