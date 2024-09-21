import { mount } from '@vue/test-utils'
import { it, describe, expect } from 'vitest';
import { nonumber } from '../mocks/nonumbers';
import MeshInput from './MeshInput.vue'

describe('Input', () => {
  it('emits an "update:modelValue" event when input is changed', async () => {
    const wrapper = mount(MeshInput, {
      props: {
        id: '1',
        name: 'input',
        modelValue: 'initial value',
      },
    })
    const input = wrapper.find('input')

    await input.setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toEqual([['new value']])
  })

  it('shows validation error message when input is invalid and focus is lost', async () => {
    const wrapper = mount(MeshInput, {
      props: {
        id: '1',
        name: 'input',
        modelValue: '99',
        required: true,
        validators: [{ name: '', validate: (value) => nonumber(value) }],
      },
    })
    const input = wrapper.find('input')

    await input.trigger('blur')
    expect(wrapper.find('.input__error').exists()).toBe(true)
  })

  it('hides validation error message when input is valid and focus is lost', async () => {
    const wrapper = mount(MeshInput, {
      props: {
        id: '1',
        name: 'input',
        modelValue: 'valid value',
        required: true,
        validators: [{ name: '', validate: (value) => value.length > 0 }],
      },
    })
    const input = wrapper.find('input')

    await input.trigger('blur')
    expect(wrapper.find('.input__error').exists()).toBe(false)
  })
})
