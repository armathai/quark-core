import { PoolMember } from './PoolMember';

const INCREASE_PERCENT = 50;
const MINIMUM_PERCENT_FREE = 10;

export class ObjectPool<T> {
    private _poolArray: PoolMember<T>[] = [];
    private _freeElements = 0;
    private _totalElements = 0;
    private _nextFree: PoolMember<T>;
    private _lastFree: PoolMember<T>;

    private _resetFunction: (obj: T) => T;

    private _constructorFunction: () => T;

    public constructor(constructorFunction: () => T, resetFunction: (obj: T) => T, initialSize = 1000) {
        this._constructorFunction = constructorFunction;
        this._resetFunction = resetFunction;
        for (let i = 0; i < initialSize; i++) {
            this._createElement();
        }
        this._nextFree = this._poolArray[0];
    }

    public get freeElements(): number {
        return this._freeElements;
    }

    public get totalElements(): number {
        return this._totalElements;
    }

    public getObject(): T {
        const availableElement = this._nextFree;
        this._unlinkFirstElement(availableElement);
        this._catchElement(availableElement);
        return availableElement.theObject;
    }

    public releaseObject(obj: T): void {
        const element = this._poolArray.find((element) => element.theObject === obj);
        this._setElementAsFree(element);
        this._resetFunction(element.theObject);
    }

    public destroy(): void {
        this._poolArray.length = 0;
        this._poolArray = null;
        this._nextFree = null;
        this._lastFree = null;
        this._resetFunction = null;
        this._constructorFunction = null;
    }

    private _createElement(): PoolMember<T> {
        this._freeElements++;
        this._totalElements++;
        const data = this._resetFunction(this._constructorFunction());
        const newObjectPoolMember = new PoolMember(data);
        this._poolArray.push(newObjectPoolMember);
        if (!this._lastFree) {
            this._lastFree = newObjectPoolMember;
        } else {
            this._linkElement(newObjectPoolMember);
        }
        return newObjectPoolMember;
    }

    private _linkElement(element: PoolMember<T>): void {
        element.previousElement = this._lastFree;
        this._lastFree.nextElement = element;
        this._lastFree = element;
    }

    private _unlinkFirstElement(element: PoolMember<T>): void {
        this._nextFree = element.nextElement;
        this._nextFree.previousElement = null;
        element.nextElement = null;
    }

    private _catchElement(element: PoolMember<T>): void {
        element.free = false;
        this._freeElements--;
        if (this._freeElements / this._poolArray.length < MINIMUM_PERCENT_FREE / 100) {
            const increaseSize = Math.round((INCREASE_PERCENT * this._poolArray.length) / 100);
            for (let i = 0; i < increaseSize; i++) {
                this._createElement();
            }
        }
    }

    private _setElementAsFree(element: PoolMember<T>): void {
        element.free = true;
        this._linkElement(element);
        this._freeElements++;
    }
}
