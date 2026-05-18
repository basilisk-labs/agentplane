---
id: "202605181816-3W350X"
title: "Add maximum context assimilation mode"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprint"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T18:17:16.793Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T18:55:05.912Z"
  updated_by: "CODER"
  note: "Refined maximum-assimilation model around self-contained wiki semantics with optional raw provenance."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved maximum context assimilation blueprint and documentation updates in the dedicated branch_pr worktree, preserving existing context defaults while adding explicit full-coverage wiki assimilation guidance and verification."
events:
  -
    type: "status"
    at: "2026-05-18T18:18:01.462Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved maximum context assimilation blueprint and documentation updates in the dedicated branch_pr worktree, preserving existing context defaults while adding explicit full-coverage wiki assimilation guidance and verification."
  -
    type: "verify"
    at: "2026-05-18T18:28:45.938Z"
    author: "CODER"
    state: "ok"
    note: "Verified: maximum context assimilation profile and blueprint behavior covered by focused tests, typecheck, lint, generated CLI docs, routing, and doctor."
  -
    type: "verify"
    at: "2026-05-18T18:55:05.912Z"
    author: "CODER"
    state: "ok"
    note: "Refined maximum-assimilation model around self-contained wiki semantics with optional raw provenance."
doc_version: 3
doc_updated_at: "2026-05-18T18:55:06.030Z"
doc_updated_by: "CODER"
description: "Define an extended context assimilation mode for context init/wiki workflows that fully preserves significant source content in wiki, records original hashes and line-addressed provenance, extracts entities and relations before article synthesis, and maintains glossary-driven terminology normalization."
sections:
  Summary: |-
    Add maximum context assimilation mode

    Define an extended context assimilation mode for context init/wiki workflows that fully preserves significant source content in wiki, records original hashes and line-addressed provenance, extracts entities and relations before article synthesis, and maintains glossary-driven terminology normalization.
  Scope: |-
    - In scope: Define an extended context assimilation mode for context init/wiki workflows that fully preserves significant source content in wiki, records original hashes and line-addressed provenance, extracts entities and relations before article synthesis, and maintains glossary-driven terminology normalization.
    - Out of scope: unrelated refactors not required for "Add maximum context assimilation mode".
  Plan: "Implement a bounded branch_pr change for maximum context assimilation. Steps: 1) inspect current context assimilation blueprint, context init scaffold/docs, and prompt/task generation surfaces; 2) add an extended maximum-assimilation contract that preserves all significant non-private source content in line-addressed wiki/facts/graph outputs while retaining original source hashes for audit; 3) encode entity/relation-first extraction, article synthesis, canonical glossary maintenance, terminology normalization, coverage/conflict checks, and raw-deletion resilience as explicit blueprint/guidance requirements; 4) update focused docs/generated help/tests as needed; 5) verify with targeted context/blueprint tests plus routing/doctor gates or record concrete skips."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T18:28:45.938Z — VERIFY — ok

    By: CODER

    Note: Verified: maximum context assimilation profile and blueprint behavior covered by focused tests, typecheck, lint, generated CLI docs, routing, and doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:18:01.462Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Command: bun test packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts packages/agentplane/src/runtime/task-intake/resolve.test.ts; Result: pass; Evidence: 80 pass, 0 fail. Command: bun run typecheck; Result: pass. Command: bunx eslint <touched ts files>; Result: pass. Command: bun run docs:cli:generate; Result: pass, generated CLI reference updated. Command: node .agentplane/policy/check-routing.mjs; Result: pass, policy routing OK. Command: ap doctor; Result: pass, doctor OK. Command: git diff --check; Result: pass.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181816-3W350X-maximum-context-assimilation/.agentplane/tasks/202605181816-3W350X/blueprint/resolved-snapshot.json
    - old_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
    - current_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181816-3W350X

    ### 2026-05-18T18:55:05.912Z — VERIFY — ok

    By: CODER

    Note: Refined maximum-assimilation model around self-contained wiki semantics with optional raw provenance.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:28:45.973Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Checks: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts; bun run typecheck; bunx eslint touched context files; git diff --check.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181816-3W350X-maximum-context-assimilation/.agentplane/tasks/202605181816-3W350X/blueprint/resolved-snapshot.json
    - old_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
    - current_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181816-3W350X

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add maximum context assimilation mode

Define an extended context assimilation mode for context init/wiki workflows that fully preserves significant source content in wiki, records original hashes and line-addressed provenance, extracts entities and relations before article synthesis, and maintains glossary-driven terminology normalization.

## Scope

- In scope: Define an extended context assimilation mode for context init/wiki workflows that fully preserves significant source content in wiki, records original hashes and line-addressed provenance, extracts entities and relations before article synthesis, and maintains glossary-driven terminology normalization.
- Out of scope: unrelated refactors not required for "Add maximum context assimilation mode".

## Plan

Implement a bounded branch_pr change for maximum context assimilation. Steps: 1) inspect current context assimilation blueprint, context init scaffold/docs, and prompt/task generation surfaces; 2) add an extended maximum-assimilation contract that preserves all significant non-private source content in line-addressed wiki/facts/graph outputs while retaining original source hashes for audit; 3) encode entity/relation-first extraction, article synthesis, canonical glossary maintenance, terminology normalization, coverage/conflict checks, and raw-deletion resilience as explicit blueprint/guidance requirements; 4) update focused docs/generated help/tests as needed; 5) verify with targeted context/blueprint tests plus routing/doctor gates or record concrete skips.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T18:28:45.938Z — VERIFY — ok

By: CODER

Note: Verified: maximum context assimilation profile and blueprint behavior covered by focused tests, typecheck, lint, generated CLI docs, routing, and doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:18:01.462Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Command: bun test packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/blueprint/task-input.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts packages/agentplane/src/runtime/task-intake/resolve.test.ts; Result: pass; Evidence: 80 pass, 0 fail. Command: bun run typecheck; Result: pass. Command: bunx eslint <touched ts files>; Result: pass. Command: bun run docs:cli:generate; Result: pass, generated CLI reference updated. Command: node .agentplane/policy/check-routing.mjs; Result: pass, policy routing OK. Command: ap doctor; Result: pass, doctor OK. Command: git diff --check; Result: pass.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181816-3W350X-maximum-context-assimilation/.agentplane/tasks/202605181816-3W350X/blueprint/resolved-snapshot.json
- old_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
- current_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181816-3W350X

### 2026-05-18T18:55:05.912Z — VERIFY — ok

By: CODER

Note: Refined maximum-assimilation model around self-contained wiki semantics with optional raw provenance.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:28:45.973Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Checks: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts; bun run typecheck; bunx eslint touched context files; git diff --check.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181816-3W350X-maximum-context-assimilation/.agentplane/tasks/202605181816-3W350X/blueprint/resolved-snapshot.json
- old_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
- current_digest: 459d784158b3116cc43dc8cd149181ef135a15de07391ada1a598d2bfd2d4b9a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181816-3W350X

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
