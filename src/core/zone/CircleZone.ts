import { doublePI, halfPI } from '../../constants';
import { Vector2D } from '../../geometry/Vector2D';
import { Particle } from '../Particle';
import { CrossType } from './CrossType';
import { Zone } from './Zone';

export class CircleZone extends Zone {
    public x: number;
    public y: number;
    public radius: number;
    public angle: number;
    public center: Vector2D;
    public randomRadius: number;

    public constructor(x: number, y: number, radius: number, crossType?: CrossType) {
        super(crossType);

        this.x = x;
        this.y = y;
        this.radius = radius;

        this.angle = 0;
        this.center = new Vector2D(x, y);
    }

    public get position(): Vector2D {
        this.angle = doublePI * Math.random();
        this.randomRadius = Math.random() * this.radius;

        this.$position.x = this.x + this.randomRadius * Math.cos(this.angle);
        this.$position.y = this.y + this.randomRadius * Math.sin(this.angle);

        return this.$position;
    }

    protected $crossingDead(particle: Particle): void {
        const d = particle.position.distanceTo(this.center);
        if (d - particle.radius > this.radius) {
            particle.dead = true;
        }
    }

    protected $crossingBound(particle: Particle): void {
        const d = particle.position.distanceTo(this.center);
        if (d + particle.radius >= this.radius) {
            this._getSymmetric(particle);
        }
    }

    protected $crossingCross(particle: Particle): void {
        void particle;
        console.warn('Sorry, CircleZone does not support cross method!');
    }

    private _getSymmetric(particle: Particle): void {
        const tha2 = particle.velocity.getGradient();
        const tha1 = this._getGradient(particle);

        const tha = 2 * (tha1 - tha2);
        const oldx = particle.velocity.x;
        const oldy = particle.velocity.y;

        particle.velocity.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
        particle.velocity.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
    }

    private _getGradient(particle: Particle): number {
        return -halfPI + Math.atan2(particle.position.y - this.center.y, particle.position.x - this.center.x);
    }
}
