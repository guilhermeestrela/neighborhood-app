import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} from "react-google-maps";
import { compose, withProps } from "recompose";
import VenueMarker from './VenueMarker';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBobj7IuuDGMtn7u9jF_HP0GKPc17YCbx4';
export default class Map extends React.Component {
    render() {
        const MapWithMarkers = compose(
            withProps({
                googleMapURL:
                    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `100vh` }} />,
                mapElement: <div style={{ height: `100%` }} />
            }),
            withScriptjs,
            withGoogleMap
        )(props => <GoogleMap defaultZoom={13} defaultCenter={{ lat: -23.552133, lng: -46.6353305 }}>
            {this.props.venues.map((venue) => <VenueMarker key={venue.id} {...venue}/>)}
        </GoogleMap>);

        if (this.props.venues) {
            return(
                <div>
                    <MapWithMarkers />
                </div>
            )
        }

        return ('Loading');
    }
}

