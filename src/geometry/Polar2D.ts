import { Vector2D } from './Vector2D';

export class Polar2D {
    public r: number;
    public tha: number;
    public constructor(r: number, tha: number) {
        this.r = Math.abs(r) || 0;
        this.tha = tha || 0;
    }

    public set(r: number, tha: number): this {
        this.r = r;
        this.tha = tha;
        return this;
    }

    public setR(r: number): this {
        this.r = r;
        return this;
    }

    public setTha(tha: number): this {
        this.tha = tha;
        return this;
    }

    public copy(p: Polar2D): this {
        this.r = p.r;
        this.tha = p.tha;
        return this;
    }

    public toVector(): Vector2D {
        return new Vector2D(this.getX(), this.getY());
    }

    public getX(): number {
        return this.r * Math.sin(this.tha);
    }

    public getY(): number {
        return -this.r * Math.cos(this.tha);
    }

    public normalize(): this {
        this.r = 1;
        return this;
    }

    public equals(v: { r: number; tha: number }): boolean {
        return v.r === this.r && v.tha === this.tha;
    }

    public clear(): this {
        this.r = 0.0;
        this.tha = 0.0;
        return this;
    }

    public clone(): Polar2D {
        return new Polar2D(this.r, this.tha);
    }
}
