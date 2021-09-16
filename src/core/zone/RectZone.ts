import { Vector2D } from '../../geometry/Vector2D';
import { CrossType } from '../../types';
import { Particle } from '../Particle';
import { Zone } from './Zone';

export class RectZone extends Zone {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public constructor(x: number, y: number, width: number, height: number, crossType?: CrossType) {
        super(crossType);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public get positionIn(): Vector2D {
        this.$position.x = this.x + Math.random() * this.width;
        this.$position.y = this.y + Math.random() * this.height;
        return this.$position;
    }

    public get positionOn(): Vector2D {
        const perimeter = this.width * 2 + this.height * 2;
        this.$position.x = this.x;
        this.$position.y = this.y;
        const dist = Math.random() * perimeter;
        if (dist <= this.height) {
            this.$position.y += Math.random() * this.height;
        } else if (dist <= this.height + this.width) {
            this.$position.x += Math.random() * this.width;
        } else if (dist <= this.height * 2 + this.width) {
            this.$position.y += Math.random() * this.height;
            this.$position.x += this.width;
        } else {
            this.$position.x = Math.random() * this.width + this.x;
            this.$position.y += this.height;
        }
        return this.$position;
    }

    protected $crossingDead(particle: Particle): void {
        const { position, radius } = particle;

        if (position.x + radius < this.x) {
            particle.dead = true;
        } else if (position.x - radius > this.x + this.width) {
            particle.dead = true;
        }

        if (position.y + radius < this.y) {
            particle.dead = true;
        } else if (position.y - radius > this.y + this.height) {
            particle.dead = true;
        }
    }

    protected $crossingBound(particle: Particle): void {
        const { position, radius } = particle;

        if (position.x - radius < this.x) {
            position.x = this.x + radius;
            particle.velocity.x *= -1;
        } else if (position.x + radius > this.x + this.width) {
            position.x = this.x + this.width - radius;
            particle.velocity.x *= -1;
        }

        if (position.y - radius < this.y) {
            position.y = this.y + radius;
            particle.velocity.y *= -1;
        } else if (position.y + radius > this.y + this.height) {
            position.y = this.y + this.height - radius;
            particle.velocity.y *= -1;
        }
    }
    protected $crossingCross(particle: Particle): void {
        const { position, radius } = particle;

        if (position.x + radius < this.x && particle.velocity.x <= 0) {
            position.x = this.x + this.width + radius;
        } else if (position.x - radius > this.x + this.width && particle.velocity.x >= 0) {
            position.x = this.x - radius;
        }

        if (position.y + radius < this.y && particle.velocity.y <= 0) {
            position.y = this.y + this.height + radius;
        } else if (position.y - radius > this.y + this.height && particle.velocity.y >= 0) {
            position.y = this.y - radius;
        }
    }
}
