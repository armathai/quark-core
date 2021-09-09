import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Measure } from './Measure';

export class Life extends Measure<RangeValue> {
    public constructor(start: number, end = start, center = false) {
        super(<RangeValue>RangeValue.createValue(start, end, center));
    }

    public initialize(target: Particle): void {
        target.life = this.$value.start === Infinity ? Infinity : this.$value.get();
    }
}
