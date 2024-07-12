import * as R from "ramda";

export function arrayToObjectWithKeys<T, K extends keyof T, B extends keyof T>(
  keyName: K,
  valueName: B,
  array: T[]
): Record<string, any> {
  return R.reduce((acc, item) => R.assoc(item[keyName] as any, item[valueName], acc), {}, array);
}
