
import MeshInput from '../src/stories/input/MeshInput.vue'
import MeshSelect from '../src/stories/select/MeshSelect.vue'
import { setup } from '@storybook/vue3'

setup((app) => {
  app.component('MeshInput', MeshInput);
  app.component('MeshSelect', MeshSelect);
})

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
