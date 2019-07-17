import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";
import axios from 'axios';
import './App.css';
const FOURSQUARE_BASE_URL = 'https://api.foursquare.com/v2/venues/search';
const FOURSQUARE_CLIENT_ID = 'GW4BOYYDH0MOJNVIRDSGGNPG5TPWXZT2EUB5HLVB5DSFHJIT';
const FOURSQUARE_CLIENT_SECRET = 'LCQMWRUF0BTHSNPRJFNJFMGE2TNUVZXKHQZQQ4ALBA3XLII3';

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBobj7IuuDGMtn7u9jF_HP0GKPc17YCbx4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));

function getCredentials() {
  return `client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20190831`
}
function getVenues(params) {
  return axios.get(`${FOURSQUARE_BASE_URL}?${params}&${getCredentials()}`)
          .then((response) => {
            return response.data.response;
          })
}

let params = {
  query: '',
  near: 'São Paulo, SP'
}

getVenues(new URLSearchParams(params));


function App() {
  return (
    <div className="App">
      <Map key="map" />
    </div>
  );
}

export default App;
