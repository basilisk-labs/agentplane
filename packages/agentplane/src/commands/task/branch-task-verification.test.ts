import * as infrastructureVerification from "./verification-infrastructure.js";
import * as directFinalization from "./direct-task-finalization.js";
import { createLegacyTaskAggregate, TASK_CENTRIC_EXTENSION_KEY } from "@agentplaneorg/core/tasks";
import * as taskBackend from "../shared/task-backend.js";
import * as implementationRecovery from "./external-agent-implementation-recovery.js";
import * as conflictRecovery from "./branch-task-supervisor-implementation.js";
import * as formalOperation from "./direct-task-supervisor-formal-operation.js";
import * as declaredVerification from "./direct-task-verification.js";
import * as verificationRecord from "./verify-record.js";
import * as artifactCommit from "./branch-task-supervisor-artifact-commit.js";
import { executeProductionBranchEpisode } from "./branch-task-supervisor-episodes.js";
import { expect, it, vi } from "vitest";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";

const taskId = "202607310001-BRANCH";

it.each([false, true])(
  "freezes branch verification and preserves its planned commands (%s)",
  async (planned) => {
    const decision = {
      task: { id: taskId },
      executionPacket: { mustRunFrom: "/repo/task" },
      workflowStep: {
        id: "agent.verification",
        kind: "agent_episode",
        episode: { purpose: "verification" },
      },
    } as unknown as TaskRouteDecision;
    const plannedCommands = [
      {
        command: "bun run release:prepublish:check",
        check_ids: ["prepublish"],
        timeout_ms: 3_600_000,
      },
      { command: "bun run release:parity", check_ids: ["parity"], timeout_ms: 60_000 },
    ];
    const aggregate = createLegacyTaskAggregate({
      id: taskId,
      revision: 2,
      title: "Branch fixture",
      description: "",
      status: "DOING",
      acceptance_criteria: [],
      captured_at: "2026-09-07T00:00:00Z",
      updated_at: "2026-09-07T00:00:00Z",
    });
    const task = {
      ...decision.task,
      ...(planned
        ? {
            extensions: {
              [TASK_CENTRIC_EXTENSION_KEY]: {
                ...aggregate,
                current_plan: {
                  task_id: taskId,
                  revision: 1,
                  digest: `sha256:${"a".repeat(64)}`,
                  approval: { state: "approved" },
                  proposal: {
                    top_level_validation: {
                      checks: plannedCommands.map(({ command, check_ids, timeout_ms }) => ({
                        id: check_ids[0],
                        command,
                        timeout_ms,
                        required: true,
                      })),
                      criteria: [],
                    },
                  },
                },
              },
            },
          }
        : {}),
    };
    const selected = {
      ...task,
      execution_contract: {
        verification: { contract: { selected_checks: ["docs_contract", "task_outcome"] } },
      },
    };
    const snapshot = {
      execution_contract: selected.execution_contract,
      evaluated_sha: "frozen-head",
      changed_paths: ["docs/contract.md"],
    };
    const command = {
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      resolvedProject: { gitRoot: "/repo" },
    };
    const checks = {
      status: "passed",
      artifact_path: "checks.json",
      reason: null,
      checks: [
        {
          command: "bun run ci:local:full",
          check_ids: ["docs_contract", "task_outcome"],
          exit_code: 0,
        },
      ],
    };
    const spies = [
      vi.spyOn(directFinalization, "readDirectTaskHead").mockResolvedValue("frozen-head"),
      vi
        .spyOn(infrastructureVerification, "prepareInfrastructureVerificationForCheckout")
        .mockResolvedValue(() => Promise.resolve("infra.json")),
      vi.spyOn(conflictRecovery, "recoverProductionBranchConflict").mockResolvedValue(null),
      vi.spyOn(taskBackend, "loadCommandContext").mockResolvedValue(command as never),
      vi.spyOn(taskBackend, "loadTaskFromContext").mockResolvedValue(task as never),
      vi
        .spyOn(implementationRecovery, "resolveImplementationVerificationTask")
        .mockResolvedValue({ task: selected, snapshot } as never),
      vi
        .spyOn(formalOperation, "recordDirectTaskFormalOperation")
        .mockImplementation(async (opts) => {
          await opts.run();
          return { decision, journal: {}, journal_path: "journal.json" } as never;
        }),
      vi
        .spyOn(declaredVerification, "runDirectTaskVerification")
        .mockResolvedValue(checks as never),
      vi.spyOn(verificationRecord, "cmdVerifyParsed").mockResolvedValue(0),
      vi.spyOn(artifactCommit, "commitBranchSupervisorTaskArtifacts").mockResolvedValue(undefined),
    ];
    try {
      const result = await executeProductionBranchEpisode({
        input: { task_id: taskId } as never,
        decision,
        decide: () => Promise.resolve(decision),
      });
      expect(result.status).toBe("completed");
      expect(implementationRecovery.resolveImplementationVerificationTask).toHaveBeenCalledOnce();
      expect(declaredVerification.runDirectTaskVerification).toHaveBeenCalledWith(
        expect.objectContaining({
          task: selected,
          ...(planned
            ? {
                additional_commands: plannedCommands,
                additional_only: true,
                map_selected_checks: true,
              }
            : {}),
        }),
      );
      if (!planned) {
        expect(
          vi.mocked(declaredVerification.runDirectTaskVerification).mock.calls[0]?.[0],
        ).not.toHaveProperty("additional_only", true);
      }
      expect(verificationRecord.cmdVerifyParsed).toHaveBeenCalledWith(
        expect.objectContaining({
          verificationSnapshot: snapshot,
        }),
      );
      expect(vi.mocked(verificationRecord.cmdVerifyParsed).mock.calls[0]?.[0].details).toContain(
        "Check: docs_contract",
      );
      vi.mocked(verificationRecord.cmdVerifyParsed).mockClear();
      vi.mocked(artifactCommit.commitBranchSupervisorTaskArtifacts).mockClear();
      vi.mocked(declaredVerification.runDirectTaskVerification).mockResolvedValueOnce({
        status: "unsupported",
        artifact_path: "retained-infrastructure.json",
        reason: "ENOSPC",
        checks: [{ command: "bun test", exit_code: null, failure_kind: "infrastructure" }],
      } as never);
      const failed = await executeProductionBranchEpisode({
        input: { task_id: taskId } as never,
        decision,
        decide: () => Promise.resolve(decision),
      });
      expect(failed.status).toBe("stopped");
      expect(verificationRecord.cmdVerifyParsed).not.toHaveBeenCalled();
      expect(artifactCommit.commitBranchSupervisorTaskArtifacts).not.toHaveBeenCalled();
      // The unchanged verification decision executes the check again without implementation work.
      const retried = await executeProductionBranchEpisode({
        input: { task_id: taskId } as never,
        decision,
        decide: () => Promise.resolve(decision),
      });
      expect(retried.status).toBe("completed");
      expect(verificationRecord.cmdVerifyParsed).toHaveBeenCalledWith(
        expect.objectContaining({ state: "ok" }),
      );
      expect(task).not.toHaveProperty("execution_contract.verification.contract.selected_checks", [
        "docs_contract",
        "task_outcome",
      ]);
    } finally {
      for (const spy of spies) spy.mockRestore();
    }
  },
);
