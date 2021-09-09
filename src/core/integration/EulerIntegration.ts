import { Particle } from '../Particle';
import { Integration } from './Integration';

export class EulerIntegration implements Integration {
    // Euler Integrate
    // https://rosettacode.org/wiki/Euler_method
    public calculate(particle: Particle, time: number, damping: number): void {
        if (particle.sleep) {
            return;
        }
        const { previousPosition, previousVelocity, position, velocity, mass, acceleration } = particle;

        previousPosition.copy(position);
        previousVelocity.copy(velocity);

        acceleration.multiplyScalar(1 / mass);
        velocity.add(acceleration.multiplyScalar(time));
        position.add(previousVelocity.multiplyScalar(time));

        if (damping) {
            velocity.multiplyScalar(damping);
        }

        acceleration.clear();
    }
}
