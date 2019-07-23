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
    handleClick = (venue) => {
        return this.props.showMarkerInfo(venue);
    }

    render() {
        const allVenues = this.props.venues.length > 0 ?
            (this.props.venues.map((venue) => <li key={venue.id} onClick={() => this.handleClick(venue)} className={"list-item"}>{venue.name}</li>)) :
            <li className={"list-item has-text-danger"}>Not found!!</li>
        return (
            <div className={"tile is-parent is-vertical is-3"}>
                <div className={"tile is-child"}>
                    <input type="text" className={"input"} placeholder="Search restaurants near Bela Vista" onChange={this.handleChange} value={this.state.query}/>
                </div>
                <ul className="list">
                    { allVenues }
                </ul>
            </div>
        );
    }
}
