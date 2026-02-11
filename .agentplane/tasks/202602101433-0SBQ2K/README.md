---
id: "202602101433-0SBQ2K"
title: "Policy: require commits for all code changes"
result_summary: "Documented commit requirement for all code changes"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "policy"
  - "workflow"
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:34:30.172Z"
  updated_by: "DOCS"
  note: "documented a hard requirement to commit all tracked code changes (packages/**) before finishing tasks; English-only wording"
commit:
  hash: "739c2ffa1fc41dbd832f874cfec64198988bbb7a"
  message: "🚧 0SBQ2K policy: require commits for code changes"
comments:
  -
    author: "DOCS"
    body: "Start: document a hard requirement that all code changes must be captured in a git commit as part of a task."
  -
    author: "DOCS"
    body: "Verified: AGENTS.md and POLICY.md now explicitly require committing all tracked code changes (packages/**) as part of a task before finishing work."
events:
  -
    type: "status"
    at: "2026-02-10T14:33:47.147Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document a hard requirement that all code changes must be captured in a git commit as part of a task."
  -
    type: "verify"
    at: "2026-02-10T14:34:30.172Z"
    author: "DOCS"
    state: "ok"
    note: "documented a hard requirement to commit all tracked code changes (packages/**) before finishing tasks; English-only wording"
  -
    type: "status"
    at: "2026-02-10T14:35:29.326Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: AGENTS.md and POLICY.md now explicitly require committing all tracked code changes (packages/**) as part of a task before finishing work."
doc_version: 2
doc_updated_at: "2026-02-10T14:35:29.326Z"
doc_updated_by: "DOCS"
description: "Pin a canonical rule that any code changes (e.g. under packages/**) must be recorded in a git commit as part of a task; avoid leaving uncommitted tracked diffs after completing work."
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
#### 2026-02-10T14:34:30.172Z — VERIFY — ok

By: DOCS

Note: documented a hard requirement to commit all tracked code changes (packages/**) before finishing tasks; English-only wording

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:33:47.147Z, excerpt_hash=sha256:430b50e4e560bc8b4a3deaa6cc136f7e47956ed3dc6c4c3ec6bfd23dd0b3666b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope\n- Policy docs only (AGENTS.md and/or POLICY.md).\n\n### Checks\n- Ensure the rule is stated unambiguously and does not contradict existing commit/task rules.\n\n### Evidence / Commands\n- rg -n "commit" AGENTS.md POLICY.md\n\n### Pass criteria\n- Both documents contain a clear rule requiring a commit for any code changes.\n- Wording is English-only.
