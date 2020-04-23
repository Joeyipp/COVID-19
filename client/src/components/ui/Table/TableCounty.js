// Core Libraries
import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import compose from "lodash.flowright";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

// Custom Functions
import { numberWithCommas } from '../../utils/utils';
import { updateView } from '../../../store/actions/viewActions';
import { updateCountyStats } from '../../../store/actions/countyStatsActions';

class TableCounty extends Component {

    state = {
        rowOpen: []
    }

    handleClick = (e) => {
 
        let us_county = this.props.countiesStats.counties.filter(county => county.province === e.target.parentNode.getAttribute('data-index').split(",")[0] && county.county === e.target.parentNode.getAttribute('data-index').split(",")[1])[0]

        const countyStats = {
            header: us_county.province.toUpperCase() + " | " + us_county.county.toUpperCase(),
            province: us_county.province,
            county: us_county.county,
            last_updated: us_county.last_updated,
            coordinates: { 
                latitude: us_county.coordinates.latitude,
                longitude: us_county.coordinates.longitude
            },
            cases: us_county.latest.confirmed,
            deaths: us_county.latest.deaths,
            recovered: us_county.latest.recovered,
            active: us_county.latest.confirmed - us_county.latest.deaths - us_county.latest.recovered
        }
        this.props.updateCountyStats(countyStats);

        if (this.props.view.view === "WORLD" || this.props.view.view === "COUNTRY") {
            this.setState({
                rowOpen: [us_county.province + "," + us_county.county]
            });
        }

        else if (this.state.rowOpen.includes(us_county.province + "," + us_county.county)) {
            let rowOpen = this.state.rowOpen.filter(item => item !== us_county.province + "," + us_county.county);
            this.setState({
                rowOpen
            })
        }
        else {
            let rowOpen = [...this.state.rowOpen, us_county.province + "," + us_county.county]
            this.setState({
                rowOpen
            });
        }
        this.props.updateView("COUNTY");
    }

    clicker = () => {}

    render() {
        let {countiesStats} = this.props;
        let sortedCountiesStats = countiesStats.counties.sort((a, b) => (b.latest.confirmed > a.latest.confirmed) ? 1 : ((b.latest.confirmed < a.latest.confirmed) ? -1 : 0));
        return (sortedCountiesStats.length ?
             <tbody id="content-data">
                {countiesStats.counties
                    .map(county => {
                        return (
                            <Fragment key={Math.random()}>
                                <tr data-index={county.province + "," + county.county} onClick={this.handleClick} className={this.state.open ? "open" : ""}>
                                    
                                    <td className="county-column" data-index={county.province + "," + county.county}>
                                            <span>{county.province} </span>
                                            <span className="small">{county.county}</span>
                                    </td>
                                    
                                    <td className="text-red">{numberWithCommas(county.latest.confirmed)}</td>
                                    <td className="text-red">{numberWithCommas(county.latest.deaths)}</td>
                                    <td className="text-green">{numberWithCommas(county.latest.recovered) ? numberWithCommas(county.latest.recovered) : "NA"}</td>
                                </tr>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView: (view) => dispatch(updateView(view)),
        updateCountyStats: (countyStats) => dispatch(updateCountyStats(countyStats)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(TableCounty);