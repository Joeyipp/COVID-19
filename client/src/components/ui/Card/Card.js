import React from 'react';
import CountUp from 'react-countup';

export default function Card(props) {
    const {card, title, subtitle, updated} = props;
    return (
        <div className={card}>   
            <div className="card-block">
                <div className="card-title">
                    <div>{title}</div>
                </div>
                <div className="card-body"><h1><CountUp start={0} end={subtitle} duration={2.5} separator=","/></h1></div>
            </div>
        </div>
    )
}
