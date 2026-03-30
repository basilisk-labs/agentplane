# Refactor Backlog

This file is the live working backlog for the next optimization/refactor wave.

- Historical architecture analysis and the completed refactor program live in `docs/developer/framework-refactor-program.mdx`.
- This file is intentionally execution-oriented: epics, atomic tasks, dependencies, acceptance criteria, and rollout order.
- Goal: reduce duplicated code and unnecessary layers while improving common CLI cold-path latency without changing shipped behavior.

## Current Baseline

Known baseline from the current repository state:

- `agentplane quickstart` is already sub-second on a normal local checkout.
- `agentplane task list` is already sub-second on a normal local checkout.
- `agentplane preflight --mode quick` is already sub-second on a normal local checkout.
- The biggest remaining waste is structural: duplicated routing/bootstrap work, repeated task query logic, projection reads that still traverse full task loads, and manual command topology bookkeeping.

## Guardrails

Every task in this backlog must preserve these constraints unless a later task explicitly changes the contract:

1. Keep command ids, help routing, exit codes, and workflow/policy semantics stable.
2. Keep `agent_json_v1` output shape stable unless an explicit versioned migration is planned.
3. Land behavior-locking tests before collapsing shared infrastructure.
4. Prefer deleting duplicated paths over adding another abstraction layer.
5. Keep each executable task atomic: one narrow change set, one clear verification story.

## Out Of Scope

The following are not part of this backlog unless a later follow-up task explicitly adds them:

- Public CLI redesign.
- New workflow modes or policy model changes.
- Runner architecture changes unrelated to CLI/task-query hot paths.
- Package splits done for aesthetics only.
- Release/upgrade refactors without measured duplication or latency benefit.

## Epic C: Corrective Runtime And Workflow Gaps

### Goal

Close the concrete execution-time defects discovered while using the current `branch_pr` workflow and framework worktrees so the refactor wave starts from a truthful and runnable baseline.

### Why This Exists

These items are not speculative cleanup. They were observed during real task execution and currently distort validation, workflow health, or developer ergonomics.

### Confirmed Findings Behind This Epic

- `agentplane doctor` currently reports `WF_POLICY_MISMATCH ... WORKFLOW.md=direct, config=branch_pr` on the base checkout.
- Framework task worktrees currently require `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1` in some lifecycle flows when repo-local `dist` is absent.
- Default hook/tooling paths in a fresh framework worktree can fail opaquely because local runtime/tooling assumptions are stricter than the actual out-of-the-box state.
- The “missing PR artifacts on base checkout after task creation before work start” scenario is not yet classified; treat it as a hypothesis until reproduced from a clean sequence.

### Atomic Tasks

- [ ] `C1` Align generated workflow artifacts with `workflow_mode=branch_pr`.
      Owner: `CODER`
      Depends on: none
      Touchpoints: workflow artifact generation/publication/validation path, `.agentplane/WORKFLOW.md`, targeted doctor/workflow tests
      Done when: `agentplane doctor` no longer reports `WORKFLOW.md=direct, config=branch_pr` for the current repository state.

- [ ] `C2` Make framework task worktrees runnable without manual runtime surprises.
      Owner: `CODER`
      Depends on: none
      Touchpoints: repo-local handoff logic, framework runtime diagnostics, task-worktree usability path, targeted runtime/handoff tests
      Done when: supported task-worktree flows either run without `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1` or fail with explicit, correct, bootstrap-aware guidance rather than opaque missing-dist/tooling errors.

- [ ] `C3` Reproduce and classify the branch_pr base-checkout PR-artifact edge-case.
      Owner: `CODER`
      Depends on: none
      Touchpoints: `task new`, `work start`, PR artifact materialization, base/task-checkout state transitions
      Done when: the scenario is reproduced from a clean sequence and classified as product bug, unsupported path, or operator error; no functional fix lands before that classification.

### Epic Acceptance

- Repository-wide workflow health no longer reports the current mode mismatch.
- Framework task worktrees have a supported, intelligible runtime path.
- The PR-artifact edge-case is either fixed or explicitly downgraded from “suspected bug” to a documented unsupported/operator path.

## Epic 0: Safety Net And Measurement

### Goal

Create a stable safety net so the refactor can remove code aggressively without losing CLI behavior.

### Success Signal

We can change router/query/bootstrap internals while keeping existing help, routing, task listing, and JSON output behavior locked by tests.

### Atomic Tasks

- [ ] `R0.1` Lock current help-routing behavior with golden tests.
      Owner: `CODER`
      Depends on: none
      Touchpoints: `packages/agentplane/src/cli/run-cli*.test.ts`
      Done when: `help`, `--help`, `help <cmd>`, and unknown-command suggestion flows are covered by stable snapshots or exact assertions.

- [ ] `R0.2` Lock task listing/query behavior with golden tests.
      Owner: `CODER`
      Depends on: `R0.1`
      Touchpoints: `packages/agentplane/src/commands/task/*.test.ts`
      Done when: `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.

- [ ] `R0.3` Lock JSON output behavior with contract tests.
      Owner: `CODER`
      Depends on: `R0.1`
      Touchpoints: `packages/agentplane/src/cli/run-cli*.test.ts`
      Done when: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.

- [ ] `R0.4` Add a lightweight CLI cold-path benchmark harness.
      Owner: `CODER`
      Depends on: none
      Touchpoints: `scripts/`, `package.json`, or existing benchmark/test harness locations
      Done when: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.

### Epic Acceptance

- Baseline behavior is locked before deeper structural work starts.
- Performance claims can be compared against one repeatable measurement path.

## Epic 1: Unify CLI Command Graph

### Goal

Replace the current split between catalog matching, registry matching, and help-specific bootstrap paths with one canonical command graph.

### Why This Exists

Current routing work is duplicated: command matching happens before registry build and again after registry build, while help has its own fast path semantics.

### Atomic Tasks

- [ ] `R1.1` Define the canonical command-graph data model.
      Owner: `CODER`
      Depends on: `R0.1`
      Touchpoints: `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata
      Done when: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.

- [ ] `R1.2` Make the normal command dispatcher consume the canonical graph.
      Owner: `CODER`
      Depends on: `R1.1`
      Touchpoints: `packages/agentplane/src/cli/run-cli.ts`, `packages/agentplane/src/cli/spec/registry.ts`
      Done when: runtime dispatch no longer performs two independent longest-prefix match implementations.

- [ ] `R1.3` Make fast help consume the same graph without special routing drift.
      Owner: `CODER`
      Depends on: `R1.1`
      Touchpoints: `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing
      Done when: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.

- [ ] `R1.4` Preserve lazy handler loading while removing duplicated registry bootstrap work.
      Owner: `CODER`
      Depends on: `R1.2`, `R1.3`
      Touchpoints: `packages/agentplane/src/cli/run-cli/registry.run.ts`
      Done when: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.

- [ ] `R1.5` Delete obsolete routing helpers and update tests/docs.
      Owner: `CODER`
      Depends on: `R1.4`
      Touchpoints: affected CLI modules and any developer docs that still describe the old split
      Done when: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.

### Epic Acceptance

- One canonical command topology exists.
- Help, dispatch, and child-command discovery all derive from the same structure.
- No behavior regressions appear in the Epic 0 safety net.

## Epic 2: True Projection-First Task Reads

### Goal

Make task-summary reads actually fast by separating projection reads from full task entity reads.

### Why This Exists

The code already exposes projection-style interfaces, but the local backend still reaches `listTasks()` and trims later instead of reading a real summary-only fast path.

### Atomic Tasks

- [ ] `R2.1` Extend the task index schema to store the exact summary projection needed by read-heavy commands.
      Owner: `CODER`
      Depends on: `R0.2`
      Touchpoints: task index schema and index reader/writer modules
      Done when: the cache stores enough summary data to satisfy `task list/search/next` without reconstructing full task records.

- [ ] `R2.2` Implement a real local-backend `listProjectionTasks()` fast path.
      Owner: `CODER`
      Depends on: `R2.1`
      Touchpoints: `packages/agentplane/src/backends/task-backend/local-backend.ts`
      Done when: summary reads hit the task index on cache hit and only parse README files on cache miss or invalidation.

- [ ] `R2.3` Add projection/full-read consistency tests.
      Owner: `CODER`
      Depends on: `R2.2`
      Touchpoints: backend tests for local task storage
      Done when: tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.

- [ ] `R2.4` Audit non-local backends against the same summary/full-read split.
      Owner: `CODER`
      Depends on: `R2.1`
      Touchpoints: backend contracts and external backend adapters
      Done when: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.

- [ ] `R2.5` Re-measure read-heavy CLI commands on a large task set.
      Owner: `CODER`
      Depends on: `R2.2`, `R2.3`
      Touchpoints: benchmark harness from `R0.4`
      Done when: we have before/after numbers for `task list`, `task search`, and `task next`.

### Epic Acceptance

- Read-heavy task commands can use a genuine summary fast path.
- Full task parsing is no longer on the default hot path for summary-only commands.

## Epic 3: Shared Task Query Pipeline

### Goal

Remove duplicated filtering, sorting, and dependency-state logic from task query commands.

### Why This Exists

`task list`, `task search`, and `task next` all repeat nearly the same filtering pipeline, then add only a thin command-specific output layer.

### Atomic Tasks

- [ ] `R3.1` Introduce one shared `queryTaskProjection()` pipeline.
      Owner: `CODER`
      Depends on: `R0.2`, `R2.2`
      Touchpoints: task command shared helpers
      Done when: status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.

- [ ] `R3.2` Move `task list` to the shared pipeline.
      Owner: `CODER`
      Depends on: `R3.1`
      Touchpoints: `packages/agentplane/src/commands/task/list.ts`
      Done when: `task list` becomes a thin formatter over shared query results.

- [ ] `R3.3` Move `task search` to the shared pipeline.
      Owner: `CODER`
      Depends on: `R3.1`
      Touchpoints: `packages/agentplane/src/commands/task/search.ts`
      Done when: search-specific matching is the only command-local part left in the module.

- [ ] `R3.4` Move `task next` to the shared pipeline.
      Owner: `CODER`
      Depends on: `R3.1`
      Touchpoints: `packages/agentplane/src/commands/task/next.ts`
      Done when: ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.

- [ ] `R3.5` Delete dead helper fragments and re-lock output behavior.
      Owner: `CODER`
      Depends on: `R3.2`, `R3.3`, `R3.4`
      Touchpoints: task command shared modules and tests
      Done when: duplicated filter snippets are deleted and the Epic 0 task-query tests remain green.

### Epic Acceptance

- Task query logic exists once.
- Command-specific modules mostly format or add one domain-specific rule.

## Epic 4: Context And Config Load Minimization

### Goal

Stop paying full config/context setup cost on paths that do not actually need it.

### Why This Exists

The CLI currently loads config earlier than necessary for update-check policy gating, and some read-only usecases allocate adapters/policy wrappers they never consume.

### Atomic Tasks

- [ ] `R4.1` Split pre-dispatch metadata needs from full loaded config.
      Owner: `CODER`
      Depends on: `R1.2`
      Touchpoints: CLI bootstrap and config-loading boundary
      Done when: command dispatch can decide what it needs before forcing full config load on unrelated paths.

- [ ] `R4.2` Move update-check policy gating behind the real config boundary.
      Owner: `CODER`
      Depends on: `R4.1`
      Touchpoints: `packages/agentplane/src/cli/run-cli.ts`
      Done when: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.

- [ ] `R4.3` Introduce a lightweight read-only usecase context.
      Owner: `CODER`
      Depends on: `R0.2`
      Touchpoints: `packages/agentplane/src/usecases/context/resolve-context.ts`, usecase callers
      Done when: read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.

- [ ] `R4.4` Remove temporary back-compat aliases after caller migration.
      Owner: `CODER`
      Depends on: `R4.3`
      Touchpoints: `packages/agentplane/src/commands/shared/task-backend.ts`
      Done when: the command context no longer carries duplicate naming solely for transitional compatibility.

### Epic Acceptance

- Common CLI paths do less setup work before real execution begins.
- Read-only command stacks are materially simpler than mutation stacks.

## Epic 5: Remove Manual Command Topology Boilerplate

### Goal

Eliminate manually maintained child-command arrays and other low-value command topology duplication.

### Why This Exists

Group commands still enumerate their child specs by hand, which creates drift risk and keeps command topology logic spread across multiple files.

### Atomic Tasks

- [ ] `R5.1` Derive direct subcommand names from the canonical command graph.
      Owner: `CODER`
      Depends on: `R1.1`
      Touchpoints: group command helpers and command graph helpers
      Done when: child command discovery is computed from command ids instead of manually listed arrays.

- [ ] `R5.2` Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery.
      Owner: `CODER`
      Depends on: `R5.1`
      Touchpoints: group command entry modules
      Done when: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.

- [ ] `R5.3` Audit thin `*.command.ts` and `*.run.ts` wrappers.
      Owner: `CODER`
      Depends on: `R5.2`
      Touchpoints: command/module tree
      Done when: every wrapper file is classified as either meaningful boundary or removable indirection.

- [ ] `R5.4` Collapse low-value wrappers with tests still green.
      Owner: `CODER`
      Depends on: `R5.3`
      Touchpoints: wrapper modules selected by the audit
      Done when: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.

### Epic Acceptance

- Group command topology is not maintained by hand in multiple places.
- Wrapper count drops without making command ownership harder to understand.

## Epic 6: Globals And Output Cleanup

### Goal

Simplify global-flag parsing and JSON output wrapping after the bigger routing/query changes are stable.

### Why This Exists

This is secondary work: it is less important than routing/query/projection cleanup, but it still contains low-value duplication and brittle process-wide output interception.

### Atomic Tasks

- [ ] `R6.1` Merge global-flag prescan and parse into one result model.
      Owner: `CODER`
      Depends on: `R1.3`
      Touchpoints: `packages/agentplane/src/cli/run-cli/globals.ts`
      Done when: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.

- [ ] `R6.2` Replace process-wide stdout/stderr monkey-patching with a structured output collector.
      Owner: `CODER`
      Depends on: `R0.3`
      Touchpoints: `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts
      Done when: JSON mode no longer relies on global write interception, while preserving current output semantics.

- [ ] `R6.3` Re-lock JSON compatibility and document any intentional invariants.
      Owner: `CODER`
      Depends on: `R6.2`
      Touchpoints: tests and developer docs
      Done when: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.

### Epic Acceptance

- Global CLI bootstrap code is simpler and less brittle.
- JSON output remains compatible with existing consumers.

## Recommended Execution Order

Run the backlog in this order unless a later measured result changes the priority:

1. `Epic C` first. Do not build the next refactor wave on top of a knowingly mismatched workflow artifact or opaque framework-worktree runtime path.
2. `Epic 0` next. Do not start structural cleanup without the safety net.
3. `Epic 1` next. The command graph is the highest-leverage duplication point.
4. `Epic 2` and `Epic 3` next. These are the best candidates for meaningful task-command speedups.
5. `Epic 4` after routing/query cleanup. It trims startup work and removes leftover context bloat.
6. `Epic 5` after the canonical graph exists. Otherwise the boilerplate cleanup will drift again.
7. `Epic 6` last. It is valuable, but it should not distract from the higher-leverage hot paths.

## Task Sizing Rule

When turning items from this file into executable `agentplane` tasks:

- Prefer one executable task per atomic checkbox.
- Split again if a checkbox grows beyond one narrow subsystem or roughly 3 to 5 touched files.
- Keep docs-only follow-ups separate from code changes unless they are inseparable.
- Do not batch unrelated cleanup under one “misc refactor” task.

## Exit Criteria For This Backlog

This backlog can be considered complete when all of the following are true:

1. Common CLI paths no longer duplicate router/bootstrap work.
2. Task summary reads use a genuine projection path.
3. Task query commands share one filter/sort/dependency pipeline.
4. Manual command topology bookkeeping is mostly gone.
5. Global/output handling is simpler without breaking `agent_json_v1`.
6. Before/after measurements show a real reduction in overhead on the targeted CLI paths.
