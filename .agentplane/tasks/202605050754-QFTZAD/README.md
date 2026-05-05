---
id: "202605050754-QFTZAD"
title: "Generate Obsidian task navigation"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T07:54:43.029Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T08:07:02.785Z"
  updated_by: "CODER"
  note: "Implemented Obsidian Markdown task navigation and passed focused tests, typecheck, docs CLI freshness, repo-local doctor, policy routing, and generated projection smoke."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved Obsidian task navigation projection in this task worktree, keeping task README files canonical and limiting generated Markdown outputs to the requested navigation layer."
events:
  -
    type: "status"
    at: "2026-05-05T07:54:54.370Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved Obsidian task navigation projection in this task worktree, keeping task README files canonical and limiting generated Markdown outputs to the requested navigation layer."
  -
    type: "verify"
    at: "2026-05-05T08:07:02.785Z"
    author: "CODER"
    state: "ok"
    note: "Implemented Obsidian Markdown task navigation and passed focused tests, typecheck, docs CLI freshness, repo-local doctor, policy routing, and generated projection smoke."
doc_version: 3
doc_updated_at: "2026-05-05T08:07:40.204Z"
doc_updated_by: "CODER"
description: "Add an Obsidian-friendly generated Markdown projection under .agentplane so task READMEs remain canonical while users and agents can browse tasks by status, tag, owner, and dependency links."
sections:
  Summary: |-
    Generate Obsidian task navigation
    
    Add an Obsidian-friendly generated Markdown projection under .agentplane so task READMEs remain canonical while users and agents can browse tasks by status, tag, owner, and dependency links.
  Scope: |-
    - In scope: Add an Obsidian-friendly generated Markdown projection under .agentplane so task READMEs remain canonical while users and agents can browse tasks by status, tag, owner, and dependency links.
    - Out of scope: unrelated refactors not required for "Generate Obsidian task navigation".
  Plan: |-
    1. Add a reusable task navigation projection generator that reads the local task backend projection and renders Markdown index files under .agentplane without changing task READMEs as canonical source.
    2. Expose the generator through a CLI command with deterministic output paths: .agentplane/index.md, .agentplane/tasks.md, .agentplane/by-status/*.md, .agentplane/by-tag/*.md, and .agentplane/by-owner/*.md.
    3. Document the Obsidian workflow and the performance boundary: useful as a lightweight human/agent navigation projection, not a replacement runtime source of truth.
    4. Add focused tests for generated links, status/owner/tag/dependency grouping, and deterministic output.
    5. Run targeted tests plus repository policy checks.
  Verify Steps: |-
    1. Run the focused task navigation projection tests. Expected: generated index, task list, status, tag, owner, and dependency links are deterministic and point to canonical task README files.
    2. Run typecheck or the narrow package validation covering the new command/generator. Expected: no TypeScript contract regressions.
    3. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: policy routing and repository health checks pass, or any unrelated residual warning is recorded.
    4. Generate the Obsidian projection in the task worktree. Expected: .agentplane/index.md, .agentplane/tasks.md, .agentplane/by-status/*.md, .agentplane/by-tag/*.md, and .agentplane/by-owner/*.md render task IDs, statuses, owners, tags, and dependencies as Markdown links.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T08:07:02.785Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented Obsidian Markdown task navigation and passed focused tests, typecheck, docs CLI freshness, repo-local doctor, policy routing, and generated projection smoke.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T07:54:54.370Z, excerpt_hash=sha256:1a70b84addbbbccad9ae64c15414191ea5fc4e9d9b7dc6c3f9af11525dcda6fb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Command: bun test packages/agentplane/src/commands/task/obsidian.unit.test.ts. Result: pass. Evidence: 3 tests passed. Scope: renderer, writer cleanup, command backend projection read.
    - Command: bun run typecheck. Result: pass. Evidence: TypeScript project build completed with no errors. Scope: full workspace TS contracts.
    - Command: bunx eslint packages/agentplane/src/commands/task/obsidian.ts packages/agentplane/src/commands/task/obsidian.command.ts packages/agentplane/src/commands/task/obsidian.unit.test.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli/command-loaders/task.ts packages/agentplane/src/runtime/shared/runtime-artifacts.ts. Result: pass. Evidence: no lint diagnostics. Scope: touched TS files.
    - Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date. Scope: generated CLI docs.
    - Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing.
    - Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: errors=0 warnings=0. Scope: repo-local runtime health.
    - Command: node packages/agentplane/bin/agentplane.js task obsidian. Result: pass. Evidence: files=247 tasks=2399. Scope: generated Obsidian projection smoke.
    - Residual: global `agentplane doctor` still reports global-in-framework runtime warnings in this shell; repo-local binary doctor is clean after bootstrap. This is environment/PATH state, not a task regression.
id_source: "generated"
---
