import { Emitter } from '../Emitter';
import { Particle } from '../Particle';

export interface Integration {
    calculate(particles: Particle | Emitter, time: number, damping: number): void;
}
