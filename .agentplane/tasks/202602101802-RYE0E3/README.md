---
id: "202602101802-RYE0E3"
title: "Docs developer: architecture/quality alignment pass"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202602101802-N7MWWX"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Audit developer docs (architecture, cli-contract, testing/quality) for drift vs current code and POLICY.md; update where needed."
events:
  -
    type: "status"
    at: "2026-02-10T18:32:29.291Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Audit developer docs (architecture, cli-contract, testing/quality) for drift vs current code and POLICY.md; update where needed."
doc_version: 2
doc_updated_at: "2026-02-10T18:34:00.810Z"
doc_updated_by: "DOCS"
description: "Audit developer docs (architecture, cli-contract, testing/quality) for drift vs current code and POLICY.md; update where needed."
id_source: "generated"
---
## Summary

Audit developer docs for drift vs current code and policies; update where needed to match the actual CLI and release workflow.

## Scope

In-scope: docs/developer/cli-contract.mdx.

## Plan

1. Scan developer docs for references to removed commands and missing stable commands.
2. Update cli-contract reserved namespaces and command surface to include release plan/apply.
3. Run formatting checks.

## Risks


## Verify Steps

- Confirm `release` appears in the reserved namespaces list.
- Confirm core command surface includes `agentplane release plan` and `agentplane release apply` rows.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits for this task to restore prior developer contract wording.
