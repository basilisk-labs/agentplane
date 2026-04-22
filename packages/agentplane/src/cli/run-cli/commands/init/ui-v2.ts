import path from "node:path";

import type { InitV2ClackPrompts } from "./prompts-v2.js";

type InitV2PreviewItem = {
  label: string;
  value: string | number | boolean | null | undefined;
};

const INIT_ASCII_LOGO = String.raw`
░█▀█░█▀▀░█▀▀░█▀█░▀█▀░░░█░█▀█░█░░░█▀█░█▀█░█▀▀
░█▀█░█░█░█▀▀░█░█░░█░░▄▀░░█▀▀░█░░░█▀█░█░█░█▀▀
░▀░▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀░░░▀░░░▀▀▀░▀░▀░▀░▀░▀▀▀
agent/plane
`.trim();

function stringifyPreviewValue(value: InitV2PreviewItem["value"]): string {
  if (value === true) return "yes";
  if (value === false) return "no";
  if (value === null || value === undefined || value === "") return "(none)";
  return String(value);
}

export function renderInitV2Preview(items: InitV2PreviewItem[]): string {
  const labelWidth = Math.max(...items.map((item) => item.label.length), 0);
  return items
    .map((item) => `${item.label.padEnd(labelWidth)}  ${stringifyPreviewValue(item.value)}`)
    .join("\n");
}

export function section(
  clack: Pick<InitV2ClackPrompts, "log" | "note">,
  title: string,
  message?: string,
): void {
  clack.log.step(title);
  if (message?.trim()) {
    clack.note(message.trim());
  }
}

export function introLogo(clack: Pick<InitV2ClackPrompts, "note">): void {
  clack.note(INIT_ASCII_LOGO);
}

export function previewInstall(
  clack: Pick<InitV2ClackPrompts, "note">,
  items: InitV2PreviewItem[],
): void {
  clack.note(renderInitV2Preview(items), "Install preview");
}

export function renderInitV2ConflictPreview(gitRoot: string, conflicts: readonly string[]): string {
  return conflicts.map((conflict) => `- ${path.relative(gitRoot, conflict)}`).join("\n");
}

export function previewConflicts(
  clack: Pick<InitV2ClackPrompts, "note">,
  opts: {
    gitRoot: string;
    conflicts: readonly string[];
  },
): void {
  clack.note(renderInitV2ConflictPreview(opts.gitRoot, opts.conflicts), "Init conflicts detected");
}

export function outroSuccess(clack: Pick<InitV2ClackPrompts, "outro">, root: string): void {
  clack.outro(`AgentPlane initialized in ${root}.`);
}

export function outroError(clack: Pick<InitV2ClackPrompts, "log" | "outro">, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  clack.log.error(message);
  clack.outro("AgentPlane init did not complete.");
}
