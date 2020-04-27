import React from 'react'
// import compose from "lodash.flowright";
// import { graphql, Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import NewsCard from './NewsCard';
import { getStateLatestNews } from '../../queries/Queries';

function StateNewsFeed(props) {
    const { loading, error, data, refetch, networkStatus } = useQuery(getStateLatestNews, { variables: { q: props.news }, notifyOnNetworkStatusChange: true,});
    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;
    // if (networkStatus === 4) return 'Refetching!';
    
    return (!loading ?
        <div className="news-column hide-on-small">
            <div className="news-title"><span>{props.stateLocation}</span></div>
            <div className="news-form">
                <form onSubmit={props.handleSubmit}>
                    <input className="news-form-input" type="text" placeholder="Search News by State"></input>
                    <button className="news-form-button" type="submit">Search</button>
                </form>
            </div>
            <NewsCard news={data.StateLatestNews}/>
        </div>
        :
        <div className="news-loading hide-on-small">
            <FontAwesomeIcon icon={faSpinner} pulse size="3x" />
        </div>
    )
}

export default StateNewsFeed;

// function StateNewsFeed(props) {
//     const { getStateLatestNews } = props;
//     return (!getStateLatestNews.loading ?
//         <div className="news-column hide-on-small">
//             <div className="news-title"><span>{props.stateLocation}</span></div>
//             <NewsCard news={getStateLatestNews.StateLatestNews}/>
//         </div>
//         :
//         <div className="news-loading hide-on-small">
//             <FontAwesomeIcon icon={faSpinner} pulse size="3x" />
//         </div>
//     )
// }

// export default compose(
//     graphql(getStateLatestNews, {
//         name: "getStateLatestNews",
//         options: (props) => {
//             console.log(props)
//             return {
//                 variables: {
//                     q: props.news
//                 }
//             }
//         }
//     })
// )(StateNewsFeed);
