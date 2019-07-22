import React from "react";
import {InfoWindow, Marker} from "react-google-maps";

export default class VenueMarker extends React.Component {

    // State.
   constructor(props) {
       super(props);
       this.state = {
           isOpen: props.isOpen
       }
   }
    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    // Render.
    render() {
       console.log(this.props);
        // Return Restaurant Marker Component.
        return (
            <Marker key={this.props.id}
                    position={{ lat: this.props.location.lat, lng: this.props.location.lng }}
                    onClick={this.handleClick}>
                {(this.state.isOpen) && (
                    <InfoWindow onCloseClick={()=>this.handleClick(this)}><div>{this.props.name}</div></InfoWindow>
                )}
            </Marker>
        )

    }
}
