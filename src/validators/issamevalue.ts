export const issamevalue = {
  name: 'issamevalue',
  validate: (input : string, secondInput :string) => {
    return input && secondInput ? input === secondInput : false
  }
}