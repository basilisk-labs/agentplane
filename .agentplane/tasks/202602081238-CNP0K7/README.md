---
id: "202602081238-CNP0K7"
title: "Decompose commands/guard/index.ts"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081238-QMXVTN"
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T13:23:28.334Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T13:23:42.306Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: decomposed commands/guard/index.ts into guard/impl modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass."
commit:
  hash: "e209a1be528e10018c6d58fe06e50eda28366cbe"
  message: "✨ CNP0K7 guard: decompose guard/index.ts into impl modules"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose commands/guard/index.ts into impl modules, keep the exported API stable, and keep bun run test:full green."
  -
    author: "ORCHESTRATOR"
    body: "Verified: split commands/guard/index.ts into guard/impl modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass."
doc_version: 2
doc_updated_at: "2026-02-08T13:24:32.143Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split packages/agentplane/src/commands/guard/index.ts into internal modules (policy eval, allowlist, git env, status commit helpers) without changing CLI2 specs."
id_source: "generated"
---
## Summary


## Scope


## Plan

Scope: split packages/agentplane/src/commands/guard/index.ts into a facade plus modules under packages/agentplane/src/commands/guard/impl/. Steps: (1) Extract allowlist + staging helpers. (2) Extract policy evaluation wrapper (guardCommitCheck). (3) Extract comment-driven commit helpers (commitFromComment). (4) Extract cmdGuard* and cmdCommit handlers. (5) Replace guard/index.ts with a re-export facade. (6) Run bun run typecheck, bun run lint, bun run test:full.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T13:23:42.306Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: decomposed commands/guard/index.ts into guard/impl modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T13:23:28.641Z, excerpt_hash=sha256:c512362341e2289292b1a94b33ff9361599fbc3155fd4990dcc14e8c069e5fe0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands\n- \n- \n- 
 RUN  v4.0.18 /Users/densmirnov/Github/agentplane

 ✓ packages/agentplane/src/cli/run-cli.recipes.test.ts (25 tests) 2498ms
     ✓ recipes install rejects invalid agent and scenario assets  487ms
 ✓ packages/agentplane/src/cli/run-cli.core.hooks.test.ts (26 tests) 3181ms
     ✓ hooks run pre-commit enforces branch_pr base restrictions  332ms
     ✓ hooks run pre-commit blocks tasks.json off base in branch_pr  357ms
 ✓ packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts (26 tests) 3572ms
     ✓ branch base explain prints current, pinned, and effective base  696ms
     ✓ ready reports readiness details  382ms
     ✓ branch status reports ahead/behind  749ms
     ✓ branch remove deletes the branch  438ms
 ✓ packages/agentplane/src/cli/run-cli.core.tasks.test.ts (51 tests) 4506ms
     ✓ task set-status enforces readiness and accepts commit metadata  356ms
 ✓ packages/agentplane/src/cli/run-cli.core.guard.test.ts (33 tests) 4761ms
     ✓ commit wrapper creates a commit with allowlist  323ms
     ✓ commit wrapper blocks AGENTS.md without allow-policy  348ms
 ✓ packages/agentplane/src/commands/workflow.test.ts (40 tests) 5084ms
     ✓ prompt init base branch uses choice and creates a new branch  308ms
     ✓ ensure init commit rejects staged changes and commits when needed  392ms
     ✓ start/block/finish validate transitions and comments  529ms
     ✓ hooks install/uninstall and run validate commit-msg and pre-commit  467ms
 ✓ packages/core/src/git/base-branch.test.ts (13 tests) 1777ms
     ✓ resolveBaseBranch returns null in branch_pr mode when unpinned (no defaults)  309ms
 ✓ packages/agentplane/src/cli/cli-smoke.test.ts (1 test) 1687ms
     ✓ runs init, task, finish, recipe, and work start flow  1685ms
Installed recipe viewer@1.2.3
Run artifacts: .agentplane/recipes/viewer/runs/2026-02-08T13-23-07-840Z-AUDIT_SCENARIO
Installed recipe viewer@1.2.3
 ✓ packages/core/src/git/git-utils.test.ts (7 tests) 1382ms
     ✓ includes renamed files when modified after rename  339ms
     ✓ ignores renamed-only files without modifications  334ms
Installed recipe viewer@1.2.3
 ✓ packages/agentplane/src/cli/run-cli.core.test.ts (21 tests) 1508ms
 ✓ packages/agentplane/src/commands/recipes.test.ts (46 tests) 3437ms
     ✓ installs a recipe from a local archive path  305ms
     ✓ scenario commands validate usage and run scenarios  334ms
     ✓ scenario run rejects invalid tool runtime and failing tools  337ms
 ✓ packages/agentplane/src/cli/run-cli.scenario.test.ts (7 tests) 1441ms
     ✓ scenario list and info read installed recipe scenarios  492ms
 ✓ packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts (45 tests) 8465ms
     ✓ start --commit-from-comment commits and updates status  486ms
     ✓ start --commit-from-comment normalizes ./ prefixes in allowlist  425ms
     ✓ start --commit-from-comment handles paths with spaces  410ms
     ✓ start --commit-from-comment stages deletions under allowlist  530ms
     ✓ start warns on status_commit_policy=warn without confirmation  523ms
     ✓ start commit-from-comment supports auto-allow and sentence formatting  391ms
     ✓ start commit-from-comment supports status_commit_policy=off with semicolon details  379ms
     ✓ start commit-from-comment formats -- separators and supports --quiet  506ms
     ✓ start supports status_commit_policy=confirm when acknowledged  423ms
     ✓ start commit-from-comment formats single-sentence summaries without details  489ms
     ✓ start commit-from-comment honors custom commit emoji  569ms
     ✓ finish marks done and records commit metadata  407ms
 ✓ packages/agentplane/src/cli/run-cli.core.misc.test.ts (11 tests) 992ms
     ✓ task lint reports OK for a valid export  333ms
 ✓ packages/agentplane/src/backends/task-backend.test.ts (65 tests) 988ms
 ✓ packages/agentplane/src/commands/shared/task-backend.test.ts (2 tests) 340ms
 ✓ packages/core/src/tasks/task-store.test.ts (13 tests) 469ms
 ✓ packages/agentplane/src/cli/legacy-cli-regressions.test.ts (1 test) 161ms
✅ migrated task docs (changed=1)
✅ migrated task docs (changed=0)
 ✓ packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts (1 test) 353ms
     ✓ writes an MDX file derived from cli2 help --json  351ms
✅ migrated task docs (changed=1)
✅ migrated task docs (changed=1)
 ✓ packages/agentplane/src/commands/task/migrate-doc.test.ts (3 tests) 387ms
 ✓ packages/core/src/commit/commit-policy.test.ts (9 tests) 352ms
     ✓ integrates with git commit message  323ms
 ✓ packages/core/src/tasks/tasks-export.test.ts (4 tests) 230ms
 ✓ packages/core/src/tasks/task-readme.test.ts (7 tests) 107ms
 ✓ packages/core/src/tasks/tasks-lint.test.ts (5 tests) 235ms
 ✓ packages/agentplane/src/commands/shared/git-context.test.ts (2 tests) 33ms
 ✓ packages/core/src/project/project-root.test.ts (5 tests) 28ms
 ✓ packages/agentplane/src/shared/write-if-changed.test.ts (2 tests) 96ms
 ✓ packages/agentplane/src/shared/errors.test.ts (1 test) 5ms
 ✓ packages/agentplane/src/commands/shared/task-store.test.ts (2 tests) 294ms
 ✓ packages/agentplane/src/agents/agents-template.test.ts (7 tests) 50ms
 ✓ packages/agentplane/src/cli/checksum.test.ts (3 tests) 15ms
 ✓ packages/core/src/tasks/task-readme-io.test.ts (1 test) 47ms
 ✓ packages/agentplane/src/cli/fs-utils.test.ts (2 tests) 62ms
 ✓ packages/agentplane/src/cli/update-check.test.ts (9 tests) 34ms
 ✓ packages/core/src/config/config.test.ts (13 tests) 31ms
 ✓ packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts (43 tests) 11160ms
     ✓ init --yes creates baseline project files  470ms
     ✓ init --backend redmine sets backend config path  470ms
     ✓ init bootstraps git repo and commits install when git is missing  475ms
     ✓ init branch_pr defaults base branch to main in empty repo  486ms
     ✓ init in branch_pr skips hook enforcement for install commit  558ms
     ✓ init branch_pr keeps current branch as base in existing repo when non-interactive  691ms
     ✓ init pins base branch to current branch in existing repo  533ms
     ✓ init writes AGENTS.md and agent templates for direct mode  471ms
     ✓ init filters AGENTS.md for branch_pr mode  549ms
     ✓ init applies workflow, installs hooks, and runs ide sync  748ms
     ✓ init prompts for interactive defaults  851ms
     ✓ init refuses to overwrite existing config  654ms
     ✓ init validates recipes against bundled catalog  467ms
     ✓ init --force overwrites conflicting files  482ms
     ✓ init --backup preserves conflicting files with timestamped backups  636ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-snap.test.ts (4 tests) 35ms
 ✓ packages/core/src/fs/atomic-write.test.ts (2 tests) 72ms
 ✓ packages/agentplane/src/cli/http.test.ts (6 tests) 20ms
 ✓ packages/agentplane/src/cli2/parse.test.ts (6 tests) 6ms
 ✓ packages/agentplane/src/cli/error-map.test.ts (4 tests) 4ms
 ✓ packages/agentplane/src/shared/comment-format.test.ts (16 tests) 7ms
 ✓ packages/agentplane/src/cli/command-guide.test.ts (4 tests) 84ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-contract.test.ts (1 test) 16ms
 ✓ packages/agentplane/src/commands/shared/network-approval.test.ts (3 tests) 8ms
 ✓ packages/agentplane/src/policy/evaluate.test.ts (5 tests) 9ms
 ✓ packages/agentplane/src/commands/upgrade.spec-parse.test.ts (5 tests) 7ms
 ✓ packages/agentplane/src/cli/prompts.test.ts (6 tests) 7ms
 ✓ packages/agentplane/src/cli/output.test.ts (4 tests) 5ms
 ✓ packages/agentplane/src/cli/recipes-bundled.test.ts (7 tests) 6ms
 ✓ packages/agentplane/src/cli/archive.test.ts (2 tests) 22ms
 ✓ packages/agentplane/src/cli2/help-render.test.ts (2 tests) 6ms
 ✓ packages/agentplane/src/commands/backend.test.ts (2 tests) 8ms
 ✓ packages/agentplane/src/cli/cli-contract.test.ts (1 test) 4ms
 ✓ packages/agentplane/src/shared/git-log.test.ts (2 tests) 5ms
 ✓ packages/agentplane/src/commands/task/shared.verify-steps.test.ts (4 tests) 5ms
 ✓ packages/agentplane/src/cli2/suggest.test.ts (2 tests) 4ms
 ✓ packages/recipes/src/index.test.ts (1 test) 4ms
 ✓ packages/agentplane/src/commands/guard/index.test.ts (1 test) 4ms
 ✓ packages/testkit/src/index.test.ts (1 test) 2ms
 ✓ packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (61 tests) 19443ms
     ✓ work start supports direct mode without worktree  402ms
     ✓ work start rejects --worktree in direct mode  305ms
     ✓ work start creates a branch and worktree  593ms
     ✓ pr update refreshes diffstat and auto summary  596ms
     ✓ integrate merges branch and marks task done  1729ms
     ✓ integrate uses a compliant fallback commit subject when branch subject is invalid (squash)  1808ms
     ✓ integrate supports dry-run  1438ms
     ✓ integrate supports merge strategy  2186ms
     ✓ integrate supports rebase strategy  2007ms
     ✓ integrate rebase fails when base changes during verify  787ms
     ✓ integrate rebase fails when verify command fails  666ms
     ✓ integrate fails when post-merge hook removes pr dir  1137ms
     ✓ integrate runs verify when requested  685ms
     ✓ cleanup merged lists candidates without --yes  400ms
     ✓ cleanup merged deletes branches/worktrees and archives pr artifacts  500ms
     ✓ cleanup merged refuses worktrees outside repo  384ms

 Test Files  61 passed (61)
      Tests  704 passed (704)
   Start at  20:22:59
   Duration  20.90s (transform 8.31s, setup 0ms, import 30.75s, tests 79.56s, environment 20ms)\n\n### Pass criteria\n- commands/guard/index.ts becomes a facade.\n- Logic moves to commands/guard/impl/*.ts with clear boundaries.\n- guard commit, commit, and lifecycle flows remain unchanged (full suite passes).
