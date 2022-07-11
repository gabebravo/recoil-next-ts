export function isEmptyOrSpaces(str: string): boolean {
  return str === undefined || str === null || str.match(/^ *$/) !== null;
}
