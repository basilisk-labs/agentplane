---
id: "202605031737-9A4FWX"
title: "Make DCO multi-author safe and optionalize tasks export snapshot"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T17:38:08.513Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T18:04:00.678Z"
  updated_by: "CODER"
  note: "Final verification after optional tasks export branch_pr guard adjustments and commit-stage fix."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement multi-author DCO validation and make the tasks export snapshot optional while preserving explicit export generation."
events:
  -
    type: "status"
    at: "2026-05-03T17:38:50.994Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement multi-author DCO validation and make the tasks export snapshot optional while preserving explicit export generation."
  -
    type: "verify"
    at: "2026-05-03T17:54:32.058Z"
    author: "CODER"
    state: "ok"
    note: "Implemented multi-author DCO validation and optional tasks export snapshot handling. Verification: env/export unit tests passed (2 files, 9 tests); selected commit-msg DCO hook test passed; CLI help/docs/export tests passed (3 files, 17 tests); typecheck passed; docs:cli:check passed; format:check passed; policy routing passed; doctor ended OK after auto-bootstrap with one unrelated existing archive warning for 202605031624-H1PV7F."
  -
    type: "verify"
    at: "2026-05-03T18:04:00.678Z"
    author: "CODER"
    state: "ok"
    note: "Final verification after optional tasks export branch_pr guard adjustments and commit-stage fix."
doc_version: 3
doc_updated_at: "2026-05-03T18:04:00.719Z"
doc_updated_by: "CODER"
description: "Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state."
sections:
  Summary: |-
    Make DCO multi-author safe and optionalize tasks export snapshot
    
    Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.
  Scope: |-
    - In scope: Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.
    - Out of scope: unrelated refactors not required for "Make DCO multi-author safe and optionalize tasks export snapshot".
  Plan: |-
    1. Inspect current DCO hook/sign-off implementation and tasks export/snapshot call sites in the task worktree.
    2. Split behavior so AgentPlane-authored commits use the configured default sign-off identity, while manual DCO validation accepts valid multi-author Signed-off-by trailers instead of requiring the configured identity for every commit.
    3. Make .agentplane/tasks.json optional generated export state: remove it from tracked state, keep explicit task export generation, and remove guard assumptions that the snapshot is required for normal task mutation.
    4. Update docs, schemas/defaults/tests only where they encode the old required snapshot or single-identity DCO behavior.
    5. Run focused unit tests plus agentplane doctor and routing validation; record evidence before PR/update.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:54:32.058Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented multi-author DCO validation and optional tasks export snapshot handling. Verification: env/export unit tests passed (2 files, 9 tests); selected commit-msg DCO hook test passed; CLI help/docs/export tests passed (3 files, 17 tests); typecheck passed; docs:cli:check passed; format:check passed; policy routing passed; doctor ended OK after auto-bootstrap with one unrelated existing archive warning for 202605031624-H1PV7F.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:38:50.994Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-05-03T18:04:00.678Z — VERIFY — ok
    
    By: CODER
    
    Note: Final verification after optional tasks export branch_pr guard adjustments and commit-stage fix.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:54:32.075Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Full hook-run suite was not used as final evidence because an unrelated existing pre-push scenario still tries to git add .agentplane/config.json after the WORKFLOW-only migration.
      Impact: Manual commits in multi-author repositories are no longer forced to use the configured AgentPlane default sign-off identity; .agentplane/tasks.json is removed from tracked state while remaining gitignored and generatable via task export.
      Resolution: Focused checks pass; remaining doctor warning is outside this task scope.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Additional checks after guard/policy adjustment: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts passed (2 files, 25 tests); bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.refresh.test.ts passed (1 file, 5 tests); bun run typecheck passed; bun run format:check passed; agentplane commit succeeded and produced signed commits 4d4bf84a31e3 and fbb8df62a3d9.
      Impact: The branch can remove .agentplane/tasks.json from tracked state, and commit auto-staging no longer fails on an already-staged optional snapshot deletion.
      Resolution: Focused checks pass. Unrelated untracked DONE archive README files created/surfaced by doctor remain outside the index.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Make DCO multi-author safe and optionalize tasks export snapshot

Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.

## Scope

- In scope: Split AgentPlane default sign-off identity from repo-wide manual DCO validation and make .agentplane/tasks.json an optional generated export snapshot rather than tracked required state.
- Out of scope: unrelated refactors not required for "Make DCO multi-author safe and optionalize tasks export snapshot".

## Plan

1. Inspect current DCO hook/sign-off implementation and tasks export/snapshot call sites in the task worktree.
2. Split behavior so AgentPlane-authored commits use the configured default sign-off identity, while manual DCO validation accepts valid multi-author Signed-off-by trailers instead of requiring the configured identity for every commit.
3. Make .agentplane/tasks.json optional generated export state: remove it from tracked state, keep explicit task export generation, and remove guard assumptions that the snapshot is required for normal task mutation.
4. Update docs, schemas/defaults/tests only where they encode the old required snapshot or single-identity DCO behavior.
5. Run focused unit tests plus agentplane doctor and routing validation; record evidence before PR/update.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:54:32.058Z — VERIFY — ok

By: CODER

Note: Implemented multi-author DCO validation and optional tasks export snapshot handling. Verification: env/export unit tests passed (2 files, 9 tests); selected commit-msg DCO hook test passed; CLI help/docs/export tests passed (3 files, 17 tests); typecheck passed; docs:cli:check passed; format:check passed; policy routing passed; doctor ended OK after auto-bootstrap with one unrelated existing archive warning for 202605031624-H1PV7F.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:38:50.994Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-05-03T18:04:00.678Z — VERIFY — ok

By: CODER

Note: Final verification after optional tasks export branch_pr guard adjustments and commit-stage fix.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:54:32.075Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Full hook-run suite was not used as final evidence because an unrelated existing pre-push scenario still tries to git add .agentplane/config.json after the WORKFLOW-only migration.
  Impact: Manual commits in multi-author repositories are no longer forced to use the configured AgentPlane default sign-off identity; .agentplane/tasks.json is removed from tracked state while remaining gitignored and generatable via task export.
  Resolution: Focused checks pass; remaining doctor warning is outside this task scope.
  Promotion: incident-candidate
  Fixability: external

- Observation: Additional checks after guard/policy adjustment: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts passed (2 files, 25 tests); bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.refresh.test.ts passed (1 file, 5 tests); bun run typecheck passed; bun run format:check passed; agentplane commit succeeded and produced signed commits 4d4bf84a31e3 and fbb8df62a3d9.
  Impact: The branch can remove .agentplane/tasks.json from tracked state, and commit auto-staging no longer fails on an already-staged optional snapshot deletion.
  Resolution: Focused checks pass. Unrelated untracked DONE archive README files created/surfaced by doctor remain outside the index.
  Promotion: incident-candidate
  Fixability: external
