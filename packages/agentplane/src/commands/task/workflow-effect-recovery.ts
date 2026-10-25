import { readFile } from "node:fs/promises";

import { CliError } from "../../shared/errors.js";
import { reconcileIntegrationEffect } from "./external-agent-workflow-recovery.js";
import { reconcileProviderUpdateEffect } from "./provider-update-effect-recovery.js";

export async function reconcileWorkflowEffect(
  opts: Parameters<typeof reconcileIntegrationEffect>[0],
) {
  let kind: unknown;
  try {
    const input: unknown = JSON.parse(await readFile(opts.input_path, "utf8"));
    kind = input && typeof input === "object" && "kind" in input ? input.kind : null;
  } catch {
    throw new CliError({ code: "E_VALIDATION", message: "Invalid workflow recovery input." });
  }
  if (kind === "integration_effect_resolution") return await reconcileIntegrationEffect(opts);
  if (kind === "provider_update_branch_effect_resolution") {
    return await reconcileProviderUpdateEffect(opts);
  }
  throw new CliError({ code: "E_VALIDATION", message: "Unsupported workflow recovery kind." });
}
