/* @flow strict */

import {afterEach, beforeEach, describe, it} from 'mocha'
import {query, querySelectorAll, closest, getAttribute, namedItem} from '../index'
import assert from 'assert'
import jsdom from 'jsdom-global'

describe('typed selector queries', function() {
  let cleanup

  beforeEach(function() {
    cleanup = jsdom()

    if (!document.body) return
    document.body.innerHTML = `
      <p class="text">one</p>
      <p class="text">two</p>
      <span class="text">three</span>
      <div class="parent">
        <div class="child">four</div>
      </div>
      <form>
        <input type="text" name="url" value="/hello">
        <input type="text" name="empty" value="">
      </form>
    `
  })

  afterEach(function() {
    cleanup()
  })

  describe('query', function() {
    it('throws for failed selector match', function() {
      assert.throws(() => query(document, '.missing'))
    })

    it('throws for failed subclass filter', function() {
      assert.throws(() => query(document, '.text', HTMLButtonElement))
    })

    it('returns an element for matching subclass filter', function() {
      const el = query(document, '[name=url]', HTMLInputElement)
      assert.equal(el.value, '/hello')
    })

    it('queries an element root', function() {
      const parent = query(document, '.parent')
      const child = query(parent, '.child')
      assert.equal(child.textContent, 'four')
    })

    it('queries a document fragment root', function() {
      const fragment = document.createDocumentFragment()
      const child = document.createElement('div')
      child.classList.add('fragment')
      fragment.appendChild(child)

      const el = query(fragment, '.fragment')
      assert(el.classList.contains('fragment'))
    })
  })

  describe('querySelectorAll', function() {
    it('finds all elements matching selector', function() {
      const found = querySelectorAll(document, '.text')
      assert.equal(found.length, 3)
      assert.equal(found[0].textContent, 'one')
      assert.equal(found[1].textContent, 'two')
      assert.equal(found[2].textContent, 'three')
    })

    it('finds only elements matching subclass filter', function() {
      const found = querySelectorAll(document, '.text', HTMLParagraphElement)
      assert.equal(found.length, 2)
      assert.equal(found[0].textContent, 'one')
      assert.equal(found[1].textContent, 'two')
    })
  })

  describe('closest', function() {
    it('finds parent by selector', function() {
      const child = query(document, '.child')
      const parent = closest(child, '.parent')
      assert(parent.classList.contains('parent'))
    })

    it('throws for failed selector match', function() {
      const child = query(document, '.child')
      assert.throws(() => closest(child, '.missing'))
    })

    it('throws for selector match but type mismatch', function() {
      const child = query(document, '.child')
      assert.throws(() => closest(child, '.parent', HTMLInputElement))
    })
  })

  describe('getAttribute', function() {
    it('throws for missing attribute', function() {
      const el = query(document, '.text')
      assert.throws(() => getAttribute(el, 'missing'))
    })

    it('returns the value for attribute', function() {
      const el = query(document, '.text')
      const value = getAttribute(el, 'class')
      assert.equal(value, 'text')
    })
  })

  describe('namedItem', function() {
    it('returns element matching input name', function() {
      const form = query(document, 'form', HTMLFormElement)
      const el = namedItem(form, 'url')
      assert.equal(el.value, '/hello')
    })

    it('throws for missing input name', function() {
      const form = query(document, 'form', HTMLFormElement)
      assert.throws(() => namedItem(form, 'missing'))
    })

    it('throws for type mismatch', function() {
      const form = query(document, 'form', HTMLFormElement)
      assert.throws(() => namedItem(form, 'url', HTMLSelectElement))
    })
  })
})
