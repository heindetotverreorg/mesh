<template>
  <div :class="`select ${classes.join(' ')}`">
    <label
      v-if="$slots.label"
      :for="id"
      class="select__label"
    >
      <slot name="label" />
    </label>
    <select
      v-if="native"
      :name="props.name"
      :id="props.id"
      v-model="currentValue"
    >
      <option
        value=""
      >
        {{ props.label }}
      </option>
      <option
        v-for="option, index of options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <div v-else>
      non native select
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import shareableProps from "../shareableProps"
import shareableEmits from "../shareableEmits"
import { useValidation } from '../../composables/useValidation'

  const props = defineProps({
    ...shareableProps,
    native: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    }
  })
  const emit = defineEmits(shareableEmits)

  const focus = ref(false)

  const classes = computed(() => [
    ...props.domclass,
    focus.value ? 'input--focus' : '',
  ])
  const currentValue = computed({ 
    get: () => props.modelValue, 
    set: (value) => onInput(value)
  })

  const { validate } = useValidation(
    {
      currentValue: currentValue,
      fieldValidators: props.validators,
      isRequired: props.required
    },
    emit
  )

  const onInput = (value : any) => {
    emit('update:modelValue', value)
    validate({ specificValue: value })
  }


</script>
<style scoped lang="scss">
@import "../../assets/variables.scss";
.select {
  &__label {
    display: block;
    margin-bottom: calc(.5 * $margin);
  }
}

select {
  border-color: $color-grey-normal;
  border-style: solid;
  border-width: 2px;
  display: block;
  outline: none;
  padding: calc(.5 * $margin) $margin;
}
</style>