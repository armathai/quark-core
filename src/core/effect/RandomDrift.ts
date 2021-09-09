import { EaseFunction } from '../../ease/index';
import { Vector2D } from '../../geometry/Vector2D';
import { normalizeVector, randomBetween } from '../../utils/index';
import { Particle } from '../Particle';
import { Effect } from './Effect';

export class RandomDrift extends Effect {
    private _panForce: Vector2D;
    private _delay: number;

    public constructor(driftX: number, driftY: number, delay: number, life?: number, easing?: string | EaseFunction) {
        super(life, easing);

        this._panForce = normalizeVector(new Vector2D(driftX, driftY));
        this._delay = delay;
    }

    public initialize(particle: Particle): void {
        const { auxiliaryEffect } = particle;
        auxiliaryEffect.randomDriftTime = 0;
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);
        const { auxiliaryEffect, acceleration } = particle;
        auxiliaryEffect.randomDriftTime += time;

        if (auxiliaryEffect.randomDriftTime >= this._delay) {
            acceleration.addXY(
                randomBetween(-this._panForce.x, this._panForce.x),
                randomBetween(-this._panForce.y, this._panForce.y),
            );
            auxiliaryEffect.randomDriftTime = 0;
        }
    }
}
