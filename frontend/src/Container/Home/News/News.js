import React from 'react'
import './News.css'
import NewsItem from './NewsItem/NewsItem'
const News = ()=>{
    return(
        <div className="home-news">
            <h1>Top news headlines</h1>
            <div className="news-inner-container">
                <NewsItem></NewsItem>
                <NewsItem></NewsItem>
                <NewsItem></NewsItem>
                <NewsItem></NewsItem>
                <NewsItem></NewsItem>
                <NewsItem></NewsItem>
            </div>
        </div>
    )
}

export default News