import { ref } from 'vue'
import FormWrapper from './MeshFormWrapper.vue'
import formMock from '../mocks/forms.json'
import contentMock from '../mocks/content.json'
import { email } from '../../validators/email'
import { nonumber } from '../../validators/nonumbers'
import { issamevalue } from '../../validators/issamevalue'
import { slug } from '../../validators/slug'

const content = (type, key) => contentMock[type]?.[key]

const getForm = (formKey, errorState) => {
  const form = formMock.forms[formKey]
  form.fields.forEach(field => {
    if (errorState) {
      if (field.key === 'email') {
        field.validators = [email, nonumber]
      }
      if (field.key === 'password') {
        field.validators = [nonumber]
      }
      if (field.key === 'passwordCheck') {
        field.validators = [issamevalue, nonumber]
      }
      if (field.key === 'firstName' || field.key === 'lastName') {
        field.validators = [nonumber]
      }
      if (field.key === 'checkBox') {
        field.validators = [{ name: 'checkbox', validate: () => true }]
      }
      if (field.key === 'slug') {
        field.validators = [slug]
      }
      if (field.key === 'select') {
        field.validators = [{ name: 'select', validate: () => true }]
      }
    }
  })
  return form
}

export default {
  title: 'Components/Form',
  component: FormWrapper,
  argTypes: {},
};

const Template = (args) => ({
  components: { FormWrapper },
  setup () {
    const formValues = ref(args.formValues)
    const forceValidation = ref({})

    const onSubmit = (payload) => {
      formValues.value = payload.formValues
      formValues.value.email = ''
    }

    const clearForm = () => {
      formValues.value = {}
    }

    const clearValidation = () => {
      forceValidation.value = { clearStrictValidation: true }
    }

    const onInput = (payload) => {
      console.log('Form: onInput: ', payload)
    }

    return { args, onSubmit, formValues, clearForm, clearValidation, forceValidation, onInput }
  },
  template:`
    <FormWrapper
      :content="args.content"
      :force-validation="forceValidation"
      :form="args.form"
      :formValues="formValues"
      :emit-input="true"
      @input="onInput"
      @submit="onSubmit"
    />
    <button @click="clearForm">clear form</button>
    <button @click="clearValidation">clear validation</button>`
});

export const Initial = Template.bind({});
Initial.args = {
  form: getForm('initial', true),
  content: content
};

export const Error = Template.bind({});
Error.args = {
  form: getForm('error', true),
  content: content,
  formValues: {
    email: '12345'
  }
};

export const PreFilledFromData = Template.bind({});
PreFilledFromData.args = {
  form: getForm('prefilled', true),
  content: content
};

export const PasswordCheck = Template.bind({});
PasswordCheck.args = {
  form: getForm('passwordCheck', true),
  content: content,
  formValues: {
    email: 'test@test.nl'
  }
};

export const CheckBox = Template.bind({});
CheckBox.args = {
  form: getForm('checkBox', true),
  content: content
};

export const Select = Template.bind({});
Select.args = {
  form: getForm('select', true),
  content: content
};

export const Textarea = Template.bind({});
Textarea.args = {
  form: getForm('textarea', true),
  content: content
};