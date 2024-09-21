import { mount } from '@vue/test-utils';
import { it, describe, expect } from 'vitest';
import MeshFormWrapper from './MeshFormWrapper.vue';
import MeshInput from '../input/MeshInput.vue'

describe('MeshForm', () => {
  it('renders all form fields and buttons', () => {
    const form = {
      meta: { name: 'test form' },
      fields: [
        { key: 'field1', component: 'MeshInput', type: 'text' },
        { key: 'field2', component: 'MeshInput', type: 'email' },
        { key: 'button1', component: 'MeshButton', type: 'button' },
        { key: 'button2', component: 'MeshButton', type: 'submit' },
      ],
    };

    const wrapper = mount(MeshFormWrapper, {
      props: {
        form,
        content: () => {}
      },
    });

    expect(wrapper.vm.formFields.length).toBe(2);
    expect(wrapper.vm.formButtons.length).toBe(2);
  });

  it('emits submit event with form data when submit button is clicked', async () => {
    const form = {
      meta: { name: 'test form' },
      fields: [
        { key: 'field1', component: 'MeshInput', type: 'text' },
        { key: 'button1', component: 'MeshButton', type: 'submit' },
      ],
    };

    const wrapper = mount(MeshFormWrapper, {
      props: {
        form,
        content: () => {},
        formValues: {
          field1: 'test value'
        }
      },
    });

    const inputField = wrapper.findComponent(MeshInput);
    const submitButton = wrapper.findComponent({ name: 'MeshButton' });

    await inputField.vm.$emit('validate', { showMessage: false, canSubmit: true });
    await submitButton.trigger('submit');

    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0][0].formName).toBe('test form');
    expect(wrapper.emitted('submit')[0][0].formValues).toEqual({ field1: 'test value' });
  });

  it('validates form fields and enables/disables submit button based on validation', async () => {
    const form = {
      meta: { name: 'test form' },
      fields: [
        { key: 'field1', component: 'MeshInput', type: 'text', required: true },
        { key: 'button1', component: 'MeshButton', type: 'submit' },
      ],
    };

    const wrapper = mount(MeshFormWrapper, {
      props: {
        form,
        content: () => {}
      },
    });

    const submitButton = wrapper.findComponent({ name: 'MeshButton' });
    const inputField = wrapper.findComponent({ name: 'MeshInput' });

    expect(submitButton.props('disabled')).toBe(true);

    await inputField.vm.$emit('validate', { showMessage: false, canSubmit: true });
    expect(submitButton.props('disabled')).toBe(false);
  });
});
