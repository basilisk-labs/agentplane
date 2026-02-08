export function formatJsonBlock(value: unknown, indent: string): string {
  const payload = JSON.stringify(value, null, 2);
  if (!payload) return "";
  return payload
    .split("\n")
    .map((line) => `${indent}${line}`)
    .join("\n");
}
