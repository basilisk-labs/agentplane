import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import {
  backendUsesLocalTaskStore,
  loadCommandContext,
  resolveCommandGitCommonDir,
  type CommandContext,
} from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import {
  previewStaleAdmissionRetirement,
  retireStaleAdmission,
} from "./stale-admission-retirement.js";
import {
  readRetirementFile,
  type RetirementContext,
} from "./stale-admission-retirement-validation.js";

type Parsed = { taskId: string; apply: boolean; request?: string; yes: boolean };
export const taskRetireAdmissionSpec: CommandSpec<Parsed> = {
  id: ["task", "retire-admission"],
  group: "Task",
  summary: "Inspect or explicitly revoke one stale semantic admission before legacy quarantine.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "apply",
      default: false,
      description: "Retire only the exact admission pinned by a native preview.",
    },
    {
      kind: "string",
      name: "request",
      valueHint: "<request.json>",
      description:
        "Contained file holding the exact native preview request. Required with --apply.",
    },
    { kind: "boolean", name: "yes", default: false, description: "Confirm admission revocation." },
  ],
  examples: [
    {
      cmd: "agentplane task retire-admission 202608300000-MGR001",
      why: "Read a source-bound request without applying old work or changing native state.",
    },
    {
      cmd: "agentplane task retire-admission 202608300000-MGR001 --apply --request .agentplane/tmp/retirement.json --yes",
      why: "Revoke the pinned admission with exact beforeimages and a recoverable native receipt.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    apply: raw.opts.apply === true,
    request: typeof raw.opts.request === "string" ? raw.opts.request : undefined,
    yes: raw.opts.yes === true,
  }),
};

async function retirementContext(
  command: CommandContext,
  taskId: string,
): Promise<RetirementContext> {
  const checkout = command.resolvedProject.gitRoot;
  const backendRoot = (command.taskBackend as { root?: unknown }).root;
  if (
    !backendUsesLocalTaskStore(command) ||
    backendRoot !== path.resolve(checkout, command.config.paths.workflow_dir)
  )
    throw new CliError({
      code: "E_VALIDATION",
      message: "Admission retirement requires the configured canonical local Task byte store.",
    });
  const common = await resolveCommandGitCommonDir(command);
  return {
    checkout,
    common_git_dir: common,
    workflow_dir: command.config.paths.workflow_dir,
    worktrees_dir: command.config.paths.worktrees_dir,
    task_id: taskId,
    observe_binding: async () => {
      const fresh = await loadCommandContext({ cwd: checkout, rootOverride: null });
      if (
        fresh.resolvedProject.gitRoot !== checkout ||
        (await resolveCommandGitCommonDir(fresh)) !== common
      )
        throw new CliError({ code: "E_VALIDATION", message: "Repository identity changed." });
      return {
        repository_identity: (await resolveLogicalRepositoryIdentity({
          git_root: checkout,
          task: {},
        })) as k.Sha256Digest,
        policy_digest: k.kernelDigest(fresh.config),
      };
    },
  };
}

export function makeRunTaskRetireAdmissionHandler(
  getCtx: (command: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, opts: Parsed): Promise<number> => {
    if ((opts.apply && (!opts.request || !opts.yes)) || (!opts.apply && opts.request))
      throw new CliError({
        code: "E_USAGE",
        message: "Use a read-only preview or explicit --apply --request <file> --yes.",
      });
    const command = await getCtx("task retire-admission");
    const context = await retirementContext(command, opts.taskId);
    if (opts.apply) {
      await ensureActionApproved({
        action: "force_action",
        config: command.config,
        yes: opts.yes,
        reason: "explicit stale semantic admission revocation",
      });
    }
    const result = opts.apply
      ? await retireStaleAdmission({
          context,
          request: JSON.parse(
            await readRetirementFile(
              context.checkout,
              path.resolve(context.checkout, opts.request!),
            ),
          ),
        })
      : await previewStaleAdmissionRetirement(context);
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    return 0;
  };
}
