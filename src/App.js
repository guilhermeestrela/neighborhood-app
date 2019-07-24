import React from 'react';
import Map from './Map';
import SearchList from './SearchList';
import VenueDetails from './VenueDetails';
import axios from 'axios';
import './App.sass';
const FOURSQUARE_BASE_URL = 'https://api.foursquare.com/v2/venues';
const FOURSQUARE_CLIENT_ID = 'GW4BOYYDH0MOJNVIRDSGGNPG5TPWXZT2EUB5HLVB5DSFHJIT';
const FOURSQUARE_CLIENT_SECRET = 'JOSFCQL1A23LCQFNEIBJR1XBRUA1GJH0SJPQO04BZKJOY1EI';


export default class MapsApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        venues: [],
        params: {
            query: '',
            ll: '-23.5619026,-46.6555644',
            categoryId: '4d4b7105d754a06374d81259',
            radius: 200
        }
    }
  }

  getCredentials() {
    return `client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20190831`
  }

 getVenues(params) {
    return axios.get(`${FOURSQUARE_BASE_URL}/search?${params}&${this.getCredentials()}`)
            .then((response) => {
               this.setState({venues: response.data.response.venues});
            })
  }

  getVenueDetails(venueId) {
      return axios.get(`${FOURSQUARE_BASE_URL}/${venueId}?${this.getCredentials()}`)
          .then((response) => {

              return this.refs.venueDetails.show(response.data.response.venue);
          })
          .catch((e) => {
              console.error('Error fetching for venue details', e);

              const errorData = {
                  error: true,
                  message: 'Error fetching for details'
              }
              return this.refs.venueDetails.show(errorData)
          });
  }

  searchVenues = (value) => {
      this.setState(prevState => ({
          params: {
              ...prevState.params,
              query: value
          }
      }));

      return this.getVenues(new URLSearchParams(this.state.params));
  }

  showMarkerInfo = (venue) => {
      return this.getVenueDetails(venue.id);
  }

  componentDidMount() {
    return this.getVenues(new URLSearchParams(this.state.params));
  }
  
  render() {
    return (
      <section className={"container"}>
          <div className="App columns is-desktop">
              <SearchList venues={this.state.venues} search={this.searchVenues} showMarkerInfo={this.showMarkerInfo} ref="list"/>
              <div className={"column is-relative is-three-quarters"}>
                  <Map key="map" venues={this.state.venues} location={this.state.params.ll} ref="map" showMarkerInfo={this.showMarkerInfo} />
              </div>
              <VenueDetails key="venue-details" ref="venueDetails"/>
          </div>
      </section>
    );
  }
}
