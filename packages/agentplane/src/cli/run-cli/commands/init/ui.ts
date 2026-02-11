function useColor(): boolean {
  return process.stdout.isTTY === true && (process.env.TERM ?? "dumb") !== "dumb";
}

function color(text: string, code: string): string {
  if (!useColor()) return text;
  return `\u001B[${code}m${text}\u001B[0m`;
}

function stripAnsi(text: string): string {
  return text.replaceAll(/\u001B\[[0-9;]*m/gu, "");
}

function visibleLen(text: string): number {
  return stripAnsi(text).length;
}

function padLine(line: string, width: number): string {
  const lineLen = visibleLen(line);
  if (lineLen >= width) return line;
  return `${line}${" ".repeat(width - lineLen)}`;
}

function box(lines: string[]): string {
  const width = Math.max(...lines.map((line) => visibleLen(line)), 0);
  const top = `┌${"─".repeat(width + 2)}┐`;
  const body = lines.map((line) => `│ ${padLine(line, width)} │`);
  const bottom = `└${"─".repeat(width + 2)}┘`;
  return [top, ...body, bottom].join("\n");
}

export function renderInitWelcome(): string {
  const logo = [
    "░█▀█░█▀▀░█▀▀░█▀█░▀█▀░░░█░█▀█░█░░░█▀█░█▀█░█▀▀",
    "░█▀█░█░█░█▀▀░█░█░░█░░▄▀░░█▀▀░█░░░█▀█░█░█░█▀▀",
    "░▀░▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀░░░▀░░░▀▀▀░▀░▀░▀░▀░▀▀▀",
  ].map((line) => color(line, "36"));
  const subtitle = color("agent/plane", "36");
  const intro = [
    color("Bootstrap an agent-first workflow in this repository.", "1"),
    "This interactive setup runs once; daily work is executed by agents.",
  ];
  return `${logo.join("\n")}\n${subtitle}\n\n${box(intro)}\n\n`;
}

export function renderInitSection(title: string, description: string): string {
  const header = color(`[${title}]`, "33");
  return `${header}\n${description}\n\n`;
}
