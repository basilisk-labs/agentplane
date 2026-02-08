---
id: "202602081238-GEAQGN"
title: "Decompose commands/pr/integrate.ts"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081238-CNP0K7"
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T13:26:34.432Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T13:39:39.640Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck, bun run lint, bun run test:full (704 tests) all pass; integrate.ts is now a facade and implementation lives under commands/pr/integrate/*."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose pr/integrate.ts into focused modules while preserving behavior and keeping bun run test:full green."
doc_version: 2
doc_updated_at: "2026-02-08T13:39:39.642Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split packages/agentplane/src/commands/pr/integrate.ts into smaller modules (merge strategies, verify gate, PR artifacts update, diffstat) and keep tests green."
id_source: "generated"
---
## Summary


## Scope


## Plan

Scope: split packages/agentplane/src/commands/pr/integrate.ts into a facade plus modules under packages/agentplane/src/commands/pr/integrate/ (or pr/internal/). Steps: (1) Identify cohesive parts: merge strategy handling (squash/rebase/merge), verify invocation and gating, PR artifact updates (diffstat/summary), and post-merge cleanup. (2) Extract helpers into internal modules; keep cmdIntegrateParsed signature unchanged. (3) Replace integrate.ts with a thin re-export facade. (4) Run bun run typecheck, bun run lint, bun run test:full.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T13:39:39.640Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck, bun run lint, bun run test:full (704 tests) all pass; integrate.ts is now a facade and implementation lives under commands/pr/integrate/*.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T13:26:34.736Z, excerpt_hash=sha256:558b33661e6933a54665702b43bd73de00a4fa924cff1d395ad1fccc7110f0c0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands\n- \n- \n- 
 RUN  v4.0.18 /Users/densmirnov/Github/agentplane

Installed recipe viewer@1.2.3
Run artifacts: .agentplane/recipes/viewer/runs/2026-02-08T13-26-08-814Z-AUDIT_SCENARIO
Installed recipe viewer@1.2.3
Installed recipe viewer@1.2.3
 ✓ packages/agentplane/src/commands/recipes.test.ts (46 tests) 2706ms
 ✓ packages/agentplane/src/cli/run-cli.core.hooks.test.ts (26 tests) 3567ms
     ✓ hooks install is idempotent for managed hooks  335ms
     ✓ hooks uninstall removes managed hooks  332ms
     ✓ hooks run pre-commit blocks tasks.json off base in branch_pr  351ms
 ✓ packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts (26 tests) 3730ms
     ✓ branch base explain prints current, pinned, and effective base  773ms
     ✓ ready reports readiness details  340ms
     ✓ branch status reports ahead/behind  597ms
     ✓ branch remove deletes the branch  431ms
 ✓ packages/agentplane/src/cli/run-cli.core.tasks.test.ts (51 tests) 4241ms
     ✓ task set-status enforces readiness and accepts commit metadata  399ms
 ✓ packages/agentplane/src/cli/run-cli.core.guard.test.ts (33 tests) 4909ms
     ✓ commit wrapper creates a commit with allowlist  345ms
     ✓ commit wrapper allows AGENTS.md with allow-policy  337ms
     ✓ commit wrapper supports --allow-tasks flag  335ms
 ✓ packages/agentplane/src/commands/workflow.test.ts (40 tests) 5213ms
     ✓ prompt init base branch uses choice and creates a new branch  335ms
     ✓ ensure init commit rejects staged changes and commits when needed  392ms
     ✓ start/block/finish validate transitions and comments  348ms
     ✓ hooks install/uninstall and run validate commit-msg and pre-commit  513ms
 ✓ packages/agentplane/src/cli/cli-smoke.test.ts (1 test) 1650ms
     ✓ runs init, task, finish, recipe, and work start flow  1648ms
 ✓ packages/agentplane/src/cli/run-cli.core.test.ts (21 tests) 1665ms
     ✓ prints update notice when npm has a newer version  392ms
 ✓ packages/agentplane/src/cli/run-cli.scenario.test.ts (7 tests) 1424ms
     ✓ scenario list and info read installed recipe scenarios  457ms
     ✓ scenario run executes tools and writes artifacts  372ms
 ✓ packages/agentplane/src/cli/run-cli.recipes.test.ts (25 tests) 3794ms
     ✓ recipes install renames agents on conflict when requested  358ms
     ✓ recipes install rejects invalid agent and scenario assets  496ms
     ✓ recipes install supports id from indexed catalog  301ms
 ✓ packages/core/src/git/base-branch.test.ts (13 tests) 1784ms
 ✓ packages/agentplane/src/cli/run-cli.core.misc.test.ts (11 tests) 1342ms
 ✓ packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts (45 tests) 8651ms
     ✓ start --commit-from-comment commits and updates status  446ms
     ✓ start --commit-from-comment normalizes ./ prefixes in allowlist  427ms
     ✓ start --commit-from-comment handles paths with spaces  375ms
     ✓ start --commit-from-comment stages deletions under allowlist  535ms
     ✓ start warns on status_commit_policy=warn without confirmation  435ms
     ✓ start commit-from-comment supports auto-allow and sentence formatting  451ms
     ✓ start commit-from-comment supports status_commit_policy=off with semicolon details  384ms
     ✓ start commit-from-comment formats -- separators and supports --quiet  470ms
     ✓ start supports status_commit_policy=confirm when acknowledged  508ms
     ✓ start commit-from-comment formats single-sentence summaries without details  521ms
     ✓ start commit-from-comment honors custom commit emoji  444ms
     ✓ finish marks done and records commit metadata  431ms
     ✓ finish supports multiple task ids  312ms
✅ migrated task docs (changed=1)
✅ migrated task docs (changed=0)
✅ migrated task docs (changed=1)
 ✓ packages/agentplane/src/cli/legacy-cli-regressions.test.ts (1 test) 132ms
✅ migrated task docs (changed=1)
 ✓ packages/agentplane/src/commands/task/migrate-doc.test.ts (3 tests) 393ms
 ✓ packages/core/src/git/git-utils.test.ts (7 tests) 1330ms
     ✓ includes renamed files when modified after rename  306ms
     ✓ ignores renamed-only files without modifications  309ms
 ✓ packages/core/src/tasks/task-store.test.ts (13 tests) 429ms
 ✓ packages/agentplane/src/backends/task-backend.test.ts (65 tests) 947ms
 ✓ packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts (1 test) 248ms
 ✓ packages/core/src/tasks/task-readme.test.ts (7 tests) 120ms
 ✓ packages/core/src/tasks/tasks-export.test.ts (4 tests) 92ms
 ✓ packages/core/src/tasks/task-readme-io.test.ts (1 test) 18ms
 ✓ packages/agentplane/src/commands/shared/task-store.test.ts (2 tests) 102ms
 ✓ packages/core/src/commit/commit-policy.test.ts (9 tests) 250ms
 ✓ packages/core/src/tasks/tasks-lint.test.ts (5 tests) 178ms
 ✓ packages/agentplane/src/commands/shared/task-backend.test.ts (2 tests) 193ms
 ✓ packages/agentplane/src/agents/agents-template.test.ts (7 tests) 88ms
 ✓ packages/agentplane/src/cli/checksum.test.ts (3 tests) 24ms
 ✓ packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts (43 tests) 10740ms
     ✓ init --yes creates baseline project files  653ms
     ✓ init --backend redmine sets backend config path  516ms
     ✓ init bootstraps git repo and commits install when git is missing  476ms
     ✓ init branch_pr defaults base branch to main in empty repo  414ms
     ✓ init in branch_pr skips hook enforcement for install commit  599ms
     ✓ init branch_pr keeps current branch as base in existing repo when non-interactive  609ms
     ✓ init pins base branch to current branch in existing repo  448ms
     ✓ init writes AGENTS.md and agent templates for direct mode  466ms
     ✓ init filters AGENTS.md for branch_pr mode  549ms
     ✓ init applies workflow, installs hooks, and runs ide sync  774ms
     ✓ init prompts for interactive defaults  808ms
     ✓ init refuses to overwrite existing config  697ms
     ✓ init validates recipes against bundled catalog  506ms
     ✓ init --force overwrites conflicting files  489ms
     ✓ init --backup preserves conflicting files with timestamped backups  558ms
 ✓ packages/core/src/fs/atomic-write.test.ts (2 tests) 96ms
 ✓ packages/core/src/project/project-root.test.ts (5 tests) 28ms
 ✓ packages/agentplane/src/cli/fs-utils.test.ts (2 tests) 27ms
 ✓ packages/agentplane/src/shared/write-if-changed.test.ts (2 tests) 190ms
 ✓ packages/core/src/config/config.test.ts (13 tests) 42ms
 ✓ packages/agentplane/src/commands/shared/git-context.test.ts (2 tests) 37ms
 ✓ packages/agentplane/src/cli/http.test.ts (6 tests) 16ms
 ✓ packages/agentplane/src/shared/git-log.test.ts (2 tests) 10ms
 ✓ packages/agentplane/src/cli/update-check.test.ts (9 tests) 42ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-snap.test.ts (4 tests) 57ms
 ✓ packages/agentplane/src/commands/upgrade.spec-parse.test.ts (5 tests) 6ms
 ✓ packages/agentplane/src/shared/comment-format.test.ts (16 tests) 8ms
 ✓ packages/agentplane/src/commands/shared/network-approval.test.ts (3 tests) 9ms
 ✓ packages/agentplane/src/policy/evaluate.test.ts (5 tests) 8ms
 ✓ packages/agentplane/src/cli2/parse.test.ts (6 tests) 8ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-contract.test.ts (1 test) 21ms
 ✓ packages/agentplane/src/cli/archive.test.ts (2 tests) 8ms
 ✓ packages/agentplane/src/cli/output.test.ts (4 tests) 5ms
 ✓ packages/agentplane/src/cli2/help-render.test.ts (2 tests) 7ms
 ✓ packages/agentplane/src/cli/command-guide.test.ts (4 tests) 8ms
 ✓ packages/agentplane/src/cli/prompts.test.ts (6 tests) 16ms
 ✓ packages/agentplane/src/commands/backend.test.ts (2 tests) 7ms
 ✓ packages/agentplane/src/shared/errors.test.ts (1 test) 4ms
 ✓ packages/recipes/src/index.test.ts (1 test) 5ms
 ✓ packages/agentplane/src/cli/cli-contract.test.ts (1 test) 3ms
 ✓ packages/agentplane/src/commands/task/shared.verify-steps.test.ts (4 tests) 16ms
 ✓ packages/agentplane/src/cli2/suggest.test.ts (2 tests) 3ms
 ✓ packages/testkit/src/index.test.ts (1 test) 3ms
 ✓ packages/agentplane/src/commands/guard/index.test.ts (1 test) 3ms
 ✓ packages/agentplane/src/cli/error-map.test.ts (4 tests) 3ms
 ✓ packages/agentplane/src/cli/recipes-bundled.test.ts (7 tests) 7ms
 ✓ packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (61 tests) 20010ms
     ✓ work start supports direct mode without worktree  505ms
     ✓ work start rejects --worktree in direct mode  395ms
     ✓ work start creates a branch and worktree  581ms
     ✓ pr update refreshes diffstat and auto summary  633ms
     ✓ integrate requires branch_pr workflow  307ms
     ✓ integrate merges branch and marks task done  1829ms
     ✓ integrate uses a compliant fallback commit subject when branch subject is invalid (squash)  1770ms
     ✓ integrate supports dry-run  1439ms
     ✓ integrate supports merge strategy  2130ms
     ✓ integrate supports rebase strategy  1633ms
     ✓ integrate rebase fails when base changes during verify  823ms
     ✓ integrate rebase fails when verify command fails  663ms
     ✓ integrate fails when post-merge hook removes pr dir  1162ms
     ✓ integrate runs verify when requested  736ms
     ✓ cleanup merged lists candidates without --yes  414ms
     ✓ cleanup merged deletes branches/worktrees and archives pr artifacts  483ms
     ✓ cleanup merged refuses worktrees outside repo  442ms

 Test Files  61 passed (61)
      Tests  704 passed (704)
   Start at  20:26:04
   Duration  21.97s (transform 9.74s, setup 0ms, import 34.92s, tests 80.67s, environment 18ms)\n\n### Pass criteria\n- pr/integrate.ts is reduced to a facade; implementation moved under commands/pr/integrate/* (or pr/internal/*).\n- integrate flow behavior is unchanged (pr-flow tests pass).\n- Full suite passes.
