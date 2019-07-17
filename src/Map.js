import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker
} from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";

const GOOGLE_MAPS_API_KEY = 'AIzaSyBobj7IuuDGMtn7u9jF_HP0GKPc17YCbx4';

const Map = compose(
    withProps({
        googleMapURL:
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100vh` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        })
    }),
    withScriptjs,
    withGoogleMap
)(props => {
    if (props.venues) {
        return (
            <GoogleMap defaultZoom={13} defaultCenter={{ lat: -23.552133, lng: -46.6353305 }}>
                {props.venues.map((venue) => {
                    return (
                        <Marker key={venue.id} position={{ lat: venue.location.lat, lng: venue.location.lng }} onClick={props.onToggleOpen} >
                            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                                <div>{venue.name}</div>
                            </InfoWindow>}
                        </Marker>
                    )
                })}
            </GoogleMap>
            )
    } else {
        return 'Loading';
    }
   
});

export default Map;