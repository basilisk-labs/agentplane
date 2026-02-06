import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  ensureDocSections,
  normalizeDocSectionName,
  setMarkdownSection,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import { type TaskBackend, type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { promptYesNo } from "../../cli/prompts.js";
import {
  backendNotSupportedMessage,
  infoMessage,
  successMessage,
  warnMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";

import { gitStatusChangedPaths } from "../guard/index.js";
import { gitRevParse } from "../shared/git-ops.js";
import {
  appendVerifyLog,
  extractLastVerifiedSha,
  parsePrMeta,
  runShellCommand,
  type PrMeta,
} from "../shared/pr-meta.js";
import { loadBackendTask } from "../shared/task-backend.js";
import { isPathWithin } from "../shared/path.js";

import { nowIso } from "./shared.js";

export const VERIFY_USAGE =
  "Usage: agentplane verify <task-id> [--cwd <path>] [--log <path>] [--skip-if-unchanged] [--quiet] [--require] [--yes]";
export const VERIFY_USAGE_EXAMPLE = "agentplane verify 202602030608-F1Q8AB";

function extractDocSection(doc: string, sectionName: string): string | null {
  const target = normalizeDocSectionName(sectionName);
  if (!target) return null;
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  let capturing = false;
  const out: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const key = normalizeDocSectionName(match[1] ?? "");
      if (capturing) break;
      capturing = key === target;
      continue;
    }
    if (capturing) out.push(line);
  }

  if (!capturing) return null;
  return out.join("\n").trimEnd();
}

function stripListMarker(line: string): string {
  return line.replace(/^(?:[-*]|\d+\.)\s+/, "");
}

function parseVerifyStepsFromDoc(doc: string): { commands: string[]; steps: string[] } {
  const section = extractDocSection(doc, "Verify Steps");
  if (!section) return { commands: [], steps: [] };

  const commands: string[] = [];
  const steps: string[] = [];
  const lines = section.split("\n");
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const normalized = stripListMarker(trimmed);
    const lower = normalized.toLowerCase();
    if (lower.startsWith("cmd:")) {
      const command = normalized.slice(4).trim();
      if (command) commands.push(command);
      continue;
    }
    steps.push(normalized);
  }

  return { commands, steps };
}

function renderVerificationSection(opts: {
  status: "pass" | "fail";
  verifiedAt: string;
  verifiedSha?: string | null;
  commands: string[];
  steps: string[];
  details?: string | null;
}): string {
  const lines = [
    `Status: ${opts.status}`,
    `Verified at: ${opts.verifiedAt}`,
    ...(opts.verifiedSha ? [`Verified sha: ${opts.verifiedSha}`] : []),
    ...(opts.commands.length > 0
      ? ["", "Commands:", ...opts.commands.map((command) => `- ${command}`)]
      : []),
    ...(opts.steps.length > 0
      ? ["", "Manual steps:", ...opts.steps.map((step) => `- ${step}`)]
      : []),
    ...(opts.details ? ["", `Details: ${opts.details}`] : []),
  ];
  return lines.join("\n");
}

async function writeVerificationSection(opts: {
  backend: TaskBackend;
  taskId: string;
  config: AgentplaneConfig;
  baseDoc: string;
  content: string;
  updatedBy: string;
}): Promise<void> {
  if (!opts.backend.getTaskDoc || !opts.backend.setTaskDoc) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }
  const baseDoc = ensureDocSections(opts.baseDoc ?? "", opts.config.tasks.doc.required_sections);
  const nextDoc = setMarkdownSection(baseDoc, "Verification", opts.content);
  const normalized = ensureDocSections(nextDoc, opts.config.tasks.doc.required_sections);
  await opts.backend.setTaskDoc(opts.taskId, normalized, opts.updatedBy);
}

export async function cmdVerify(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  execCwd?: string;
  logPath?: string;
  skipIfUnchanged: boolean;
  quiet: boolean;
  require: boolean;
  yes: boolean;
}): Promise<number> {
  try {
    const { task, backend, config, resolved } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const docText = typeof task.doc === "string" ? task.doc : "";
    const { commands: docCommands, steps: docSteps } = parseVerifyStepsFromDoc(docText);

    const rawVerify = task.verify;
    if (rawVerify !== undefined && rawVerify !== null && !Array.isArray(rawVerify)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `${task.id}: verify must be a list of strings`,
      });
    }
    const taskCommands = Array.isArray(rawVerify)
      ? rawVerify
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    const commands = docCommands.length > 0 ? docCommands : taskCommands;
    let baseDoc = typeof task.doc === "string" ? task.doc : "";

    if (docSteps.length > 0 && !opts.quiet) {
      process.stdout.write(`${infoMessage(`${task.id}: manual verify steps:`)}\n`);
      for (const step of docSteps) {
        process.stdout.write(`- ${step}\n`);
      }
    }

    if (commands.length === 0) {
      if (opts.require) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `${task.id}: no verify commands configured`,
        });
      }
      if (!opts.quiet) {
        process.stdout.write(`${infoMessage(`${task.id}: no verify commands configured`)}\n`);
      }
      return 0;
    }

    const requireVerifyApproval = config.agents?.approvals?.require_verify === true;
    if (requireVerifyApproval && !opts.yes) {
      if (!process.stdin.isTTY || opts.quiet) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message:
            "Verification requires explicit approval (use --yes in non-interactive mode or set agents.approvals.require_verify=false).",
        });
      }
      const approved = await promptYesNo(
        "Require explicit approval for verification. Proceed?",
        false,
      );
      if (!approved) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Verification cancelled by user.",
        });
      }
    }

    if (!backend.getTaskDoc || !backend.setTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    if (!baseDoc) {
      const fetched = await backend.getTaskDoc(task.id);
      if (typeof fetched === "string") baseDoc = fetched;
    }

    const execCwd = opts.execCwd ? path.resolve(opts.cwd, opts.execCwd) : resolved.gitRoot;
    if (!isPathWithin(resolved.gitRoot, execCwd)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `--cwd must stay under repo root: ${execCwd}`,
      });
    }

    const taskDir = path.join(resolved.gitRoot, config.paths.workflow_dir, opts.taskId);
    const prDir = path.join(taskDir, "pr");
    const metaPath = path.join(prDir, "meta.json");

    let logPath: string | null = null;
    if (opts.logPath) {
      logPath = path.resolve(opts.cwd, opts.logPath);
      if (!isPathWithin(resolved.gitRoot, logPath)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `--log must stay under repo root: ${logPath}`,
        });
      }
    } else if (await fileExists(prDir)) {
      logPath = path.join(prDir, "verify.log");
    }

    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      const rawMeta = await readFile(metaPath, "utf8");
      meta = parsePrMeta(rawMeta, opts.taskId);
    }

    const headSha = await gitRevParse(execCwd, ["HEAD"]);
    const currentSha = headSha;

    if (opts.skipIfUnchanged) {
      const changed = await gitStatusChangedPaths({
        cwd: execCwd,
        rootOverride: opts.rootOverride,
      });
      if (changed.length > 0) {
        if (!opts.quiet) {
          process.stdout.write(
            `${warnMessage(`${task.id}: working tree is dirty; ignoring --skip-if-unchanged`)}\n`,
          );
        }
      } else {
        let lastVerifiedSha = meta?.last_verified_sha ?? null;
        if (!lastVerifiedSha && logPath && (await fileExists(logPath))) {
          const logText = await readFile(logPath, "utf8");
          lastVerifiedSha = extractLastVerifiedSha(logText);
        }
        if (lastVerifiedSha && lastVerifiedSha === currentSha) {
          const header = `[${nowIso()}] ℹ️ skipped (unchanged verified_sha=${currentSha})`;
          if (logPath) {
            await appendVerifyLog(logPath, header, "");
          }
          if (!opts.quiet) {
            process.stdout.write(
              `${infoMessage(`${task.id}: verify skipped (unchanged sha ${currentSha.slice(0, 12)})`)}\n`,
            );
          }
          if (meta) {
            const nextMeta: PrMeta = {
              ...meta,
              last_verified_sha: currentSha,
              last_verified_at: nowIso(),
              verify: meta.verify ? { ...meta.verify, status: "pass" } : { status: "pass" },
            };
            await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
          }
          return 0;
        }
      }
    }

    let verifyError: Error | null = null;
    let failedCommand: string | null = null;
    for (const command of commands) {
      try {
        if (!opts.quiet) {
          process.stdout.write(`$ ${command}\n`);
        }
        const timestamp = nowIso();
        const result = await runShellCommand(command, execCwd);
        const shaPrefix = currentSha ? `sha=${currentSha} ` : "";
        const header = `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd();
        if (logPath) {
          await appendVerifyLog(logPath, header, result.output);
        }
        if (result.code !== 0) {
          throw new CliError({
            exitCode: result.code || 1,
            code: "E_IO",
            message: `Verify command failed: ${command}`,
          });
        }
      } catch (err) {
        verifyError = err instanceof Error ? err : new Error(String(err));
        failedCommand = command;
        break;
      }
    }

    if (verifyError) {
      const details = verifyError.message;
      const failureAt = nowIso();
      const content = renderVerificationSection({
        status: "fail",
        verifiedAt: failureAt,
        verifiedSha: null,
        commands,
        steps: docSteps,
        details: failedCommand ? `${details} (command: ${failedCommand})` : details,
      });
      await writeVerificationSection({
        backend,
        taskId: task.id,
        config,
        baseDoc,
        content,
        updatedBy: "VERIFY",
      });
      if (meta) {
        const nextMeta: PrMeta = {
          ...meta,
          last_verified_at: failureAt,
          verify: meta.verify
            ? { ...meta.verify, status: "fail", command: commands.join(" && ") }
            : { status: "fail", command: commands.join(" && ") },
        };
        await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
      }
      const existingComments = Array.isArray(task.comments)
        ? task.comments.filter(
            (item): item is { author: string; body: string } =>
              !!item && typeof item.author === "string" && typeof item.body === "string",
          )
        : [];
      const failureBody = failedCommand
        ? `Verify failed: ${details} (command: ${failedCommand})`
        : `Verify failed: ${details}`;
      const nextTask: TaskData = {
        ...task,
        status: "DOING",
        comments: [...existingComments, { author: "VERIFY", body: failureBody }],
        doc_version: 2,
        doc_updated_at: failureAt,
        doc_updated_by: "VERIFY",
      };
      await backend.writeTask(nextTask);
      throw verifyError;
    }

    if (currentSha) {
      const header = `[${nowIso()}] ✅ verified_sha=${currentSha}`;
      if (logPath) {
        await appendVerifyLog(logPath, header, "");
      }
    }
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("verify passed", task.id)}\n`);
    }

    const successAt = nowIso();
    const successContent = renderVerificationSection({
      status: "pass",
      verifiedAt: successAt,
      verifiedSha: currentSha,
      commands,
      steps: docSteps,
      details: null,
    });
    await writeVerificationSection({
      backend,
      taskId: task.id,
      config,
      baseDoc,
      content: successContent,
      updatedBy: "VERIFY",
    });

    if (meta) {
      const nextMeta: PrMeta = {
        ...meta,
        last_verified_sha: currentSha,
        last_verified_at: successAt,
        verify: meta.verify
          ? { ...meta.verify, status: "pass", command: commands.join(" && ") }
          : { status: "pass", command: commands.join(" && ") },
      };
      await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "verify", root: opts.rootOverride ?? null });
  }
}
