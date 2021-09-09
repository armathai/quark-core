import { halfPI } from '../../constants/index';
import { EaseFunction } from '../../ease/index';
import { Vector2D } from '../../geometry/Vector2D';
import { normalizeVector, randomBetween } from '../../utils/index';
import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Effect } from './Effect';

const CHANGING = 'changing';

export class Cyclone extends Effect {
    private _force: number | string;
    private _angle: number | string;
    private _span: RangeValue;

    public constructor(
        angle: number | string | RangeValue,
        force: string | number,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);
        this._angle = halfPI;
        this._setAngleAndForce(angle, force);
    }

    public initialize(particle: Particle): void {
        const { auxiliaryEffect } = particle;
        if (this._angle === 'random') {
            auxiliaryEffect.cangle = randomBetween(-Math.PI, Math.PI);
        } else if (this._angle === 'span') {
            auxiliaryEffect.cangle = this._span.get();
        }

        auxiliaryEffect.cyclone = new Vector2D(0, 0);
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);
        const { velocity, auxiliaryEffect, acceleration } = particle;

        let gradient = velocity.getGradient();
        if (this._angle === 'random' || this._angle === 'span') {
            gradient += auxiliaryEffect.cangle;
        } else {
            gradient += <number>this._angle;
        }

        let length: number;
        if (this._force === CHANGING) {
            length = velocity.length() / 100;
        } else {
            length = <number>this._force;
        }

        auxiliaryEffect.cyclone.x = length * Math.cos(gradient);
        auxiliaryEffect.cyclone.y = length * Math.sin(gradient);
        auxiliaryEffect.cyclone = normalizeVector(auxiliaryEffect.cyclone);
        acceleration.add(auxiliaryEffect.cyclone);
    }

    private _setAngleAndForce(angle: number | string | RangeValue, force: string | number): void {
        this._force = CHANGING;
        this._angle = halfPI;

        if (angle === 'right') {
            this._angle = halfPI;
        } else if (angle === 'left') {
            this._angle = -halfPI;
        } else if (angle === 'random') {
            this._angle = 'random';
        } else if (angle instanceof RangeValue) {
            this._angle = 'span';
            this._span = angle;
        } else if (angle) {
            this._angle = angle;
        }

        if (
            String(force).toLowerCase() === 'changing' ||
            String(force).toLowerCase() === 'chang' ||
            String(force).toLowerCase() === 'auto'
        ) {
            this._force = CHANGING;
        } else if (force) {
            this._force = force;
        }
    }
}
