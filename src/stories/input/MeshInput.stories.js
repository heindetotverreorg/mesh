import MeshInput from './MeshInput.vue'
import { ref } from 'vue'

export default {
  title: 'Components/Input',
  component: MeshInput,
  argTypes: {
    type: {
      type: { name: 'string', required: false },
      control: { type: 'select' },
      options: ['text','checkbox']
    },
    disabled: {
      type: { name: 'boolean', required: false },
      control: { type: 'boolean' }
    }
  }
}

const Template = (args) => ({
  components: { MeshInput },
  setup() {
    const inputValue = ref('')
    const updateModel = (event) => inputValue.value = event
    const error = 'This is a error message'

    return { args, inputValue, updateModel, error }
  },
  template: `
  <MeshInput
    v-bind="args"
    :modelValue="inputValue"
    @update:modelValue="updateModel"
  >
    <template #label>
      {{ args.label }}
    </template>
    <template #error-message>
      {{ error }}
    </template>
  </MeshInput>
  <p>input value: {{ inputValue }}</p>`
})

export const Text = Template.bind({})
Text.args = {
  id: 'id',
  type: 'text',
  label: 'This is a text input',
  name: 'text',
  validationResult: true
}

export const Textarea = Template.bind({})
Textarea.args = {
  id: 'id',
  type: 'textarea',
  label: 'This is a textarea input',
  name: 'textarea',
  validationResult: true
}

export const Checkbox = Template.bind({})
Checkbox.args = {
  id: 'id',
  type: 'checkbox',
  label: 'This is a checkbox input',
  name: 'check',
  validationResult: true
}