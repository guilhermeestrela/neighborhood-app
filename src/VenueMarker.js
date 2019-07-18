import React from "react";
import {InfoWindow, Marker} from "react-google-maps";

export default class VenueMarker extends React.Component {

    // State.
    state = {open: false}
    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    // Render.
    render() {
        // Return Restaurant Marker Component.
        return (
            <Marker key={this.props.id} position={{ lat: this.props.location.lat, lng: this.props.location.lng }} onClick={this.handleClick}>
                {this.state.open && (
                    <InfoWindow onCloseClick={()=>this.handleClick(this)}><div>{this.props.name}</div></InfoWindow>
                )}
            </Marker>
        )

    }
}
