---
id: "202605060915-D6SFRB"
title: "Record blueprint evidence references in verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060915-N929BE"
tags:
  - "blueprints"
  - "code"
  - "evidence"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T09:42:49.496Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T09:43:00.967Z"
  updated_by: "CODER"
  note: "Recorded blueprint snapshot references in verification entries. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; lifecycle start for this task wrote a current blueprint snapshot."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Record blueprint snapshot references in verification records using the evidence surface from N929BE in this stacked epic branch."
events:
  -
    type: "status"
    at: "2026-05-06T09:42:49.915Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Record blueprint snapshot references in verification records using the evidence surface from N929BE in this stacked epic branch."
  -
    type: "verify"
    at: "2026-05-06T09:43:00.967Z"
    author: "CODER"
    state: "ok"
    note: "Recorded blueprint snapshot references in verification entries. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; lifecycle start for this task wrote a current blueprint snapshot."
doc_version: 3
doc_updated_at: "2026-05-06T09:43:00.971Z"
doc_updated_by: "CODER"
description: "Allow verification records to attach blueprint evidence references such as sources, assumptions, changed paths, check results, artifacts, approvals, external links, and weak links."
sections:
  Summary: |-
    Record blueprint evidence references in verification
    
    Allow verification records to attach blueprint evidence references such as sources, assumptions, changed paths, check results, artifacts, approvals, external links, and weak links.
  Scope: |-
    - In scope: Allow verification records to attach blueprint evidence references such as sources, assumptions, changed paths, check results, artifacts, approvals, external links, and weak links.
    - Out of scope: unrelated refactors not required for "Record blueprint evidence references in verification".
  Plan: |-
    Record blueprint snapshot references in verification records.
    
    Steps:
    1. Read current persisted snapshot drift state while recording verification.
    2. Append a compact BlueprintSnapshotRef block to verification details without replacing user-provided details.
    3. Do not block verification if snapshot inspection is unavailable; record unavailable state and safe refresh command instead.
    4. Add focused unit coverage for the verification record output.
    
    Verification:
    - Focused verify-record and snapshot tests pass.
    - Typecheck, touched-file format/lint, diff whitespace, and framework bootstrap pass.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T09:43:00.967Z — VERIFY — ok
    
    By: CODER
    
    Note: Recorded blueprint snapshot references in verification entries. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; lifecycle start for this task wrote a current blueprint snapshot.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:42:49.915Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N929BE-blueprint-evidence/.agentplane/tasks/202605060915-D6SFRB/blueprint/resolved-snapshot.json
    - old_digest: dac2cacdfc6d21e62c7b8d13179e91b76559caf3dac538a02763eccbcc79f8aa
    - current_digest: dac2cacdfc6d21e62c7b8d13179e91b76559caf3dac538a02763eccbcc79f8aa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-D6SFRB
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: verify now appends BlueprintSnapshotRef to verification details with state, path, old/current digest, route_changed, and safe refresh command; unavailable snapshot diagnostics are recorded instead of blocking verification.
      Impact: Verification records carry an auditable reference to the blueprint route used at verification time.
      Resolution: Extended verify-record execution details with snapshot reference collection and unit coverage.
id_source: "generated"
---
