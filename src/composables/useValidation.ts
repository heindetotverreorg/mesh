import { ref, Ref, onMounted } from "vue"
import { ValidationConfig, Validator } from "@/main"

export const useValidation = (
  config: {
    currentValue : Ref,
    fieldValidators : Validator[],
    isRequired: boolean,
    optionalSecondValidation? : Ref
  },
  emit : Function
) => {
  const { currentValue, fieldValidators, isRequired, optionalSecondValidation } = config

  onMounted(() => {
    validate({ validateLoose: true })
  })
  
  const getValidationResults = ({ validateStrict, validateLoose, specificValue } : ValidationConfig) : { key : string }[] => {
    const test = fieldValidators.reduce((acc : { key : string }[], curr) => {
      const meta = {
        key: curr.name
      }
      if (specificValue) {
        if (!curr.validate(specificValue, optionalSecondValidation?.value)) {
          return [...acc, meta]
        }
      }
      if (validateStrict && !curr.validate(currentValue.value, optionalSecondValidation?.value)) {
        return [...acc, meta]
      }
      if (validateLoose && !!(currentValue.value && !curr.validate(currentValue.value, optionalSecondValidation?.value))) {
        return [...acc, meta]
      }
      return acc
    }, [])
    return test
  }

  const isValid = async ({ specificValue } : any | undefined={}) => {
    if (specificValue) {
      return !getValidationResults({ specificValue }).length
    }
    if (isRequired) {
      return currentValue.value && !getValidationResults({ validateStrict: true }).length
    }
    return (!getValidationResults({ validateStrict: true }).length)
  }

  const validate = async ({ clearLooseValidation, clearStrictValidation, validateLoose, validateStrict, specificValue } : ValidationConfig) => {
    if (specificValue) {
      validationResult.value.messages = getValidationResults({ specificValue })
      validationResult.value.canSubmit = await isValid({ specificValue })
      emit('validate', validationResult.value)
      return
    }
    if (clearStrictValidation) {
        validationResult.value.messages = []
        validationResult.value.canSubmit = false;
        return
    }
    if (clearLooseValidation) {
      validationResult.value.messages = []
    }
    if (validateStrict) {
      validationResult.value.messages = getValidationResults({ validateStrict })
    }
    if (validateLoose) {
      validationResult.value.messages = getValidationResults({ validateLoose })
    }
    validationResult.value.canSubmit = await isValid()
    emit('validate', validationResult.value)
  }

  const validationResult = ref<{messages: { key : string }[], canSubmit: boolean}>({messages: [], canSubmit: false})

  return {
    validate,
    validationResult
  }
}