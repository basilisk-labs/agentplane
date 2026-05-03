import type { AgentplaneConfig } from "@agentplaneorg/core/config";

export function resolveDcoSignoff(config: AgentplaneConfig): string | null {
  const dco = (config.commit as { dco?: unknown } | undefined)?.dco as
    | { enabled?: boolean; name?: string | null; email?: string | null }
    | undefined;
  if (dco?.enabled !== true) return null;
  const name = dco.name?.trim() ?? "";
  const email = dco.email?.trim() ?? "";
  if (!name || !email) return null;
  return `Signed-off-by: ${name} <${email}>`;
}

export function appendDcoSignoff(opts: {
  config: AgentplaneConfig;
  body?: string;
}): string | undefined {
  const signoff = resolveDcoSignoff(opts.config);
  if (!signoff) return opts.body;

  const body = opts.body?.trimEnd() ?? "";
  if (body.split("\n").some((line) => line.trim() === signoff)) {
    return body;
  }
  return body ? `${body}\n\n${signoff}` : signoff;
}

export function assertDcoSignoff(opts: { config: AgentplaneConfig; message: string }): void {
  const signoff = resolveDcoSignoff(opts.config);
  if (!signoff) return;
  if (opts.message.split("\n").some((line) => line.trim() === signoff)) return;

  throw new Error(
    `DCO sign-off is required.\nExpected trailer:\n  ${signoff}\nHint: use git commit -s or include the exact Signed-off-by trailer.`,
  );
}
