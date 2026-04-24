import type { InitClackPrompts } from "./prompts.js";

type InitPreviewItem = {
  label: string;
  value: string | number | boolean | null | undefined;
};

const INIT_ASCII_LOGO = String.raw`
░█▀█░█▀▀░█▀▀░█▀█░▀█▀░░░█░█▀█░█░░░█▀█░█▀█░█▀▀
░█▀█░█░█░█▀▀░█░█░░█░░▄▀░░█▀▀░█░░░█▀█░█░█░█▀▀
░▀░▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀░░░▀░░░▀▀▀░▀░▀░▀░▀░▀▀▀
agent/plane
`.trim();

function stringifyPreviewValue(value: InitPreviewItem["value"]): string {
  if (value === true) return "yes";
  if (value === false) return "no";
  if (value === null || value === undefined || value === "") return "(none)";
  return String(value);
}

export function renderInitPreview(items: InitPreviewItem[]): string {
  const labelWidth = Math.max(...items.map((item) => item.label.length), 0);
  return items
    .map((item) => `${item.label.padEnd(labelWidth)}  ${stringifyPreviewValue(item.value)}`)
    .join("\n");
}

export function section(
  clack: Pick<InitClackPrompts, "log" | "note">,
  title: string,
  message?: string,
): void {
  clack.log.step(title);
  if (message?.trim()) {
    clack.note(message.trim());
  }
}

export function introLogo(clack: Pick<InitClackPrompts, "note">): void {
  clack.note(INIT_ASCII_LOGO);
}

export function previewInstall(
  clack: Pick<InitClackPrompts, "note">,
  items: InitPreviewItem[],
): void {
  clack.note(renderInitPreview(items), "Install preview");
}

export function outroSuccess(clack: Pick<InitClackPrompts, "outro">, root: string): void {
  clack.outro(`AgentPlane initialized in ${root}.`);
}

export function outroError(clack: Pick<InitClackPrompts, "log" | "outro">, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  clack.log.error(message);
  clack.outro("AgentPlane init did not complete.");
}
