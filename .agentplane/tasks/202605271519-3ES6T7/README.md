---
id: "202605271519-3ES6T7"
title: "Start Codex runner prompts with /goal"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "codex"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-27T15:20:05.099Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-27T15:23:31.151Z"
  updated_by: "CODER"
  note: "Codex runner /goal bootstrap implemented and verified."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement Codex runner /goal bootstrap in the dedicated task worktree, preserving the existing runner bundle and result manifest contract while adding focused tests."
events:
  -
    type: "status"
    at: "2026-05-27T15:20:20.580Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement Codex runner /goal bootstrap in the dedicated task worktree, preserving the existing runner bundle and result manifest contract while adding focused tests."
  -
    type: "verify"
    at: "2026-05-27T15:23:31.151Z"
    author: "CODER"
    state: "ok"
    note: "Codex runner /goal bootstrap implemented and verified."
doc_version: 3
doc_updated_at: "2026-05-27T15:23:31.167Z"
doc_updated_by: "CODER"
description: "Update the AgentPlane Codex runner bootstrap so Codex exec receives a prompt that starts with the /goal slash command for task and context runner execution, while preserving the existing bundle/result manifest contract."
sections:
  Summary: |-
    Start Codex runner prompts with /goal

    Update the AgentPlane Codex runner bootstrap so Codex exec receives a prompt that starts with the /goal slash command for task and context runner execution, while preserving the existing bundle/result manifest contract.
  Scope: |-
    - In scope: Update the AgentPlane Codex runner bootstrap so Codex exec receives a prompt that starts with the /goal slash command for task and context runner execution, while preserving the existing bundle/result manifest contract.
    - Out of scope: unrelated refactors not required for "Start Codex runner prompts with /goal".
  Plan: |-
    1. Inspect the existing Codex runner bootstrap and adapter tests to preserve current runner artifact/result-manifest behavior.
    2. Update the Codex runner bootstrap so Codex execute-mode input begins with /goal and a bounded AgentPlane task objective before the existing runner instructions.
    3. Add focused tests proving Codex bootstrap starts with /goal for task runner execution and still includes bundle/result manifest paths.
    4. Run task Verify Steps plus targeted runner tests, routing check, and workspace diagnostics.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. Expected: Codex bootstrap begins with /goal, custom adapter bootstrap remains unchanged, and existing Codex adapter behavior remains intact.
    2. Run bun run typecheck. Expected: TypeScript project references compile without errors.
    3. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and workspace diagnostics pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-27T15:23:31.151Z — VERIFY — ok

    By: CODER

    Note: Codex runner /goal bootstrap implemented and verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T15:22:31.381Z, excerpt_hash=sha256:2e3a1cb74decffe85252445e95bc438de1f13feb6b36fa9acdfafb399558a50b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271519-3ES6T7-codex-goal-bootstrap/.agentplane/tasks/202605271519-3ES6T7/blueprint/resolved-snapshot.json
    - old_digest: 40d457050951178de7308a290f1096845aa5335c2d63f65bb502cc4eee913041
    - current_digest: 40d457050951178de7308a290f1096845aa5335c2d63f65bb502cc4eee913041
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605271519-3ES6T7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. Result: pass. Evidence: 15 pass, 0 fail, 105 expectations. Scope: Codex bootstrap /goal behavior and existing Codex adapter behavior. Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings; informational runtime notices only. Scope: workspace diagnostics. Command: bun run format:check and git diff --check. Result: pass. Evidence: Prettier reports all matched files use code style; git diff --check produced no output. Scope: formatting and whitespace.
      Impact: Codex runner prompts now begin with /goal for task/scenario execution when the selected adapter is codex; non-codex adapters keep the existing bootstrap heading.
      Resolution: Added goal-line rendering to the task runner bootstrap and focused tests for Codex and custom adapter behavior.
id_source: "generated"
---
## Summary

Start Codex runner prompts with /goal

Update the AgentPlane Codex runner bootstrap so Codex exec receives a prompt that starts with the /goal slash command for task and context runner execution, while preserving the existing bundle/result manifest contract.

## Scope

- In scope: Update the AgentPlane Codex runner bootstrap so Codex exec receives a prompt that starts with the /goal slash command for task and context runner execution, while preserving the existing bundle/result manifest contract.
- Out of scope: unrelated refactors not required for "Start Codex runner prompts with /goal".

## Plan

1. Inspect the existing Codex runner bootstrap and adapter tests to preserve current runner artifact/result-manifest behavior.
2. Update the Codex runner bootstrap so Codex execute-mode input begins with /goal and a bounded AgentPlane task objective before the existing runner instructions.
3. Add focused tests proving Codex bootstrap starts with /goal for task runner execution and still includes bundle/result manifest paths.
4. Run task Verify Steps plus targeted runner tests, routing check, and workspace diagnostics.

## Verify Steps

1. Run bun test packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. Expected: Codex bootstrap begins with /goal, custom adapter bootstrap remains unchanged, and existing Codex adapter behavior remains intact.
2. Run bun run typecheck. Expected: TypeScript project references compile without errors.
3. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and workspace diagnostics pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-27T15:23:31.151Z — VERIFY — ok

By: CODER

Note: Codex runner /goal bootstrap implemented and verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T15:22:31.381Z, excerpt_hash=sha256:2e3a1cb74decffe85252445e95bc438de1f13feb6b36fa9acdfafb399558a50b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271519-3ES6T7-codex-goal-bootstrap/.agentplane/tasks/202605271519-3ES6T7/blueprint/resolved-snapshot.json
- old_digest: 40d457050951178de7308a290f1096845aa5335c2d63f65bb502cc4eee913041
- current_digest: 40d457050951178de7308a290f1096845aa5335c2d63f65bb502cc4eee913041
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605271519-3ES6T7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. Result: pass. Evidence: 15 pass, 0 fail, 105 expectations. Scope: Codex bootstrap /goal behavior and existing Codex adapter behavior. Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings; informational runtime notices only. Scope: workspace diagnostics. Command: bun run format:check and git diff --check. Result: pass. Evidence: Prettier reports all matched files use code style; git diff --check produced no output. Scope: formatting and whitespace.
  Impact: Codex runner prompts now begin with /goal for task/scenario execution when the selected adapter is codex; non-codex adapters keep the existing bootstrap heading.
  Resolution: Added goal-line rendering to the task runner bootstrap and focused tests for Codex and custom adapter behavior.
