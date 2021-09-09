import { Particle } from './Particle';

export interface EmitterRenderer {
    destroyParticle(particle: Particle): void;
    createParticle(particle: Particle): void;
}
