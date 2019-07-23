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
    close() {
        this.setState({
            ...this.state,
            open: false
        })
    }
    render() {
        const { venue } = this.state;

        return (
            <div className={"tile venue-details " + (this.state.open  ? 'show' : '')}>
                <div className="content">
                    <h2 className={"title has-text-white"}>
                        { venue.name }
                    </h2>
                    {venue.price &&
                        <div>Price: {venue.price.message}</div>
                    }

                    { venue.location &&
                        <div>{venue.location.address}</div>
                    }

                    { venue.hours &&
                        <div>{venue.hours.status}</div>
                    }

                    { venue.url &&
                    <a className={"has-text-white"} href={venue.url}>Site</a>
                    }
                </div>
            </div>
        )
    }
}
