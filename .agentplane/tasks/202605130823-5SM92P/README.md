---
id: "202605130823-5SM92P"
title: "Improve Agentplane PR merge messages with structured human-readable summaries"
result_summary: "Merged via PR #3615."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T08:23:37.449Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T09:09:22.333Z"
  updated_by: "CODER"
  note: "Post-CI fix verified: knip:check, format:check, typecheck, lint:core, and targeted merge-message/commit-policy tests passed after making MergeMessageInput internal."
  attempts: 0
commit:
  hash: "a5f35f26b5e7b6a791886bc779eae3a42d5bd4fc"
  message: "Merge pull request #3615 from basilisk-labs/task/202605130823-5SM92P/human-readable-merge-messages"
comments:
  -
    author: "CODER"
    body: "Start: Implement deterministic human-readable close and merge commit messages in the dedicated task worktree, preserving audit refs while moving operational metadata out of the subject."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3615 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T08:23:55.154Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement deterministic human-readable close and merge commit messages in the dedicated task worktree, preserving audit refs while moving operational metadata out of the subject."
  -
    type: "verify"
    at: "2026-05-13T08:56:07.077Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run format:check. Result: pass. Evidence: Prettier reports all matched files use code style. Scope: repository formatting. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references. Command: bun run lint:core. Result: pass. Evidence: eslint packages/scripts completed with exit 0. Scope: touched core and agentplane source. Command: targeted vitest close-message/commit-policy/commit-wrapper/finish/integrate suites. Result: pass. Evidence: 6 files, 56 tests passed. Scope: merge message renderer, close commits, branch_pr finish, integrate close-tail. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings."
  -
    type: "verify"
    at: "2026-05-13T09:09:22.333Z"
    author: "CODER"
    state: "ok"
    note: "Post-CI fix verified: knip:check, format:check, typecheck, lint:core, and targeted merge-message/commit-policy tests passed after making MergeMessageInput internal."
  -
    type: "status"
    at: "2026-05-13T09:46:32.869Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3615 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T09:46:32.869Z"
doc_updated_by: "INTEGRATOR"
description: "Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers."
sections:
  Summary: |-
    Improve Agentplane PR merge messages with structured human-readable summaries
    
    Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.
  Scope: |-
    - In scope: Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.
    - Out of scope: unrelated refactors not required for "Improve Agentplane PR merge messages with structured human-readable summaries".
  Plan: "Implement deterministic human-readable Agentplane close/merge commit messages. Steps: 1) add a structured merge message input/model and renderer with normalization helpers; 2) wire close-commit rendering to use structured sections and refs instead of operational metadata in the subject; 3) preserve DCO/co-author trailers and available task/run/PR refs; 4) add renderer snapshot/unit coverage for full, minimal, noisy-title, long-verification, many-key-files, and metadata-only cases; 5) update one integration path assertion so old emoji/task close subject is no longer accepted; 6) verify with task verify-show, targeted tests, typecheck, and routing check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T08:56:07.077Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run format:check. Result: pass. Evidence: Prettier reports all matched files use code style. Scope: repository formatting. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references. Command: bun run lint:core. Result: pass. Evidence: eslint packages/scripts completed with exit 0. Scope: touched core and agentplane source. Command: targeted vitest close-message/commit-policy/commit-wrapper/finish/integrate suites. Result: pass. Evidence: 6 files, 56 tests passed. Scope: merge message renderer, close commits, branch_pr finish, integrate close-tail. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:23:55.154Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-5SM92P-human-readable-merge-messages/.agentplane/tasks/202605130823-5SM92P/blueprint/resolved-snapshot.json
    - old_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
    - current_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130823-5SM92P
    
    ### 2026-05-13T09:09:22.333Z — VERIFY — ok
    
    By: CODER
    
    Note: Post-CI fix verified: knip:check, format:check, typecheck, lint:core, and targeted merge-message/commit-policy tests passed after making MergeMessageInput internal.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:56:07.097Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-5SM92P-human-readable-merge-messages/.agentplane/tasks/202605130823-5SM92P/blueprint/resolved-snapshot.json
    - old_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
    - current_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130823-5SM92P
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Full bun run lint currently fails in lint:website on pre-existing website type-resolution/no-unsafe diagnostics under website/src; this task did not touch website files.
      Impact: Verification for touched OSS core code is covered by lint:core, typecheck, targeted regression suites, routing, and doctor; unrelated website lint debt remains outside this task scope.
      Resolution: Recorded the full-lint limitation as out-of-scope and used focused core/touched checks for this code change.
    
    - Observation: GitHub test job initially failed because knip reported a newly exported unused type: MergeMessageInput in close-message.ts.
      Impact: The renderer behavior was correct, but CI treated the unnecessary public export as new dead-code debt.
      Resolution: Kept the deterministic merge message model internal to the renderer and reran local checks covering the failed baseline guard and affected behavior.
id_source: "generated"
---
## Summary

Improve Agentplane PR merge messages with structured human-readable summaries

Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.

## Scope

- In scope: Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.
- Out of scope: unrelated refactors not required for "Improve Agentplane PR merge messages with structured human-readable summaries".

## Plan

Implement deterministic human-readable Agentplane close/merge commit messages. Steps: 1) add a structured merge message input/model and renderer with normalization helpers; 2) wire close-commit rendering to use structured sections and refs instead of operational metadata in the subject; 3) preserve DCO/co-author trailers and available task/run/PR refs; 4) add renderer snapshot/unit coverage for full, minimal, noisy-title, long-verification, many-key-files, and metadata-only cases; 5) update one integration path assertion so old emoji/task close subject is no longer accepted; 6) verify with task verify-show, targeted tests, typecheck, and routing check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T08:56:07.077Z — VERIFY — ok

By: CODER

Note: Command: bun run format:check. Result: pass. Evidence: Prettier reports all matched files use code style. Scope: repository formatting. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references. Command: bun run lint:core. Result: pass. Evidence: eslint packages/scripts completed with exit 0. Scope: touched core and agentplane source. Command: targeted vitest close-message/commit-policy/commit-wrapper/finish/integrate suites. Result: pass. Evidence: 6 files, 56 tests passed. Scope: merge message renderer, close commits, branch_pr finish, integrate close-tail. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:23:55.154Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-5SM92P-human-readable-merge-messages/.agentplane/tasks/202605130823-5SM92P/blueprint/resolved-snapshot.json
- old_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
- current_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130823-5SM92P

### 2026-05-13T09:09:22.333Z — VERIFY — ok

By: CODER

Note: Post-CI fix verified: knip:check, format:check, typecheck, lint:core, and targeted merge-message/commit-policy tests passed after making MergeMessageInput internal.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:56:07.097Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-5SM92P-human-readable-merge-messages/.agentplane/tasks/202605130823-5SM92P/blueprint/resolved-snapshot.json
- old_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
- current_digest: d3f62125065dcb4d74f15d207f6fb03c7f54508788772e3204121b212edbfa61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130823-5SM92P

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Full bun run lint currently fails in lint:website on pre-existing website type-resolution/no-unsafe diagnostics under website/src; this task did not touch website files.
  Impact: Verification for touched OSS core code is covered by lint:core, typecheck, targeted regression suites, routing, and doctor; unrelated website lint debt remains outside this task scope.
  Resolution: Recorded the full-lint limitation as out-of-scope and used focused core/touched checks for this code change.

- Observation: GitHub test job initially failed because knip reported a newly exported unused type: MergeMessageInput in close-message.ts.
  Impact: The renderer behavior was correct, but CI treated the unnecessary public export as new dead-code debt.
  Resolution: Kept the deterministic merge message model internal to the renderer and reran local checks covering the failed baseline guard and affected behavior.
