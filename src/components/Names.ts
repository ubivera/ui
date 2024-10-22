export default class Names {
    private _name: string;
    private static registry: Map<string, HTMLElement> = new Map();

    constructor(name: string, element: HTMLElement) {
        this._name = name;
        Names.registry.set(name, element);
    }

    public getName(): string {
        return this._name;
    }

    public setName(name: string, element: HTMLElement): void {
        Names.registry.delete(this._name);
        this._name = name;
        Names.registry.set(name, element);
    }

    public static getByName<T extends HTMLElement>(name: string): T | null {
        return Names.registry.get(name) as T | null;
    }

    public isNamed(name: string): boolean {
        return this._name === name;
    }

    public static removeByName(name: string): void {
        Names.registry.delete(name);
    }
}