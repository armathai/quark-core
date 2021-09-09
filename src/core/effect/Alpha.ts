import { EaseFunction } from '../../ease/index';
import { initValue } from '../../utils/index';
import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Value } from '../value/Value';
import { Effect } from './Effect';

export class Alpha extends Effect {
    private _start: Value<number>;
    private _end: Value<number>;

    public constructor(
        start: number | RangeValue,
        end: number | RangeValue,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);

        this._start = RangeValue.createValue(initValue(start, 1));
        this._end = RangeValue.createValue(end);
    }

    private get _sameStartAndEnd(): boolean {
        return this._start === this._end;
    }

    public initialize(particle: Particle): void {
        const { auxiliaryEffect } = particle;
        auxiliaryEffect.alphaA = this._start.get();
        auxiliaryEffect.alphaB = this._sameStartAndEnd ? auxiliaryEffect.alphaA : this._end.get();
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);
        const { auxiliaryEffect, effect } = particle;
        const { alphaB, alphaA } = auxiliaryEffect;
        effect.alpha = alphaB + (alphaA - alphaB) * this.$energy;
    }
}
