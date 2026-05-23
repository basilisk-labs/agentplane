---
id: "202605230831-WXWH7T"
title: "Harden publish evidence workflow token permissions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T08:37:36.954Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T08:52:42.427Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: PR #4084 hosted checks are green, including actionlint, PR verification, release-ready manifest, docs, CodeQL, and verify-routed. Local contract test passed: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts (9 pass)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T08:52:42.427Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: PR #4084 hosted checks are green, including actionlint, PR verification, release-ready manifest, docs, CodeQL, and verify-routed. Local contract test passed: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts (9 pass)."
  evaluated_sha: "31dc1f340db45321c09d466d5a89164ef496f934"
  blueprint_digest: "9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895"
  evidence_refs:
    - ".agentplane/tasks/202605230831-WXWH7T/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-WXWH7T-publish-evidence-token-hardening/.agentplane/tasks/202605230831-WXWH7T/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: harden publish workflow token permissions and post-publish release evidence handling so successful publication is not reported as failed by follow-up automation."
events:
  -
    type: "status"
    at: "2026-05-23T08:37:51.526Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden publish workflow token permissions and post-publish release evidence handling so successful publication is not reported as failed by follow-up automation."
  -
    type: "verify"
    at: "2026-05-23T08:39:00.085Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 197 expect calls. Scope: publish workflow permissions and release evidence follow-up contract."
  -
    type: "verify"
    at: "2026-05-23T08:52:42.427Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed. Evidence: PR #4084 hosted checks are green, including actionlint, PR verification, release-ready manifest, docs, CodeQL, and verify-routed. Local contract test passed: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts (9 pass)."
doc_version: 3
doc_updated_at: "2026-05-23T08:52:42.442Z"
doc_updated_by: "CODER"
description: "Allow publish workflow to dispatch evidence CI and keep post-publish evidence automation from making a completed publish look failed."
sections:
  Summary: |-
    Harden publish evidence workflow token permissions

    Allow publish workflow to dispatch evidence CI and keep post-publish evidence automation from making a completed publish look failed.
  Scope: |-
    - In scope: Allow publish workflow to dispatch evidence CI and keep post-publish evidence automation from making a completed publish look failed.
    - Out of scope: unrelated refactors not required for "Harden publish evidence workflow token permissions".
  Plan: "Plan: update publish workflow permissions so GITHUB_TOKEN can dispatch Core CI for release evidence branches; make release evidence follow-up failures warnings after publish-result succeeds instead of turning a completed publish red; add/adjust workflow contract tests; document operator token requirements in final user instructions."
  Verify Steps: "1. Run bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts. Expected: publish workflow contract covers actions: write and best-effort release evidence follow-up handling."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T08:39:00.085Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 197 expect calls. Scope: publish workflow permissions and release evidence follow-up contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:38:58.412Z, excerpt_hash=sha256:dd7f5dcde3932dfae9cc37c7d232cbc48d8bf0cd7b99c71379e5af3784258f0f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-WXWH7T-publish-evidence-token-hardening/.agentplane/tasks/202605230831-WXWH7T/blueprint/resolved-snapshot.json
    - old_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
    - current_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230831-WXWH7T

    ### 2026-05-23T08:52:42.427Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed. Evidence: PR #4084 hosted checks are green, including actionlint, PR verification, release-ready manifest, docs, CodeQL, and verify-routed. Local contract test passed: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts (9 pass).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:39:00.101Z, excerpt_hash=sha256:dd7f5dcde3932dfae9cc37c7d232cbc48d8bf0cd7b99c71379e5af3784258f0f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-WXWH7T-publish-evidence-token-hardening/.agentplane/tasks/202605230831-WXWH7T/blueprint/resolved-snapshot.json
    - old_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
    - current_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230831-WXWH7T

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden publish evidence workflow token permissions

Allow publish workflow to dispatch evidence CI and keep post-publish evidence automation from making a completed publish look failed.

## Scope

- In scope: Allow publish workflow to dispatch evidence CI and keep post-publish evidence automation from making a completed publish look failed.
- Out of scope: unrelated refactors not required for "Harden publish evidence workflow token permissions".

## Plan

Plan: update publish workflow permissions so GITHUB_TOKEN can dispatch Core CI for release evidence branches; make release evidence follow-up failures warnings after publish-result succeeds instead of turning a completed publish red; add/adjust workflow contract tests; document operator token requirements in final user instructions.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts. Expected: publish workflow contract covers actions: write and best-effort release evidence follow-up handling.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T08:39:00.085Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 197 expect calls. Scope: publish workflow permissions and release evidence follow-up contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:38:58.412Z, excerpt_hash=sha256:dd7f5dcde3932dfae9cc37c7d232cbc48d8bf0cd7b99c71379e5af3784258f0f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-WXWH7T-publish-evidence-token-hardening/.agentplane/tasks/202605230831-WXWH7T/blueprint/resolved-snapshot.json
- old_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
- current_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230831-WXWH7T

### 2026-05-23T08:52:42.427Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed. Evidence: PR #4084 hosted checks are green, including actionlint, PR verification, release-ready manifest, docs, CodeQL, and verify-routed. Local contract test passed: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts (9 pass).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:39:00.101Z, excerpt_hash=sha256:dd7f5dcde3932dfae9cc37c7d232cbc48d8bf0cd7b99c71379e5af3784258f0f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-WXWH7T-publish-evidence-token-hardening/.agentplane/tasks/202605230831-WXWH7T/blueprint/resolved-snapshot.json
- old_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
- current_digest: 9cfd395ebb6fd0a7a3793771cc010c29e31f31c6d2704430e482a24a9a839895
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230831-WXWH7T

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
