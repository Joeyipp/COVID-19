import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGlobalLatestData } from '../queries/Queries';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

import Card from './Card';

class Dashboard extends Component {
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const {GlobalLatestData} = this.props.getGlobalLatestData;
        if (GlobalLatestData) {
            return (
                <div className="main">
                    <h2>Dashboard</h2>
                    <div className="wrapper-card">
                        <Card card="card order-card bg-c-blue" title="TOTAL CONFIRMED" subtitle={this.numberWithCommas(GlobalLatestData.confirmed)}/>
                        <Card card="card order-card bg-c-red" title="TOTAL DEATHS" subtitle={this.numberWithCommas(GlobalLatestData.deaths)}/>
                        <Card card="card order-card bg-c-green" title="TOTAL RECOVERED" subtitle={this.numberWithCommas(GlobalLatestData.recovered)}/>
                        <Card card="card order-card bg-c-yellow" title="TOTAL ACTIVE" subtitle={this.numberWithCommas(GlobalLatestData.active)}/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="main">
                    <h2>Dashboard</h2>
                    <div className="wrapper-card">
                        <FontAwesomeIcon icon={faVirus} spin size="3x" />
                    </div>
                </div>
            )
        }
    }
}

export default graphql(getGlobalLatestData, {name: "getGlobalLatestData"})(Dashboard);
