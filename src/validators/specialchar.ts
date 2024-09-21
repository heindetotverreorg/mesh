export const specialchar = {
  name: 'specialchar',
  validate: (input: string) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    return regex.test(input);
  }
}