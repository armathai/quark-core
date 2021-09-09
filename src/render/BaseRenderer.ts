import { Emitter } from '../core/Emitter';
import { Particle } from '../core/Particle';

export abstract class BaseRenderer {
    public abstract resize(width: number, height: number): void;
    public abstract render(emitters: Emitter[]): void;
    public abstract createParticle(particle: Particle): void;
    public abstract destroyParticle(particle: Particle): void;
}
