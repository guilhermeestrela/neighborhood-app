import React from 'react';

export default class SearchList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };
    }
    handleChange = (event) => {
        this.setState({query: event.target.value});
        if (event.target.value) {
            return this.props.search(event.target.value)
        }
    }
    handleClick = (venueId) => {
        return this.props.showMarkerInfo(venueId);
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" placeholder="Search for restaurants near Bela Vista" onChange={this.handleChange} value={this.state.query}/>
                </div>
                {this.props.venues.map((venue) => <div key={venue.id} onClick={() => this.handleClick(venue.id)}>{venue.name}</div>)}
            </div>
        );
    }
}
