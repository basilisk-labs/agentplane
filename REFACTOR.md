# Refactor Backlog

This file is the live backlog for the next refactor wave after the completed framework program.

- Historical architecture analysis and the completed earlier wave live in `docs/developer/framework-refactor-program.mdx`.
- This file was rebuilt from the current `main` codebase on `2026-03-31`; the old stale completion checklist was intentionally removed.
- Every item below is pending unless a later task explicitly checks it off here.
- Goal: delete repeated orchestration, converge task mutation paths, and shrink current hotspots without changing shipped behavior.

## Scope

- In scope: current code map, confirmed duplication findings, safe consolidation targets, and an executable next-wave backlog.
- Out of scope: public CLI redesign, workflow-policy redesign, package splits done only for aesthetics, and speculative abstractions without measured simplification.

## Guardrails

1. Keep command ids, help semantics, exit codes, workflow behavior, and `agent_json_v1` stable unless a later task explicitly versions them.
2. Land behavior-locking tests before collapsing duplicated execution paths.
3. Prefer deleting branches and adapters over adding one more abstraction layer.
4. Keep local-file backend and non-local backend semantics aligned; every convergence task must prove parity.
5. Track simplification with observable signals: repeated call sites removed, hotspot modules split, or behavior preserved by existing contract suites.

## Repository Code Map

### CLI And Command Surface

- `packages/agentplane/src/cli`
  Role: entrypoint routing, fast help, global flags, output/error framing, bootstrap/runtime commands.
  Current size: `140` files, `138` TypeScript files, `81` tests.
- `packages/agentplane/src/commands`
  Role: end-user command handlers grouped by domain (`task`, `pr`, `branch`, `guard`, `release`, `scenario`, `recipes`, `doctor`, `upgrade`).
  Current size: `320` files, `320` TypeScript files, `75` tests.
- Main entrypoints:
  - `packages/agentplane/src/cli/run-cli.ts`
  - `packages/agentplane/src/cli/run-cli/registry.run.ts`
  - `packages/agentplane/src/cli/run-cli/commands/core.ts`
  - `packages/agentplane/src/cli/run-cli/commands/init.ts`

### Task Storage And Backend Layer

- `packages/agentplane/src/backends`
  Role: local file backend, Redmine backend, task index, shared backend record conversion.
  Current size: `34` files, `34` TypeScript files, `7` tests.
- `packages/agentplane/src/commands/shared`
  Role: backend loading, local task-store bridge, approval helpers, shared task backend context.
- `packages/core/src/tasks`
  Role: canonical task README schema, parsing, rendering, doc-section contracts, task-store primitives.
  Current size: `32` files, `32` TypeScript files.
- Key modules:
  - `packages/agentplane/src/backends/task-backend/local-backend.ts`
  - `packages/agentplane/src/backends/task-backend/redmine-backend.ts`
  - `packages/agentplane/src/commands/shared/task-store.ts`
  - `packages/core/src/tasks/task-store.ts`
  - `packages/core/src/tasks/task-readme.ts`

### Runner And Workflow Execution

- `packages/agentplane/src/runner`
  Role: task-run lifecycle, adapters, artifact/state emission, task-context shaping.
  Current size: `45` files, `45` TypeScript files, `16` tests.
- `packages/agentplane/src/workflow-runtime`
  Role: runtime templating, markdown helpers, observability plumbing.
  Current size: `16` files, `16` TypeScript files, `5` tests.
- Key modules:
  - `packages/agentplane/src/runner/usecases/task-run.ts`
  - `packages/agentplane/src/runner/usecases/task-run-lifecycle.ts`
  - `packages/agentplane/src/runner/adapters/custom.ts`
  - `packages/agentplane/src/runner/context/task-context.ts`

### Shared Infrastructure

- `packages/agentplane/src/shared`
  Role: formatting, error helpers, atomic writes, string utilities, repo-safe helpers.
- `packages/agentplane/src/policy`
  Role: policy diagnostics and validation helpers.
- `scripts/`
  Role: benchmark, bootstrap, maintenance, release and framework support scripts.

## Current Hotspots

### Largest Runtime Modules

- `packages/agentplane/src/backends/task-backend/redmine-backend.ts`: `1023` lines
- `packages/agentplane/src/commands/upgrade.ts`: `867` lines
- `packages/agentplane/src/cli/run-cli/commands/core.ts`: `772` lines
- `packages/agentplane/src/cli/run-cli/commands/init.ts`: `757` lines
- `packages/agentplane/src/commands/shared/task-store.ts`: `753` lines
- `packages/agentplane/src/backends/task-backend/local-backend.ts`: `636` lines
- `packages/agentplane/src/runner/adapters/custom.ts`: `614` lines
- `packages/agentplane/src/runner/usecases/task-run-lifecycle.ts`: `567` lines

### Largest Behavior-Locking Suites

- `packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`: `3314` lines
- `packages/agentplane/src/backends/task-backend.redmine.test.ts`: `2242` lines
- `packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts`: `1608` lines
- `packages/agentplane/src/commands/task/finish.unit.test.ts`: `1570` lines
- `packages/agentplane/src/cli/run-cli.core.tasks.test.ts`: `1287` lines
- `packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts`: `1252` lines
- `packages/agentplane/src/cli/run-cli.core.init.test.ts`: `1236` lines

These large suites are useful safety nets, but they also indicate repeated fixture setup and output assertions that should be consolidated only after the new production seams exist.

## Confirmed Findings

### Facts

- Non-test runtime code currently contains `406` `process.stdout.write(...)` call sites, `45` `process.stderr.write(...)` call sites, and `47` pretty `JSON.stringify(..., null, 2)` call sites.
- `backendIsLocalFileBackend(...)` appears `15` times in runtime code; commands still branch explicitly on backend type in multiple task mutations.
- `writeTasks(...)` appears `7` times in runtime code, with repeated `writeTasks` vs sequential `writeTask` fallback logic in `task/add.ts`, `task/normalize.ts`, and `task/scrub.ts`.
- Status-transition primitives already exist, but orchestration still spans multiple handlers:
  - `packages/agentplane/src/commands/task/block.ts`
  - `packages/agentplane/src/commands/task/start.ts`
  - `packages/agentplane/src/commands/task/set-status.ts`
  - `packages/agentplane/src/commands/task/finish.ts`
  - `packages/agentplane/src/commands/task/finish-shared.ts`
  - `packages/agentplane/src/commands/task/close-shared.ts`
  - `packages/agentplane/src/commands/task/verify-record.ts`
- Task README and doc mutation logic is duplicated across three layers:
  - `packages/core/src/tasks/task-store.ts`
  - `packages/agentplane/src/commands/shared/task-store.ts`
  - backend implementations such as `packages/agentplane/src/backends/task-backend/local-backend.ts`

### Inferences

- Output/render consolidation is the lowest-risk deletion target. The duplication is mostly mechanical, and the CLI already has broad contract coverage.
- Local-store vs generic-backend branching is the highest-value architectural cleanup. It leaks backend type knowledge into command handlers and repeats the same orchestration in many mutations.
- Task doc/README mutation should be its own epic. It crosses `packages/core`, backend implementations, command handlers, and runner/task materialization.

### Hypotheses To Validate During Execution

- Splitting the largest modules will reduce maintenance cost, but the payoff differs by module. `redmine-backend.ts`, `upgrade.ts`, and `task-run-lifecycle.ts` need a first-pass decomposition audit before deeper extraction.
- Some JSON/file-writing duplication inside runner artifact persistence is intentional and should stay out of the user-facing CLI emitter cleanup.

## Safe Consolidation Targets

### Low Risk

- A shared CLI output layer for:
  - JSON emission
  - plain-text line emission
  - key/value report blocks
  - warning/success/error framing
- A single `writeTasksOrFallback(...)` helper for bulk backend writes.
- Shared test helpers for backend stubs and stdout/stderr capture.

### Medium Risk

- A `withMutableTask(...)` or `applyTaskMutation(...)` bridge that hides local-store vs backend branching from command handlers.
- A single transition executor for status changes, dependency checks, deferred warnings, and comment-commit policy.
- A single doc mutation contract that both `packages/core` and `agentplane` local-task flows use.

### Higher Risk

- Deep decomposition of `redmine-backend.ts`, `upgrade.ts`, and `task-run-lifecycle.ts`; these should follow safety-net expansion and seam extraction, not lead it.

## Rollout Order

1. `N0` Extend the safety net around the new hotspot set.
2. `N1` Collapse user-facing output/render duplication.
3. `N2` Converge repeated task mutation plumbing.
4. `N3` Consolidate lifecycle transition orchestration.
5. `N4` Converge task README/doc mutation paths.
6. `N5` Split current oversized modules at the new seams.
7. `N6` Deduplicate testkit and fixtures after production seams stabilize.

## Epic N0: Safety Net For The New Wave

### Goal

Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.

### Atomic Tasks

- [ ] `N0.1` Lock representative text and JSON output for current hotspot commands.
      Touchpoints: `cli/run-cli`, `task run *`, handoff/reclaim/show, runtime/config/help report paths
      Done when: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`.

- [ ] `N0.2` Add local-backend vs non-local-backend parity tests for task mutation commands.
      Touchpoints: `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set`
      Done when: the same high-level mutation contract is asserted against both storage paths.

- [ ] `N0.3` Add task README/doc mutation concurrency tests.
      Touchpoints: section updates, full-doc replacement, expected-current conflict handling
      Done when: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code.

- [ ] `N0.4` Add one lightweight hotspot report script.
      Touchpoints: `scripts/` or existing diagnostics harness
      Done when: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules.

### Epic Acceptance

- The next wave has targeted contract coverage for the code it intends to collapse.
- Progress on duplication can be measured by one repeatable static report.

## Epic N1: Output And Render Consolidation

### Goal

Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.

### Why This Exists

Direct stdout/stderr writes are spread across hundreds of call sites, with repeated JSON emission, report blocks, and warning formatting.

### Atomic Tasks

- [ ] `N1.1` Define shared CLI emitter primitives.
      Touchpoints: `packages/agentplane/src/cli/output.ts` or adjacent shared output modules
      Done when: one small API covers text lines, pretty JSON, warnings, and common report blocks.

- [ ] `N1.2` Move CLI core/config/help/runtime-report paths onto the shared emitters.
      Touchpoints: `cli/run-cli/commands/core.ts`, `cli/run-cli/commands/config.ts`, `cli/spec/help.ts`, `commands/runtime.command.ts`
      Done when: those modules stop manually formatting repeated JSON/text output blocks.

- [ ] `N1.3` Move task run/handoff/reclaim/show output onto the shared emitters.
      Touchpoints: `commands/task/run-*.command.ts`, `handoff-*.command.ts`, `reclaim.command.ts`
      Done when: key/value status blocks no longer hand-roll line-by-line writes in each command.

- [ ] `N1.4` Move remaining report-style command families onto the shared emitters.
      Touchpoints: `commands/pr/*`, `commands/branch/*`, `commands/backend.ts`, `commands/scenario/impl/commands.ts`, selected release/report modules
      Done when: these commands share the same text/json rendering conventions instead of repeating them locally.

- [ ] `N1.5` Delete obsolete ad-hoc render helpers and document the output conventions.
      Touchpoints: affected CLI modules and developer docs
      Done when: duplicate render helpers are removed and the new output conventions are documented.

### Epic Acceptance

- User-facing output flows rely on one shared emitter layer.
- The targeted command families no longer duplicate pretty JSON or report-line framing logic.

## Epic N2: Task Mutation Bridge

### Goal

Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.

### Why This Exists

Task command handlers still know too much about backend shape. They branch on `backendIsLocalFileBackend(...)`, choose between `mutateTaskStore(...)` and `writeTask(...)`, and often repeat the same load-then-write flow.

### Atomic Tasks

- [ ] `N2.1` Introduce a shared bulk-write helper.
      Touchpoints: task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`
      Done when: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`.

- [ ] `N2.2` Introduce a shared mutable-task bridge.
      Touchpoints: `commands/shared/task-backend.ts`, `commands/shared/task-store.ts`, task mutation commands
      Done when: one helper can load and persist a task mutation without each command branching on backend type.

- [ ] `N2.3` Move low-risk task mutators onto the bridge.
      Touchpoints: `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands
      Done when: these commands become thin wrappers around the shared mutation helper.

- [ ] `N2.4` Move bulk task mutators onto the bridge.
      Touchpoints: `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`
      Done when: bulk task writes use one shared path and keep their current behavior.

- [ ] `N2.5` Move remaining non-lifecycle task mutators onto the bridge.
      Touchpoints: `task/doc.ts`, `task/plan.ts`, `task/verify-record.ts`, and similar field/doc mutators that do not own lifecycle orchestration
      Done when: backend-type branching no longer appears in these command handlers.

### Epic Acceptance

- Task mutation handlers stop branching directly on backend type for simple mutations.
- Bulk write fallback logic exists in one place.

## Epic N3: Lifecycle Transition Convergence

### Goal

Collapse the repeated orchestration around task status transitions into one shared transition executor.

### Why This Exists

Shared primitives exist, but the command handlers still repeat transition validation, dependency gating, warning collection, comment formatting, and commit-from-comment preparation.

### Atomic Tasks

- [ ] `N3.1` Define the shared transition request/executor contract.
      Touchpoints: `commands/task/shared/*`
      Done when: one shared executor owns status validation, dependency checks, deferred warnings, and transition application.

- [ ] `N3.2` Move `task start`, `task block`, and `task set-status` onto the executor.
      Touchpoints: `task/start.ts`, `task/block.ts`, `task/set-status.ts`
      Done when: those handlers become thin command-specific wrappers around the shared transition contract.

- [ ] `N3.3` Move `finish`, `finish-shared`, `close-shared`, and `verify-record` onto the executor.
      Touchpoints: `task/finish.ts`, `task/finish-shared.ts`, `task/close-shared.ts`, `task/verify-record.ts`
      Done when: terminal lifecycle transitions no longer duplicate the same orchestration in separate modules.

- [ ] `N3.4` Converge comment-commit integration around the shared executor.
      Touchpoints: status-commit warnings, commit metadata preparation, structured comment handling
      Done when: comment-commit policy is wired once and reused by all transition commands that need it.

- [ ] `N3.5` Delete obsolete transition branches and rerun lifecycle contract suites unchanged.
      Touchpoints: affected task command modules and lifecycle CLI tests
      Done when: old duplicated transition logic is removed and the safety net still passes.

### Epic Acceptance

- Status-transition commands share one execution model.
- Transition-specific differences stay local, but policy/dependency orchestration no longer does.

## Epic N4: Task README And Doc Pipeline Convergence

### Goal

Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.

### Why This Exists

README parsing/rendering, section mutation, optimistic concurrency checks, and section-map regeneration are currently implemented in overlapping layers.

### Atomic Tasks

- [ ] `N4.1` Define the shared doc mutation contract.
      Touchpoints: `packages/core/src/tasks/*`, `packages/agentplane/src/commands/shared/task-store.ts`
      Done when: section replacement, full-doc replacement, and doc-meta touch share one explicit mutation model.

- [ ] `N4.2` Reuse shared doc mutation primitives inside the local backend and task store.
      Touchpoints: `backends/task-backend/local-backend.ts`, `commands/shared/task-store.ts`
      Done when: those modules stop carrying their own overlapping doc patch application logic.

- [ ] `N4.3` Unify doc concurrency and conflict semantics.
      Touchpoints: core task store, local backend, command error mapping
      Done when: section conflicts and full-doc conflicts behave the same way across supported storage paths.

- [ ] `N4.4` Move command handlers and task materialization callers onto the shared doc path.
      Touchpoints: `task/doc.ts`, `task/plan.ts`, `task/migrate-doc.ts`, `task/verify-record.ts`, runner/task materialization helpers
      Done when: these callers no longer rebuild doc mutation logic locally.

- [ ] `N4.5` Lock doc-path parity with tests.
      Touchpoints: command tests, backend tests, core task-store tests
      Done when: doc set/show/plan/verify flows prove parity across local and non-local paths.

### Epic Acceptance

- README/doc mutation semantics come from one shared contract.
- Local-backend and core task-store doc logic stop diverging independently.

## Epic N5: Oversized Module Decomposition

### Goal

Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.

### Why This Exists

Several modules are now large enough that they mix unrelated responsibilities even where duplication is already reduced.

### Atomic Tasks

- [ ] `N5.1` Split `cli/run-cli/commands/core.ts` by subcommand/report concern.
      Done when: core CLI command routing no longer shares one file with unrelated report renderers and helpers.

- [ ] `N5.2` Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns.
      Done when: local backend read/index/doc/write responsibilities are separated behind small internal modules.

- [ ] `N5.3` Split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns.
      Done when: Redmine-specific sync/report code stops living in one monolithic file.

- [ ] `N5.4` Split `commands/upgrade.ts` by planning, apply, report, and lock concerns.
      Done when: upgrade flow orchestration is easier to test without loading the whole module.

- [ ] `N5.5` Split `runner/usecases/task-run-lifecycle.ts` by state transition and artifact/report concern.
      Done when: runner lifecycle orchestration uses smaller units aligned to preparation, execution, and finalization phases.

### Epic Acceptance

- The largest runtime files are decomposed at real responsibility boundaries created by earlier epics.
- The split does not add new behavior layers that merely rename existing code.

## Epic N6: Testkit And Fixture Deduplication

### Goal

Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.

### Why This Exists

The current safety net is valuable, but it pays for that coverage with large local builders, repeated backend stubs, and repeated stdout/stderr capture patterns.

### Atomic Tasks

- [ ] `N6.1` Extract reusable backend/task builders for command and workflow tests.
      Touchpoints: workflow tests, task command unit tests, backend tests
      Done when: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit.

- [ ] `N6.2` Extract shared output-capture and report-assertion helpers for CLI contract suites.
      Touchpoints: `cli/run-cli*.test.ts` helpers
      Done when: output-heavy suites stop re-implementing the same capture/assertion plumbing.

- [ ] `N6.3` Prune repeated scenario/release/runner fixtures where the new shared helpers fit.
      Touchpoints: scenario, release, and runner test helpers
      Done when: only domain-specific setup remains local to each suite.

- [ ] `N6.4` Delete obsolete bespoke helpers after migration.
      Touchpoints: old test-only helper modules and local duplicate builders
      Done when: the new shared testkit replaces the superseded helpers cleanly.

### Epic Acceptance

- The largest suites keep their coverage but lose repeated fixture plumbing.
- Test helpers become easier to reuse across command, backend, and runner coverage.

## Recommended Execution Bias

Start with `N0`, `N1`, and `N2`.

- `N0` reduces refactor risk and provides measurable progress.
- `N1` is the safest high-volume code deletion target.
- `N2` creates the architectural seam needed before `N3` and `N4`.
- `N5` should not start until at least one earlier seam-producing epic is complete.
- `N6` should trail production refactors; otherwise it will optimize the wrong test seams.
