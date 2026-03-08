---
id: "202603081453-6GW8AD"
title: "Guard workflows against inline test runner drift"
result_summary: "Workflow files can no longer silently reintroduce inline bun test or vitest suites without tripping a dedicated command-contract check in both local enforcement and GitHub CI."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T15:08:05.602Z"
  updated_by: "ORCHESTRATOR"
  note: "Canonical scripts now exist, so workflow runner drift can be enforced locally and in CI."
verification:
  state: "ok"
  updated_at: "2026-03-08T15:13:07.713Z"
  updated_by: "CODER"
  note: |-
    Checks passed:
    - bun run workflows:command-check
    - AGENTPLANE_FAST_CHANGED_FILES=.github/workflows/ci.yml node scripts/run-local-ci.mjs --mode fast
    - bun run workflows:lint
    - bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
    - bun run lint:core -- package.json scripts/check-workflow-command-contract.mjs scripts/run-local-ci.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
commit:
  hash: "d07e6b8882ecb76aa72a2aed10b577a47387b852"
  message: "🛡️ 6GW8AD ci: guard workflows against inline test runners"
comments:
  -
    author: "CODER"
    body: "Start: add a workflow command-contract check, then enforce it in the local workflow bucket and the workflows-lint CI path."
  -
    author: "CODER"
    body: "Verified: workflow YAML is now guarded against inline test runner drift locally and in CI, while workflow-related pre-push changes route through a dedicated workflow bucket."
events:
  -
    type: "status"
    at: "2026-03-08T15:08:14.908Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a workflow command-contract check, then enforce it in the local workflow bucket and the workflows-lint CI path."
  -
    type: "verify"
    at: "2026-03-08T15:13:07.713Z"
    author: "CODER"
    state: "ok"
    note: |-
      Checks passed:
      - bun run workflows:command-check
      - AGENTPLANE_FAST_CHANGED_FILES=.github/workflows/ci.yml node scripts/run-local-ci.mjs --mode fast
      - bun run workflows:lint
      - bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
      - bun run lint:core -- package.json scripts/check-workflow-command-contract.mjs scripts/run-local-ci.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts
  -
    type: "status"
    at: "2026-03-08T15:13:13.129Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workflow YAML is now guarded against inline test runner drift locally and in CI, while workflow-related pre-push changes route through a dedicated workflow bucket."
doc_version: 3
doc_updated_at: "2026-03-08T15:13:13.129Z"
doc_updated_by: "CODER"
description: "Add a repository check that rejects new inline bunx vitest or bun test suites in GitHub workflow YAML when a shared canonical script should be used instead, then wire it into CI and local hooks."
id_source: "generated"
---
## Summary

Guard workflows against inline test runner drift

Add a repository check that rejects new inline bunx vitest or bun test suites in GitHub workflow YAML when a shared canonical script should be used instead, then wire it into CI and local hooks.

## Scope

- In scope: Add a repository check that rejects new inline bunx vitest or bun test suites in GitHub workflow YAML when a shared canonical script should be used instead, then wire it into CI and local hooks.
- Out of scope: unrelated refactors not required for "Guard workflows against inline test runner drift".

## Plan

1. Add a workflow command-contract check that rejects inline `bun test`, `bunx vitest run`, and bare `vitest run` test suites in GitHub workflow YAML once canonical scripts exist.
2. Wire that check into local enforcement by adding a workflow-specific fast CI bucket that runs workflow lint and the new contract check when workflow files change.
3. Wire the same check into GitHub CI so workflow drift is rejected remotely, then verify with targeted local runs and workflow lint.

## Verify Steps

1. Run the workflow-command contract check directly. Expected: current workflow files pass when they use canonical shared scripts.
2. Introduce a controlled inline test-runner violation in a temp copy or fixture if needed. Expected: the check rejects it with a deterministic message.
3. Run the local CI gate that owns the new check. Expected: the check is enforced automatically in the normal hook/CI path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T15:13:07.713Z — VERIFY — ok

By: CODER

Note: Checks passed:
- bun run workflows:command-check
- AGENTPLANE_FAST_CHANGED_FILES=.github/workflows/ci.yml node scripts/run-local-ci.mjs --mode fast
- bun run workflows:lint
- bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
- bun run lint:core -- package.json scripts/check-workflow-command-contract.mjs scripts/run-local-ci.mjs scripts/lib/local-ci-selection.mjs scripts/lib/local-ci-selection.d.ts packages/agentplane/src/cli/local-ci-selection.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T15:08:14.908Z, excerpt_hash=sha256:37fe54f842dacde753d469e3c534779edf945420277a375925f53b062a9b8e66

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
