import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} from "react-google-maps";
import { compose, withProps } from "recompose";
import VenueMarker from './VenueMarker';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBobj7IuuDGMtn7u9jF_HP0GKPc17YCbx4';
const MapWithMarkers = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => {
    return  <GoogleMap defaultZoom={15} defaultCenter={{ lat: -23.5619026, lng: -46.6555644 }}>
        {props.venues.map((venue) => <VenueMarker key={venue.id} {...venue} isOpen={props.activeMarker === venue.id} />)}
    </GoogleMap>
});

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMarker: ''
        }
    }
    showMarkerInfo(venueId) {
        return this.setState({activeMarker: venueId});
    }
    render() {
        if (this.props.venues) {
            return(
                <div>
                    <MapWithMarkers venues={this.props.venues} activeMarker={this.state.activeMarker}/>
                </div>
            )
        }

        return ('Loading');
    }
}

