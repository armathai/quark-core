import { EaseFunction } from '../../ease/index';
import { Vector2D } from '../../geometry/Vector2D';
import { initValue, normalizeValue } from '../../utils/index';
import { Particle } from '../Particle';
import { Effect } from './Effect';

export class GravityWell extends Effect {
    private _distanceVec: Vector2D;
    private _centerPoint: Vector2D;
    private _force: number;

    public constructor(centerPoint?: Vector2D, force = 100, life?: number, easing?: string | EaseFunction) {
        super(life, easing);

        this._distanceVec = new Vector2D();
        this._centerPoint = initValue(centerPoint, new Vector2D());
        this._force = normalizeValue(force);
    }

    public initialize(particle: Particle): void {
        void particle;
    }

    public apply(particle: Particle, time: number): void {
        const { position, velocity } = particle;

        this._distanceVec.set(this._centerPoint.x - position.x, this._centerPoint.y - position.y);
        const distanceSq = this._distanceVec.lengthSq();
        if (distanceSq !== 0) {
            const distance = this._distanceVec.length();
            const factor = (this._force * time) / (distanceSq * distance);

            velocity.x += factor * this._distanceVec.x;
            velocity.y += factor * this._distanceVec.y;
        }
    }
}
