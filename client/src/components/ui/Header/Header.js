import React, { Component } from 'react'
import moment from 'moment';
import { graphql } from 'react-apollo';
import { getGlobalLatestData } from '../../queries/Queries';

class Header extends Component {

    render() {
        const {GlobalLatestData} = this.props.getGlobalLatestData;
        return (GlobalLatestData
            ? 
            <div className="header">
                <div className="tracking-in-expand title">{this.props.header} STATISTICS</div>
                <div className="tracking-in-expand subtitle">Last Updated: {moment.unix(GlobalLatestData.updated.toString().substr(0,10)).format("LLL")}</div>
            </div>
            :
            <div className="header">
                <div className="tracking-in-expand title">{this.props.header} STATISTICS</div>
            </div>
        )
    }
}

export default graphql(getGlobalLatestData, {name: "getGlobalLatestData"})(Header);