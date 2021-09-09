import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Value } from '../value/Value';
import { Measure } from './Measure';

export class Mass extends Measure<Value<number>> {
    public constructor(start: number, end = start) {
        super(RangeValue.createValue(start, end));
    }

    public initialize(target: Particle): void {
        target.mass = this.$value.get();
    }
}
