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
    render() {
        return (
            <div>
                <div>
                    <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query}/>
                </div>
                {this.props.venues.map((venue) => <div key={venue.id}>{venue.name}</div>)}
            </div>
        );
    }
}
