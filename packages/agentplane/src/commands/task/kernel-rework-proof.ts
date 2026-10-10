import {
  authenticReworkEvent as authentic,
  findReworkLineage,
  historicalAmendment,
  retainedPrerequisiteStops,
} from "./kernel-rework-lineage.js";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA, type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { isRecord } from "../../shared/guards.js";

async function read(directory: string, name: string): Promise<unknown> {
  return JSON.parse(await readStableRegularTextNoFollow(path.join(directory, name), name));
}

function dependencyClosure(definitions: k.WorkItemDefinition[], target: string): Set<string> {
  const result = new Set<string>();
  const visiting = new Set<string>();
  function visit(id: string) {
    if (visiting.has(id)) throw new Error("Cyclic prerequisite history");
    visiting.add(id);
    const item = definitions.find((entry) => entry.id === id);
    if (!item) throw new Error("Missing dependency definition");
    const producers = definitions.filter(
      (entry) =>
        entry.id !== id &&
        item.required_inputs.some((input) => entry.expected_outputs.includes(input)),
    );
    for (const dependency of [...item.depends_on, ...producers.map((entry) => entry.id)]) {
      if (dependency === target || visiting.has(dependency))
        throw new Error("Cyclic prerequisite history");
      if (!result.has(dependency)) {
        result.add(dependency);
        visit(dependency);
      }
    }
    visiting.delete(id);
  }
  visit(target);
  return result;
}

/** Authenticate every event; only a closed declared prerequisite may precede the target claim. */
export async function authenticatedAmendmentHistory(
  order: AgentWorkOrderV2,
  directory: string,
  record: KernelRecord,
  amendment: k.DomainEvent,
): Promise<boolean> {
  try {
    const binding = order.canonical_binding;
    if (binding?.phase !== "implementation") return false;
    const history = findReworkLineage(record, binding.work_item_id);
    if (!history) return false;
    let plan = history.origin;
    const events = record.events.filter((event) => event.task_revision > amendment.task_revision);
    if (events.length < 3 || events.at(-1)?.task_revision !== record.aggregate.revision)
      return false;
    let allowed = dependencyClosure(plan.work_items, binding.work_item_id);
    const stops = await retainedPrerequisiteStops(directory, record, amendment.task_revision);
    const lineage = record.aggregate.authority_lineage ?? [];
    let cursor = amendment.task_revision;
    let authority = lineage.find(
      (entry) =>
        entry.observation?.kind === "plan_amendment" && entry.authority.plan_digest === plan.digest,
    );
    if (
      !authority ||
      !historicalAmendment(record, plan, amendment, authority.observation!.previous_fingerprint)
    )
      return false;
    let fingerprint = authority.observation!.previous_fingerprint;
    let parent = authority.authority.provenance.parent_authority_digest;
    let active: {
      id: string;
      claim: string;
      attempt: number;
      phase: "begin" | "result" | "inspect" | "validation" | "complete";
      stop?: (typeof stops)[number];
      directory?: string;
      issuedRevision?: number;
      issuedFingerprint?: k.Sha256Digest;
    } | null = null;
    const completed = new Set<string>();
    let targetClaimed = false;
    let awaitingAmendment = true;
    let blocked: { id: string; attempt: number; definition: k.WorkItemDefinition } | null = null;
    const priorAttempts = new Map<string, number>();
    const base = () => ({
      task_id: binding.task_id,
      expected_task_revision: cursor,
      expected_state_fingerprint: fingerprint,
    });
    for (const [index, event] of events.entries()) {
      if (event.task_revision !== cursor + 1) return false;
      let command: k.TaskCommand;
      switch (event.kind) {
        case "plan_amended": {
          if (active || targetClaimed || awaitingAmendment || !blocked) return false;
          const next = history.plans.find((entry) => entry.revision === plan.revision + 1);
          if (!next) return false;
          const nextAllowed = dependencyClosure(next.work_items, binding.work_item_id);
          const changed = next.work_items.filter(
            (item) =>
              k.kernelDigest(item) !==
              k.kernelDigest(plan.work_items.find((old) => old.id === item.id)),
          );
          if (
            changed.length !== 1 ||
            changed[0]!.id !== blocked.id ||
            !allowed.has(blocked.id) ||
            !nextAllowed.has(blocked.id) ||
            next.work_items.length !== plan.work_items.length
          )
            return false;
          const amended = historicalAmendment(record, next, event, fingerprint);
          if (!amended) return false;
          command = amended;
          plan = next;
          allowed = nextAllowed;
          awaitingAmendment = true;
          blocked = null;
          break;
        }
        case "authority_continued": {
          if (targetClaimed || (!awaitingAmendment && active?.phase !== "result" && !blocked))
            return false;
          const continuation = lineage.find(
            (entry) =>
              entry.authority.provenance.parent_authority_digest === parent &&
              entry.observation?.previous_fingerprint === fingerprint &&
              entry.authority.plan_digest === plan.digest &&
              event.command_digest ===
                k.kernelDigest({
                  kind: "continue_authority",
                  ...base(),
                  expected_state_fingerprint: entry.authority.repository_fingerprint,
                  record: entry,
                }),
          );
          if (
            !continuation ||
            (awaitingAmendment
              ? continuation.observation?.kind !== "plan_amendment"
              : continuation.observation?.kind !== "repository_implementation")
          )
            return false;
          if (blocked) {
            const expected = {
              ...authority.authority,
              repository_fingerprint: continuation.authority.repository_fingerprint,
              provenance: {
                ...authority.authority.provenance,
                kind: "SYSTEM" as const,
                actor_id: "agentplane:kernel-controller",
                parent_authority_digest: authority.authority.digest,
              },
            };
            expected.digest = k.authorityDigest(expected);
            if (
              authority.authority.work_item_id !== null ||
              k.kernelDigest(expected) !== k.kernelDigest(continuation.authority)
            )
              return false;
          }
          const canonicalScope = authority.authority.scope_roots;
          if (
            !awaitingAmendment &&
            !continuation.observation!.changed_paths.every((changed) =>
              (blocked
                ? canonicalScope
                : plan.work_items.find((item) => item.id === active!.id)!.execution_requirements
                    .scope_roots
              ).some((root) => root === "." || changed === root || changed.startsWith(`${root}/`)),
            )
          )
            return false;
          command = {
            kind: "continue_authority",
            ...base(),
            expected_state_fingerprint: continuation.authority.repository_fingerprint,
            record: continuation,
          };
          awaitingAmendment = false;
          authority = continuation;
          parent = continuation.authority.digest;
          fingerprint = continuation.authority.repository_fingerprint;

          break;
        }
        case "work_item_transitioned": {
          if (index === 0 || awaitingAmendment || blocked) return false;
          const candidates = active
            ? [active.id]
            : targetClaimed
              ? [binding.work_item_id]
              : [...[...allowed].filter((id) => !completed.has(id)), binding.work_item_id];
          let match: k.TaskCommand | undefined;
          for (const id of candidates) {
            const runtime = record.aggregate.work_items[id];
            const stop = stops.find(
              (entry) =>
                entry.event.task_revision > cursor &&
                entry.order.canonical_binding?.phase === "implementation" &&
                entry.order.canonical_binding.work_item_id === id &&
                entry.order.canonical_binding.plan_digest === plan.digest,
            );
            const claim =
              active?.claim ??
              (stop?.order.canonical_binding?.phase === "implementation"
                ? stop.order.canonical_binding.claim_id
                : runtime?.claim_id);
            if (!claim) continue;
            const action =
              active?.stop?.event.task_revision === event.task_revision
                ? "block"
                : active
                  ? active.phase
                  : targetClaimed
                    ? "begin"
                    : "claim";
            if (!["claim", "begin", "inspect", "complete", "block"].includes(action)) continue;
            const candidate = {
              kind: "transition_work_item" as const,
              ...base(),
              action: action as "claim" | "begin" | "inspect" | "complete" | "block",
              work_item_id: id,
              claim_id: claim,
            };
            if (k.kernelDigest(candidate) === event.command_digest) match = candidate;
          }
          if (match?.kind !== "transition_work_item") return false;
          command = match;
          const runtime = record.aggregate.work_items[match.work_item_id]!;
          if (match.work_item_id === binding.work_item_id) {
            if (
              active ||
              runtime.claim_id !== binding.claim_id ||
              index !== events.length - (targetClaimed ? 1 : 2)
            )
              return false;
            targetClaimed = true;
          } else {
            const stop: (typeof stops)[number] | undefined = stops.find(
              (entry) =>
                entry.event.task_revision > cursor &&
                entry.order.canonical_binding?.phase === "implementation" &&
                entry.order.canonical_binding.work_item_id === match.work_item_id &&
                entry.order.canonical_binding.plan_digest === plan.digest,
            );
            const definition = plan.work_items.find((item) => item.id === match.work_item_id);
            if (
              !definition ||
              (!stop &&
                (runtime.state !== "COMPLETED" ||
                  !runtime.result_digest ||
                  runtime.validation?.status !== "PASSED" ||
                  k.kernelDigest(definition) !== k.kernelDigest(runtime.definition)))
            )
              return false;
            switch (match.action) {
              case "claim": {
                const attempt: number =
                  stop?.order.canonical_binding?.phase === "implementation"
                    ? stop.order.canonical_binding.attempt
                    : runtime.attempt;
                const preceding = priorAttempts.get(match.work_item_id);
                if (preceding !== undefined && attempt !== preceding + 1) return false;
                active = {
                  id: match.work_item_id,
                  claim: match.claim_id!,
                  attempt,
                  stop,
                  phase: "begin",
                };
                break;
              }
              case "begin": {
                active!.phase = "result";
                active!.issuedRevision = event.task_revision;
                active!.issuedFingerprint = fingerprint;

                break;
              }
              case "block": {
                const retained = active!.stop;
                const issued = retained?.order.canonical_binding;
                if (
                  !retained ||
                  issued?.phase !== "implementation" ||
                  active!.phase !== "result" ||
                  retained.order.task.revision !== active!.issuedRevision ||
                  issued.repository_fingerprint !== active!.issuedFingerprint ||
                  issued.plan_revision !== plan.revision ||
                  issued.plan_digest !== plan.digest ||
                  issued.contract_digest !== definition.contract_digest ||
                  issued.claim_id !== active!.claim ||
                  issued.attempt !== active!.attempt ||
                  k.kernelDigest(retained.command) !== k.kernelDigest(command)
                )
                  return false;
                priorAttempts.set(active!.id, active!.attempt);
                blocked = { id: active!.id, attempt: active!.attempt, definition };
                active = null;
                break;
              }
              case "inspect": {
                active!.phase = "validation";
                break;
              }
              default: {
                if (
                  event.mutation_id !==
                  `validation-resolution:${k.kernelDigest(runtime.validation)}`
                )
                  return false;
                completed.add(match.work_item_id);
                active = null;
              }
            }
          }

          break;
        }
        case "work_item_result_accepted":
        case "work_item_validation_recorded": {
          if (!active) return false;
          const validation = event.kind === "work_item_validation_recorded";
          if (active.phase !== (validation ? "validation" : "result")) return false;
          const prefix = validation ? "validation:" : "result:";
          const id = event.mutation_id.slice(prefix.length);
          if (!event.mutation_id.startsWith(prefix) || !/^sha256:[a-f0-9]{64}$/u.test(id))
            return false;
          const source = path.join(path.dirname(directory), id.slice(7));
          const retained = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
            await read(source, "work-order.json"),
          );
          const issued = retained.canonical_binding;
          const runtime = record.aggregate.work_items[active.id]!;
          const expectedPhase = validation ? "inspection" : "implementation";
          if (!issued) return false;
          if (
            issued.phase !== expectedPhase ||
            retained.work_order_id !== id ||
            retained.task.revision !== (validation ? cursor : active.issuedRevision) ||
            issued.repository_fingerprint !==
              (validation ? fingerprint : active.issuedFingerprint) ||
            issued.task_id !== binding.task_id ||
            issued.repository_identity !== binding.repository_identity ||
            issued.plan_revision !== plan.revision ||
            issued.plan_digest !== plan.digest ||
            issued.work_item_id !== active.id ||
            issued.claim_id !== active.claim ||
            issued.attempt !== active.attempt ||
            issued.contract_digest !== runtime.definition.contract_digest
          )
            return false;
          const saved = await read(
            source,
            validation ? "validation-command.json" : "command-input.json",
          );
          if (!isRecord(saved) || !isRecord(saved.command)) return false;
          command = saved.command as k.TaskCommand;
          if (
            command.task_id !== binding.task_id ||
            command.expected_task_revision !== cursor ||
            command.expected_state_fingerprint !== fingerprint
          )
            return false;
          if (validation) {
            if (
              command.kind !== "record_work_item_validation" ||
              command.work_item_id !== active.id ||
              issued.phase !== "inspection" ||
              issued.result_digest !== runtime.result_digest ||
              issued.repository_fingerprint !== fingerprint ||
              k.kernelDigest(command.validation) !== k.kernelDigest(runtime.validation) ||
              command.validation.identity.implementation_identity !== runtime.result_digest
            )
              return false;
            const review = await read(source, "inspection-result.json");
            const evidence = await read(source, "validation.json");
            if (
              !isRecord(review) ||
              !isRecord(review.review) ||
              review.review.verdict !== "pass" ||
              review.work_order_id !== id ||
              k.kernelDigest(review.canonical_binding) !== k.kernelDigest(issued) ||
              !isRecord(evidence) ||
              evidence.status !== "PASSED" ||
              evidence.task_id !== binding.task_id ||
              evidence.work_item_id !== active.id ||
              evidence.attempt !== active.attempt ||
              evidence.contract_digest !== issued.contract_digest ||
              evidence.result_digest !== runtime.result_digest ||
              evidence.repository_fingerprint !== fingerprint ||
              evidence.review_digest !== k.kernelDigest(review) ||
              !command.validation.evidence_digests.includes(k.kernelDigest(review))
            )
              return false;
            let nativeFound = false;
            for (const name of await readdir(active.directory!)) {
              if (!/^native-validation-[a-f0-9]{64}\.json$/u.test(name)) continue;
              const native = await read(active.directory!, name);
              if (
                k.kernelDigest(native) === evidence.native_evidence_digest &&
                command.validation.evidence_digests.includes(k.kernelDigest(native)) &&
                isRecord(native) &&
                isRecord(native.input) &&
                isRecord(native.checks) &&
                native.checks.status === "passed" &&
                native.input.task_id === binding.task_id &&
                native.input.work_item_id === active.id &&
                native.input.result_digest === runtime.result_digest &&
                native.input.repository_fingerprint === fingerprint &&
                k.kernelDigest(native.checks) === k.kernelDigest(evidence.checks)
              )
                nativeFound = true;
            }
            if (!nativeFound) return false;
            active.phase = "complete";
          } else {
            if (
              command.kind !== "accept_work_item_result" ||
              command.work_item_id !== active.id ||
              command.plan_revision !== plan.revision ||
              command.plan_digest !== plan.digest ||
              command.result_digest !== runtime.result_digest ||
              k.kernelDigest(command.output_manifests) !==
                k.kernelDigest(runtime.output_manifests) ||
              runtime.definition.expected_outputs.some(
                (output) => !runtime.output_manifests.some((entry) => entry.id === output),
              ) ||
              runtime.output_manifests.some(
                (entry) =>
                  entry.task_id !== binding.task_id ||
                  entry.plan_revision !== plan.revision ||
                  entry.work_item_id !== active!.id ||
                  entry.attempt !== active!.attempt ||
                  entry.repository_fingerprint !== fingerprint,
              )
            )
              return false;
            const {
              phase: _phase,
              repository_identity: _repository,
              authority_digest: _authority,
              ...workBinding
            } = issued;
            const bindingDigest = k.kernelDigest(workBinding);
            if (command.binding_digest !== undefined && command.binding_digest !== bindingDigest)
              return false;
            command = { ...command, binding_digest: bindingDigest };
            const semantic = await read(source, "received-result.json");
            if (
              !isRecord(semantic) ||
              k.kernelDigest(semantic) !== runtime.result_digest ||
              k.kernelDigest(semantic.canonical_binding) !== k.kernelDigest(issued)
            )
              return false;
            active.directory = source;
            active.phase = "inspect";
          }

          break;
        }
        default: {
          return false;
        }
      }
      if (!authentic(record, event, command)) return false;
      cursor = event.task_revision;
    }
    return (
      !active &&
      !blocked &&
      !awaitingAmendment &&
      plan.digest === history.current.digest &&
      targetClaimed &&
      cursor === record.aggregate.revision &&
      fingerprint === binding.repository_fingerprint &&
      authority.authority.digest === lineage.at(-1)?.authority.digest
    );
  } catch {
    return false;
  }
}
