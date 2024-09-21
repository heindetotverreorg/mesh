export const slug = {
  name: 'slug',
  validate: (input: string) => /^[a-zA-Z0-9-]*$/.test(input)
}