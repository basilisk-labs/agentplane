---
id: "202603061414-F0B4QD"
title: "Refresh CLI reference and publish site"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T14:14:33.090Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: commit the regenerated CLI reference required by pre-push, then push main and verify the website publication workflows."
events:
  -
    type: "status"
    at: "2026-03-06T14:14:37.232Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: commit the regenerated CLI reference required by pre-push, then push main and verify the website publication workflows."
doc_version: 2
doc_updated_at: "2026-03-06T14:14:37.232Z"
doc_updated_by: "ORCHESTRATOR"
description: "Commit the regenerated CLI reference required by pre-push after recent CLI help/policy changes, then push main and verify Docs CI / Pages Deploy."
id_source: "generated"
---
## Summary

Refresh CLI reference and publish site

Commit the regenerated CLI reference required by pre-push after recent CLI help/policy changes, then push main and verify Docs CI / Pages Deploy.

## Scope

- In scope: Commit the regenerated CLI reference required by pre-push after recent CLI help/policy changes, then push main and verify Docs CI / Pages Deploy..
- Out of scope: unrelated refactors not required for "Refresh CLI reference and publish site".

## Plan

1. Regenerate and commit docs/user/cli-reference.generated.mdx so the CLI docs freshness gate passes.\n2. Re-run the local gate relevant to the publish path.\n3. Push main and confirm Docs CI plus Pages Deploy succeeded for the current site.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
