import { MultipleValue, RangeValue } from '.';
import { VelocityValue } from './core/measure/Velocity';
import { Value } from './core/value/Value';
import { Zone } from './core/zone/Zone';

export type MeasureValue = number | Value<unknown> | MultipleValue<unknown> | RangeValue | VelocityValue | Zone;

export enum CrossType {
    dead = 'dead',
    bound = 'bound',
    cross = 'cross',
}

export enum VelocityZoneVectorType {
    both = 0,
    accumulate = -1,
    spread = 1,
}
