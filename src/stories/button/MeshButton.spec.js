import { mount } from '@vue/test-utils';
import { it, describe, expect } from 'vitest';
import MeshButton from './MeshButton.vue';

describe('MeshButton', () => {
  it('renders the correct text', () => {
    const label = 'Submit';
    const wrapper = mount(MeshButton, {
      props: {
        id: '1',
        name: 'button',
        label
      },
    });

    expect(wrapper.text()).toMatch(label);
  });

  it('disables the MeshButton when passed the `disabled` prop', () => {
    const wrapper = mount(MeshButton, {
      props: {
        id: '1',
        name: 'button',
        disabled: true
      },
    });
    const button = wrapper.find('.button')
    const attr = button.attributes()
    expect(Object.keys(attr).find(attr => attr === 'disabled')).toBe('disabled')
  });

  it('applies the correct classes when passed the `domclass` prop', () => {
    const wrapper = mount(MeshButton, {
      props: {
        id: '1',
        name: 'button',
        domclass: ['MeshButton--primary']
      },
    });
    const button = wrapper.find('.button')
    expect(button.classes()).toContain('button');
    expect(button.classes()).toContain('MeshButton--primary');
  });

  it('emits a "click" event when clicked', async () => {
    const wrapper = mount(MeshButton, {
      props: {
        id: '1',
        name: 'button',
      }
    });
    await wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
