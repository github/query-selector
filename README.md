# A typed querySelector function

Query the document tree by selector, filtering by element type.

## Installation

```
$ npm install @github/query-selector
```

## Usage

This library provides a set of functions to query the document tree with a
standard selector paired with an additional type filter applied to the result.

An element must match the selector as well as the type for it to be returned.

- `query(context, selector, klass)`
- `querySelectorAll(context, selector, klass)`
- `closest(element, selector, klass)`
- `namedItem(element, name, klass)`
- `getAttribute(element, name)` 

```js
import {closest, getAttribute, namedItem, query, querySelectorAll} from '@github/query-selector'

// Find an element by selector and type, or throw if not found.
const image: HTMLImageElement = query(document, '.avatar', HTMLImageElement)
image.src = '/hubot.png'

// Find the parent by selector and type, or throw if not found.
const parent: HTMLDetailsElement = closest(image, '.container', HTMLDetailsElement)
parent.open = true

// Filter all children by selector and type. 
const inputs: Array<HTMLInputElement> = querySelectorAll(document, 'input', HTMLInputElement)
for (const input of inputs) {
  input.value = ''
}

// Retrieve the attribute's value or throw.
const url: string = getAttribute(image, 'data-url')

// Find the form's `input[name=login]` field or throw if not found.
const form: HTMLFormElement = query(document, 'form', HTMLFormElement)
const input: HTMLInputElement = namedItem(form, 'login')
```

## Motivation

Finding an individual element in the document tree and operating on it can
lead to null pointer exceptions.

```js
const el = document.querySelector('.expected-element')
// el may be null!
el.classList.add('selected')
el.setAttribute('title', 'hello')
```

A safer alternative is to guard against null values with a conditional statement.

```js
const el = document.querySelector('.expected-element')
if (el) {
  el.classList.add('selected')
  el.setAttribute('title', 'hello')
}
```

Even if found, the element may be of the wrong type.

```js
const el = document.querySelector('.expected-element')
if (el) {
  // Element might not have a value property!
  el.value = 'hello'
}
```

Adding an `instanceof` test would verify the element has the properties and
methods we expect.

```js
const el = document.querySelector('.expected-element')
if (el instanceof HTMLInputElement) {
  el.value = 'hello'
}
```

Because `document.querySelector` is so frequently used in web applications,
and it's tedious to guard every element query with null checks, these tests
are most often omitted. When using [Flow][], however, these tests become
required to pass the type checker.

[Flow]: https://flow.org

The combination of null tests and subclass type refinements feels like we're
working against the type system, rather than with it. So, typed query functions
consider a missing element, or an element of the wrong type, to be failed
assertions and throw an exception to fail as early as possible.

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
