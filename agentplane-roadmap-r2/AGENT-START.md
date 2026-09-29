# Agentplane revision 2 — execution brief

This is a planning document, not a runtime configuration or permission to spend, publish or migrate. Execute only the delegated task card. Do not load all other cards into the model context.

## Start from the actual source

Review baseline: `50b1810dda648be0c0762b47e885c6ad0b2d42af`, package `0.7.9-beta.1`. Inspect the real current HEAD/status and the relevant source diff; do not reset the repository to this baseline. Use the current repository policy and its pinned Node/Bun. The inspected root has Node >=24, Bun 1.4.2 and the `test:project` script.

Read your `tasks/<ID>.md`, its cited source files, and the accepted evidence for its dependency IDs. An already implemented behavior is verified and marked `already_satisfied`; it is not implemented again. Proposed `roadmap-*.test.ts` paths are test targets to add or replace with equivalent existing coverage, not existing tests whose execution is being claimed.

For architecture/identity changes read `EXECUTION-CHARTER.md` sections 3–4. For any migration, schema/authority or compatibility change also read section 5. For provider measurements or optional-stage activation read section 7 and the relevant experiment definition. The complete catalogue and source register are available for lookup, not mandatory repeated prompt material.

## Release boundary

- **0.7.9:** bounded correctness and durable measurement; existing lifecycle/stages and Blueprint writers stay.
- **0.7.10:** retire Blueprint from active runtime and prompts; preserve current planning/review requirements. Recipe V2 and lifecycle-owner convergence are not prerequisites.
- **0.7.11:** keep Task Kernel as the sole domain reducer; route ordinary, Recipe V1, managed and external paths through one application coordinator; delete every superseded execution path after exact conversion. No optional stages yet.
- **0.7.12:** sufficient existing compact Plan input can avoid a separate PLANNER. Actual approval remains. Managed required read-only planning can remove external forwarding.
- **0.7.13:** Scenario V2 compiles a pinned reusable strategy into the Kernel-owned Plan; no recipe scheduler/state machine.
- **0.7.14:** optional JEV is an application-layer DecisionProvider with purpose-specific off/shadow/active policy. Retrieval and model/effort routing may activate only after their own qualification. Context, planning and Recipe decisions start shadow-only. Native-proof and JEV evaluator omission use separate quality, false-skip and economic gates; unknown/general coding cases retain review.

## One set of owners

Task owns objective/identity; Recipe Scenario owns reusable strategy/assets; Plan owns concrete scope, work graph, outputs, acceptance and verification intent. Trusted policy and issued USER authority own permission and mandatory floors. Task Kernel is the sole domain owner of accepted lifecycle state; the common coordinator invokes it without owning parallel state. The existing journal owns operation intent/receipts/uncertainty. WorkOrder is a role-specific projection, not a second Plan. Verification records contain observed results and their material input identity.

The .11 target is Task Kernel as the sole pure reducer and aggregate plus one coordinator extracted from the mature ordinary route/effect path. Preserve Kernel invariants and move context, verification, recovery and effects around it; do not retain the ordinary reducer, a kernel-specific outer loop or the extra `TaskCentricOrchestrator` as competing engines. LC-01 validates the concrete owner map before cutover.

Deterministic code decides only exact formal facts. If real interpretation of intent, custom semantics, applicability, sufficiency or quality is required, issue one bounded agent WorkOrder and validate its typed result deterministically. Do not approximate semantic equivalence with heuristics, and do not dispatch an agent for a mechanically decidable transition.

For one supported operation keep one production use case and one effect owner. After convergence, delete every secondary dispatcher, reducer, reverse synchronization path, dead export, retired flag and dependency with no named current consumer. Keep only the canonical Kernel, required pure primitives, cold migration/audit decoders and historical evidence interpretation.

Reuse compact TaskPlanProposal input V2 already in core. Reuse the existing task_verification_input family (v4 at this baseline; version only the necessary change). Do not create parallel InlineTaskContract, VerificationBinding V2 or persisted ProcessDecision state. Policy/route decisions are pure projections; a minimal reason/input reference can be retained in existing accepted evidence where necessary.

## Invariants that cannot be traded for speed

**I01–I03:** One accepted application per operation identity; no second unreconciled non-idempotent launch. Authority comes only from trusted policy and real USER grants, never model/Recipe metadata. Preserve exact Task/Plan/WorkItem/attempt/claim/WorkOrder admission and reject stale/unknown/unsafe inputs before effects.

**I04–I06:** Claimed checks are not observed verification. Preserve real reviewer independence where required. Keep accepted semantic work through infrastructure retry and reconcile uncertain effects. Required objective/scope/outputs/checks/stops cannot disappear through prompt filtering or budget limits.

**I07–I09:** Separate current admission revision from checked-content identity and current evidence sufficiency. Writing a receipt must not invalidate its own observation. Count every role/attempt/failure; missing usage is not zero and cached/reasoning tokens can be subsets. Retain required evidence bytes or deliberately reachable immutable objects; do not add no-information files/commits.

**I10–I12:** Hashing, identity reconstruction, routing and mechanical transitions belong to CLI. No selector-only model episode. Keep release-specific stage floors; no generic waiver. Do not exceed task authority, run paid experiments, publish or rewrite historical evidence without explicit authorization.

## Migration and deletion

Preview exists before cutover. Local read-only Git is allowed; models, checks, installs, Git mutations and external effects are not preview work. Apply uses the same admission fence as managed/external work, result acceptance and integration, not only Task-record CAS. An outstanding external WorkOrder matters even without a local PID. A new fence cannot restrain a nonparticipating old binary: quiesce/reconcile it first, or block migration.

Preserve old evidence bytes and original interpretation. Convert exact mappings deterministically. When structurally valid custom semantics genuinely require interpretation, request one bounded agent assessment bound to the retained source bytes; never substitute a nearest route. Integrity, authority, stale-state and unresolved-effect failures remain hard blockers. Quarantine blocks new effects but retains inspect/export and an explicit resolution/drain path. After an incompatible write, changing the executable back is not a qualified downgrade.

Move consumers/public command callers and isolate cold audit decoders before deleting the engine they import. Delete replaced runtime code promptly. No hidden legacy executor behind a flag; only named necessary pure primitives and cold readers remain.

## Complete one work item

Make the card's one scoped change, its focused regression and permitted associated deletion. Do not bundle unrelated cleanup. Run the listed focused test with a nonzero discovered count, relevant existing critical suites, typecheck and schema/mirror checks. Record accepted evidence once in the existing Task/verification mechanism.

An atomic card is not a mandatory new top-level Task, PR or paid episode. Compatible adjacent WorkItems may share a scoped PR if separate review/evidence and current policy are preserved. Do not weaken an oracle, authority rule or expected negative result to make the candidate pass.

Quality/safety completion is not proof of efficiency. Provider measurements need a pinned operator-approved campaign, all-attempt cost and the same independent final oracle. For optional EVALUATOR, implement/test an inactive candidate, qualify it independently, measure benefit, and only then activate the exact rule. Inconclusive evidence means review stays required.
