---
id: "202605060915-N929BE"
title: "Merge blueprint evidence into verify-show"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060915-0EDRBK"
tags:
  - "blueprints"
  - "code"
  - "tasks"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T09:38:46.353Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T09:40:10.541Z"
  updated_by: "CODER"
  note: "Merged persisted blueprint snapshot evidence into verify-show. Verification passed: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js task verify-show 202605060915-N929BE."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Merge persisted blueprint snapshot evidence into verify-show on top of the lifecycle snapshot contract from the stacked epic branch."
events:
  -
    type: "status"
    at: "2026-05-06T09:38:46.938Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Merge persisted blueprint snapshot evidence into verify-show on top of the lifecycle snapshot contract from the stacked epic branch."
  -
    type: "verify"
    at: "2026-05-06T09:40:10.541Z"
    author: "CODER"
    state: "ok"
    note: "Merged persisted blueprint snapshot evidence into verify-show. Verification passed: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js task verify-show 202605060915-N929BE."
doc_version: 3
doc_updated_at: "2026-05-06T09:40:10.546Z"
doc_updated_by: "CODER"
description: "Extend task verify-show so it combines README Verify Steps with resolved blueprint required evidence while keeping non-code routes lightweight."
sections:
  Summary: |-
    Merge blueprint evidence into verify-show
    
    Extend task verify-show so it combines README Verify Steps with resolved blueprint required evidence while keeping non-code routes lightweight.
  Scope: |-
    - In scope: Extend task verify-show so it combines README Verify Steps with resolved blueprint required evidence while keeping non-code routes lightweight.
    - Out of scope: unrelated refactors not required for "Merge blueprint evidence into verify-show".
  Plan: |-
    Merge persisted blueprint snapshot evidence into task verify-show.
    
    Steps:
    1. Read the persisted resolved blueprint snapshot and current drift state without refreshing it.
    2. Extend verify-show output with snapshot state, digest, safe refresh command, and required evidence IDs.
    3. Keep existing Verify Steps output and current expected evidence output intact.
    4. Add focused CLI coverage for verify-show with a persisted snapshot.
    
    Verification:
    - Focused verify-show/blueprint tests pass.
    - Typecheck, touched-file format/lint, diff whitespace, and framework bootstrap pass.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T09:40:10.541Z — VERIFY — ok
    
    By: CODER
    
    Note: Merged persisted blueprint snapshot evidence into verify-show. Verification passed: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js task verify-show 202605060915-N929BE.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:38:46.938Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: verify-show now prints Blueprint snapshot evidence including snapshot_state, persisted digest, current digest, route change status, required evidence ids, and safe refresh command.
      Impact: Verifiers can see whether expected evidence is grounded in the persisted blueprint snapshot or a stale/missing route.
      Resolution: Extended verify-show with read-only snapshot drift inspection and added CLI coverage.
id_source: "generated"
---
