import React from 'react';
import Map from './Map';
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

  componentDidMount() {
    let params = {
      query: '',
      near: 'São Paulo, SP'
    };

    this.getVenues(new URLSearchParams(params));
  }
  
  render() {
    return (
      <div className="App">
        <Map key="map" venues={this.state.venues}/>
      </div>
    );
  }
}
