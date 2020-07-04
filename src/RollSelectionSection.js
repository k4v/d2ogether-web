import React, { Component } from 'react';

import {DICE_TYPES} from './Roll'

import './css/RollSelection.css';

import no_advantage_icon from './img/d20-dice-blank-100.png'
import advantage_icon from './img/1d20-advantage-50.png';
import disadvantage_icon from './img/1d20-disadvantage-50.png';

class RollSelectionSectionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            layer_index: props.layer_index,
            roll: props.roll
        }

        this.removeLayerHandler = props.onRemoveLayer;
        this.changeRollSelectionHandler = props.onChangeRollSelection;
    }

    handleRollSelectionChange = (event) => {
        let roll = this.state.roll;

        switch(event.target.name) {
            case 'dice-count-num':
                roll.dice_num = Number(event.target.value);
                break;
            case 'die-type':
                roll.die_type = Number(event.target.value);
                break;
            case 'roll-bonus-num':
                roll.roll_bonus = Number(event.target.value);
                break;
            case 'advantage-status':
                roll.advantage = (roll.advantage + 1) % 3;
                break;
            default:
                break;
        }

        this.changeRollSelectionHandler(roll, this.state.layer_index);
    }

    handleRemoveLayer = () => {
        this.removeLayerHandler(this.state.layer_index);
    }

    render() {
        
        // Set icon and class name for the advantage state
        let curr_advantage_icon = no_advantage_icon;
        let advantage_class = "adv-icon";

        if (this.state.roll.advantage === 1) {
            curr_advantage_icon = advantage_icon;
            advantage_class = "pos-" + advantage_class
        }
        else if (this.state.roll.advantage === 2) {
            curr_advantage_icon = disadvantage_icon;
            advantage_class = "neg-" + advantage_class
        }

        // Build dice type dropdown
        let dice_types = [];

        Object.entries(DICE_TYPES).forEach(([die_type, die_value]) =>
            dice_types.push(<option value={die_value} key={die_type}>{die_type}</option>)
        );

        return (
            <div className="roll-options-section">
                <div className="roll-selection-element">
                    <i
                        className="bx bxs-minus-circle clickable-element" style={{color:"#D90000"}}
                        onClick={this.handleRemoveLayer} />
                </div>
                <div className="roll-selection-element">
                    <input name="dice-count-num" type="number" min="1" maxLength="3" value={this.state.roll.dice_num}
                        onChange={this.handleRollSelectionChange} />
                </div>
                &nbsp;
                <div className="roll-selection-element">
                    <select name="die-type" onChange={this.handleRollSelectionChange}>
                        {dice_types}
                    </select>
                </div>
                <span className="roll-selection-element">&nbsp;+&nbsp;</span>
                <div className="roll-selection-element">
                    <input name="roll-bonus-num" type="number" maxLength="3" value={this.state.roll.roll_bonus} min="-100" max="100"
                        onChange={this.handleRollSelectionChange} />
                </div>
                <div className="roll-selection-element">
                    <img name="advantage-status" className={"adv-icon clickable-element " + advantage_class}
                        src={curr_advantage_icon} alt="Advantage selector icon" title="Set advantage for this di(c)e"
                        onClick={this.handleRollSelectionChange} />
                </div>
                <span className="roll-selection-element">&nbsp;=&nbsp;</span>
                <div className="roll-selection-element">
                    <input id="roll-total-value" type="text"
                        value={this.state.roll.roll_fill.roll_total == null ? "" : this.state.roll.roll_fill.roll_total}
                        disabled />
                </div>
                <div className="roll-selection-element">
                    <input id="roll-breakdown" type="text" value={this.state.roll.getRollResults()} disabled />
                </div>
            </div>
        );
    }
}

export default RollSelectionSectionComponent;
