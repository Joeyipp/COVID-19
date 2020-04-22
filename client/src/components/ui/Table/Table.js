// Core Libraries
import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import compose from "lodash.flowright";
import { graphql } from 'react-apollo';

// Custom Functions
import { getCountriesLatestData, getStatesLatestData } from '../../queries/Queries';
import { updateView } from '../../../store/actions/viewActions';
import { updateStatesStats } from '../../../store/actions/statesStatsActions';
import { updateCountriesStats } from '../../../store/actions/countriesStatsActions';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus, faSearch } from '@fortawesome/free-solid-svg-icons';

import TableHead from './TableHead.js';
import TableCountry from './TableCountry.js';
import TableOption from './TableOption';

class Table extends Component {

    state = {
        tableOption: "country"
    }

    componentDidUpdate = () => {
        const { countriesStats, statesStats, updateCountriesStats, updateStatesStats, graphQLStatesLatestData, graphQLCountriesLatestData } = this.props;
        if (countriesStats.countries !== graphQLCountriesLatestData.CountriesLatestData) {
            updateCountriesStats(graphQLCountriesLatestData.CountriesLatestData)
        }
        if (statesStats.states !== graphQLStatesLatestData.StatesLatestData) {
            updateStatesStats(graphQLStatesLatestData.StatesLatestData)
        }
    }

    handleSearch = () => {
        let filter, tbody, tr, txtValue;
        filter = document.getElementById("search").value.toUpperCase();
        tbody = document.getElementById("content-data").childNodes;
        // Loop through all table rows
        for (let i = 0; i < tbody.length; i++) {
            tr = tbody[i].childNodes;
            if (tr[0]) {
                txtValue = tr[0].textContent || tr[0].innerText;

                // Hide those who don't match the search query
                (txtValue.toUpperCase().indexOf(filter) > -1) ? tbody[i].style.display = "" : tbody[i].style.display = "none";
            }
        }
    }

    handleClick = () => {
        let e = document.getElementById("table-option");
        let tableOption = e.options[e.selectedIndex].value;
        this.setState({
            tableOption
        })
    }

    render() {
        const { countriesStats, statesStats } = this.props;
        return (countriesStats.countries
            ?
            <div className="table-wrapper">
                <div className="content-table">
                    <div className="table-inner-wrapper">
                        <div className="table-heading">
                            <TableOption onClick={this.handleClick}/>
                            <input type="text" className="search-box" id="search" placeholder="Search" onKeyUp={this.handleSearch}/>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>

                        <table id="tableOne" cellSpacing="0" cellPadding="0">
                            {this.state.tableOption === "country" 
                                ?
                                <Fragment>
                                    <TableHead header={["COUNTRY", "CONFIRMED", "DEATHS", "RECOVERED"]}/>
                                    <TableCountry />
                                </Fragment>
                                : 
                                (this.state.tableOption === "state" 
                                ? 
                                <Fragment>
                                    <TableHead header={["US STATE", "CONFIRMED", "DEATHS", "RECOVERED"]}/>
                                    
                                </Fragment>
                                : 
                                <Fragment>
                                    <TableHead header={["US COUNTY", "CONFIRMED", "DEATHS", "RECOVERED"]}/>
                                </Fragment>)
                            }
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
        view: state.view,
        countryStats: state.countryStats,
        statesStats: state.statesStats,
        countriesStats: state.countriesStats
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView: (view) => dispatch(updateView(view)),
        updateStatesStats: (statesStats) => dispatch(updateStatesStats(statesStats)),
        updateCountriesStats: (countriesStats) => dispatch(updateCountriesStats(countriesStats))
    }
}

export default compose(
    graphql(getCountriesLatestData, {name: "graphQLCountriesLatestData"}),
    graphql(getStatesLatestData, {name: "graphQLStatesLatestData"}),
    connect(mapStateToProps, mapDispatchToProps)
)(Table);
