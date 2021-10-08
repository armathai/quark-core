import { Particle } from '../Particle';
import { Measure } from './Measure';

export class BlendMode extends Measure<number> {
    public static readonly normal = 0;
    public static readonly add = 1;
    public static readonly multiply = 2;
    public static readonly screen = 3;
    public static readonly overlay = 4;
    public static readonly darken = 5;
    public static readonly lighten = 6;
    public static readonly colorDodge = 7;
    public static readonly colorBurn = 8;
    public static readonly hardLight = 9;
    public static readonly softLight = 10;
    public static readonly difference = 11;
    public static readonly exclusion = 12;
    public static readonly hue = 13;
    public static readonly saturation = 14;
    public static readonly color = 15;
    public static readonly luminosity = 16;
    public static readonly normalNpm = 17;
    public static readonly addNpm = 18;
    public static readonly screenNpm = 19;
    public static readonly none = 20;
    public static readonly srcOver = 0;
    public static readonly srcIn = 21;
    public static readonly srcOut = 22;
    public static readonly srcAtop = 23;
    public static readonly dstOver = 24;
    public static readonly dstIn = 25;
    public static readonly dstOut = 26;
    public static readonly dstAtop = 27;
    public static readonly erase = 26;
    public static readonly subtract = 28;
    public static readonly xor = 29;

    public constructor(mode: number = BlendMode.normal) {
        super(mode);
    }

    public initialize(target: Particle): void {
        target.blendMode = this.$value;
    }
}
