const C_ESCAPES: Readonly<Record<string, number>> = {
  a: 0x07,
  b: 0x08,
  t: 0x09,
  n: 0x0a,
  v: 0x0b,
  f: 0x0c,
  r: 0x0d,
  '"': 0x22,
  "\\": 0x5c,
};

function renameSeparator(raw: string): number {
  let quoted = false;
  for (let index = 0; index <= raw.length - 4; index += 1) {
    const character = raw[index];
    if (character === "\\" && quoted) {
      index += 1;
      continue;
    }
    if (character === '"') quoted = !quoted;
    if (!quoted && raw.startsWith(" -> ", index)) return index;
  }
  return -1;
}

function decodeGitQuotedPath(raw: string): string {
  if (!raw.startsWith('"') || !raw.endsWith('"')) return raw;
  const bytes: number[] = [];
  const value = raw.slice(1, -1);
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index]!;
    if (character !== "\\") {
      bytes.push(...Buffer.from(character, "utf8"));
      continue;
    }
    const escaped = value[index + 1];
    if (escaped === undefined) {
      bytes.push(0x5c);
      continue;
    }
    if (/^[0-7]$/u.test(escaped)) {
      const octal = /^[0-7]{1,3}/u.exec(value.slice(index + 1))?.[0] ?? escaped;
      bytes.push(Number.parseInt(octal, 8));
      index += octal.length;
      continue;
    }
    const decoded = C_ESCAPES[escaped];
    if (decoded === undefined) {
      bytes.push(...Buffer.from(escaped, "utf8"));
    } else {
      bytes.push(decoded);
    }
    index += 1;
  }
  return Buffer.from(bytes).toString("utf8");
}

export function pathFromStatusLine(line: string): string {
  const raw = line.length >= 4 ? line.slice(3).trim() : "";
  const separator = renameSeparator(raw);
  const selected = separator >= 0 ? raw.slice(separator + 4).trim() : raw;
  return decodeGitQuotedPath(selected).replaceAll("\\", "/");
}
