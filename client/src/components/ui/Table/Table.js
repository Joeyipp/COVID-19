// Core Libraries
import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import compose from "lodash.flowright";
import { graphql } from 'react-apollo';

// Custom Functions
import { getCountiesLatestData, getCountriesLatestData, getStatesLatestData } from '../../queries/Queries';
import { updateView } from '../../../store/actions/viewActions';
import { updateCountiesStats } from '../../../store/actions/countiesStatsActions';
import { updateStatesStats } from '../../../store/actions/statesStatsActions';
import { updateCountriesStats } from '../../../store/actions/countriesStatsActions';

// Font Awesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

import TableHead from './TableHead.js';
import TableCounty from './TableCounty';
import TableCountry from './TableCountry';
import TableState from './TableState';

class Table extends Component {

    state = {
        tableOption: "country"
    }


    componentDidUpdate = () => {
        const { countiesStats, 
                statesStats, 
                countriesStats, 
                updateCountiesStats, 
                updateStatesStats, 
                updateCountriesStats, 
                graphQLCountiesLatestData, 
                graphQLStatesLatestData, graphQLCountriesLatestData } = this.props;
        if (graphQLCountriesLatestData.CountriesLatestData && countriesStats.countries !== graphQLCountriesLatestData.CountriesLatestData) {
            updateCountriesStats(graphQLCountriesLatestData.CountriesLatestData)
        }
        if (graphQLStatesLatestData.StatesLatestData && statesStats.states !== graphQLStatesLatestData.StatesLatestData) {
            updateStatesStats(graphQLStatesLatestData.StatesLatestData)
        }
        if (graphQLCountiesLatestData.CountiesLatestData && countiesStats.counties !== graphQLCountiesLatestData.CountiesLatestData) {
            updateCountiesStats(graphQLCountiesLatestData.CountiesLatestData)
        }
    }

    // handleSearch = (e) => {
    //     let filter, tbody, tr, txtValue;
    //     filter = document.getElementById("search").value.toUpperCase();
    //     tbody = document.getElementById("content-data").childNodes;
    //     // Loop through all table rows
    //     for (let i = 0; i < tbody.length; i++) {
    //         tr = tbody[i].childNodes;
    //         if (tr[0]) {
    //             txtValue = tr[0].textContent || tr[0].innerText;

    //             // Hide those who don't match the search query
    //             (txtValue.toUpperCase().indexOf(filter) > -1) ? tbody[i].style.display = "" : tbody[i].style.display = "none"; 
    //         }
    //     }
    // }

    handleClick = (e) => {
        let tableOption = e.target.id;
        this.setState({
            tableOption
        })
        
    }

    render() {
        return (
            <div>
                <div className="table-heading">
                    <button type="button" className="glow-on-hover" id="country" onClick={this.handleClick}>LIST BY COUNTRY</button>
                    <button type="button" className="glow-on-hover" id="state" onClick={this.handleClick}>LIST BY US STATE</button>
                    <button type="button" className="glow-on-hover" id="county" onClick={this.handleClick}>LIST BY US COUNTY</button>
                    
                    {/* <TableOption onClick={this.handleClick}/>
                    <input type="text" className="search-box" id="search" placeholder="Search" onKeyUp={this.handleSearch}/>
                    <FontAwesomeIcon icon={faSearch} /> */}
                </div>
                <div className="content-table">
                    <div className="table-inner-wrapper">
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
                                    <TableState />
                                </Fragment>
                                : 
                                <Fragment>
                                    <TableHead header={["US COUNTY", "CONFIRMED", "DEATHS", "RECOVERED"]}/>
                                    <TableCounty />
                                </Fragment>)
                            }
                        </table>
                    </div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view,
        countiesStats: state.countiesStats,
        statesStats: state.statesStats,
        countriesStats: state.countriesStats
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView: (view) => dispatch(updateView(view)),
        updateCountiesStats: (countiesStats) => dispatch(updateCountiesStats(countiesStats)),
        updateStatesStats: (statesStats) => dispatch(updateStatesStats(statesStats)),
        updateCountriesStats: (countriesStats) => dispatch(updateCountriesStats(countriesStats))
    }
}

export default compose(
    graphql(getCountiesLatestData, {name: "graphQLCountiesLatestData"}),
    graphql(getStatesLatestData, {name: "graphQLStatesLatestData"}),
    graphql(getCountriesLatestData, {name: "graphQLCountriesLatestData"}),
    connect(mapStateToProps, mapDispatchToProps)
)(Table);
