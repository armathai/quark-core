import { EaseFunction } from '../../ease/index';
import { Particle } from '../Particle';
import { Zone } from '../zone/Zone';
import { Effect } from './Effect';

export class CrossZone extends Effect {
    private _zone: Zone;

    public constructor(zone: Zone, life?: number, easing?: string | EaseFunction) {
        super(life, easing);
        this._zone = zone;
    }

    public initialize(particle: Particle): void {
        void particle;
    }

    public apply(particle: Particle, time: number): void {
        super.apply(particle, time);
        this._zone.crossing(particle);
    }
}
