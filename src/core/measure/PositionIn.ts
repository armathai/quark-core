import { Vector2D } from '../..';
import { initValue } from '../../utils/index';
import { PointZone } from '../zone/PointZone';
import { Zone } from '../zone/Zone';
import { Position } from './Position';

export class PositionIn extends Position {
    public constructor(zone: Zone) {
        super(initValue(zone, new PointZone()));
    }

    protected get $position(): Vector2D {
        return this.$value.positionIn;
    }
}
