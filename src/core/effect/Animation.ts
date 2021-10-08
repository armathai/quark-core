import { Particle } from '../Particle';
import { Effect } from './Effect';

export class Animation<A> extends Effect {
    private _sequence: A[];
    private _delta: number;

    public constructor(sequence: A | A[], fps = 30) {
        super();
        this._sequence = Array.isArray(sequence) ? sequence : [sequence];
        this._delta = 1 / fps;
    }

    public initialize(particle: Particle): void {
        particle.appearance = this._sequence[0];
        const { auxiliaryEffect } = particle;
        auxiliaryEffect.animationTime = 0;
        auxiliaryEffect.animationIndex = 0;
    }

    public apply(particle: Particle, time: number): void {
        const { auxiliaryEffect } = particle;
        auxiliaryEffect.animationTime += time;
        if (auxiliaryEffect.animationTime >= this._delta) {
            let index = auxiliaryEffect.animationIndex + 1;
            index = index === this._sequence.length ? 0 : index;
            particle.appearance = this._sequence[index];
            auxiliaryEffect.animationTime = 0;
            auxiliaryEffect.animationIndex = index;
        }
    }
}
