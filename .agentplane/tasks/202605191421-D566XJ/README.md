---
id: "202605191421-D566XJ"
title: "Add deterministic evidence bundle commands"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "acr"
  - "code"
  - "trust"
verify:
  - "bun test packages/agentplane/src/commands/evidence/evidence.command.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts"
  - "bun run --filter=agentplane typecheck"
  - "bun run docs:cli:check"
  - "bun run docs:ia:check"
  - "agentplane evidence bundle 202605191421-D566XJ"
  - "agentplane evidence verify 202605191421-D566XJ"
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T14:22:15.293Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T15:54:39.502Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for current implementation commit 08db6b47. Reviewed fixes for configured workflow_dir evidence paths and deterministic bundle reruns; local checks passed: focused evidence/ACR tests, typecheck, format:check, targeted eslint, framework bootstrap; hosted PR checks are green on PR #3937."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T15:54:39.502Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for current implementation commit 08db6b47. Reviewed fixes for configured workflow_dir evidence paths and deterministic bundle reruns; local checks passed: focused evidence/ACR tests, typecheck, format:check, targeted eslint, framework bootstrap; hosted PR checks are green on PR #3937."
  evaluated_sha: "b4de91888f2a4db53aa0e00cd20972170882085d"
  blueprint_digest: "343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4"
  evidence_refs:
    - ".agentplane/tasks/202605191421-D566XJ/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement deterministic evidence bundle and verification commands inside the task worktree, preserving the approved scope and excluding signing or preservation integrations."
events:
  -
    type: "status"
    at: "2026-05-19T14:23:12.271Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement deterministic evidence bundle and verification commands inside the task worktree, preserving the approved scope and excluding signing or preservation integrations."
  -
    type: "verify"
    at: "2026-05-19T14:49:32.970Z"
    author: "CODER"
    state: "ok"
    note: "Implemented deterministic evidence bundle and verify commands with ACR trust pointer and docs. Checks passed: focused evidence/ACR tests, agentplane typecheck, lint:core, docs:cli:check, docs:ia:check, evidence bundle, evidence verify --strict."
  -
    type: "verify"
    at: "2026-05-19T14:54:23.894Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for deterministic evidence bundle implementation. Reviewed route evidence, focused tests, typecheck, lint, docs checks, ACR validation, strict evidence verification, and GitHub PR linkage. Hosted checks are still tracked separately on PR #3937."
  -
    type: "verify"
    at: "2026-05-19T15:29:40.496Z"
    author: "CODER"
    state: "ok"
    note: "Fixed hosted Linux format gate by applying Prettier to evidence command files. Local checks passed: format:check, focused evidence/ACR tests, agentplane typecheck, targeted eslint, docs:cli:check, docs:ia:check."
  -
    type: "verify"
    at: "2026-05-19T15:45:54.344Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review threads: evidence bundle now respects configured workflow_dir and preserves existing created_at to keep unchanged bundle reruns deterministic. Local checks passed: focused evidence/ACR tests, agentplane typecheck, targeted eslint, format:check, framework:dev:bootstrap."
  -
    type: "verify"
    at: "2026-05-19T15:54:39.502Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for current implementation commit 08db6b47. Reviewed fixes for configured workflow_dir evidence paths and deterministic bundle reruns; local checks passed: focused evidence/ACR tests, typecheck, format:check, targeted eslint, framework bootstrap; hosted PR checks are green on PR #3937."
doc_version: 3
doc_updated_at: "2026-05-19T15:54:39.561Z"
doc_updated_by: "CODER"
description: "Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows."
sections:
  Summary: |-
    Add deterministic evidence bundle commands

    Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.
  Scope: |-
    - In scope: Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.
    - Out of scope: unrelated refactors not required for "Add deterministic evidence bundle commands".
  Plan: "Implement the deterministic evidence bundle MVP in the AgentPlane framework repo. Scope: add an evidence CLI group with bundle and verify subcommands; create stable manifest/digest generation for task README, task ACR, blueprint snapshot when present, and selected task-local evidence; add ACR trust extension metadata when a task-local bundle manifest exists; add focused unit tests and command specs; update user/reference docs for the new commands. Non-goals: Sigstore signing, S3 Object Lock preservation, OpenSSF workflow changes, capability proposal flow."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T14:49:32.970Z — VERIFY — ok

    By: CODER

    Note: Implemented deterministic evidence bundle and verify commands with ACR trust pointer and docs. Checks passed: focused evidence/ACR tests, agentplane typecheck, lint:core, docs:cli:check, docs:ia:check, evidence bundle, evidence verify --strict.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:23:12.271Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Command: bun test packages/agentplane/src/commands/evidence/evidence.command.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts -> pass, 13 tests. Command: bun run --filter=agentplane typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run docs:cli:check and bun run docs:ia:check -> pass. Command: agentplane evidence bundle 202605191421-D566XJ and agentplane evidence verify 202605191421-D566XJ --strict -> pass, manifest includes 8 files.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
    - old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191421-D566XJ

    ### 2026-05-19T14:54:23.894Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for deterministic evidence bundle implementation. Reviewed route evidence, focused tests, typecheck, lint, docs checks, ACR validation, strict evidence verification, and GitHub PR linkage. Hosted checks are still tracked separately on PR #3937.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:49:33.056Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
    - old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191421-D566XJ

    ### 2026-05-19T15:29:40.496Z — VERIFY — ok

    By: CODER

    Note: Fixed hosted Linux format gate by applying Prettier to evidence command files. Local checks passed: format:check, focused evidence/ACR tests, agentplane typecheck, targeted eslint, docs:cli:check, docs:ia:check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:54:23.947Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
    - old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191421-D566XJ

    ### 2026-05-19T15:45:54.344Z — VERIFY — ok

    By: CODER

    Note: Addressed PR review threads: evidence bundle now respects configured workflow_dir and preserves existing created_at to keep unchanged bundle reruns deterministic. Local checks passed: focused evidence/ACR tests, agentplane typecheck, targeted eslint, format:check, framework:dev:bootstrap.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:29:40.578Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
    - old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191421-D566XJ

    ### 2026-05-19T15:54:39.502Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for current implementation commit 08db6b47. Reviewed fixes for configured workflow_dir evidence paths and deterministic bundle reruns; local checks passed: focused evidence/ACR tests, typecheck, format:check, targeted eslint, framework bootstrap; hosted PR checks are green on PR #3937.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:45:54.484Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
    - old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191421-D566XJ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add deterministic evidence bundle commands

Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.

## Scope

- In scope: Implement a deterministic evidence bundle and verification CLI surface, with ACR trust extension metadata for generated bundles. Scope excludes Sigstore signing, S3 Object Lock preservation, and capability proposal flows.
- Out of scope: unrelated refactors not required for "Add deterministic evidence bundle commands".

## Plan

Implement the deterministic evidence bundle MVP in the AgentPlane framework repo. Scope: add an evidence CLI group with bundle and verify subcommands; create stable manifest/digest generation for task README, task ACR, blueprint snapshot when present, and selected task-local evidence; add ACR trust extension metadata when a task-local bundle manifest exists; add focused unit tests and command specs; update user/reference docs for the new commands. Non-goals: Sigstore signing, S3 Object Lock preservation, OpenSSF workflow changes, capability proposal flow.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T14:49:32.970Z — VERIFY — ok

By: CODER

Note: Implemented deterministic evidence bundle and verify commands with ACR trust pointer and docs. Checks passed: focused evidence/ACR tests, agentplane typecheck, lint:core, docs:cli:check, docs:ia:check, evidence bundle, evidence verify --strict.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:23:12.271Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Command: bun test packages/agentplane/src/commands/evidence/evidence.command.test.ts packages/agentplane/src/commands/acr/acr.command.test.ts -> pass, 13 tests. Command: bun run --filter=agentplane typecheck -> pass. Command: bun run lint:core -> pass. Command: bun run docs:cli:check and bun run docs:ia:check -> pass. Command: agentplane evidence bundle 202605191421-D566XJ and agentplane evidence verify 202605191421-D566XJ --strict -> pass, manifest includes 8 files.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
- old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191421-D566XJ

### 2026-05-19T14:54:23.894Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for deterministic evidence bundle implementation. Reviewed route evidence, focused tests, typecheck, lint, docs checks, ACR validation, strict evidence verification, and GitHub PR linkage. Hosted checks are still tracked separately on PR #3937.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:49:33.056Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
- old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191421-D566XJ

### 2026-05-19T15:29:40.496Z — VERIFY — ok

By: CODER

Note: Fixed hosted Linux format gate by applying Prettier to evidence command files. Local checks passed: format:check, focused evidence/ACR tests, agentplane typecheck, targeted eslint, docs:cli:check, docs:ia:check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:54:23.947Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
- old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191421-D566XJ

### 2026-05-19T15:45:54.344Z — VERIFY — ok

By: CODER

Note: Addressed PR review threads: evidence bundle now respects configured workflow_dir and preserves existing created_at to keep unchanged bundle reruns deterministic. Local checks passed: focused evidence/ACR tests, agentplane typecheck, targeted eslint, format:check, framework:dev:bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:29:40.578Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
- old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191421-D566XJ

### 2026-05-19T15:54:39.502Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for current implementation commit 08db6b47. Reviewed fixes for configured workflow_dir evidence paths and deterministic bundle reruns; local checks passed: focused evidence/ACR tests, typecheck, format:check, targeted eslint, framework bootstrap; hosted PR checks are green on PR #3937.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:45:54.484Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191421-D566XJ-evidence-bundle/.agentplane/tasks/202605191421-D566XJ/blueprint/resolved-snapshot.json
- old_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- current_digest: 343e2d15f7e61a5cf9827383ac870b6ead273d6b8ef487f4a2fa3a4c6607b6f4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191421-D566XJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
