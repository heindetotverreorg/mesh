<template>
  <MeshForm
    :content="content"
    :name="form.meta.name"
    :force-validation="props.forceValidation"
    :formValues="formValues"
    @update:formValues="formValues = $event"
    @submit="onSubmit"
  >
    <template #fields="{ forceValidation, formValues, getSecondValdiationValue, onValidate, validationMessages }">
      <component
        v-for="field of formFields"
        :id="`${field.key}_${field.id}`"
        :is="field.component"
        class="m-t-1"
        :default="field.default"
        :force-validation="forceValidation"
        :highlight-validation="field.highlightValidation"
        :label="content('labels', field.key)"
        :name="field.key"
        :options="field.options"
        :required="field.required"
        :second-validation-value="getSecondValdiationValue(field.secondValidationValue)"
        :type="field.type"
        :validators="field.validators"
        v-model="formValues[field.key]"
        @input="emitInput ? emit('input', formValues) : false"
        @validate="onValidate(field.key, $event)"
      >
        <template #label>{{ content('labels', field.key) }}</template>
        <template #error-message>
          <p v-for="{ key } of validationMessages(field.key)">{{ content('validators', key) || content('validators', 'default') }}</p>
        </template>
      </component>
    </template>
    <template #error>{{ content('messages', 'global-validation-message') }}</template>
    <template #buttons="{ canSubmit, updateFormState }">
      <MeshButton
        v-for="button of formButtons"
        class="m-t-1"
        :id="`${button.key}_${button.id}`"
        :is="button.component"
        :disabled="!canSubmit"
        :label="content('labels', button.key)"
        :name="button.key"
        :type="button.type"
        :variant="button.variant"
        @disabledClick="updateFormState({ validateStrict: true })"
      />
    </template>
  </MeshForm>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import MeshButton from '../button/MeshButton.vue';
import MeshForm from './MeshForm.vue'
import { Content, Form, ValidationConfig } from '../../types/forms'

  const props = defineProps({
    form: {
      type: Object as PropType<Form>,
        required: true
    },
    content: {
      type: Function as PropType<Content>,
      required: true
    },
    forceValidation: {
      type: Object as PropType<ValidationConfig>,
      default: () => ({})
    },
    formValues: {
      type: Object,
      default: () => ({})
    },
    emitInput: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits([
    'input',
    'submit',
    'update:formValues',
    'update:forceValidation'
  ])

  const formValues = computed({ 
    get: () => props.formValues, 
    set: (value) => emit('update:formValues', value) 
  })
  const formButtons = computed(() => props.form.fields.filter(field => field.component === 'MeshButton'))
  const formFields = computed(() => props.form.fields.filter(field => field.component !== 'MeshButton'))

  const onSubmit = (event : Record<string, any>) => {
    emit('submit', event)
  }
</script>
<style lang="scss" scoped>
@import "../../assets/variables.scss";
.m-t-1 {
  margin-top: $margin;
}
</style>