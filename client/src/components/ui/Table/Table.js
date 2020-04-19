// Core Libraries
import React, { Component } from 'react';
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

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus, faSearch } from '@fortawesome/free-solid-svg-icons';

class Table extends Component {

    componentDidUpdate = () => {
        const { countriesStats, updateCountriesStats, graphQLCountriesLatestData } = this.props;
        if (countriesStats.countries !== graphQLCountriesLatestData.CountriesLatestData) {
            updateCountriesStats(graphQLCountriesLatestData.CountriesLatestData)
        }
    }

    handleSearch = () => {
        let filter, tbody, tr, txtValue;
        filter = document.getElementById("search").value.toUpperCase();
        tbody = document.getElementById("content-data").childNodes;

        // Loop through all table rows
        for (let i = 0; i < tbody.length; i++) {
            tr = tbody[i].childNodes;
            txtValue = tr[0].textContent || tr[0].innerText;

            // Hide those who don't match the search query
            (txtValue.toUpperCase().indexOf(filter) > -1) ? tbody[i].style.display = "" : tbody[i].style.display = "none";
        }
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
    }

    render() {
        const { countriesStats } = this.props;
        return (countriesStats.countries
            ?
            <div className="table-wrapper">
                <div className="content-table">
                    <div className="table-inner-wrapper">
                        <div className="table-heading">
                            <span>AFFECTED COUNTRIES</span>
                            <input type="text" className="search-box" id="search" placeholder="Search By Country" onKeyUp={this.handleSearch}/>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <table id="tableOne" cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th>COUNTRY</th>
                                    <th>CONFIRMED</th>
                                    <th>DEATHS</th>
                                    <th>RECOVERED</th>
                                    <th>ACTIVE</th>
                                    <th>CRITICAL</th>
                                </tr>
                            </thead>
                            <tbody id="content-data">
                                {countriesStats.countries
                                    .filter(country => (country.country !== "Total:" && country.country !== ""))
                                    .map(country => {
                                        let countryCode = (country.country in CountryISOCode) ? CountryISOCode[country.country] : getCode(country.country);
                                        countryCode = countryCode ? countryCode.toLowerCase() : "";
                                        countryCode = (CC.includes(countryCode)) ? countryCode : "";

                                        return (
                                            <tr key={country.country} data-index={country.country} onClick={this.handleClick}>
                                                {(countryCode) ? <td className="country-column"><FlagIcon code={countryCode} size="lg"/><span>{country.country}</span></td> : <td className="country-column"><span>{country.country}</span></td>}
                                                <td className="text-red">{numberWithCommas(country.cases)}<div className="box-green">+ {numberWithCommas(country.todayCases)}</div></td>
                                                <td className="text-red">{numberWithCommas(country.deaths)}<div className="box-red">+ {numberWithCommas(country.todayDeaths)}</div></td>
                                                <td className="text-green">{numberWithCommas(country.recovered)}</td>
                                                <td className="text-blue">{numberWithCommas(country.active)}</td>
                                                <td className="text-blue">{numberWithCommas(country.critical)}</td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                    </div> 
                </div>
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
)(Table);
