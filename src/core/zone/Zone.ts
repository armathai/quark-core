import { Vector2D } from '../../geometry/Vector2D';
import { CrossType } from '../../types';
import { Particle } from '../Particle';

export abstract class Zone {
    protected $position: Vector2D;
    protected $crossType: CrossType;

    public constructor(crossType = CrossType.dead) {
        this.$crossType = crossType;
        this.$position = new Vector2D(0, 0);
    }

    public crossing(particle: Particle): void {
        switch (this.$crossType) {
            case CrossType.dead:
                this.$crossingDead(particle);
                break;
            case CrossType.bound:
                this.$crossingBound(particle);
                break;
            case CrossType.cross:
                this.$crossingCross(particle);
                break;
        }
    }

    public abstract get positionIn(): Vector2D;

    public abstract get positionOn(): Vector2D;

    protected abstract $crossingDead(particle: Particle): void;

    protected abstract $crossingBound(particle: Particle): void;

    protected abstract $crossingCross(particle: Particle): void;
}
