import React, { Component } from 'react';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

import Card from './Card';

class Cards extends Component {
    render() {
        const {cases, deaths, recovered, active} = this.props.view.view === "WORLD" ? this.props.globalStats : this.props.countryStats;
        return (cases 
            ?
            <div className="card-wrapper">
                <Card card="card order-card bg-c-blue" title="TOTAL CONFIRMED" subtitle={cases} />
                <Card card="card order-card bg-c-red" title="TOTAL DEATHS" subtitle={deaths} />
                <Card card="card order-card bg-c-green" title="TOTAL RECOVERED" subtitle={recovered} />
                <Card card="card order-card bg-c-yellow" title="TOTAL ACTIVE" subtitle={active} />
            </div> 
            :
            <div className="fa-wrapper">
                <FontAwesomeIcon icon={faVirus} spin size="3x" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view,
        countryStats: state.countryStats,
        globalStats: state.globalStats
    }
}

export default connect(mapStateToProps)(Cards);
