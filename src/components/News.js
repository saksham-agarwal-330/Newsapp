import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchNews = async () => {
    // try {
    // props.setProgress(10);
    //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    //   if (!url.ok) {
    //     throw new Error('Something went wrong')
    //   }
    //   setLoading(true)
    //   props.setProgress(30);
    //   let data = await fetch(url);
    //   props.setProgress(50);
    //   let parsedata = await data.json();
    //   props.setProgress(70);
    //   setArticles(parsedata.articles)
    //   setTotalResults(parsedata.totalResults)
    //   setLoading(false)
    //   props.setProgress(100);
    // } catch (error) {
    //   console.log(error)

    // }
    
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedata = await data.json();
    props.setProgress(70);
    setArticles(parsedata.articles)
    setTotalResults(parsedata.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    fetchNews();
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedata = await data.json();
    setArticles(articles.concat(parsedata.articles))
    setTotalResults(parsedata.totalResults)
  }

  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{margin:'90px 0px'}}>NewsApp - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 90) : " "} imageUrl={element.urlToImage} author={element.author ? element.author : "Unknown"} date={element.publishedAt} newsurl={element.url} source={element.source.name} />

              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
