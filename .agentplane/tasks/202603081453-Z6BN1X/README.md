---
id: "202603081453-Z6BN1X"
title: "Document canonical workflow test scripts"
result_summary: "Workflow test orchestration docs are synchronized with the shared script model and targeted(workflow) fast bucket."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T15:16:43.364Z"
  updated_by: "ORCHESTRATOR"
  note: "Docs should now treat canonical workflow scripts and workflow contract checks as part of the standard quality model."
verification:
  state: "ok"
  updated_at: "2026-03-08T15:20:13.493Z"
  updated_by: "DOCS"
  note: "Verified docs sync with bun run docs:site:check and node .agentplane/policy/check-routing.mjs; testing-and-quality now documents test:platform-critical, test:workflow-coverage, test:significant-coverage, workflows:command-check, and targeted(workflow)."
commit:
  hash: "e1b8f0a927fb744a8d5376156fae1475f74ff373"
  message: "📝 Z6BN1X docs: sync workflow test script guidance"
comments:
  -
    author: "DOCS"
    body: "Start: sync developer testing docs with the new canonical workflow scripts, workflow bucket, and workflow command-contract enforcement."
  -
    author: "DOCS"
    body: "Verified: developer testing docs now point workflow execution to canonical named scripts and document workflow command-contract enforcement."
events:
  -
    type: "status"
    at: "2026-03-08T15:16:50.648Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: sync developer testing docs with the new canonical workflow scripts, workflow bucket, and workflow command-contract enforcement."
  -
    type: "verify"
    at: "2026-03-08T15:20:13.493Z"
    author: "DOCS"
    state: "ok"
    note: "Verified docs sync with bun run docs:site:check and node .agentplane/policy/check-routing.mjs; testing-and-quality now documents test:platform-critical, test:workflow-coverage, test:significant-coverage, workflows:command-check, and targeted(workflow)."
  -
    type: "status"
    at: "2026-03-08T15:20:19.280Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: developer testing docs now point workflow execution to canonical named scripts and document workflow command-contract enforcement."
doc_version: 3
doc_updated_at: "2026-03-08T15:20:19.280Z"
doc_updated_by: "DOCS"
description: "Update developer CI documentation to explain which named scripts own workflow test and coverage execution, and how GitHub workflows should call them instead of embedding test runner command lines."
id_source: "generated"
---
## Summary

Document canonical workflow test scripts

Update developer CI documentation to explain which named scripts own workflow test and coverage execution, and how GitHub workflows should call them instead of embedding test runner command lines.

## Scope

- In scope: Update developer CI documentation to explain which named scripts own workflow test and coverage execution, and how GitHub workflows should call them instead of embedding test runner command lines.
- Out of scope: unrelated refactors not required for "Document canonical workflow test scripts".

## Plan

1. Update developer testing docs to document the new canonical workflow scripts: `test:platform-critical`, `test:workflow-coverage`, `test:significant-coverage`, and `workflows:command-check`.
2. Update the pre-push and CI documentation so workflow-related changes clearly route through the dedicated workflow bucket and the remote workflows-lint contract check.
3. Run docs checks, record verification, and close the task.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T15:20:13.493Z — VERIFY — ok

By: DOCS

Note: Verified docs sync with bun run docs:site:check and node .agentplane/policy/check-routing.mjs; testing-and-quality now documents test:platform-critical, test:workflow-coverage, test:significant-coverage, workflows:command-check, and targeted(workflow).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T15:16:50.648Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
