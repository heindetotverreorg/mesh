import MeshSelect from './MeshSelect.vue'
import { ref } from 'vue'

export default {
  title: 'Components/Select',
  component: MeshSelect,
  argTypes: {}
}

const Template = (args) => ({
  components: { MeshSelect },
  setup() {
    const inputValue = ref('')
    const updateModel = (event) => inputValue.value = event
    const error = 'This is a error message'

    return { args, inputValue, updateModel, error }
  },
  template: `
  <MeshSelect
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
  </MeshSelect>
  <p>select value: {{ inputValue }}</p>`
})

export const Native = Template.bind({})
Native.args = {
  id: 'id',
  type: 'text',
  label: 'This is a select',
  name: 'text',
  options: [
    'one',
    'two',
    'three'
  ],
  validationResult: true
}