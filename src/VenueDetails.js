import React from 'react';

export default class VenueDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            venue: {},
            open: false
        }
    }
    show(venue) {
        this.setState({
            ...this.state,
            venue,
            open: !this.state.open
        })
    }
    render() {
        return <div className={"venue-details " + (this.state.open  ? 'show' : '')}>
            <div className="content">
                <h2>
                    Venue Details
                </h2>
                {this.state.venue.id}
            </div>
        </div>
    }
}
