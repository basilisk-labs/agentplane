---
id: "202604220257-AMWKB1"
title: "Extract PR sync ports to break PR artifact cycles"
result_summary: "Implementation commit 439e51528dab. Verification passed: bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202604220256-964PZX"
tags:
  - "architecture"
  - "deps"
  - "pr"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:11.378Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T08:51:20.857Z"
  updated_by: "CODER"
  note: "Verified: extracted neutral incident policy path port for PR sync, removed all dependency-cruiser known no-circular violations, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
commit:
  hash: "439e51528dab5a37e58f2ca99b644fb45a50b009"
  message: "🏗️ AMWKB1 arch: extract PR incident path port"
comments:
  -
    author: "CODER"
    body: "Start: inspect remaining PR artifact sync cycles, extract stable PR sync ports, and lower dep-cruiser known baseline without changing PR artifact behavior."
  -
    author: "CODER"
    body: "Verified: PR sync no longer imports command incidents shared for policy paths; dependency-cruiser known baseline is zero."
events:
  -
    type: "status"
    at: "2026-04-22T08:44:41.084Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect remaining PR artifact sync cycles, extract stable PR sync ports, and lower dep-cruiser known baseline without changing PR artifact behavior."
  -
    type: "verify"
    at: "2026-04-22T08:51:20.857Z"
    author: "CODER"
    state: "ok"
    note: "Verified: extracted neutral incident policy path port for PR sync, removed all dependency-cruiser known no-circular violations, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check."
  -
    type: "status"
    at: "2026-04-22T08:51:35.899Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR sync no longer imports command incidents shared for policy paths; dependency-cruiser known baseline is zero."
doc_version: 3
doc_updated_at: "2026-04-22T08:51:35.899Z"
doc_updated_by: "CODER"
description: "Break known dependency cycles across post-commit PR artifacts and PR sync internals by separating ports from implementations."
sections:
  Summary: "Remove PR sync related no-circular violations using dependency inversion."
  Scope: "PR sync internals, post-commit artifact helpers, and tests. Preserve PR artifact behavior."
  Plan: |-
    1. Inspect known PR sync cycles.
    2. Extract shared contracts into a neutral module.
    3. Rewire sync implementations and artifact helpers to avoid mutual imports.
    4. Update dep-cruiser baseline.
  Verify Steps: "Run arch checks, PR command tests, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T08:51:20.857Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: extracted neutral incident policy path port for PR sync, removed all dependency-cruiser known no-circular violations, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:44:41.093Z, excerpt_hash=sha256:73376722dd0eac6ad08a2e07cac49dc5e505e7bc001ecbc0655a60d22b89b776
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous PR sync imports and baseline."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Remove PR sync related no-circular violations using dependency inversion.

## Scope

PR sync internals, post-commit artifact helpers, and tests. Preserve PR artifact behavior.

## Plan

1. Inspect known PR sync cycles.
2. Extract shared contracts into a neutral module.
3. Rewire sync implementations and artifact helpers to avoid mutual imports.
4. Update dep-cruiser baseline.

## Verify Steps

Run arch checks, PR command tests, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T08:51:20.857Z — VERIFY — ok

By: CODER

Note: Verified: extracted neutral incident policy path port for PR sync, removed all dependency-cruiser known no-circular violations, and passed bun run arch:baseline && bun run arch:deps && bun run ci:local:fast && bun run knip:check && git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:44:41.093Z, excerpt_hash=sha256:73376722dd0eac6ad08a2e07cac49dc5e505e7bc001ecbc0655a60d22b89b776

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous PR sync imports and baseline.

## Findings

None yet.
