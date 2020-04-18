import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGlobalLatestData } from '../../queries/Queries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

import Card from './Card';

class Cards extends Component {
    render() {
        const {GlobalLatestData} = this.props.getGlobalLatestData;
        return (GlobalLatestData 
            ?
            <div className="card-wrapper">
                <Card card="card order-card bg-c-blue" title="TOTAL CONFIRMED" subtitle={GlobalLatestData.cases} updated={GlobalLatestData.updated}/>
                <Card card="card order-card bg-c-red" title="TOTAL DEATHS" subtitle={GlobalLatestData.deaths} updated={GlobalLatestData.updated}/>
                <Card card="card order-card bg-c-green" title="TOTAL RECOVERED" subtitle={GlobalLatestData.recovered} updated={GlobalLatestData.updated}/>
                <Card card="card order-card bg-c-yellow" title="TOTAL ACTIVE" subtitle={GlobalLatestData.cases - GlobalLatestData.deaths - GlobalLatestData.recovered} />
            </div> 
            :
            <div className="fa-wrapper">
                <FontAwesomeIcon icon={faVirus} spin size="3x" />
            </div>
        )
    }
}

export default graphql(getGlobalLatestData, {name: "getGlobalLatestData"})(Cards);
