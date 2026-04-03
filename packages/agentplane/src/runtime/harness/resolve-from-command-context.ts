import type { CommandContext } from "../../commands/shared/task-backend.js";

import { resolveHarnessContract } from "./resolve.js";
import type { ResolvedHarnessContract } from "./types.js";

export async function resolveHarnessFromCommandContext(
  ctx: CommandContext,
): Promise<ResolvedHarnessContract> {
  ctx.memo.harness ??= resolveHarnessContract({
    project: ctx.resolvedProject,
    config: ctx.config,
    backendId: ctx.backendId,
    backendConfigPath: ctx.backendConfigPath,
    backendCapabilities: ctx.taskBackend.capabilities,
  });
  return await ctx.memo.harness;
}
