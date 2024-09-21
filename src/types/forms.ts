interface Content {
  (type: string, key: string): string
}

interface Form {
  meta: {
    name: string,
    sections: string[]
  },
  fields: FormField[]
}

interface FormField {
  autocomplete?: string,
  component: string,
  default?: any,
  disabled?: boolean,
  domclass?: string[],
  highlightValidation?: boolean,
  id: string,
  key: string,
  label?: string,
  name: string,
  options?: string[],
  required?: boolean,
  secondValidationValue?: string,
  section?: string,
  type: string,
  validators: Validator[],
  variant?: string,
  visible?: boolean
}

interface ValidationConfig {
  clearForm?: boolean,
  clearLooseValidation?: boolean,
  clearStrictValidation?: boolean,
  validateLoose?: boolean,
  validateStrict?: boolean,
  specificValue?: any
}

interface ValidationResult {
  field: string,
  messages?: { key: string }[],
  canSubmit?: boolean,
  showMessage?: boolean
}

interface Validator {
  name: string,
  validate: ValidatorFunction
}

interface ValidatorFunction {
  (input: any, secondInput?: any): boolean
}

export type {
  Content,
  Form,
  FormField,
  ValidationConfig,
  ValidationResult,
  Validator
}