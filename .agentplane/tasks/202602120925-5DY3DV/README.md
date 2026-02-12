---
id: "202602120925-5DY3DV"
title: "P1: init prod preset for compact agent UX"
result_summary: "Added setup-profile switch for init: compact prod interactive flow and full dev questionnaire."
risk_level: "low"
status: "DONE"
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
commit:
  hash: "4be295eb3e048cbbf31fa4a92e1c7de4012feb65"
  message: "✅ 5DY3DV init: add compact prod setup profile"
comments:
  -
    author: "CODER"
    body: "Start: implement compact prod init flow and keep full dev questionnaire via setup-profile switch."
  -
    author: "CODER"
    body: "Verified: init interactive tests cover prod compact and dev full questionnaire paths; lint/build pass."
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
  -
    type: "status"
    at: "2026-02-12T10:10:30.854Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init interactive tests cover prod compact and dev full questionnaire paths; lint/build pass."
doc_version: 2
doc_updated_at: "2026-02-12T10:10:30.854Z"
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
