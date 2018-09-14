# A typed querySelector function for Flow

## Installation

```
$ npm install @github/query-selector
```

## Usage

```js
import {closest, getAttribute, query, querySelectorAll} from '@github/query-selector'

// Find an element by selector and type or throw if not found.
const image: HTMLImageElement = query(document, '.avatar', HTMLImageElement)
image.src = '/hubot.png'

// Find the parent by selector and type or throw if not found.
const parent: HTMLDetailsElement = closest(image, '.container', HTMLDetailsElement)
parent.open = true

// Retrieve the attribute's value or throw.
const url: string = getAttribute(image, 'data-url')

// Filter all children by selector and type.
const inputs: Array<HTMLInputElement> = querySelectorAll(document, 'input', HTMLInputElement)
for (const input of inputs) {
  input.value = ''
}
```

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
