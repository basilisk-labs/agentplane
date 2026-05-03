import type { AgentplaneConfig } from "@agentplaneorg/core/config";

type DcoConfig = { enabled?: boolean; name?: string | null; email?: string | null };

function resolveDcoConfig(config: AgentplaneConfig): DcoConfig | undefined {
  const dco = (config.commit as { dco?: unknown } | undefined)?.dco as DcoConfig | undefined;
  return dco;
}

export function dcoIsEnabled(config: AgentplaneConfig): boolean {
  return resolveDcoConfig(config)?.enabled === true;
}

export function resolveDcoSignoff(config: AgentplaneConfig): string | null {
  const dco = resolveDcoConfig(config);
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

export function hasDcoSignoff(message: string): boolean {
  return message.split("\n").some((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("Signed-off-by:")) return false;
    return /^Signed-off-by:\s+\S(?:.*\S)?\s+<[^<>\s]+@[^<>\s]+>$/.test(trimmed);
  });
}

export function assertDcoSignoff(opts: { config: AgentplaneConfig; message: string }): void {
  if (!dcoIsEnabled(opts.config)) return;
  const signoff = resolveDcoSignoff(opts.config);
  if (hasDcoSignoff(opts.message)) return;

  const trailerText = signoff
    ? `AgentPlane default trailer:\n  ${signoff}\n`
    : "AgentPlane has no configured default trailer.\n";
  throw new Error(
    `DCO sign-off is required.\n${trailerText}Hint: use git commit -s or include a valid Signed-off-by trailer for the commit author.`,
  );
}
