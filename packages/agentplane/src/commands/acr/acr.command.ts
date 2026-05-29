import { renderAcrSchemaJson, type AgentChangeRecord } from "@agentplaneorg/core/schemas";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import type { CommandContext } from "../shared/task-backend.js";
import { generateAcr } from "./generate.js";
import { acrValidationError } from "./remediation.js";
import { renderAcrSummary, summarizeAcr } from "./summary.js";
import { emitValidationResult, readAcrTarget, validateAcrTarget } from "./validate.js";
import {
  acrSpec,
  type AcrCheckParsed,
  type AcrExplainParsed,
  type AcrGenerateParsed,
  type AcrSchemaParsed,
  type AcrValidateParsed,
} from "./acr.specs.js";

export { assertAcrCiSemantics, validateAcrTarget } from "./validate.js";
export {
  acrCheckSpec,
  acrExplainSpec,
  acrGenerateSpec,
  acrSchemaSpec,
  acrSpec,
  acrValidateSpec,
} from "./acr.specs.js";
export type {
  AcrCheckParsed,
  AcrExplainParsed,
  AcrGenerateParsed,
  AcrSchemaParsed,
  AcrValidateParsed,
} from "./acr.specs.js";

async function runAcrRootGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: acrSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["acr"]),
    command: "acr",
    contextCommand: "acr",
  });
}

export function makeRunAcrHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runAcrRootGroup;
}

export function makeRunAcrSchemaHandler() {
  return runAcrSchemaHandler;
}

async function runAcrSchemaHandler(ctx: CommandCtx, p: AcrSchemaParsed): Promise<number> {
  const text = renderAcrSchemaJson();
  if (p.out) {
    const outPath = path.resolve(ctx.cwd, p.out);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeTextIfChanged(outPath, text);
    process.stdout.write(`${outPath}\n`);
    return 0;
  }
  process.stdout.write(text);
  return 0;
}

export function makeRunAcrGenerateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (cmdCtx: CommandCtx, p: AcrGenerateParsed): Promise<number> => {
    const ctx = await getCtx("acr generate");
    const { record, acrPath, warnings } = await generateAcr({
      ctx,
      cwd: cmdCtx.cwd,
      rootOverride: cmdCtx.rootOverride,
      taskId: p.taskId,
      workCommit: p.workCommit,
      baseCommit: p.baseCommit,
      agent: p.agent,
      agentName: p.agentName,
      modelProvider: p.modelProvider,
      modelName: p.modelName,
      out: p.out,
      write: p.write,
      refresh: p.refresh,
    });

    const shouldWrite = p.write || p.out;
    if (shouldWrite && acrPath) {
      await writeAcrFile({ acrPath, record, refresh: p.refresh });
    }

    if (p.json) {
      process.stdout.write(
        `${JSON.stringify(
          {
            ok: true,
            command: "acr generate",
            task_id: p.taskId,
            acr_path: acrPath ? path.relative(ctx.resolvedProject.gitRoot, acrPath) : null,
            record_id: record.record_id,
            record_digest: record.integrity.record_digest,
            warnings,
          },
          null,
          2,
        )}\n`,
      );
      return 0;
    }

    if (!shouldWrite || p.stdout) {
      process.stdout.write(`${JSON.stringify(record, null, 2)}\n`);
    } else if (acrPath) {
      process.stdout.write(`${path.relative(ctx.resolvedProject.gitRoot, acrPath)}\n`);
    }
    return 0;
  };
}

export function makeRunAcrValidateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_cmdCtx: CommandCtx, p: AcrValidateParsed): Promise<number> => {
    const ctx = await getCtx("acr validate");
    const result = await validateAcrTarget({
      ctx,
      target: p.target,
      mode: p.mode,
      strict: p.strict,
      allowManualOverride: false,
      allowWaivedVerification: false,
      requirePlanApproved: p.mode === "ci",
      requireVerification: p.mode === "ci",
      requirePolicyPass: p.mode === "ci",
    });
    emitValidationResult(result, p.json, "acr validate");
    return 0;
  };
}

export function makeRunAcrCheckHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_cmdCtx: CommandCtx, p: AcrCheckParsed): Promise<number> => {
    const ctx = await getCtx("acr check");
    const result = await validateAcrTarget({
      ctx,
      target: p.taskId,
      mode: "ci",
      strict: true,
      allowManualOverride: p.allowManualOverride,
      allowWaivedVerification: p.allowWaivedVerification,
      requirePlanApproved: p.requirePlanApproved,
      requireVerification: p.requireVerification,
      requirePolicyPass: p.requirePolicyPass,
    });
    emitValidationResult(result, p.json, "acr check");
    return 0;
  };
}

export function makeRunAcrExplainHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_cmdCtx: CommandCtx, p: AcrExplainParsed): Promise<number> => {
    const ctx = await getCtx("acr explain");
    const resolved = await readAcrTarget(ctx, p.target);
    const summary = summarizeAcr(resolved.record);
    if (p.json) {
      process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(renderAcrSummary(summary));
    return 0;
  };
}

export async function writeAcrFile(opts: {
  acrPath: string;
  record: AgentChangeRecord;
  refresh: boolean;
}): Promise<void> {
  if (!opts.refresh) {
    try {
      await readFile(opts.acrPath, "utf8");
      throw acrValidationError("ACR_E_EXISTS", `ACR already exists: ${opts.acrPath}`);
    } catch (err) {
      if (err instanceof CliError) throw err;
    }
  }
  await mkdir(path.dirname(opts.acrPath), { recursive: true });
  await writeFile(opts.acrPath, `${JSON.stringify(opts.record, null, 2)}\n`, "utf8");
}

export { generateAcr } from "./generate.js";
