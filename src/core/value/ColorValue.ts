import { randomColor, randomElement } from '../../utils/index';
import { MultipleValue } from './MultipleValue';

export class ColorValue extends MultipleValue<number> {
    public static readonly random = -1;

    public constructor(values: number[] | number) {
        super(Array.isArray(values) ? values : [values]);
    }

    public static createColorValue(values: number[] | number | ColorValue): ColorValue {
        if (!values) {
            return null;
        }

        if (values instanceof ColorValue) {
            return values;
        }

        return new ColorValue(Array.isArray(values) ? values : [values]);
    }

    public get(): number {
        const value = randomElement(this.values);
        return value === -1 ? randomColor() : value;
    }
}
