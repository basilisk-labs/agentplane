---
id: "202602101436-TPSRHR"
title: "Fix: restore AGENTS.md invariants while adding commit requirement"
result_summary: "Restored AGENTS invariants after policy edit"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202602101433-0SBQ2K"
tags:
  - "docs"
  - "policy"
  - "fix"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:37:31.748Z"
  updated_by: "DOCS"
  note: "restored timestamp-in-notes invariant and Framework Upgrade / Prompt Merge section while keeping the commit requirement rule"
commit:
  hash: "a8abdc99a5090e8d95b70dc6bf3af2966b729001"
  message: "🚧 TPSRHR docs: restore AGENTS upgrade/timestamps rules"
comments:
  -
    author: "DOCS"
    body: "Start: restore AGENTS.md timestamp and upgrade-merge invariants while keeping the commit requirement rule."
  -
    author: "DOCS"
    body: "Verified: restored AGENTS.md timestamp-in-notes invariant and Framework Upgrade / Prompt Merge protocol while preserving the commit requirement rule."
events:
  -
    type: "status"
    at: "2026-02-10T14:37:07.829Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: restore AGENTS.md timestamp and upgrade-merge invariants while keeping the commit requirement rule."
  -
    type: "verify"
    at: "2026-02-10T14:37:31.748Z"
    author: "DOCS"
    state: "ok"
    note: "restored timestamp-in-notes invariant and Framework Upgrade / Prompt Merge section while keeping the commit requirement rule"
  -
    type: "status"
    at: "2026-02-10T14:38:35.862Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: restored AGENTS.md timestamp-in-notes invariant and Framework Upgrade / Prompt Merge protocol while preserving the commit requirement rule."
doc_version: 2
doc_updated_at: "2026-02-10T14:38:35.862Z"
doc_updated_by: "DOCS"
description: "Restore the timestamp-in-notes invariant and the Framework Upgrade / Prompt Merge protocol that were accidentally removed while adding the commit requirement rule."
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
#### 2026-02-10T14:37:31.748Z — VERIFY — ok

By: DOCS

Note: restored timestamp-in-notes invariant and Framework Upgrade / Prompt Merge section while keeping the commit requirement rule

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:37:07.829Z, excerpt_hash=sha256:31acf3d0a9f58962713fa3d23cba95de2ebc79b7bdc3a900921b06b6a55120bc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope\n- packages/agentplane/assets/AGENTS.md only.\n\n### Checks\n- Ensure the timestamp-in-notes rule and Framework Upgrade / Prompt Merge section are present.\n- Ensure the new commit requirement rule remains present.\n\n### Evidence / Commands\n- rg -n "Timestamps are recorded" packages/agentplane/assets/AGENTS.md\n- rg -n "Framework Upgrade / Prompt Merge" packages/agentplane/assets/AGENTS.md\n- rg -n "Any tracked code changes" packages/agentplane/assets/AGENTS.md\n\n### Pass criteria\n- All three rules/sections are present and English-only.
