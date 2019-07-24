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
        {props.venues.map((venue) => <VenueMarker key={venue.id} {...venue} showMarkerInfo={props.showMarkerInfo} />)}
    </GoogleMap>
});

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMarker: ''
        }
    }
    showMarkerInfo = (venue) => {
        return this.props.showMarkerInfo(venue);
    }
    showError = () => {
        const errorData = {
            error: true,
            message: 'Error fetching for google maps'
        }

        return this.props.showError(errorData);
    }
    componentDidMount() {
        (function takeOverConsole(errorCallback) { // taken from http://tobyho.com/2012/07/27/taking-over-console-log/
            var console = window.console
            if (!console) return

            function intercept(method) {
                var original = console[method]
                console[method] = function() {
                    // check message
                    if(arguments[0] && arguments[0].indexOf('OverQuotaMapError') !== -1) {
                        errorCallback();
                    }

                    if (original.apply) {
                        // Do this for normal browsers
                        original.apply(console, arguments)
                    } else {
                        // Do this for IE
                        var message = Array.prototype.slice.apply(arguments).join(' ')
                        original(message)
                    }
                }
            }
            var methods = ['error']; // only interested in the console.error method
            for (var i = 0; i < methods.length; i++)
                intercept(methods[i])
        }(this.showError))
    }

    render() {
        if (this.props.venues) {
            return(
                <div className={"map box"}>
                    <MapWithMarkers venues={this.props.venues} showMarkerInfo={this.showMarkerInfo}/>
                </div>
            )
        }

        return ('Loading');
    }
}

