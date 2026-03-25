---
id: "202603251535-DPZ4NN"
title: "Generate and enforce canonical task artifact schemas from runtime contracts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202603251523-G3Z6BQ"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T15:58:32.080Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-25T15:58:31.686Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec."
sections:
  Summary: |-
    Generate and enforce canonical task artifact schemas from runtime contracts
    
    Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.
  Scope: |-
    - In scope: Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.
    - Out of scope: unrelated refactors not required for "Generate and enforce canonical task artifact schemas from runtime contracts".
  Plan: |-
    1. Inventory every runtime task artifact shape that currently acts as a contract boundary: task README frontmatter, task export snapshot, task index entry, PR meta, and any generated schema mirrors.
    2. Choose one canonical contract source for those artifacts and implement generated runtime validation plus schema emission from that source.
    3. Wire task read/write paths to validate against the canonical contract, add targeted regression coverage, and record any remaining follow-up seams for later projection refactors.
  Verify Steps: |-
    1. Run targeted task artifact tests. Expected: task README/frontmatter, export, and schema generation paths validate against the same canonical contract.
    2. Review generated schema artifacts and runtime validators. Expected: one contract source drives both runtime validation and emitted schemas without drift.
    3. Run the smallest relevant build/test commands for touched packages. Expected: the refactor preserves existing task lifecycle behavior while rejecting invalid artifact shapes deterministically.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate and enforce canonical task artifact schemas from runtime contracts

Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.

## Scope

- In scope: Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.
- Out of scope: unrelated refactors not required for "Generate and enforce canonical task artifact schemas from runtime contracts".

## Plan

1. Inventory every runtime task artifact shape that currently acts as a contract boundary: task README frontmatter, task export snapshot, task index entry, PR meta, and any generated schema mirrors.
2. Choose one canonical contract source for those artifacts and implement generated runtime validation plus schema emission from that source.
3. Wire task read/write paths to validate against the canonical contract, add targeted regression coverage, and record any remaining follow-up seams for later projection refactors.

## Verify Steps

1. Run targeted task artifact tests. Expected: task README/frontmatter, export, and schema generation paths validate against the same canonical contract.
2. Review generated schema artifacts and runtime validators. Expected: one contract source drives both runtime validation and emitted schemas without drift.
3. Run the smallest relevant build/test commands for touched packages. Expected: the refactor preserves existing task lifecycle behavior while rejecting invalid artifact shapes deterministically.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
