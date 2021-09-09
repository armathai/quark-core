import { halfPI } from '../constants/index';

export class Vector2D {
    public constructor(public x: number = 0, public y: number = 0) {}

    public set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    public setX(x: number): this {
        this.x = x;
        return this;
    }

    public setY(y: number): this {
        this.y = y;
        return this;
    }

    public getGradient(): number {
        if (this.x !== 0) {
            return Math.atan2(this.y, this.x);
        }
        return Math.sign(this.y) * halfPI;
    }

    public copy(v: Vector2D): this {
        this.x = v.x;
        this.y = v.y;

        return this;
    }

    public add(v: Vector2D, w?: Vector2D): this {
        if (w) {
            return this.addVectors(v, w);
        }

        this.x += v.x;
        this.y += v.y;

        return this;
    }

    public addXY(a: number, b: number): this {
        this.x += a;
        this.y += b;

        return this;
    }

    public addVectors(a: Vector2D, b: Vector2D): this {
        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;
    }

    public sub(v: Vector2D, w?: Vector2D): this {
        if (w) {
            return this.subVectors(v, w);
        }

        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    public subVectors(a: Vector2D, b: Vector2D): this {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    }

    public divideScalar(s: number): this {
        if (s !== 0) {
            this.x /= s;
            this.y /= s;
        } else {
            this.set(0, 0);
        }

        return this;
    }

    public multiplyScalar(s: number): this {
        this.x *= s;
        this.y *= s;

        return this;
    }

    public negate(): this {
        return this.multiplyScalar(-1);
    }

    public dot(v: Vector2D): number {
        return this.x * v.x + this.y * v.y;
    }

    public lengthSq(): number {
        return this.x * this.x + this.y * this.y;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): this {
        return this.divideScalar(this.length());
    }

    public distanceTo(v: Vector2D): number {
        return Math.sqrt(this.distanceToSquared(v));
    }

    public rotate(tha: number): this {
        const x = this.x;
        const y = this.y;

        this.x = x * Math.cos(tha) + y * Math.sin(tha);
        this.y = -x * Math.sin(tha) + y * Math.cos(tha);

        return this;
    }

    public distanceToSquared(v: Vector2D): number {
        const dx = this.x - v.x;
        const dy = this.y - v.y;

        return dx * dx + dy * dy;
    }

    public lerp(v: Vector2D, alpha: number): this {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;
    }

    public equals(v: Vector2D): boolean {
        return v.x === this.x && v.y === this.y;
    }

    public clear(): this {
        this.x = 0.0;
        this.y = 0.0;
        return this;
    }

    public clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }
}
