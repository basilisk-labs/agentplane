import { createInterface } from "node:readline/promises";

export async function promptChoice(
  prompt: string,
  choices: string[],
  defaultValue: string,
): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const question = `${prompt} [${choices.join("/")}] (default ${defaultValue}): `;
  const answer = await rl.question(question);
  rl.close();
  const trimmed = answer.trim();
  if (!trimmed) return defaultValue;
  if (!choices.includes(trimmed)) {
    process.stdout.write(`Invalid choice, using default ${defaultValue}\n`);
    return defaultValue;
  }
  return trimmed;
}

export async function promptYesNo(prompt: string, defaultValue: boolean): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const question = `${prompt} [${defaultValue ? "Y/n" : "y/N"}]: `;
  const answer = await rl.question(question);
  rl.close();
  const trimmed = answer.trim().toLowerCase();
  if (!trimmed) return defaultValue;
  return ["y", "yes", "true", "1", "on"].includes(trimmed);
}

export async function promptInput(prompt: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(prompt);
  rl.close();
  return answer.trim();
}
