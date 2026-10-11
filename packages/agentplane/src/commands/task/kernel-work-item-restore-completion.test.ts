import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
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
import { loadCommandContext } from "../shared/task-backend.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { semanticStopPlanMatches } from "./kernel-recovery-evidence.js";
import type * as Replanning from "../../../../core/src/tasks/task-kernel/replan-work-items.js";

installRunCliIntegrationHarness();
afterEach(() => vi.restoreAllMocks());

const definition = (item: string, dependencies: string[]) => ({
  id: item,
  depends_on: dependencies,
  required_inputs: dependencies.map((dependency) => `${dependency}-report`),
  expected_outputs: [`${item}-report`],
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
    objective: `Inspect ${item} fixture evidence`,
    acceptance_criteria: [`${item} evidence inspected`],
    verification_commands: ["node --version"],
  },
});

describe(
  "native completion preservation and authenticated restoration",
  { timeout: 180_000 },
  () => {
    it.each(["preserve", "restore", "unchanged-block"])(
      "retains completed producer across scope replanning (historical reset: %s)",
      async (variant) => {
        const historicalReset = variant === "restore";
        const unchangedBlocked = variant === "unchanged-block";
        const root = await mkGitRepoRootWithBranch("main");
        await configureGitUser(root);
        const config = defaultConfig();
        config.workflow_mode = "direct";
        await writeConfig(root, config);
        await ensureRuntimeGitignore({ gitRoot: root });
        await writeFile(path.join(root, "source.ts"), "export const value = 1;\n");
        await writeFile(path.join(root, "fixture.test.ts"), "export const check = true;\n");
        await commitAll(root, "completion recovery fixture");
        const created = await runJson(root, [
          "task",
          "create",
          "Inspect dependent reports",
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
          "--capability",
          "repository_write",
          "--json",
        ]);
        const id = String(created.task_id);
        let packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
        const readOrder = async () => {
          const exchange = packet.exchange as { directory: string; result_path: string };
          return {
            exchange,
            order: AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
              JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
            ),
          };
        };
        const submit = async (fields: Record<string, unknown>) => {
          const { exchange, order } = await readOrder();
          await writeFile(
            exchange.result_path,
            JSON.stringify({
              work_order_id: order.work_order_id,
              status: "completed",
              summary: "Native fixture episode",
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
          return { exchange, order };
        };
        const producer = definition("producer", []);
        const consumer = definition("consumer", ["producer"]);
        const downstream = definition("downstream", ["consumer"]);
        await submit({ canonical_plan: { work_items: [producer, consumer, downstream] } });
        expect(
          await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
        ).toBe(0);
        packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
        await submit({
          canonical_outputs: [
            { id: "producer-report", kind: "report", digest: k.kernelDigest("inspected fixture") },
          ],
        });
        const inspection = await submit({
          findings: [
            "The producer report matches the inspected fixture and its native check passed.",
          ],
          review: {
            verdict: "pass",
            missing_tests: [],
            hidden_assumptions: [],
            residual_risks: [],
          },
        });
        const command = await loadCommandContext({ cwd: root, rootOverride: root });
        const runtime = await createKernelRuntime({
          command,
          task_id: id,
          transport: "host",
          operation_id: "inspect-recovery-test",
        });
        const getRecord = async () => {
          const read = await runtime.adapter.read(id);
          if (read.kind !== "canonical") throw new Error("Expected canonical fixture");
          return read.record;
        };
        const before = await getRecord();
        expect(before.aggregate.work_items.producer!.state).toBe("COMPLETED");
        const observed1 = await readOrder();
        expect(observed1.order.task.work_item_id).toBe("consumer");
        const blocked = await submit({
          status: "blocked",
          blocker: {
            summary: "Need fixture path",
            scope_extension_request: {
              schema_version: 1,
              rationale: "Inspect fixture",
              scope_roots: ["fixture.test.ts"],
              repository_effects: ["tests"],
            },
          },
        });
        const action = packet.action as { operator_action: { argv: string[] } };
        expect(await runCliSilent([...action.operator_action.argv.slice(1), "--root", root])).toBe(
          0,
        );
        packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
        const replanning = await vi.importActual<typeof Replanning>(
          "../../../../core/src/tasks/task-kernel/replan-work-items.js",
        );
        // Reproduce the old reducer at issuance. Native events and receipts are generated normally.
        const oldBehavior = historicalReset
          ? vi
              .spyOn(replanning, "reconcileReplannedWorkItems")
              .mockReturnValue({ workItems: {}, issues: [] })
          : undefined;
        const revisedPlan = {
          work_items: [
            producer,
            definition("preparation", ["producer"]),
            unchangedBlocked
              ? consumer
              : {
                  ...consumer,
                  depends_on: ["producer", "preparation"],
                  required_inputs: ["producer-report", "preparation-report"],
                  execution_requirements: {
                    ...consumer.execution_requirements,
                    scope_roots: ["source.ts", "fixture.test.ts"],
                    repository_effects: ["repository_write", "source_code", "tests"],
                  },
                },
            downstream,
          ],
        };
        await submit({ canonical_plan: revisedPlan });
        oldBehavior?.mockRestore();
        if (variant === "preserve") {
          expect(packet.action).toMatchObject({ kind: "approval_required" });
          const proposalRecord = await getRecord();
          const proposalState = proposalRecord.aggregate;
          expect(proposalState.current_plan?.state).toBe("PROPOSED");
          const rejectInput = {
            aggregate: proposalState,
            actor: { id: "USER", kind: "USER" as const, transport: "manual" as const },
            command: {
              kind: "reject_plan" as const,
              task_id: id,
              expected_task_revision: proposalState.revision,
              expected_state_fingerprint:
                proposalState.authority_lineage!.at(-1)!.authority.repository_fingerprint,
              plan_revision: proposalState.current_plan!.revision,
              plan_digest: proposalState.current_plan!.digest,
              rejection_evidence_digest: k.kernelDigest("native review reason"),
            },
          };
          expect(replanning.isScopeProposalRejection(rejectInput)).toBe(true);
          expect(
            replanning.isScopeProposalRejection({
              ...rejectInput,
              actor: { ...rejectInput.actor, kind: "AGENT" },
            }),
          ).toBe(false);
          expect(
            replanning.isScopeProposalRejection({
              ...rejectInput,
              command: { ...rejectInput.command, rejection_evidence_digest: undefined },
            }),
          ).toBe(false);
          const grant = proposalState.authority_lineage!.at(-1)!;
          expect(
            replanning.isScopeProposalRejection({
              ...rejectInput,
              aggregate: {
                ...proposalState,
                authority_lineage: [...proposalState.authority_lineage!, grant],
              },
            }),
          ).toBe(false);
          expect(
            replanning.isScopeProposalRejection({
              ...rejectInput,
              aggregate: { ...proposalState, authority_lineage: [] },
            }),
          ).toBe(false);
          expect(
            replanning.isScopeProposalRejection({
              ...rejectInput,
              aggregate: {
                ...proposalState,
                current_plan: {
                  ...proposalState.current_plan!,
                  approval_actor_id: "USER",
                  approval_evidence_digest: k.kernelDigest("already approved"),
                },
              },
            }),
          ).toBe(false);
          const unrelatedGrant = structuredClone(grant);
          if (unrelatedGrant.observation?.kind !== "prospective_scope_request")
            throw new Error("Expected scope grant");
          unrelatedGrant.observation.scope_request.task_id = "unrelated-task";
          expect(
            replanning.isScopeProposalRejection({
              ...rejectInput,
              aggregate: { ...proposalState, authority_lineage: [unrelatedGrant] },
            }),
          ).toBe(false);
          await runJson(root, [
            "task",
            "plan",
            "reject",
            id,
            "--by",
            "USER",
            "--note",
            "Review the same bounded revised plan again",
          ]);
          const rejected = await getRecord();
          const history = k.authenticatedScopeReplanHistory(rejected.aggregate);
          expect(history?.proposals).toHaveLength(1);
          expect(
            k.authenticatedScopeReplanHistory({
              ...rejected.aggregate,
              current_plan: { ...rejected.aggregate.current_plan!, approval_actor_id: "USER" },
            }),
          ).toBeNull();
          expect(
            k.authenticatedScopeReplanHistory({ ...rejected.aggregate, mutation_receipts: {} }),
          ).toBeNull();
          packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
          await submit({ canonical_plan: revisedPlan });
          const nextProposal = await getRecord();
          const rejectedView = {
            ...nextProposal.aggregate,
            current_plan: { ...nextProposal.aggregate.current_plan!, state: "REJECTED" as const },
          };
          expect(k.authenticatedScopeReplanHistory(rejectedView)?.proposals).toHaveLength(2);
          const approvedIntermediate = structuredClone(rejectedView);
          const intermediate = approvedIntermediate.plan_history.find(
            (plan) => plan.revision === 2,
          )!;
          intermediate.approval_actor_id = "USER";
          intermediate.approval_evidence_digest = k.kernelDigest("approved intermediate");
          expect(k.authenticatedScopeReplanHistory(approvedIntermediate)).toBeNull();
        }
        expect(packet.action).toMatchObject({ kind: "approval_required" });
        expect(
          await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
        ).toBe(0);
        packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
        if (historicalReset) {
          const observed2 = await readOrder();
          expect(observed2.order.task.work_item_id).toBe("producer");
          await submit({
            status: "blocked",
            blocker: { summary: "The prior completed producer was reset; do not re-execute it" },
          });
          const state = await getRecord();
          const previewArgs = [
            "task",
            "work-item",
            "restore-completion",
            id,
            "--work-item",
            "producer",
            "--inspection-work-order",
            inspection.order.work_order_id,
            "--dry-run",
          ];
          const preview = await runJson(root, previewArgs);
          const observed3 = await getRecord();
          expect(observed3.digest).toBe(state.digest);
          expect(preview).toMatchObject({
            kind: "completion_restoration_preview",
            grants_authority: false,
          });
          const proof = preview.proof as k.CompletionRestorationProof;
          expect(k.completionRestorationIssues(state.aggregate, "producer", proof)).toEqual([]);
          for (const corrupt of [
            { ...proof, attempt: proof.attempt + 1 },
            { ...proof, inspection_digest: k.kernelDigest("foreign inspection") },
            { ...proof, native_validation_digest: k.kernelDigest("foreign checks") },
            {
              ...proof,
              completed: {
                ...proof.completed,
                command: { ...proof.completed.command, claim_id: "foreign claim" },
              },
            },
          ])
            expect(k.completionRestorationIssues(state.aggregate, "producer", corrupt)).not.toEqual(
              [],
            );
          const missing = { ...state.aggregate.mutation_receipts };
          delete missing[proof.completed.mutation_id];
          expect(
            k.completionRestorationIssues(
              { ...state.aggregate, mutation_receipts: missing },
              "producer",
              proof,
            ),
          ).not.toEqual([]);
          expect(
            k.completionRestorationIssues(
              {
                ...state.aggregate,
                work_items: {
                  ...state.aggregate.work_items,
                  producer: { ...state.aggregate.work_items.producer!, state: "EXECUTING" },
                },
              },
              "producer",
              proof,
            ),
          ).not.toEqual([]);
          expect(
            k.completionRestorationIssues(
              {
                ...state.aggregate,
                work_items: {
                  ...state.aggregate.work_items,
                  producer: {
                    ...state.aggregate.work_items.producer!,
                    definition: {
                      ...state.aggregate.work_items.producer!.definition,
                      optional: true,
                    },
                  },
                },
              },
              "producer",
              proof,
            ),
          ).not.toEqual([]);
          const laterAccepted = {
            ...state.aggregate.mutation_receipts[proof.accepted.mutation_id]!,
            mutation_id: `result:${k.kernelDigest("new result")}`,
            before_revision: state.aggregate.revision - 1,
            after_revision: state.aggregate.revision,
          };
          expect(
            k.completionRestorationIssues(
              {
                ...state.aggregate,
                mutation_receipts: {
                  ...state.aggregate.mutation_receipts,
                  [laterAccepted.mutation_id]: laterAccepted,
                },
              },
              "producer",
              proof,
            ),
          ).not.toEqual([]);
          const customMutation = "operator-result-without-semantic-prefix";
          const newerCommand = {
            ...proof.accepted.command,
            expected_task_revision: state.aggregate.revision,
            result_digest: k.kernelDigest("newer target result"),
          };
          const oldAcceptedEvent = state.events.find(
            (event) => event.mutation_id === proof.accepted.mutation_id,
          )!;
          const newerEvent = {
            ...oldAcceptedEvent,
            id: `${customMutation}:work_item_result_accepted`,
            mutation_id: customMutation,
            task_revision: state.aggregate.revision + 1,
            command_digest: k.kernelDigest(newerCommand),
          };
          const newerAggregate = {
            ...state.aggregate,
            revision: state.aggregate.revision + 1,
            mutation_receipts: {
              ...state.aggregate.mutation_receipts,
              [customMutation]: {
                ...state.aggregate.mutation_receipts[proof.accepted.mutation_id]!,
                mutation_id: customMutation,
                before_revision: state.aggregate.revision,
                after_revision: state.aggregate.revision + 1,
                command_digest: k.kernelDigest(newerCommand),
                event_digests: [k.kernelDigest(newerEvent)],
              },
            },
          };
          const newerProof = {
            ...proof,
            intervening_events: [...proof.intervening_events, newerEvent],
          };
          expect(k.completionRestorationIssues(newerAggregate, "producer", newerProof)).toContain(
            "later_result_inventory_mismatch",
          );
          expect(
            k.completionRestorationIssues(newerAggregate, "producer", {
              ...newerProof,
              later_results: [
                ...proof.later_results,
                { mutation_id: customMutation, command: newerCommand },
              ],
            }),
          ).toContain("newer_accepted_execution_present");
          const intervening = proof.intervening_events.find(
            (event) => event.task_revision < proof.reset_proposal.command.expected_task_revision,
          )!;
          const earlierReset = {
            ...intervening,
            kind: "plan_proposed" as const,
            id: `${intervening.mutation_id}:plan_proposed`,
          };
          const priorReceipt = state.aggregate.mutation_receipts[intervening.mutation_id]!;
          const earlierProof = {
            ...proof,
            intervening_events: proof.intervening_events.map((event) =>
              event.id === intervening.id ? earlierReset : event,
            ),
          };
          expect(
            k.completionRestorationIssues(
              {
                ...state.aggregate,
                mutation_receipts: {
                  ...state.aggregate.mutation_receipts,
                  [intervening.mutation_id]: {
                    ...priorReceipt,
                    event_digests: [k.kernelDigest(earlierReset)],
                  },
                },
              },
              "producer",
              earlierProof,
            ),
          ).toContain("earlier_reset_invalidates_selected_completion");
          expect(
            k.completionRestorationIssues(state.aggregate, "producer", {
              ...proof,
              intervening_events: proof.intervening_events.slice(1),
            }),
          ).toContain("incomplete_authenticated_history");
          expect(
            k.completionRestorationIssues(
              {
                ...state.aggregate,
                effects: [
                  {
                    id: "pending",
                    kind: "pr.create",
                    state: "PENDING",
                    idempotency_key: "pending",
                    request_digest: k.kernelDigest("pending"),
                    provider_receipt_digest: null,
                    observed_state_digest: null,
                    execution_requirements: {
                      scope_roots: [],
                      repository_effects: [],
                      external_effects: ["pr.create"],
                      capabilities: [],
                      resources: [],
                    },
                  },
                ],
              },
              "producer",
              proof,
            ),
          ).toContain("unresolved_effects");
          const argv = (preview.operator_action as { argv: string[] }).argv.slice(1);
          const stale = [...argv];
          stale[stale.indexOf("--proof-digest") + 1] = k.kernelDigest("wrong proof");
          expect(
            await runCliSilent([...stale, "--note", "Test mismatch", "--root", root]),
          ).not.toBe(0);
          const reviewPath = path.join(inspection.exchange.directory, "inspection-result.json");
          const originalReview = await readFile(reviewPath, "utf8");
          await writeFile(reviewPath, originalReview.replace('"pass"', '"rework"'));
          expect(
            await runCliSilent([...argv, "--note", "Test altered proof", "--root", root]),
          ).not.toBe(0);
          await writeFile(reviewPath, originalReview);
          expect(
            await runCliSilent([
              ...argv,
              "--note",
              "Restore only authenticated prior completion",
              "--root",
              root,
            ]),
          ).toBe(0);
          expect(await runCliSilent([...argv, "--note", "Stale replay", "--root", root])).not.toBe(
            0,
          );
          packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
        }
        const observed4 = await readOrder();
        expect(observed4.order.task.work_item_id).toBe("preparation");
        const after = await getRecord();
        const retained = after.aggregate.work_items.producer!;
        expect(retained.state).toBe("COMPLETED");
        for (const field of [
          "definition",
          "attempt",
          "claim_id",
          "result_digest",
          "output_manifests",
          "validation",
        ] as const)
          expect(retained[field]).toEqual(before.aggregate.work_items.producer![field]);
        for (const [key, receipt] of Object.entries(before.aggregate.mutation_receipts))
          expect(after.aggregate.mutation_receipts[key]).toEqual(receipt);
        expect(after.aggregate.work_items.downstream!.definition).toEqual(
          before.aggregate.work_items.downstream!.definition,
        );
        expect(after.aggregate.work_items.downstream!.state).toBe("PLANNED");
        if (variant === "preserve") {
          await submit({
            canonical_outputs: [
              {
                id: "preparation-report",
                kind: "report",
                digest: k.kernelDigest("reviewed preparation"),
              },
            ],
          });
          await submit({
            findings: ["The preparation report and native check satisfy its criterion."],
            review: {
              verdict: "pass",
              missing_tests: [],
              hidden_assumptions: [],
              residual_risks: [],
            },
          });
          const next = await readOrder();
          expect(next.order.task.work_item_id).toBe("consumer");
          const evidence = next.order.required_inputs.find(
            (entry) => entry.id === "approved-scope-replan",
          );
          expect(evidence?.required).toBe(true);
          const context = JSON.parse(await readFile(evidence!.path!, "utf8")) as {
            proposal_events: unknown[];
          };
          expect(k.kernelDigest(context)).toBe(evidence!.digest);
          expect(context.proposal_events).toHaveLength(2);
        }
        if (unchangedBlocked) {
          const stopped = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
            JSON.parse(
              await readFile(path.join(blocked.exchange.directory, "received-result.json"), "utf8"),
            ),
          );
          const stoppedBinding = stopped.canonical_binding!;
          const matches = (
            record: typeof after,
            binding = stoppedBinding,
            digest = k.kernelDigest(stopped),
          ) => semanticStopPlanMatches(record, binding, blocked.order.work_order_id, digest);
          expect(matches(after)).toBe(true);
          expect(
            matches({ ...after, aggregate: { ...after.aggregate, authority_lineage: [] } }),
          ).toBe(false);
          expect(matches(after, { ...stoppedBinding, claim_id: "foreign" })).toBe(false);
          expect(matches(after, { ...stoppedBinding, attempt: 99 })).toBe(false);
          expect(matches(after, stoppedBinding, k.kernelDigest("forged stop"))).toBe(false);
          expect(
            matches({
              ...after,
              aggregate: {
                ...after.aggregate,
                work_items: {
                  ...after.aggregate.work_items,
                  consumer: {
                    ...after.aggregate.work_items.consumer!,
                    definition: {
                      ...after.aggregate.work_items.consumer!.definition,
                      optional: true,
                    },
                  },
                },
              },
            }),
          ).toBe(false);
          await submit({
            canonical_outputs: [
              {
                id: "preparation-report",
                kind: "report",
                digest: k.kernelDigest("preparation inspected"),
              },
            ],
          });
          await submit({
            findings: ["The preparation report and native checks satisfy its local criterion."],
            review: {
              verdict: "pass",
              missing_tests: [],
              hidden_assumptions: [],
              residual_risks: [],
            },
          });
          expect(packet.action).toMatchObject({ kind: "human_required" });
          const resume = (packet.action as { operator_action: { argv: string[] } }).operator_action
            .argv;
          expect(resume).toContain("resume");
          expect(
            await runCliSilent([
              ...resume.slice(1),
              "--note",
              "Continue unchanged blocked item after exact scope approval",
              "--root",
              root,
            ]),
          ).toBe(0);
          packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
          const observed5 = await readOrder();
          expect(observed5.order.task.work_item_id).toBe("consumer");
          const observed6 = await getRecord();
          expect(observed6.aggregate.work_items.consumer!.attempt).toBe(2);
          const resumedRecord = await getRecord();
          expect(
            resumedRecord.aggregate.work_items.consumer!.definition.execution_requirements
              .scope_roots,
          ).toEqual(["source.ts"]);
        }
      },
    );
  },
);
