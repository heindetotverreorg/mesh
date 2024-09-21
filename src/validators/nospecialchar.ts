export const nospecialchar = {
  name: 'nospecialchar',
  validate: (input: string) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    return !regex.test(input);
  }
}