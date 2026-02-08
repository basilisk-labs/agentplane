---
id: "202602081238-QMXVTN"
title: "Decompose or remove legacy commands/scenario.ts"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081238-XJ2RJJ"
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T13:14:01.300Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T13:17:14.088Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: decomposed commands/scenario.ts into scenario/impl modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose commands/scenario.ts into scenario/impl modules while preserving behavior and keeping bun run test:full green."
doc_version: 2
doc_updated_at: "2026-02-08T13:17:14.090Z"
doc_updated_by: "ORCHESTRATOR"
description: "Replace packages/agentplane/src/commands/scenario.ts monolith with modular scenario implementation or delete if fully superseded by commands/scenario/*.command.ts; keep behavior and tests."
id_source: "generated"
---
## Summary


## Scope


## Plan

Scope: split packages/agentplane/src/commands/scenario.ts into a small facade plus modules under packages/agentplane/src/commands/scenario/impl/. Steps: (1) Identify public exports used by scenario/*.command.ts and tests. (2) Extract report writing + git summary helpers into scenario/impl/report.ts. (3) Extract list/info/run handlers into scenario/impl/commands.ts. (4) Keep scenario.ts as facade re-exporting cmdScenarioListParsed/cmdScenarioInfoParsed/cmdScenarioRunParsed and any helper types used externally. (5) Run bun run typecheck, bun run lint, bun run test:full and ensure no behavioral drift.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T13:17:14.088Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: decomposed commands/scenario.ts into scenario/impl modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T13:14:01.605Z, excerpt_hash=sha256:d1bf0c2a3f29637a8e128d788520c18724170a0a303510100a60bf6fbf529dd3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands\n- \n- \n- 
 RUN  v4.0.18 /Users/densmirnov/Github/agentplane

 ✓ packages/agentplane/src/cli/run-cli.recipes.test.ts (25 tests) 1783ms
     ✓ recipes install rejects invalid agent and scenario assets  325ms
 ✓ packages/agentplane/src/cli/run-cli.core.hooks.test.ts (26 tests) 2417ms
 ✓ packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts (26 tests) 2524ms
     ✓ branch base explain prints current, pinned, and effective base  580ms
     ✓ branch status reports ahead/behind  446ms
     ✓ branch remove deletes the branch  349ms
 ✓ packages/agentplane/src/cli/run-cli.core.tasks.test.ts (51 tests) 2701ms
 ✓ packages/agentplane/src/commands/workflow.test.ts (40 tests) 3134ms
     ✓ ensure init commit rejects staged changes and commits when needed  321ms
     ✓ hooks install/uninstall and run validate commit-msg and pre-commit  337ms
 ✓ packages/agentplane/src/cli/run-cli.core.guard.test.ts (33 tests) 3416ms
Installed recipe viewer@1.2.3
 ✓ packages/agentplane/src/cli/run-cli.core.test.ts (21 tests) 943ms
Run artifacts: .agentplane/recipes/viewer/runs/2026-02-08T13-13-36-162Z-AUDIT_SCENARIO
 ✓ packages/agentplane/src/cli/run-cli.scenario.test.ts (7 tests) 744ms
Installed recipe viewer@1.2.3
Installed recipe viewer@1.2.3
 ✓ packages/agentplane/src/cli/cli-smoke.test.ts (1 test) 1094ms
     ✓ runs init, task, finish, recipe, and work start flow  1084ms
 ✓ packages/agentplane/src/commands/recipes.test.ts (46 tests) 1922ms
 ✓ packages/agentplane/src/cli/run-cli.core.misc.test.ts (11 tests) 685ms
 ✓ packages/core/src/git/base-branch.test.ts (13 tests) 1284ms
 ✓ packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts (1 test) 137ms
✅ migrated task docs (changed=1)
✅ migrated task docs (changed=0)
✅ migrated task docs (changed=1)
✅ migrated task docs (changed=1)
 ✓ packages/agentplane/src/commands/task/migrate-doc.test.ts (3 tests) 216ms
 ✓ packages/core/src/tasks/task-store.test.ts (13 tests) 193ms
 ✓ packages/agentplane/src/backends/task-backend.test.ts (65 tests) 657ms
 ✓ packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts (45 tests) 5884ms
     ✓ start --commit-from-comment commits and updates status  354ms
     ✓ start --commit-from-comment stages deletions under allowlist  419ms
     ✓ start commit-from-comment supports auto-allow and sentence formatting  324ms
     ✓ start commit-from-comment formats -- separators and supports --quiet  317ms
     ✓ start supports status_commit_policy=confirm when acknowledged  303ms
     ✓ start commit-from-comment formats single-sentence summaries without details  342ms
     ✓ finish marks done and records commit metadata  313ms
 ✓ packages/agentplane/src/cli/legacy-cli-regressions.test.ts (1 test) 62ms
 ✓ packages/agentplane/src/commands/shared/task-backend.test.ts (2 tests) 201ms
 ✓ packages/core/src/git/git-utils.test.ts (7 tests) 1105ms
 ✓ packages/core/src/commit/commit-policy.test.ts (9 tests) 226ms
 ✓ packages/agentplane/src/cli/fs-utils.test.ts (2 tests) 20ms
 ✓ packages/core/src/tasks/tasks-lint.test.ts (5 tests) 119ms
 ✓ packages/agentplane/src/shared/write-if-changed.test.ts (2 tests) 63ms
 ✓ packages/core/src/tasks/tasks-export.test.ts (4 tests) 147ms
 ✓ packages/agentplane/src/commands/shared/task-store.test.ts (2 tests) 119ms
 ✓ packages/agentplane/src/agents/agents-template.test.ts (7 tests) 29ms
 ✓ packages/core/src/tasks/task-readme.test.ts (7 tests) 97ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-snap.test.ts (4 tests) 60ms
 ✓ packages/agentplane/src/commands/shared/git-context.test.ts (2 tests) 20ms
 ✓ packages/core/src/config/config.test.ts (13 tests) 50ms
 ✓ packages/agentplane/src/cli/checksum.test.ts (3 tests) 24ms
 ✓ packages/core/src/tasks/task-readme-io.test.ts (1 test) 28ms
 ✓ packages/agentplane/src/cli/http.test.ts (6 tests) 26ms
 ✓ packages/core/src/project/project-root.test.ts (5 tests) 11ms
 ✓ packages/core/src/fs/atomic-write.test.ts (2 tests) 23ms
 ✓ packages/agentplane/src/cli/update-check.test.ts (9 tests) 32ms
 ✓ packages/agentplane/src/shared/git-log.test.ts (2 tests) 30ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-contract.test.ts (1 test) 13ms
 ✓ packages/agentplane/src/shared/comment-format.test.ts (16 tests) 6ms
 ✓ packages/agentplane/src/cli2/parse.test.ts (6 tests) 8ms
 ✓ packages/agentplane/src/commands/shared/network-approval.test.ts (3 tests) 6ms
 ✓ packages/agentplane/src/policy/evaluate.test.ts (5 tests) 10ms
 ✓ packages/agentplane/src/cli/prompts.test.ts (6 tests) 8ms
 ✓ packages/agentplane/src/commands/upgrade.spec-parse.test.ts (5 tests) 6ms
 ✓ packages/agentplane/src/commands/task/shared.verify-steps.test.ts (4 tests) 3ms
 ✓ packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts (43 tests) 8115ms
     ✓ init --yes creates baseline project files  389ms
     ✓ init --backend redmine sets backend config path  369ms
     ✓ init bootstraps git repo and commits install when git is missing  374ms
     ✓ init branch_pr defaults base branch to main in empty repo  364ms
     ✓ init in branch_pr skips hook enforcement for install commit  457ms
     ✓ init branch_pr keeps current branch as base in existing repo when non-interactive  419ms
     ✓ init pins base branch to current branch in existing repo  378ms
     ✓ init writes AGENTS.md and agent templates for direct mode  404ms
     ✓ init filters AGENTS.md for branch_pr mode  414ms
     ✓ init applies workflow, installs hooks, and runs ide sync  453ms
     ✓ init prompts for interactive defaults  588ms
     ✓ init refuses to overwrite existing config  474ms
     ✓ init validates recipes against bundled catalog  400ms
     ✓ init --force overwrites conflicting files  453ms
     ✓ init --backup preserves conflicting files with timestamped backups  486ms
 ✓ packages/agentplane/src/cli2/help-render.test.ts (2 tests) 14ms
 ✓ packages/agentplane/src/commands/backend.test.ts (2 tests) 5ms
 ✓ packages/agentplane/src/cli/command-guide.test.ts (4 tests) 4ms
 ✓ packages/agentplane/src/cli/archive.test.ts (2 tests) 14ms
 ✓ packages/agentplane/src/cli/output.test.ts (4 tests) 4ms
 ✓ packages/agentplane/src/cli2/suggest.test.ts (2 tests) 3ms
 ✓ packages/agentplane/src/shared/errors.test.ts (1 test) 3ms
 ✓ packages/agentplane/src/cli/cli-contract.test.ts (1 test) 3ms
 ✓ packages/testkit/src/index.test.ts (1 test) 3ms
 ✓ packages/agentplane/src/cli/recipes-bundled.test.ts (7 tests) 6ms
 ✓ packages/recipes/src/index.test.ts (1 test) 3ms
 ✓ packages/agentplane/src/cli/error-map.test.ts (4 tests) 3ms
 ✓ packages/agentplane/src/commands/guard/index.test.ts (1 test) 2ms
 ✓ packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (61 tests) 14516ms
     ✓ work start supports direct mode without worktree  361ms
     ✓ work start creates a branch and worktree  454ms
     ✓ pr update refreshes diffstat and auto summary  468ms
     ✓ integrate merges branch and marks task done  1316ms
     ✓ integrate uses a compliant fallback commit subject when branch subject is invalid (squash)  1359ms
     ✓ integrate supports dry-run  1139ms
     ✓ integrate supports merge strategy  1440ms
     ✓ integrate supports rebase strategy  910ms
     ✓ integrate rebase fails when base changes during verify  755ms
     ✓ integrate rebase fails when verify command fails  553ms
     ✓ integrate fails when post-merge hook removes pr dir  1061ms
     ✓ integrate runs verify when requested  621ms
     ✓ cleanup merged lists candidates without --yes  346ms
     ✓ cleanup merged deletes branches/worktrees and archives pr artifacts  428ms
     ✓ cleanup merged refuses worktrees outside repo  367ms

 Test Files  61 passed (61)
      Tests  704 passed (704)
   Start at  20:13:30
   Duration  15.96s (transform 7.58s, setup 0ms, import 22.69s, tests 54.99s, environment 10ms)\n\n### Pass criteria\n- packages/agentplane/src/commands/scenario.ts is reduced to a facade.\n- Implementation lives under packages/agentplane/src/commands/scenario/impl/.\n- CLI2 scenario commands and scenario tests continue to pass.
