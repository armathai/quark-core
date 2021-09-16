import { Vector2D } from '../../geometry/Vector2D';
import { CrossType } from '../../types';
import { Particle } from '../Particle';
import { Zone } from './Zone';

export class PointZone extends Zone {
    public x: number;
    public y: number;

    public constructor(x = 0, y = 0, crossType?: CrossType) {
        super(crossType);

        this.x = x;
        this.y = y;
    }

    public get positionIn(): Vector2D {
        this.$position.x = this.x;
        this.$position.y = this.y;

        return this.$position;
    }

    public get positionOn(): Vector2D {
        return this.positionIn;
    }

    public crossing(): void {
        console.warn('Sorry, PointZone does not support crossing method!');
    }

    protected $crossingDead(particle: Particle): void {
        void particle;
        throw new Error('Method not implemented.');
    }
    protected $crossingBound(particle: Particle): void {
        void particle;
        throw new Error('Method not implemented.');
    }
    protected $crossingCross(particle: Particle): void {
        void particle;
        throw new Error('Method not implemented.');
    }
}
