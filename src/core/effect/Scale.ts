import { EaseFunction } from '../../ease/index';
import { initValue } from '../../utils/index';
import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Effect } from './Effect';

export class Scale extends Effect {
    private _start: RangeValue;
    private _end: RangeValue;

    public constructor(start: number | RangeValue = 1, end = start, life?: number, easing?: string | EaseFunction) {
        super(life, easing);
        this._start = <RangeValue>RangeValue.createValue(initValue(start, 1));
        this._end = <RangeValue>RangeValue.createValue(end);
    }

    private get _sameStartAndEnd(): boolean {
        return this._start === this._end;
    }

    public initialize(particle: Particle): void {
        const { auxiliaryEffect } = particle;
        auxiliaryEffect.scaleA = this._start.get();
        auxiliaryEffect.scaleB = this._sameStartAndEnd ? auxiliaryEffect.scaleA : this._end.get();
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);
        const { auxiliaryEffect, effect } = particle;
        const { scaleA, scaleB } = auxiliaryEffect;
        effect.scale = scaleB + (scaleA - scaleB) * this.$energy;
    }
}
