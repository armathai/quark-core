import { halfPI } from '../constants/index';

export type EaseFunction = (value: number) => number;

export type EaseFunctionName =
    | 'easeLinear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeInQuart'
    | 'easeOutQuart'
    | 'easeInOutQuart'
    | 'easeInQuint'
    | 'easeOutQuint'
    | 'easeInOutQuint'
    | 'easeInSine'
    | 'easeOutSine'
    | 'easeInOutSine'
    | 'easeInExpo'
    | 'easeOutExpo'
    | 'easeInOutExpo'
    | 'easeInCirc'
    | 'easeOutCirc'
    | 'easeInOutCirc'
    | 'easeInBack'
    | 'easeOutBack'
    | 'easeInOutBack';

export const easeLinear: EaseFunction = (value: number): number => value;

export const easeInQuad: EaseFunction = (value: number): number => Math.pow(value, 2);

export const easeOutQuad: EaseFunction = (value: number): number => -(Math.pow(value - 1, 2) - 1);

export const easeInOutQuad: EaseFunction = (value: number): number =>
    value < 0.5 ? Math.pow(value * 2, 2) / 2 : (1 - Math.pow(1 - (value * 2 - 1), 2)) / 2 + 0.5;

export const easeInCubic: EaseFunction = (value: number): number => Math.pow(value, 3);

export const easeOutCubic: EaseFunction = (value: number): number => 1 - Math.pow(1 - value, 3);

export const easeInOutCubic: EaseFunction = (value: number): number =>
    value < 0.5 ? Math.pow(value * 2, 3) / 2 : (1 - Math.pow(1 - (value * 2 - 1), 3)) / 2 + 0.5;

export const easeInQuart: EaseFunction = (value: number): number => Math.pow(value, 4);

export const easeOutQuart: EaseFunction = (value: number): number => 1 - Math.pow(1 - value, 4);

export const easeInOutQuart: EaseFunction = (value: number): number =>
    value < 0.5 ? Math.pow(value * 2, 4) / 2 : (1 - Math.pow(1 - (value * 2 - 1), 4)) / 2 + 0.5;

export const easeInQuint: EaseFunction = (value: number): number => Math.pow(value, 5);

export const easeOutQuint: EaseFunction = (value: number): number => 1 - Math.pow(1 - value, 5);

export const easeInOutQuint: EaseFunction = (value: number): number =>
    value < 0.5 ? Math.pow(value * 2, 5) / 2 : (1 - Math.pow(1 - (value * 2 - 1), 5)) / 2 + 0.5;

export const easeInSine: EaseFunction = (value: number): number => -Math.cos(value * halfPI) + 1;

export const easeOutSine: EaseFunction = (value: number): number => Math.sin(value * halfPI);

export const easeInOutSine: EaseFunction = (value: number): number => -0.5 * (Math.cos(Math.PI * value) - 1);

export const easeInExpo: EaseFunction = (value: number): number => (value === 0 ? 0 : Math.pow(2, 10 * (value - 1)));

export const easeOutExpo: EaseFunction = (value: number): number => (value === 1 ? 1 : -Math.pow(2, -10 * value) + 1);

export const easeInOutExpo: EaseFunction = (value: number): number => {
    if (value === 0) return 0;

    if (value === 1) return 1;

    if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));

    return 0.5 * (-Math.pow(2, -10 * --value) + 2);
};

export const easeInCirc: EaseFunction = (value: number): number => -(Math.sqrt(1 - value * value) - 1);

export const easeOutCirc: EaseFunction = (value: number): number => Math.sqrt(1 - Math.pow(value - 1, 2));

export const easeInOutCirc: EaseFunction = (value: number): number => {
    if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);
    return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
};

export const easeInBack: EaseFunction = (value: number): number => {
    const s = 1.70158;
    return value * value * ((s + 1) * value - s);
};

export const easeOutBack: EaseFunction = (value: number): number => {
    const s = 1.70158;
    return (value = value - 1) * value * ((s + 1) * value + s) + 1;
};

export const easeInOutBack: EaseFunction = (value: number): number => {
    let s = 1.70158;
    if ((value /= 0.5) < 1) return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));
    return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
};

const functionNameToFunction = {
    easeLinear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    easeInBack,
    easeOutBack,
    easeInOutBack,
};

export const getEasing = (ease: EaseFunction | string): EaseFunction => {
    if (typeof ease === 'function') {
        return ease;
    }
    return functionNameToFunction[ease] || easeLinear;
};
