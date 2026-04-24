import type * as ClackPromptsModule from "@clack/prompts";

export type InitClackPrompts = typeof ClackPromptsModule;

export class InitAborted extends Error {
  readonly code = "INIT_ABORTED";

  constructor(message = "Init cancelled.") {
    super(message);
    this.name = "InitAborted";
  }
}

let clackPromptPromise: Promise<InitClackPrompts> | null = null;

export function shouldUseInitClackPrompts(): boolean {
  return (
    process.env.AGENTPLANE_PROMPTS !== "plain" &&
    process.stdin.isTTY === true &&
    process.stdout.isTTY === true
  );
}

export function loadInitClackPrompts(): Promise<InitClackPrompts | null> {
  if (!shouldUseInitClackPrompts()) return Promise.resolve(null);
  clackPromptPromise ??= import("@clack/prompts");
  return clackPromptPromise;
}

export function assertNotCancelled<T>(
  clack: Pick<InitClackPrompts, "cancel" | "isCancel">,
  value: T,
  message = "Init cancelled.",
): Exclude<T, symbol> {
  if (clack.isCancel(value)) {
    clack.cancel(message);
    throw new InitAborted(message);
  }
  return value as Exclude<T, symbol>;
}
