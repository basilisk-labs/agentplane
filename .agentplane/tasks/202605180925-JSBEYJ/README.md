---
id: "202605180925-JSBEYJ"
title: "Add release and dev workflow helper scripts"
result_summary: "Merged via PR #3880."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T09:26:13.704Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T10:14:41.854Z"
  updated_by: "CODER"
  note: "Addressed PR review comments: deps-triage --write now exits nonzero on failed subcommands; version-bump accepts SemVer prerelease plus build metadata. Verified node --check, targeted eslint, dry-run semver input, dry-run deps triage, and fake failing bun exit path."
  attempts: 0
commit:
  hash: "1e2f023a156dcaf2a83c7917d7241746d57f3d44"
  message: "Merge pull request #3880 from basilisk-labs/task/202605180925-JSBEYJ/release-dev-helper-scripts"
comments:
  -
    author: "CODER"
    body: "Start: Implement approved release and developer workflow helper scripts in the task worktree, including package entrypoints and repository skill guidance."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3880 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-18T09:26:27.004Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release and developer workflow helper scripts in the task worktree, including package entrypoints and repository skill guidance."
  -
    type: "verify"
    at: "2026-05-18T09:35:00.859Z"
    author: "CODER"
    state: "ok"
    note: "Implemented release/dev helper scripts and skill entrypoints; targeted verification passed."
  -
    type: "verify"
    at: "2026-05-18T09:44:06.116Z"
    author: "CODER"
    state: "ok"
    note: "Follow-up verification after hosted test failure: aligned release and hosted install build routes to build @agentplane/testkit before agentplane; ran release CI contract test, test:fast, release:parity, policy routing."
  -
    type: "verify"
    at: "2026-05-18T09:44:55.990Z"
    author: "CODER"
    state: "ok"
    note: "Committed CI build-order fix; release CI contract, test:fast, release:parity, and policy routing passed locally."
  -
    type: "verify"
    at: "2026-05-18T09:47:20.906Z"
    author: "CODER"
    state: "ok"
    note: "Canonical command guidance fix committed; workflows:lint and targeted eslint passed; agentplane package rebuilt for hook freshness."
  -
    type: "verify"
    at: "2026-05-18T09:48:48.101Z"
    author: "CODER"
    state: "ok"
    note: "CLI reference refreshed after canonical verify command example update; docs:cli:check passed."
  -
    type: "verify"
    at: "2026-05-18T10:00:03.881Z"
    author: "CODER"
    state: "ok"
    note: "Corrected release build dependency order after hosted TS6305 failure; release:check, release CI contract test, workflows:lint, scripts README check, and targeted eslint passed."
  -
    type: "verify"
    at: "2026-05-18T10:14:41.854Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review comments: deps-triage --write now exits nonzero on failed subcommands; version-bump accepts SemVer prerelease plus build metadata. Verified node --check, targeted eslint, dry-run semver input, dry-run deps triage, and fake failing bun exit path."
  -
    type: "status"
    at: "2026-05-18T10:32:53.614Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3880 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-18T10:32:53.621Z"
doc_updated_by: "INTEGRATOR"
description: "Add repo-local helper scripts and skill guidance for release state, version bumping, candidate prep, publication evidence collection, dev impact checks, task scope checks, and dependency triage."
sections:
  Summary: |-
    Add release and dev workflow helper scripts

    Add repo-local helper scripts and skill guidance for release state, version bumping, candidate prep, publication evidence collection, dev impact checks, task scope checks, and dependency triage.
  Scope: |-
    - In scope: Add repo-local helper scripts and skill guidance for release state, version bumping, candidate prep, publication evidence collection, dev impact checks, task scope checks, and dependency triage.
    - Out of scope: unrelated refactors not required for "Add release and dev workflow helper scripts".
  Plan: "Implement repo-local helper scripts and skill access for release/developer workflow acceleration. Scope: add reusable release helpers (version bump, state, candidate preparation, publication evidence collection, next-action recovery), developer helpers (impact selection, task scope guard, dependency triage), package.json entrypoints, skill docs, and generated scripts inventory. Verification: targeted lint for new scripts, release parity/state checks, docs scripts freshness, policy routing, and task verify-show."
  Verify Steps: |-
    1. `node --check` all new release/dev helper scripts. Expected: syntax checks pass.
    2. `bunx eslint` on new scripts plus `scripts/lib/local-ci-selection.mjs`. Expected: no lint errors.
    3. Dry-run helper entrypoints: `release:version:bump`, `release:state`, `release:next-action`, `release:candidate:prepare`, `dev:impact`, `dev:task-scope:check`, and `deps:triage`. Expected: commands produce structured output without mutating release state.
    4. `bun run docs:scripts:check`, `bun run release:parity`, `node .agentplane/policy/check-routing.mjs`, and `bun run format:changed`. Expected: all pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T09:35:00.859Z — VERIFY — ok

    By: CODER

    Note: Implemented release/dev helper scripts and skill entrypoints; targeted verification passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:33:27.034Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

    Details:

    Command: node --check scripts/release/*.mjs scripts/checks/{dev-impact,check-task-scope,deps-triage}.mjs. Result: pass. Evidence: syntax checks exited 0. Scope: new helper scripts.
    Command: bunx eslint new scripts plus scripts/lib/local-ci-selection.mjs. Result: pass. Evidence: exited 0. Scope: changed JS scripts.
    Command: dry-run entrypoints for release:version:bump, release:state, release:next-action, release:candidate:prepare, dev:impact, dev:task-scope:check, deps:triage. Result: pass. Evidence: structured output produced without release mutation. Scope: script behavior.
    Command: bun run docs:scripts:check && bun run release:parity && node .agentplane/policy/check-routing.mjs && bun run format:changed. Result: pass. Evidence: scripts README up to date, release parity passed for 0.6.2, policy routing OK, Prettier passed. Scope: generated docs, release parity, policy routing, formatting.
    Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings. Scope: repo-local runtime and workflow contract.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
    - old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

    ### 2026-05-18T09:44:06.116Z — VERIFY — ok

    By: CODER

    Note: Follow-up verification after hosted test failure: aligned release and hosted install build routes to build @agentplane/testkit before agentplane; ran release CI contract test, test:fast, release:parity, policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:35:00.867Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
    - old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

    ### 2026-05-18T09:44:55.990Z — VERIFY — ok

    By: CODER

    Note: Committed CI build-order fix; release CI contract, test:fast, release:parity, and policy routing passed locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:44:06.123Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
    - old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

    ### 2026-05-18T09:47:20.906Z — VERIFY — ok

    By: CODER

    Note: Canonical command guidance fix committed; workflows:lint and targeted eslint passed; agentplane package rebuilt for hook freshness.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:44:55.996Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
    - old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

    ### 2026-05-18T09:48:48.101Z — VERIFY — ok

    By: CODER

    Note: CLI reference refreshed after canonical verify command example update; docs:cli:check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:47:20.915Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
    - old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

    ### 2026-05-18T10:00:03.881Z — VERIFY — ok

    By: CODER

    Note: Corrected release build dependency order after hosted TS6305 failure; release:check, release CI contract test, workflows:lint, scripts README check, and targeted eslint passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:48:48.110Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
    - old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

    ### 2026-05-18T10:14:41.854Z — VERIFY — ok

    By: CODER

    Note: Addressed PR review comments: deps-triage --write now exits nonzero on failed subcommands; version-bump accepts SemVer prerelease plus build metadata. Verified node --check, targeted eslint, dry-run semver input, dry-run deps triage, and fake failing bun exit path.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T10:00:03.892Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
    - old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add release and dev workflow helper scripts

Add repo-local helper scripts and skill guidance for release state, version bumping, candidate prep, publication evidence collection, dev impact checks, task scope checks, and dependency triage.

## Scope

- In scope: Add repo-local helper scripts and skill guidance for release state, version bumping, candidate prep, publication evidence collection, dev impact checks, task scope checks, and dependency triage.
- Out of scope: unrelated refactors not required for "Add release and dev workflow helper scripts".

## Plan

Implement repo-local helper scripts and skill access for release/developer workflow acceleration. Scope: add reusable release helpers (version bump, state, candidate preparation, publication evidence collection, next-action recovery), developer helpers (impact selection, task scope guard, dependency triage), package.json entrypoints, skill docs, and generated scripts inventory. Verification: targeted lint for new scripts, release parity/state checks, docs scripts freshness, policy routing, and task verify-show.

## Verify Steps

1. `node --check` all new release/dev helper scripts. Expected: syntax checks pass.
2. `bunx eslint` on new scripts plus `scripts/lib/local-ci-selection.mjs`. Expected: no lint errors.
3. Dry-run helper entrypoints: `release:version:bump`, `release:state`, `release:next-action`, `release:candidate:prepare`, `dev:impact`, `dev:task-scope:check`, and `deps:triage`. Expected: commands produce structured output without mutating release state.
4. `bun run docs:scripts:check`, `bun run release:parity`, `node .agentplane/policy/check-routing.mjs`, and `bun run format:changed`. Expected: all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T09:35:00.859Z — VERIFY — ok

By: CODER

Note: Implemented release/dev helper scripts and skill entrypoints; targeted verification passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:33:27.034Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

Details:

Command: node --check scripts/release/*.mjs scripts/checks/{dev-impact,check-task-scope,deps-triage}.mjs. Result: pass. Evidence: syntax checks exited 0. Scope: new helper scripts.
Command: bunx eslint new scripts plus scripts/lib/local-ci-selection.mjs. Result: pass. Evidence: exited 0. Scope: changed JS scripts.
Command: dry-run entrypoints for release:version:bump, release:state, release:next-action, release:candidate:prepare, dev:impact, dev:task-scope:check, deps:triage. Result: pass. Evidence: structured output produced without release mutation. Scope: script behavior.
Command: bun run docs:scripts:check && bun run release:parity && node .agentplane/policy/check-routing.mjs && bun run format:changed. Result: pass. Evidence: scripts README up to date, release parity passed for 0.6.2, policy routing OK, Prettier passed. Scope: generated docs, release parity, policy routing, formatting.
Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings. Scope: repo-local runtime and workflow contract.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
- old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

### 2026-05-18T09:44:06.116Z — VERIFY — ok

By: CODER

Note: Follow-up verification after hosted test failure: aligned release and hosted install build routes to build @agentplane/testkit before agentplane; ran release CI contract test, test:fast, release:parity, policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:35:00.867Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
- old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

### 2026-05-18T09:44:55.990Z — VERIFY — ok

By: CODER

Note: Committed CI build-order fix; release CI contract, test:fast, release:parity, and policy routing passed locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:44:06.123Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
- old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

### 2026-05-18T09:47:20.906Z — VERIFY — ok

By: CODER

Note: Canonical command guidance fix committed; workflows:lint and targeted eslint passed; agentplane package rebuilt for hook freshness.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:44:55.996Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
- old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

### 2026-05-18T09:48:48.101Z — VERIFY — ok

By: CODER

Note: CLI reference refreshed after canonical verify command example update; docs:cli:check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:47:20.915Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
- old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

### 2026-05-18T10:00:03.881Z — VERIFY — ok

By: CODER

Note: Corrected release build dependency order after hosted TS6305 failure; release:check, release CI contract test, workflows:lint, scripts README check, and targeted eslint passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T09:48:48.110Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
- old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

### 2026-05-18T10:14:41.854Z — VERIFY — ok

By: CODER

Note: Addressed PR review comments: deps-triage --write now exits nonzero on failed subcommands; version-bump accepts SemVer prerelease plus build metadata. Verified node --check, targeted eslint, dry-run semver input, dry-run deps triage, and fake failing bun exit path.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T10:00:03.892Z, excerpt_hash=sha256:9b5bd386770abdc9294dba4c42e546388f1ed2d87740960c933da4729aa0bf46

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605180925-JSBEYJ-release-dev-helper-scripts/.agentplane/tasks/202605180925-JSBEYJ/blueprint/resolved-snapshot.json
- old_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- current_digest: 0802ce102332cea554ef4cd0797435cfef9503f1692f11d10c05994e80f930d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605180925-JSBEYJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
