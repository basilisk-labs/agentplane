---
id: "202602120734-NQGXZR"
title: "Docs User: commands and CLI reference"
result_summary: "Commands documentation and generated CLI reference synchronized"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602120734-K6QAX2"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T07:52:30.964Z"
  updated_by: "REVIEWER"
  note: "Verified: CLI reference regenerated from current specs; commands guide now matches current workflow commands, branch_pr work-start requirement, and status-commit transition constraints."
commit:
  hash: "f674e1c00ffa02bae6989bc75fd35db53137151e"
  message: "🛠️ NQGXZR docs: refresh command guide and regenerate CLI reference"
comments:
  -
    author: "DOCS"
    body: "Start: update practical commands guide and regenerate CLI reference from current command specs to remove flag/example drift."
  -
    author: "DOCS"
    body: "Verified: practical commands and generated CLI reference are synchronized with the current command registry and runtime behavior."
events:
  -
    type: "status"
    at: "2026-02-12T07:51:19.543Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update practical commands guide and regenerate CLI reference from current command specs to remove flag/example drift."
  -
    type: "verify"
    at: "2026-02-12T07:52:30.964Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: CLI reference regenerated from current specs; commands guide now matches current workflow commands, branch_pr work-start requirement, and status-commit transition constraints."
  -
    type: "status"
    at: "2026-02-12T07:52:31.115Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: practical commands and generated CLI reference are synchronized with the current command registry and runtime behavior."
doc_version: 2
doc_updated_at: "2026-02-12T07:52:31.115Z"
doc_updated_by: "DOCS"
description: "Align docs/user/commands.mdx and docs/user/cli-reference.generated.mdx with actual command specs, flags, status-commit format, json-errors behavior, and examples verified against current CLI output."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T07:52:30.964Z — VERIFY — ok

By: REVIEWER

Note: Verified: CLI reference regenerated from current specs; commands guide now matches current workflow commands, branch_pr work-start requirement, and status-commit transition constraints.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T07:51:19.543Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
