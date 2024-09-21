import MeshButton from './MeshButton.vue';

export default {
  title: 'Components/Button',
  component: MeshButton,
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    variant: {
      control: { type: 'select' },
      options: ['primary','secondary', 'tertiary']
    },
  },
};

const Template = (args) => ({
  components: { MeshButton },
  setup() {
    return { args };
  },
  template: '<MeshButton v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  label: 'Button',
  id: 'id',
  name: 'button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  disabled: false,
  label: 'Button',
  id: 'id',
  name: 'button',
  variant: 'secondary'
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  disabled: false,
  label: 'Button',
  id: 'id',
  name: 'button',
  variant: 'tertiary'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Button',
  id: 'id',
  name: 'button'
};