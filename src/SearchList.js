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
    showSuggestions(event) {
        event.preventDefault();
        document.querySelector('.list').classList.toggle('is-hidden-mobile');
    }

    render() {
        const allVenues = this.props.venues.length > 0 ?
            (this.props.venues.map((venue) => <li key={venue.id} onClick={() => this.handleClick(venue)} className={"list-item"} tabIndex={0}>{venue.name}</li>)) :
            <li className={"panel-block has-text-danger"} tabIndex={-1}>Not found!!</li>
        return (
            <div className={"column is-one-quarter is-full-mobile search-list"}>
                <div className={"panel"}>
                    <div className="panel-heading">
                        <h1>
                            Bela Vista Restaurants
                        </h1>
                    </div>
                    <div className="panel-block">
                        <p className="control">
                            <input type="text" className={"input"} placeholder="Search for restaurants near Bela Vista" onChange={this.handleChange} value={this.state.query}/>
                            <button className={"is-hidden-desktop button"} aria-label={"Show suggestions"} onClick={this.showSuggestions}>
                                Show suggestions
                            </button>
                        </p>
                    </div>
                    <ul className="list is-hidden-mobile">
                        { allVenues }
                    </ul>
                </div>
            </div>
        );
    }
}
