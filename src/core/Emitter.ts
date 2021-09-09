import { Vector2D } from '../geometry/Vector2D';
import { ObjectPool } from '../pool/ObjectPool';
import { MeasureValue } from '../types';
import { Effect } from './effect/Effect';
import { EmitterRenderer } from './EmitterRenderer';
import { EulerIntegration } from './integration/EulerIntegration';
import { Integration } from './integration/Integration';
import { Measure } from './measure/Measure';
import { Particle } from './Particle';
import { Rate } from './value/Rate';

export class Emitter {
    public measures: Measure<MeasureValue>[] = [];
    public effects: Effect[] = [];

    public particles: Particle[] = [];

    public position: Vector2D = new Vector2D();
    public elapsedTime = 0;
    public duration = -1;
    public emission = 0;
    public emissionLimit = -1;
    public damping = 0.006;
    public rate: Rate = new Rate(1, 0.1);
    public paused = true;
    public dead = false;

    public renderer: EmitterRenderer;
    public pool: ObjectPool<Particle>;
    public integrator: Integration;

    public constructor(duration = Infinity, emission = Infinity) {
        this.duration = duration;
        this.emissionLimit = emission;
        this.pool = new ObjectPool<Particle>(this._particleFactory, this._resetParticle);
        this.integrator = new EulerIntegration();
        this.play();
    }

    public play(): void {
        this.paused = false;
    }

    public pause(): void {
        this.paused = true;
    }

    public prewarm(time: number, delta: number): void {
        const paused = this.paused;
        const elapsedTime = this.elapsedTime;
        const duration = this.duration;

        this.paused = false;
        this.elapsedTime = 0;
        this.duration = time;
        this.rate.reset();

        while (time > delta) {
            time -= delta;
            this.update(delta);
        }

        this.paused = paused;
        this.elapsedTime = elapsedTime + Math.max(time, 0);
        this.duration = duration;
    }

    public addMeasure(...rest: Measure<MeasureValue>[]): void {
        this.measures.push(...rest);
    }

    public removeMeasure(measure: Measure<MeasureValue>): void {
        this.measures.splice(this.measures.indexOf(measure), 1);
    }

    public addEffect(...rest: Effect[]): void {
        this.effects.push(...rest);
    }

    public removeEffect(effect: Effect): void {
        this.effects.splice(this.effects.indexOf(effect), 1);
    }

    public update(time: number): void {
        this.elapsedTime += time;
        if (this.elapsedTime >= this.duration) {
            this.destroy();
            return;
        }
        this.emission < this.emissionLimit && this.emit(time);
        this.integrate(time);
    }

    public emit(time: number): void {
        const quantity = this.rate.get(this.emission === 0 ? Infinity : time);
        if (quantity) {
            this.emission += 1;
        }
        for (let i = 0; i < quantity; ++i) {
            const particle = this.createParticle();
            this.renderer.createParticle(particle);
        }
    }

    public integrate(time: number): void {
        const reversDamping = 1 - this.damping;
        this.particles.forEach((p, i) => {
            this.integrator.calculate(p, time, reversDamping);
            p.update(time, i);
        });
        this.particles = this.particles.filter((p) => {
            if (p.dead) {
                this.renderer.destroyParticle(p);
                this.pool.releaseObject(p);
                return false;
            }
            return true;
        });
    }

    public createParticle(): Particle {
        const particle = this.pool.getObject();
        this.setupParticle(particle);
        return particle;
    }

    public setupParticle(particle: Particle): void {
        // InitializeUtil.initialize(this, particle, this.initializes);
        this.measures.forEach((i) => i.initialize(particle));
        particle.position.add(this.position);
        particle.addEffects(this.effects);
        particle.parent = this;

        this.particles.push(particle);
    }

    public destroy(): void {
        this.pause();
        this.particles.forEach((p) => p.destroy());
        this.particles.length = 0;
        this.measures.length = 0;
        this.effects.length = 0;
        this.dead = true;
    }

    private _resetParticle = (particle: Particle): Particle => {
        particle.reset();
        return particle;
    };

    private _particleFactory = (): Particle => {
        return new Particle();
    };
}
