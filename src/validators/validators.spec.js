import { describe, it, expect } from "vitest"
import {
  nonumber,
  email,
  notempty,
  specialchar,
  minlength,
  issamevalue,
  slug
} from '../validators/index'

describe('validators: utils/validators', () => {
  it('should validate nonumber', () => {
    expect(nonumber.validate('11')).toBe(false)
    expect(nonumber.validate('foo')).toBe(true)
  })

  it('should validate email', () => {
    expect(email.validate('11')).toBe(false)
    expect(email.validate('foo@bar.test')).toBe(true)
  })

  it('should validate notempty', () => {
    expect(notempty.validate([])).toBe(false)
    expect(notempty.validate({})).toBe(false)
    expect(notempty.validate('')).toBe(false)
    expect(notempty.validate(['foo', 'bar'])).toBe(true)
    expect(notempty.validate({ foo: 'bar' })).toBe(true)
    expect(notempty.validate('bar')).toBe(true)
    expect(notempty.validate(0)).toBe(true)
    expect(notempty.validate(1)).toBe(true)
  })

  it('should validate specialchar', () => {
    expect(specialchar.validate('foo')).toBe(false)
    expect(specialchar.validate('b@r')).toBe(true)
  })
  
  it('should validate minlength', () => {
    expect(minlength.validate('foo')).toBe(false)
    expect(minlength.validate('foobarfoo')).toBe(true)
  })

  it('should validate issamevalue', () => {
    expect(issamevalue.validate('foo', 'bar')).toBe(false)
    expect(issamevalue.validate('foo', 'foo')).toBe(true)
  })

  it('should validate slug', () => {
    expect(slug.validate('foobar')).toBe(false)
    expect(slug.validate('/foobar')).toBe(true)
  })
})