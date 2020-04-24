// Core Libraries
import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import compose from "lodash.flowright";
import { getCode } from 'country-list';
import {CountryISOCode, CC, FlagIcon} from './Flag.js'

import n from 'country-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

// Custom Functions
import { numberWithCommas } from '../../utils/utils';
import { updateView } from '../../../store/actions/viewActions';
import { updateCountryStats } from '../../../store/actions/countryStatsAction';

class TableCountry extends Component {

    state = {
        rowOpen: []
    }

    handleClick = (e) => {
        // console.log(e.target.parentNode.childNodes[1].innerText)
        const parentNode = e.target.parentNode;
        const country = e.target.parentNode.getAttribute('data-index') 
                        ? this.props.countriesStats.countries.filter(country => country.country === parentNode.getAttribute('data-index'))[0] 
                        : this.props.countriesStats.countries.filter(country => country.country === parentNode.childNodes[1].innerText)[0];

        const countryInfo = n.search(e.target.parentNode.getAttribute('data-index'))[0] || n.search(e.target.parentNode.getAttribute('country-code'))[0];
        
        const countryStats = {
            header: country.country.toUpperCase(),
            country_code: countryInfo ? countryInfo.code : "",
            country_name: countryInfo ? countryInfo.name : "",
            geo: {
                latitude: countryInfo ? countryInfo.geo.latitude : "",
                longitude: countryInfo ? countryInfo.geo.longitude : ""
            },
            capital: countryInfo ? countryInfo.capital : "",
            cases: parseInt(country.cases),
            todayCases: parseInt(country.todayCases),
            deaths: parseInt(country.deaths),
            todayDeaths: parseInt(country.todayDeaths),
            recovered: parseInt(country.recovered),
            active: parseInt(country.active),
            critical: parseInt(country.critical)
        }
        this.props.updateCountryStats(countryStats);

        if (this.props.view.view === "WORLD") {
            this.setState({
                rowOpen: [country.country]
            });
        }

        else if (this.state.rowOpen.includes(country.country)) {
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
        this.props.updateView("COUNTRY");
    }

    clicker = () => {}

    render() {
        const {countriesStats, view} = this.props;
        return (countriesStats.countries
            ? 
            <tbody id="content-data">
                {countriesStats.countries
                    .filter(country => (country.country !== "Total:" && country.country !== ""))
                    .map(country => {
                        let countryCode = (country.country in CountryISOCode) ? CountryISOCode[country.country] : getCode(country.country);
                        countryCode = countryCode ? countryCode.toLowerCase() : "";
                        countryCode = (CC.includes(countryCode)) ? countryCode : "";

                        return (
                            <Fragment key={country.country}>
                                <tr data-index={country.country} country-code={countryCode} onClick={this.handleClick}>
                                    {(countryCode) ? <td className="country-column"><FlagIcon code={countryCode} size="lg"/><span>{country.country}</span></td> : <td className="country-column"><span>{country.country}</span></td>}
                                    <td className="text-red">{numberWithCommas(country.cases)}<div className="box-green">+ {numberWithCommas(country.todayCases)}</div></td>
                                    <td className="text-red">{numberWithCommas(country.deaths)}<div className="box-red">+ {numberWithCommas(country.todayDeaths)}</div></td>
                                    <td className="text-green">{numberWithCommas(country.recovered)}</td>
                                </tr>
                                {this.state.rowOpen.includes(country.country) && view.view !== "WORLD" ? 
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
        statesStats: state.statesStats,
        countryStats: state.countryStats,
        countriesStats: state.countriesStats
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView: (view) => dispatch(updateView(view)),
        updateCountryStats: (countryStats) => dispatch(updateCountryStats(countryStats))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(TableCountry);