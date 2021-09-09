import { EaseFunction } from '../../ease/index';
import { Force } from './Force';

export class Gravity extends Force {
    public constructor(g: number, life: number, easing: string | EaseFunction) {
        super(0, g, life, easing);
    }
}
