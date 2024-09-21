import type { App } from 'vue';
import MeshButton from './stories/button/MeshButton.vue';
import MeshInput from './stories/input/MeshInput.vue';
import MeshSelect from './stories/select/MeshSelect.vue';
import MeshFormWrapper from './stories/form/MeshFormWrapper.vue';
import MeshForm from './stories/form/MeshForm.vue';
import shareableProps from './stories/shareableProps';
import {
  Content,
  Form,
  FormField,
  ValidationConfig,
  ValidationResult,
  Validator
} from './types/forms';
import { useValidation } from './composables/useValidation';

export default {
  install: (app: App) => {
    app.component('MeshButton', MeshButton);
    app.component('MeshInput', MeshInput);
    app.component('MeshForm', MeshForm);
    app.component('MeshSelect', MeshSelect);
    app.component('MeshFormWrapper', MeshFormWrapper);
  }
};
export { MeshButton, MeshInput, MeshSelect, MeshForm, MeshFormWrapper, useValidation, shareableProps };
export * as validators from './validators/index';
export type { 
  Content,
  Form,
  FormField,
  ValidationConfig,
  ValidationResult,
  Validator
}