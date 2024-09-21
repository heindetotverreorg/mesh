<template>
    <div
      :class="[
        'm-t-1',
        'button-wrapper',
        {['click-block']: disabled}
      ]"
      @click="emit('disabledClick')"
    >
    <button
      :class="`button ${classes.join(' ')}`"
      :disabled="disabled"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import shareableProps from "../shareableProps"
  import { computed } from "vue";

  const props = defineProps({
    ...shareableProps,
    variant: {
      type: String,
      default: 'primary',
      validator: (value : string) => ['primary', 'secondary', 'tertiary'].includes(value)
    }
  })

  const emit = defineEmits([
    'disabledClick'
  ])

  const classes = computed(() => [
    ...props.domclass,
    `button--${props.variant}`
  ])

</script>

<style lang="scss" scoped>
@import "../../assets/variables.scss";
.button {
  border: 0;
  border-radius: $border-radius-md;
  cursor: pointer;
  display: inline-block;
  font-weight: $font-weight-heavy;
  padding: $margin calc(2 * $margin);
  transition: .4s ease;
  transition-property: 'background-color';

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled):not(&--tertiary) {
    filter: brightness(1.05);
  }

  &--primary {
      background-color: $color-grey-light;
  }

  &--secondary {
      background-color: $color-grey-dark;
      color: $color-white;
  }

  &--tertiary {
      background-color: transparent;

      &:hover:not(:disabled) {
        text-decoration: underline;
      }
  }
}

.button-wrapper {
  display: inline-block;
}

.click-block {
  cursor: not-allowed;

  button {
    pointer-events: none;
  }
}
</style>