---
id: "202605231953-7EJ5GX"
title: "Sync agent prompt guidance with compact context commands"
status: "DOING"
priority: "med"
owner: "UPDATER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "cognitive-load"
  - "prompt"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T19:53:58.631Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T20:02:34.883Z"
  updated_by: "UPDATER"
  note: "Verified prompt/bootstrap cognitive-load sync. Commands: bunx vitest run packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts => pass (3 files, 23 tests); node .agentplane/policy/check-routing.mjs => pass; ap doctor => pass with pre-existing branch_pr normalization warnings unrelated to this task."
  attempts: 0
commit: null
comments:
  -
    author: "UPDATER"
    body: "Start: updating prompt/bootstrap surfaces to reduce manual context reconstruction and prefer compact CLI context commands."
events:
  -
    type: "status"
    at: "2026-05-23T19:55:26.213Z"
    author: "UPDATER"
    from: "TODO"
    to: "DOING"
    note: "Start: updating prompt/bootstrap surfaces to reduce manual context reconstruction and prefer compact CLI context commands."
  -
    type: "verify"
    at: "2026-05-23T20:02:34.883Z"
    author: "UPDATER"
    state: "ok"
    note: "Verified prompt/bootstrap cognitive-load sync. Commands: bunx vitest run packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts => pass (3 files, 23 tests); node .agentplane/policy/check-routing.mjs => pass; ap doctor => pass with pre-existing branch_pr normalization warnings unrelated to this task."
doc_version: 3
doc_updated_at: "2026-05-23T20:02:35.056Z"
doc_updated_by: "UPDATER"
description: "Update AgentPlane prompt/bootstrap surfaces so agents use task active, task brief, route next-action, and source-confidence guidance before manual branch_pr command assembly."
sections:
  Summary: |-
    Sync agent prompt guidance with compact context commands

    Update AgentPlane prompt/bootstrap surfaces so agents use task active, task brief, route next-action, and source-confidence guidance before manual branch_pr command assembly.
  Scope: |-
    - In scope: Update AgentPlane prompt/bootstrap surfaces so agents use task active, task brief, route next-action, and source-confidence guidance before manual branch_pr command assembly.
    - Out of scope: unrelated refactors not required for "Sync agent prompt guidance with compact context commands".
  Plan: |-
    1. Audit live prompt/bootstrap sources for compact agent-context commands.
    2. Update bundled Codex skill and bootstrap docs source so agents prefer task active, task brief, route next-action, and source-confidence/verify-steps quality before manual command assembly.
    3. Regenerate generated docs where applicable.
    4. Run targeted prompt/bootstrap tests and routing checks.
  Verify Steps: |-
    - bunx vitest run packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts
    - node .agentplane/policy/check-routing.mjs
    - ap doctor
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T20:02:34.883Z — VERIFY — ok

    By: UPDATER

    Note: Verified prompt/bootstrap cognitive-load sync. Commands: bunx vitest run packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts => pass (3 files, 23 tests); node .agentplane/policy/check-routing.mjs => pass; ap doctor => pass with pre-existing branch_pr normalization warnings unrelated to this task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:02:09.831Z, excerpt_hash=sha256:3a5de728f2d5f9acaf1aca7b2430855bb25d06fc4f206ab6b88300986e7775b7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231953-7EJ5GX-prompt-context-commands/.agentplane/tasks/202605231953-7EJ5GX/blueprint/resolved-snapshot.json
    - old_digest: 8cbc007810710a3cdebc633257d104f0a12728e3a80230bf6821a7cf6a7d32af
    - current_digest: 8cbc007810710a3cdebc633257d104f0a12728e3a80230bf6821a7cf6a7d32af
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231953-7EJ5GX

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Initial audit found bundled Codex skill and branch_pr policy contract still encouraged manual <slug>/<branch> assembly before compact context commands.
      Impact: Agents could reconstruct task route, Verify Steps, PR state, and policy context manually despite task active/task brief/next-action now exposing that context.
      Resolution: Updated skill, bootstrap guide/generated docs, gateway template, and branch_pr policy contract to prefer task active, task brief, emitted next command, source_confidence, and verify_steps_quality before mutation.
id_source: "generated"
---
## Summary

Sync agent prompt guidance with compact context commands

Update AgentPlane prompt/bootstrap surfaces so agents use task active, task brief, route next-action, and source-confidence guidance before manual branch_pr command assembly.

## Scope

- In scope: Update AgentPlane prompt/bootstrap surfaces so agents use task active, task brief, route next-action, and source-confidence guidance before manual branch_pr command assembly.
- Out of scope: unrelated refactors not required for "Sync agent prompt guidance with compact context commands".

## Plan

1. Audit live prompt/bootstrap sources for compact agent-context commands.
2. Update bundled Codex skill and bootstrap docs source so agents prefer task active, task brief, route next-action, and source-confidence/verify-steps quality before manual command assembly.
3. Regenerate generated docs where applicable.
4. Run targeted prompt/bootstrap tests and routing checks.

## Verify Steps

- bunx vitest run packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts
- node .agentplane/policy/check-routing.mjs
- ap doctor

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T20:02:34.883Z — VERIFY — ok

By: UPDATER

Note: Verified prompt/bootstrap cognitive-load sync. Commands: bunx vitest run packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts => pass (3 files, 23 tests); node .agentplane/policy/check-routing.mjs => pass; ap doctor => pass with pre-existing branch_pr normalization warnings unrelated to this task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:02:09.831Z, excerpt_hash=sha256:3a5de728f2d5f9acaf1aca7b2430855bb25d06fc4f206ab6b88300986e7775b7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231953-7EJ5GX-prompt-context-commands/.agentplane/tasks/202605231953-7EJ5GX/blueprint/resolved-snapshot.json
- old_digest: 8cbc007810710a3cdebc633257d104f0a12728e3a80230bf6821a7cf6a7d32af
- current_digest: 8cbc007810710a3cdebc633257d104f0a12728e3a80230bf6821a7cf6a7d32af
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231953-7EJ5GX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Initial audit found bundled Codex skill and branch_pr policy contract still encouraged manual <slug>/<branch> assembly before compact context commands.
  Impact: Agents could reconstruct task route, Verify Steps, PR state, and policy context manually despite task active/task brief/next-action now exposing that context.
  Resolution: Updated skill, bootstrap guide/generated docs, gateway template, and branch_pr policy contract to prefer task active, task brief, emitted next command, source_confidence, and verify_steps_quality before mutation.
