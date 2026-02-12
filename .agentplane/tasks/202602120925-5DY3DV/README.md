---
id: "202602120925-5DY3DV"
title: "P1: init prod preset for compact agent UX"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602120925-EH560H"
tags:
  - "meta"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T10:09:55.233Z"
  updated_by: "CODER"
  note: "Verified: run-cli init suite passes with compact prod prompts and full dev prompts; lint/build pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement compact prod init flow and keep full dev questionnaire via setup-profile switch."
events:
  -
    type: "status"
    at: "2026-02-12T10:09:49.943Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement compact prod init flow and keep full dev questionnaire via setup-profile switch."
  -
    type: "verify"
    at: "2026-02-12T10:09:55.233Z"
    author: "CODER"
    state: "ok"
    note: "Verified: run-cli init suite passes with compact prod prompts and full dev prompts; lint/build pass."
doc_version: 2
doc_updated_at: "2026-02-12T10:09:55.234Z"
doc_updated_by: "CODER"
description: "Init asks 1-2 questions and configures execution/output defaults for installed workflow."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Add setup-profile switch (prod/dev) to init.\n2. Keep prod interactive flow compact (essential prompts only).\n3. Preserve full questionnaire for dev mode.\n4. Update interactive init tests.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T10:09:55.233Z — VERIFY — ok

By: CODER

Note: Verified: run-cli init suite passes with compact prod prompts and full dev prompts; lint/build pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T10:09:49.943Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
