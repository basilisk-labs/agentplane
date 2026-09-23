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

JEV is an optional application-layer DecisionProvider, never a role, Task Kernel dependency, authority source or lifecycle owner. A global off/shadow/active preset expands to purpose-specific policy. Each active purpose is bound to its own deterministic eligibility, model, question set, thresholds and qualification. Provider failure, invalid output, uncertainty, drift or missing qualification selects the existing non-JEV path. Tracked configuration stores no provider secret; initialization may write OPENROUTER_API_KEY only to a confirmed git-ignored local .env without rendering the value.

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

### Q03 — JEV purpose activation gate (only .14)

A JEV purpose can become active only after the installed provider contract passes Q00 and its exact model, question set, bounded input/output schema, deterministic eligibility, confidence policy, fallback, corpus and independent oracle are qualified. Development-routing purposes use M08 and also require Q02 for a cost claim. Evaluator depth or omission additionally requires Q01 through M09 and Q02 through M10. Qualification does not transfer across purposes. A changed model, question set, threshold, rule, privacy route or eligibility class invalidates only that purpose and returns it to shadow or disabled.

The active preset is the union of exact qualified purpose rules. It is never authority to activate every configured JEV decision. Semantic retrieval and model/effort routing can activate independently. Context sufficiency, planning triage and Recipe applicability start shadow-only. Evaluator omission remains inactive when false-skip evidence is missing, underpowered, mixed or inconclusive.

### Q02 — Efficiency claim gate

Measure total cost per equivalently verified outcome, not only successful-run means. Primary campaign metric: all assigned attempts' observed cost divided by independently verified successes; a zero-success arm has no finite successful-result cost. Also report matched pairs that both meet the same oracle, but do not discard other attempts from campaign cost. Report success rates, uncertainty and per-workflow strata.

Provider cost requires the provider's actual usage semantics and, for monetary claims, a pinned applicable rate/cost basis. Cache and reasoning may be subsets. Missing/partial/unattributable host usage prevents a complete numeric claim unless a defensible bounded result is possible; no token estimates from bytes. Capture model/reasoning effort requested and actually observed, not an unverified default.

Report intent-to-first-scoped-mutation, intent-to-verified-result and closure separately. Partition preparation, model/provider, checks, Git/filesystem, USER waiting and external waiting with no overlapping-span double count. Include host work constructing an inline Plan and provider retries/rework. Recipe authoring/setup and study-only verifier work are transparent separate costs; do not attribute them inconsistently across arms.

Suggested regression policy, to ratify before live campaigns: no structural increase in redundant semantic replay; for cost and active verified-result time, flag an upper paired uncertainty bound above 1.05 versus the previous qualified release, per workflow as well as in aggregate. The 5% margin is a proposed tolerance, not an observed effect. A pilot too small to bound the effect yields NOT ESTABLISHED, not automatic pass. A NET POSITIVE claim versus minimal control requires supported reduction in the preregistered cost/time objectives without a quality/safety regression; mixed trade-offs remain MIXED.

A correctness/deletion release can have Q00=pass and Q02=NOT ESTABLISHED only with explicit release-owner acceptance of measurement debt; it is **not efficiency-qualified**. No such override can activate optional independent review. EV-13 requires both Q01 and a supported net benefit for the target class. If no benefit is demonstrated, do not retain the optional mechanism solely because it was implemented.

### 7.1 Experiment sequence

| ID  | Subject comparison                                                               | Required constant                                                                     | Purpose                                                                   |
| --- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| M01 | Minimal agent / v0.7.8 / exact .9 candidate                                      | Target starting tree, objective, model/effort, authority, oracle, retry cap           | Establish real control and product baseline                               |
| M02 | Exact .9 / .10                                                                   | Same required PLANNER/EVALUATOR and Recipe V1 behavior                                | Isolate Blueprint retirement                                              |
| M03 | Exact .10 / .11                                                                  | Same stages and final oracle                                                          | Isolate lifecycle convergence                                             |
| M04 | Planning paths with/without separate PLANNER; managed bridge comparison separate | Complete host work accounting; same approval/review                                   | Attribute planning savings honestly                                       |
| M05 | Same product no-Recipe / instantiate / specialize, plus no-/near-match           | Same policy, target and final oracle                                                  | Measure reusable strategy benefit                                         |
| M06 | Required-review comparator / isolated narrow omission, independent oracle        | Fixed rule/class/verifier and acceptance                                              | Qualify quality before activation                                         |
| M07 | Same product required review / qualified native-proof omission                   | Equivalent independently verified result and authority                                | Verify economic benefit before native-proof activation                    |
| M08 | Non-JEV routing / purpose-specific JEV candidate                                 | Same task, bounded candidates, required semantic work, authority and final oracle     | Qualify retrieval, model/effort and shadow development routing separately |
| M09 | Full EVALUATOR / inactive JEV evaluator-routing candidate                        | Same implementation, verification, deterministic eligibility and blinded final oracle | Establish false-skip and calibration evidence before activation           |
| M10 | Full EVALUATOR / qualified JEV evaluator routing                                 | Same task, authority, quality qualification and final oracle                          | Verify total economic benefit including JEV and fallback cost             |

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
