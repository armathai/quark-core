import { EaseFunction } from '../../ease/index';
import { Vector2D } from '../../geometry/Vector2D';
import { normalizeVector } from '../../utils';
import { Particle } from '../Particle';
import { Effect } from './Effect';

export class Force extends Effect {
    public force: Vector2D;

    public constructor(fx: number, fy: number, life: number, easing: string | EaseFunction) {
        super(life, easing);
        this.force = normalizeVector(new Vector2D(fx, fy));
    }

    public initialize(particle: Particle): void {
        void particle;
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);
        particle.acceleration.add(this.force);
    }
}
