import React, { createRef, Component } from 'react';
import moment from 'moment';
import { graphql } from 'react-apollo';
import {connect} from 'react-redux';
import compose from "lodash.flowright";

import { updateView } from '../../../store/actions/viewActions';
import { updateGlobalStats } from '../../../store/actions/globalStatsActions';
import { getGlobalLatestData } from '../../queries/Queries';

class Header extends Component {
    
    state = {
        viewToggle: true
    }

    componentDidUpdate = () => {
        const { globalStats, updateGlobalStats, graphQLGlobalLatestData } = this.props;
        if (globalStats.updated !== graphQLGlobalLatestData.GlobalLatestData.updated) {
            updateGlobalStats(graphQLGlobalLatestData.GlobalLatestData);
        }
    }

    wrapper = createRef();

    render() {
        const { globalStats, countryStats, view, updateView } = this.props;
        const classes = this.state.viewToggle ? "tracking-in-expand title" : "title";
        return (globalStats.updated && view.view === "WORLD"
            ? 
            <div className="header tracking-in-expand">
                <div className={classes} ref={this.wrapper}>{globalStats.header} STATISTICS</div>
                <div className="tracking-in-expand subtitle">Last Updated: {moment.unix(globalStats.updated.toString().substr(0,10)).format("LLL")}</div>
            </div>
            :
            <div className="header tracking-in-expand">
                <div className={classes} ref={this.wrapper}>{countryStats.header} STATISTICS</div>
                <div className="tracking-in-expand subtitle">
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