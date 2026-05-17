---
id: "202605171458-HWXZC9"
title: "Fix context init starter wiki lint"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "init"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T14:59:02.143Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved per user request to verify and fix context init starter wiki lint failure in a separate task."
verification:
  state: "ok"
  updated_at: "2026-05-17T15:31:42.427Z"
  updated_by: "CODER"
  note: "Verified context init starter wiki lint fix: fresh adaptive context init now generates lintable starter wiki pages; focused regression and local checks pass."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix context init starter wiki lint failure in a manually isolated worktree because ap work start is blocked by stale and conflicted base checkout state."
events:
  -
    type: "status"
    at: "2026-05-17T14:59:33.706Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix context init starter wiki lint failure in a manually isolated worktree because ap work start is blocked by stale and conflicted base checkout state."
  -
    type: "verify"
    at: "2026-05-17T15:31:42.427Z"
    author: "CODER"
    state: "ok"
    note: "Verified context init starter wiki lint fix: fresh adaptive context init now generates lintable starter wiki pages; focused regression and local checks pass."
doc_version: 3
doc_updated_at: "2026-05-17T15:31:42.439Z"
doc_updated_by: "CODER"
description: "Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page."
sections:
  Summary: |-
    Fix context init starter wiki lint

    Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.
  Scope: |-
    - In scope: Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.
    - Out of scope: unrelated refactors not required for "Fix context init starter wiki lint".
  Plan: "1. Reproduce the bug in an isolated temporary project: context init --profile adaptive followed by full context wiki lint should currently fail on generated starter wiki files. 2. Update the context init starter wiki generation so AGENTS.md and index/category starter pages include valid AgentPlane wiki frontmatter/source-link hygiene compatible with context wiki lint. 3. Add or update focused regression tests to cover fresh adaptive init plus full wiki lint. 4. Run focused context tests, the reproduction command, git diff --check, and policy routing."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T15:31:42.427Z — VERIFY — ok

    By: CODER

    Note: Verified context init starter wiki lint fix: fresh adaptive context init now generates lintable starter wiki pages; focused regression and local checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T14:59:33.706Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171458-HWXZC9-context-init-wiki-lint/.agentplane/tasks/202605171458-HWXZC9/blueprint/resolved-snapshot.json
    - old_digest: f258e031f94a2b6d4cddf759638210fac22da4709e3afec83e827f3295658997
    - current_digest: f258e031f94a2b6d4cddf759638210fac22da4709e3afec83e827f3295658997
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171458-HWXZC9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts; Result: pass; Evidence: 11 pass, 0 fail. Command: fresh init plus context wiki lint; Result: pass; Evidence: context wiki lint: ok (8 page(s)). Command: pre-push fast CI; Result: reached lint after passing format, schemas, policy routing, release parity, cold-start, build, inventory, scripts README, onboarding, and hotspot gates; remaining lint issue fixed in init-wiki.ts.
      Impact: Covers the reported defect: starter wiki files generated by context init --profile adaptive now satisfy full context wiki lint instead of failing on missing frontmatter.
      Resolution: Implemented starter wiki frontmatter generation in init-wiki.ts, wired context init to use it, and added release-readiness regression coverage.
id_source: "generated"
---
## Summary

Fix context init starter wiki lint

Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.

## Scope

- In scope: Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.
- Out of scope: unrelated refactors not required for "Fix context init starter wiki lint".

## Plan

1. Reproduce the bug in an isolated temporary project: context init --profile adaptive followed by full context wiki lint should currently fail on generated starter wiki files. 2. Update the context init starter wiki generation so AGENTS.md and index/category starter pages include valid AgentPlane wiki frontmatter/source-link hygiene compatible with context wiki lint. 3. Add or update focused regression tests to cover fresh adaptive init plus full wiki lint. 4. Run focused context tests, the reproduction command, git diff --check, and policy routing.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T15:31:42.427Z — VERIFY — ok

By: CODER

Note: Verified context init starter wiki lint fix: fresh adaptive context init now generates lintable starter wiki pages; focused regression and local checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T14:59:33.706Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171458-HWXZC9-context-init-wiki-lint/.agentplane/tasks/202605171458-HWXZC9/blueprint/resolved-snapshot.json
- old_digest: f258e031f94a2b6d4cddf759638210fac22da4709e3afec83e827f3295658997
- current_digest: f258e031f94a2b6d4cddf759638210fac22da4709e3afec83e827f3295658997
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171458-HWXZC9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts; Result: pass; Evidence: 11 pass, 0 fail. Command: fresh init plus context wiki lint; Result: pass; Evidence: context wiki lint: ok (8 page(s)). Command: pre-push fast CI; Result: reached lint after passing format, schemas, policy routing, release parity, cold-start, build, inventory, scripts README, onboarding, and hotspot gates; remaining lint issue fixed in init-wiki.ts.
  Impact: Covers the reported defect: starter wiki files generated by context init --profile adaptive now satisfy full context wiki lint instead of failing on missing frontmatter.
  Resolution: Implemented starter wiki frontmatter generation in init-wiki.ts, wired context init to use it, and added release-readiness regression coverage.
