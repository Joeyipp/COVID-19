import React, { createRef, Component } from 'react';
import moment from 'moment';
import { graphql } from 'react-apollo';
import {connect} from 'react-redux';
import compose from "lodash.flowright";

import { updateView } from '../../../store/actions/viewActions';
import { updateGlobalStats } from '../../../store/actions/globalStatsActions';
import { getGlobalLatestData } from '../../queries/Queries';

class Header extends Component {
    
    componentDidUpdate = () => {
        const { globalStats, updateGlobalStats, graphQLGlobalLatestData } = this.props;
        if (globalStats.updated !== graphQLGlobalLatestData.GlobalLatestData.updated) {
            updateGlobalStats(graphQLGlobalLatestData.GlobalLatestData);
        }
    }

    wrapper = createRef();

    render() {
        const { globalStats, countyStats,  stateStats, countryStats, view, updateView } = this.props;
        let stats = view.view === "COUNTRY" ? countryStats : (view.view === "STATE" ? stateStats : countyStats);
        return (globalStats.updated && view.view === "WORLD"
            ? 
            <div className="header">
                <div className={view.viewChange ? "fade-in title" : "tracking-in-expand title"} ref={this.wrapper}>{globalStats.header}</div>
                <div className={view.viewChange ? "fade-in subtitle" : "tracking-in-expand subtitle"}>Last Updated: {moment.unix(globalStats.updated.toString().substr(0,10)).format("LLL")}</div>
            </div>
            :
            <div className={view.view === "WORLD" ? "header" : "fade-in header"}>
                <div className={view.viewChange ? "fade-in title" : "fade-in-left title"} ref={this.wrapper}>{stats.header}</div>
                <div className={view.viewChange ? "subtitle" : "subtitle"}>
                    Last Updated: {moment.unix(globalStats.updated.toString().substr(0,10)).format("LLL")}
                    <button className="return tracking-in-expand-fast" onClick={() => {updateView("WORLD")}}>
                        <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                        </span>
                        <span className="button-text tracking-in-expand">RETURN TO WORLD</span>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view,
        countyStats: state.countyStats,
        stateStats: state.stateStats,
        countryStats: state.countryStats,
        globalStats: state.globalStats
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView: (view) => dispatch(updateView(view)),
        updateGlobalStats: (globalStats) => dispatch(updateGlobalStats(globalStats))
    }
}

export default compose(
    graphql(getGlobalLatestData, {name: "graphQLGlobalLatestData"}),
    connect(mapStateToProps, mapDispatchToProps)
)(Header);