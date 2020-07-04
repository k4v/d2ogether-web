import React, { Component } from 'react';

import RollCommandSectionComponent from './RollCommandSection'
import RollSelectionSectionComponent from './RollSelectionSection'
import Roll from './Roll'

import './css/App.css';

import title_logo from './img/D20.png';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roll_layers: [
                new Roll()
            ],
            do_running_tally: false,
            roll_total: null,
            is_rolling: false
        };
    }

    rollDice = () => {
        this.setState({is_rolling: true});

        let roll_total = (this.state.do_running_tally && this.state.roll_total !== null) ? this.state.roll_total : 0;
        
        for (let i=0; i < this.state.roll_layers.length; ++i) {
            roll_total += this.state.roll_layers[i].roll();
        }

        this.setState({
            roll_layers: this.state.roll_layers,
            roll_total: roll_total,
            is_rolling: false
        });
    }

    toggleRunningTally = () => {
        this.setState({do_running_tally: !this.state.do_running_tally});
    }

    addRollLayer = () => {
        if (this.state.roll_layers.length === 10) {
            return;
        }

        let updated_layers = this.state.roll_layers;
        updated_layers.push(new Roll());

        this.setState({roll_layers: updated_layers});
    }

    removeRollLayer = (layer_id) => {
        if (this.state.roll_layers.length === 1) {
            return;
        }

        if (layer_id >= 0 && layer_id < this.state.roll_layers.length) {
            let updated_layers = this.state.roll_layers;
            // Remove layer
            updated_layers.splice(layer_id, 1);

            // Update state
            this.setState({
                roll_layers: updated_layers
            });
        }
    }

    changeRollSelection = (roll, layer_id) => {
        let updated_layers = this.state.roll_layers;
        updated_layers[layer_id] = roll;

        this.setState({roll_layers: updated_layers});
    }

    render() {
        let roll_strings = [];
        for (let roll_layer of this.state.roll_layers) {
            roll_strings.push(roll_layer.getRollString());
        }

        return (
            <div className="App">
                <div className="title-section">
                    <div className="title-element">
                        <img id="dice-roll-image" className="dice-image-blank"
                            src={title_logo} alt="Static D20" />
                    </div>
                    &nbsp;
                    <div className="title-element">
                        <h2>&middot; D2ogether Dice Roller &middot;</h2>
                    </div>
                </div>

                <RollCommandSectionComponent
                    roll_strings={roll_strings}
                    roll_total={this.state.roll_total} />
                
                <div className="roll-options-section">
                    <div className="roll-options-element">
                        <button className="clickable-element"
                        id="dice-roll-button" title="Roll ALL the dice!"
                        onClick={() => this.rollDice()} disabled={this.state.is_rolling} type="button">Roll</button>
                    </div>
                    <div className="roll-options-element">
                        <i className={"clickable-element bx bx-md " + (this.state.do_running_tally ? "bxs-layer-plus": "bx-layer-plus")}
                            id="running-tally-button" title="Keep a running tally of rolls"
                            style={{color: "#0066CC"}}
                            onClick={() => this.toggleRunningTally()} ></i>
                    </div>
                    <div className="roll-options-element">
                        <i
                            className="clickable-element bx bx-md bxs-plus-circle" style={{color:"#00D000"}}
                            title="Add a new dice roll"
                            onClick={() => this.addRollLayer()} />
                    </div>
                </div>

                {
                    this.state.roll_layers.map((layer, index) =>
                        <RollSelectionSectionComponent
                            layer_index={index}
                            key={index}
                            roll={layer}
                            onRemoveLayer={this.removeRollLayer}
                            onChangeRollSelection={this.changeRollSelection}
                        />)
                }
            </div>
        );
    }
}

export default App;
