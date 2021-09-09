import { MultipleValue } from '../..';
import { deg2rad } from '../../constants/index';
import { Polar2D } from '../../geometry/Polar2D';
import { normalizeValue } from '../../utils';
import { Particle } from '../Particle';
import { RangeValue } from '../value/RangeValue';
import { Velocity } from './Velocity';

export class PolarVelocity extends Velocity {
    public constructor(
        radial: number | RangeValue | MultipleValue<number>,
        angular: number | RangeValue | MultipleValue<number>,
    ) {
        super(radial, angular);
    }

    public initialize(target: Particle): void {
        const polar2d = new Polar2D(normalizeValue(this.$value.x.get()), this.$value.y.get() * deg2rad);
        target.velocity.x = polar2d.getX();
        target.velocity.y = polar2d.getY();
    }
}
