import { EaseFunction } from '../../ease/index';
import { initValue } from '../../utils/index';
import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Value } from '../value/Value';
import { Effect } from './Effect';

export class Rotation extends Effect {
    private _start: Value<number>;
    private _end: Value<number>;
    private _style: string;

    public constructor(
        influence: number | RangeValue,
        b = influence,
        style: string,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);
        this._start = RangeValue.createValue(initValue(influence, 0));
        this._end = RangeValue.createValue(initValue(b, 0));
        this._style = initValue(style, 'to');
    }

    public initialize(particle: Particle): void {
        const { auxiliaryEffect, effect } = particle;
        effect.rotation = auxiliaryEffect.rotationA = this._start.get();
        auxiliaryEffect.rotationB = this._end.get();
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);
        const { auxiliaryEffect, effect } = particle;
        const { rotationA, rotationB } = auxiliaryEffect;

        if (rotationA === rotationB) {
            return;
        }

        if (this._style === 'to' || this._style === 'TO' || this._style === '_') {
            effect.rotation += rotationB + (rotationA - rotationB) * this.$energy;
        } else {
            effect.rotation += rotationB;
        }

        //TODO: fix this
        //  else if (this.a.a === 'V' || this.a.a === 'Velocity' || this.a.a === 'v') {
        //     // beta...
        //     particle.rotation = particle.getDirection();
        // }
    }
}
