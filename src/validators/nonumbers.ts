export const nonumber = {
  name: 'nonumber',
  validate: (input: string) => !!/^([^0-9]*)$/.test(input)
}