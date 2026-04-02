---
id: "202604021851-2DHT5H"
title: "Move PR human notes into append-only artifact storage"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604021851-W4RW7J"
tags:
  - "code"
  - "workflow"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-02T18:53:36.432Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from user audit implementation request on 2026-04-03."
verification:
  state: "ok"
  updated_at: "2026-04-02T19:21:25.499Z"
  updated_by: "CODER"
  note: "Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move PR human notes into append-only storage and render them back into review output."
events:
  -
    type: "status"
    at: "2026-04-02T19:14:43.474Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move PR human notes into append-only storage and render them back into review output."
  -
    type: "verify"
    at: "2026-04-02T19:21:25.499Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000"
doc_version: 3
doc_updated_at: "2026-04-02T19:21:25.511Z"
doc_updated_by: "CODER"
description: "Replace direct editing of review.md handoff notes with structured append-only PR note storage and render those notes back into the review output so generated and human-authored content stop colliding."
sections:
  Summary: |-
    Move PR human notes into append-only artifact storage
    
    Replace direct editing of review.md handoff notes with structured append-only PR note storage and render those notes back into the review output so generated and human-authored content stop colliding.
  Scope: |-
    - In scope: Replace direct editing of review.md handoff notes with structured append-only PR note storage and render those notes back into the review output so generated and human-authored content stop colliding.
    - Out of scope: unrelated refactors not required for "Move PR human notes into append-only artifact storage".
  Plan: |-
    1. Define structured append-only storage for PR human notes without duplicating generated review content.
    2. Render stored notes back into review output in stable order.
    3. Preserve compatibility for note reads/writes and cover with focused tests.
  Verify Steps: |-
    1. Append PR human notes through the new structured note store. Expected: human notes are recorded without directly editing generated review sections.
    2. Re-render review output after multiple notes. Expected: notes appear in stable order and generated sections remain deterministic.
    3. Run targeted note/render regressions. Expected: touched tests pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-02T19:21:25.499Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T19:14:43.500Z, excerpt_hash=sha256:444bda209ccd4e6679b1bd01b4707e997d3d830883c66a2522b72edb18a91172
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Move PR human notes into append-only artifact storage

Replace direct editing of review.md handoff notes with structured append-only PR note storage and render those notes back into the review output so generated and human-authored content stop colliding.

## Scope

- In scope: Replace direct editing of review.md handoff notes with structured append-only PR note storage and render those notes back into the review output so generated and human-authored content stop colliding.
- Out of scope: unrelated refactors not required for "Move PR human notes into append-only artifact storage".

## Plan

1. Define structured append-only storage for PR human notes without duplicating generated review content.
2. Render stored notes back into review output in stable order.
3. Preserve compatibility for note reads/writes and cover with focused tests.

## Verify Steps

1. Append PR human notes through the new structured note store. Expected: human notes are recorded without directly editing generated review sections.
2. Re-render review output after multiple notes. Expected: notes appear in stable order and generated sections remain deterministic.
3. Run targeted note/render regressions. Expected: touched tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-02T19:21:25.499Z — VERIFY — ok

By: CODER

Note: Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit && bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/pr/internal/pr-paths.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T19:14:43.500Z, excerpt_hash=sha256:444bda209ccd4e6679b1bd01b4707e997d3d830883c66a2522b72edb18a91172

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
