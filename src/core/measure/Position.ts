import { initValue } from '../../utils/index';
import { Particle } from '../Particle';
import { PointZone } from '../zone/PointZone';
import { Zone } from '../zone/Zone';
import { Measure } from './Measure';

export class Position extends Measure<Zone> {
    public constructor(zone: Zone) {
        super(initValue(zone, new PointZone()));
    }

    public initialize(target: Particle): void {
        const vector = this.$value.position;
        target.position.x = vector.x;
        target.position.y = vector.y;
    }
}
