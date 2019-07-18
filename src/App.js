import React from 'react';
import Map from './Map';
import SearchList from './SearchList';
import axios from 'axios';
import './App.css';
const FOURSQUARE_BASE_URL = 'https://api.foursquare.com/v2/venues/search';
const FOURSQUARE_CLIENT_ID = 'GW4BOYYDH0MOJNVIRDSGGNPG5TPWXZT2EUB5HLVB5DSFHJIT';
const FOURSQUARE_CLIENT_SECRET = 'LCQMWRUF0BTHSNPRJFNJFMGE2TNUVZXKHQZQQ4ALBA3XLII3';


export default class MapsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {venues: []}
  }

  getCredentials() {
    return `client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20190831`
  }

 getVenues(params) {
    return axios.get(`${FOURSQUARE_BASE_URL}?${params}&${this.getCredentials()}`)
            .then((response) => {
               this.setState({venues: response.data.response.venues});
            })
  }

  searchVenues = (value) => {
      let params = {
          query: value,
          near: 'São Paulo, SP',
          categoryId: '4d4b7105d754a06374d81259'
      }

      return this.getVenues(new URLSearchParams(params));
  }

  componentDidMount() {
    let params = {
        query: '',
        near: 'São Paulo, SP',
        categoryId: '4d4b7105d754a06374d81259'
    };

    return this.getVenues(new URLSearchParams(params));
  }
  
  render() {
    return (
      <div className="App columns">
          <div style={{width: `30%`, float: 'left'}}>
              <SearchList venues={this.state.venues} search={this.searchVenues}/>
          </div>
        <div style={{ width: `70%`, float: 'right' }}>
            <Map key="map" venues={this.state.venues} />
        </div>
      </div>
    );
  }
}
