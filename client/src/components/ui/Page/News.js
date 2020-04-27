import React, { Component } from 'react';
import StateNewsFeed from '../News/StateNewsFeed';
import WorldNewsFeed from '../News/WorldNewsFeed';
import BreakingNewsFeed from '../News/BreakingNewsFeed';


class News extends Component {

    state = {
        stateNews: "south carolina",
        countryNews: "us"
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            stateNews: e.target.childNodes[0].value
        })
    }

    render() {
        return (
            <div className="news-main">
                <div className="news-wrapper">
                    <BreakingNewsFeed news={this.state.countryNews}/>
                    <WorldNewsFeed />
                    <StateNewsFeed stateLocation={this.state.stateNews} news={this.state.stateNews}  handleSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

export default News;

