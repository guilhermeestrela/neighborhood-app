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
        if (venue.error) {
            return this.setState({
                ...this.state,
                error: true,
                open: true,
                message: venue.message
            });
        }
        if (venue.id === this.state.venue.id && this.state.open) {
            return this.close();
        }

        return this.setState({
            ...this.state,
            venue,
            open: true
        })
    }
    close = () => {
        this.setState({
            ...this.state,
            open: false
        })
    }
    render() {
        const { venue } = this.state;

        if (this.state.error) {
            return (
                <div className={"column is-full is-horizontal-center is-flex venue-details " + (this.state.open  ? 'show' : '')} onClick={this.close}>
                    <div className="card error">
                       <div className={"card-content is-horizontal-center is-size-4 has-text-danger"}>
                           {this.state.message}
                           <button className={"button is-danger is-block"} onClick={this.close} aria-label={"Close"}>Close</button>
                       </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={"column is-one-quarter is-full-mobile venue-details " + (this.state.open  ? 'show' : '')} onClick={this.close}>
                <div className="content">
                    <button className="button has-text-white close-button is-size-6" aria-label={"Close button"} onClick={this.close}>
                      Close
                    </button>
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
                        <div>Status: {venue.hours.status}</div>
                    }

                    { venue.url &&
                        <a className={"has-text-white"} href={venue.url}>Website</a>
                    }
                </div>
            </div>
        )
    }
}
