export type Queryable = Document | DocumentFragment | Element;

export function closest<T extends Element = HTMLElement>(context: Queryable, selectors: string, klass?: new() => T): T;

export function query<T extends Element = HTMLElement>(context: Queryable, selectors: string, klass?: new() => T): T;

export function querySelectorAll<T extends Element = HTMLElement>(context: Queryable, selectors: string, klass?: new() => T): Array<T>;

export function namedItem<T extends Element | RadioNodeList = HTMLInputElement>(form: HTMLFormElement, itemName: string, klass?: new() => T): T;

export function getAttribute(element: Element, attributeName: string): string;
