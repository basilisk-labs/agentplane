---
id: "202605171021-ARB2JV"
title: "Fix task README trailing whitespace generation"
result_summary: "Merged via PR #3820."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-doc.test.ts"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T10:22:08.916Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T10:30:19.552Z"
  updated_by: "CODER"
  note: "Verified: task README block scalar rendering no longer creates whitespace-only blank lines; verification entries trim per-line tails. Checks passed: focused core task README/doc tests, focused agentplane workflow transition/shared tests, Prettier on touched files, git diff --check, policy routing, and repo-local runtime bootstrap."
  attempts: 0
commit:
  hash: "dbefc341cced89eb6a8adb150c1939db88caef16"
  message: "Merge pull request #3820 from basilisk-labs/task/202605171021-ARB2JV/fix-task-readme-whitespace"
comments:
  -
    author: "CODER"
    body: "Start: implement task README whitespace normalization in the isolated task worktree, add focused regression coverage, and audit adjacent generated artifact renderers without touching unrelated base conflicts."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3820 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T10:23:34.609Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement task README whitespace normalization in the isolated task worktree, add focused regression coverage, and audit adjacent generated artifact renderers without touching unrelated base conflicts."
  -
    type: "verify"
    at: "2026-05-17T10:30:19.552Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task README block scalar rendering no longer creates whitespace-only blank lines; verification entries trim per-line tails. Checks passed: focused core task README/doc tests, focused agentplane workflow transition/shared tests, Prettier on touched files, git diff --check, policy routing, and repo-local runtime bootstrap."
  -
    type: "status"
    at: "2026-05-17T11:01:00.227Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3820 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T11:01:00.232Z"
doc_updated_by: "INTEGRATOR"
description: "Task README rendering can emit lines containing only indentation spaces in YAML block scalars and may preserve trailing spaces in verification entries. Fix canonical rendering so generated task artifacts pass git diff --check without manual whitespace cleanup, and audit adjacent renderer paths for the same class."
sections:
  Summary: |-
    Fix task README trailing whitespace generation

    Task README rendering can emit lines containing only indentation spaces in YAML block scalars and may preserve trailing spaces in verification entries. Fix canonical rendering so generated task artifacts pass git diff --check without manual whitespace cleanup, and audit adjacent renderer paths for the same class.
  Scope: |-
    - In scope: Task README rendering can emit lines containing only indentation spaces in YAML block scalars and may preserve trailing spaces in verification entries. Fix canonical rendering so generated task artifacts pass git diff --check without manual whitespace cleanup, and audit adjacent renderer paths for the same class.
    - Out of scope: unrelated refactors not required for "Fix task README trailing whitespace generation".
  Plan: |-
    1. Fix canonical task README rendering so generated YAML block scalar blank lines do not become whitespace-only lines.
    2. Normalize verification entry rendering so generated `## Verification` entries do not preserve trailing spaces from notes or details.
    3. Add focused regression coverage for block scalar blank lines and verification entry whitespace handling.
    4. Run focused task README/task doc tests, focused verification lifecycle tests where available, `git diff --check`, and policy/runtime sanity checks that are not blocked by unrelated checkout conflicts.
    5. Audit adjacent generated artifact renderers for the same whitespace-only-line class and record remaining risks in Findings.
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-doc.test.ts`. Expected: task README/task doc rendering tests pass, including regression coverage for whitespace-only generated lines.
    2. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts`. Expected: verification entry rendering and adjacent task shared helper tests pass.
    3. Run `git diff --check`. Expected: no whitespace errors in the task worktree diff.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing still passes.
    5. Audit generated Markdown/YAML renderers for the same blank-line indentation/trailing-space class and record any remaining risks in `## Findings`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T10:30:19.552Z — VERIFY — ok

    By: CODER

    Note: Verified: task README block scalar rendering no longer creates whitespace-only blank lines; verification entries trim per-line tails. Checks passed: focused core task README/doc tests, focused agentplane workflow transition/shared tests, Prettier on touched files, git diff --check, policy routing, and repo-local runtime bootstrap.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:29:59.052Z, excerpt_hash=sha256:9e5fee9c57fa680aa5a663781e9cad51d0f6121431440fa3b21e759e0620946b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171021-ARB2JV-fix-task-readme-whitespace/.agentplane/tasks/202605171021-ARB2JV/blueprint/resolved-snapshot.json
    - old_digest: 62fe3851dc3faf18a622ef94c1cdc3400c6251acf272eab3df49982294bea0f5
    - current_digest: 62fe3851dc3faf18a622ef94c1cdc3400c6251acf272eab3df49982294bea0f5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171021-ARB2JV

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause fixed here: `renderBlockScalar()` emitted indentation for blank YAML block scalar lines, creating whitespace-only lines in generated task READMEs. It now trims line endings and renders blank block-scalar lines as empty lines.
    - Adjacent fixed path: verification entries now normalize per-line trailing whitespace for generated `## Verification` entries, including multiline details.
    - Audit result: `git diff --check` does not cover untracked task artifacts until they are staged; task README rendering was re-run through the repo-local CLI after `framework:dev:bootstrap` to validate the fixed renderer on the task artifact itself.
    - Related risk class: Markdown renderers that join arrays of generated lines while interpolating user-provided fields can preserve trailing whitespace. Higher-risk adjacent surfaces are runner outcome history (`packages/agentplane/src/runner/task-state-render.ts`) and PR review/handoff body rendering (`packages/agentplane/src/commands/pr/internal/review-template.ts`). They do not share the YAML blank-line indentation bug fixed here, so they are follow-up audit candidates rather than part of this narrow fix.
    - Lower-risk adjacent surface: `packages/agentplane/src/commands/recipes/impl/format.ts` indents JSON.stringify output; JSON pretty output does not produce blank lines, so it matches the syntactic pattern but not the same failure mode.
id_source: "generated"
---
## Summary

Fix task README trailing whitespace generation

Task README rendering can emit lines containing only indentation spaces in YAML block scalars and may preserve trailing spaces in verification entries. Fix canonical rendering so generated task artifacts pass git diff --check without manual whitespace cleanup, and audit adjacent renderer paths for the same class.

## Scope

- In scope: Task README rendering can emit lines containing only indentation spaces in YAML block scalars and may preserve trailing spaces in verification entries. Fix canonical rendering so generated task artifacts pass git diff --check without manual whitespace cleanup, and audit adjacent renderer paths for the same class.
- Out of scope: unrelated refactors not required for "Fix task README trailing whitespace generation".

## Plan

1. Fix canonical task README rendering so generated YAML block scalar blank lines do not become whitespace-only lines.
2. Normalize verification entry rendering so generated `## Verification` entries do not preserve trailing spaces from notes or details.
3. Add focused regression coverage for block scalar blank lines and verification entry whitespace handling.
4. Run focused task README/task doc tests, focused verification lifecycle tests where available, `git diff --check`, and policy/runtime sanity checks that are not blocked by unrelated checkout conflicts.
5. Audit adjacent generated artifact renderers for the same whitespace-only-line class and record remaining risks in Findings.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-doc.test.ts`. Expected: task README/task doc rendering tests pass, including regression coverage for whitespace-only generated lines.
2. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts`. Expected: verification entry rendering and adjacent task shared helper tests pass.
3. Run `git diff --check`. Expected: no whitespace errors in the task worktree diff.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing still passes.
5. Audit generated Markdown/YAML renderers for the same blank-line indentation/trailing-space class and record any remaining risks in `## Findings`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T10:30:19.552Z — VERIFY — ok

By: CODER

Note: Verified: task README block scalar rendering no longer creates whitespace-only blank lines; verification entries trim per-line tails. Checks passed: focused core task README/doc tests, focused agentplane workflow transition/shared tests, Prettier on touched files, git diff --check, policy routing, and repo-local runtime bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:29:59.052Z, excerpt_hash=sha256:9e5fee9c57fa680aa5a663781e9cad51d0f6121431440fa3b21e759e0620946b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171021-ARB2JV-fix-task-readme-whitespace/.agentplane/tasks/202605171021-ARB2JV/blueprint/resolved-snapshot.json
- old_digest: 62fe3851dc3faf18a622ef94c1cdc3400c6251acf272eab3df49982294bea0f5
- current_digest: 62fe3851dc3faf18a622ef94c1cdc3400c6251acf272eab3df49982294bea0f5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171021-ARB2JV

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause fixed here: `renderBlockScalar()` emitted indentation for blank YAML block scalar lines, creating whitespace-only lines in generated task READMEs. It now trims line endings and renders blank block-scalar lines as empty lines.
- Adjacent fixed path: verification entries now normalize per-line trailing whitespace for generated `## Verification` entries, including multiline details.
- Audit result: `git diff --check` does not cover untracked task artifacts until they are staged; task README rendering was re-run through the repo-local CLI after `framework:dev:bootstrap` to validate the fixed renderer on the task artifact itself.
- Related risk class: Markdown renderers that join arrays of generated lines while interpolating user-provided fields can preserve trailing whitespace. Higher-risk adjacent surfaces are runner outcome history (`packages/agentplane/src/runner/task-state-render.ts`) and PR review/handoff body rendering (`packages/agentplane/src/commands/pr/internal/review-template.ts`). They do not share the YAML blank-line indentation bug fixed here, so they are follow-up audit candidates rather than part of this narrow fix.
- Lower-risk adjacent surface: `packages/agentplane/src/commands/recipes/impl/format.ts` indents JSON.stringify output; JSON pretty output does not produce blank lines, so it matches the syntactic pattern but not the same failure mode.
