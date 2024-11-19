import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  captilaizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      // articles:this.articles,
      // articles: this.articles[0].articles,
      articles: [],
      loading: false,
      page: 1
    }
  }
  async fetchNews(pageNo) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e1d810d1e74c44babcd37360ca7a1729&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
      page: pageNo
    })
  }
  async componentDidMount() {
    this.fetchNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.fetchNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.fetchNews();
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsApp - Top Headlines on {this.captilaizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        {/* <Spinner /> */}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 90) : " "} imageUrl={element.urlToImage} author={element.author ? element.author : "Unknown"} date={element.publishedAt} newsurl={element.url} source={element.source.name} />

            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
