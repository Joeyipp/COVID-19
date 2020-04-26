import React from 'react';
import compose from "lodash.flowright";
import { graphql } from 'react-apollo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import NewsCard from './NewsCard';
import { getWorldLatestNews } from '../../queries/Queries';

function WorldNewsFeed(props) {
    const { getWorldLatestNews } = props;
    return (!getWorldLatestNews.loading ?
        <div className="news-column">
            <div className="news-title"><span>Worldwide</span></div>
            <NewsCard news={getWorldLatestNews.WorldLatestNews}/>
        </div>
        :
        <div className="news-loading">
            <FontAwesomeIcon icon={faSpinner} pulse size="3x" />
        </div>
    )
}

export default compose(
    graphql(getWorldLatestNews, { name: "getWorldLatestNews" })
)(WorldNewsFeed);