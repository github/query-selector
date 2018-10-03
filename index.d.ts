export type Queryable = Document | DocumentFragment | Element;

export function closest<T extends Element = HTMLElement>(context: Queryable, selectors: string, klass?: any): T;

export function query<T extends Element = HTMLElement>(context: Queryable, selectors: string, klass?: any): T;

export function querySelectorAll<T extends Element = HTMLElement>(context: Queryable, selectors: string, klass?: any): Array<T>;

export function namedItem<T extends HTMLFormElement = HTMLFormElement>(form: T, itemName: string, klass?: any): RadioNodeList | Element;

export function getAttribute(element: Element, attributeName: string): string;
