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
        influenceOrStart: number | RangeValue,
        end = influenceOrStart,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);
        this._start = RangeValue.createValue(initValue(influenceOrStart, 0));
        this._end = RangeValue.createValue(initValue(end, 0));
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

        effect.rotation = rotationA === rotationB ? rotationA * this.$energy : rotationB * this.$energy;

        //TODO: fix this
        //  else if (this.a.a === 'V' || this.a.a === 'Velocity' || this.a.a === 'v') {
        //     // beta...
        //     particle.rotation = particle.getDirection();
        // }
    }
}
