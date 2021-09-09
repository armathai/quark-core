import { Particle } from '../Particle';

export abstract class Measure<V> {
    protected $value: V;

    public constructor(value: V) {
        this.$value = value;
    }

    public abstract initialize(particle: Particle): void;
}
