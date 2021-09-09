import { EaseFunction } from '../../ease/index';
import { Vector2D } from '../../geometry/Vector2D';
import { initValue } from '../../utils/index';
import { Emitter } from '../Emitter';
import { Particle } from '../Particle';
import { Effect } from './Effect';

type CollisionCallback = (p1: Particle, p2: Particle) => unknown;

export class Collision extends Effect {
    public emitter: Emitter;
    public mass: boolean;
    public callback: CollisionCallback;
    public delta: Vector2D;

    /**
     * The callback after collision
     */
    public constructor(
        emitter: Emitter,
        mass?: boolean,
        callback?: CollisionCallback,
        life?: number,
        easing?: string | EaseFunction,
    ) {
        super(life, easing);

        this.emitter = emitter;
        this.mass = initValue(mass, true);
        this.callback = initValue(callback, null);

        this.delta = new Vector2D();
    }

    public initialize(particle: Particle): void {
        void particle;
    }

    /**
     * Apply this behaviour for all particles every time
     */
    public apply(particle: Particle, time: number, index: number): void {
        const newPool = this.emitter.particles.slice(index);
        const length = newPool.length;

        let otherParticle: Particle;
        let lengthSq: number;
        let overlap: number;
        let totalMass: number;
        let averageMass1: number, averageMass2: number;
        let i: number;
        for (i = 0; i < length; i++) {
            otherParticle = newPool[i];

            if (otherParticle !== particle) {
                this.delta.copy(otherParticle.position);
                this.delta.sub(particle.position);

                lengthSq = this.delta.lengthSq();
                const distance = particle.radius + otherParticle.radius;

                if (lengthSq <= distance * distance) {
                    overlap = distance - Math.sqrt(lengthSq);
                    overlap += 0.5;

                    totalMass = particle.mass + otherParticle.mass;
                    averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
                    averageMass2 = this.mass ? particle.mass / totalMass : 0.5;

                    particle.position.add(
                        this.delta
                            .clone()
                            .normalize()
                            .multiplyScalar(overlap * -averageMass1),
                    );
                    otherParticle.position.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));

                    this.callback && this.callback(particle, otherParticle);
                }
            }
        }
    }
}
