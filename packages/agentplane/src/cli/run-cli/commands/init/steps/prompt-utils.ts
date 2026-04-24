import { assertNotCancelled } from "../prompts.js";

import type { InitPromptClack, InitPromptOption } from "./contracts.js";

export async function selectStepValue<T extends string>(
  clack: InitPromptClack,
  opts: {
    message: string;
    options: InitPromptOption<T>[];
    initialValue: T;
    cancelMessage?: string;
  },
): Promise<T> {
  const answer = await clack.select({
    message: opts.message,
    options: opts.options,
    initialValue: opts.initialValue,
  });
  return assertNotCancelled(clack, answer, opts.cancelMessage) as T;
}

export async function confirmStepValue(
  clack: InitPromptClack,
  opts: {
    message: string;
    initialValue: boolean;
    cancelMessage?: string;
  },
): Promise<boolean> {
  const answer = await clack.confirm({
    message: opts.message,
    initialValue: opts.initialValue,
  });
  return assertNotCancelled(clack, answer, opts.cancelMessage);
}

export async function textStepValue(
  clack: InitPromptClack,
  opts: {
    message: string;
    defaultValue?: string;
    placeholder?: string;
    validate?: (value: string) => string | void;
    cancelMessage?: string;
  },
): Promise<string> {
  const answer = await clack.text({
    message: opts.message,
    defaultValue: opts.defaultValue,
    placeholder: opts.placeholder,
    validate: opts.validate,
  });
  return assertNotCancelled(clack, answer, opts.cancelMessage);
}

export function parseCommaSeparatedSelection(answer: unknown, fallback: string[]): string[] {
  const rawAnswer = typeof answer === "string" ? answer : "";
  const normalized = rawAnswer.trim().toLowerCase();
  if (normalized === "") return [...fallback];
  if (normalized === "none") return [];
  return rawAnswer
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
