---
id: "202603241815-60V8P7"
title: "Enforce recipe artifact prefixes against runner result manifests"
result_summary: "External runner-reported artifact and evidence paths now fail deterministically when they escape declared recipe prefixes; runner-owned control artifacts stay exempt by design."
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
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:15:56.004Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T18:25:37.866Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; writes_artifacts_to is now enforced post-run only for external manifest artifacts and evidence paths."
commit:
  hash: "733f24375fb4603c77894de8346e92a827100339"
  message: "✅ 60V8P7 code: enforce recipe artifact prefixes in runner manifests"
comments:
  -
    author: "CODER"
    body: "Start: enforce recipe writes_artifacts_to against external runner result manifests so custom or codex result artifacts outside declared prefixes fail deterministically while preserved source-manifest evidence remains available for debugging."
  -
    author: "CODER"
    body: "Verified: targeted adapter and scenario tests passed, and agentplane build stayed green while writes_artifacts_to became an honest partial enforcement contract for external runner manifest paths."
events:
  -
    type: "status"
    at: "2026-03-24T18:15:58.475Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce recipe writes_artifacts_to against external runner result manifests so custom or codex result artifacts outside declared prefixes fail deterministically while preserved source-manifest evidence remains available for debugging."
  -
    type: "verify"
    at: "2026-03-24T18:25:37.866Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; writes_artifacts_to is now enforced post-run only for external manifest artifacts and evidence paths."
  -
    type: "status"
    at: "2026-03-24T18:25:42.807Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted adapter and scenario tests passed, and agentplane build stayed green while writes_artifacts_to became an honest partial enforcement contract for external runner manifest paths."
doc_version: 3
doc_updated_at: "2026-03-24T18:25:42.807Z"
doc_updated_by: "CODER"
description: "Validate external runner-reported artifacts and evidence paths against recipe run_profile.writes_artifacts_to so declared artifact scopes become partially enforced instead of remaining pure advisory metadata."
sections:
  Summary: |-
    Enforce recipe artifact prefixes against runner result manifests
    
    Validate external runner-reported artifacts and evidence paths against recipe run_profile.writes_artifacts_to so declared artifact scopes become partially enforced instead of remaining pure advisory metadata.
  Scope: |-
    - In scope: Validate external runner-reported artifacts and evidence paths against recipe run_profile.writes_artifacts_to so declared artifact scopes become partially enforced instead of remaining pure advisory metadata.
    - Out of scope: unrelated refactors not required for "Enforce recipe artifact prefixes against runner result manifests".
  Plan: |-
    1. Trace where recipe run_profile.writes_artifacts_to reaches the adapters and identify the minimal enforcement point for external manifest-reported artifact paths.
    2. Enforce that external result-manifest artifacts and evidence_paths stay within declared recipe prefixes, with deterministic failure and preserved source-manifest evidence on violation.
    3. Add focused adapter/CLI/docs coverage so writes_artifacts_to becomes an honest partial enforcement contract rather than env-only metadata.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: invalid external artifact paths are rejected deterministically and valid paths continue to pass.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the manifest-validation changes.
    3. Inspect the updated contract and docs for writes_artifacts_to. Expected: it is described as partial enforcement over external artifact/evidence paths, not as a generic advisory hint.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T18:25:37.866Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; writes_artifacts_to is now enforced post-run only for external manifest artifacts and evidence paths.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:25:16.852Z, excerpt_hash=sha256:eefd71ea46b46f0c49c3982f2bf5c2f97c60704dc6ab486fbfb205cfb8828a2e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - External result-manifest paths are now checked against recipe writes_artifacts_to prefixes after runner execution.
    - Only recipe-controlled manifest paths are validated: artifacts[].path and evidence.evidence_paths[].
    - Runner-owned control artifacts and preserved source manifests stay outside this prefix check by design.
id_source: "generated"
---
## Summary

Enforce recipe artifact prefixes against runner result manifests

Validate external runner-reported artifacts and evidence paths against recipe run_profile.writes_artifacts_to so declared artifact scopes become partially enforced instead of remaining pure advisory metadata.

## Scope

- In scope: Validate external runner-reported artifacts and evidence paths against recipe run_profile.writes_artifacts_to so declared artifact scopes become partially enforced instead of remaining pure advisory metadata.
- Out of scope: unrelated refactors not required for "Enforce recipe artifact prefixes against runner result manifests".

## Plan

1. Trace where recipe run_profile.writes_artifacts_to reaches the adapters and identify the minimal enforcement point for external manifest-reported artifact paths.
2. Enforce that external result-manifest artifacts and evidence_paths stay within declared recipe prefixes, with deterministic failure and preserved source-manifest evidence on violation.
3. Add focused adapter/CLI/docs coverage so writes_artifacts_to becomes an honest partial enforcement contract rather than env-only metadata.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: invalid external artifact paths are rejected deterministically and valid paths continue to pass.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the manifest-validation changes.
3. Inspect the updated contract and docs for writes_artifacts_to. Expected: it is described as partial enforcement over external artifact/evidence paths, not as a generic advisory hint.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T18:25:37.866Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; writes_artifacts_to is now enforced post-run only for external manifest artifacts and evidence paths.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:25:16.852Z, excerpt_hash=sha256:eefd71ea46b46f0c49c3982f2bf5c2f97c60704dc6ab486fbfb205cfb8828a2e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- External result-manifest paths are now checked against recipe writes_artifacts_to prefixes after runner execution.
- Only recipe-controlled manifest paths are validated: artifacts[].path and evidence.evidence_paths[].
- Runner-owned control artifacts and preserved source manifests stay outside this prefix check by design.
