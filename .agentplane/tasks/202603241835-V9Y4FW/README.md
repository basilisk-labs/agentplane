---
id: "202603241835-V9Y4FW"
title: "Reject invalid writes_artifacts_to prefixes before runner spawn"
result_summary: "Declared writes_artifacts_to prefixes are now validated in preflight, so invalid relative scopes fail before adapter execution while post-run manifest-path enforcement stays intact."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "recipes"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:36:04.235Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T18:39:26.807Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; invalid writes_artifacts_to prefixes now refuse the run before spawn while valid prefixes are canonicalized before env export."
commit:
  hash: "4a5e4eff72700f7abae5621681a3a589f8547bef"
  message: "✅ V9Y4FW code: reject invalid artifact prefixes before spawn"
comments:
  -
    author: "CODER"
    body: "Start: reject invalid writes_artifacts_to prefixes during runner preparation so traversal or absolute declared prefixes fail before spawn and do not rely on execute-time policy checks."
  -
    author: "CODER"
    body: "Verified: invalid declared artifact prefixes now refuse the run before spawn, valid prefixes are canonicalized before env export, and the runner package build remained clean."
events:
  -
    type: "status"
    at: "2026-03-24T18:36:04.879Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reject invalid writes_artifacts_to prefixes during runner preparation so traversal or absolute declared prefixes fail before spawn and do not rely on execute-time policy checks."
  -
    type: "verify"
    at: "2026-03-24T18:39:26.807Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; invalid writes_artifacts_to prefixes now refuse the run before spawn while valid prefixes are canonicalized before env export."
  -
    type: "status"
    at: "2026-03-24T18:39:36.743Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: invalid declared artifact prefixes now refuse the run before spawn, valid prefixes are canonicalized before env export, and the runner package build remained clean."
doc_version: 3
doc_updated_at: "2026-03-24T18:39:36.743Z"
doc_updated_by: "CODER"
description: "Validate declared recipe writes_artifacts_to prefixes during runner preparation so traversal or absolute prefixes fail in preflight and never reach adapter execution."
sections:
  Summary: |-
    Reject invalid writes_artifacts_to prefixes before runner spawn
    
    Validate declared recipe writes_artifacts_to prefixes during runner preparation so traversal or absolute prefixes fail in preflight and never reach adapter execution.
  Scope: |-
    - In scope: Validate declared recipe writes_artifacts_to prefixes during runner preparation so traversal or absolute prefixes fail in preflight and never reach adapter execution.
    - Out of scope: unrelated refactors not required for "Reject invalid writes_artifacts_to prefixes before runner spawn".
  Plan: |-
    1. Move writes_artifacts_to prefix validation into runner preparation so invalid declared prefixes fail before spawn instead of surfacing only after execution.
    2. Reuse the same normalization rules already used for manifest-path containment, avoiding a second divergent parser.
    3. Add focused adapter and scenario coverage proving that invalid declared prefixes refuse the run before spawn and still explain the policy field precisely.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: invalid declared writes_artifacts_to prefixes fail before spawn, while valid prefixes still execute normally.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after moving validation into prepare-time logic.
    3. Inspect updated contract wording if docs changed. Expected: writes_artifacts_to declares both preflight prefix validation and post-run manifest-path enforcement.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T18:39:26.807Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; invalid writes_artifacts_to prefixes now refuse the run before spawn while valid prefixes are canonicalized before env export.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:39:07.507Z, excerpt_hash=sha256:fb47a90c08bebb8eacad088618bfc216959abfb2421feca7f528d751da760c92
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Invalid writes_artifacts_to prefixes now fail in runner preflight, so traversal or absolute declared prefixes never reach adapter execution.
    - Valid prefixes are canonicalized before env export, which keeps AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO and AGENTPLANE_RECIPE_RUN_PROFILE stable across adapters.
    - Post-run manifest-path enforcement remains in place; this task only moved declared-prefix validation earlier in the lifecycle.
id_source: "generated"
---
## Summary

Reject invalid writes_artifacts_to prefixes before runner spawn

Validate declared recipe writes_artifacts_to prefixes during runner preparation so traversal or absolute prefixes fail in preflight and never reach adapter execution.

## Scope

- In scope: Validate declared recipe writes_artifacts_to prefixes during runner preparation so traversal or absolute prefixes fail in preflight and never reach adapter execution.
- Out of scope: unrelated refactors not required for "Reject invalid writes_artifacts_to prefixes before runner spawn".

## Plan

1. Move writes_artifacts_to prefix validation into runner preparation so invalid declared prefixes fail before spawn instead of surfacing only after execution.
2. Reuse the same normalization rules already used for manifest-path containment, avoiding a second divergent parser.
3. Add focused adapter and scenario coverage proving that invalid declared prefixes refuse the run before spawn and still explain the policy field precisely.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: invalid declared writes_artifacts_to prefixes fail before spawn, while valid prefixes still execute normally.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after moving validation into prepare-time logic.
3. Inspect updated contract wording if docs changed. Expected: writes_artifacts_to declares both preflight prefix validation and post-run manifest-path enforcement.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T18:39:26.807Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; invalid writes_artifacts_to prefixes now refuse the run before spawn while valid prefixes are canonicalized before env export.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:39:07.507Z, excerpt_hash=sha256:fb47a90c08bebb8eacad088618bfc216959abfb2421feca7f528d751da760c92

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Invalid writes_artifacts_to prefixes now fail in runner preflight, so traversal or absolute declared prefixes never reach adapter execution.
- Valid prefixes are canonicalized before env export, which keeps AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO and AGENTPLANE_RECIPE_RUN_PROFILE stable across adapters.
- Post-run manifest-path enforcement remains in place; this task only moved declared-prefix validation earlier in the lifecycle.
