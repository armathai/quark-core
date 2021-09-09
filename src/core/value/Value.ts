export abstract class Value<V> {
    public static getValue<V>(value: Value<V> | V): V {
        return value instanceof Value ? value.get() : value;
    }

    public abstract get(...args: unknown[]): V;
}
