---
id: "202603081538-0YPG92"
title: "Refresh CLI bug ledger and promote strong incidents"
result_summary: "Updated the v0.3.x bug ledger and promoted only the strongest release/runtime incidents into the canonical incidents log."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T15:40:45.289Z"
  updated_by: "ORCHESTRATOR"
  note: "0.3.3 prep needs a current CLI bug ledger and a narrow promotion step for only the strongest incidents that materially reduce future agent failures."
verification:
  state: "ok"
  updated_at: "2026-03-08T15:49:38.824Z"
  updated_by: "DOCS"
  note: "Verified: the v0.3.x CLI bug ledger now reflects the current shipped fixes and remaining gaps, docs:site:check passes, and policy routing stays valid after promoting only the strongest incidents."
commit:
  hash: "ab8e2fc956343164f9f982f738b0de1ac1ff7b49"
  message: "📝 0YPG92 docs: refresh CLI bug ledger and incidents"
comments:
  -
    author: "DOCS"
    body: "Start: refreshing the v0.3.x CLI bug ledger from confirmed repository evidence and promoting only the strongest, durable failures into the incidents log for 0.3.3 preparation."
  -
    author: "DOCS"
    body: "Verified: the CLI bug ledger is refreshed for the 0.3.3 prep cycle and the incidents log now contains only the strongest, enforceable failure classes from the v0.3.x stabilization work."
events:
  -
    type: "status"
    at: "2026-03-08T15:40:53.726Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refreshing the v0.3.x CLI bug ledger from confirmed repository evidence and promoting only the strongest, durable failures into the incidents log for 0.3.3 preparation."
  -
    type: "verify"
    at: "2026-03-08T15:49:38.824Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: the v0.3.x CLI bug ledger now reflects the current shipped fixes and remaining gaps, docs:site:check passes, and policy routing stays valid after promoting only the strongest incidents."
  -
    type: "status"
    at: "2026-03-08T15:49:38.892Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: the CLI bug ledger is refreshed for the 0.3.3 prep cycle and the incidents log now contains only the strongest, enforceable failure classes from the v0.3.x stabilization work."
doc_version: 3
doc_updated_at: "2026-03-08T15:49:38.892Z"
doc_updated_by: "DOCS"
description: "Update the v0.3.x CLI bug ledger with the confirmed stabilization findings, analyze which failures are policy-worthy, and promote only the strongest incident entries into the canonical incidents log."
id_source: "generated"
---
## Summary

Refresh CLI bug ledger and promote strong incidents

Update the v0.3.x CLI bug ledger with the confirmed stabilization findings, analyze which failures are policy-worthy, and promote only the strongest incident entries into the canonical incidents log.

## Scope

- In scope: Update the v0.3.x CLI bug ledger with the confirmed stabilization findings, analyze which failures are policy-worthy, and promote only the strongest incident entries into the canonical incidents log.
- Out of scope: unrelated refactors not required for "Refresh CLI bug ledger and promote strong incidents".

## Plan

1. Refresh the v0.3.x CLI bug ledger so it reflects the confirmed failures, shipped fixes, and remaining gaps relevant to the next patch release.
2. Evaluate which failures are strong enough for the incidents log and promote only those that add durable policy memory.
3. Verify docs and policy consistency, then close the task with a concise release-prep outcome.

## Verify Steps

1. Review docs/developer/cli-bug-ledger-v0-3-x.mdx and .agentplane/policy/incidents.md after the update. Expected: only confirmed failures and strong incidents remain.
2. Run bun run docs:site:check. Expected: docs surfaces stay clean after the bug-ledger refresh.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing stays valid after any incidents-log changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T15:49:38.824Z — VERIFY — ok

By: DOCS

Note: Verified: the v0.3.x CLI bug ledger now reflects the current shipped fixes and remaining gaps, docs:site:check passes, and policy routing stays valid after promoting only the strongest incidents.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T15:40:53.726Z, excerpt_hash=sha256:2d93d5a8bfe06e0882befac77a6f45c151db63dcd6d278c239ba76402ed8b488

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
