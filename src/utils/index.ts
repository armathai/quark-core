import { Value } from '../core/value/Value';
import { Vector2D } from '../geometry/Vector2D';

export const randomBetween = (min: number, max: number): number => Math.random() * (max - min) + min;

export const randomIntBetweenInclusive = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const randomFocused = (center: number, f: number): number => {
    return randomBetween(center - f, center + f);
};

export const randomIntFocusedInclusive = (center: number, f: number): number => {
    return randomIntBetweenInclusive(center - f, center + f);
};

export const randomHexColor = (): string => `#${randomColor().toString(16)}`;

export const randomColor = (): number => Math.floor(Math.random() * 16777215);

export const toColor16 = (color: number): string => `#${color.toString(16)}`;

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};

export const numberToRgb = (color: number): { r: number; g: number; b: number } => {
    return {
        r: (color >> 16) & 0xff,
        g: (color >> 8) & 0xff,
        b: color & 0xff,
    };
};

export const rgbToNumber = ({ r, g, b }: { r: number; g: number; b: number }): number => {
    return (r << 16) + (g << 8) + b;
};

export const isNullOrUndefined = (obj: unknown): boolean => {
    return obj === undefined || obj === null;
};

export const initValue = <T>(value: T, defaults: T): T => {
    return isNullOrUndefined(value) ? defaults : value;
};

export const assignProperties = <P>(
    target: Partial<Record<Extract<keyof P, string>, unknown>>,
    props: P,
): typeof target => {
    for (const prop in props) {
        if (Object.prototype.hasOwnProperty.call(target, prop)) {
            target[prop] = Value.getValue(props[prop]);
        }
    }
    return target;
};

export const instantiate = <T>(clazz: new (...args: unknown[]) => T, props: unknown[] = []): T => {
    const instance = new clazz(...props);
    return instance;
};

export const deleteProperties = <T>(target: T, exclude: string[] = []): T => {
    for (const prop in target) {
        if (Object.prototype.hasOwnProperty.call(target, prop) && !exclude.includes(prop)) {
            delete target[prop];
        }
    }
    return target;
};

export const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const asArray = <T>(arr: T | T[]): T[] => (Array.isArray(arr) ? arr : [arr]);

export const emptyArray = <T>(arr: T[]): void => {
    arr.length = 0;
};

export const normalizeVector = (force: Vector2D): Vector2D => force.multiplyScalar(100);

export const normalizeValue = (value: number): number => value * 100;
