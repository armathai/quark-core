import { halfPI } from '../../constants';
import { EaseFunction } from '../../ease';
import { VelocityZoneVectorType } from '../../types';
import { Particle } from '../Particle';
import { MultipleValue } from '../value/MultipleValue';
import { CircleZone } from '../zone/CircleZone';
import { RectZone } from '../zone/RectZone';
import { Zone } from '../zone/Zone';
import { Effect } from './Effect';

export class VelocityZone extends Effect {
    private static readonly _circleDirectionFunction = {
        [VelocityZoneVectorType.spread]: Math.max,
        [VelocityZoneVectorType.accumulate]: Math.min,
    };
    private _zone: Zone;
    private _direction: MultipleValue<number>;
    private _focused: boolean;

    public constructor(
        zone: Zone,
        type: VelocityZoneVectorType = VelocityZoneVectorType.spread,
        focused = false,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);
        this._zone = zone;
        this._direction =
            type === VelocityZoneVectorType.both
                ? new MultipleValue([VelocityZoneVectorType.spread, VelocityZoneVectorType.accumulate])
                : new MultipleValue([type]);
        this._focused = focused;
    }

    public initialize(particle: Particle): void {
        switch (true) {
            case this._zone instanceof RectZone:
                this._focused ? this._initializeRectFocusedZone(particle) : this._initializeRectZone(particle);
                break;
            case this._zone instanceof CircleZone:
                this._focused ? this._initializeCircleFocusedZone(particle) : this._initializeCircleZone(particle);
                break;
        }
    }

    public apply(particle: Particle, time: number): void {
        void particle, time;
    }

    private _initializeCircleZone(particle: Particle): void {
        const centerX = -particle.position.x;
        const centerY = -particle.position.y;
        const a = Math.sqrt(Math.pow(0 - centerX, 2) + Math.pow(0 - centerY, 2));
        const b = Math.sqrt(Math.pow(0 - particle.velocity.x, 2) + Math.pow(0 - particle.velocity.y, 2));
        const c = Math.sqrt(Math.pow(centerX - particle.velocity.x, 2) + Math.pow(centerY - particle.velocity.y, 2));
        const theta = Math.acos((a * a + b * b - c * c) / (2 * a * b));
        if (
            (this._direction.get() === VelocityZoneVectorType.accumulate && theta >= halfPI) ||
            (this._direction.get() === VelocityZoneVectorType.spread && theta <= halfPI)
        ) {
            particle.velocity.negate();
        }
    }

    private _initializeRectZone(particle: Particle): void {
        const zone = this._zone as RectZone;
        const direction = this._direction.get();

        if (particle.position.x === zone.x) {
            particle.velocity.x = -Math.abs(particle.velocity.x) * direction;
        } else if (particle.position.x === zone.x + zone.width) {
            particle.velocity.x = Math.abs(particle.velocity.x) * direction;
        } else if (particle.position.y === zone.y) {
            particle.velocity.y = -Math.abs(particle.velocity.y) * direction;
        } else if (particle.position.y === zone.y + zone.height) {
            particle.velocity.y = Math.abs(particle.velocity.y) * direction;
        }
    }

    private _initializeCircleFocusedZone(particle: Particle): void {
        const centerX = -particle.position.x;
        const centerY = -particle.position.y;
        const r = particle.velocity.length();
        // h: x value of circle centre
        const h = 0;
        // k: y value of circle centre
        const k = 0;
        // m: slope of line between particle and circle centre
        const m = (0 - centerY) / (0 - centerX);
        // n: y-intercept
        const n = k - m * h;
        // get a, b, c values of line between particle and circle centre
        const a = 1 + m * m;
        const b = -h * 2 + m * (n - k) * 2;
        const c = h * h + (n - k) * (n - k) - r * r;

        // get discriminant
        const discriminant = b * b - 4 * a * c;
        const sqrtDiscriminant = Math.sqrt(discriminant);
        const aX2 = a * 2;
        const x1 = (-b + sqrtDiscriminant) / aX2;
        const x2 = (-b - sqrtDiscriminant) / aX2;
        const y1 = m * x1 + n;
        const y2 = m * x2 + n;

        const points = [
            [x1, y1],
            [x2, y2],
        ];

        const ds = [
            Math.sqrt(Math.pow(x1 - centerX, 2) + Math.pow(y1 - centerY, 2)),
            Math.sqrt(Math.pow(x2 - centerX, 2) + Math.pow(y2 - centerY, 2)),
        ];

        const d = VelocityZone._circleDirectionFunction[this._direction.get()](...ds);
        const point = points[ds.indexOf(d)];

        particle.velocity.x = point[0];
        particle.velocity.y = point[1];
    }

    private _initializeRectFocusedZone(particle: Particle): void {
        const centerX = -particle.position.x;
        const centerY = -particle.position.y;
        const dV = particle.velocity.length();
        const m = (0 - centerY) / (0 - centerX);

        const x1 = dV / (1 + Math.abs(m));
        const y1 = m * x1;
        const x2 = -x1;
        const y2 = m * x2;

        const points = [
            [x1, y1],
            [x2, y2],
        ];

        const ds = [
            Math.sqrt(Math.pow(x1 - centerX, 2) + Math.pow(y1 - centerY, 2)),
            Math.sqrt(Math.pow(x2 - centerX, 2) + Math.pow(y2 - centerY, 2)),
        ];

        const d = VelocityZone._circleDirectionFunction[this._direction.get()](...ds);
        const point = points[ds.indexOf(d)];

        particle.velocity.x = point[0];
        particle.velocity.y = point[1];
    }
}
