export class PoolMember<T> {
    public previousElement: PoolMember<T>;
    public nextElement: PoolMember<T>;
    public free: boolean;
    public theObject: T;

    public constructor(theObject: T) {
        this.theObject = theObject;
    }
}
