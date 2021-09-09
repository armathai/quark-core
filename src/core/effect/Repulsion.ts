import { EaseFunction } from '../../ease/index';
import { Vector2D } from '../../geometry/Vector2D';
import { Attraction } from './Attraction';

export class Repulsion extends Attraction {
    /**
     * The opposite of Attraction - turns the force
     */
    public constructor(
        targetPosition: Vector2D,
        force: number,
        radius: number,
        life: number,
        easing: string | EaseFunction,
    ) {
        super(targetPosition, force, radius, life, easing);
        this.$force *= -1;
    }
}
