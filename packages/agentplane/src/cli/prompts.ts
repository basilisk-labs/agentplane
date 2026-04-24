import { createInterface } from "node:readline/promises";
import type * as ClackPromptsModule from "@clack/prompts";

type ClackPrompts = typeof ClackPromptsModule;

function shouldUseClackPrompts(): boolean {
  return (
    process.env.AGENTPLANE_PROMPTS !== "plain" &&
    process.stdin.isTTY === true &&
    process.stdout.isTTY === true
  );
}

let clackPromptsPromise: Promise<ClackPrompts> | null = null;

function getClackPrompts(): Promise<ClackPrompts | null> {
  if (!shouldUseClackPrompts()) return Promise.resolve(null);
  clackPromptsPromise ??= import("@clack/prompts");
  return clackPromptsPromise;
}

export async function selectPrompt(
  prompt: string,
  choices: string[],
  defaultValue: string,
): Promise<string> {
  const clack = await getClackPrompts();
  if (clack) {
    const answer = await clack.select({
      message: prompt,
      options: choices.map((value) => ({ value, label: value })),
      initialValue: defaultValue,
    });
    if (clack.isCancel(answer)) {
      clack.cancel("Prompt cancelled; using default.");
      return defaultValue;
    }
    return String(answer);
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const question = `${prompt} [${choices.join("/")}] (default ${defaultValue}): `;
  const answer = await rl.question(question);
  rl.close();
  const trimmed = answer.trim();
  if (!trimmed) return defaultValue;
  if (!choices.includes(trimmed)) {
    process.stdout.write(`Invalid choice; using default ${defaultValue}\n`);
    return defaultValue;
  }
  return trimmed;
}

export async function confirmPrompt(prompt: string, defaultValue: boolean): Promise<boolean> {
  const clack = await getClackPrompts();
  if (clack) {
    const answer = await clack.confirm({
      message: prompt,
      initialValue: defaultValue,
    });
    if (clack.isCancel(answer)) {
      clack.cancel("Prompt cancelled; using default.");
      return defaultValue;
    }
    return answer;
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const question = `${prompt} [${defaultValue ? "Y/n" : "y/N"}]: `;
  const answer = await rl.question(question);
  rl.close();
  const trimmed = answer.trim().toLowerCase();
  if (!trimmed) return defaultValue;
  if (["y", "yes", "true", "1", "on"].includes(trimmed)) return true;
  if (["n", "no", "false", "0", "off"].includes(trimmed)) return false;
  return defaultValue;
}

export async function textPrompt(prompt: string): Promise<string> {
  const clack = await getClackPrompts();
  if (clack) {
    const answer = await clack.text({ message: prompt });
    if (clack.isCancel(answer)) {
      clack.cancel("Prompt cancelled.");
      return "";
    }
    return answer.trim();
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(prompt);
  rl.close();
  return answer.trim();
}

export const promptChoice = selectPrompt;
export const promptYesNo = confirmPrompt;
export const promptInput = textPrompt;
