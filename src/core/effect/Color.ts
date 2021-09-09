import { EaseFunction } from '../../ease/index';
import { numberToRgb } from '../../utils/index';
import { Particle } from '../Particle';
import { ColorValue } from '../value/ColorValue';
import { Effect } from './Effect';

export class Color extends Effect {
    private _start: ColorValue;
    private _end: ColorValue;

    public constructor(
        start: number | ColorValue,
        end?: number | ColorValue,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);

        this._start = ColorValue.createColorValue(start);
        this._end = ColorValue.createColorValue(end);
    }

    public initialize(particle: Particle): void {
        const { auxiliaryEffect } = particle;
        auxiliaryEffect.colorA = numberToRgb(this._start.get());
        if (this._end) {
            auxiliaryEffect.colorB = numberToRgb(this._end.get());
        }
    }

    public apply(particle: Particle, time: number): void {
        const { effect, auxiliaryEffect } = particle;
        const { color } = effect;
        const { colorB, colorA } = auxiliaryEffect;
        if (this._end) {
            super.apply(particle, time);
            color.r = Math.floor(colorB.r + (colorA.r - colorB.r) * this.$energy);
            color.g = Math.floor(colorB.g + (colorA.g - colorB.g) * this.$energy);
            color.b = Math.floor(colorB.b + (colorA.b - colorB.b) * this.$energy);
        } else {
            color.r = colorA.r;
            color.g = colorA.g;
            color.b = colorA.b;
        }
    }
}
