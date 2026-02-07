import type { PolicyResult } from "../../policy/types.js";
import { CliError } from "../../shared/errors.js";

export function throwIfPolicyDenied(res: PolicyResult): void {
  if (res.ok) return;
  const messages = res.errors.map((e) => e.message).join("\n");
  const chosen =
    res.errors.find((e) => e.code === "E_INTERNAL") ??
    res.errors.find((e) => e.code === "E_USAGE") ??
    res.errors[0];
  if (!chosen) return;
  throw new CliError({ exitCode: chosen.exitCode, code: chosen.code, message: messages });
}
