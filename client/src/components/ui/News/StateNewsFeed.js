import React from 'react';
import compose from "lodash.flowright";
import { graphql } from 'react-apollo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import NewsCard from './NewsCard';
import { getStateLatestNews } from '../../queries/Queries';

function StateNewsFeed(props) {
    const { getStateLatestNews } = props;
    return (!getStateLatestNews.loading ?
        <div className="news-column">
            <div className="news-title"><span>{props.stateLocation}</span></div>
            <NewsCard news={getStateLatestNews.StateLatestNews}/>
        </div>
        :
        <div className="news-loading">
            <FontAwesomeIcon icon={faSpinner} pulse size="3x" />
        </div>
    )
}

export default compose(
    graphql(getStateLatestNews, {
        name: "getStateLatestNews",
        options: (props) => {
            return {
                variables: {
                    q: props.news
                }
            }
        }
    })
)(StateNewsFeed);