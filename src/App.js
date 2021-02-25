import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
const axios = require('axios').default;

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    }
  } 

  componentDidMount () {
    //7RKHACAQ0qHlL0ClPfKqhmoiBVBWnJPH&limit
    this.performSearch();
  }

  performSearch = (query = 'dogs') =>  {
    //7RKHACAQ0qHlL0ClPfKqhmoiBVBWnJPH&limit
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=7RKHACAQ0qHlL0ClPfKqhmoiBVBWnJPH&q=${query}&limit=200&limit=25&offset=0&rating=r&lang=en`)
    .then((response)  => {
      this.setState({
        gifs: response.data.data,
        loading: false
      })
     })
    .catch(function (error) {
      console.log('Error accessing data: ' + error);
    })
    .then(function () {
      // always executed
    });
  }


  render() { 
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm  onSearch={this.performSearch}/>      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading) ? <p>Loading....</p> : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
