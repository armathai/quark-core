import { randomElement } from '../../utils/index';
import { Value } from './Value';

export class MultipleValue<V> extends Value<V> {
    protected values: V[];

    public constructor(values: V[]) {
        super();
        this.values = values;
    }

    public static createValue<V>(values: V | V[]): MultipleValue<V> {
        if (!values) {
            return null;
        }

        if (values instanceof MultipleValue) {
            return values;
        }

        return new MultipleValue(Array.isArray(values) ? values : [values]);
    }

    public get(): V {
        return randomElement(this.values);
    }
}
