---
id: "202605061623-BQY3MB"
title: "Add Obsidian projection cleanup command"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "obsidian"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T16:23:56.835Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T16:31:42.776Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/commands/task/obsidian.unit.test.ts. Result: pass. Evidence: 6 pass, 0 fail. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Command: bun run docs:cli:check. Result: pass. Evidence: CLI reference up to date. Command: bunx prettier --check touched files. Result: pass. Evidence: all matched files use Prettier style. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: doctor OK. Hosted: PR #989 required checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing a marker-aware Obsidian projection cleanup command with focused tests and docs updates."
events:
  -
    type: "status"
    at: "2026-05-06T16:24:09.479Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing a marker-aware Obsidian projection cleanup command with focused tests and docs updates."
  -
    type: "verify"
    at: "2026-05-06T16:31:42.776Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/commands/task/obsidian.unit.test.ts. Result: pass. Evidence: 6 pass, 0 fail. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Command: bun run docs:cli:check. Result: pass. Evidence: CLI reference up to date. Command: bunx prettier --check touched files. Result: pass. Evidence: all matched files use Prettier style. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: doctor OK. Hosted: PR #989 required checks passed."
doc_version: 3
doc_updated_at: "2026-05-06T16:31:42.811Z"
doc_updated_by: "CODER"
description: "Add a CLI command that removes only the generated Obsidian task navigation projection files while preserving canonical task READMEs and non-generated user files."
sections:
  Summary: |-
    Add Obsidian projection cleanup command
    
    Add a CLI command that removes only the generated Obsidian task navigation projection files while preserving canonical task READMEs and non-generated user files.
  Scope: |-
    - In scope: Add a CLI command that removes only the generated Obsidian task navigation projection files while preserving canonical task READMEs and non-generated user files.
    - Out of scope: unrelated refactors not required for "Add Obsidian projection cleanup command".
  Plan: |-
    1. Add a task obsidian cleanup CLI surface adjacent to the existing generation command.
    2. Implement marker-aware deletion for .agentplane/index.md, .agentplane/tasks.md, and generated pages under .agentplane/by-status, .agentplane/by-tag, and .agentplane/by-owner without touching canonical .agentplane/tasks/**.
    3. Update command catalog/loaders, CLI reference/user docs, and focused unit coverage.
    4. Verify with focused obsidian tests, CLI help/reference checks as applicable, and policy routing.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T16:31:42.776Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/commands/task/obsidian.unit.test.ts. Result: pass. Evidence: 6 pass, 0 fail. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Command: bun run docs:cli:check. Result: pass. Evidence: CLI reference up to date. Command: bunx prettier --check touched files. Result: pass. Evidence: all matched files use Prettier style. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: doctor OK. Hosted: PR #989 required checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T16:24:09.479Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061623-BQY3MB-obsidian-clean/.agentplane/tasks/202605061623-BQY3MB/blueprint/resolved-snapshot.json
    - old_digest: c103e24b015b76cfc30baca45ca9673f4236aa84e29233aa0bd7283c5a3af962
    - current_digest: c103e24b015b76cfc30baca45ca9673f4236aa84e29233aa0bd7283c5a3af962
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061623-BQY3MB
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
