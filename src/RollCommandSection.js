import React, { Component } from 'react';

import './css/RollCommand.css';

class RollCommandSectionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            is_favorite: false
        };
    }

    toggleRollFavorite = () => {
        this.setState({is_favorite: !this.state.is_favorite});
    }

    render() {
        let star_icon_class = this.state.is_favorite ? 'bxs-star' : 'bx-star';

        return (
            <div className="roll-command-section">
                <input className="roll-command-element" id="roll-total-text" type="text"
                    value={this.props.roll_total === null ? "" : this.props.roll_total}
                    disabled />
                <input className="roll-command-element" id="current-roll-text" type="text"
                    value={this.props.current_roll === null ? "" : this.props.current_roll}
                    disabled={true} style={{display: this.props.tally_mode ? "inline" : "none"}} />
                <input className="roll-command-element" id="roll-command-text" type="text"
                    value={this.props.roll_strings.join(' + ')} disabled />
                <i className={"right-aligned clickable-element bx bx-md " + star_icon_class}
                    id="favorite-roll-button" title="Favorite this roll"
                    onClick={() => this.toggleRollFavorite()}> </i>
            </div>
        );
    }
}

export default RollCommandSectionComponent;
