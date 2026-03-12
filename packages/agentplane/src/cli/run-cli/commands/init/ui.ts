import { visibleLen } from "../../../shared/ansi.js";

function useColor(): boolean {
  return process.stdout.isTTY === true && (process.env.TERM ?? "dumb") !== "dumb";
}

function color(text: string, code: string): string {
  if (!useColor()) return text;
  return `\u001B[${code}m${text}\u001B[0m`;
}

function muted(text: string): string {
  return color(text, "90");
}

function accent(text: string): string {
  return color(text, "36");
}

function heading(text: string): string {
  return color(text, "1;33");
}

function body(text: string): string {
  return color(text, "37");
}

function padLine(line: string, width: number): string {
  const lineLen = visibleLen(line);
  if (lineLen >= width) return line;
  return `${line}${" ".repeat(width - lineLen)}`;
}

function framedRailCallout(titleText: string, lines: string[]): string {
  const width = Math.max(visibleLen(titleText), ...lines.map((line) => visibleLen(line)), 0);
  const ruleLen = Math.max(1, width - visibleLen(titleText) + 1);
  const header = `${heading("◇")}  ${heading(titleText)} ${accent("─".repeat(ruleLen))}${accent("╮")}`;
  const bodyLines = lines.map(
    (line) => `${muted("│")}  ${padLine(body(line), width)}  ${muted("│")}`,
  );
  const footer = `${muted("├")}${accent("─".repeat(width + 4))}${accent("╯")}`;
  return [muted("│"), header, ...bodyLines, footer].join("\n");
}

export function renderInitWelcome(): string {
  const logo = [
    "░█▀█░█▀▀░█▀▀░█▀█░▀█▀░░░█░█▀█░█░░░█▀█░█▀█░█▀▀",
    "░█▀█░█░█░█▀▀░█░█░░█░░▄▀░░█▀▀░█░░░█▀█░█░█░█▀▀",
    "░▀░▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀░░░▀░░░▀▀▀░▀░▀░▀░▀░▀▀▀",
  ].map((line) => accent(line));
  const intro = framedRailCallout("Interactive Setup", [
    "",
    "Bootstrap an agent-first workflow in this repository.",
    "This interactive setup runs once; daily work is executed by agents.",
    "Follow the prompts below to choose policy, workflow, and safety defaults.",
    "",
  ]);
  return `${logo.join("\n")}\n\n${intro}\n\n`;
}

export function renderInitSection(title: string, description: string): string {
  const lines = description.split("\n");
  const width = Math.max(visibleLen(title), ...lines.map((line) => visibleLen(line)), 0);
  const ruleLen = Math.max(1, width - visibleLen(title) + 1);
  const header = `${heading("◇")}  ${heading(title)} ${accent("─".repeat(ruleLen))}`;
  const bodyLines = lines.map((line) => `${muted("│")}  ${body(line)}`);
  return `${header}\n${bodyLines.join("\n")}\n${muted("│")}\n\n`;
}
