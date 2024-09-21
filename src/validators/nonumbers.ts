export const nonumber = {
  name: 'nonumber',
  validate: (input: string) => !!/[^0-9]/g.test(input)
}