import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let  {title,description,imageUrl,newsurl,author,date,source}=this.props;
    return (
        <div className='my-3'>
            <div className="card">
                <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{source}</span>
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} On {new Date(date).toGMTString()}</small></p>
                    <a rel='noreferrer' href={newsurl} target= "_blank" className="btn btn-dark">Read more</a>
                </div>
            </div>
        </div>
    )
  }
}
