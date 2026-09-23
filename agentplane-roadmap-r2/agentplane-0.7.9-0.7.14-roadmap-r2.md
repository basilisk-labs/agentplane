# Agentplane architecture roadmap — revision 2

Status: **proposed, dependency-ordered task contracts; no code or repository state changed**.
Date: 2026-09-12.
Reviewed product source: `main@50b1810dda648be0c0762b47e885c6ad0b2d42af`, package `0.7.9-beta.1`. [S18]
Replaces: `v0.7.9-v0.7.10-architecture-roadmap.md` (the supplied 770-line roadmap).
Primary goal: **lower total cost per equivalently verified result**, subject to unchanged or stronger authority, correctness, provenance, stale-state and recovery guarantees.

## 1. Release decision

| Release | One principal delivery goal                                                                                                 | Explicitly not included                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 0.7.9   | Bounded correctness, durable usage, comparable fixtures and baseline                                                        | No new lifecycle owner, adaptive shadow feature, stage omission or Blueprint shutdown |
| 0.7.10  | Remove Blueprint from active execution and model context                                                                    | No optional PLANNER/EVALUATOR; no Scenario V2; no wholesale lifecycle-owner migration |
| 0.7.11  | Keep Task Kernel as the sole domain owner; converge ordinary, managed and Recipe entrypoints on one application coordinator | No optional stages or Recipe V2; no new scheduler or second reducer                   |
| 0.7.12  | Accept sufficient existing Plan input without a separate PLANNER; remove managed planning forwarding                        | EVALUATOR stays required under the current policy                                     |
| 0.7.13  | Scenario V2 reusable strategies compiled to the Kernel-owned Plan                                                           | No Recipe workflow engine, automatic recipe publication or generalized task memory    |
| 0.7.14  | Narrow, independently qualified EVALUATOR omission                                                                          | No general low-risk classifier, no generic waiver, no broad review disabling          |

The extra release between Blueprint removal and adaptive planning is deliberate. Current `run` and `advance` have separate ordinary/kernel paths; changing both ownership and stage requirements in one patch would make failures difficult to attribute. [S01][S02] A .10 deletion release can preserve the existing execution paths while moving their obligations out of Blueprint. The .11 release then deletes superseded executable paths, rather than teaching each of them adaptive behavior.

The version numbers are delivery labels requested for the 0.7 line, **not a claim of automatic backward or downgrade compatibility**. New-format writes and retired public surfaces require the explicit contract below. A release owner must acknowledge any declared incompatibility before shipping; the coding agent may not silently relabel a breaking write as a harmless patch.

No later feature is a dependency of an earlier release. Recipe V2 does not block Blueprint deletion. Optional EVALUATOR does not block planning reuse or recipes. If .14 quality or economic qualification fails, keep review required and do not ship an indefinite dormant policy subsystem.

## 2. Evidence boundary: current code versus this proposal

This revision uses the supplied roadmap, the preceding audit findings and the source files listed in the evidence register. The head lock was checked through the GitHub connector. The following are source observations, not benchmark conclusions:

- Current `task run` selects `runCanonicalTask` by `TASK_KERNEL_EXTENSION`, otherwise direct/branch supervisors. `task advance` also has separate kernel handling; that branch rejects ordinary integration-supervisor recovery/replacement commands. [S01][S02]
- The ordinary task-centric package already has a compact Plan proposal input (schema version 2) normalized to its existing persisted proposal. Task identity and planning baseline are supplied by the supervisor. **Do not introduce a parallel InlineTaskContract schema.** [S03]
- The current kernel execution shell lacks CURATOR in its role enum, and native checks are entered from inspection acceptance. These are application/adaptation gaps, not evidence that the pure Kernel reducer is the wrong domain owner. Connect the mature context, verification, recovery and effect capabilities through the common coordinator; do not duplicate them inside a second kernel-specific outer loop. [S04][S05]
- Verification input versions 2/3/4, material input identities and current/equivalent-input assessment already exist. **Do not create a second VerificationBinding V2 family.** Extend the existing family only where the retirement map proves a missing identity. [S12][S13][S14]
- Blueprint is still consumed by finish and quality admission; deleting snapshots first would drop or break enforced obligations. [S06][S07]
- Recipes already contain scenarios, assets and validators; Scenario V1 inputs/outputs/steps are not fully typed. **Formalize the existing Scenario**, rather than adding another top-level recipe runtime. [S09][S10]
- The task-centric library already exports graph, lifecycle, refinement and orchestration APIs. The additional `TaskCentricOrchestrator` class must be included in the owner inventory, not automatically adopted because its name sounds canonical. [S15][S16]
- A recent committed task reports 13 agent runs with zero observed usage runs and unavailable token totals. This is one source-bound example of incomplete accounting, not a measurement of how frequently it occurs. Its corrected supervisor-authored rework behavior is already noted; do not reimplement the same fix. [S17]

The earlier benchmark evidence in the discussion does not prove a current efficiency delta. Historical RF-04, VN1FN4/SRM6JM/P1MJV7/ZYASFT evidence must retain its original SHA, runtime, coverage and meaning. Local bytes, call counts and fake-provider tests remain proxies or structural evidence.

**Not performed in this document revision:** full-repository clone/build, fresh product executions, paid provider calls, live backend/provider integration tests, or a complete import census. Network/runtime limitations prevented local product execution. The original counts of 41 Blueprint files/189 related TypeScript files were not independently remeasured. ST-01 establishes the executable inventory before implementation. Referenced companion proposals are not silently treated as already implemented APIs.

## 3. Target ownership and simplification rules

```text
intent / supplied compact Plan / optional pinned Recipe
                         |
                         v
       Task + Kernel-owned task-specific Plan
                         |
              real policy/USER approval
                         |
                         v
 existing native obligation and route resolution
                         |
                         v
 one Kernel-backed advance/admission/completion implementation
       |                 |                   |
 native checks     semantic WorkOrder    Git/provider effects
       |                 |                   |
       +---- observed results and durable receipts ----+
                         |
               verified result -> closure
```

**Task** owns objective and lifecycle identity. **Recipe Scenario** owns reusable strategy and immutable referenced assets, never live task progress. **Plan** owns concrete scope, WorkItems, dependencies, outputs, criteria and verification intent. **Trusted repository policy plus issued USER authority** own mandatory constraints and permission. **Task Kernel** is the sole domain owner of accepted Plan/WorkItem/lifecycle state and legal transitions. **The common application coordinator** invokes the Kernel and owns no competing lifecycle state. **The existing execution journal** owns operation intent, claims, receipts and unresolved effects. **WorkOrder** is a derived, role/transition-specific semantic request. **Verification evidence** records independently observed checks against material input identities.

### 3.1 Concrete convergence choice, not an open-ended rewrite

The selected .11 spine is **Task Kernel as the sole pure domain reducer and aggregate + one application coordinator extracted from the mature ordinary advance route/effect path**. The coordinator sends typed commands to the Kernel and performs persistence, context preparation, verification, recovery and Git/provider effects through existing single-purpose operations. It MUST NOT mutate lifecycle state through a parallel task-centric reducer or compatibility projection. Direct and branch_pr remain repository-effect policies, not competing semantic lifecycles. Managed/external remain transports.

This choice preserves the reason the Kernel was introduced: immutable input, explicit identity/time/authority, typed events or rejection, and no filesystem, Git, process, provider or projection dependencies. Application capabilities missing from the current kernel-specific shell move around the Kernel into the common coordinator; they are not reasons to restore a legacy aggregate as canonical. LC-01 must inventory every current writer, dispatcher, scheduler and effect owner before cutover. Any Kernel invariant or production capability that cannot be represented is a concrete blocking counterexample requiring reviewed amendment before irreversible cutover.

### 3.1.1 Formal facts and semantic judgment

Deterministic code decides only facts it can prove from typed structure and exact observations: schema/version, hashes, revisions, identities, bindings, DAG validity, authority, byte preservation, operation state and source/policy drift. It MUST NOT approximate semantic equivalence with names, heuristics, similarity scores or permissive fallbacks.

When a supported operation requires real interpretation of intent, custom steps, applicability, sufficiency or quality, issue one bounded semantic WorkOrder to the appropriate agent. The agent returns a typed judgment and evidence; the control plane validates its binding, authority, freshness and structural completeness before applying it. If exact formal mapping is sufficient, dispatch no agent. Integrity failures, stale bindings, unresolved effects and missing authority remain hard deterministic blockers that an agent cannot override.

### 3.1.2 One action, one production implementation

For one supported user operation there is exactly one production use case and one effect owner. CLI, managed, external, direct, branch and Recipe entrypoints adapt to that use case instead of reimplementing it. Internal pure helpers remain focused and composable, but a second reducer, reverse synchronization path, live compatibility engine, selector episode or wrapper-owned lifecycle decision is forbidden. If one operation can be completed through the canonical use case, every supported entrypoint MUST use it.

### 3.2 No persisted replacement Blueprint

`ProcessDecision` is retained only as an explanatory name for a **pure existing policy/route projection**, if a name is useful. It has no aggregate, graph, cursor, scheduler, approvals, independent revision stream or live execution authority. Persist a minimal rule/input reference only when needed to explain an accepted operation, in the existing receipt/record. Identical recomputation produces no Task mutation or commit. Before a Plan exists, the resolver uses intent/supplied-contract inputs with Plan absent; it can then re-evaluate the ordinary approved Plan. There is no Plan-before-planning circular dependency.

Mandatory policy must work without a Recipe. A Recipe may request extra checks/context or stronger restrictions; it cannot grant effects, fabricate evidence or turn a required independent review into optional review. Domain WorkItem dependencies are legitimate Plan structure. Administrative nodes such as approve/publish/finish must not reappear as a Recipe state machine.

### 3.3 Separate the three identity questions

1. **May this result/effect be admitted now?** Check current Task revision, operation/claim, issued WorkOrder, authority and repository preconditions. This remains exact.
2. **What bytes and execution inputs did this check observe?** Use implementation/content, command, toolchain, relevant configuration/environment and retained evidence identity. Do not use the entire mutable Task record or report timestamps as a cache key.
3. **Is this evidence sufficient for current completion obligations?** Check Plan/criteria/required checks, policy and required review. A policy change can make an old observation insufficient without falsifying its historical result.

A receipt write, display refresh or accepted-verdict recording must not invalidate the evidence it just persisted. This does not permit rebinding unaccepted old results or using an unchanged SHA as universal proof of equivalent check inputs. Environment secrets must not be stored or exposed as guessable secret hashes; use permitted non-secret input identities and opaque versioned references, or mark equivalence unproven.

### 3.4 Atomicity is not a requirement to buy one model episode per step

A task below is one independently reviewable implementation outcome plus its tests. It is **not** an instruction to create 119 top-level Agentplane Tasks, 119 planning sessions or 119 PRs. Use these IDs as WorkItems in a suitably scoped approved plan. Adjacent compatible changes can share a PR only if their diffs and acceptance evidence remain separately reviewable and current review/authority policy permits it. Never bundle independent behavior changes merely to hide a failing gate. Never split a fix from its regression into a deliberately broken main commit.

The catalogue is a planning artifact, not a new product-state registry. Record acceptance evidence once through existing Task/verification/journal mechanisms and refer to it by ID/digest; do not generate a second full audit tree per checklist row.

## 4. Safety invariants (I01–I12)

**I01 — One owner.** One accepted lifecycle application per operation identity and no second unreconciled launch of the same non-idempotent effect. Confirmed no-effect retries have explicit attempt identity and existing budget/authority checks. During migration, old/new owners never dual-execute; accepted semantic work is not replayed.

**I02 — Authority.** Only trusted policy and issued USER approval authorize effects. Recipe, model result, task-worktree configuration, compatibility alias or telemetry cannot grant permission.

**I03 — Exact admission.** Preserve task/Plan/WorkItem/attempt/claim/authority and current issued WorkOrder bindings. Unknown schemas, stale results and unsafe adapters fail closed before effects.

**I04 — Independent observation.** Claimed checks, missing evidence and generated reports are not independently observed verification. Required review preserves real reviewer independence.

**I05 — Recovery.** Persist intent before a non-idempotent effect; preserve completed semantic work across infrastructure failures. An uncertain effect is reconciled, not repeated. Semantic rework and infrastructure retry consume distinct appropriate budgets.

**I06 — Requirement conservation.** Required objective, scope, outputs, acceptance, verification and stops survive all projections. Budget or choreography filtering never silently removes them.

**I07 — Material freshness.** Preserve immutable evidence only at proven equivalent input identity. Exclude only recognized generated metadata from implementation equivalence, never arbitrary paths under `.agentplane/`; renamed/source files cannot masquerade as metadata.

**I08 — Honest accounting.** Count all roles, attempts and billable failures. Distinguish semantic episodes, dispatches, provider turns/requests and agent tool calls. Missing cost is not zero; cached/reasoning subsets are not added twice.

**I09 — Durable minimal evidence.** Retain required source bytes or reachable immutable objects, not just unrecoverable digests. No timestamp-only canonical commits, no new Blueprint artifacts after .10, no duplicate generated state without a named consumer.

**I10 — Correct cognitive boundary.** Exact comparison, hashes, schema binding, result routing, lifecycle transitions and replay handling are control-plane responsibilities. Real semantic interpretation is agent work when required and is never approximated by deterministic heuristics. No selector episode or model step is added for a formally decidable transition.

**I11 — Stable verification contract.** Preserve current stage requirements through .11; .12/.13 may omit only a separate planning episode under their specified policy. .14 review omission requires independent quality and benefit qualification. No general waiver capability is introduced.

**I12 — Honest scope.** No code changes by the document author; implementation starts only on the delegated task. No unauthorized provider spend, network effects, publication, migration, force reset or historical rewrite.

## 5. Compatibility, migration and deletion contract (C01–C08)

**C01 — Rebase knowledge, not the repository.** At task start inspect the real current HEAD and status. Never reset to this review SHA. Read the pinned source and diff it against current code. If the exact behavior is already implemented, verify it and record `already_satisfied` with evidence instead of adding a duplicate. If a required area moved, update its ledger location before implementation; do not infer missing semantics.

**C02 — Read before write.** Introduce a strict new-format reader and explicit unsupported-version errors before its producer. Add equivalent consumer before deleting the old producer. Dual writing, when needed, is temporary and has a named removal ID; never dual-execute providers or effects.

**C03 — Preview before default cutover.** .10 retirement preview exists before .10 new issuance; .11 legacy/parallel-owner migration preview exists before the Kernel-backed entrypoint cutover. Formal preview permits local read-only Git with inherited hooks/config/network isolated. It performs no shell checks, model/provider invocation, install, Git mutation, task write or external effect. A separate bounded semantic assessment may be requested only when exact formal mapping cannot settle a genuinely semantic question.

**C04 — Shared admission fence.** Migration checks and commit are serialized with managed launch, external WorkOrder issuance/return, native result acceptance, lease acquisition and provider/integration admission. Include outstanding external work even without a local PID. Task CAS alone is insufficient if claims or journals can change outside it. Recheck under the fence; a losing/stale cooperating worker cannot write under old ownership. A new fence cannot retroactively restrain an already-running pre-fence binary: require demonstrated quiescence and effect reconciliation for such runtimes before cutover, and block if that cannot be established. Retained old runtime drainage occurs before migration, not concurrently with the new owner.

**C05 — Quiescence, formal mapping and semantic assessment.** Terminal data is preserved; quiescent exactly mapped tasks migrate without an agent. Live/pending/in-doubt work must finish or reconcile on its pinned old runtime before conversion. When structurally valid custom semantics require interpretation, a bound agent may return a typed mapping, blocker or context request over the preserved source bytes. The control plane applies only a fresh, complete, authority-valid result. No nearest Recipe/route fallback, inferred approval, fabricated check, heuristic semantic equivalence or rewritten historical verdict.

**C06 — Quarantine is not a semantic classifier.** Quarantine disables new effects, not inspect/export or explicit authorized resolution. Enter it for a hard formal blocker or while a required semantic assessment remains unresolved; do not treat control-plane inability to interpret meaning as a final semantic verdict. Give the exact blocker, retained source identities and supported agent-assisted or formal drain/conversion procedure. Do not run an old live engine on the new hot path to make quarantine look supported.

**C07 — Downgrade and public API.** Before the first incompatible write, code rollback is ordinary candidate rollback. After it, use the declared old-format export/qualified reverse conversion or a retained prior checkout for unmigrated tasks; never merely reset the executable. Retired Blueprint/engine mutation APIs get a documented replacement or explicit incompatibility. Thin read-only diagnostic aliases may remain for a declared window; full old executors may not.

**C08 — Maximum proven deletion.** Blueprint live resolver/graph/cursor/writers/extensions are removed in .10 after consumer transfer. Superseded ordinary/direct/branch/kernel-specific execution loops, parallel reducers, dispatch flags, reverse synchronization, dead exports and path-only dependencies are removed in .11 after qualified Kernel-backed convergence. Keep the canonical Kernel reducer, required pure shared primitives and cold versioned audit/migration decoders. Every retained public export has a named current consumer; hypothetical future use is not retention evidence.

### 5.1 Deletion ownership ledger

| Existing responsibility                                                | Target                                                             | Removal step         | Retention exception                                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------- |
| Blueprint route selection                                              | Existing native task-routing policy                                | BP-02, BP-25         | Versioned source bytes for audit                            |
| Blueprint policy/capability/context propagation                        | Existing policy/capability/WorkOrder projection                    | BP-03..05, BP-23     | Required historical source payloads                         |
| Protected graph gates and stop rules                                   | Native admission/completion and concrete Plan obligations          | BP-06..08            | Original evidence interpretation                            |
| Recipe Blueprint extension resolver                                    | Existing V1 overlay/guidance conversion; V2 later                  | BP-09..11, BP-25     | Offline unsupported-conversion report                       |
| Snapshot/plan/state/cursor/markers                                     | Existing structured binding/receipts and derived views             | BP-12..18, BP-24..27 | Cold audit decoder only                                     |
| Ordinary/direct/branch outer lifecycle loops                           | One Kernel-backed coordinator + single-purpose effects             | LC-03..12, LC-18     | No live fallback                                            |
| Kernel-specific outer execution shell                                  | Common coordinator invoking the canonical Kernel reducer           | LC-13..19            | Cold codec/receipt mapping                                  |
| Parallel task-centric reducer or generic orchestration                 | Canonical Kernel reducer; retain only used graph/policy primitives | LC-01, LC-02, LC-19  | A documented supported pure export, not a second dispatcher |
| Separate inline contract / VerificationBinding / ProcessDecision state | Do not create                                                      | PL-01..03, BP-12     | None                                                        |

## 6. Agent execution protocol

Read this charter, the specific task card, its cited source files and dependency acceptance evidence. The `code_areas` list is a bounded starting surface, not evidence that every proposed filename already exists. Exact inspected paths are in the source register; new targets are labelled. ST-01/LC-01 resolve remaining caller locations before a behavior change. The agent must not turn an unresolved caller map into a repository-wide opportunistic cleanup.

Use the current repository policy and its pinned Node/Bun toolchain. The inspected root declares Node >=24, Bun 1.4.2 and `test:project`. [S19] New `roadmap-*.test.ts` and script test paths in cards are **proposed test targets**, not claims that those files already exist. Reuse an equivalent existing file where appropriate and update the evidence ledger. Confirm test discovery and a nonzero executed count; a command that selects zero tests is not acceptance.

For each task: identify the one intended externally observable or source-ownership change; add focused positive/negative regression coverage with the implementation; remove the superseded code in that same scoped change when consumers permit; run the listed focused test plus relevant existing suites, typecheck and generated mirror checks. Register new critical tests with the existing release-critical route rather than creating a new testing framework. Build/install qualification tasks do not replace focused tests.

Do not independently alter a frozen oracle, expected authority, missing-usage semantics, or approved scope to make tests green. Escalate with a minimal counterexample and exact missing invariant when an atomic task cannot meet its acceptance in the bounded surface. Decompose an overlarge discovered change before implementation; do not hide it behind `misc cleanup` or `follow-up refactor`. New task IDs must update the dependency/coverage manifest and rerun its validator.

Independence means the diff can be reviewed and tested as one change. It does not mean it has no predecessors. Pure, unrelated task surfaces may proceed in parallel after prerequisites; tasks touching the same admission/fingerprint/Plan/verification/journal contract serialize. Release cuts are explicit barriers even if design-only work for later releases proceeds separately. No later feature may leak into an earlier release under a flag as a prerequisite.

Paid measurement tasks remain `blocked_on_authority` until USER approves the exact campaign, runtime/sandbox, network scope and budget. Do not infer spend permission from a task ID, document, signed-looking payload or installed provider account. Lack of authority is not zero cost and is not a successful measurement.

## 7. Verification and efficiency gates

### Q00 — Functional and safety gate (every release)

The installed exact-SHA artifact passes current positive/negative/recovery/backend-port suites; required original semantic work and review obligations are conserved for the release scope. Migration race tests have at most one accepted writer/effect. Unsupported versions/adapters/backends stop before mutation. Required retained bytes resolve offline. .10 adds zero-Blueprint-engine/artifact gates; .11 adds single-owner gates. There is no allowed nonzero threshold for accepted authority, stale-result or blind-replay violations in this corpus.

Passing fake-provider tests establishes protocol/control-plane invariants, not provider quality or token savings. Live remote adapter coverage must be labelled separately from fake-port coverage. A new adapter or backend cannot claim support solely from generic tests.

### Q01 — Optional-review quality activation gate (only .14)

A specific rule and verifier capability must have a bound independently reviewed qualification: positive native proof, exact class and exclusions, false-eligibility negatives, frozen independent oracle, matched review-required comparison, reproducible source/runtime and uncertainty policy. Unknown applicability, stale proof, changed rule/verifier/trust or inconclusive quality evidence means **review required**. Qualification of one exact-output artifact class is not qualification of code refactoring, generated contracts or semantic edits. Tests whose checks merely share criterion labels do not prove semantic coverage.

No independent-EVALUATOR omission is enabled in production before this gate. Implement and install-test the inactive candidate first (EV-08..11), then run the preregistered study (EV-07). The optional branch may be exercised under explicitly operator-authorized isolated qualification policy; ordinary production policy remains review-required until EV-13. Do not mistake quality-before-activation for an impossible requirement to measure code before it exists.

### Q02 — Efficiency claim gate

Measure total cost per equivalently verified outcome, not only successful-run means. Primary campaign metric: all assigned attempts' observed cost divided by independently verified successes; a zero-success arm has no finite successful-result cost. Also report matched pairs that both meet the same oracle, but do not discard other attempts from campaign cost. Report success rates, uncertainty and per-workflow strata.

Provider cost requires the provider's actual usage semantics and, for monetary claims, a pinned applicable rate/cost basis. Cache and reasoning may be subsets. Missing/partial/unattributable host usage prevents a complete numeric claim unless a defensible bounded result is possible; no token estimates from bytes. Capture model/reasoning effort requested and actually observed, not an unverified default.

Report intent-to-first-scoped-mutation, intent-to-verified-result and closure separately. Partition preparation, model/provider, checks, Git/filesystem, USER waiting and external waiting with no overlapping-span double count. Include host work constructing an inline Plan and provider retries/rework. Recipe authoring/setup and study-only verifier work are transparent separate costs; do not attribute them inconsistently across arms.

Suggested regression policy, to ratify before live campaigns: no structural increase in redundant semantic replay; for cost and active verified-result time, flag an upper paired uncertainty bound above 1.05 versus the previous qualified release, per workflow as well as in aggregate. The 5% margin is a proposed tolerance, not an observed effect. A pilot too small to bound the effect yields NOT ESTABLISHED, not automatic pass. A NET POSITIVE claim versus minimal control requires supported reduction in the preregistered cost/time objectives without a quality/safety regression; mixed trade-offs remain MIXED.

A correctness/deletion release can have Q00=pass and Q02=NOT ESTABLISHED only with explicit release-owner acceptance of measurement debt; it is **not efficiency-qualified**. No such override can activate optional independent review. EV-13 requires both Q01 and a supported net benefit for the target class. If no benefit is demonstrated, do not retain the optional mechanism solely because it was implemented.

### 7.1 Experiment sequence

| ID  | Subject comparison                                                               | Required constant                                                           | Purpose                                     |
| --- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| M01 | Minimal agent / v0.7.8 / exact .9 candidate                                      | Target starting tree, objective, model/effort, authority, oracle, retry cap | Establish real control and product baseline |
| M02 | Exact .9 / .10                                                                   | Same required PLANNER/EVALUATOR and Recipe V1 behavior                      | Isolate Blueprint retirement                |
| M03 | Exact .10 / .11                                                                  | Same stages and final oracle                                                | Isolate lifecycle convergence               |
| M04 | Planning paths with/without separate PLANNER; managed bridge comparison separate | Complete host work accounting; same approval/review                         | Attribute planning savings honestly         |
| M05 | Same product no-Recipe / instantiate / specialize, plus no-/near-match           | Same policy, target and final oracle                                        | Measure reusable strategy benefit           |
| M06 | Required-review comparator / isolated narrow omission, independent oracle        | Fixed rule/class/verifier and acceptance                                    | Qualify quality before activation           |
| M07 | Same product required review / qualified omission                                | Equivalent independently verified result and authority                      | Verify economic benefit before activation   |

Minimal initial coding corpus: small direct fix, medium branch_pr change, and a recoverable check failure/rework case. Start with at least five matched randomized repetitions per task/arm; this is a pilot, not broad qualification. Keep recovery/negative cases distinct from normal-workload averages. Use the pilot to choose a fixed independent confirmation sample and register that sample before running it; do not keep sampling until favorable. Keep pilot and confirmation results separate and handle repeated tasks as clustered observations, not independent new tasks. Warm/cold, managed/external and cached/uncached results are separate strata. The exact-output review-omission class additionally needs its own eligible and near-miss corpus.

The minimal control must not be deliberately crippled or gifted uncounted preparation. It can use ordinary coding tools and minimal orchestration, but must satisfy the same independent oracle, scope and effect constraints. Product installation/setup is reported separately from warm per-task execution; all intent-to-result work within a run is counted.

The live driver interface in ST-15 is a proposed interface, not a current command:

```sh
# AFTER ST-15/ST-16 implementation and exact campaign materialization:
node scripts/bench/paired-production-driver.mjs --manifest campaign.lock.json --mode offline
# Only after explicit USER approval of this exact manifest and budget:
node scripts/bench/paired-production-driver.mjs --manifest campaign.lock.json --mode live
```

`campaign.lock.json` must contain resolved product artifact SHAs/digests, target fixture SHAs, task objectives, adapter/model/effort, authority/sandbox/network, final oracle identity, retry budgets, randomized run order, cache/session policy and maximum authorized spend. Unresolved release tags/placeholders fail preflight. The live runner must verify the operator-approved authority boundary, not trust `--mode live` as permission by itself. Existing RF-04/context/protocol scripts are reused as components and invariant checks, not relabelled as full production measurements.

## 8. Release barriers and ownership guardrails

**.9 barrier:** ST-18 package/safety + ST-19 measurement disposition + ST-20 documentation. ST-21 backend fixture is required by ST-18. No adaptive shadow work blocks this release. Native-check extraction is postponed to LC-07 because the kernel-specific inspection shell is replaced during .11 convergence while Task Kernel remains canonical.

**.10 barrier:** BP-29 package/retirement/migration + BP-30 measured disposition + BP-31 documented compatibility. Blueprint engine, prompts and new artifacts are absent; current semantic stages and existing execution-owner selection otherwise remain.

**.11 barrier:** LC-21 package/owner/race + LC-22 measured disposition + LC-23 retirement + LC-24 final test topology. Exactly one executable owner serves all current entrypoints. Pure shared libraries and cold decoders are not counted as extra engines; obsolete or behaviorally redundant tests are removed only after replacement evidence is mapped.

**.12 barrier:** PL-10 package/parity + PL-11 complete planning accounting + PL-12 contract documentation. No EVALUATOR omission. Managed required planning removes forwarding, not its model episode.

**.13 barrier:** RC-16 package/closure/version + RC-17 recipe measurement + RC-18 authoring contract. No fallback selector episode; no new runtime state store.

**.14 barrier:** EV-07 independent quality evidence + EV-11 installed safety + EV-12 economic evidence + EV-13 exact activation or explicit non-shipment. Unknown/unqualified classes remain review-required.

## 9. Task catalogue

Cards are presented in dependency order within each release; their stable IDs are not a numeric execution counter. Every card below is a proposed work item. The immutable source references show why the task exists; they do not prove the target behavior is implemented. Listed code areas are bounded intended surfaces. Associated focused tests belong with the change. New test/script targets must be registered and run after implementation. The no-provider commands in measurement cards protect existing evidence only; live acceptance additionally requires the named experiment.

## 0.7.9 — Stabilize the existing product and make cost observable

### ST-01 — Refresh the executable consumer and writer inventory

Release: `0.7.9` · Priority: **P0** · Kind: inventory · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: none.

**Context and problem.** The source roadmap mixes historical observations and future contracts. Current sources still expose multiple entrypoint routes and Blueprint consumers. Sources: [S01][S02][S07][S10][S15][S16].

**Bounded code surface.** `packages/agentplane/src/commands/task/run.command.ts`; `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/blueprints/index.ts`; `packages/recipes/src/manifest-contracts.ts`; `packages/agentplane/src/commands/shared/task-verification-input-types.ts`.

**One change.** Produce one source-bound ledger of lifecycle writers, Blueprint producers/consumers, public exports, project-local definitions and Recipe extensions. Record invariant, canonical owner, caller and one replacement test for every row; include generated mirrors and provider-backend entrypoints.

**Delete / do not add.** Do not add runtime code or a registry service. Replace hand-maintained file-count claims with a reproducible inventory.

**Acceptance.** (1) Same clean SHA reproduces the ledger. (2) Unknown custom semantics are explicit blockers, not inferred mappings. (3) Include TaskCentricOrchestrator as well as kernel and ordinary supervisors.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `node --test scripts/checks/architecture-inventory.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-01`.

### ST-02 — Characterize ordinary direct task completion

Release: `0.7.9` · Priority: **P0** · Kind: characterization · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-01`.

**Context and problem.** Direct and external advance paths must remain usable during removal work. Sources: [S01][S02].

**Bounded code surface.** `packages/agentplane/src/commands/task/direct-task-supervisor.ts`; `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/commands/shared/workflow-step-factory.ts`.

**One change.** Add a clean fixture for create, planning, explicit approval, one scoped mutation, native checks, independent evaluation and terminal replay using production CLI dispatch and a local fake semantic adapter.

**Delete / do not add.** Reuse runCli/testkit fixtures; no new benchmark framework.

**Acceptance.** (1) Record actual dispatches, accepted outputs and final tree. (2) Required review remains required. (3) Terminal replay does not modify Task, evidence or Git history.

**Negative case.** A forged result without an independently observed check cannot finish.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-02`.

### ST-03 — Characterize branch PR and hosted completion

Release: `0.7.9` · Priority: **P0** · Kind: characterization · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-01`.

**Context and problem.** The kernel path is not a demonstrated substitute for hosted integration semantics. Sources: [S01][S02][S11].

**Bounded code surface.** `packages/agentplane/src/commands/task/branch-task-supervisor.ts`; `packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts`; `packages/agentplane/src/commands/task/advance.command.ts`.

**One change.** Capture one medium branch_pr task through task worktree, native checks, evaluator, PR publication, exact-head checks, integration and close tail. Stub remote responses but execute the real local use cases.

**Delete / do not add.** Use the existing provider fixture; no live repository writes or external paid provider.

**Acceptance.** (1) Exact implementation/provider/merge identities remain bound. (2) USER wait and provider wait are distinct stops. (3) A repeated command never publishes or integrates twice.

**Negative case.** Wrong-head hosted checks and a moved base cannot be accepted as success.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-02`.

### ST-04 — Freeze rework and infrastructure-only retry behavior

Release: `0.7.9` · Priority: **P0** · Kind: characterization · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-02`, `ST-03`.

**Context and problem.** NGDG6V already corrected supervisor-authored rework receipts. Earlier P1MJV7 work preserved implementation across infrastructure retries; do not reimplement these fixes. Sources: [S17][S11].

**Bounded code surface.** `packages/agentplane/src/commands/shared/route-decision-verification.ts`; `packages/agentplane/src/commands/shared/workflow-step-factory.ts`; `packages/agentplane/src/commands/task/direct-task-verification.ts`.

**One change.** Add or reuse regressions for evaluator rework versus infrastructure-only failure, including needs_rework with a newer SUPERVISOR implementation event and exact-commit matching.

**Delete / do not add.** Remove duplicate test setup only; no new retry engine.

**Acceptance.** (1) Infrastructure retry causes zero new EXECUTOR dispatches. (2) Semantic rework advances attempt only when implementation must change. (3) Forged non-SUPERVISOR event-only receipts are rejected.

**Negative case.** Unchanged implementation must not loop through a failed check as if corrected.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-02`.

### ST-05 — Freeze admission, crash and context-role invariants

Release: `0.7.9` · Priority: **P0** · Kind: characterization · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-01`.

**Context and problem.** Migration and consolidation must preserve pending work, not just completed happy paths. Sources: [S01][S02][S04][S15].

**Bounded code surface.** `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/external-agent-exchange.ts`; `packages/agentplane/src/commands/task/run.command.ts`; `packages/agentplane/src/commands/task/advance.command.ts`.

**One change.** Capture outstanding external WorkOrders, CURATOR/context requests, dispatch claims, saved semantic results, saved native checks, effect-in-doubt and restart at each receipt boundary.

**Delete / do not add.** Reuse existing lease and fault-injection facilities; do not create a second event journal.

**Acceptance.** (1) No result is accepted across task/attempt/authority identities. (2) No accepted semantic result is regenerated after crash. (3) Context episodes retain their actual current role/authority behavior.

**Negative case.** A missing live process is not proof that an external effect did not occur.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-02`.

### ST-06 — Conserve semantic requirements in prompt projection

Release: `0.7.9` · Priority: **P0** · Kind: correctness · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-02`.

**Context and problem.** Acceptance criteria can legitimately name Agentplane lifecycle commands. Process-choreography filtering must not erase the task being implemented. Sources: [S03][S08].

**Bounded code surface.** `packages/agentplane/src/runner/context/semantic-prompt-projection.ts`; `packages/agentplane/src/runner/usecases/task-run-bootstrap.ts`.

**One change.** Trace mandatory requirements into the delivered prompt and correct only demonstrated destructive filtering. Distinguish quoted/task-owned requirements from instructions granting lifecycle authority.

**Delete / do not add.** Delete destructive keyword-only omission for mandatory requirements; do not add a prompt DSL.

**Acceptance.** (1) Each mandatory objective/criterion/scope/check/stop has a delivered representation. (2) Repair tasks naming task/verify/finish preserve those requirements. (3) Authority remains unchanged.

**Negative case.** Budget overflow produces an explicit stop rather than dropping a required condition.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-03`.

### ST-07 — Repair managed semantic output parity at the adapter boundary

Release: `0.7.9` · Priority: **P0** · Kind: correctness · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-02`, `ST-05`.

**Context and problem.** The current managed strict output shape is generic while canonical and ordinary transitions require role-specific payloads. This is a source finding, not a reproduced runtime failure. Sources: [S03][S04][S08].

**Bounded code surface.** `packages/agentplane/src/runner/adapters/codex-result-transport.ts`; `packages/agentplane/src/runner/artifacts.ts`; `packages/agentplane/src/runner/adapters/prepared-input.ts`; `packages/core/src/runner/agent-work-order.ts`.

**One change.** Test real prepare/schema/JSONL/normalization/acceptance, then use the existing role/phase schema builder for demonstrated mismatches. Recover supervisor-owned identity from the issued WorkOrder rather than asking the model to reproduce it.

**Delete / do not add.** Remove the superseded duplicate generic schema/normalizer after all supported old result forms have a cold decoding path.

**Acceptance.** (1) PLANNER, EXECUTOR, EVALUATOR and supported context-role payloads survive their actual transport. (2) No mock bypasses output-schema validation. (3) Wrong-work-order, stale and cross-role results fail closed.

**Negative case.** A schema-compatible payload cannot inject approval or canonical lifecycle state.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-03`.

### ST-08 — Durably capture Codex usage before semantic-result validation

Release: `0.7.9` · Priority: **P0** · Kind: instrumentation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-01`.

**Context and problem.** Provider token parsing already exists; the task is durability and charge preservation, not new token estimation. Sources: [S08][S17].

**Bounded code surface.** `packages/agentplane/src/runner/adapters/codex-result-transport.ts`; `packages/agentplane/src/runner/adapters/codex.ts`; `packages/agentplane/src/runner/artifacts.ts`.

**One change.** Persist provider-reported usage with dispatch/run/turn identity in the existing supervisor-owned artifact channel when observed, before semantic parsing or result application can fail.

**Delete / do not add.** Remove process-local-only lifetime as the durable accounting dependency; keep one parser.

**Acceptance.** (1) Completed charge survives malformed semantic JSON and a crash before result acceptance. (2) Duplicate provider events are counted once. (3) Incomplete stream is partial/unavailable, never zero.

**Negative case.** No provider payload or secret is copied into canonical task text merely to obtain token counts.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-09 — Preserve evaluator charges on error paths

Release: `0.7.9` · Priority: **P0** · Kind: instrumentation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-08`.

**Context and problem.** Evaluator has its own provider execution/receipt path; success-only accounting omits billable failures. Sources: [S08][S17].

**Bounded code surface.** `packages/agentplane/src/commands/evaluator/evaluator-episode.ts`; `packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts`.

**One change.** Carry the shared provider usage observation into evaluator failure receipts as well as successful receipts, without changing evaluator verdict semantics.

**Delete / do not add.** Delete evaluator-specific token reinterpretation that differs from the shared parser.

**Acceptance.** (1) Timeout/nonzero exit/malformed result preserve every already observed charge. (2) Saved valid verdict is not re-executed solely to reconstruct usage. (3) Cache/reasoning remain subsets.

**Negative case.** Unknown remaining charge is explicit when provider termination prevents a final usage observation.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-10 — Connect managed dispatch usage to the existing journal

Release: `0.7.9` · Priority: **P0** · Kind: instrumentation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-08`, `ST-09`.

**Context and problem.** Every currently supported managed path must contribute to one task accounting view until its execution engine is removed. Sources: [S01][S04][S08][S17].

**Bounded code surface.** `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/core/src/runner/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/kernel-run.ts`.

**One change.** Record dispatch identity and observed usage for ordinary and kernel dispatches through the existing journal/accounting contract. Preserve role and attempt, including unsuccessful dispatches.

**Delete / do not add.** Replace local ad hoc totals rather than retaining an additional canonical accounting state.

**Acceptance.** (1) All supported managed roles are attributable. (2) Restarted receipt application does not double-count. (3) A dispatch that never produced a result still appears with coverage status.

**Negative case.** Formal CLI operations are not mislabeled as provider requests.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-managed-accounting.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-11 — Account for external-agent episodes without trusting self-reported tokens

Release: `0.7.9` · Priority: **P0** · Kind: instrumentation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-10`.

**Context and problem.** External semantic episodes may be part of a retained host session. Their costs are not automatically visible to Agentplane. Sources: [S02][S17].

**Bounded code surface.** `packages/agentplane/src/commands/task/external-agent-exchange.ts`; `packages/agentplane/src/commands/task/external-agent-supervisor.ts`; `packages/agentplane/src/commands/task/agent-action-packet.ts`.

**One change.** Link each external exchange to a host-observed usage envelope when the transport supplies trustworthy attribution; otherwise retain typed unavailable attribution. Do not allocate a shared host turn across tasks without evidence.

**Delete / do not add.** No telemetry field in AgentSemanticResult is accepted as independently observed cost.

**Acceptance.** (1) External PLANNER/CURATOR/EXECUTOR/EVALUATOR attempts appear in coverage. (2) Replayed exchange receipt is counted once. (3) Unallocatable multi-task turn remains explicitly unallocatable.

**Negative case.** Model-supplied token claims cannot convert unavailable to observed.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-external-accounting.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-12 — Build a task cost rollup from source observations

Release: `0.7.9` · Priority: **P0** · Kind: instrumentation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-10`, `ST-11`.

**Context and problem.** The recent committed task reports unavailable cost despite nonzero agent runs; a sum without coverage is misleading. Sources: [S08][S17].

**Bounded code surface.** `packages/core/src/runner/supervisor-execution-episode.ts`; `scripts/lib/agent-efficiency-repository-snapshot.mjs`.

**One change.** Derive one diagnostic task rollup from existing journal/usage records, with dispatched/observed/partial/unavailable counts and role/attempt breakdown.

**Delete / do not add.** Delete or replace totals that silently sum only successful episodes; never create a second mutable Task aggregate.

**Acceptance.** (1) Sum reconciles to unique raw observations including failures. (2) cached input and reasoning are not added twice. (3) Unknown portions cannot be rendered as complete totals.

**Negative case.** Task metadata-only writes do not create new billable episode identities.

**Focused verification.** `node --test scripts/bench/task-cost-rollup.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-13 — Partition lifecycle latency without double-counting

Release: `0.7.9` · Priority: **P0** · Kind: instrumentation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-02`, `ST-03`.

**Context and problem.** Existing aggregate latency does not isolate provider execution from preparation, checks and waiting. Sources: [S01][S02][S11].

**Bounded code surface.** `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/commands/task/direct-task-supervisor.ts`; `packages/agentplane/src/commands/task/branch-task-supervisor.ts`; `packages/agentplane/src/commands/task/direct-task-verification.ts`.

**One change.** Attach bounded monotonic spans to existing execution boundaries: prepare, semantic dispatch, first scoped mutation, native verification, review, provider/integration, verified state and closure; label local work, USER wait and external wait separately.

**Delete / do not add.** Use the existing event/timing mechanism or a small local helper, not an observability service.

**Acceptance.** (1) Spans have parent/child identities. (2) Overlapping spans are not summed into wall time. (3) First mutation is observed repository mutation, not model text or metadata creation.

**Negative case.** Wall clock changes do not produce negative elapsed durations.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-stage-timing.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-14 — Measure marginal Git and artifact cost in the fixture harness

Release: `0.7.9` · Priority: **P1** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-02`, `ST-03`.

**Context and problem.** Historical repository size does not measure the cost of one new task; Git blob bytes and checkout path bytes are different. Sources: [S12][S17].

**Bounded code surface.** `scripts/lib/agent-efficiency-repository-snapshot.mjs`; `scripts/bench/run-agent-efficiency-codex-replay.mjs`.

**One change.** Extend existing snapshot/fixture measurement to capture before/after new-task path bytes, unique blobs, service-only commits, meaningful commits, filesystem writes and tool/control-plane call counts.

**Delete / do not add.** Do not rewrite history or add per-file production telemetry; reuse Git object inspection.

**Acceptance.** (1) Fixture excludes preexisting tasks. (2) Duplicate paths and duplicate stored objects are separate metrics. (3) Empty/timestamp-only changes are identified explicitly.

**Negative case.** An identical Git blob at two paths is not reported as two new stored payloads.

**Focused verification.** `node --test scripts/bench/task-marginal-cost.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-15 — Add a production-path paired benchmark driver

Release: `0.7.9` · Priority: **P0** · Kind: benchmark · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-02`, `ST-03`, `ST-04`, `ST-05`, `ST-12`, `ST-13`, `ST-14`.

**Context and problem.** RF-04 and context benchmarks are useful infrastructure but do not establish current end-to-end advantage over a minimal agent. Sources: [S01][S02][S08][S17].

**Bounded code surface.** `scripts/bench/capture-agent-efficiency-candidate.mjs`; `scripts/bench/run-agent-efficiency-codex-replay.mjs`.

**One change.** Add one production driver reusing current isolation/evidence utilities for minimal-agent, previous-release and candidate arms. Drive real task entrypoints and a fixed independently executed oracle; pin target repository separately from product SHA.

**Delete / do not add.** Do not fork RF-04 into a second environment framework; historical baselines remain immutable.

**Acceptance.** (1) Offline fake-provider mode verifies the driver without paid calls. (2) Matched starting tree/model/effort/authority/checks/retries are enforced. (3) Managed and external modes are stratified, not pooled.

**Negative case.** Mismatched verifier, runtime profile or missing raw cost rejects an efficiency claim.

**Focused verification.** `node --test scripts/bench/paired-production-driver.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Implement only the harness. Paid campaign execution belongs to an explicit authority-gated measurement task.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`, `0.7.9-07`.

### ST-16 — Add the paired cost-per-verified-result report and claim gate

Release: `0.7.9` · Priority: **P0** · Kind: benchmark · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-15`.

**Context and problem.** Comparing only successful pairs hides costs of failed attempts; proxy byte reductions are insufficient. Sources: [S08][S17].

**Bounded code surface.** `scripts/bench/capture-agent-efficiency-candidate.mjs`; `scripts/lib/agent-efficiency-repository-snapshot.mjs`.

**One change.** Implement report checks for all-attempt campaign cost per verified success, paired successful outcomes, success/violation rates and stage distributions with coverage and uncertainty. Add the three separate safety, activation and efficiency gates defined here.

**Delete / do not add.** Remove any treatment of schema bytes or historical replay checks as current release proof.

**Acceptance.** (1) Failure costs remain in numerator. (2) Unknown charges prevent a complete numeric cost claim. (3) Different success populations are not presented as paired latency samples.

**Negative case.** All-failed arm yields no finite successful-result efficiency score.

**Focused verification.** `node --test scripts/bench/paired-result-report.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-07`, `0.7.10-30`.

### ST-17 — Keep missing usage separate from quality and further-spend permission

Release: `0.7.9` · Priority: **P1** · Kind: correctness · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `ST-09`, `ST-12`, `ST-05`.

**Context and problem.** A missing cost observation must not force a successful semantic episode to be repeated; unknown consumption can still prevent further paid dispatch. Sources: [S08][S17].

**Bounded code surface.** `packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`.

**One change.** Replace telemetry-only evaluator rerun/human-review behavior with distinct cost coverage and spend-admission diagnostics. Apply an already valid verdict; preserve a hard stop before further paid work when a finite budget cannot be proven available.

**Delete / do not add.** Remove evaluator-specific conflation of missing usage with a semantic review verdict.

**Acceptance.** (1) Valid saved verdict is reused. (2) Unknown-budget state never silently authorizes a new paid call. (3) Actual human_review verdict still stops.

**Negative case.** Budget authority is not weakened to make a happy path appear faster.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-04`.

### ST-21 — Characterize backend persistence and projection round trips

Release: `0.7.9` · Priority: **P0** · Kind: characterization · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-01`.

**Context and problem.** Changing the owner or binding can fail at storage/sync boundaries even when an in-memory reducer passes. Sources: [S01][S02][S14].

**Bounded code surface.** `packages/agentplane/src/backends/task-backend/`; `packages/agentplane/src/adapters/task-backend/`; `packages/agentplane/src/commands/shared/task-mutation.ts`.

**One change.** Add contract fixtures for the currently supported local and remote backend ports: Plan/authority/verification round trip, revision conflicts, replica staleness and unsupported format negotiation. Use local fakes for remote ports.

**Delete / do not add.** No new sync subsystem or real account access. Do not claim live remote qualification from these fakes.

**Acceptance.** (1) Required fields survive serialization and re-read. (2) Stale replica cannot override current owner. (3) Unsupported backend rejects before a state-changing command.

**Negative case.** Loss of an optional-looking authority/evidence field is not normalized to a permissive default.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-02`, `0.7.10-24`.

### ST-18 — Qualify the installed stabilization artifact

Release: `0.7.9` · Priority: **P0** · Kind: qualification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-04`, `ST-05`, `ST-06`, `ST-07`, `ST-12`, `ST-13`, `ST-14`, `ST-16`, `ST-17`, `ST-21`.

**Context and problem.** Unit imports do not guarantee that the installed package exposes the tested transport and assets. Sources: [S18].

**Bounded code surface.** `package.json`; `scripts/release/check-package-tarball.mjs`; `scripts/release/check-local-tarball-install-smoke.mjs`.

**One change.** Build the exact clean candidate and run the frozen corpus through installed-package entrypoints, including old-record decoding. Record package and runtime digests.

**Delete / do not add.** Do not modify golden outcomes to qualify the candidate; no new lifecycle format in 0.7.9.

**Acceptance.** (1) Installed direct/branch/recovery cases pass. (2) No Blueprint writer is disabled. (3) Existing required PLANNER/EVALUATOR behavior is conserved.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run package:tarball:check && bun run package:install-smoke && bun run test:release:critical`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-07`.

### ST-19 — Capture the exact 0.7.9 live efficiency baseline

Release: `0.7.9` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-18`, `ST-16`.

**Context and problem.** No provider experiment is authorized by this document. The source is not a measured candidate run. Sources: [S17][S18].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [proposed by ST-15]`.

**One change.** With explicit spend/sandbox authority, execute the preregistered paired pilot and expand only according to the fixed uncertainty rule. Keep every attempt and its raw evidence; report NOT ESTABLISHED when coverage is insufficient.

**Delete / do not add.** No rerun-until-green, historical-anchor relabeling or provider-token estimation.

**Acceptance.** (1) Same target tasks and oracle across arms. (2) Complete/partial usage is explicit. (3) Record v0.7.8 and candidate product artifact identities separately from target SHA.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** Experiment `M01`. Execute experiment M01 only after separate authority. The listed checks are no-provider evidence checks, not the live command.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-07`.

### ST-20 — Publish stabilization status and the next-release boundary

Release: `0.7.9` · Priority: **P1** · Kind: documentation · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-18`, `ST-19`.

**Context and problem.** The previous roadmap made adaptive shadow work a prerequisite to stabilization. Sources: [S18].

**Bounded code surface.** `docs/user/workflow.mdx`; `docs/developer/blueprints.mdx`; `package.json`.

**One change.** Record what 0.7.9 actually implements, current source-bound measurements and the .10-.14 split. Explicitly remove adaptive shadow computation from the default 0.7.9 path and release dependencies; do not implement it merely to remove it.

**Delete / do not add.** Replace aspirational current-state statements; do not add new runtime flags.

**Acceptance.** (1) No unsupported efficiency claim. (2) All deferred work has its new task IDs. (3) Publication remains an operator action outside this roadmap task.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run docs:bootstrap:check && bun run docs:onboarding:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Makes implemented behavior and remaining work explicit; no runtime performance gain is attributed to documentation.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-06`, `0.7.9-07`.

## 0.7.10 — Remove Blueprint, preserving current lifecycle obligations

### BP-01 — Approve a field-by-field Blueprint retirement map

Release: `0.7.10` · Priority: **P0** · Kind: design-contract · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `ST-01`, `ST-20`.

**Context and problem.** Blueprint mixes domain hints, policy obligations, execution topology and derived artifacts. A wholesale rename would preserve the duplication. Sources: [S06][S07][S10][S11].

**Bounded code surface.** `packages/agentplane/src/blueprints/model-core.ts`; `packages/agentplane/src/blueprints/resolve.ts`; `packages/recipes/src/manifest-contracts.ts`.

**One change.** Map every inventory row to the existing Plan, native policy, capability resolver, context projection, verification input or journal. Map reusable strategy to existing Recipe V1 guidance/templates where exact; classify anything else as manual conversion. Freeze mandatory stage obligations for this release.

**Delete / do not add.** Do not create ProcessDecision storage, Scenario V2 or a replacement graph engine.

**Acceptance.** (1) Every active consumer has a replacement owner and test. (2) Ordinary no-Recipe tasks retain all mandatory floors. (3) Custom nodes/edges with no exact mapping block that conversion.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `node --test scripts/checks/blueprint-retirement-map.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-17`, `0.7.10-18`, `0.7.10-19`, `0.7.10-20`.

### BP-02 — Resolve repository route floors without a Blueprint ID

Release: `0.7.10` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-01`, `ST-03`.

**Context and problem.** Direct/branch_pr routing already has native execution context and policy consumers. Sources: [S11][S07].

**Bounded code surface.** `packages/agentplane/src/commands/shared/route-decision.ts`; `packages/agentplane/src/blueprints/resolve.ts`; `packages/agentplane/src/runtime/task-routing/`.

**One change.** Move only task-kind, repository-mode and effect-risk route floors to the existing task-routing resolver. Return native typed reasons, not a selected graph or renamed Blueprint.

**Delete / do not add.** Delete the replaced Blueprint selection dependency from this route decision.

**Acceptance.** (1) Golden direct/branch/risk decisions remain equivalent. (2) Explicit task or Recipe preference cannot weaken a repository floor. (3) Unknown risk never implies permission.

**Negative case.** Security/publish/credential changes cannot fall through to a permissive route.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-route-without-blueprint.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-17`.

### BP-03 — Load required policy modules independently of Blueprint

Release: `0.7.10` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-01`.

**Context and problem.** Semantic security projections currently depend on resolved module selections. Sources: [S07][S11].

**Bounded code surface.** `packages/agentplane/src/runner/context/semantic-prompt-projection.ts`; `packages/agentplane/src/blueprints/model-core.ts`; `packages/agentplane/src/runtime/execution-context.ts`.

**One change.** Resolve required policy modules from repository policy and the accepted task contract using the existing execution-context path; preserve exact trusted sources and mandatory module content.

**Delete / do not add.** Remove policyModules consumption from the Blueprint plan for the migrated caller cluster.

**Acceptance.** (1) Security constraints remain present even with no Recipe. (2) Task-worktree policy changes cannot self-authorize. (3) Missing required module fails explicitly.

**Negative case.** A smaller context budget cannot drop a hard policy module.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-policy-module-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-18`.

### BP-04 — Replace Blueprint allowedCommands with capability admission

Release: `0.7.10` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-01`, `BP-03`.

**Context and problem.** A command allowlist embedded in a graph is not the owner of effect permission. Sources: [S07][S11].

**Bounded code surface.** `packages/core/src/runner/agent-work-order.ts`; `packages/agentplane/src/runtime/capabilities/`; `packages/agentplane/src/runner/policy-decision.ts`.

**One change.** Bind allowed tools/effects through the existing capability and runner-policy decision, at preparation and immediately before effect admission. Preserve per-role restrictions.

**Delete / do not add.** Delete only replaced allowedCommands bridges; no new command language.

**Acceptance.** (1) Effective authority is equal or narrower. (2) Unsupported adapter capability rejects before launch. (3) Read-only roles cannot obtain workspace-write by Recipe metadata.

**Negative case.** Provider/profile fallback cannot silently lower containment.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/roadmap-capability-admission.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-18`.

### BP-05 — Resolve context budgets without Blueprint plan/state

Release: `0.7.10` · Priority: **P1** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-03`.

**Context and problem.** Context budgeting should limit delivery, not change the task requirements. Sources: [S07][S08].

**Bounded code surface.** `packages/agentplane/src/runner/usecases/task-run-bootstrap.ts`; `packages/agentplane/src/runner/context/semantic-prompt-projection.ts`; `packages/agentplane/src/runner/context/work-order-context.ts`.

**One change.** Read budgets from the existing execution profile and project only required/relevant task context. Remove Blueprint contextBudget/contextManifest as input to this projection.

**Delete / do not add.** Delete duplicate budget propagation through Blueprint artifacts; no retained-session subsystem.

**Acceptance.** (1) Mandatory requirements are conserved. (2) Oversize required context stops with a typed explanation. (3) Fresh-process prompts do not claim retained context.

**Negative case.** Truncation cannot silently remove acceptance, authority or stop conditions.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-budget-without-blueprint.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-18`.

### BP-06 — Move protected approval and review floors to native policy

Release: `0.7.10` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-01`, `BP-02`.

**Context and problem.** Removing protected Blueprint nodes must not remove the obligation they enforced. Sources: [S06][S07][S11].

**Bounded code surface.** `packages/agentplane/src/commands/shared/workflow-step-factory.ts`; `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/core/src/tasks/task-centric/policy.ts`.

**One change.** Encode existing protected approval and independent-review floors in the native admission/completion policy already used by task routes. Keep PLANNER/EVALUATOR mandatory wherever they currently are.

**Delete / do not add.** Delete dependence on protected graph-node flags for this decision; do not add optional-stage rules.

**Acceptance.** (1) The same forbidden traces fail. (2) Recipe cannot waive approval or review. (3) Correctly completed semantic work still needs its independent verification evidence.

**Negative case.** An empty Blueprint or absent Recipe does not lower policy floors.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-protected-obligations.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-19`.

### BP-07 — Transfer stop and rollback obligations to current contracts

Release: `0.7.10` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-06`.

**Context and problem.** Blueprint stop rules and rollback evidence include real constraints as well as graph scaffolding. Sources: [S07][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/core/src/tasks/task-centric/graph.ts`; `packages/agentplane/src/commands/shared/workflow-step-factory.ts`.

**One change.** Represent existing mandatory stops with native reason codes and preserve rollback requirements in the concrete Plan/verification contract. Keep domain remediation suggestions as guidance, not commands executed automatically.

**Delete / do not add.** Remove the replaced stop-rule interpreter for current routes.

**Acceptance.** (1) Every prior mandatory stop has a named native predicate. (2) Required rollback evidence has an identified producer and consumer. (3) No new shell is inferred from prose.

**Negative case.** Unresolved effect-in-doubt cannot be converted into a generic retry suggestion.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-stop-rollback-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-19`.

### BP-08 — Transfer evidence minimums to existing verification and journal owners

Release: `0.7.10` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-04`, `BP-06`, `BP-07`.

**Context and problem.** Blueprint evidence lists must not be dropped merely because several artifacts were generated. Sources: [S06][S12][S14].

**Bounded code surface.** `packages/agentplane/src/commands/shared/task-verification-records.ts`; `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`.

**One change.** Move each minimum from the retirement map into the current verification contract, result-admission or effect receipt check, with exact source/evidence binding.

**Delete / do not add.** Remove duplicate graph evidence checks only after the new consumer rejects the same missing/tampered input.

**Acceptance.** (1) Claimed checks are not observed checks. (2) Missing required bytes cannot be replaced by a digest alone. (3) Evidence from another task/attempt cannot satisfy the requirement.

**Negative case.** A stale but well-formed digest cannot authorize finish.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-evidence-minimums.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-20`.

### BP-09 — Convert V1 context, output and artifact hints without Blueprint extensions

Release: `0.7.10` · Priority: **P1** · Kind: compatibility refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-01`, `BP-05`.

**Context and problem.** Scenario V2 is not required to retain existing Recipe guidance/assets during Blueprint removal. Sources: [S09][S10].

**Bounded code surface.** `packages/recipes/src/blueprint-extensions.ts`; `packages/recipes/src/manifest-contracts.ts`; `packages/agentplane/src/runner/context/recipe-context.ts`.

**One change.** Normalize context_hint, output_schema and artifact_template into existing Recipe guidance/context/output-template surfaces once at installation or explicit conversion. Keep their required/advisory meaning.

**Delete / do not add.** Remove target_node_kind dependence for these mapped kinds; no new strategy schema.

**Acceptance.** (1) Equivalent V1 recipes yield equivalent WorkOrders. (2) Unknown custom output constraints require manual conversion. (3) Required assets are retained and digest-checked.

**Negative case.** A template hint cannot grant a new writable path or mark an output as observed.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-v1-guidance-conversion.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-17`, `0.7.10-16`.

### BP-10 — Convert V1 evidence, check and risk hints without the Blueprint resolver

Release: `0.7.10` · Priority: **P1** · Kind: compatibility refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-08`.

**Context and problem.** Existing overlays already support validators; a new Recipe engine would be unnecessary for this transfer. Sources: [S10][S12].

**Bounded code surface.** `packages/recipes/src/blueprint-extensions.ts`; `packages/recipes/src/manifest-contracts.ts`; `packages/agentplane/src/commands/recipes/impl/overlay-project.ts`.

**One change.** Map evidence_requirement, check_suggestion and risk_hint into existing validator/advisory requirement surfaces. Preserve trust, requiredness and whether a command is merely suggested.

**Delete / do not add.** Delete these cases from the active Blueprint extension resolver after migration support exists.

**Acceptance.** (1) A suggestion never silently becomes an authorized command. (2) Required evidence remains mandatory. (3) Risk hints may strengthen but not weaken current native floors.

**Negative case.** An installed Recipe cannot override protected repository policy.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/recipes/roadmap-v1-requirement-conversion.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-17`, `0.7.10-16`.

### BP-11 — Replace preferred_blueprint only where its meaning is exact

Release: `0.7.10` · Priority: **P0** · Kind: compatibility refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-02`, `BP-09`, `BP-10`.

**Context and problem.** preferred_blueprint and project-local graphs can encode more than a convenient strategy label. Sources: [S07][S10][S11].

**Bounded code surface.** `packages/recipes/src/blueprint-extensions.ts`; `packages/agentplane/src/blueprints/resolve.ts`; `packages/agentplane/src/commands/blueprint/task-input.ts`.

**One change.** Provide explicit mappings for built-in preferences to existing route floors and Recipe V1 template/guidance. Export custom graph bytes and a field mapping report; refuse any conversion that loses an obligation or domain step.

**Delete / do not add.** Delete silent nearest-Blueprint or nearest-Recipe fallback. Do not build a generic old-graph interpreter into normal execution.

**Acceptance.** (1) Every supported preference has a deterministic mapping. (2) Unmapped project-local semantics retain their bytes and produce manual_review_required for LC-13 agent-assisted resolution. (3) Explicit choice is never silently substituted.

**Negative case.** A custom approval or rollback edge cannot disappear during conversion.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/recipes/roadmap-preference-mapping.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-17`, `0.7.10-16`.

### BP-12 — Version the existing verification-input contract for Blueprint-free identity

Release: `0.7.10` · Priority: **P0** · Kind: schema · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `BP-08`.

**Context and problem.** The current contract is task_verification_input v4, not an absent VerificationBinding abstraction. Sources: [S12][S13][S14].

**Bounded code surface.** `packages/agentplane/src/commands/shared/task-verification-input-types.ts`; `packages/agentplane/src/commands/shared/task-verification-record-parser.ts`; `packages/agentplane/src/commands/shared/task-verification-input.ts`.

**One change.** Extend the existing verification-input family with the next incompatible input version (v5 at this baseline) only for fields required by the owner map. Define concurrency identity, checked-input identity and current obligation coverage separately; add readers before changing writers.

**Delete / do not add.** Reject the proposed parallel VerificationBinding V2. Do not hash the entire mutable Task or current report timestamps into checked-input freshness.

**Acceptance.** (1) v2/v3/v4 historical inputs remain inspectable. (2) Unknown versions fail closed. (3) Receipt/status-only changes do not alter checked-input identity.

**Negative case.** Changed implementation, command, toolchain or relevant input invalidates evidence even if Task revision was not changed.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-verification-input-v5.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-21`.

### BP-13 — Produce Blueprint-free verification inputs alongside old references

Release: `0.7.10` · Priority: **P0** · Kind: producer · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-12`.

**Context and problem.** Consumers must receive real material input identities before the old digest is removed. Sources: [S12][S13][S14].

**Bounded code surface.** `packages/agentplane/src/commands/shared/task-verification-input.ts`; `packages/agentplane/src/commands/task/verify-record.ts`; `packages/agentplane/src/commands/task/direct-task-verification.ts`.

**One change.** Emit the new input identity using current native observations and the accepted Plan/policy. Preserve old references temporarily for pre-cutover consumers, with one explicit removal task BP-24.

**Delete / do not add.** Do not duplicate check payloads or execute checks twice to emit two references.

**Acceptance.** (1) Same native check run has one evidence payload. (2) Command/toolchain/environment identity comes from the real invocation. (3) Record publication does not invalidate that very record.

**Negative case.** Migration or report generation cannot manufacture a passed check.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-verification-input-producer.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-21`.

### BP-14 — Version state fingerprints and WorkOrders away from Blueprint components

Release: `0.7.10` · Priority: **P0** · Kind: schema and binding refactor · Implementation risk: **high** · Compatibility risk: **medium**.
Dependencies: `BP-03`, `BP-04`, `BP-06`, `BP-12`.

**Context and problem.** Removing a Blueprint artifact is not enough if stale-state policy still requires its fingerprint component. Sources: [S06][S08][S11][S14].

**Bounded code surface.** `packages/core/src/runner/agent-work-order.ts`; `packages/core/src/runner/state-fingerprint.ts`; `packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts`.

**One change.** Replace current-route Blueprint fingerprint dependencies with the exact Plan, policy and capability identities that now own them. Version the affected wire contract where required and retain read-only decoding of old fingerprints.

**Delete / do not add.** Delete the Blueprint component only for newly issued versioned WorkOrders, not by dropping a required component at runtime.

**Acceptance.** (1) Old/new fingerprint domains cannot be confused. (2) Stale Plan/policy/capability substitution is rejected. (3) Native metadata writes do not demand a new semantic attempt.

**Negative case.** Old unaccepted results are never rebound to a new WorkOrder identity.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/roadmap-blueprint-free-fingerprint.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-21`, `0.7.10-18`.

### BP-15 — Switch verification-record freshness to the new input identity

Release: `0.7.10` · Priority: **P0** · Kind: consumer switch · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-13`.

**Context and problem.** Verification already has material invalidation reasons and equivalent-input reuse. Sources: [S12][S13][S14].

**Bounded code surface.** `packages/agentplane/src/commands/shared/task-verification-records.ts`; `packages/agentplane/src/commands/shared/task-verification-record-parser.ts`.

**One change.** Use the versioned input identity for current-record acceptance and coverage; keep historical v2-v4 interpretation tied to its original semantics.

**Delete / do not add.** Remove Blueprint-dependent current freshness once equivalent owner checks are active.

**Acceptance.** (1) Check -> persist receipt -> service-only update does not rerun the check. (2) Material input or required coverage change cannot finish from old evidence. (3) Record integrity is still independently checked.

**Negative case.** Matching check IDs alone do not establish that an arbitrary check proves acceptance.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-freshness-consumer.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-22`.

### BP-16 — Switch finish admission off BlueprintSnapshotRef

Release: `0.7.10` · Priority: **P0** · Kind: consumer switch · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-15`, `BP-06`, `BP-07`.

**Context and problem.** Current finish explicitly parses the marker and compares Blueprint snapshot freshness. Sources: [S06][S12].

**Bounded code surface.** `packages/agentplane/src/commands/task/finish-blueprint-evidence.ts`; `packages/agentplane/src/commands/task/finish-command.ts`.

**One change.** Make current-format finish depend on structured Plan/policy/evidence sufficiency rather than the Markdown marker; use the cold historical route for old records until explicit migration.

**Delete / do not add.** Delete current-format marker parsing and Blueprint freshness imports from finish.

**Acceptance.** (1) No marker is needed for a new task. (2) No mandatory check/review/rollback is lost. (3) Historic records are neither auto-approved nor silently treated as current.

**Negative case.** Removing a Markdown marker cannot make a failed task pass.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-finish-without-blueprint.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-22`.

### BP-17 — Switch evaluator and quality identity off the Blueprint digest

Release: `0.7.10` · Priority: **P0** · Kind: consumer switch · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-15`, `BP-16`, `BP-14`.

**Context and problem.** Quality freshness currently includes expectedBlueprintDigest in addition to reviewed implementation. Sources: [S06][S12].

**Bounded code surface.** `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts`; `packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts`.

**One change.** Bind current review input to accepted Plan/criteria, implementation, policy and verification inputs now owned outside Blueprint. Preserve independent reviewer provenance and original immutable verdict bytes.

**Delete / do not add.** Remove current review dependence on Blueprint digest; retain only the historical decoder.

**Acceptance.** (1) Fresh unrelated verdict is rejected. (2) Failed/rework/blocked verdict never satisfies the pass requirement. (3) Applying a valid verdict does not rerun the provider.

**Negative case.** A supervisor cannot synthesize EVALUATOR pass during migration.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-quality-without-blueprint.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-23`.

### BP-18 — Render current status and ACR from the new owners

Release: `0.7.10` · Priority: **P1** · Kind: projection · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `BP-13`, `BP-14`, `BP-06`.

**Context and problem.** Human views must explain current policy and evidence without remaining an input to lifecycle decisions. Sources: [S06][S11].

**Bounded code surface.** `packages/agentplane/src/commands/task/agent-action-packet.ts`; `packages/agentplane/src/commands/task/run-render.ts`; `packages/agentplane/src/commands/task/blueprint-summary.ts`.

**One change.** Replace current Blueprint labels/digests with native route reasons and actual Plan/check/review references in status, task views and ACR consumers listed by ST-01.

**Delete / do not add.** Remove old current-view projection helpers after their last caller moves.

**Acceptance.** (1) Views distinguish required, attempted, successful and stale evidence. (2) Rendering cannot mutate Task state. (3) Historic views clearly identify their original format.

**Negative case.** A generated view cannot satisfy an evidence minimum.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-status-projection.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-23`.

### BP-19 — Preview Blueprint binding and configuration retirement before cutover

Release: `0.7.10` · Priority: **P0** · Kind: migration tooling · Implementation risk: **medium** · Compatibility risk: **high**.
Dependencies: `BP-11`, `BP-12`, `BP-14`.

**Context and problem.** Preview must exist before users encounter a new default. Old active work may have outstanding external exchanges even without a managed process. Sources: [S02][S06][S10][S14].

**Bounded code surface.** `packages/agentplane/src/commands/blueprint/snapshot-artifact.ts`; `packages/agentplane/src/commands/shared/task-verification-record-parser.ts`; `packages/agentplane/src/commands/task/migration-preview.ts [proposed; reuse existing equivalent]`.

**One change.** Inventory current and historical bindings, installed/project-local Blueprint definitions and outstanding work. Produce exact-equivalent candidate replacements plus preserved source digests; classify quiescent, pending, terminal and manual cases.

**Delete / do not add.** No execution of old or new graph, provider, shell checks or Git mutations. Local read-only Git is allowed with hooks/config/network isolation.

**Acceptance.** (1) Preview changes zero canonical/working-tree files. (2) Every unsupported obligation is explained with a supported recovery option. (3) Missing payload bytes prohibit an equivalence claim.

**Negative case.** No nearest strategy substitution and no implicit package install.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-blueprint-migration-preview.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-26`, `0.7.10-16`.

### BP-20 — Fence migration against all effect and result admission

Release: `0.7.10` · Priority: **P0** · Kind: concurrency · Implementation risk: **high** · Compatibility risk: **medium**.
Dependencies: `BP-01`, `ST-05`.

**Context and problem.** Task-record CAS alone does not serialize independent dispatch claims, external returns or integration workers. Sources: [S01][S02][S11].

**Bounded code surface.** `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/commands/task/run.command.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-lease.ts`.

**One change.** Expose/use the existing common admission lease or fencing epoch for migration, managed dispatch, external result acceptance and integration effects. Check quiescence while holding that boundary and recheck immediately before commit.

**Delete / do not add.** Do not introduce a second lock database or a time-based assumption that a process is dead.

**Acceptance.** (1) Racing migration and dispatch have one winner. (2) Outstanding external WorkOrder blocks migration until explicitly resolved. (3) Old worker cannot start/commit an effect after cutover. (4) A pre-fence executable that does not participate in the shared boundary must be demonstrably quiesced and reconciled; unknown old-worker liveness blocks migration.

**Negative case.** Migration vs native-check completion, provider merge and result acceptance are all covered.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-migration-fence.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-27`.

### BP-21 — Apply exact Blueprint retirement migrations atomically

Release: `0.7.10` · Priority: **P0** · Kind: migration tooling · Implementation risk: **high** · Compatibility risk: **high**.
Dependencies: `BP-19`, `BP-20`, `BP-15`, `BP-16`, `BP-17`.

**Context and problem.** A new input format cannot be adopted by editing old evidence in place. Sources: [S06][S14].

**Bounded code surface.** `packages/agentplane/src/commands/shared/task-verification-record-parser.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/migration-apply.ts [proposed; reuse existing equivalent]`.

**One change.** Apply the reviewed preview under the shared fence and existing transaction/CAS. Preserve old bytes, write one old/new mapping receipt, and require fresh approval only when its authority cannot be carried with exact equivalence.

**Delete / do not add.** No live old-engine fallback or fabricated verification. Quarantine blocks effects but preserves inspect/export/explicit-resolution paths.

**Acceptance.** (1) Crash/repeat produces at most one migration. (2) Old approval never broadens scope/effects. (3) Unknown or in-doubt state is not mutated. (4) Portable evidence references resolve offline.

**Negative case.** A stale preview is rejected under the fence before any new-format write.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-blueprint-migration-apply.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-27`.

### BP-22 — Activate Blueprint-free issuance and explicit old-record stops

Release: `0.7.10` · Priority: **P0** · Kind: cutover · Implementation risk: **medium** · Compatibility risk: **high**.
Dependencies: `BP-18`, `BP-21`, `BP-14`.

**Context and problem.** Producer and consumer coexistence must end with one active contract per task, not dual execution. Sources: [S01][S02][S06].

**Bounded code surface.** `packages/agentplane/src/commands/task/create.command.ts`; `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/commands/task/run.command.ts`.

**One change.** Issue only the current Blueprint-free binding for new tasks. Existing non-migrated active tasks receive a typed inspect/migrate/drain instruction; unknown formats never fall back to another executor.

**Delete / do not add.** Remove the old current-format issuance switch after the cutover tests. Do not change which existing lifecycle owner executes the task yet.

**Acceptance.** (1) New task works with no Blueprint definition. (2) Old pending task has no new effect. (3) Exact migrated task resumes without repeating accepted work.

**Negative case.** Downgrading code after a current-format write cannot silently run the task under 0.7.9.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-blueprint-cutover.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`, `0.7.10-28`.

### BP-23 — Remove Blueprint input from model-visible context

Release: `0.7.10` · Priority: **P1** · Kind: deletion · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `BP-22`, `BP-05`.

**Context and problem.** Transfer of obligations is complete; a second graph representation is no longer useful semantic context. Sources: [S07][S08].

**Bounded code surface.** `packages/agentplane/src/runner/usecases/task-run-bootstrap.ts`; `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/agentplane/src/runner/context/work-order-context.ts`.

**One change.** Stop delivering Blueprint IDs, node graphs, snapshot paths and choreography while preserving domain requirements through Plan/policy/Recipe projection.

**Delete / do not add.** Delete the corresponding prompt blocks, resolver fetches and adapter bundle duplication.

**Acceptance.** (1) Delivered prompt has every required constraint once in an appropriate representation. (2) Zero Blueprint engine reads during preparation. (3) No catalogue or legacy explanation is injected into every episode.

**Negative case.** Do not remove task text merely because it discusses Blueprint source-code removal.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-no-blueprint-prompt.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-18`, `0.7.10-28`.

### BP-24 — Stop Blueprint snapshot and runtime projection writers

Release: `0.7.10` · Priority: **P0** · Kind: deletion · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `BP-22`, `BP-23`.

**Context and problem.** Writers can now be removed without breaking the relocated consumers. Sources: [S01][S07][S10].

**Bounded code surface.** `packages/agentplane/src/commands/blueprint/snapshot-artifact.ts`; `packages/agentplane/src/runner/artifacts.ts`; `packages/agentplane/src/blueprints/plan.ts`.

**One change.** Stop all current-task resolved snapshots, Blueprint plan/state/cursor projections and Markdown markers identified in the ledger, including ordinary, kernel and Recipe entrypoints.

**Delete / do not add.** Remove dual-write references introduced by BP-13 and their transient path types. Preserve historic files unchanged.

**Acceptance.** (1) New direct, branch and Recipe V1 tasks create zero Blueprint artifacts. (2) Restart/terminal replay creates no new canonical artifacts. (3) No timestamp-only service commits.

**Negative case.** No old writer is invoked by provider/evaluator failure recovery.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-zero-blueprint-artifacts.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-28`.

### BP-28 — Isolate and test the minimal historical audit decoder

Release: `0.7.10` · Priority: **P0** · Kind: compatibility · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `BP-19`, `BP-12`.

**Context and problem.** Forensic readability requires old bytes and their original interpretation, not the old scheduler. Sources: [S06][S07][S14].

**Bounded code surface.** `packages/agentplane/src/commands/blueprint/ [retained audit decoder only]`; `packages/agentplane/src/commands/shared/task-verification-record-parser.ts`.

**One change.** Keep only bounded versioned decoders and inspect/export operations outside normal-task imports; verify offline fresh-clone evidence resolution and declare payload retention requirements.

**Delete / do not add.** Delete legacy validators that are needed only to execute old workflows; do not rewrite historical digests.

**Acceptance.** (1) Historical verdict/binding can be audited against original bytes. (2) Missing evidence is reported, not regenerated. (3) Ordinary new task imports no historical graph reader.

**Negative case.** Digest-only local-git-common-dir references do not count as portable retained evidence.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-historical-audit.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-29`.

### BP-27 — Retire Blueprint CLI mutation surfaces and generated distribution assets

Release: `0.7.10` · Priority: **P1** · Kind: deletion and compatibility · Implementation risk: **low** · Compatibility risk: **medium**.
Dependencies: `BP-24`, `BP-28`.

**Context and problem.** Deleting TypeScript modules but shipping stale CLI help, assets or schema mirrors leaves a second unsupported interface. Sources: [S07][S18].

**Bounded code surface.** `packages/agentplane/src/commands/blueprint/`; `packages/agentplane/src/cli/bootstrap-guide.ts`; `scripts/generate/`.

**One change.** Remove Blueprint mutation commands and generated live assets; provide precise replacement diagnostics for documented old invocations where the declared compatibility window requires them.

**Delete / do not add.** A compatibility diagnostic may be a thin read-only alias, never a hidden executor. Remove fixtures/docs that advertise a live Blueprint feature.

**Acceptance.** (1) Installed package exposes no active Blueprint mutation command. (2) Completion/help/schema exports agree. (3) Archived examples are clearly historical.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run schemas:check && bun run agents:check && bun run docs:bootstrap:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-29`, `0.7.10-30`.

### BP-25 — Remove the active Blueprint registry and selection/extension engine

Release: `0.7.10` · Priority: **P0** · Kind: deletion · Implementation risk: **low** · Compatibility risk: **medium**.
Dependencies: `BP-24`, `BP-11`, `BP-27`.

**Context and problem.** Pure legacy decoding does not require executing the old selection engine. Sources: [S07][S10].

**Bounded code surface.** `packages/agentplane/src/blueprints/resolve.ts`; `packages/agentplane/src/blueprints/resolve-recipe-hints.ts`; `packages/recipes/src/blueprint-extensions.ts`; `packages/agentplane/src/blueprints/index.ts`.

**One change.** Delete now-unreachable built-in/project registry selection and Recipe Blueprint extension resolution after the inventory proves all current consumers moved.

**Delete / do not add.** Remove dead exports/imports and tests of deleted behavior; keep equivalent safety tests under native owners.

**Acceptance.** (1) Active import graph has no resolver/registry engine. (2) Native route tests remain green. (3) Unknown old definitions remain inspectable but cannot execute.

**Negative case.** Do not retain the engine behind a hidden default-off fallback.

**Focused verification.** `node --test scripts/checks/no-blueprint-engine.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-29`.

### BP-26 — Remove Blueprint graph plan and execution-state implementation

Release: `0.7.10` · Priority: **P0** · Kind: deletion · Implementation risk: **low** · Compatibility risk: **medium**.
Dependencies: `BP-25`.

**Context and problem.** A rebuildable diagnostic graph must not remain a second execution cursor. Sources: [S07].

**Bounded code surface.** `packages/agentplane/src/blueprints/ [graph-plan/execution modules from ST-01]`; `packages/agentplane/src/runner/artifacts.ts`.

**One change.** Delete unused Blueprint graph-plan/compiler/execution-state modules and their runner coupling; preserve concrete Plan scheduling and journal semantics.

**Delete / do not add.** No replacement ResolvedRecipe/ProcessGraph cursor. Remove associated live schemas and code-generation inputs only after consumer removal.

**Acceptance.** (1) One task execution never updates a Blueprint cursor. (2) Equivalent native gate negatives still pass. (3) Package type generation contains no active graph contract.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `node --test scripts/checks/no-blueprint-cursor.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-29`.

### BP-29 — Qualify Blueprint removal through the installed package

Release: `0.7.10` · Priority: **P0** · Kind: qualification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `BP-26`, `BP-27`, `BP-28`, `BP-24`.

**Context and problem.** This release removes Blueprint, not the other lifecycle owners or mandatory episodes. Sources: [S01][S06][S07].

**Bounded code surface.** `scripts/release/check-local-tarball-install-smoke.mjs`; `scripts/checks/ [inventory guard]`.

**One change.** Run installed direct/branch/context/recovery/Recipe V1 and migration tests; rerun the inventory guard with explicit cold-reader exceptions.

**Delete / do not add.** Remove expired temporary transfer/dual-write code rather than shipping it for future cleanup.

**Acceptance.** (1) Zero active Blueprint engine imports/writes. (2) Same forbidden traces rejected. (3) Supported old tasks can inspect/migrate or drain on the pinned prior release. (4) Current-stage obligations are unchanged.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run package:install-smoke && bun run test:release:critical && bun run arch:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-28`, `0.7.10-29`, `0.7.10-30`.

### BP-30 — Measure .10 versus .9 with the same required episodes

Release: `0.7.10` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `BP-29`, `ST-16`.

**Context and problem.** Architecture savings must be isolated from stage omission and Recipe V2. Sources: [S17][S18].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [introduced by ST-15]`.

**One change.** Run M02 under separate paid authority, comparing exact .9/.10 artifacts with identical target tasks, policy obligations and final oracle. Record marginal artifact/commit cost and stage-level latency.

**Delete / do not add.** Do not count historic repository size or payload reduction as a product efficiency result.

**Acceptance.** (1) Matched verified outcome is independent. (2) No omitted evaluator/planner contaminates the comparison. (3) Every failed run remains in the dataset.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** Experiment `M02`. M02 is paid and authority-gated; publish exact coverage and NOT ESTABLISHED when incomplete.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### BP-31 — Document the .10 compatibility and removal boundary

Release: `0.7.10` · Priority: **P1** · Kind: documentation · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `BP-29`, `BP-30`.

**Context and problem.** Patch labels must not imply that retired commands or new-format writes are downgrade-safe. Sources: [S18].

**Bounded code surface.** `docs/user/workflow.mdx`; `docs/developer/blueprints.mdx`; `docs/developer/recipes-development.mdx`.

**One change.** Document explicit conversion/drain/quarantine options and the old-command retirement policy. State that remaining lifecycle convergence is .11, not a missing Blueprint-removal step.

**Delete / do not add.** Replace active Blueprint documentation with current-owner documentation; preserve only version-labelled history.

**Acceptance.** (1) No active writer or engine is concealed as compatibility. (2) Publication records functional and efficiency verdicts separately. (3) New-source status links to the evidence.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run docs:bootstrap:check && bun run docs:onboarding:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Makes implemented behavior and remaining work explicit; no runtime performance gain is attributed to documentation.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

## 0.7.11 — Keep Task Kernel as the sole domain owner and remove superseded execution paths

### LC-01 — Fix convergence on Task Kernel plus one application coordinator

Release: `0.7.11` · Priority: **P0** · Kind: design-contract · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `BP-31`, `ST-01`.

**Context and problem.** Task Kernel provides the pure reducer, explicit authority and typed domain-event boundary that motivated Clean Core. The ordinary advance path has the mature hosted, recovery, context and effect operations. Keeping either outer path intact would preserve competing lifecycle implementations. Sources: [S01][S02][S03][S04][S15][S16].

**Bounded code surface.** `packages/core/src/tasks/task-kernel/kernel.ts`; `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/commands/shared/route-decision.ts`; `packages/core/src/tasks/task-centric/lifecycle.ts`; `packages/core/src/tasks/task-centric/orchestrator.ts`.

**One change.** Adopt Task Kernel as the sole domain reducer and aggregate, with one application coordinator extracted from the mature ordinary advance route/effect path. Record a symbol-level ownership map for state mutation, scheduling, admission, completion and effects. Map every production capability around the Kernel before deleting its former outer implementation.

**Delete / do not add.** Do not restore the ordinary task-centric aggregate as a competing owner, copy production capabilities into a kernel-specific outer loop, or add a third scheduler/coordinator.

**Acceptance.** (1) Each frozen case has one Kernel command/event path, one canonical writer and one effect owner. (2) Ordinary hosted/recovery/context capabilities have a concrete coordinator operation without a parallel reducer. (3) Any unrepresentable safety guarantee is a concrete blocking counterexample. (4) The owner map identifies every production entrypoint and retained pure helper.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `node --test scripts/checks/lifecycle-owner-map.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-01`.

### LC-02 — Make all Plan/state writes pass the Task Kernel mutation gateway

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **high** · Compatibility risk: **low**.
Dependencies: `LC-01`, `ST-21`.

**Context and problem.** The Kernel aggregate, outer TaskData record, legacy task-centric aggregate and generated views must not remain independent canonical-looking writers. Sources: [S03][S15].

**Bounded code surface.** `packages/core/src/tasks/task-kernel/kernel.ts`; `packages/core/src/tasks/task-centric/compatibility.ts`; `packages/core/src/tasks/task-centric/lifecycle.ts`; `packages/agentplane/src/commands/shared/task-mutation.ts`.

**One change.** Route Plan/WorkItem lifecycle mutations through the existing backend transaction and Task Kernel command/event contract. Make task-centric compatibility status and README fields projections of accepted Kernel state, not reverse synchronization authorities.

**Delete / do not add.** Delete the parallel task-centric reducer and duplicate live projection-to-aggregate reconciliation once their callers use the Kernel gateway. Preserve original historical events as evidence.

**Acceptance.** (1) Concurrent mutations use one revision/CAS boundary. (2) Rendering a legacy view cannot change state. (3) One semantic transition creates one accepted mutation.

**Negative case.** Conflicting outer status and aggregate state are diagnosed rather than choosing the more permissive one.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-single-mutation-gateway.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-01`, `0.7.10-24`.

### LC-03 — Extract one Kernel-backed advance-one-step coordinator

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-02`.

**Context and problem.** External and managed paths need one application operation around the Kernel, not separate ordinary and kernel-specific high-level engines. Sources: [S02][S11].

**Bounded code surface.** `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/commands/shared/workflow-supervisor.ts`.

**One change.** Extract the mature ordinary route/recovery/admission flow into one internal advance-one-step coordinator that issues typed Kernel commands and returns native progress, semantic request, approval, wait, terminal or effect-in-doubt. Keep public wrappers behavior-equivalent.

**Delete / do not add.** Move code rather than copy it; do not keep an ordinary reducer inside advance.command or a second coordinator inside kernel-advance.

**Acceptance.** (1) One step persists intent before effects. (2) Exact current route preconditions apply. (3) External adapter wrapper returns the same current exchange contract.

**Negative case.** A loop budget or no-progress stop cannot silently rerun semantic work.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`.

### LC-04 — Reuse the current scheduler and WorkItem readiness calculation

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-03`.

**Context and problem.** Task-centric graph validation and scheduling utilities already exist. Sources: [S03][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/graph.ts`; `packages/core/src/tasks/task-centric/lifecycle.ts`; `packages/agentplane/src/commands/shared/workflow-step-factory.ts`.

**One change.** Make the Kernel-backed coordinator use one ready-WorkItem/dependency/output/resource-claim decision implementation; eliminate parallel WorkItem ordering logic identified in LC-01. A retained pure task-centric helper has no mutation or lifecycle authority.

**Delete / do not add.** No new Plan graph or Recipe scheduler; retain pure graph helpers even when deleting an old outer loop.

**Acceptance.** (1) Dependency and required-output blocking are unchanged. (2) Optional WorkItems do not block incorrectly. (3) Resource conflicts cannot admit two exclusive effects.

**Negative case.** An absent output is not inferred from a successful semantic status.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-workitem-readiness.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-01`, `0.7.10-24`.

### LC-05 — Make semantic dispatch and result admission a single shared boundary

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-03`, `ST-07`, `BP-20`.

**Context and problem.** Transport mechanics may differ; result identity and admission must not. Sources: [S01][S02][S08].

**Bounded code surface.** `packages/agentplane/src/commands/task/external-agent-supervisor.ts`; `packages/agentplane/src/commands/task/external-agent-exchange.ts`; `packages/core/src/runner/agent-work-order.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`.

**One change.** Expose one semantic request/result-admission operation over the existing WorkOrder and result schemas. Issue an agent WorkOrder only when real semantic judgment is required. Deterministically validate lease, fingerprint, identity, authority, freshness and structure; leave transport I/O and semantic interpretation outside state mutation.

**Delete / do not add.** Remove duplicate result validation branches once the wrapper delegates.

**Acceptance.** (1) Managed/external same issued task contract has equal obligations. (2) Cross-task/role/attempt results fail. (3) One result has one accepted Kernel application. (4) Formally decidable steps dispatch no agent, while required semantic interpretation is not replaced by heuristics.

**Negative case.** Model-supplied binding/approval cannot override the issued exchange owner.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-semantic-admission.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`, `0.7.10-25`.

### LC-06 — Preserve CURATOR and context preparation in the common path

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-05`, `ST-05`.

**Context and problem.** Kernel role coverage is narrower; dropping context preparation would be a regression disguised as consolidation. Sources: [S04][S15].

**Bounded code surface.** `packages/core/src/runner/agent-work-order.ts`; `packages/agentplane/src/runner/context/`; `packages/core/src/tasks/task-centric/model.ts`.

**One change.** Route existing context/knowledge preparation requests through common semantic admission around the Kernel with the same bounded sources, role aliases and write authority as the frozen corpus.

**Delete / do not add.** Delete context-specific outer lifecycle choreography, not context capabilities or provenance.

**Acceptance.** (1) Required context gap stops or requests the appropriate role. (2) Curator output is accepted only within its granted context scope. (3) Current role aliases remain unambiguous.

**Negative case.** An executor cannot treat requested but not yet prepared knowledge as present.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-curator-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-01`.

### LC-07 — Separate native verification from review in the common coordinator

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-04`, `LC-05`, `BP-15`.

**Context and problem.** Native validation must be independently callable, but EVALUATOR remains required in this release. Kernel inspection coupling is retired rather than expanded. Sources: [S05][S12][S14].

**Bounded code surface.** `packages/agentplane/src/commands/task/direct-task-verification.ts`; `packages/core/src/tasks/task-centric/lifecycle.ts`; `packages/agentplane/src/commands/task/advance-task-step.ts [proposed extraction in LC-03]`.

**One change.** Route checks through the existing native verifier before independent review and reuse immutable matching check evidence at the same verified input boundary. Preserve infrastructure retry budgets and current final checks.

**Delete / do not add.** Remove review-acceptance ownership of check execution in migrated flows; no universal cross-environment check cache.

**Acceptance.** (1) Native check failure stops before new review where appropriate. (2) Infrastructure retry preserves implementation. (3) Passing checks alone cannot finish a review-required task.

**Negative case.** Changed toolchain/environment/command/input prevents reuse.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-check-review-separation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-05`, `0.7.10-05`.

### LC-08 — Apply independent review through the shared completion path

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-07`, `BP-17`.

**Context and problem.** A common verifier must not collapse independent review into an executor claim. Sources: [S06][S12][S15].

**Bounded code surface.** `packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts`; `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/core/src/tasks/task-centric/lifecycle.ts`.

**One change.** Make valid independent verdict acceptance update the common aggregate once, using current evidence coverage and existing rework/refinement rules.

**Delete / do not add.** Delete duplicate review-driven finish/rework branches in the replaced outer loop.

**Acceptance.** (1) Rework requests new semantic work only when required. (2) Failed/blocked/stale review cannot satisfy completion. (3) Saved verdict replay dispatches zero models.

**Negative case.** Review independence provenance survives wrapper and adapter changes.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-application.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-23`, `0.7.10-24`.

### LC-09 — Move direct implementation/finalization orchestration into common operations

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-07`, `LC-08`.

**Context and problem.** Direct mode should define repository effects, not a separate semantic lifecycle. Sources: [S01][S11].

**Bounded code surface.** `packages/agentplane/src/commands/task/direct-task-supervisor.ts`; `packages/agentplane/src/commands/task/direct-task-finalization.ts`; `packages/agentplane/src/commands/task/direct-task-supervisor-operation.ts`.

**One change.** Delegate direct implementation observation, scope check, implementation commit and finalization to common advance operations using the existing direct Git helpers.

**Delete / do not add.** Remove each migrated branch from the direct outer supervision loop; preserve helper functions with one purpose.

**Acceptance.** (1) Golden direct result/tree/authority unchanged. (2) Service-only commits do not create new implementation identity. (3) No second finalize call after replay.

**Negative case.** A write outside approved scope cannot be normalized into a permitted commit.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-direct-coordinator-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`.

### LC-10 — Share branch worktree and publication operations

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-05`, `LC-07`.

**Context and problem.** Branch mode already has in-process operations; preserve them instead of replacing Git with a new subsystem. Sources: [S01][S02][S11].

**Bounded code surface.** `packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts`; `packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts`; `packages/agentplane/src/commands/branch/work-start.ts`.

**One change.** Bind worktree preparation, branch start and PR artifact/publication operations to the common advance operation keys and admission boundary.

**Delete / do not add.** Delete duplicated pre-operation orchestration; keep actual provider/Git use cases.

**Acceptance.** (1) Correct authoritative checkout and base remain bound. (2) Replayed publication is not repeated. (3) Required USER side-effect authority is unchanged.

**Negative case.** Task-worktree configuration cannot authorize its own publish.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-branch-publication-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`.

### LC-11 — Share hosted checks, integration and close-tail transitions

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-10`, `LC-08`.

**Context and problem.** Hosted waiting and integration recovery are explicit ordinary-path capabilities absent from the inspected kernel entrypoint. Sources: [S02][S11].

**Bounded code surface.** `packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts`; `packages/agentplane/src/commands/integrate-queue.command.ts`; `packages/agentplane/src/commands/task/hosted-close-pr.command.ts`.

**One change.** Use the existing exact-SHA provider observations, queue operation and close-tail effects through common advance; preserve external wait as a typed non-semantic outcome.

**Delete / do not add.** Remove separate branch loop choreography around these effects; do not remove queue/merge evidence.

**Acceptance.** (1) PR and merge heads are exactly verified. (2) A wait emits no new model episode. (3) Protected-base auto-merge and hosted close tail remain recoverable.

**Negative case.** A timeout or lost merge response is effect-in-doubt until fresh provider reconciliation.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`.

### LC-12 — Reconcile completed and uncertain effects before scheduling work

Release: `0.7.11` · Priority: **P0** · Kind: behavior-preserving refactor · Implementation risk: **high** · Compatibility risk: **low**.
Dependencies: `LC-09`, `LC-11`, `BP-20`.

**Context and problem.** Consolidation is useful only if infrastructure errors cannot repeat already accepted semantic work. Sources: [S02][S11][S15][S17].

**Bounded code surface.** `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/advance-task-step.ts [proposed extraction in LC-03]`; `packages/core/src/tasks/task-centric/policy.ts`.

**One change.** Apply the existing journal reconciliation and retry-budget decisions once before common scheduling. Preserve original result/receipt identities and distinguish semantic rework from infrastructure retry.

**Delete / do not add.** Delete duplicated happy-path recovery scans when the common admission has already made the observation; no blanket weakening of fresh checks.

**Acceptance.** (1) Crash after model/check/verdict/merge restores the right next action. (2) In-doubt effects never repeat blindly. (3) No new semantic attempt for service-only state changes.

**Negative case.** Interrupted external return remains pending rather than silently discarded.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`, `0.7.10-25`.

### LC-13 — Preview legacy and parallel-owner migration into Task Kernel

Release: `0.7.11` · Priority: **P0** · Kind: migration tooling · Implementation risk: **medium** · Compatibility risk: **high**.
Dependencies: `LC-01`, `LC-06`, `LC-12`, `BP-19`.

**Context and problem.** Changing the default owner before preview leaves users no safe assessment path. Sources: [S01][S02][S03][S04].

**Bounded code surface.** `packages/core/src/tasks/kernel-semantic.ts`; `packages/core/src/tasks/task-centric/compatibility.ts`; `packages/agentplane/src/commands/task/migration-preview.ts [introduced by BP-19]`.

**One change.** Add a bounded read-only decoder/mapping for known legacy and parallel task-centric records into Task Kernel. Preserve Plan, outputs, authority lineage, accepted results and pending effects. Apply exact structural mappings without an agent; when structurally valid custom semantics genuinely require interpretation, emit one bounded semantic-assessment request over the preserved source bytes.

**Delete / do not add.** Reuse the migration envelope from .10; no generic graph transformation framework.

**Acceptance.** (1) Formal preview never dispatches or mutates. (2) Every old field has a Kernel owner, an exact formal blocker or an explicit semantic-assessment requirement. (3) Pending managed/external work is visible. (4) The same bytes and mapping version yield the same formal result.

**Negative case.** Code does not infer semantic equivalence from labels, similarity or a nearest route; integrity, stale-state and unresolved-effect failures remain hard blockers.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-preview.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-26`.

### LC-14 — Apply lifecycle-owner migration under the shared fence

Release: `0.7.11` · Priority: **P0** · Kind: migration tooling · Implementation risk: **high** · Compatibility risk: **high**.
Dependencies: `LC-13`, `BP-20`, `BP-21`.

**Context and problem.** An in-flight old worker must not be able to write after owner migration. Sources: [S02][S04][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/compatibility.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/migration-apply.ts [introduced by BP-21]`.

**One change.** Apply conversion into Task Kernel under the common fence/CAS. Retain original semantic/evidence bytes, the formal mapping receipt and any bound agent assessment. Apply an agent judgment only when identity, authority, source bytes, mapping version and state remain fresh. Refuse pending/uncertain operations and incomplete results.

**Delete / do not add.** No reverse-synchronization bridge and no mutation of historical results to pretend they were produced by the new owner.

**Acceptance.** (1) Concurrent old/new workers cannot both apply. (2) Repeated apply is idempotent. (3) Accepted semantic work is preserved. (4) Exact mappings require no agent. (5) Genuine semantic gaps can request a bound agent result. (6) Quarantine permits audit/export and explicit formal or agent-assisted resolution only.

**Negative case.** Policy, source or semantic-assessment binding drift between preview and apply rejects the migration; an agent cannot override integrity, authority or unresolved-effect blockers.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-27`.

### LC-15 — Switch ordinary create and advance to the Kernel-backed coordinator

Release: `0.7.11` · Priority: **P0** · Kind: cutover · Implementation risk: **medium** · Compatibility risk: **high**.
Dependencies: `LC-14`, `LC-12`, `ST-07`.

**Context and problem.** The common owner is now executable and migration is available. Sources: [S01][S02][S03].

**Bounded code surface.** `packages/agentplane/src/commands/task/create.command.ts`; `packages/agentplane/src/commands/task/new.ts`; `packages/agentplane/src/commands/task/advance.command.ts`.

**One change.** Create Kernel-owned Task/Plan records and use the common Kernel-backed coordinator for external execution. Make legacy and parallel-owner markers explicit migration/read-only cases; reject unknown versions before effect admission.

**Delete / do not add.** Remove ordinary-versus-kernel dispatch from create/advance after the cutover; no opt-in second engine or reducer for new tasks.

**Acceptance.** (1) Current external happy/rework/recovery paths pass. (2) Existing old tasks get the exact migration instruction. (3) No fallback selects a more permissive engine.

**Negative case.** An unknown extension or record version cannot route to a default legacy executor.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-owner-cutover.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-24`.

### LC-16 — Make managed task run a transport loop around common advance

Release: `0.7.11` · Priority: **P0** · Kind: cutover · Implementation risk: **medium** · Compatibility risk: **high**.
Dependencies: `LC-15`, `LC-05`.

**Context and problem.** Managed transport should differ only in who executes a semantic request, not in authority or completion decisions. Sources: [S01][S02][S08].

**Bounded code surface.** `packages/agentplane/src/commands/task/run.command.ts`; `packages/agentplane/src/commands/task/direct-task-supervisor.ts`; `packages/agentplane/src/commands/task/branch-task-supervisor.ts`.

**One change.** Delegate managed execution to the Kernel-backed common advance; execute only an eligible semantic packet through the configured adapter, then return its observed result. Preserve current pre-plan behavior until PL-08 explicitly changes it.

**Delete / do not add.** Remove direct/branch/kernel outer-loop selection from current task run.

**Acceptance.** (1) Same Plan/policy yields same obligations across transports. (2) Real USER/wait/in-doubt stops remain. (3) One semantic request launches one adapter.

**Negative case.** Do not enable automatic planning or optional evaluation as part of this cutover.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-owner-cutover.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-25`.

### LC-17 — Route existing Recipe V1 execution through the Kernel-backed owner

Release: `0.7.11` · Priority: **P0** · Kind: cutover · Implementation risk: **medium** · Compatibility risk: **high**.
Dependencies: `LC-15`, `LC-16`.

**Context and problem.** Recipe scenarios currently materialize task records and context through separate entrypoints. Sources: [S09][S10].

**Bounded code surface.** `packages/agentplane/src/runner/usecases/scenario-materialize-task.ts`; `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/agentplane/src/commands/scenario/impl/commands.ts`.

**One change.** Make V1 scenario materialization use the Kernel Task/Plan creation gateway and common coordinator while retaining Recipe provenance and current required planning/review behavior.

**Delete / do not add.** Remove scenario-specific runner lifecycle decisions; keep installation and read-only scenario preview.

**Acceptance.** (1) Recipe and no-Recipe task execute through one owner. (2) No synthetic approval from a template. (3) Existing V1 unknown steps are not newly executed.

**Negative case.** Recipe.run_profile cannot bypass common authority checks.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-scenario-owner-parity.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-25`.

### LC-18 — Delete superseded ordinary, direct and branch outer supervisors

Release: `0.7.11` · Priority: **P1** · Kind: deletion · Implementation risk: **low** · Compatibility risk: **medium**.
Dependencies: `LC-16`, `LC-17`.

**Context and problem.** All current entrypoints have switched; retaining unused full loops would preserve maintenance and import overhead. Sources: [S01][S02].

**Bounded code surface.** `packages/agentplane/src/commands/task/direct-task-supervisor.ts`; `packages/agentplane/src/commands/task/branch-task-supervisor.ts`; `packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts`.

**One change.** Delete old ordinary, direct and branch outer loops plus dead adapter dispatch branches. Keep only explicitly used single-purpose Git, observation, verification and review helpers referenced by the Kernel-backed coordinator.

**Delete / do not add.** No legacy fallback copy. Remove old exports only with the declared public retirement diagnostics.

**Acceptance.** (1) No current entrypoint imports the old outer supervisors. (2) Type/test/build checks pass. (3) New-task import graph is smaller by the measured removed modules.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `node --test scripts/checks/single-live-supervisor.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-29`.

### LC-19 — Delete secondary lifecycle engines and every proven-dead execution surface

Release: `0.7.11` · Priority: **P1** · Kind: deletion · Implementation risk: **low** · Compatibility risk: **medium**.
Dependencies: `LC-18`, `LC-14`.

**Context and problem.** The canonical Kernel reducer remains, but kernel-specific and legacy outer engines, parallel reducers, dispatch flags and unused compatibility surfaces would preserve multiple ways to perform one operation. Sources: [S04][S05][S15][S16].

**Bounded code surface.** `packages/agentplane/src/commands/task/kernel-run.ts`; `packages/agentplane/src/commands/task/kernel-advance.ts`; `packages/agentplane/src/commands/task/kernel-inspection.ts`; `packages/core/src/tasks/task-kernel/`; `packages/core/src/tasks/task-centric/`; package exports, feature flags and dependencies identified by the LC-01 owner map.

**One change.** Remove kernel-specific run/advance/inspection orchestration, the parallel task-centric reducer/orchestrator, old dispatch flags, reverse synchronization, dead exports and dependencies whose only consumer is removed. Retain the canonical pure Kernel reducer and only pure graph/policy/codec helpers with named current consumers.

**Delete / do not add.** Do not preserve any old engine under a compatibility flag or retain code for hypothetical future use. Do not delete the canonical Kernel reducer, required safety primitives, cold audit/migration decoders or historical evidence interpretation.

**Acceptance.** (1) Exactly one Kernel reducer, canonical writer and live lifecycle dispatcher remain. (2) Cold migration/audit still reads old bytes. (3) Every retained public export has a named current consumer. (4) No retired feature flag, reverse sync or secondary engine is reachable from the installed package. (5) Production module, export, dependency and import-edge deltas are recorded without treating deletion count as a performance claim.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `node --test scripts/checks/no-secondary-lifecycle-engine.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-01`, `0.7.10-29`.

### LC-20 — Remove no-information state writes on common terminal replay

Release: `0.7.11` · Priority: **P1** · Kind: correctness and simplification · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-19`.

**Context and problem.** A consolidated path should not rewrite checkpoints, generated views or timestamps before noticing a task is terminal. Sources: [S16][S12].

**Bounded code surface.** `packages/core/src/tasks/task-centric/compatibility.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/advance-task-step.ts [introduced by LC-03]`.

**One change.** Short-circuit terminal/no-progress read paths before canonical/artifact writes when all authoritative state is already present. Preserve required recovery intent writes for actual operations.

**Delete / do not add.** Delete unconditional terminal checkpoint/projection refreshes; no new cache.

**Acceptance.** (1) Two terminal replays keep Task/repo/evidence bytes and Git commits unchanged. (2) No provider or check dispatch. (3) Optional operational diagnostics stay outside canonical state and product Git.

**Negative case.** An unresolved effect prevents the terminal no-op shortcut.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-28`.

### LC-21 — Qualify the one-owner installed package and migration races

Release: `0.7.11` · Priority: **P0** · Kind: qualification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `LC-17`, `LC-18`, `LC-19`, `LC-20`.

**Context and problem.** Source-level convergence must be demonstrated across every actual entrypoint. Sources: [S01][S02][S15].

**Bounded code surface.** `scripts/release/check-local-tarball-install-smoke.mjs`; `scripts/checks/ [owner guard]`.

**One change.** Run installed ordinary/Recipe, managed/external, direct/branch, CURATOR, provider-wait, rework, formal migration and agent-assisted semantic-migration fixtures with current mandatory episodes. Run reachability, unused-export, dependency and clone ratchets after the maximum proven deletion.

**Delete / do not add.** Remove temporary dual-owner tracing and shadow comparisons once the real owner passes.

**Acceptance.** (1) One accepted result/effect per operation. (2) All frozen negative cases retained. (3) No Blueprint engine, parallel reducer or secondary live owner is reachable. (4) No deterministic heuristic substitutes for required semantic judgment. (5) Knip, architecture, clone and package dependency checks do not regress.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run package:install-smoke && bun run test:release:critical && bun run arch:check && bun run knip:check && bun run clone:check`. Existing commands; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### LC-22 — Measure .11 against .10 before optional-stage changes

Release: `0.7.11` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `LC-21`, `ST-16`.

**Context and problem.** Convergence must be measured separately from removing semantic episodes. Sources: [S01][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [introduced by ST-15]`.

**One change.** Execute M03 under explicit authority with identical mandatory stages, target tasks and final oracle; inspect preparation, observation, recovery and artifact deltas.

**Delete / do not add.** No claim that deletion count implies cost reduction.

**Acceptance.** (1) Mandatory role obligations are equal. (2) All failed-attempt costs retained. (3) Per-workflow results are visible, not aggregate-only.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** Experiment `M03`. M03 paid authority-gated; .11 documentation records actual evidence, not assumed architectural savings.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### LC-23 — Document the sole lifecycle contract and retire old execution APIs

Release: `0.7.11` · Priority: **P1** · Kind: documentation · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `LC-21`, `LC-22`.

**Context and problem.** The word canonical must now refer to one concrete owner, not to two competing APIs. Sources: [S01][S02][S15].

**Bounded code surface.** `docs/user/workflow.mdx`; `docs/user/task-lifecycle.mdx`; `packages/core/src/tasks/index.ts`.

**One change.** Update current workflow/role/transport and public-export documentation to Task Kernel plus the sole application coordinator. Publish precise old-engine inspection/conversion instructions, the formal-versus-semantic decision boundary and the maximum-proven-deletion ledger.

**Delete / do not add.** Delete obsolete active tutorials and execution exports after their replacement or explicit incompatibility is declared.

**Acceptance.** (1) No current guide tells an agent to select an engine. (2) Historical examples are version-labelled. (3) No claims of optional stages in .11.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run docs:bootstrap:check && bun run docs:onboarding:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Makes implemented behavior and remaining work explicit; no runtime performance gain is attributed to documentation.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### LC-24 — Revise the post-convergence test suite

Release: `0.7.11` · Priority: **P0** · Kind: test simplification and qualification · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-23`.

**Context and problem.** After the sole coordinator is established and superseded engines, APIs and staging routes are removed, tests can still preserve their obsolete topology, duplicate the same observable behavior or pay repeatedly for equivalent fixture setup. Deleting them earlier would remove evidence before the replacement path is proven. Sources: [S01][S02][S15][S16][S19].

**Bounded code surface.** `vitest.workspace.ts`; `scripts/checks/run-vitest-suite.mjs`; `packages/core/src/tasks/task-centric/*.test.ts`; `packages/agentplane/src/commands/task/*supervisor*.test.ts`; `packages/agentplane/src/adapters/task-backend/kernel-replay*.test.ts`; `packages/testkit/src/**`.

**One change.** Build an executable post-convergence behavior-to-test and test-to-CI-route ledger. Delete engine-, API- and staging-only tests whose subjects no longer exist, plus cases that are behaviorally redundant under the same invariant and layer. Optimize retained tests by consolidating equivalent fixture setup, using the narrowest sufficient harness and assigning each case to the smallest correct suite without changing its oracle.

**Delete / do not add.** No deletion quota, filename/age heuristic, broad mock, assertion weakening, snapshot replacement for semantic checks, test-only production export or zero-test command. Do not collapse independent safety gates merely because their happy paths look alike.

**Acceptance.** (1) Every deleted case names the removed behavior and either its stronger retained route or evidence that the behavior no longer exists. (2) The ledger assigns an owner to every retained negative, recovery, migration, authority and concurrency/race invariant. (3) CI configuration contains no deleted path and every declared suite executes at least one test with no unexpected skip or todo. (4) Before/after test-file count, case count and same-host wall time are recorded for fast and release-critical suites. (5) No production export exists solely to support a test.

**Negative case.** Similar setup is not sufficient evidence of duplication when cases cover different trust boundaries, crash windows, stale-result rejection, forged authority, migration, CAS races or provider effect-in-doubt.

**Focused verification.** `node scripts/checks/check-post-convergence-test-topology.mjs && bun run test:fast && bun run test:release:critical && bun run package:install-smoke && bun run vitest:projects:check && bun run clone:check && bun run knip:check`. Proposed topology target plus existing commands; register the target in the proper suite and require nonzero executed tests.

**Measurement.** Record case/file counts and at least three comparable same-host wall-time runs before and after. Report a speedup only from the measured distribution; do not trade independent invariant coverage for elapsed time.

**Expected impact.** Removes test debt left by lifecycle convergence and reduces measured suite cost while preserving behavior-level safety evidence.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

## 0.7.12 — Avoid a separate PLANNER episode when an accepted contract is already sufficient

### PL-01 — Separate formal planning obligations from semantic Plan judgment

Release: `0.7.12` · Priority: **P0** · Kind: behavior contract · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `LC-24`.

**Context and problem.** A persisted ProcessDecision with its own revisions/cursor would recreate the layer just removed. Sources: [S03][S11][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/commands/shared/workflow-step-factory.ts`; `packages/core/src/tasks/task-centric/lifecycle.ts`.

**One change.** Add formally decidable planning obligations to the existing policy/route projection, using accepted typed input, trusted policy, authority and observations. When deciding whether intent is semantically covered requires interpretation, issue the normal PLANNER WorkOrder instead of encoding heuristics. Represent obligation, attempt/outcome and evidence freshness separately. Default all current review floors unchanged.

**Delete / do not add.** No ProcessDecision aggregate, workflow graph, scheduler, generic waiver subsystem or default shadow pass.

**Acceptance.** (1) Resolver works with and without a Plan. (2) Model cannot set its own obligation. (3) Same formal inputs have the same reason/rule identity and no durable write. (4) Semantic uncertainty requests PLANNER rather than being guessed from titles, tags or scores.

**Negative case.** required + performed + failed is not equivalent to satisfied.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-planning-obligations.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-06`, `0.7.10-02`, `0.7.10-05`.

### PL-02 — Accept the existing compact Plan proposal at task intake

Release: `0.7.12` · Priority: **P0** · Kind: transport · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `PL-01`, `ST-07`.

**Context and problem.** Compact TaskPlanProposal input V2 already exists and supplies supervisor-owned task identity and planning baseline. Sources: [S03].

**Bounded code surface.** `packages/agentplane/src/commands/task/create.command.ts`; `packages/core/src/tasks/task-centric/schema.ts`; `packages/agentplane/src/commands/task/agent-action-packet.ts`.

**One change.** Expose that existing input at ordinary intake/refinement; support explicit caller-provided complete Plan, not a new competing inline contract schema. Return precise missing/invalid field diagnostics.

**Delete / do not add.** Delete duplicate intake-shape proposals from the implementation plan; no model-supplied authority/hash approval fields.

**Acceptance.** (1) Current compact and full proposal forms normalize through one validator. (2) Explicit baseline comes from current observation. (3) Incomplete semantic input remains unresolved.

**Negative case.** Forged USER or canonical state fields are rejected before mutation.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-compact-intake.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-03`.

### PL-03 — Materialize a supplied Plan through the Kernel proposal path

Release: `0.7.12` · Priority: **P0** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `PL-02`.

**Context and problem.** Skipping a separate planning episode is not skipping Plan creation or approval. Sources: [S03][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/graph.ts`; `packages/agentplane/src/commands/task/create.command.ts`; `packages/agentplane/src/commands/task/advance-task-step.ts [introduced by LC-03]`.

**One change.** Use the common normalizer and graph/policy validators to submit a concrete Plan proposal through the Kernel command path from sufficient compact input, including a one-item contract when actually supplied.

**Delete / do not add.** No fake PLANNER semantic result, synthetic approval, or alternate fast-task record.

**Acceptance.** (1) Existing approval boundary reached without a PLANNER dispatch. (2) The Kernel-owned Plan is reviewable in the public form. (3) Unresolved semantic choices request PLANNER and do not get guessed mechanically.

**Negative case.** Tags/title keywords or empty risk declarations alone never imply a sufficient Plan.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-inline-plan-materialization.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-04`.

### PL-04 — Preserve USER approval across no-separate-PLANNER intake

Release: `0.7.12` · Priority: **P0** · Kind: authority · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `PL-03`.

**Context and problem.** A caller-supplied Plan does not attest USER permission to execute it. Sources: [S03][S11].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/commands/task/user-approval-receipt.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`.

**One change.** Bind approval to the normalized current Plan and authority using the existing approval receipt flow; preserve planning provenance as caller-supplied rather than model-generated.

**Delete / do not add.** Remove assumptions that a PLANNER result is the only origin of a valid Plan.

**Acceptance.** (1) No implementation before required approval. (2) Drift invalidates stale approval. (3) A model cannot self-approve by setting the input origin.

**Negative case.** Approval of one contract does not transfer to a changed effect/scope contract.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-inline-plan-approval.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-04`.

### PL-05 — Enable the planning shortcut in external advance

Release: `0.7.12` · Priority: **P0** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `PL-04`.

**Context and problem.** The Kernel-backed common owner can now receive a sufficient Plan without a separate planning turn. Sources: [S02][S03].

**Bounded code surface.** `packages/agentplane/src/commands/task/advance.command.ts`; `packages/agentplane/src/commands/task/external-agent-supervisor.ts`; `packages/agentplane/src/commands/shared/workflow-step-factory.ts`.

**One change.** Let exact structural completeness and trusted policy choose the normal approval/execution boundary for an accepted supplied Plan. If semantic sufficiency remains unresolved, issue the usual read-only PLANNER request.

**Delete / do not add.** Remove unconditional initial PLANNER handoff for this qualified input only.

**Acceptance.** (1) Sufficient contract uses zero separate PLANNER dispatches. (2) Insufficient contract yields planning or focused USER clarification. (3) EVALUATOR requirement is unchanged.

**Negative case.** A malicious low-risk flag does not bypass mandatory planning policy.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-external-planner-shortcut.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`, `0.7.10-07`.

### PL-06 — Use the same planning decision in managed execution

Release: `0.7.12` · Priority: **P0** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `PL-05`, `LC-16`.

**Context and problem.** Managed and external transports should not have different sufficiency definitions. Sources: [S01][S03].

**Bounded code surface.** `packages/agentplane/src/commands/task/run.command.ts`; `packages/core/src/runner/agent-work-order.ts`.

**One change.** Honor the common accepted-Plan decision in managed execution without selecting another engine or altering provider authority.

**Delete / do not add.** Delete managed-only duplicate planning requirement checks.

**Acceptance.** (1) Equal inputs yield equal obligations across transports. (2) Same approval receipt rules. (3) No new model call to decide the route.

**Negative case.** Transport capability differences cannot be misreported as semantic completeness.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-planner-shortcut.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-08`.

### PL-07 — Render omitted planning honestly in Task and ACR views

Release: `0.7.12` · Priority: **P1** · Kind: projection · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `PL-06`.

**Context and problem.** No planning episode must not look like a successfully executed PLANNER. Sources: [S03][S15].

**Bounded code surface.** `packages/agentplane/src/commands/task/agent-action-packet.ts`; `packages/agentplane/src/commands/task/run-render.ts`; `packages/core/src/tasks/task-centric/compatibility.ts`.

**One change.** Render planning requirement, supplied-Plan origin and actual episode counts from existing state/receipts. Add no new canonical decision record.

**Delete / do not add.** Remove fabricated passed/performed planning markers and repeated decision timestamp writes.

**Acceptance.** (1) not_required is distinct from pass and missing. (2) Actual attempted planning failure remains visible. (3) Repeated explain command is read-only.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-planning-status.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-05`, `0.7.10-08`.

### PL-08 — Run a required read-only PLANNER inside managed execution

Release: `0.7.12` · Priority: **P1** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `PL-06`, `ST-07`.

**Context and problem.** This is separate from omitting planning: the model episode remains necessary but the external dispatch/return bridge need not be. Sources: [S01][S02][S03].

**Bounded code surface.** `packages/agentplane/src/commands/task/run.command.ts`; `packages/core/src/runner/agent-work-order.ts`; `packages/agentplane/src/commands/task/advance-task-step.ts [introduced by LC-03]`.

**One change.** For explicitly managed tasks lacking a sufficient Plan, execute the Kernel-bound read-only PLANNER request through the same adapter boundary, apply its proposal through the Kernel command path, then stop at actual USER approval.

**Delete / do not add.** Remove the managed initial external planning bridge; keep external-agent advance available.

**Acceptance.** (1) No source mutation before approval. (2) Required PLANNER dispatch occurs exactly once. (3) Accepted plan survives infrastructure retry. (4) No automatic USER approval.

**Negative case.** An adapter incapable of the required read-only/output contract fails before a paid launch.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-managed-initial-planner.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Measure this separately from no-PLANNER runs; it removes forwarding, not the planning model episode.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-08`.

### PL-09 — Preserve escalation and recovery without discarding an accepted implementation

Release: `0.7.12` · Priority: **P0** · Kind: recovery · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `PL-05`, `PL-06`, `PL-08`.

**Context and problem.** Observations after intake can strengthen requirements without making past semantic work disappear. Sources: [S03][S11][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`; `packages/agentplane/src/commands/task/advance-task-step.ts [introduced by LC-03]`.

**One change.** Use existing refinement/admission rules when new scope/effects/uncertainty invalidate the shortcut; preserve accepted outputs and request only the missing approval/planning input.

**Delete / do not add.** No restart-from-intent path solely because the process obligation changed.

**Acceptance.** (1) New material effects stop before execution. (2) Completed implementation is preserved when safe. (3) Wrong/stale result still rejected. (4) Infrastructure retry does not create a new planner.

**Negative case.** Previously required planning cannot be waived by model self-reclassification.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-planning-escalation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`, `0.7.10-07`.

### PL-10 — Qualify the optional-planning installed package

Release: `0.7.12` · Priority: **P0** · Kind: qualification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `PL-07`, `PL-08`, `PL-09`.

**Context and problem.** The optimization changes planning entry, not review quality or permission. Sources: [S03][S15].

**Bounded code surface.** `scripts/release/check-local-tarball-install-smoke.mjs`; `scripts/checks/ [obligation guard]`.

**One change.** Run installed sufficient/insufficient/critical-policy input, managed/external, drift and recovery fixtures. Assert all formerly mandatory EVALUATOR requirements remain.

**Delete / do not add.** Remove temporary alternative shortcut implementations and shadow probes after parity.

**Acceptance.** (1) One owner, one Plan schema, no fake planner result. (2) Current quality oracle and evaluator floor conserved. (3) All negative authority cases pass.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run package:install-smoke && bun run test:release:critical`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### PL-11 — Measure planning savings including upstream host work

Release: `0.7.12` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `PL-10`, `ST-16`.

**Context and problem.** A Plan supplied by an external agent is not free. Excluding its construction would exaggerate savings. Sources: [S03][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [introduced by ST-15]`.

**One change.** Execute M04 with identical intent and complete host+managed accounting; separately compare no-separate-PLANNER and managed planning bridge removal. Keep fixed final verification and evaluator requirements.

**Delete / do not add.** No counting just the managed sub-run while omitting the host episode that wrote the Plan.

**Acceptance.** (1) All semantic construction costs are attributed or explicitly unknown. (2) Input provenance strata are separate. (3) First mutation and verified result latency are both shown.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** Experiment `M04`. M04 paid authority-gated; structural removal of a dispatch is not a token savings percentage.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### PL-12 — Document sufficient-contract behavior and unchanged evaluation

Release: `0.7.12` · Priority: **P1** · Kind: documentation · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `PL-10`, `PL-11`.

**Context and problem.** Users and coding agents need one explanation of when planning is performed elsewhere versus omitted. Sources: [S03].

**Bounded code surface.** `docs/user/workflow.mdx`; `docs/user/task-lifecycle.mdx`.

**One change.** Document existing compact input, normal approval, fallback planning, managed read-only planning and actual measured limits. State explicitly that independent review has not become optional.

**Delete / do not add.** Remove obsolete unconditional external PLANNER instructions for managed workflows.

**Acceptance.** (1) Examples do not fabricate USER authority. (2) No-Recipe case returns to ordinary obligation resolution. (3) Claims match M04 evidence.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run docs:bootstrap:check && bun run docs:onboarding:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Makes implemented behavior and remaining work explicit; no runtime performance gain is attributed to documentation.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

## 0.7.13 — Formalize reusable recipes as Scenario V2 compiled to the Kernel-owned Plan

### RC-01 — Add strict Scenario V2 parsing and explicit version negotiation

Release: `0.7.13` · Priority: **P0** · Kind: schema · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `PL-12`.

**Context and problem.** Current recipes already package scenarios/assets/validators; Scenario V1 alone is insufficiently typed. Sources: [S03][S09][S10].

**Bounded code surface.** `packages/recipes/src/scenario-contracts.ts`; `packages/recipes/src/scenario.ts`; `packages/recipes/src/resolver-contracts.ts`.

**One change.** Add Scenario API "2" within the existing Recipe package. Parse typed parameters, applicability and a Plan template using the common compact Plan input vocabulary; retain explicit V1 decoding.

**Delete / do not add.** No new TaskRecipe package type, scheduler, lifecycle fields or global recipe run record.

**Acceptance.** (1) Unknown fields/unsupported versions rejected. (2) V1 runtime cannot read V2 as V1. (3) Parsing performs no I/O effects, shell, provider call or task mutation.

**Negative case.** A scenario cannot declare a lifecycle cursor, approval state or terminal success.

**Focused verification.** `bun run test:project recipes --maxWorkers=1 packages/recipes/src/roadmap-scenario-v2-parser.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-09`.

### RC-02 — Validate typed parameters and one-pass interpolation

Release: `0.7.13` · Priority: **P0** · Kind: validation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-01`.

**Context and problem.** Recipe reuse must not turn string substitution into a command injection mechanism. Sources: [S09].

**Bounded code surface.** `packages/recipes/src/scenario.ts`; `packages/recipes/src/scenario-contracts.ts`.

**One change.** Support only string, repo_path, integer and boolean parameters. Substitute once in explicitly approved semantic/path fields; reject placeholders in commands, capabilities, WorkItem IDs, dependency IDs and output IDs.

**Delete / do not add.** No recursive interpolation, expression evaluator or arbitrary template engine.

**Acceptance.** (1) Duplicate/unknown parameters rejected. (2) Nested placeholders remain inert or are rejected by the field contract. (3) Absolute/traversal paths and mistyped values fail closed.

**Negative case.** User text containing shell syntax cannot alter a command or operation ID.

**Focused verification.** `bun run test:project recipes --maxWorkers=1 packages/recipes/src/roadmap-recipe-parameters.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-10`.

### RC-03 — Validate V2 Plan references using the existing Plan validators

Release: `0.7.13` · Priority: **P0** · Kind: validation · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-02`.

**Context and problem.** The normal Task Plan already owns DAG, criteria, checks, scope and output invariants. Sources: [S03][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/graph.ts`; `packages/core/src/tasks/task-centric/schema.ts`; `packages/agentplane/src/runner/context/recipe-context.ts`.

**One change.** After parameter expansion, normalize the template through the existing compact Plan/graph validators. Check dangling guidance/context references and actual filesystem containment at the CLI boundary.

**Delete / do not add.** No second Recipe DAG validator with different semantic acceptance rules.

**Acceptance.** (1) Cycles/dangling inputs/duplicate outputs fail. (2) Scope traversal and symlink escape fail. (3) Required criterion/check references are not silently removed. (4) Platform fixtures cover Windows drive/UNC paths and case aliases, plus symlink/ancestor replacement at use time; unsupported containment fails closed.

**Negative case.** Template normalization cannot weaken a required native check or authority floor.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-plan-validation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-10`.

### RC-04 — Observe Recipe applicability with three-valued predicates

Release: `0.7.13` · Priority: **P0** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-02`, `BP-04`.

**Context and problem.** A model claim of similarity is not a verified applicability fact. Sources: [S09][S11].

**Bounded code surface.** `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/agentplane/src/runtime/capabilities/`.

**One change.** Implement bounded path_exists, capability_available and observed_value_equals predicates over approved observations. Instantiation requires every required predicate true and every excluded predicate false; any relevant unknown prevents it.

**Delete / do not add.** No arbitrary query language or LLM risk classifier. Explicit mismatch is not silently replaced.

**Acceptance.** (1) Every predicate has observation provenance. (2) required=true/excluded=unknown blocks instantiation. (3) Semantic specialization can request missing evidence without automatically involving USER.

**Negative case.** An agent cannot substitute its own boolean for a supervisor observation.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-applicability.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-11`.

### RC-05 — Compute the pre-execution Recipe dependency closure

Release: `0.7.13` · Priority: **P0** · Kind: binding · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-03`.

**Context and problem.** Actually used cannot mean discovered after execution; approved tools may import transitive assets. Sources: [S09][S10].

**Bounded code surface.** `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/agentplane/src/commands/recipes/impl/apply.ts`; `packages/recipes/src/compiled-contracts.ts`.

**One change.** Compute closure from the selected scenario, proposed Plan and declared transitive guidance/tool/asset dependencies before approval. Include entrypoints plus their pinned package/dependency identity; reject an unknown closure rather than guessing what a tool will import.

**Delete / do not add.** Avoid loading unrelated catalogue assets; do not implement universal dynamic import analysis.

**Acceptance.** (1) Changing a transitive required asset changes closure identity. (2) Unrelated installed package does not. (3) Secrets are references, not retained values.

**Negative case.** An unpinned helper import cannot be treated as covered by hashing only the entrypoint file.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-closure.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-12`.

### RC-06 — Retain closure bytes through the existing evidence storage

Release: `0.7.13` · Priority: **P0** · Kind: storage · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-05`, `BP-28`.

**Context and problem.** A closure digest is not recovery evidence when its bytes can disappear after package removal or Git pruning. Sources: [S10][S14].

**Bounded code surface.** `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts`.

**One change.** Store one resolvable immutable closure using existing content-addressed evidence APIs or deliberately retained Git objects. Define reachability/retention until task and audit obligations are satisfied.

**Delete / do not add.** No parallel artifact database or per-episode full Recipe copy; no history rewrite.

**Acceptance.** (1) Offline restart/fresh clone recovers all required bytes. (2) Package update/removal does not select latest. (3) Missing bytes stop recovery honestly.

**Negative case.** A local untracked git-common-dir copy alone is not portable forensic retention.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-retention.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-12`.

### RC-07 — Bind Recipe provenance to the Kernel-owned Plan once

Release: `0.7.13` · Priority: **P0** · Kind: binding · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-04`, `RC-06`.

**Context and problem.** Recipe identity must specialize a Plan, not become a second live Task state. Sources: [S03][S09][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/schema.ts`; `packages/core/src/tasks/task-centric/graph.ts`; `packages/agentplane/src/runner/context/recipe-context.ts`.

**One change.** Add the minimal versioned Plan provenance for package/scenario/version/closure/compiler/parameters/applicability. Use common Plan approval and result admission to bind this provenance.

**Delete / do not add.** No Recipe execution cursor, independent approval or duplicated WorkItem state.

**Acceptance.** (1) Equal normalized inputs yield stable binding. (2) Model cannot replace pinned references during result return. (3) Report-only changes leave Plan semantics unchanged.

**Negative case.** Runtime lookup of installed latest cannot override approved closure.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-plan-binding.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-12`.

### RC-08 — Compile explicit instantiate mode into the Kernel-owned Plan

Release: `0.7.13` · Priority: **P0** · Kind: compiler · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-03`, `RC-04`, `RC-07`.

**Context and problem.** The recipe is a reusable solution strategy; deterministic parts should not be rediscovered by PLANNER. Sources: [S03][S09][S15].

**Bounded code surface.** `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/core/src/tasks/task-centric/graph.ts`; `packages/agentplane/src/runner/usecases/scenario-materialize-task.ts`.

**One change.** Compile fully supplied, formally applicable pinned inputs into the Kernel Plan proposal using common validators. Reuse .12 planning admission; approval, checks, dispatch and completion stay outside the compiler. A genuinely semantic gap produces a specialization request for an agent.

**Delete / do not add.** Delete ad hoc scaffold reconstruction for the migrated V2 path; no new workflow interpreter.

**Acceptance.** (1) Pure compilation has no effects. (2) Same normalized typed input yields the same Plan bytes and binding. (3) Missing facts return a precise evidence need. (4) Semantic uncertainty requests agent specialization rather than invented defaults.

**Negative case.** Recipe instructions cannot suppress independent EVALUATOR before .14 policy qualification.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-recipe-instantiation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-13`.

### RC-09 — Specialize a Recipe through the existing Plan-refinement contract

Release: `0.7.13` · Priority: **P0** · Kind: transport · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-08`.

**Context and problem.** Existing Plan refinement and change-classification primitives must feed the sole Kernel command path rather than remain a parallel task-centric lifecycle. Sources: [S03][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/core/src/tasks/task-centric/schema.ts`; `packages/core/src/runner/agent-work-order.ts`.

**One change.** Express bounded agent-produced add/replace/remove WorkItem changes through the common proposal/refinement machinery and apply them through the Kernel, with the pinned base Plan digest and atomic full-result validation. Extend that shared contract only for missing operations.

**Delete / do not add.** No Recipe-only patch protocol or task-centric reducer parallel to Kernel Plan refinement.

**Acceptance.** (1) Cross-task/stale/duplicate operation rejected. (2) Resulting full Plan passes normal DAG/criteria/check validation. (3) Large departure can return a complete Kernel Plan proposal.

**Negative case.** Removing a WorkItem cannot silently drop mandatory outputs or verification.

**Focused verification.** `bun run test:project core --maxWorkers=1 packages/core/src/commands/task/roadmap-recipe-specialization.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-14`.

### RC-10 — Rebind added specialization dependencies before approval

Release: `0.7.13` · Priority: **P0** · Kind: binding · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-09`, `RC-06`.

**Context and problem.** Specialization can add tools or guidance that were absent from the original template closure. Sources: [S03][S10][S14].

**Bounded code surface.** `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/core/src/tasks/task-centric/policy.ts`; `packages/core/src/tasks/task-centric/graph.ts`.

**One change.** Recompute and retain newly required closure before approving the specialized Plan. Post-approval additions use normal refinement and authority review. Catalogue update, bound-byte tamper and trust revocation have distinct outcomes.

**Delete / do not add.** No automatic repinning of active tasks and no blanket invalidation for unrelated catalogue changes.

**Acceptance.** (1) Installed update leaves approved pinned task usable. (2) Bound-byte tamper fails. (3) Trust revocation triggers current policy admission. (4) Added dependency cannot execute under old approval.

**Negative case.** Source version equality alone does not prove identical asset bytes.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-recipe-repin.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-12`, `0.7.10-14`, `0.7.10-22`.

### RC-11 — Resolve an explicitly selected Recipe without a selector episode

Release: `0.7.13` · Priority: **P1** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-08`.

**Context and problem.** Explicit selection already supplies the reusable strategy identity; invoking a model to choose it again is pure overhead. Sources: [S09][S10].

**Bounded code surface.** `packages/recipes/src/resolver-contracts.ts`; `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/agentplane/src/commands/task/create.command.ts`.

**One change.** Resolve the installed exact version/scenario, check compatibility and applicability, pin it and use normal Plan instantiation/specialization. Refuse incompatible explicit choices with useful diagnostics.

**Delete / do not add.** No selector model call and no nearest-recipe replacement.

**Acceptance.** (1) Explicit sufficient input creates zero selection episodes. (2) Ambiguous version/unknown required facts are visible. (3) Installing a Recipe is not permission to run its effects.

**Negative case.** Unknown scenario API cannot be coerced into a compatible manifest.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/recipes/roadmap-explicit-selection.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-15`.

### RC-12 — Shortlist Recipe candidates only inside already necessary planning

Release: `0.7.13` · Priority: **P1** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-09`, `RC-11`, `PL-01`.

**Context and problem.** Recipe discovery must not reintroduce the separate PLANNER that .12 removed. Sources: [S03][S09][S10].

**Bounded code surface.** `packages/recipes/src/resolver-contracts.ts`; `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/core/src/runner/agent-work-order.ts`.

**One change.** Build a deterministic bounded candidate summary only from exactly comparable compatibility fields and structured observations. The summary makes no semantic applicability claim. Let an already required PLANNER choose or decline; otherwise continue Kernel obligation resolution without auto-starting a selector.

**Delete / do not add.** No full catalogue/package manifests in every episode and no selection-only provider dispatch.

**Acceptance.** (1) No-match sufficient inline task still has zero PLANNER episodes. (2) Candidate ordering/reasons reproducible. (3) An explicit required Recipe mismatch remains a stop, not silent fallback.

**Negative case.** A candidate score cannot grant authority or downgrade mandatory review.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-shortlist.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-15`.

### RC-13 — Project only role-relevant recipe guidance and deviations

Release: `0.7.13` · Priority: **P1** · Kind: projection · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-10`, `RC-12`.

**Context and problem.** Reuse should reduce semantic search work rather than append another full manifest to the prompt. Sources: [S03][S08][S09].

**Bounded code surface.** `packages/agentplane/src/runner/context/recipe-context.ts`; `packages/agentplane/src/runner/usecases/task-run-bootstrap.ts`; `packages/core/src/runner/agent-work-order.ts`.

**One change.** Deliver current role guidance, necessary context and task-specific deviations from the approved Plan; let CLI carry immutable protocol metadata and required check machinery.

**Delete / do not add.** Remove V2 full-manifest/scenario duplication in runner context; keep retained evidence off the model path unless needed.

**Acceptance.** (1) Required constraints conserved. (2) EXECUTOR does not choose lifecycle transitions. (3) Fresh adapter gets complete required semantic context. (4) Restart needs no assumed provider memory.

**Negative case.** Prompt reduction cannot erase negative applicability or stop conditions.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Provider savings are tested in M05; byte reduction alone is diagnostic.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-15`.

### RC-14 — Convert exact V1 structure and route semantic conversion to an agent

Release: `0.7.13` · Priority: **P1** · Kind: migration tooling · Implementation risk: **medium** · Compatibility risk: **high**.
Dependencies: `RC-01`, `RC-03`, `RC-06`, `BP-11`.

**Context and problem.** V1 contains untyped steps; earlier Blueprint extension conversion did not formalize those procedures. Sources: [S09][S10].

**Bounded code surface.** `packages/recipes/src/scenario.ts`; `packages/recipes/src/scenario-contracts.ts`; `packages/agentplane/src/commands/recipes/impl/`.

**One change.** Add offline V1 audit/preview that converts exactly known structures without an agent. Preserve unknown ordered steps and, when conversion is requested, issue one bounded semantic WorkOrder that returns a typed V2 draft or blocker over the retained V1 bytes. Keep asset/policy-only project overlays as overlays.

**Delete / do not add.** No heuristic prose-to-shell compiler and no automatic task creation during conversion.

**Acceptance.** (1) V1 bytes preserved. (2) Unknown mandatory semantics cannot activate without a bound agent conversion and explicit review. (3) Converted draft validates structurally as V2 and remains bound to its source. (4) Formal preview does not install/run anything.

**Negative case.** A plan written as arbitrary prose cannot be advertised as exact machine-equivalent conversion.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/recipes/roadmap-v1-v2-conversion.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects correct admission, retained work and recovery; no isolated token or latency reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-16`.

### RC-15 — Connect V2 materialization to the sole task entrypoint

Release: `0.7.13` · Priority: **P0** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-10`, `RC-13`, `RC-14`.

**Context and problem.** Scenario execution must remain ordinary Agentplane work through the sole Kernel-backed path after formalization. Sources: [S03][S09].

**Bounded code surface.** `packages/agentplane/src/runner/usecases/scenario-materialize-task.ts`; `packages/agentplane/src/commands/task/create.command.ts`; `packages/agentplane/src/commands/scenario/impl/commands.ts`.

**One change.** Use the Kernel-backed creation/proposal/approval/advance path for V2. Keep preview read-only and distinguish preparing a Plan from authorizing execution.

**Delete / do not add.** Delete V2-specific direct runner entry paths and redundant template-to-Task writers.

**Acceptance.** (1) Recipe tasks use the same owner, evidence and recovery as no-Recipe. (2) Same effect is not dispatched twice. (3) Independent review remains required under current policy.

**Negative case.** A scenario execute command cannot synthesize USER approval.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-25`.

### RC-16 — Qualify installed V1/V2 recipes and recovery

Release: `0.7.13` · Priority: **P0** · Kind: qualification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `RC-15`.

**Context and problem.** Schemas, package assets, resolver negotiation and live entrypoint must agree. Sources: [S03][S09][S10].

**Bounded code surface.** `scripts/release/check-local-tarball-install-smoke.mjs`; `packages/recipes/src/scenario.ts`.

**One change.** Run installed parser/instantiation/specialization/no-match/tamper/removal/offline-restart fixtures. Include custom unsupported V1 conversion and ordinary no-Recipe regression.

**Delete / do not add.** Remove temporary migration bridges no longer needed for supported formats.

**Acceptance.** (1) No scheduler or Blueprint abstraction returned. (2) Closure bytes recoverable. (3) Native/semantic authority boundaries retained. (4) Generated schema/example parity passes.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run package:install-smoke && bun run schemas:check && bun run test:release:critical`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### RC-17 — Measure Recipe benefit without gifting it uncounted planning work

Release: `0.7.13` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `RC-16`, `ST-16`.

**Context and problem.** A reusable strategy may reduce search and rework, but applicability/closure/context can add cost. Sources: [S03][S09][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [introduced by ST-15]`.

**One change.** Run M05 comparing the same product/policy with no Recipe, explicit instantiate and specialization where applicable. Count selection, planning, failures and host work; report Recipe authoring/setup separately from per-task steady-state cost.

**Delete / do not add.** No inference of savings from fewer template fields or short prompts.

**Acceptance.** (1) Same objective, model, effort, authority and final oracle. (2) No-match/near-match negative tasks included. (3) Setup amortization is not assumed to be free.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** Experiment `M05`. M05 paid authority-gated; retain no-Recipe fallback when a recipe has no established net benefit.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### RC-18 — Publish the formal Recipe authoring contract and measured limits

Release: `0.7.13` · Priority: **P1** · Kind: documentation · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `RC-16`, `RC-17`.

**Context and problem.** A Recipe is reusable strategy; execution profile is only one operational input. Sources: [S09][S10].

**Bounded code surface.** `docs/developer/recipes-development.mdx`; `docs/user/workflow.mdx`.

**One change.** Document the strict V2 structure, typed parameters, observation predicates, pinned closure, Kernel Plan compilation, formal-versus-semantic boundary and bounded agent specialization with repository-native positive/negative fixtures.

**Delete / do not add.** Delete descriptions of Recipe/Blueprint as separate workflow engines and stale V1 instructions that imply arbitrary steps execute.

**Acceptance.** (1) Examples validate against installed schema. (2) No separate lifecycle state in a recipe. (3) Evidence distinguishes implemented capability from measured economic benefit.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run schemas:check && bun run docs:onboarding:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Makes implemented behavior and remaining work explicit; no runtime performance gain is attributed to documentation.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

## 0.7.14 — Qualify optional JEV decision routing and narrow EVALUATOR omission

### EV-01 — Represent review obligations independently of execution outcome

Release: `0.7.14` · Priority: **P0** · Kind: behavior contract · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `RC-18`, `PL-01`.

**Context and problem.** required, performed, waived and passed are not values on one axis. Native checks and semantic review are different evidence. Sources: [S12][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/core/src/tasks/task-centric/lifecycle.ts`; `packages/agentplane/src/commands/task/quality-review-gate.ts`.

**One change.** Extend the existing pure obligation projection with a separate review-required decision, defaulting to current mandatory review. Completion combines current obligations, actual verdict/check outcomes and fresh evidence.

**Delete / do not add.** No generic waiver API or persisted ProcessDecision lifecycle; no current rule yet omits EVALUATOR.

**Acceptance.** (1) Required+performed+failed/rework cannot finish. (2) not_required is not pass. (3) Current native verification remains independently mandatory.

**Negative case.** Model-written low-risk or waived state cannot satisfy completion.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-review-obligations.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-02`, `0.7.10-05`.

### EV-02 — Specify one narrow deterministic review-omission class

Release: `0.7.14` · Priority: **P0** · Kind: design-contract · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-01`.

**Context and problem.** Generic low-risk coding is not a sufficiently specified class. An initial exact-output task gives a testable boundary without claiming general semantic equivalence. Sources: [S11][S12].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/runtime/capabilities/`; `packages/agentplane/src/commands/task/quality-review-gate.ts`.

**One change.** Define the first candidate class as restoration/copy of a caller-approved non-executable artifact to an exact retained source blob, with a trusted path allowlist and native exact-output proof. Exclude policy, security, code, verification inputs/tools, generated contracts, dependencies, release and any external effects. The rule proves byte equality only; any required semantic quality judgment remains EVALUATOR work.

**Delete / do not add.** No LLM risk classifier, title/size heuristic or universal optional-review rule.

**Acceptance.** (1) Class has an exact predicate, native capability, rule identity and fixed exclusions. (2) Expected bytes originate from approved retained input, not the EXECUTOR. (3) Rule stays inactive.

**Negative case.** One changed critical line, a fixture used as a verification oracle, or model-supplied expected bytes is ineligible.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-exact-output-class.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`.

### EV-03 — Produce native exact-output evidence using existing verification primitives

Release: `0.7.14` · Priority: **P0** · Kind: verification capability · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `EV-02`, `BP-15`.

**Context and problem.** Omission requires a positive independently observed proof, not the absence of a detected risk. Sources: [S12][S13][S14].

**Bounded code surface.** `packages/agentplane/src/commands/task/direct-task-verification.ts`; `packages/agentplane/src/commands/shared/task-verification-input.ts`; `packages/agentplane/src/runtime/capabilities/`.

**One change.** Add or reuse a bounded exact-retained-blob comparison capability. Bind target content, source provenance, changed paths, command/toolchain and current contract/policy. Reuse existing stable readers and verification records.

**Delete / do not add.** No new verifier framework and no trusting EXECUTOR claimed_checks.

**Acceptance.** (1) Exact allowed bytes pass. (2) Any out-of-scope or additional mutation fails. (3) Missing source blob, symlink substitution or changed oracle fails. (4) Input identity survives receipt persistence.

**Negative case.** The task cannot modify the verifier and then use that modified verifier to justify omission.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-exact-output-proof.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`.

### EV-04 — Add opt-in diagnostic classification without affecting execution

Release: `0.7.14` · Priority: **P1** · Kind: diagnostic · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-03`.

**Context and problem.** Early shadow work belongs here, not on every 0.7.9 happy path. Sources: [S11][S12].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/commands/task/ [existing explain diagnostic]`.

**One change.** Expose exact formal eligibility decisions only to explicit diagnostics/qualification. Reuse already available observations; separately account for additional reads. Do not report a semantic risk or quality classification. Normal execution still requires independent review.

**Delete / do not add.** No default shadow provider, background service or durable decision timestamp churn.

**Acceptance.** (1) Diagnostic is deterministic and read-only. (2) No second provider/effect. (3) Classification input/reason/rule identity inspectable.

**Negative case.** Diagnostic eligibility cannot be submitted as authority to omit review.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-review-shadow.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.9-06`, `0.7.10-06`.

### EV-05 — Build adversarial eligibility and proof fixtures

Release: `0.7.14` · Priority: **P0** · Kind: characterization · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-03`, `EV-04`.

**Context and problem.** Positive exact-output cases alone cannot characterize false eligibility. Sources: [S12][S13].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/agentplane/src/commands/shared/task-verification-records.ts`.

**One change.** Add narrow-class negatives: forged risk, critical one-line change, verifier/policy/fixture modification, wrong source bytes, same-size different content, untracked writes, symlink escape, stale inputs and revoked trust.

**Delete / do not add.** Reuse shared negative fixtures; do not create another quality scoring framework.

**Acceptance.** (1) Every forbidden case is ineligible or rejected before completion. (2) An available but irrelevant passing check is insufficient. (3) Expected oracle is independently supplied.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-review-adversarial.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`.

### EV-06 — Preregister the quality-equivalence experiment before rule activation

Release: `0.7.14` · Priority: **P0** · Kind: benchmark specification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-05`, `ST-16`.

**Context and problem.** Passing type/unit tests does not establish that independent review is unnecessary for a class. Sources: [S12][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [introduced by ST-15]`.

**One change.** Define M06 quality study with fixed eligible and near-miss tasks, a blinded independent final oracle, mandatory-review comparator and identical implementation/verification requirements. Define activation criteria and uncertainty handling before measurement.

**Delete / do not add.** Do not use the same rule to label its own successes. Study-only review costs are separately recorded, never hidden.

**Acceptance.** (1) False eligible/false negative definitions fixed. (2) Missing evidence prevents activation. (3) Corpus does not silently broaden the exact-output class.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `node --test scripts/bench/review-rule-qualification.test.mjs`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Experiment `M06`. This task only specifies and validates the experiment; no paid calls.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`, `0.7.10-30`.

### EV-08 — Implement review omission once in the common coordinator

Release: `0.7.14` · Priority: **P0** · Kind: behavior · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `EV-01`, `EV-03`, `EV-06`.

**Context and problem.** The rule has a frozen proposed class and preregistered study; implement a candidate for isolated qualification, not production activation. There is one lifecycle owner. Sources: [S01][S02][S12].

**Bounded code surface.** `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/core/src/tasks/task-kernel/`; `packages/agentplane/src/commands/task/advance-task-step.ts [introduced by LC-03]`.

**One change.** Make the Kernel-backed completion path honor a valid exact native proof plus a qualified formal rule when current policy permits omission; retain default-required behavior until EV-13 installs the qualified activation. Any semantic quality question dispatches EVALUATOR. Use the same branch for managed/external.

**Delete / do not add.** No separate fast lifecycle and no fake passing evaluator verdict.

**Acceptance.** (1) Qualified exact proof can satisfy review-not-required in isolated qualification. (2) Native checks still execute. (3) Ordinary/unknown cases dispatch EVALUATOR. (4) Exactly one coordinator decides. (5) An operator-authorized isolated qualification policy can exercise the candidate; ordinary trusted policy remains review-required until EV-13.

**Negative case.** An unqualified rule ID or stale proof cannot suppress EVALUATOR.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-common-review-omission.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-07`, `0.7.10-08`.

### EV-09 — Escalate review requirements on new material observations

Release: `0.7.14` · Priority: **P0** · Kind: recovery · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `EV-08`.

**Context and problem.** Eligibility at intake does not justify completion after the implementation changes outside the proven class. Sources: [S11][S12][S15].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/commands/shared/task-verification-records.ts`; `packages/agentplane/src/commands/shared/supervisor-execution-episode.ts`.

**One change.** Reassess material changes at result/check/completion boundaries. Strengthen to independent review or required authority/refinement while preserving already accepted semantic work when safe.

**Delete / do not add.** No automatic restart-from-intent and no blind reuse of stale eligibility.

**Acceptance.** (1) Extra source/effect changes revoke omission. (2) Accepted unchanged implementation is not rerun merely to obtain review. (3) Infrastructure retry retains original semantic result.

**Negative case.** Model self-reclassification cannot lower a previously strengthened review obligation.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-review-escalation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`, `0.7.10-07`.

### EV-10 — Explain native verification and omitted review without fabricating provenance

Release: `0.7.14` · Priority: **P1** · Kind: projection · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-09`.

**Context and problem.** The human audit record must show how the verified result was obtained. Sources: [S12][S14].

**Bounded code surface.** `packages/agentplane/src/commands/task/agent-action-packet.ts`; `packages/core/src/tasks/task-centric/compatibility.ts`; `packages/agentplane/src/commands/task/run-render.ts`.

**One change.** Render actual check proof, applicable rule/qualification reference and review not_required separately from a real independent verdict. Retain the minimal rule/proof reference with the existing accepted verification record.

**Delete / do not add.** No synthetic EVALUATOR actor, fake approval or new mutable decision timeline.

**Acceptance.** (1) Independent review provenance only exists when performed. (2) Rule/proof references are available for audit. (3) Repeated rendering creates no Task/event/commit churn.

**Negative case.** A user cannot mistake an omitted evaluator for a passed evaluator.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-review-status.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-05`, `0.7.10-08`, `0.7.10-23`.

### EV-11 — Qualify installed common-path review behavior

Release: `0.7.14` · Priority: **P0** · Kind: qualification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-09`, `EV-10`.

**Context and problem.** The narrow optional path and the broad mandatory path must work in the actual distributed artifact. Sources: [S01][S02][S12].

**Bounded code surface.** `scripts/release/check-local-tarball-install-smoke.mjs`; `scripts/checks/ [obligation guard]`.

**One change.** Run installed eligible/ineligible, managed/external, direct/branch, crash and policy-revocation tests. Check that no alternate engine or Blueprint import was reintroduced.

**Delete / do not add.** Remove temporary duplicate classification/dispatch implementations.

**Acceptance.** (1) Same policies yield same obligations across transports. (2) Native proof and independent review cannot impersonate each other. (3) Safety corpus has zero accepted violations.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run package:install-smoke && bun run test:release:critical && bun run arch:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Protects equivalently verified outcomes; no numerical performance gain is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### EV-07 — Capture an independent quality qualification for the exact rule

Release: `0.7.14` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-06`, `EV-11`.

**Context and problem.** Qualification must precede production activation, not be inferred from a final release summary. Sources: [S12][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [introduced by ST-15]`.

**One change.** Under explicit authority run M06 and publish exact source/rule/capability/corpus/oracle bindings, all failures and uncertainty. A failed or inconclusive study keeps the rule inactive.

**Delete / do not add.** No manually declared qualified flag without the bound evidence; no selective retries.

**Acceptance.** (1) No accepted unauthorized/stale result in safety corpus. (2) Quality evidence meets the preregistered rule. (3) General coding tasks remain review-required regardless of this narrow result.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run test:release:critical`. Existing command; see the task and gate for additional required coverage.

**Measurement.** Experiment `M06`. M06 includes provider calls for the comparator/independent review where authorized; NOT ESTABLISHED means no activation.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`, `0.7.10-30`.

### EV-12 — Measure total cost with review required versus qualified omission

Release: `0.7.14` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-07`, `EV-11`, `ST-16`.

**Context and problem.** A new proof/classification path could cost more than the evaluator it replaces. Sources: [S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs [introduced by ST-15]`.

**One change.** Run M07 on the same product/model/effort/authority and independently verified outcomes, counting proof generation, classification, failures and fallbacks. Show narrow-class frequency separately from overall corpus effect.

**Delete / do not add.** Do not extrapolate a narrow native-proof win to all coding tasks.

**Acceptance.** (1) Complete all-attempt cost coverage. (2) Quality qualification unchanged. (3) Observed gain or explicit mixed/NOT ESTABLISHED result. (4) No default activation without the declared benefit gate.

**Negative case.** All relevant frozen safety cases remain unchanged; do not weaken their expected outcomes.

**Focused verification.** `bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check`. Existing command; see the task and gate for additional required coverage.

**Measurement.** Experiment `M07`. M07 paid authority-gated; this is distinct from the preceding quality study.

**Expected impact.** Enables trustworthy measurement; no direct cost reduction is asserted.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-30`.

### EV-13 — Activate only the qualified rule and publish its limits

Release: `0.7.14` · Priority: **P0** · Kind: policy activation · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `EV-07`, `EV-11`, `EV-12`.

**Context and problem.** Quality, safety and economic evidence are independent gates. Optional EVALUATOR is not a blanket product mode. Sources: [S11][S12][S17].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `docs/user/workflow.mdx`; `docs/user/task-lifecycle.mdx`.

**One change.** Install the exact qualified rule/capability binding into trusted policy only if Q01 and Q02 pass. Otherwise keep mandatory evaluation and report the feature unactivated; remove an unhelpful speculative path from the release candidate rather than retaining a dormant subsystem indefinitely.

**Delete / do not add.** No unchecked runtime allowlist edit, self-approved rule or generic waive switch.

**Acceptance.** (1) Rule changes invalidate its qualification. (2) Only the exact qualified task class can omit review. (3) Operator can revert policy to required review without rewriting task history. (4) Release notes state actual limits.

**Negative case.** Functional implementation alone is not authorization to enable omission.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-review-activation.test.ts`. Proposed focused test target; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Measure only the changed boundary; no end-to-end savings claim.

**Expected impact.** Removes the named duplicated work or implementation; end-to-end effect remains a hypothesis until the release measurement.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** `0.7.10-06`, `0.7.10-07`, `0.7.10-08`, `0.7.10-30`.

### EV-14 — Configure purpose-specific JEV modes during project initialization

Release: `0.7.14` · Priority: **P0** · Kind: configuration contract · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `EV-01`, `ST-10`, `LC-23`.

**Context and problem.** A global active switch would conflate decisions with different safety and evidence requirements. Initialization also needs a usable credential path without committing or displaying the secret. Sources: [S11][S18][S19].

**Bounded code surface.** `packages/agentplane/src/commands/init/`; `packages/agentplane/src/config/`; `.gitignore`.

**One change.** Add interactive initialization choices off, shadow and active. Expand each preset into explicit purpose policies for semantic_retrieval, model_effort_routing, context_sufficiency, planning_triage, recipe_applicability, evaluator_depth and evaluator_omission. For shadow or active, prompt for OPENROUTER_API_KEY, confirm that the target .env is excluded by Git before writing, preserve unrelated existing entries, require explicit replacement of an existing key, and store only the credential variable name in tracked configuration. Non-interactive initialization requires the key through an approved environment or secret input and fails before configuration when it is missing.

**Delete / do not add.** No API key in tracked configuration, command arguments, stdout/stderr, Task state, receipts or generated documentation. No single active boolean that bypasses purpose-level qualification.

**Acceptance.** (1) off is the default and needs no credential (2) shadow and active require a non-empty OpenRouter key (3) the key is written only after .env ignore verification and is never rendered (4) active expands only to purpose rules qualified by the installed release (5) re-running init preserves unrelated .env content and does not overwrite a key silently

**Negative case.** If .env is tracked, not ignored, unwritable or ambiguously parsed, initialization refuses to write the key and leaves tracked configuration unchanged.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-jev-init.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Verify interactive and non-interactive configuration behavior with redacted fixtures.

**Expected impact.** Makes optional JEV configuration usable and auditable without weakening secret handling or lifecycle ownership.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-15 — Add one bounded JEV DecisionProvider and durable decision receipt

Release: `0.7.14` · Priority: **P0** · Kind: provider contract · Implementation risk: **high** · Compatibility risk: **low**.
Dependencies: `EV-14`, `ST-10`.

**Context and problem.** JEV is a typed decision model, not a role agent, lifecycle engine or authority source. Provider failures and response drift must remain observable and harmless. Sources: [S08][S11][S17].

**Bounded code surface.** `packages/agentplane/src/runner/adapters/`; `packages/agentplane/src/runner/usecases/`; `packages/core/src/tasks/task-kernel/`.

**One change.** Introduce one application-layer DecisionProvider contract with bounded typed state, purpose, pinned model and question-set digests, timeout and token budgets, and observed, unavailable or invalid outcomes. Retain a receipt with requested and served model, request identity when available, distributions, thresholds, latency, usage status, privacy route and fallback reason. The common coordinator validates the result and applies only a purpose policy already permitted by trusted configuration.

**Delete / do not add.** No provider dependency in Task Kernel, no new runner or role, no arbitrary next-action output, no provider-owned authority and no raw prompt or secret retention in the receipt.

**Acceptance.** (1) equal bounded inputs produce a stable request identity (2) unknown schema, model drift, timeout or malformed output becomes unavailable or invalid (3) provider usage and latency are retained without exposing the key (4) every failure selects the existing non-JEV path (5) the Kernel receives no provider dependency

**Negative case.** A valid JEV response cannot approve work, mutate Task state, select an unallowed tool or trigger Git, merge, release or external effects.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-jev-decision-provider.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Fake-provider coverage proves protocol and fallback only, not model quality.

**Expected impact.** Creates one reusable decision boundary and prevents per-feature provider integrations from fragmenting authority and accounting.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-16 — Connect JEV to digest-bound semantic retrieval selection

Release: `0.7.14` · Priority: **P0** · Kind: inactive behavior candidate · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `EV-15`, `LC-23`.

**Context and problem.** Retrieval selection is the safest first behavior-changing use because candidates and outputs are bounded and deterministic fallback already preserves useful context. Sources: [S08][S11][S12].

**Bounded code surface.** `packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts`; `packages/agentplane/src/runner/usecases/task-knowledge-retrieval.ts`.

**One change.** Adapt the existing SemanticRetrievalSelector invocation seam to the common DecisionProvider. Bind the candidate-set digest and permit only selected existing ref and digest pairs within current budgets. Keep the candidate order and deterministic fallback when JEV is disabled, unavailable, invalid, stale or over budget. Implement the active branch as an inactive qualification candidate until EV-20.

**Delete / do not add.** No free-form repository lookup, generated reference, hidden multi-step search, state filtering by the model or network authority granted to the retrieval helper.

**Acceptance.** (1) JEV can select only supplied current candidates (2) stale or unknown ref and digest pairs are rejected (3) disabled and failure paths return the existing deterministic set (4) selection usage is attributable to the task attempt (5) ordinary unambiguous retrieval invokes no provider

**Negative case.** Repository text cannot inject a new question, expand authority or cause a reference outside the digest-bound candidate set to be accepted.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/usecases/roadmap-jev-semantic-retrieval.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Candidate for M08. No production activation or savings claim in this task.

**Expected impact.** Provides the first bounded active candidate while retaining deterministic useful output on every provider failure.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-17 — Route model tier and reasoning effort inside trusted allowlists

Release: `0.7.14` · Priority: **P0** · Kind: inactive behavior candidate · Implementation risk: **high** · Compatibility risk: **medium**.
Dependencies: `EV-15`, `ST-16`.

**Context and problem.** Model and effort choice can reduce cost without omitting semantic work, but it must not expand provider, capability, budget or authority beyond trusted policy. Sources: [S08][S11][S17].

**Bounded code surface.** `packages/agentplane/src/commands/shared/route-decision.ts`; `packages/agentplane/src/runner/`; `packages/core/src/tasks/task-kernel/`.

**One change.** Let JEV choose a model tier and reasoning effort only from a coordinator-supplied allowlist for the already required semantic purpose. Validate provider availability, budget and policy after the decision. Unknown, low-confidence, unavailable or invalid results select the current configured model and effort. Implement the route as an inactive qualification candidate until EV-20.

**Delete / do not add.** No raw model identifier from JEV, no cross-provider credential selection, no authority escalation, no change to mandatory stages and no dynamic budget increase.

**Acceptance.** (1) only allowlisted model and effort pairs are accepted (2) the actual served model and effort are recorded separately from the request (3) fallback preserves the current configured route (4) mandatory semantic work still runs (5) cost comparison includes routing overhead and failures

**Negative case.** A high-confidence response cannot choose an unavailable frontier model, a disallowed provider or an effort above the issued budget.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-jev-model-routing.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Candidate for M08. No production activation or savings claim in this task.

**Expected impact.** Targets recurring provider cost while preserving the required semantic episode and its authority envelope.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-18 — Shadow context, planning and Recipe applicability decisions

Release: `0.7.14` · Priority: **P1** · Kind: diagnostic · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `EV-15`, `PL-12`, `RC-18`.

**Context and problem.** Context sufficiency, semantic planning need and Recipe applicability may avoid waste, but incorrect active decisions can remove required meaning or create a selector-only episode. Sources: [S03][S09][S10][S11].

**Bounded code surface.** `packages/agentplane/src/commands/shared/route-decision.ts`; `packages/agentplane/src/runner/context/`; `packages/recipes/src/`.

**One change.** Add explicit opt-in shadow decisions for context sufficiency, planning triage and Recipe applicability using bounded states already available at their decision points. Preserve the ordinary route as authoritative. Compare JEV with later context requests, PLANNER refinement, selected or declined Recipe, rework and verified outcome. An eventual active rule must replace an equivalent routing judgment rather than add a default selector-only provider episode.

**Delete / do not add.** No automatic Plan completeness claim, no Recipe instantiation from similarity, no new CURATOR identity, no provider call on every task and no removal of exact formal admission checks.

**Acceptance.** (1) shadow mode changes no route or persisted semantic outcome (2) each purpose has a distinct schema and question-set digest (3) ambiguous observations stay ambiguous (4) diagnostics are attributable and redacted (5) disabled mode creates no provider call or canonical churn

**Negative case.** JEV cannot convert an unresolved semantic gap into a formal fact or treat a near-match Recipe as applicable.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-jev-development-shadow.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Shadow evidence feeds M08; no active route is enabled here.

**Expected impact.** Measures additional development-routing opportunities without coupling them to the critical path.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-19 — Preregister the JEV development-routing qualification

Release: `0.7.14` · Priority: **P0** · Kind: benchmark specification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-16`, `EV-17`, `EV-18`, `ST-16`.

**Context and problem.** Combining heterogeneous decision purposes into one accuracy number would hide safety direction, fallback cost and selection frequency. Sources: [S08][S11][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs`; `agentplane-roadmap-r2/experiment-requirements.json`.

**One change.** Preregister M08 with separate strata and acceptance rules for retrieval, model and effort, context, planning and Recipe decisions. Freeze datasets, labels, independent oracles, purpose schemas, model and question-set digests, confidence policy, fallback behavior, randomized order, uncertainty method and maximum spend before live calls. Measure quality first and total cost per equivalently verified result second.

**Delete / do not add.** No aggregate accuracy gate, post-hoc threshold selection, cherry-picked successful attempts or reuse of one purpose qualification for another.

**Acceptance.** (1) each purpose has fixed error directions and activation criteria (2) missing or ambiguous labels are retained explicitly (3) all provider failures and fallbacks are counted (4) the minimal non-JEV control is included (5) insufficient evidence yields NOT ESTABLISHED

**Negative case.** A retrieval win cannot qualify evaluator, planning, Recipe or model-routing behavior.

**Focused verification.** `node --test scripts/bench/jev-development-routing-qualification.test.mjs`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Experiment M08 is specified only; no paid calls are authorized by this task.

**Expected impact.** Makes purpose-specific activation falsifiable and prevents a blended benchmark from concealing harmful decisions.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-20 — Activate only qualified JEV development-routing purposes

Release: `0.7.14` · Priority: **P0** · Kind: measurement and policy activation · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `EV-19`, `EV-11`.

**Context and problem.** The active preset must be the union of exact qualified purpose rules, not a promise that every configured JEV decision is behavior-changing. Sources: [S08][S11][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs`; `packages/agentplane/src/config/`; `docs/user/workflow.mdx`.

**One change.** Under explicit authority run M08 and retain all attempts, bindings and uncertainty. Install only purpose rules that pass Q00, Q02 and Q03 for the exact model, question set, policy and corpus. Keep other purposes shadow or disabled. Any later change invalidates that purpose qualification without disabling unrelated qualified purposes.

**Delete / do not add.** No all-or-nothing active switch, manually declared qualification, silent threshold change or permanent dormant path that did not demonstrate benefit.

**Acceptance.** (1) active expands to an inspectable purpose map (2) failed or inconclusive purposes remain shadow or disabled (3) retrieval and model routing can activate independently (4) operator can revert a purpose without rewriting history (5) release notes state observed limits and corpus frequency

**Negative case.** Successful retrieval qualification cannot enable planner, Recipe, context or evaluator decisions.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-jev-development-activation.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Run M08 only with explicit provider, network and budget authority. NOT ESTABLISHED means no activation.

**Expected impact.** Allows low-risk benefits to ship independently while preserving exact evidence boundaries.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-21 — Shadow evaluator depth and omission decisions

Release: `0.7.14` · Priority: **P0** · Kind: diagnostic · Implementation risk: **medium** · Compatibility risk: **low**.
Dependencies: `EV-15`, `EV-11`.

**Context and problem.** Evaluator routing has asymmetric risk: unnecessary review costs money, while a false omission may hide a material defect. Sources: [S11][S12][S17].

**Bounded code surface.** `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/agentplane/src/commands/shared/workflow-step-factory.ts`.

**One change.** Before the existing EVALUATOR dispatch, run opt-in JEV shadow questions for evaluator depth and full-review need over bounded current intent, implementation, verification and risk observations. Record the receipt, then run the unchanged EVALUATOR and close or rework path. Label later evidence as FULL_REVIEW_MATERIALLY_MATTERED, NO_MATERIAL_ADDED_VALUE or AMBIGUOUS rather than treating pass as proof that review was unnecessary.

**Delete / do not add.** No omitted EVALUATOR, no synthetic verdict or findings, no shadow result accepted as authority and no default provider call when JEV is off.

**Acceptance.** (1) normal EVALUATOR remains authoritative (2) shadow output cannot satisfy quality_review (3) labels include later findings and rework (4) ambiguous cases are not forced negative (5) receipts bind current implementation and evidence identity

**Negative case.** A high-confidence no-review answer cannot close, publish, queue or integrate a task.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-jev-evaluator-shadow.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Shadow and replay evidence feed M09; no active omission is enabled here.

**Expected impact.** Collects decision-quality evidence on the highest-value route without weakening the current review floor.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-22 — Preregister the JEV false-skip qualification

Release: `0.7.14` · Priority: **P0** · Kind: benchmark specification · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-21`, `ST-16`.

**Context and problem.** Raw accuracy and evaluator pass rate do not measure whether review materially mattered. Thresholds chosen after observing results cannot justify omission. Sources: [S11][S12][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs`; `agentplane-roadmap-r2/experiment-requirements.json`.

**One change.** Preregister M09 using historical replay, live shadow and adversarial eligible and near-miss strata. Freeze labels, independent blinded oracle, deterministic eligibility class, purpose schema, model and question-set digests, confidence threshold, retry cap, uncertainty method and maximum permitted false-skip bound before calls. Require zero accepted safety-corpus violations and a supported one-sided upper bound below the preregistered policy limit; an underpowered study is NOT ESTABLISHED.

**Delete / do not add.** No pass-equals-no-value label, post-hoc threshold, same-rule self-labeling, forced binary ambiguous cases or generalization outside the frozen class.

**Acceptance.** (1) false skip and unnecessary review are defined separately (2) ambiguous labels remain in coverage accounting (3) adversarial hidden-risk and missing-test cases are included (4) sample-size and uncertainty policy are fixed before calls (5) missing or inconclusive evidence prevents activation

**Negative case.** Zero observed false skips in a small corpus is not sufficient when the preregistered upper confidence bound is not met.

**Focused verification.** `node --test scripts/bench/jev-evaluator-qualification.test.mjs`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Experiment M09 is specified only; no paid calls are authorized by this task.

**Expected impact.** Turns evaluator omission into a measurable asymmetric-risk claim rather than an architectural assumption.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-23 — Implement the inactive JEV evaluator-routing candidate

Release: `0.7.14` · Priority: **P0** · Kind: inactive behavior candidate · Implementation risk: **high** · Compatibility risk: **medium**.
Dependencies: `EV-22`, `EV-09`.

**Context and problem.** The candidate must exist for qualification, but ordinary policy must still require the EVALUATOR until the exact JEV rule passes its gates. Sources: [S01][S02][S11][S12].

**Bounded code surface.** `packages/agentplane/src/commands/task/quality-review-gate.ts`; `packages/agentplane/src/commands/task/advance-task-step.ts`; `packages/core/src/tasks/task-kernel/`.

**One change.** Implement evaluator depth selection and a narrowly eligible omission branch once in the common coordinator. Deterministic policy first establishes eligibility and exclusions. JEV may then select full, lightweight or no additional evaluator only within that class. Unavailable, invalid, uncertain, stale or risk-positive decisions require the full current EVALUATOR. Keep the candidate inactive outside an explicitly authorized qualification policy.

**Delete / do not add.** No generic waiver, no JEV-only eligibility, no fake pass verdict, no separate fast lifecycle and no active default before EV-26.

**Acceptance.** (1) ordinary policy still dispatches the current EVALUATOR (2) qualification policy can exercise all candidate branches (3) native checks remain mandatory (4) new material observations strengthen to full review (5) one coordinator owns managed and external behavior

**Negative case.** An unqualified model, question set, threshold, deterministic class or stale receipt cannot suppress EVALUATOR.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-jev-evaluator-candidate.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Inactive candidate for M09 and M10; no production activation here.

**Expected impact.** Provides a realistic installed candidate for qualification without weakening ordinary review behavior.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-24 — Capture independent JEV evaluator-routing quality evidence

Release: `0.7.14` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-23`, `EV-11`.

**Context and problem.** Provider quality must be measured against the frozen independent oracle after the installed inactive candidate passes safety and recovery qualification. Sources: [S11][S12][S17].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs`.

**One change.** Under explicit authority run M09 and publish all replay, shadow, adversarial and fallback attempts with exact product, provider, model, question set, deterministic class, threshold, corpus and oracle bindings. Report false skips, unnecessary reviews, ambiguous coverage, calibration, fallback, later rework and uncertainty. A failed, underpowered or inconclusive result keeps evaluator routing inactive.

**Delete / do not add.** No selective retries, hidden excluded attempts, manually declared qualified flag or replacement of the independent oracle with JEV or the omission rule.

**Acceptance.** (1) safety corpus has zero accepted violations (2) the preregistered false-skip bound is met (3) ambiguous and failed calls remain in coverage (4) quality result is purpose and version specific (5) general coding equivalence is not claimed

**Negative case.** Changing the model, prompt, threshold, deterministic class or oracle invalidates this qualification.

**Focused verification.** `bun run test:release:critical`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Run M09 only with explicit provider, network and budget authority. NOT ESTABLISHED means no activation.

**Expected impact.** Produces the empirical false-skip evidence required for any behavior-changing evaluator route.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-25 — Measure total JEV evaluator-routing cost and benefit

Release: `0.7.14` · Priority: **P0** · Kind: measurement · Implementation risk: **low** · Compatibility risk: **low**.
Dependencies: `EV-24`, `ST-16`.

**Context and problem.** A JEV call, receipt, fallback and occasional full review can cost more than the evaluator route it is intended to optimize. Sources: [S08][S17][S19].

**Bounded code surface.** `scripts/bench/paired-production-driver.mjs`.

**One change.** Run M10 on the same product, task, implementation, authority and final independent oracle. Compare required full EVALUATOR with qualified JEV depth or omission. Count JEV calls, full and lightweight evaluators, fallbacks, failures, retries, rework, host work, total provider cost and time to equivalently verified result. Report eligible-class frequency separately from within-class effect.

**Delete / do not add.** No successful-run-only mean, free shadow or setup work, provider-price guess, hidden fallback cost or extrapolation from the eligible class to all tasks.

**Acceptance.** (1) all assigned attempts are included (2) quality qualification remains unchanged (3) complete usage or an explicit bounded result is reported (4) net benefit meets the preregistered gate (5) mixed or inconclusive results are labelled MIXED or NOT ESTABLISHED

**Negative case.** A lower JEV call price cannot justify activation when total cost per equivalently verified result does not improve.

**Focused verification.** `bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** Experiment M10 is paid and authority-gated; it is distinct from M09 quality qualification.

**Expected impact.** Prevents a cheap individual decision from being mistaken for a cheaper verified product outcome.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

### EV-26 — Activate exact qualified JEV evaluator-routing rules

Release: `0.7.14` · Priority: **P0** · Kind: policy activation · Implementation risk: **medium** · Compatibility risk: **medium**.
Dependencies: `EV-24`, `EV-25`.

**Context and problem.** JEV evaluator routing is safe only as a narrow versioned policy binding. The active preset must remain a readable set of exact qualified purposes. Sources: [S11][S12][S17].

**Bounded code surface.** `packages/core/src/tasks/task-centric/policy.ts`; `packages/agentplane/src/config/`; `docs/user/workflow.mdx`; `docs/user/task-lifecycle.mdx`.

**One change.** Install evaluator_depth or evaluator_omission purpose rules only when Q00, Q01, Q02 and Q03 pass for the exact deterministic eligibility class, model, question set, thresholds and installed artifact. Otherwise leave each purpose shadow or disabled. Render actual JEV routing, fallback and any real EVALUATOR provenance separately. Let the operator revert the purpose policy without rewriting historical receipts.

**Delete / do not add.** No global active override, unchecked allowlist edit, self-approved policy, synthetic evaluator actor or widening from one qualified class to another.

**Acceptance.** (1) each active purpose references its qualification evidence (2) changes invalidate only the affected purpose (3) ordinary ineligible and uncertain tasks retain full review (4) operator rollback is immediate and auditable (5) release notes state exact limits and observed eligible frequency

**Negative case.** Functional implementation, low price or development-routing qualification alone cannot enable evaluator omission.

**Focused verification.** `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-jev-evaluator-activation.test.ts`. Proposed target unless a matching file already exists; reuse an equivalent existing file, register it in the proper suite and require nonzero executed tests.

**Measurement.** No paid calls. Activation consumes the accepted M09 and M10 evidence; absent evidence keeps the purpose inactive.

**Expected impact.** Enables only empirically supported evaluator savings while preserving full-review fallback and honest provenance.

**Invariants / compatibility.** I01–I12; Follow the release format boundary and C01–C08; do not silently reinterpret historical records.

**Original roadmap coverage.** New 0.7.14 scope; no legacy roadmap group mapping.

## 10. Original roadmap coverage and explicit changes

Every one of the 37 original PR groups is accounted for below. A mapping does not claim every current code consumer has already been found; ST-01 produces that executable ledger.

| Original group | New task IDs                                                                                                                               | Disposition                                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0.7.9-01`     | ST-01                                                                                                                                      | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.9-02`     | ST-02, ST-03, ST-04, ST-05, ST-21                                                                                                          | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.9-03`     | ST-06, ST-07                                                                                                                               | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.9-04`     | ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, ST-14, ST-15, ST-17                                                                              | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.9-05`     | LC-07                                                                                                                                      | Deferred to LC-07: separate native/review in the selected common path; do not refactor the kernel-specific inspection shell before .11 convergence solely for a stabilization milestone.                                            |
| `0.7.9-06`     | ST-20, PL-01, EV-04                                                                                                                        | Removed as a .9 runtime/release dependency. Pure planning resolution appears only when needed in PL-01; explicit diagnostic review qualification is EV-04.                                                                          |
| `0.7.9-07`     | ST-15, ST-16, ST-18, ST-19, ST-20                                                                                                          | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-01`    | LC-01, LC-02, LC-04, LC-06, LC-19                                                                                                          | Task Kernel remains the sole domain reducer; one coordinator reuses mature ordinary route/effect operations. No parallel reducer, kernel-specific outer loop or third engine. .11 contains convergence and maximum proven deletion. |
| `0.7.10-02`    | PL-01, EV-01                                                                                                                               | Replaced by pure existing-policy obligation projection; no persisted ProcessDecision aggregate.                                                                                                                                     |
| `0.7.10-03`    | PL-02                                                                                                                                      | Reuse the already implemented compact TaskPlanProposal V2 input; no parallel inline schema.                                                                                                                                         |
| `0.7.10-04`    | PL-03, PL-04                                                                                                                               | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-05`    | LC-07, PL-01, PL-07, EV-01, EV-10                                                                                                          | Split obligation from attempt/outcome/freshness. No generic waived state/API.                                                                                                                                                       |
| `0.7.10-06`    | PL-05, PL-09, EV-02, EV-03, EV-04, EV-05, EV-06, EV-07, EV-09, EV-13                                                                       | Planning and review are separate releases. No-review rules activate only after independent qualification and benefit.                                                                                                               |
| `0.7.10-07`    | PL-05, PL-09, EV-08, EV-09, EV-13                                                                                                          | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-08`    | PL-06, PL-07, PL-08, EV-08, EV-10, EV-13                                                                                                   | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-09`    | RC-01                                                                                                                                      | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-10`    | RC-02, RC-03                                                                                                                               | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-11`    | RC-04                                                                                                                                      | Unknown excluded predicates block deterministic instantiation as well as unknown required predicates.                                                                                                                               |
| `0.7.10-12`    | RC-05, RC-06, RC-07, RC-10                                                                                                                 | Pin the full declared pre-execution transitive closure, including specialization additions; retain recoverable bytes.                                                                                                               |
| `0.7.10-13`    | RC-08                                                                                                                                      | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-14`    | RC-09, RC-10                                                                                                                               | Reuse common Plan refinement, not a second Recipe delta protocol.                                                                                                                                                                   |
| `0.7.10-15`    | RC-11, RC-12, RC-13                                                                                                                        | No-match returns to ordinary obligation resolution and never forces a selector or PLANNER.                                                                                                                                          |
| `0.7.10-16`    | BP-09, BP-10, BP-11, BP-19, RC-14                                                                                                          | Split V1 Blueprint-extension retirement in .10 from procedural Scenario V1->V2 audit in .13.                                                                                                                                        |
| `0.7.10-17`    | BP-01, BP-02, BP-09, BP-10, BP-11                                                                                                          | Native policy and existing V1 conversions unblock Blueprint removal before adaptive or Scenario V2 work.                                                                                                                            |
| `0.7.10-18`    | BP-01, BP-03, BP-04, BP-05, BP-14, BP-23                                                                                                   | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-19`    | BP-01, BP-06, BP-07                                                                                                                        | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-20`    | BP-01, BP-08                                                                                                                               | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-21`    | BP-12, BP-13, BP-14                                                                                                                        | Extend existing task_verification_input v4 family, not a new VerificationBinding V2. Separate concurrency and checked-input identity.                                                                                               |
| `0.7.10-22`    | BP-15, BP-16, RC-10                                                                                                                        | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-23`    | BP-17, BP-18, LC-08, EV-10                                                                                                                 | Preserved, decomposed into the linked scoped tasks, and assigned to its delivery release.                                                                                                                                           |
| `0.7.10-24`    | ST-21, BP-22, LC-02, LC-03, LC-04, LC-05, LC-08, LC-09, LC-10, LC-11, LC-12, LC-15                                                         | Full owner cutover is .11; .10 only switches Blueprint-free bindings/issuance while conserving lifecycle requirements.                                                                                                              |
| `0.7.10-25`    | LC-05, LC-12, LC-16, LC-17, RC-15                                                                                                          | Existing V1 entrypoint convergence is .11; new V2 uses that owner in .13.                                                                                                                                                           |
| `0.7.10-26`    | BP-19, LC-13                                                                                                                               | Preview before each respective cutover; read-only local Git permitted.                                                                                                                                                              |
| `0.7.10-27`    | BP-20, BP-21, LC-14                                                                                                                        | Use one admission fence including outstanding external work, provider integration and native result application.                                                                                                                    |
| `0.7.10-28`    | BP-22, BP-23, BP-24, BP-29, LC-20                                                                                                          | Stop Blueprint writers in .10; canonical terminal no-op is also checked in .11. Operational diagnostics may be noncanonical.                                                                                                        |
| `0.7.10-29`    | BP-25, BP-26, BP-27, BP-28, BP-29, LC-18, LC-19                                                                                            | Blueprint removal in .10, superseded executable lifecycle deletion in .11; cold audit codecs only.                                                                                                                                  |
| `0.7.10-30`    | ST-16, BP-27, BP-29, BP-30, BP-31, LC-21, LC-22, LC-23, LC-24, PL-10, PL-11, PL-12, RC-16, RC-17, RC-18, EV-06, EV-07, EV-11, EV-12, EV-13 | Separate per-release Q00, per-rule Q01 and measured Q02; no general efficiency or optional-review claim from code completion.                                                                                                       |

## 11. Audit-gap closure map

| Finding                                                                                                                        | Required resolution                                                                                                                                                  | Tasks                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **F01** — ProcessDecision duplication/circularity and mixed stage-state axes                                                   | Pure existing policy projection; separate obligation, outcome and freshness; no new aggregate or cursor.                                                             | BP-01, LC-01, PL-01, PL-07, EV-01, EV-10                             |
| **F02** — Verification invalidates itself on service-only Task revision                                                        | Reuse existing verification-input family; separate exact admission from material check identity and current obligation coverage.                                     | BP-12, BP-13, BP-15, LC-20                                           |
| **F03** — Independent evaluator disabled before actual quality qualification                                                   | No default activation before independent Q01 and economic Q02; code path alone is insufficient.                                                                      | EV-02, EV-03, EV-05, EV-06, EV-07, EV-08, EV-12, EV-13               |
| **F04** — Migration CAS races with dispatch/result/provider effects                                                            | Preview before cutover; common admission fence covers managed, external, native validation and integration.                                                          | BP-19, BP-20, BP-21, LC-13, LC-14                                    |
| **F05** — Unknown exclusion can be treated as safe applicability                                                               | All required true AND all excluded false; unknown blocks deterministic instantiation.                                                                                | RC-04                                                                |
| **F06** — Closure is post-hoc, incomplete or invalidated by unrelated catalogue changes                                        | Pre-execution transitive closure; retain bytes; repin specialization before approval; separate catalogue update, tamper and revocation.                              | RC-05, RC-06, RC-07, RC-10                                           |
| **F07** — No-Recipe fallback restarts unnecessary PLANNER                                                                      | Return to ordinary obligation resolution; no selector-only episode.                                                                                                  | PL-01, PL-05, RC-12                                                  |
| **F08** — Incomplete telemetry and proxy benchmarks treated as release proof                                                   | Durable provider-bound all-attempt usage; A/B/C production driver; explicit separate safety/activation/claim gates.                                                  | ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, ST-14, ST-15, ST-16, ST-19 |
| **F09** — Too much functionality and unnecessary critical-path coupling                                                        | Six release barriers; architecture, owner convergence, post-convergence test cleanup, planning, recipes and evaluation activation are distinct.                      | ST-20, BP-31, LC-23, LC-24, PL-12, RC-18, EV-13                      |
| **N01** — Roadmap proposes another inline input schema despite existing compact Plan input                                     | Reuse task-centric compact proposal input V2 and its normalizer; no second InlineTaskContract.                                                                       | ST-07, PL-02, PL-03, RC-03, RC-08                                    |
| **N02** — Generic VerificationBinding V2 duplicates current task_verification_input v4                                         | Version the existing family only when necessary; no parallel evidence identity.                                                                                      | BP-12, BP-13, BP-15                                                  |
| **N03** — Newer kernel chosen as canonical without hosted/context/recovery parity                                              | Keep Task Kernel as the canonical reducer; extract the coordinator from the mature ordinary route/effect path, map every guarantee, then retire duplicate executors. | LC-01, LC-06, LC-10, LC-11, LC-13, LC-19                             |
| **N04** — Blueprint removal implicitly depends on future Recipe V2                                                             | Use bounded V1 guidance/validator conversions in .10; formal procedural V2 conversion is .13.                                                                        | BP-09, BP-10, BP-11, RC-14                                           |
| **N05** — External outstanding WorkOrders are invisible to PID-only quiescence                                                 | Include pending external work in fencing and migration blockers, even without a managed process.                                                                     | ST-05, BP-19, BP-20, LC-13                                           |
| **N06** — State-fingerprint components still refer to removed Blueprint                                                        | Explicit versioned fingerprint/WorkOrder transition preserves all material constraints.                                                                              | BP-14, BP-17, BP-22                                                  |
| **N07** — Local receipt digests cannot reconstruct evidence after fresh clone/pruning                                          | Portable retained-byte/reachable-object contract; missing payload is not regenerated or guessed.                                                                     | BP-28, RC-06                                                         |
| **N08** — Provider-only accounting hides host Plan construction cost                                                           | Whole intent-to-result accounting including host work; unallocatable shared turns are explicit.                                                                      | ST-11, ST-12, PL-11, RC-17                                           |
| **N09** — Every atomic checklist item becomes another heavyweight task lifecycle                                               | Atomic diff/acceptance unit is not a requirement for one PR or paid episode; use scoped WorkItems and existing evidence.                                             | ST-01, LC-01                                                         |
| **N10** — Backend serialization, platform or adapter differences weaken guarantees during cutover                              | Supported-port round trips, capability preflight, platform path tests and exact format errors; no silent fallback.                                                   | ST-21, BP-04, BP-14, LC-21, RC-03                                    |
| **N11** — Completed prior fixes are repeated as new feature work                                                               | Current source lock and already_satisfied verification; preserve NGDG6V/P1MJV7 improvements and reuse existing parsers.                                              | ST-04, ST-07, ST-08, BP-12                                           |
| **N12** — Current rules or generated views reopen terminal work and produce churn                                              | Terminal replay is a canonical/effect no-op; historical policy audit does not silently schedule new work.                                                            | BP-18, BP-24, LC-20, PL-07, EV-10                                    |
| **N13** — Live quality study scheduled before the candidate path exists, or public callers retired after their imported engine | Move cold decoders and public callers first; test an inactive implementation before independent study, then activate only after qualification.                       | BP-27, BP-28, BP-25, BP-26, EV-08, EV-11, EV-07, EV-13               |
| **N14** — New fencing is incorrectly assumed to restrain an already-running pre-fence binary                                   | Require demonstrated old-worker quiescence/reconciliation; refuse unknown status. Do not claim a new epoch retroactively controls a nonparticipating process.        | BP-19, BP-20, BP-21, LC-14                                           |
| **N15** — A global active JEV switch silently activates unqualified semantic decisions                                         | Expand presets into purpose policy; bind every active purpose to exact Q03 evidence and fail closed independently.                                                   | EV-14, EV-15, EV-19, EV-20, EV-26                                    |
| **N16** — Evaluator pass or small zero-error samples are treated as proof that review added no value                           | Use material-value and ambiguous labels, adversarial strata and a preregistered one-sided false-skip bound before activation.                                        | EV-21, EV-22, EV-23, EV-24, EV-25, EV-26                             |

## 12. Mandatory negative and recovery coverage

| Scenario                                                                                                  | Owning task(s)                      |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Forbidden source/critical one-line mutation                                                               | ST-04 BP-04 EV-02 EV-05             |
| Forged USER authority or task-worktree policy self-approval                                               | ST-05 BP-03 PL-04 EV-05             |
| Cross-task/role/attempt or stale result                                                                   | ST-07 BP-14 LC-05 PL-09             |
| Native check passed but current review failed/rework/stale                                                | BP-17 LC-08 EV-01                   |
| Receipt write or timestamp change self-invalidates a check                                                | BP-12 BP-13 BP-15 LC-20             |
| Environment/toolchain/command/relevant input changed                                                      | BP-12 BP-15 LC-07 EV-03             |
| Crash after provider completion before semantic parse or journal application                              | ST-08 ST-09 ST-10 ST-05 LC-12       |
| Crash after native validation or persisted verdict                                                        | ST-05 LC-07 LC-08 LC-12             |
| Provider merge result lost / effect-in-doubt                                                              | ST-03 BP-20 LC-11 LC-12             |
| Migration races with dispatch, external return, validation or integration                                 | BP-20 BP-21 LC-14                   |
| Unmappable custom Blueprint or missing legacy bytes                                                       | BP-11 BP-19 BP-28                   |
| Unknown format, backend field loss or stale replica                                                       | ST-21 BP-22 LC-15                   |
| No-Recipe sufficient contract unexpectedly runs PLANNER                                                   | PL-05 RC-12                         |
| Unknown required or excluded Recipe predicate                                                             | RC-04                               |
| Parameter injection / traversal / Windows absolute-UNC alias / symlink escape                             | RC-02 RC-03 RC-05                   |
| Recipe transitive asset changed, removed or unavailable offline                                           | RC-05 RC-06 RC-10                   |
| Unrelated catalogue update invalidates approved pinned Plan                                               | RC-10                               |
| Arbitrary V1 prose interpreted as executable shell                                                        | BP-11 RC-14                         |
| Unqualified rule or irrelevant passing check bypasses EVALUATOR                                           | EV-02 EV-05 EV-07 EV-08 EV-13       |
| Rule/verifier/trust or implementation changes after initial eligibility                                   | EV-03 EV-09 EV-13                   |
| Downgrade after incompatible write                                                                        | BP-22 LC-14 LC-15                   |
| Terminal replay emits canonical artifacts, checks, provider calls or commits                              | ST-02 BP-24 LC-20                   |
| Missing usage or cached/reasoning subset treated as zero/additive                                         | ST-08 ST-09 ST-12 ST-16             |
| Mismatched oracle/model/effort/target SHA or cherry-picked attempts                                       | ST-15 ST-16 PL-11 RC-17 EV-12       |
| OpenRouter key is written to a tracked or non-ignored file, rendered, or silently overwritten             | EV-14                               |
| JEV output selects an unbound reference, disallowed model, higher authority or arbitrary lifecycle action | EV-15 EV-16 EV-17                   |
| One qualified JEV purpose implicitly activates another                                                    | EV-19 EV-20 EV-26                   |
| Provider failure, uncertainty, drift or missing qualification suppresses the existing agent path          | EV-15 EV-16 EV-17 EV-18 EV-23 EV-26 |
| Evaluator pass or underpowered zero-error sample is labelled no-review-needed                             | EV-21 EV-22 EV-24                   |

## 13. Post-roadmap exclusions

No persistent provider sessions, general check-cache service, global event bus, new backend, self-publishing recipe learning, recursive Recipe composition, general cognition allocator or retroactive evidence rewrite is included. JEV remains a bounded purpose-specific DecisionProvider; broad unqualified semantic classification is excluded. Future expansion of optional evaluation needs a new separately qualified rule, not widening the initial allowlist without evidence. Native deterministic tasks should be compared with a genuinely minimal native/agent control rather than an artificially expensive protocol.

## 14. Document validation and remaining uncertainty

The companion validation report checks task IDs, dependencies, release ordering, all 37 original group dispositions, audit findings, negative scenarios, source references, migration-before-cutover and qualification-before-review-activation. It is a check of this proposed plan, not a source-level or runtime proof. Product test commands, new test targets and proposed live experiment interfaces have not been executed here. Full source inventory, installed-package verification and measured efficiency remain explicit implementation/qualification tasks.

## Source register

All source links are pinned to the inspected product SHA. Line ranges are inspected ranges, not a claim of full-file review. Additional code areas in task cards require ST-01 caller inventory.

- **S01** — `packages/agentplane/src/commands/task/run.command.ts`, inspected lines `90-238`. Ordinary direct/branch supervision and kernel dispatch are selected separately. Blob `75dd6a01bf9f5f4d0c36b5db3f48f2a384b37c4e`.
- **S02** — `packages/agentplane/src/commands/task/advance.command.ts`, inspected lines `1-230`. Ordinary advance uses route decisions; kernel path rejects integration-supervisor recovery and replacement flags. Blob `9c93180edada07ba488c92539135836b414a28e1`.
- **S03** — `packages/core/src/tasks/task-centric/schema.ts`, inspected lines `1-215`. Compact proposal input V2 already normalizes to the existing persisted TaskPlanProposal V1 with supervisor-owned identity. Blob `3472105da6108731bb0a286701c52906c85b61a6`.
- **S04** — `packages/core/src/tasks/kernel-semantic.ts`, inspected lines `full file returned by connector`. Separate kernel contract, planning/implementation/inspection bindings; role enum lacks CURATOR. Blob `99bc78c1b67a3d6f0694c836285256c4df08f618`.
- **S05** — `packages/agentplane/src/commands/task/kernel-inspection.ts`, inspected lines `1-310`. Kernel native validation is entered from semantic inspection acceptance. Blob `5bc44df65a63b68ee5348cf87b42e0fcfab71558`.
- **S06** — `packages/agentplane/src/commands/task/finish-blueprint-evidence.ts`, inspected lines `1-152`. Finish and quality gates still consume Blueprint freshness and BlueprintSnapshotRef. Blob `c1794df68788aa863cec3fe4b8f6659a38630885`.
- **S07** — `packages/agentplane/src/blueprints/index.ts`, inspected lines `full file returned by connector`. Active registry, resolver, snapshots, execution artifacts and project-local Blueprint interfaces. Blob `dbc79ae5cee3c43220e1ec8ee486cb6cd1cc5d47`.
- **S08** — `packages/agentplane/src/runner/adapters/codex-result-transport.ts`, inspected lines `28-160,266-325`. Managed strict result schema is generic; provider token parser already accounts for cache/reasoning subsets. Blob `4b0bc1ad1c77c2be686fd56ae6e5ae879d7458f9`.
- **S09** — `packages/recipes/src/scenario-contracts.ts`, inspected lines `full file returned by connector`. Scenario V1 has untyped inputs, outputs and steps. Blob `d399ae3b83aef2dba9d256c810b1c178b681a3e3`.
- **S10** — `packages/recipes/src/manifest-contracts.ts`, inspected lines `80-202`. Recipes already include overlays, validators and seven Blueprint extension kinds. Blob `f2756ed4852dfdfabdc9fdce692a89426ace1bad`.
- **S11** — `packages/agentplane/src/commands/shared/route-decision.ts`, inspected lines `1-235`. Mature route path has policy/authority/provider/worktree observations and observed Git snapshot reuse. Blob `85469d6152aaacb087f449740bfb7992c22dc83d`.
- **S12** — `packages/agentplane/src/commands/shared/task-verification-records.ts`, inspected lines `1-150`. Existing current/equivalent-input assessment, check coverage and material invalidation reasons. Blob `3b47d89c8c459225a7be979586d04f2eeb1e8cfa`.
- **S13** — `packages/agentplane/src/commands/shared/task-verification-input.ts`, inspected lines `1-185`. Existing input identity and evidence-path/filesystem hashing; not a blank verification subsystem. Blob `6b6450a2521d4c7717127eaa9d8c3be6e1613ccb`.
- **S14** — `packages/agentplane/src/commands/shared/task-verification-input-types.ts`, inspected lines `1-180`. VerificationInputIdentity supports versions 2/3/4, implementation, execution, contract, context, environment and evidence. Blob `30c651154a3de4063a09f6b8c3d731d577c18e77`.
- **S15** — `packages/core/src/tasks/task-centric/index.ts`, inspected lines `1-180`. Existing graph/lifecycle/policy/refinement/scheduler/orchestrator APIs must be inventoried before introducing substitutes. Blob `f2d0fbc56c5571028c2660f74656ccfc96e93f77`.
- **S16** — `packages/core/src/tasks/task-centric/orchestrator.ts`, inspected lines `1-220`. An additional TaskCentricOrchestrator exists; its name alone is not evidence of production parity. Blob `e686cdcbc2c9ab5840c98db711fd5f86cc29a9ae`.
- **S17** — `.agentplane/tasks/202609111339-NGDG6V/README.md`, inspected lines `57-89`. Recent committed task reports 13 agent runs, zero observed usage runs and unavailable token totals; fixed supervisor-authored rework receipts are noted. Blob `338e6f9af94a5c1228fabf2be4f0ada99961c127`.
- **S18** — `packages/agentplane/package.json`, inspected lines `1-60`. Package 0.7.9-beta.1; Node >=24. Blob `0c8855f9089cef8b8d1f95092c0642e4f8f7b663`.
- **S19** — `package.json`, inspected lines `1-35`. Pinned Bun 1.4.2, Node >=24 and existing test:project/test:release:critical entrypoints. Blob `07feda1c4ef863b6d82c1cdecc8acfee00d5fc11`.

[S01]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/task/run.command.ts
[S02]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/task/advance.command.ts
[S03]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/core/src/tasks/task-centric/schema.ts
[S04]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/core/src/tasks/kernel-semantic.ts
[S05]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/task/kernel-inspection.ts
[S06]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/task/finish-blueprint-evidence.ts
[S07]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/blueprints/index.ts
[S08]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/runner/adapters/codex-result-transport.ts
[S09]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/recipes/src/scenario-contracts.ts
[S10]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/recipes/src/manifest-contracts.ts
[S11]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/shared/route-decision.ts
[S12]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/shared/task-verification-records.ts
[S13]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/shared/task-verification-input.ts
[S14]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/src/commands/shared/task-verification-input-types.ts
[S15]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/core/src/tasks/task-centric/index.ts
[S16]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/core/src/tasks/task-centric/orchestrator.ts
[S17]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/.agentplane/tasks/202609111339-NGDG6V/README.md
[S18]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/packages/agentplane/package.json
[S19]: https://github.com/basilisk-labs/agentplane/blob/50b1810dda648be0c0762b47e885c6ad0b2d42af/package.json
