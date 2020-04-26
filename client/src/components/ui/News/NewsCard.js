import React, { Component, Fragment } from 'react';
import moment from 'moment';

export default class NewsCard extends Component {
    render() {
        const { news } = this.props;
        return (
            <Fragment>
                {news.map(article => {
                    return (
                        <div key={article.url} className="news-card">
                         
                            <div className="news-card-source">{article.source.name}</div>
                            <div className="news-card-time">{moment(article.publishedAt).startOf('hour').fromNow()}</div>
                            <div className="news-card-link">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    {article.preview ? <img src={article.preview.images} alt={article.title}></img> : <img src="https://www.measureddesigns.com/wordpress/wp-content/uploads/2014/01/BBCbanner1038x300.jpg" alt={article.text}/>}
                                    <div className="news-card-title">{article.title}</div>
                                    <div className="news-card-content">{article.content}</div>
                                </a>
                            </div>
                            <div className="news-card-end"></div>
                        </div>
                    )
                })}
            </Fragment>
        )
    }
}
