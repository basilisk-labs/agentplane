---
id: "202606032122-5NZZTN"
title: "Add actionable local fallback for unavailable task backends"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T21:23:00.506Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-06-03T21:22:52.206Z"
doc_updated_by: "PLANNER"
description: "Investigate and fix the local recovery path for unavailable or unsupported task backends in AgentPlane. Primary target: issue #4418. Also evaluate whether the same fix subsumes the cloud 502 fallback gap reported in #4405 without widening scope unnecessarily."
sections:
  Summary: |-
    Add actionable local fallback for unavailable task backends

    Investigate and fix the local recovery path for unavailable or unsupported task backends in AgentPlane. Primary target: issue #4418. Also evaluate whether the same fix subsumes the cloud 502 fallback gap reported in #4405 without widening scope unnecessarily.
  Scope: |-
    - In scope: Investigate and fix the local recovery path for unavailable or unsupported task backends in AgentPlane. Primary target: issue #4418. Also evaluate whether the same fix subsumes the cloud 502 fallback gap reported in #4405 without widening scope unnecessarily.
    - Out of scope: unrelated refactors not required for "Add actionable local fallback for unavailable task backends".
  Plan: "Investigate the task-backend loader and backend error guidance so unavailable or unsupported backends surface a concrete local recovery path instead of a generic backend failure. Keep scope bounded to actionable operator fallback and classification for #4418, and only absorb #4405 where the same fix naturally covers cloud-backend unavailability without expanding into backend service remediation."
  Verify Steps: |-
    1. Reproduce or inspect the current unavailable-backend path through the task backend loader and the surfaced CLI guidance. Expected: unsupported or unavailable backends currently collapse into a generic backend failure without a concrete local recovery route.
    2. Apply the bounded fix and run focused checks for the touched backend-loading and CLI guidance paths. Expected: the operator now gets an explicit local fallback or repair path for the unavailable-backend case, and the same behavior remains coherent for the cloud-backend-unavailable case when applicable.
    3. Run repository safety checks and record any residual gaps. Expected: node .agentplane/policy/check-routing.mjs passes, ap doctor remains OK aside from known bootstrap warnings, and any skipped runtime tests are explicitly recorded in Verification/Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - OK `node scripts/checks/dev-impact.mjs --json`
    - OK `node scripts/checks/check-task-scope.mjs --task-id 202606032122-5NZZTN`
    - OK `git diff --check`
    - OK `node .agentplane/policy/check-routing.mjs`
    - OK `ap doctor` (passed with known framework bootstrap warning and unrelated historical DONE-task commit warnings)
    - NOT RUN `bun`/Vitest-focused suites (`bun run format:changed`, `bun run ci:local:fast`, targeted vitest files) because this checkout is not bootstrapped in the current environment (`bun` missing; no workspace install present)
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Issue #4405 is incidentally covered by the same bounded fix: cloud-unavailable `E_BACKEND` guidance now points operators to inspect backend config and use the repo-local fallback when `.agentplane/tasks` is authoritative enough.
    - Scope intentionally stayed out of backend-service remediation; this change only improves loader and CLI recovery guidance.
id_source: "generated"
---
## Summary

Add actionable local fallback for unavailable task backends

Investigate and fix the local recovery path for unavailable or unsupported task backends in AgentPlane. Primary target: issue #4418. Also evaluate whether the same fix subsumes the cloud 502 fallback gap reported in #4405 without widening scope unnecessarily.

## Scope

- In scope: Investigate and fix the local recovery path for unavailable or unsupported task backends in AgentPlane. Primary target: issue #4418. Also evaluate whether the same fix subsumes the cloud 502 fallback gap reported in #4405 without widening scope unnecessarily.
- Out of scope: unrelated refactors not required for "Add actionable local fallback for unavailable task backends".

## Plan

Investigate the task-backend loader and backend error guidance so unavailable or unsupported backends surface a concrete local recovery path instead of a generic backend failure. Keep scope bounded to actionable operator fallback and classification for #4418, and only absorb #4405 where the same fix naturally covers cloud-backend unavailability without expanding into backend service remediation.

## Verify Steps

1. Reproduce or inspect the current unavailable-backend path through the task backend loader and the surfaced CLI guidance. Expected: unsupported or unavailable backends currently collapse into a generic backend failure without a concrete local recovery route.
2. Apply the bounded fix and run focused checks for the touched backend-loading and CLI guidance paths. Expected: the operator now gets an explicit local fallback or repair path for the unavailable-backend case, and the same behavior remains coherent for the cloud-backend-unavailable case when applicable.
3. Run repository safety checks and record any residual gaps. Expected: node .agentplane/policy/check-routing.mjs passes, ap doctor remains OK aside from known bootstrap warnings, and any skipped runtime tests are explicitly recorded in Verification/Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- OK `node scripts/checks/dev-impact.mjs --json`
- OK `node scripts/checks/check-task-scope.mjs --task-id 202606032122-5NZZTN`
- OK `git diff --check`
- OK `node .agentplane/policy/check-routing.mjs`
- OK `ap doctor` (passed with known framework bootstrap warning and unrelated historical DONE-task commit warnings)
- NOT RUN `bun`/Vitest-focused suites (`bun run format:changed`, `bun run ci:local:fast`, targeted vitest files) because this checkout is not bootstrapped in the current environment (`bun` missing; no workspace install present)
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Issue #4405 is incidentally covered by the same bounded fix: cloud-unavailable `E_BACKEND` guidance now points operators to inspect backend config and use the repo-local fallback when `.agentplane/tasks` is authoritative enough.
- Scope intentionally stayed out of backend-service remediation; this change only improves loader and CLI recovery guidance.
