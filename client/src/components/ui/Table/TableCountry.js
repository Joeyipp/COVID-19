// Core Libraries
import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import compose from "lodash.flowright";
import { graphql } from 'react-apollo';
import { getCode } from 'country-list';
import {CountryISOCode, CC, FlagIcon} from './Flag.js'

// Custom Functions
import { numberWithCommas } from '../../utils/utils';
import { getCountriesLatestData } from '../../queries/Queries';
import { updateView } from '../../../store/actions/viewActions';
import { updateCountryStats } from '../../../store/actions/countryStatsAction';
import { updateCountriesStats } from '../../../store/actions/countriesStatsActions';

class TableBody extends Component {

    state = {
        rowOpen: []
    }

    handleClick = (e) => {
        // console.log(e.target.parentNode.childNodes[1].innerText)
        const country = e.target.parentNode.getAttribute('data-index') 
                        ? this.props.countriesStats.countries.filter(country => country.country === e.target.parentNode.getAttribute('data-index'))[0] 
                        : this.props.countriesStats.countries.filter(country => country.country === e.target.parentNode.childNodes[1].innerText)[0];
        const countryStats = {
            header: country.country,
            cases: parseInt(country.cases),
            todayCases: parseInt(country.todayCases),
            deaths: parseInt(country.deaths),
            todayDeaths: parseInt(country.todayDeaths),
            recovered: parseInt(country.recovered),
            active: parseInt(country.active),
            critical: parseInt(country.critical)
        }
        this.props.updateCountryStats(countryStats);
        this.props.updateView(country.country);

        if (this.props.view.view === "WORLD") {
            this.setState({
                rowOpen: []
            });
        }
        if (this.state.rowOpen.includes(country.country)) {
            let rowOpen = this.state.rowOpen.filter(item => item !== country.country);
            this.setState({
                rowOpen
            })
        }
        else {
            let rowOpen = [...this.state.rowOpen, country.country]
            this.setState({
                rowOpen
            });
        }
    }

    clicker = () => {}

    render() {
        return (
             <tbody id="content-data">
                {this.props.countriesStats.countries
                    .filter(country => (country.country !== "Total:" && country.country !== ""))
                    .map(country => {
                        let countryCode = (country.country in CountryISOCode) ? CountryISOCode[country.country] : getCode(country.country);
                        countryCode = countryCode ? countryCode.toLowerCase() : "";
                        countryCode = (CC.includes(countryCode)) ? countryCode : "";

                        return (
                            <Fragment key={country.country}>
                                <tr data-index={country.country} onClick={this.handleClick} className={this.state.open ? "open" : ""}>
                                    {(countryCode) ? <td className="country-column"><FlagIcon code={countryCode} size="lg"/><span>{country.country}</span></td> : <td className="country-column"><span>{country.country}</span></td>}
                                    <td className="text-red">{numberWithCommas(country.cases)}<div className="box-green">+ {numberWithCommas(country.todayCases)}</div></td>
                                    <td className="text-red">{numberWithCommas(country.deaths)}<div className="box-red">+ {numberWithCommas(country.todayDeaths)}</div></td>
                                    <td className="text-green">{numberWithCommas(country.recovered)}</td>
                                </tr>
                                {this.state.rowOpen.includes(country.country) && this.props.view.view !== "WORLD" ? 
                                <tr className="fragment-open">
                                    <td colSpan="4">
                                        <div className="content-row"><span>Total Confirmed</span><span className="text-red">{numberWithCommas(country.cases)}</span></div>
                                        <div className="content-row"><span>Confirmed Today</span><span  className="text-red">{numberWithCommas(country.todayCases)}</span></div>
                                        <div className="content-row"><span>Total Deaths</span><span  className="text-red">{numberWithCommas(country.deaths)}</span></div>
                                        <div className="content-row"><span>Deaths Today</span><span  className="text-red">{numberWithCommas(country.todayDeaths)}</span></div>
                                        <div className="content-row"><span>Total Recovered</span><span className="text-green">{numberWithCommas(country.recovered)}</span></div>
                                        <div className="content-row"><span>Total Active</span><span className="text-green">{numberWithCommas(country.active)}</span></div>
                                        <div className="content-row"><span>Total Critical</span><span className="text-green">{numberWithCommas(country.critical)}</span></div>
                                    </td>
                                </tr>
                                :
                                <tr className="fragment-close"></tr>}
                            </Fragment>
                        )
                    }
                )}
            </tbody>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view,
        statesStats: state.statesStats,
        countryStats: state.countryStats,
        countriesStats: state.countriesStats
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView: (view) => dispatch(updateView(view)),
        updateCountryStats: (countryStats) => dispatch(updateCountryStats(countryStats)),
        updateCountriesStats: (countriesStats) => dispatch(updateCountriesStats(countriesStats))
    }
}

export default compose(
    graphql(getCountriesLatestData, {name: "graphQLCountriesLatestData"}),
    connect(mapStateToProps, mapDispatchToProps)
)(TableBody);