import React from "react";
import {Marker} from "react-google-maps";

export default class VenueMarker extends React.Component {
    // Render.
    render() {
        // Return Restaurant Marker Component.
        return (
            <Marker key={this.props.id}
                    position={{ lat: this.props.location.lat, lng: this.props.location.lng }}
                    onClick={() => this.props.showMarkerInfo(this.props)}>
            </Marker>
        )

    }
}
