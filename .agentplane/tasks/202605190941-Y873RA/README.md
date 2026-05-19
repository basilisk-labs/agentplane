---
id: "202605190941-Y873RA"
title: "Declare release version surfaces"
result_summary: "Merged via PR #3928; close-tail recorded on main."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T09:43:55.646Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T10:56:43.793Z"
  updated_by: "EVALUATOR"
  note: "Fresh main quality gate passed at merge commit 398671158: PR #3928 merged with hosted checks green and release version surface follow-up review resolved."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T10:56:43.793Z"
  updated_by: "EVALUATOR"
  note: "Fresh main quality gate passed at merge commit 398671158: PR #3928 merged with hosted checks green and release version surface follow-up review resolved."
  evaluated_sha: "398671158b6b3a67343be06e557dc75f14a78db5"
  blueprint_digest: "eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b"
  evidence_refs:
    - ".agentplane/tasks/202605190941-Y873RA/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605190941-Y873RA/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "398671158b6b3a67343be06e557dc75f14a78db5"
  message: "Merge pull request #3928 from basilisk-labs/task/202605190941-P1Q6BB/release-pipeline-hardening"
comments:
  -
    author: "CODER"
    body: "Start: Implement release version surfaces as part of the approved batch PR owned by P1Q6BB so version bump and parity gates share one contract."
  -
    author: "INTEGRATOR"
    body: "Verified: completed as included batch task in PR #3928; implementation merge commit is 398671158."
events:
  -
    type: "status"
    at: "2026-05-19T09:44:07.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement release version surfaces as part of the approved batch PR owned by P1Q6BB so version bump and parity gates share one contract."
  -
    type: "verify"
    at: "2026-05-19T09:52:04.286Z"
    author: "CODER"
    state: "ok"
    note: "Verified release version surface manifest: focused parity tests passed, release:parity passed, version-bump dry-run did not mutate release-owned files."
  -
    type: "verify"
    at: "2026-05-19T10:29:20.768Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Covered by PR #3928 hosted green checks and focused local release parity/version-surface tests."
  -
    type: "verify"
    at: "2026-05-19T10:56:43.793Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Fresh main quality gate passed at merge commit 398671158: PR #3928 merged with hosted checks green and release version surface follow-up review resolved."
  -
    type: "status"
    at: "2026-05-19T10:57:17.093Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: completed as included batch task in PR #3928; implementation merge commit is 398671158."
doc_version: 3
doc_updated_at: "2026-05-19T10:57:17.099Z"
doc_updated_by: "INTEGRATOR"
description: "Introduce a shared declarative release version surface manifest and wire version bump/parity/prepublish checks to it so package, dependency, spec, and example versions cannot drift."
sections:
  Summary: |-
    Declare release version surfaces

    Introduce a shared declarative release version surface manifest and wire version bump/parity/prepublish checks to it so package, dependency, spec, and example versions cannot drift.
  Scope: |-
    - In scope: Introduce a shared declarative release version surface manifest and wire version bump/parity/prepublish checks to it so package, dependency, spec, and example versions cannot drift.
    - Out of scope: unrelated refactors not required for "Declare release version surfaces".
  Plan: "Batch included task. Introduce shared declarative release version surfaces and wire bump/parity checks to it. Acceptance: adding a new version-owned file requires adding a manifest entry, and current known surfaces cannot drift silently."
  Verify Steps: |-
    1. Run version-bump/parity focused tests. Expected: manifest surfaces are updated and drift is detected.
    2. Run release:parity. Expected: pass on current 0.6.3 tree.
    3. Run release:acr-example:check or equivalent spec example check. Expected: pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T09:52:04.286Z — VERIFY — ok

    By: CODER

    Note: Verified release version surface manifest: focused parity tests passed, release:parity passed, version-bump dry-run did not mutate release-owned files.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:44:07.996Z, excerpt_hash=sha256:2ef51a1f3895a56f6d431c4b6c098bb58f092087960b341e3fd5fcc3afa0c53b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-Y873RA/blueprint/resolved-snapshot.json
    - old_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
    - current_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190941-Y873RA

    ### 2026-05-19T10:29:20.768Z — VERIFY — ok

    By: EVALUATOR

    Note: Covered by PR #3928 hosted green checks and focused local release parity/version-surface tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:52:04.307Z, excerpt_hash=sha256:2ef51a1f3895a56f6d431c4b6c098bb58f092087960b341e3fd5fcc3afa0c53b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-Y873RA/blueprint/resolved-snapshot.json
    - old_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
    - current_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190941-Y873RA

    ### 2026-05-19T10:56:43.793Z — VERIFY — ok

    By: EVALUATOR

    Note: Fresh main quality gate passed at merge commit 398671158: PR #3928 merged with hosted checks green and release version surface follow-up review resolved.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T10:29:20.834Z, excerpt_hash=sha256:2ef51a1f3895a56f6d431c4b6c098bb58f092087960b341e3fd5fcc3afa0c53b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605190941-Y873RA/blueprint/resolved-snapshot.json
    - old_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
    - current_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190941-Y873RA

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: bun run release:parity passed; version-bump dry-run reported 0.6.3 -> 0.6.4 without package/spec/config mutations.
      Impact: Package, dependency, recipes runtime, config, and ACR example version surfaces share one declarative manifest.
      Resolution: Added scripts/release/version-surfaces.json and shared release-version-surfaces helper used by bump and parity.
id_source: "generated"
---
## Summary

Declare release version surfaces

Introduce a shared declarative release version surface manifest and wire version bump/parity/prepublish checks to it so package, dependency, spec, and example versions cannot drift.

## Scope

- In scope: Introduce a shared declarative release version surface manifest and wire version bump/parity/prepublish checks to it so package, dependency, spec, and example versions cannot drift.
- Out of scope: unrelated refactors not required for "Declare release version surfaces".

## Plan

Batch included task. Introduce shared declarative release version surfaces and wire bump/parity checks to it. Acceptance: adding a new version-owned file requires adding a manifest entry, and current known surfaces cannot drift silently.

## Verify Steps

1. Run version-bump/parity focused tests. Expected: manifest surfaces are updated and drift is detected.
2. Run release:parity. Expected: pass on current 0.6.3 tree.
3. Run release:acr-example:check or equivalent spec example check. Expected: pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T09:52:04.286Z — VERIFY — ok

By: CODER

Note: Verified release version surface manifest: focused parity tests passed, release:parity passed, version-bump dry-run did not mutate release-owned files.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:44:07.996Z, excerpt_hash=sha256:2ef51a1f3895a56f6d431c4b6c098bb58f092087960b341e3fd5fcc3afa0c53b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-Y873RA/blueprint/resolved-snapshot.json
- old_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
- current_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190941-Y873RA

### 2026-05-19T10:29:20.768Z — VERIFY — ok

By: EVALUATOR

Note: Covered by PR #3928 hosted green checks and focused local release parity/version-surface tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:52:04.307Z, excerpt_hash=sha256:2ef51a1f3895a56f6d431c4b6c098bb58f092087960b341e3fd5fcc3afa0c53b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-Y873RA/blueprint/resolved-snapshot.json
- old_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
- current_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190941-Y873RA

### 2026-05-19T10:56:43.793Z — VERIFY — ok

By: EVALUATOR

Note: Fresh main quality gate passed at merge commit 398671158: PR #3928 merged with hosted checks green and release version surface follow-up review resolved.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T10:29:20.834Z, excerpt_hash=sha256:2ef51a1f3895a56f6d431c4b6c098bb58f092087960b341e3fd5fcc3afa0c53b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605190941-Y873RA/blueprint/resolved-snapshot.json
- old_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
- current_digest: eab8077141a68c475c827b8eaf832ac6b3e005a72948cdf17222c4cadc83447b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190941-Y873RA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: bun run release:parity passed; version-bump dry-run reported 0.6.3 -> 0.6.4 without package/spec/config mutations.
  Impact: Package, dependency, recipes runtime, config, and ACR example version surfaces share one declarative manifest.
  Resolution: Added scripts/release/version-surfaces.json and shared release-version-surfaces helper used by bump and parity.
