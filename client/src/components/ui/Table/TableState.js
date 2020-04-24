// Core Libraries
import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import compose from "lodash.flowright";
import stateAbbreviations from 'states-abbreviations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

// Custom Functions
import { numberWithCommas } from '../../utils/utils';
import { updateView } from '../../../store/actions/viewActions';
import { updateStateStats } from '../../../store/actions/stateStatsActions';

class TableState extends Component {

    state = {
        rowOpen: []
    }

    handleClick = (e) => {
        let us_state = this.props.statesStats.states.filter(state => state.state === e.target.parentNode.getAttribute('data-index'))[0] 
        if (us_state) {
            const stateStats = {
                state_code: us_state.state,
                state: stateAbbreviations[us_state.state].toUpperCase() || us_state.state.toUpperCase(),
                cases: us_state.positive,
                grade: us_state.grade,
                negative: us_state.negative,
                recovered: us_state.recovered,
                deaths: us_state.death,
                active: us_state.positive - us_state.death - us_state.recovered,
                hospitalized: us_state.hospitalized,
                totalTestResults: us_state.totalTestResults,
                dateChecked: us_state.dateChecked
            }
            this.props.updateStateStats(stateStats);

            if (this.props.view.view === "WORLD") {
                this.setState({
                    rowOpen: [us_state.state]
                });
            }
    
            else if (this.state.rowOpen.includes(us_state.state)) {
                let rowOpen = this.state.rowOpen.filter(item => item !== us_state.state);
                this.setState({
                    rowOpen
                })
            }
            else {
                let rowOpen = [...this.state.rowOpen, us_state.state]
                this.setState({
                    rowOpen
                });
            }
            
            this.props.updateView("STATE");
        }
    }

    clicker = () => {}

    render() {
        const {statesStats, countiesStats} = this.props;
        return (statesStats.states 
             ?
             <tbody id="content-data">
                {statesStats.states.sort((a, b) => (b.positive > a.positive) ? 1 : ((b.positive < a.positive) ? -1 : 0))
                    .map(state => {
                        return (
                            <Fragment key={Math.random()} >
                                <tr key={Math.random()} data-index={state.state} onClick={this.handleClick}>
                                    <td className="country-column"><span>{stateAbbreviations[state.state] ? stateAbbreviations[state.state] : state.state}</span></td>
                                    <td className="text-red">{numberWithCommas(state.positive)}</td>
                                    <td className="text-red">{numberWithCommas(state.death)}</td>
                                    <td className="text-green">{numberWithCommas(state.recovered) ? numberWithCommas(state.recovered) : "NA"}</td>
                                </tr>
                                {this.state.rowOpen.includes(state.state) && this.props.view.view !== "WORLD" && this.props.view.view !== "COUNTRY"
                                ?
                                <Fragment >
                                    {countiesStats.counties
                                            .filter(county => county.province === stateAbbreviations[state.state])
                                            .map(county => {
                                                return (
                                                    <tr key={Math.random()}>
                                                        <td className="row-item">{county.county}</td>
                                                        <td className="text-red">{numberWithCommas(county.latest.confirmed)}</td>
                                                        <td className="text-red">{numberWithCommas(county.latest.deaths)}</td>
                                                        <td className="text-green">NA</td>
                                                    </tr>
                                                )
                                            }                                         
                                    )}
                                 </Fragment>
                                :
                                <tr className="fragment-close"></tr>}
                            </Fragment>

                        )
                    }
                )}
            </tbody>
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
        countiesStats: state.countiesStats,
        statesStats: state.statesStats,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView: (view) => dispatch(updateView(view)),
        updateStateStats: (stateStats) => dispatch(updateStateStats(stateStats)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(TableState);