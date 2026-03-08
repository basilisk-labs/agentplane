---
id: "202603051042-J53YVE"
title: "Restore local global reinstall helper script"
result_summary: "Local reinstall helper script restored at scripts/reinstall-global-agentplane.sh."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-05T10:43:42.382Z"
  updated_by: "CODER"
  note: "Script restored under scripts/, executable bit set, and --help output verified."
commit:
  hash: "751671017fd0d3338e682232f3dd6afaaf406e6e"
  message: "🚧 J53YVE scripts: restore local global reinstall helper"
comments:
  -
    author: "CODER"
    body: "Start: Restoring local helper script to rebuild and reinstall global agentplane from the current checkout without publishing."
  -
    author: "CODER"
    body: "Verified: Restored helper script for local build+global reinstall workflow and validated usage output."
events:
  -
    type: "status"
    at: "2026-03-05T10:42:56.814Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Restoring local helper script to rebuild and reinstall global agentplane from the current checkout without publishing."
  -
    type: "verify"
    at: "2026-03-05T10:43:42.382Z"
    author: "CODER"
    state: "ok"
    note: "Script restored under scripts/, executable bit set, and --help output verified."
  -
    type: "status"
    at: "2026-03-05T10:43:47.159Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Restored helper script for local build+global reinstall workflow and validated usage output."
doc_version: 3
doc_updated_at: "2026-03-05T10:43:47.159Z"
doc_updated_by: "CODER"
description: "Add scripts/reinstall-global-agentplane.sh to rebuild local package and reinstall global agentplane without npm publish."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Verify Steps

1) bash scripts/reinstall-global-agentplane.sh --help 2) Dry run manually: verify script exits if run outside repo root. 3) Optional: run script and confirm 0.2.25 works after reinstall.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T10:43:42.382Z — VERIFY — ok

By: CODER

Note: Script restored under scripts/, executable bit set, and --help output verified.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T10:42:57.521Z, excerpt_hash=sha256:75bb6dec263a323fec6052752e3fa744a256445926427224371d16440098506d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks
