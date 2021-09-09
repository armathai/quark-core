import { initValue } from '../../utils/index';
import { RangeValue } from './RangeValue';
import { Value } from './Value';

export class Rate extends Value<number> {
    public quantity: RangeValue;
    public interval: RangeValue;
    public startTime: number;
    public nextTime: number;

    public constructor(quantity: number | RangeValue, interval: number | RangeValue) {
        super();
        this.quantity = <RangeValue>RangeValue.createValue(initValue(quantity, 1));
        this.interval = <RangeValue>RangeValue.createValue(initValue(interval, 1));
        this.reset();
    }

    public reset(): void {
        this.startTime = 0;
        this.nextTime = this.interval.get();
    }

    public get(time: number): number {
        this.startTime += time;

        if (this.startTime >= this.nextTime) {
            this.startTime = 0;
            this.nextTime = this.interval.get();

            if (this.quantity.end === 1) {
                return this.quantity.get(false) > 0.5 ? 1 : 0;
            } else {
                return this.quantity.get(true);
            }
        }

        return 0;
    }
}
