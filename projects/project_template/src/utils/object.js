const cloneDeep = require("lodash/cloneDeep");

export function deepCopy(src) {
  return cloneDeep(src);
}