import { MultipleValue } from '../..';
import { normalizeValue } from '../../utils';
import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Value } from '../value/Value';
import { Measure } from './Measure';

export type VelocityValue = {
    x: Value<number>;
    y: Value<number>;
};

export class Velocity extends Measure<VelocityValue> {
    public constructor(x: number | RangeValue | MultipleValue<number>, y: number | RangeValue | MultipleValue<number>) {
        super({ x: RangeValue.createValue(x), y: RangeValue.createValue(y) });
    }

    public initialize(target: Particle): void {
        target.velocity.x = normalizeValue(this.$value.x.get());
        target.velocity.y = normalizeValue(this.$value.y.get());
    }
}
