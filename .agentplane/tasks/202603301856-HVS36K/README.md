---
id: "202603301856-HVS36K"
title: "Define the canonical command-graph data model"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603301721-9ZMFDY"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T19:28:59.853Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the next Epic 1 unblocker; scope stays limited to introducing one shared command-graph model for catalog and registry semantics, plus focused tests, without yet changing dispatcher/help behavior beyond the internal graph wiring."
verification:
  state: "ok"
  updated_at: "2026-03-30T19:32:39.264Z"
  updated_by: "CODER"
  note: "OK: bunx vitest run packages/agentplane/src/cli/spec/registry.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts plus prettier --check and eslint on the touched graph files passed; the CLI now has one shared command-graph model for longest-prefix match, exact lookup, and direct-child lookup across catalog and registry."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: introducing one shared command-graph model that can answer longest-prefix match, exact lookup, and direct-child lookup for the CLI catalog/registry, with focused unit coverage and no broader routing changes yet."
events:
  -
    type: "status"
    at: "2026-03-30T19:29:44.604Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introducing one shared command-graph model that can answer longest-prefix match, exact lookup, and direct-child lookup for the CLI catalog/registry, with focused unit coverage and no broader routing changes yet."
  -
    type: "verify"
    at: "2026-03-30T19:32:39.264Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/spec/registry.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts plus prettier --check and eslint on the touched graph files passed; the CLI now has one shared command-graph model for longest-prefix match, exact lookup, and direct-child lookup across catalog and registry."
doc_version: 3
doc_updated_at: "2026-03-30T19:32:39.266Z"
doc_updated_by: "CODER"
description: "Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth."
sections:
  Summary: |-
    Define the canonical command-graph data model
    
    Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
  Scope: |-
    - In scope: Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
    - Out of scope: unrelated refactors not required for "Define the canonical command-graph data model".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata to isolate the exact behavior gap for R1.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata. Expected: the behavior described by R1.1 is observable and stable.
    2. Inspect the final diff for 202603301856-HVS36K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T19:32:39.264Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/spec/registry.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts plus prettier --check and eslint on the touched graph files passed; the CLI now has one shared command-graph model for longest-prefix match, exact lookup, and direct-child lookup across catalog and registry.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:29:44.605Z, excerpt_hash=sha256:f3b15ab7e2109696e69fe555efb72e33214e45a45405d395cc896d44f6a622fe
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Define the canonical command-graph data model

Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.

## Scope

- In scope: Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
- Out of scope: unrelated refactors not required for "Define the canonical command-graph data model".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata to isolate the exact behavior gap for R1.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata. Expected: the behavior described by R1.1 is observable and stable.
2. Inspect the final diff for 202603301856-HVS36K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T19:32:39.264Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/spec/registry.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts plus prettier --check and eslint on the touched graph files passed; the CLI now has one shared command-graph model for longest-prefix match, exact lookup, and direct-child lookup across catalog and registry.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:29:44.605Z, excerpt_hash=sha256:f3b15ab7e2109696e69fe555efb72e33214e45a45405d395cc896d44f6a622fe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
