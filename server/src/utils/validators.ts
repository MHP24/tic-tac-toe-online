export const validateGameProp = (prop: number | string, defaultValue: number): number => {
  const propValidated = isNaN(Number(prop)) ? defaultValue : Number(prop)
  return propValidated > 0 ? propValidated : propValidated * -1
}
