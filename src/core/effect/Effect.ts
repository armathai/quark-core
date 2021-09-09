import { EaseFunction, getEasing } from '../../ease/index';
import { Particle } from '../Particle';

export abstract class Effect {
    protected $dead: boolean;
    protected $energy: number;
    protected $age: number;
    protected $easing: EaseFunction;
    protected $life: number;

    public constructor(life = Infinity, easing?: string | EaseFunction) {
        this.$life = life;
        this.$easing = getEasing(easing);
        this.$age = 0;
        this.$energy = 1;
        this.$dead = false;
    }

    public destroy(): void {
        void 0;
    }

    public apply(particle: Particle, time: number, ..._args: unknown[]): void {
        this.$age += time;
        if (this.$age >= this.$life || this.$dead) {
            this.$energy = 0;
            this.$dead = true;
            this.destroy();
        } else {
            const scale = this.$easing(particle.age / particle.life);
            this.$energy = Math.max(1 - scale, 0);
        }
    }

    public abstract initialize(particle: Particle): void;
}
