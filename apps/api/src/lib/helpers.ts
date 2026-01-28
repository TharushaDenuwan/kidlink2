/**
 * Converts a string to kebab-case
 * @example toKebabCase("Hello World") => "hello-world"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // convert camelCase
    .replace(/[\s_]+/g, "-") // replace spaces and underscores
    .toLowerCase();
}
