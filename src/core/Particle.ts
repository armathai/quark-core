import { rad2deg } from '../constants/index';
import { Vector2D } from '../geometry/Vector2D';
import { deleteProperties } from '../utils/index';
import { Effect } from './effect/Effect';

type ParticleColor = { r: number; g: number; b: number };

type ParticleEffect = { color: ParticleColor; alpha: number; scale: number; rotation: number };

type ParticleAuxiliaryEffect = {
    colorA?: ParticleColor;
    colorB?: ParticleColor;
    alphaA?: number;
    alphaB?: number;
    scaleA?: number;
    scaleB?: number;
    rotationA?: number;
    rotationB?: number;
    randomDriftTime?: number;
    cangle?: number;
    cyclone?: Vector2D;
};

export class Particle {
    private static readonly _defaultEffectColor = 255;
    private static readonly _defaultEffectAlpha = 1;
    private static readonly _defaultEffectScale = 1;
    private static readonly _defaultEffectRotation = 0;

    private static readonly _defaultLife = Infinity;
    private static readonly _defaultAge = 0;
    private static readonly _defaultAppearance = null;
    private static readonly _defaultParent = null;
    private static readonly _defaultEnergy = 1;
    private static readonly _defaultMass = 1;
    private static readonly _defaultRadius = 10;
    private static readonly _defaultPreviousRadius = 10;
    private static readonly _defaultDead = false;
    private static readonly _defaultSleep = false;

    public effect: ParticleEffect = {
        color: { r: Particle._defaultEffectColor, g: Particle._defaultEffectColor, b: Particle._defaultEffectColor },
        alpha: Particle._defaultEffectAlpha,
        scale: Particle._defaultEffectScale,
        rotation: Particle._defaultEffectRotation,
    };

    public auxiliaryEffect: ParticleAuxiliaryEffect = {};

    public effects: Effect[] = [];

    public life = Particle._defaultLife;
    public age = Particle._defaultAge;
    public appearance = Particle._defaultAppearance;
    public parent = Particle._defaultParent;
    public energy = Particle._defaultEnergy;
    public mass = Particle._defaultMass;
    public radius = Particle._defaultRadius;
    public dead = Particle._defaultDead;
    public sleep = Particle._defaultSleep;

    public position: Vector2D = new Vector2D();
    public velocity: Vector2D = new Vector2D();
    public acceleration: Vector2D = new Vector2D();

    public previousPosition: Vector2D = new Vector2D();
    public previousVelocity: Vector2D = new Vector2D();
    public previousAcceleration: Vector2D = new Vector2D();

    public getDirection(): number {
        return Math.atan2(this.velocity.x, -this.velocity.y) * rad2deg;
    }

    public reset(): this {
        this.effect.color.r = Particle._defaultEffectColor;
        this.effect.color.g = Particle._defaultEffectColor;
        this.effect.color.b = Particle._defaultEffectColor;
        this.effect.alpha = Particle._defaultEffectAlpha;
        this.effect.scale = Particle._defaultEffectScale;
        this.effect.rotation = Particle._defaultEffectRotation;

        deleteProperties(this.auxiliaryEffect);

        this.effects.length = 0;

        this.life = Particle._defaultLife;
        this.age = Particle._defaultAge;
        this.appearance = Particle._defaultAppearance;
        this.parent = Particle._defaultParent;
        this.energy = Particle._defaultEnergy;
        this.mass = Particle._defaultMass;
        this.radius = Particle._defaultRadius;
        this.dead = Particle._defaultDead;
        this.sleep = Particle._defaultSleep;

        this.position.set(0, 0);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);

        this.previousPosition.set(0, 0);
        this.previousVelocity.set(0, 0);
        this.previousAcceleration.set(0, 0);

        this.removeAllEffects();

        return this;
    }

    public update(time: number, index: number): void {
        if (!this.sleep) {
            this.age += time;
            this.applyEffects(time, index);
        }

        if (this.age < this.life) {
            const ratio = this.age / this.life;
            this.energy = Math.max(1 - ratio, 0);
        } else {
            this.destroy();
        }
    }

    public applyEffects(time: number, index: number): void {
        this.effects.forEach((e) => e.apply(this, time, index));
    }

    public addEffect(effect: Effect): void {
        effect.initialize(this);
        this.effects.push(effect);
    }

    public addEffects(effects: Effect[]): void {
        effects.forEach((e) => this.addEffect(e));
    }

    public removeEffect(behaviour: Effect): void {
        const index = this.effects.indexOf(behaviour);
        if (index !== -1) {
            this.effects.splice(index, 1);
        }
    }

    public removeAllEffects(): void {
        this.effects.length = 0;
    }

    public destroy(): void {
        this.removeAllEffects();
        this.energy = 0;
        this.dead = true;
        this.parent = null;
    }
}
