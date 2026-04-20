export function appendTail(current: string, incoming: string, maxBytes: number): string {
  const combined = Buffer.from(`${current}${incoming}`, "utf8");
  if (combined.length <= maxBytes) return combined.toString("utf8");
  return combined.subarray(combined.length - maxBytes).toString("utf8");
}

export function splitCompletedLines(buffer: string): { lines: string[]; remainder: string } {
  const lines: string[] = [];
  let start = 0;
  while (start < buffer.length) {
    const newlineIndex = buffer.indexOf("\n", start);
    if (newlineIndex === -1) {
      return { lines, remainder: buffer.slice(start) };
    }
    let line = buffer.slice(start, newlineIndex);
    if (line.endsWith("\r")) {
      line = line.slice(0, -1);
    }
    lines.push(line);
    start = newlineIndex + 1;
  }
  return { lines, remainder: "" };
}
