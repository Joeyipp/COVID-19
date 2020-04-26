import React from 'react';
import compose from "lodash.flowright";
import { graphql } from 'react-apollo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import NewsCard from './NewsCard';
import { getCountryBreakingNews } from '../../queries/Queries';

function BreakingNewsFeed(props) {
    const { getCountryBreakingNews } = props;
    return (!getCountryBreakingNews.loading ?
        <div className="news-column hide-on-small">
            {/* <div className="news-title">
                <form onSubmit={props.handleSubmit}>
                    <input type="text" id="country" placeholder="Top Headlines Today" />
                    <button type="submit">Search</button>
                </form>
            </div> */}
            <div className="news-title"><span>Top Headlines Today</span></div>
            <NewsCard news={getCountryBreakingNews.CountryBreakingNews}/>
        </div>
        :
        <div className="news-loading hide-on-small">
            <FontAwesomeIcon icon={faSpinner} pulse size="3x" />
        </div>
    )
}

export default compose(
    graphql(getCountryBreakingNews, {
        name: "getCountryBreakingNews",
        options: (props) => {
            return {
                variables: {
                    country: props.news
                }
            }
        }
    })
)(BreakingNewsFeed);