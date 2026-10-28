import path from "node:path";
import { recipeV1ConversionSourceInput } from "../recipes/impl/v1-conversion.js";
import { projectKernelRecipeRoleContext } from "../../runner/context/recipe-role-context.js";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { taskCentricDigest, taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildKernelStateFingerprint } from "./kernel-work-order.js";
import { issueKernelExchange } from "./kernel-exchange.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import type {
  resolveInspectionRepositoryEvidence,
  runKernelNativeValidation,
  InspectionBinding,
} from "./kernel-inspection-validation.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;
type AuthorityContext = Awaited<ReturnType<Runtime["authority"]["resolve"]>>;

export async function issueKernelInspectionWorkOrder(opts: {
  command: CommandContext;
  record: KernelRecord;
  workItemId: string;
  binding: InspectionBinding;
  resultPath: string;
  resolvedRepositoryEvidence: Awaited<ReturnType<typeof resolveInspectionRepositoryEvidence>>;
  native: Extract<Awaited<ReturnType<typeof runKernelNativeValidation>>, { kind: "observed" }>;
  authority: AuthorityContext["authority"];
  context: AuthorityContext["context"];
}) {
  const {
    command,
    record,
    workItemId,
    binding,
    resultPath,
    resolvedRepositoryEvidence,
    native,
    authority,
    context,
  } = opts;
  const item = record.aggregate.work_items[workItemId]!;
  const contract = record.documents!.contracts[String(item.definition.contract_digest)]!;
  const repositoryEvidence = resolvedRepositoryEvidence?.evidence ?? null;
  const recipeContext = await projectKernelRecipeRoleContext({
    gitRoot: command.resolvedProject.gitRoot,
    record,
    role: "EVALUATOR",
    work_item_id: workItemId,
  });
  const conversionSource = await recipeV1ConversionSourceInput({
    command,
    task_id: record.aggregate.id,
    contract,
  });
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse({
    schema_version: 2,
    kind: "agent_work_order",
    work_order_id: k.kernelDigest({
      binding,
      revision: record.aggregate.revision,
      native_validation_digest: k.kernelDigest(native.evidence),
      ...(recipeContext ? { recipe_context: recipeContext } : {}),
      ...(conversionSource ? { conversion_source: conversionSource } : {}),
    }),
    role: "EVALUATOR",
    task: {
      id: record.aggregate.id,
      revision: record.aggregate.revision,
      work_item_id: workItemId,
      objective:
        repositoryEvidence?.origin === "adopted_hosted_pr"
          ? `Independently inspect hosted PR head ${repositoryEvidence.implementation_commit} against base ${repositoryEvidence.base_commit}: ${contract.objective}`
          : `Independently inspect the implementation: ${contract.objective}`,
      acceptance_criteria: contract.acceptance_criteria.map((description, index) => ({
        id: `criterion-${index + 1}`,
        description,
        required: true,
      })),
      unresolved_questions: [],
    },
    canonical_binding: binding,
    state_fingerprint: await buildKernelStateFingerprint({
      command,
      record,
      context,
      authority_digest: authority.digest,
    }),
    state_fingerprint_policy: {
      fingerprint_schema_version: 2,
      required_components: [
        "task",
        "git",
        "backend_projection",
        "plan",
        "policy",
        "capability",
        "authority",
      ],
      provider: { required: false, unavailable: "allow_if_unchanged" },
    },
    authority: {
      mutation_scope: "none",
      writable_roots: [],
      protected_paths: ["."],
      allowed_tool_classes: ["repository_read", "git_read", "report_result", "report_blocker"],
      network: "deny",
      external_side_effects: [],
      sandbox: "read-only",
      expires_at: authority.expires_at,
    },
    ...(recipeContext
      ? { recipe_context: { projection: recipeContext, digest: taskCentricDigest(recipeContext) } }
      : {}),
    context_intent: {
      purpose:
        "Inspect source and output evidence against the approved contract. Return a review verdict. Do not modify implementation or claim native verification. The controller executes the approved checks independently." +
        (recipeContext ? " Retained Recipe role context is required guidance, not authority." : ""),
      required_knowledge_ref_digests: [],
      require_prepared_evidence: false,
    },
    knowledge_refs: [],
    prepared_evidence: [],
    required_inputs: [
      ...(conversionSource ? [conversionSource] : []),
      {
        id: "implementation-result",
        kind: "source_artifact",
        path: resultPath,
        digest: item.result_digest,
        description:
          "Native-accepted implementation result and evidence references. Digest uses canonical JSON.",
        required: true,
      },
      ...(repositoryEvidence
        ? [
            {
              id: "repository-evidence",
              kind: "source_artifact" as const,
              path: path.join(resolvedRepositoryEvidence!.directory, "repository-evidence.json"),
              digest: repositoryEvidence.digest,
              description:
                repositoryEvidence.origin === "adopted_hosted_pr"
                  ? "Exact hosted PR head, base, tree, changed paths, provider readback and evaluator target. Inspect this commit, not the task metadata checkout."
                  : "AgentPlane-owned commit, tree, changed-path, and evaluator-target evidence.",
              required: true,
            },
          ]
        : []),
      {
        id: "native-validation",
        kind: "source_artifact" as const,
        path: native.path,
        digest: k.kernelDigest(native.evidence),
        description:
          "AgentPlane-observed native checks bound to the implementation, command, toolchain, and environment inputs.",
        required: true,
      },
      ...item.output_manifests.map((manifest) => ({
        id: manifest.id,
        kind: "source_artifact",
        description: manifest.kind,
        digest: manifest.digest,
        required: true,
      })),
    ],
    required_outputs: [
      {
        id: "review",
        kind: "semantic_result",
        description:
          "Return AgentSemanticResult v2 with the exact canonical_binding and review. Use pass, rework, blocked or human_review. Include findings and residual risks.",
        required: true,
      },
    ],
    verification_intent: {
      requirements: [
        ...contract.acceptance_criteria.map((criterion, index) => ({
          id: `criterion-${index + 1}`,
          description: criterion,
          required: true,
          observed_by: "evaluator" as const,
        })),
        ...contract.verification_commands.map((check, index) => ({
          id: `check-${index + 1}`,
          description: check,
          required: true,
          observed_by: "agentplane" as const,
        })),
      ],
      require_execution_receipt: true,
    },
    semantic_result_schema: "agentplane.agent_semantic_result.v2",
    stop_rules: [
      "Perform only independent inspection.",
      "Do not invoke lifecycle commands or modify repository files.",
      "Return the exact canonical_binding and a review verdict.",
    ],
  });
  return issueKernelExchange(
    command,
    order,
    context.actor.transport === "managed" ? "managed" : "host",
  );
}
