<template>
  <div :class="`input input__${type} ${classes.join(' ')}`">
    <label
      v-if="$slots.label"
      :for="id"
      class="input__label"
    >
      <slot name="label" />
    </label>
    <textarea
      v-if="type === 'textarea'"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :id="id"
      :name="name"
      :type="type"
      :required="required"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      :value="textAreaValue"
    />
    <input v-else
      :autocomplete="autocomplete"
      :disabled="disabled"
      :id="id"
      :name="name"
      :type="type"
      :required="required"
      @blur="onBlur"
      @focus="onFocus"
      @input="validate({})"
      v-model="currentValue"
    />
    <p v-if="validationResult.messages.length" class="input__error">
      <slot name="error-message" />
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref, watch } from "vue";
  import shareableProps from "../shareableProps"
  import shareableEmits from "../shareableEmits"
  import { useValidation } from '../../composables/useValidation'

  const props = defineProps({
    ...shareableProps,
    secondValidationValue: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : '',
    validationResult.value.messages.length ? 'input--error' : '',
    validationResult.value.canSubmit && props.highlightValidation && currentValue.value ? 'input--validated' : ''
  ])
  const currentValue = computed({ 
    get: () => props.modelValue !== undefined ? props.modelValue : props.default, 
    set: (value) => [emit('update:modelValue', value), validate({})]
  })
  const secondValidationValue = computed(() => props.secondValidationValue)
  const textAreaValue = computed(() => currentValue.value as string)

  const { validate, validationResult } = useValidation(
    {
      currentValue: currentValue,
      fieldValidators: props.validators,
      isRequired: props.required,
      optionalSecondValidation: secondValidationValue
    },
    emit
  )

  watch(() => props.forceValidation, (newVal) => {
    if (newVal) {
      validate(newVal)
    }
  })

  onBeforeMount(() => emit('update:modelValue', currentValue.value))

  const onBlur = () => {
    focus.value = false
    validate({ validateLoose: true })
  }

  const onFocus = () => {
    focus.value = true
    validate({ clearLooseValidation: true })
  }

  const onInput = (event : any) => {
    emit('update:modelValue', event.target.value)
    validate({})
  }

</script>
<style lang="scss" scoped>
@import "../../assets/variables.scss";
.input {
  input {
    border-color: $color-grey-normal;
    border-style: solid;
    outline: none;
  }

  &__label,
  input {
    display: block;
  }

  &__label {
    margin-bottom: calc(.5 * $margin);
  }

  &--error input,
  &--error &__error {
    border-color: red;
    color: red;
  }

  &--validated input {
    border-color: green;
  }

  input {
    padding: calc(.5 * $margin) $margin;
  }
}
</style>