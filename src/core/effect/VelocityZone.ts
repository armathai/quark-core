import { MultipleValue } from '../..';
import { EaseFunction } from '../../ease';
import { VelocityZoneVectorType } from '../../types';
import { Particle } from '../Particle';
import { CircleZone } from '../zone/CircleZone';
import { RectZone } from '../zone/RectZone';
import { Zone } from '../zone/Zone';
import { Effect } from './Effect';

export class VelocityZone extends Effect {
    private _zone: Zone;
    private _direction: MultipleValue<number>;

    public constructor(
        zone: Zone,
        type: VelocityZoneVectorType = VelocityZoneVectorType.spread,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);
        this._zone = zone;
        this._direction =
            type === VelocityZoneVectorType.both
                ? new MultipleValue([VelocityZoneVectorType.spread, VelocityZoneVectorType.accumulate])
                : new MultipleValue([type]);
    }

    public initialize(particle: Particle): void {
        switch (true) {
            case this._zone instanceof RectZone:
                this._initializeRectZone(particle);
                break;
            case this._zone instanceof CircleZone:
                break;
        }
    }

    public apply(particle: Particle, time: number): void {
        void particle, time;
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
}
