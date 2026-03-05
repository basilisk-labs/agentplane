---
id: "202603051042-J53YVE"
title: "Restore local global reinstall helper script"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
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
    author: "CODER"
    body: "Start: Restoring local helper script to rebuild and reinstall global agentplane from the current checkout without publishing."
events:
  -
    type: "status"
    at: "2026-03-05T10:42:56.814Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Restoring local helper script to rebuild and reinstall global agentplane from the current checkout without publishing."
doc_version: 2
doc_updated_at: "2026-03-05T10:42:57.521Z"
doc_updated_by: "CODER"
description: "Add scripts/reinstall-global-agentplane.sh to rebuild local package and reinstall global agentplane without npm publish."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

1) bash scripts/reinstall-global-agentplane.sh --help 2) Dry run manually: verify script exits if run outside repo root. 3) Optional: run script and confirm 0.2.25 works after reinstall.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan
