import {
    isNullOrUndefined,
    randomBetween,
    randomFocused,
    randomIntBetweenInclusive,
    randomIntFocusedInclusive,
} from '../../utils/index';
import { Value } from './Value';

export class RangeValue extends Value<number> {
    private _start: number;
    private _end: number;
    private _center: boolean;

    public constructor(start: number, end = start, center = false) {
        super();
        this._start = start;
        this._end = end;
        this._center = center;
    }

    public get start(): number {
        return this._start;
    }

    public get end(): number {
        return this._end;
    }

    public static createValue(start: number | Value<number>, end = start, center = false): Value<number> {
        if (isNullOrUndefined(start)) {
            return null;
        }

        if (start instanceof Value) {
            return start;
        }

        return new RangeValue(start, <number>end, center);
    }

    public get(isInt = false): number {
        return this._center ? this._randomFloating(isInt) : this._randomBetween(isInt);
    }

    private _randomBetween(isInt = false): number {
        return isInt ? randomIntBetweenInclusive(this._start, this._end) : randomBetween(this._start, this._end);
    }

    private _randomFloating(isInt = false): number {
        return isInt ? randomIntFocusedInclusive(this._start, this._end) : randomFocused(this._start, this._end);
    }
}
