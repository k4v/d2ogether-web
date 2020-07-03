export const DICE_TYPES = {
    D20: 20,
    D12: 12,
    D10: 10,
    D8: 8,
    D6: 6,
    D4: 4,
    D100: 100
}

class Roll {
    constructor() {
        this.init();
    }

    init = () => {
        this.dice_num = 1;
        this.die_type = DICE_TYPES.D20;
        this.roll_bonus = 0;
        this.advantage = 0;
        this.roll_fill = {
            roll_values: [],
            roll_total: null
        }
    }

    max = (array) => {
        let max = array[0];

        for (let element of array) {
            if (element > max) {
                max = element;
            }
        }
        return max;
    }

    min = (array) => {
        let min = array[0];

        for (let element of array) {
            if (element < min) {
                min = element;
            }
        }
        return min;
    }

    // Compute roll string 
    getRollString = () => {
        let roll_string = "";
        roll_string = (this.dice_num > 1 ? this.dice_num : "") + "D" + this.die_type;

        if (this.advantage === 1) {
            roll_string = "adv(" + roll_string + ")";
        }
        else if (this.advantage === 2) {
            roll_string = "disadv(" + roll_string + ")";
        }

        if (this.roll_bonus > 0) {
            roll_string += " + " + this.roll_bonus;
        }
        else if (this.roll_bonus < 0) {
            roll_string += " - " + Math.abs(this.roll_bonus);
        }

        return roll_string;
    }

    getRollResults = () => {
        let roll_results = "";
        for (let i=0; i<this.roll_fill.roll_values.length; ++i) {
            roll_results += this.roll_fill.roll_values[i].join('/');
            if (i < this.roll_fill.roll_values.length - 1) {
                roll_results += ", ";
            }
        }
        
        return roll_results;
    }

    roll = () => {
        let random_array = new Uint32Array(this.dice_num * (this.advantage ? 2 : 1));
        window.crypto.getRandomValues(random_array);
        
        let random_index = 0;

        this.roll_fill = {
            roll_values: [],
            roll_sum: null
        }

        for (let i=0; i<this.dice_num; ++i) {
            this.roll_fill.roll_values.push([1 + (random_array[random_index++] % this.die_type)]);
            if (this.advantage) {
                this.roll_fill.roll_values[i].push(1 + (random_array[random_index++] % this.die_type));
            }
        }

        // Compute effective roll value
        // of die index @param die_index
        var computeDieTotal = (die_index) => {
            let die_total = 0;

            if (this.advantage === 1) {
                die_total = this.max(this.roll_fill.roll_values[die_index]);
            }
            else if (this.advantage === 2) {
                die_total = this.min(this.roll_fill.roll_values[die_index]);
            }
            else {
                die_total = this.roll_fill.roll_values[die_index][0];
            }

            return die_total;
        }

        // Compute final net value of the dice rolled
        // including bonuses and status
        var computeRollTotal = () => {
            if (this.roll_fill.roll_values.length < this.dice_num) {
                return null;
            }

            let roll_total = 0;
            for (let i=0; i < this.dice_num; ++i) {
                roll_total += computeDieTotal(i);   
            }

            return roll_total + this.roll_bonus;
        }

        this.roll_fill.roll_total = computeRollTotal();
        return this.roll_fill.roll_total;
    }
}

export default Roll;