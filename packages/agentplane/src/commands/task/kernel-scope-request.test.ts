import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";

import { retainedIssuanceAuthority } from "./kernel-rework-lineage.js";
import { scopeReplanInputs } from "./kernel-scope-replan-inputs.js";
import { loadCommandContext } from "../shared/task-backend.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type * as ScopeIntake from "../../adapters/task-backend/kernel-scope-intake.js";
import type * as KernelRuntimeContext from "./kernel-runtime-context.js";

installRunCliIntegrationHarness();
describe("native prospective scope request", { timeout: 180_000 }, () => {
  it.each(["native", "legacy", "existing-effects"])(
    "requires exact scope approval and fresh planning (legacy stop: %s)",
    async (variant) => {
      const legacyStop = variant === "legacy";
      const existingEffects = variant === "existing-effects";
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "direct";
      await writeConfig(root, config);
      await ensureRuntimeGitignore({ gitRoot: root });
      await writeFile(path.join(root, "source.ts"), "export const value = 1;\n");
      await writeFile(path.join(root, "fixture.test.ts"), "export const unchanged = true;\n");
      await commitAll(root, "scope fixture");
      const created = await runJson(root, [
        "task",
        "create",
        "Repair fixture",
        "--route",
        "direct",
        "--task-kind",
        "code",
        "--mutation-scope",
        "code",
        "--scope-root",
        "source.ts",
        "--repository-effect",
        "repository_write",
        "--repository-effect",
        "source_code",
        ...(existingEffects
          ? ["--repository-effect", "ci", "--repository-effect", "documentation"]
          : []),
        "--capability",
        "repository_write",
        "--json",
      ]);
      const id = String(created.task_id);
      let packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
      const submit = async (fields: Record<string, unknown>) => {
        const exchange = packet.exchange as { directory: string; result_path: string };
        const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
          JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
        );
        await writeFile(
          exchange.result_path,
          JSON.stringify({
            work_order_id: order.work_order_id,
            status: "completed",
            summary: "Fixture scope episode",
            findings: [],
            uncertainty: [],
            ...fields,
          }),
        );
        packet = await runJson(root, [
          "task",
          "advance",
          id,
          "--result",
          exchange.result_path,
          "--agent-json",
        ]);
        return exchange;
      };
      const proposal = {
        work_items: [
          {
            id: "repair",
            depends_on: [],
            required_inputs: [],
            expected_outputs: ["report"],
            optional: false,
            execution_requirements: {
              scope_roots: ["source.ts"],
              repository_effects: ["repository_write", "source_code"],
              external_effects: [],
              capabilities: ["repository_write"],
              resources: [],
            },
            contract: {
              role: "EXECUTOR",
              objective: "Inspect and repair fixture",
              acceptance_criteria: ["Fixture repaired"],
              verification_commands: ["node --version"],
            },
          },
        ],
      };
      await submit({ canonical_plan: proposal });
      expect(packet.action).toMatchObject({ kind: "approval_required" });
      expect(
        await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
      ).toBe(0);
      packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
      expect(packet.authority).toMatchObject({ role: "EXECUTOR" });
      const unchanged = await readFile(path.join(root, "fixture.test.ts"), "utf8");
      // Emit the historical command shape through the real kernel. Do not rewrite its receipt.
      const runtimeContext = await vi.importActual<typeof KernelRuntimeContext>(
        "./kernel-runtime-context.js",
      );
      const createRuntime = runtimeContext.createKernelRuntime;
      const legacySpy = legacyStop
        ? vi.spyOn(runtimeContext, "createKernelRuntime").mockImplementation(async (...args) => {
            const runtime = await createRuntime(...args);
            const input = runtime.input.bind(runtime);
            runtime.input = async (...inputArgs) => {
              if (inputArgs[0].kind === "transition_work_item" && inputArgs[0].action === "block") {
                const { semantic_result_digest: _removed, ...historicalCommand } = inputArgs[0];
                inputArgs[0] = historicalCommand;
              }
              return input(...inputArgs);
            };
            return runtime;
          })
        : undefined;
      const intake = await vi.importActual<typeof ScopeIntake>(
        "../../adapters/task-backend/kernel-scope-intake.js",
      );
      const originalAmend = intake.amendedScopeIntake;
      const oldEffectCeiling = existingEffects
        ? vi.spyOn(intake, "amendedScopeIntake").mockImplementation((task, roots, effects) => {
            if (effects.includes("ci"))
              throw new Error(
                "Scope request contains a forbidden or unsupported repository effect",
              );
            return originalAmend(task, roots, effects);
          })
        : undefined;
      const blockedExchange = await submit({
        status: "blocked",
        blocker: {
          summary: "Fixture needs an additional path",
          scope_extension_request: {
            schema_version: 1,
            rationale: "Preserve the real fixture assertion",
            scope_roots: ["fixture.test.ts"],
            repository_effects: [
              "repository_write",
              "tests",
              ...(existingEffects ? ["ci", "documentation"] : []),
            ],
          },
        },
      });
      legacySpy?.mockRestore();
      if (existingEffects) {
        expect(packet.action, JSON.stringify(packet)).toMatchObject({ kind: "human_required" });
        expect(JSON.stringify(packet.action)).toContain("unsupported repository effect");
        const resultPath = path.join(blockedExchange.directory, "received-result.json");
        const bytes = await readFile(resultPath, "utf8");
        oldEffectCeiling?.mockRestore();
        packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
        expect(await readFile(resultPath, "utf8")).toBe(bytes);
      }
      const action = packet.action as {
        kind: string;
        reason: string;
        operator_action: { argv: string[] };
      };
      expect(action, JSON.stringify(packet)).toMatchObject({
        kind: "human_required",
        reason: existingEffects
          ? "kernel_work_item_blocked"
          : "canonical_scope_request_requires_user",
      });
      expect(
        (packet.action as { operator_action: { request: { result_authentication: string } } })
          .operator_action.request.result_authentication,
      ).toBe(legacyStop ? "legacy_current_retained_content" : "native_stop_receipt");
      const freshBlocked = await runJson(root, ["task", "advance", id, "--agent-json"]);
      expect(freshBlocked.action, JSON.stringify(freshBlocked)).toMatchObject({
        kind: "human_required",
        operator_action: { kind: "approve_scope_request", argv: action.operator_action.argv },
      });
      const argv = action.operator_action.argv.slice(1);
      const stale = [...argv];
      stale[stale.indexOf("--request-digest") + 1] = `sha256:${"0".repeat(64)}`;
      expect(await runCliSilent([...stale, "--root", root])).not.toBe(0);
      expect(await readFile(path.join(root, "fixture.test.ts"), "utf8")).toBe(unchanged);
      const retainedPath = path.join(blockedExchange.directory, "received-result.json");
      const retainedResult = await readFile(retainedPath, "utf8");
      const tampered = JSON.parse(retainedResult) as { summary: string };
      tampered.summary = "Unbound substituted result";
      await writeFile(retainedPath, JSON.stringify(tampered));
      expect(await runCliSilent([...argv, "--root", root])).not.toBe(0);
      const diagnostic = await runJson(root, ["task", "advance", id, "--agent-json"]);
      expect(diagnostic.action, JSON.stringify(diagnostic)).toMatchObject({
        kind: "human_required",
        operator_action: {
          kind: legacyStop ? "approve_scope_request" : "scope_request_unavailable",
        },
      });
      await writeFile(retainedPath, retainedResult);
      const nonUser = [...argv];
      nonUser[nonUser.indexOf("--by") + 1] = "EXECUTOR";
      expect(await runCliSilent([...nonUser, "--root", root])).not.toBe(0);
      expect(await runCliSilent([...argv, "--root", root])).toBe(0);
      // Approval cannot immediately reuse the previously approved execution plan.
      packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
      expect(packet.authority, JSON.stringify(packet)).toMatchObject({ role: "PLANNER" });
      expect(await runCliSilent([...argv, "--root", root])).not.toBe(0);
      expect(await readFile(path.join(root, "fixture.test.ts"), "utf8")).toBe(unchanged);
      const expanded = structuredClone(proposal);
      expanded.work_items[0]!.execution_requirements.scope_roots.push("fixture.test.ts");
      expanded.work_items[0]!.execution_requirements.repository_effects.push("tests");
      await submit({ canonical_plan: expanded });
      expect(packet.action, JSON.stringify(packet)).toMatchObject({ kind: "approval_required" });
      expect(
        await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
      ).toBe(0);
      packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
      expect(packet.authority, JSON.stringify(packet)).toMatchObject({ role: "EXECUTOR" });
      const nextOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        JSON.parse(
          await readFile(
            path.join((packet.exchange as { directory: string }).directory, "work-order.json"),
            "utf8",
          ),
        ),
      );
      expect(nextOrder.authority.writable_roots).toContain(path.join(root, "fixture.test.ts"));
      expect(
        nextOrder.required_inputs.some(
          (entry) => entry.id === "approved-scope-replan" && entry.required,
        ),
      ).toBe(true);
      expect(await readFile(path.join(root, "fixture.test.ts"), "utf8")).toBe(unchanged);
      if (variant === "native") {
        const context = await loadCommandContext({ cwd: root, rootOverride: root });
        const nativeRuntime = await createRuntime({
          command: context,
          task_id: id,
          transport: "host",
          operation_id: "inspect-scope-context",
        });
        const current = await nativeRuntime.adapter.read(id);
        if (current.kind !== "canonical") throw new Error("Expected canonical scope fixture");
        const directory = (packet.exchange as { directory: string }).directory;
        const noGrant = {
          ...current.record,
          aggregate: {
            ...current.record.aggregate,
            authority_lineage: current.record.aggregate.authority_lineage?.filter(
              (entry) => entry.observation?.kind !== "prospective_scope_request",
            ),
          },
        };
        expect(await scopeReplanInputs(nextOrder, directory, noGrant)).toEqual([]);
        await writeFile(
          retainedPath,
          JSON.stringify({ ...JSON.parse(retainedResult), summary: "Forged retained scope stop" }),
        );
        await expect(scopeReplanInputs(nextOrder, directory, current.record)).rejects.toThrow(
          "preceding attempt",
        );
        await writeFile(retainedPath, retainedResult);
      }
      if (!legacyStop) {
        await submit({
          status: "blocked",
          blocker: {
            summary: "Additional independent fixture needed",
            scope_extension_request: {
              schema_version: 1,
              rationale: "Exercise a second exact intake amendment",
              scope_roots: ["second.test.ts"],
              repository_effects: ["tests"],
            },
          },
        });
        const secondAction = packet.action as { operator_action: { argv: string[] } };
        expect(
          await runCliSilent([...secondAction.operator_action.argv.slice(1), "--root", root]),
        ).toBe(0);
        packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
        expect(packet.authority, JSON.stringify(packet)).toMatchObject({ role: "PLANNER" });
        if (variant === "native") {
          const secondExpanded = structuredClone(expanded);
          secondExpanded.work_items[0]!.execution_requirements.scope_roots.push("second.test.ts");
          await submit({ canonical_plan: secondExpanded });
          expect(packet.action, JSON.stringify(packet)).toMatchObject({
            kind: "approval_required",
          });
          expect(
            await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
          ).toBe(0);
          packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
          expect(packet.authority, JSON.stringify(packet)).toMatchObject({ role: "EXECUTOR" });
          const thirdOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
            JSON.parse(
              await readFile(
                path.join((packet.exchange as { directory: string }).directory, "work-order.json"),
                "utf8",
              ),
            ),
          );
          expect(thirdOrder.canonical_binding).toMatchObject({ plan_revision: 3, attempt: 3 });
          expect(thirdOrder.authority.writable_roots).toContain(path.join(root, "second.test.ts"));
          expect(
            thirdOrder.required_inputs.some(
              (entry) => entry.id === "approved-scope-replan" && entry.required,
            ),
          ).toBe(true);
          expect(await readFile(retainedPath, "utf8")).toBe(retainedResult);
          expect(await readFile(path.join(root, "fixture.test.ts"), "utf8")).toBe(unchanged);
          const inspectionRuntime = await createRuntime({
            command: await loadCommandContext({ cwd: root, rootOverride: root }),
            task_id: id,
            transport: "host",
            operation_id: "inspect-second-scope-issuance",
          });
          const final = await inspectionRuntime.adapter.read(id);
          if (final.kind !== "canonical") throw new Error("Missing second replan record");
          expect(retainedIssuanceAuthority(final.record, nextOrder)).toBe(true);
          const approval = final.record.events.findLast(
            (event) =>
              event.kind === "plan_approved" && event.task_revision <= nextOrder.task.revision!,
          );
          const lineage = final.record.aggregate.authority_lineage!;
          const rootIndex = lineage.findIndex(
            (entry) =>
              entry.observation === null &&
              entry.authority.plan_digest === nextOrder.canonical_binding?.plan_digest,
          );
          if (!approval || rootIndex < 1) throw new Error("Missing native later Plan approval");
          const mutate = (change: (record: KernelRecord) => void) => {
            const record = structuredClone(final.record);
            change(record);
            expect(retainedIssuanceAuthority(record, nextOrder)).toBe(false);
          };
          mutate((record) => {
            record.events = record.events.filter((event) => event.id !== approval.id);
          });
          mutate((record) => {
            delete record.aggregate.mutation_receipts[approval.mutation_id];
          });
          mutate((record) => {
            record.aggregate.mutation_receipts[approval.mutation_id]!.event_digests = [
              `sha256:${"0".repeat(64)}`,
            ];
          });
          mutate((record) => {
            record.events.push(structuredClone(approval));
          });
          mutate((record) => {
            record.aggregate.authority_lineage!.splice(rootIndex, 1);
          });
          mutate((record) => {
            record.aggregate.authority_lineage!.push(structuredClone(lineage[rootIndex]!));
          });
          mutate((record) => {
            record.aggregate.authority_lineage![
              rootIndex
            ]!.authority.provenance.parent_authority_digest = lineage[0]!.authority.digest;
          });
          const firstApproval = final.record.events.find((event) => event.kind === "plan_approved");
          if (!firstApproval || firstApproval.id === approval.id)
            throw new Error("Missing preceding Plan approval");
          mutate((record) => {
            record.aggregate.mutation_receipts[approval.mutation_id]!.command_digest =
              firstApproval.command_digest;
          });
          const staleOrder = structuredClone(nextOrder);
          staleOrder.task.revision = approval.task_revision - 1;
          expect(retainedIssuanceAuthority(final.record, staleOrder)).toBe(false);
        }
      }
    },
  );
});
