import { Vector2D } from '../../geometry/Vector2D';
import { CrossType } from '../../types';
import { initValue } from '../../utils/index';
import { Particle } from '../Particle';
import { Zone } from './Zone';

export class LineZone extends Zone {
    private _x1: number;
    private _y1: number;
    private _x2: number;
    private _y2: number;
    private _dx: number;
    private _dy: number;
    private _minX: number;
    private _minY: number;
    private _maxX: number;
    private _maxY: number;
    private _dot: number;
    private _xxyy: number;
    private _gradient: number;
    private _length: number;
    private _direction: string;

    public constructor(x1: number, y1: number, x2: number, y2: number, direction: string, crossType?: CrossType) {
        super(crossType);

        if (x2 - x1 >= 0) {
            this._x1 = x1;
            this._y1 = y1;
            this._x2 = x2;
            this._y2 = y2;
        } else {
            this._x1 = x2;
            this._y1 = y2;
            this._x2 = x1;
            this._y2 = y1;
        }

        this._dx = this._x2 - this._x1;
        this._dy = this._y2 - this._y1;

        this._minX = Math.min(this._x1, this._x2);
        this._minY = Math.min(this._y1, this._y2);
        this._maxX = Math.max(this._x1, this._x2);
        this._maxY = Math.max(this._y1, this._y2);

        this._dot = this._x2 * this._y1 - this._x1 * this._y2;
        this._xxyy = this._dx * this._dx + this._dy * this._dy;

        this._gradient = Math.atan2(this._dy, this._dx);
        this._length = Math.sqrt(this._dx * this._dx + this._dy * this._dy);
        this._direction = initValue(direction, '>');
    }

    public get positionIn(): Vector2D {
        const random = Math.random();

        this.$position.x = this._x1 + random * this._length * Math.cos(this._gradient);
        this.$position.y = this._y1 + random * this._length * Math.sin(this._gradient);

        return this.$position;
    }

    public get positionOn(): Vector2D {
        return this.positionIn;
    }

    protected $crossingDead(particle: Particle): void {
        if (!this._isRangeOut(particle)) return;

        if (
            this._direction === '>' ||
            this._direction === 'R' ||
            this._direction === 'right' ||
            this._direction === 'down'
        ) {
            particle.dead = this._getDirection(particle.position.x, particle.position.y);
        } else {
            particle.dead = !this._getDirection(particle.position.x, particle.position.y);
        }
    }
    protected $crossingBound(particle: Particle): void {
        if (!this._isRangeOut(particle)) return;

        if (this._getDistance(particle.position.x, particle.position.y) <= particle.radius) {
            if (this._dx === 0) {
                particle.velocity.x *= -1;
            } else if (this._dy === 0) {
                particle.velocity.y *= -1;
            } else {
                this._getSymmetric(particle.velocity);
            }
        }
    }
    protected $crossingCross(particle: Particle): void {
        void particle;
        console.warn('Sorry, LineZone does not support cross method!');
    }

    private _getDistance(x: number, y: number): number {
        const A = this._dy;
        const B = -this._dx;
        const C = this._dot;
        const D = A * x + B * y + C;

        return D / Math.sqrt(this._xxyy);
    }

    private _getDirection(x: number, y: number): boolean {
        const A = this._dy;
        const B = -this._dx;
        const C = this._dot;
        const D = B === 0 ? 1 : B;

        if ((A * x + B * y + C) * D > 0) return true;
        else return false;
    }

    private _getSymmetric(v: Vector2D): Vector2D {
        const tha2 = v.getGradient();
        const tha1 = this._gradient;
        const tha = 2 * (tha1 - tha2);

        const oldx = v.x;
        const oldy = v.y;

        v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
        v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);

        return v;
    }

    private _isRangeOut(particle: Particle): boolean {
        const angle = Math.abs(this._gradient);

        if (angle <= Math.PI / 4) {
            if (particle.position.x <= this._maxX && particle.position.x >= this._minX) return true;
        } else {
            if (particle.position.y <= this._maxY && particle.position.y >= this._minY) return true;
        }

        return false;
    }
}
