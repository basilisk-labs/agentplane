export function stripAnsi(text: string): string {
  if (!text) return "";
  let out = "";
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.codePointAt(i);
    if (ch === 27 && text[i + 1] === "[") {
      i += 2;
      while (i < text.length && text[i] !== "m") i += 1;
      continue;
    }
    out += text[i] ?? "";
  }
  return out;
}

export function visibleLen(text: string): number {
  return stripAnsi(text).length;
}
