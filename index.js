/* @flow strict */

type Queryable = Document | DocumentFragment | Element

class InvariantError extends Error {
  framesToPop: number

  constructor(message) {
    super(message)
    this.name = 'Invariant Violation'
    this.framesToPop = 1
  }
}

export function closest<T: Element>(element: Element, selectors: string, type: Class<T>): T {
  const klass = type || HTMLElement
  const el = element.closest(selectors)
  if (el instanceof klass) {
    return el
  }
  throw new InvariantError(`Element not found: <${klass.name}> ${selectors}`)
}

export function query<T: Element>(context: Queryable, selectors: string, type: Class<T>): T {
  const klass = type || HTMLElement
  const el = context.querySelector(selectors)
  if (el instanceof klass) {
    return el
  }
  throw new InvariantError(`Element not found: <${klass.name}> ${selectors}`)
}

export function querySelectorAll<T: Element>(context: Queryable, selectors: string, type: Class<T>): Array<T> {
  const klass = type || HTMLElement
  const els: Array<T> = []
  for (const el of context.querySelectorAll(selectors)) {
    if (el instanceof klass) {
      els.push(el)
    }
  }
  return els
}

export function namedItem<T: HTMLElement>(form: HTMLFormElement, itemName: string, type: Class<T>): T {
  const klass = type || HTMLInputElement
  const el = form.elements.namedItem(itemName)
  if (el instanceof klass) {
    return el
  }
  throw new InvariantError(`Element not found by name: <${klass.name}> ${itemName}`)
}

export function getAttribute(element: Element, attributeName: string): string {
  const attribute = element.getAttribute(attributeName)
  if (attribute != null) {
    return attribute
  }
  throw new InvariantError(`Attribute not found on element: ${attributeName}`)
}
