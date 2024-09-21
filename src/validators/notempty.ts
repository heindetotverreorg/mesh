export const notempty = {
  name: 'notempty',
  validate: (input: string) => {
    if (typeof input === 'object' && input !== null) {
      return Object.keys(input).length > 0
    }
    if (typeof input === 'number') {
      return !!input || input === 0
    }
    if (Array.isArray(input)) {
      return !!input.length
    }
    return !!input
  }
}