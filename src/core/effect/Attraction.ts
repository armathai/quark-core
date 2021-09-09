import { EaseFunction } from '../../ease/index';
import { Vector2D } from '../../geometry/Vector2D';
import { initValue, normalizeValue } from '../../utils/index';
import { Particle } from '../Particle';
import { Effect } from './Effect';

export class Attraction extends Effect {
    protected $force: number;

    private _targetPosition: Vector2D;
    private _radius: number;
    private _radiusSq: number;
    private _attractionForce: Vector2D;
    private _lengthSq: number;

    /**
     * This behaviour let the particles follow one specific Vector2D
     */
    public constructor(
        targetPosition: Vector2D,
        force: number,
        radius: number,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);

        this._targetPosition = initValue(targetPosition, new Vector2D());
        this.$force = initValue(normalizeValue(force), 100);
        this._radius = initValue(radius, 1000);

        this._radiusSq = this._radius * this._radius;
        this._attractionForce = new Vector2D();
        this._lengthSq = 0;
    }

    public initialize(particle: Particle): void {
        void particle;
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);

        this._attractionForce.copy(this._targetPosition);
        this._attractionForce.sub(particle.position);
        this._lengthSq = this._attractionForce.lengthSq();

        if (this._lengthSq > 0.00004 && this._lengthSq < this._radiusSq) {
            this._attractionForce.normalize();
            this._attractionForce.multiplyScalar(1 - this._lengthSq / this._radiusSq);
            this._attractionForce.multiplyScalar(this.$force);

            particle.acceleration.add(this._attractionForce);
        }
    }
}
