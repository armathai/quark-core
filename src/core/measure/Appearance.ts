import { Particle } from '../Particle';
import { MultipleValue } from '../value/MultipleValue';
import { Measure } from './Measure';

export class Appearance<V> extends Measure<MultipleValue<V>> {
    public constructor(value: V | V[]) {
        super(MultipleValue.createValue(value));
    }

    public initialize(particle: Particle): void {
        particle.appearance = this.$value.get();
    }
}
