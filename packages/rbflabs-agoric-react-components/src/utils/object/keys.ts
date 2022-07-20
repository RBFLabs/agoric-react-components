export function keys<O>(o: O) {
  return Object.keys(o) as Array<keyof O>;
}
