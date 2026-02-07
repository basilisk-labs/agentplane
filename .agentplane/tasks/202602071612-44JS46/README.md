---
id: "202602071612-44JS46"
title: "AP-TASKDOC-01: Migrate historical task READMEs to current format"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "docs"
  - "tasks"
  - "roadmap"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T16:14:02.220Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T16:14:02.220Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T16:20:02.717Z"
  updated_by: "CODER"
  note: "Verified: Ran task migrate-doc --all (changed=504), then task lint OK. Also ran bun run test:cli:core (all tests passed)."
commit:
  hash: "9af12e9ee173f939460b29b7e80be470e731e685"
  message: "✨ 44JS46 tasks: migrate historical README format"
comments:
  -
    author: "CODER"
    body: "Start: Migrate historical task README files to the current doc_version/template when needed."
  -
    author: "CODER"
    body: "Verified: Migrated historical task READMEs to the current required sections, then confirmed with agentplane task lint (OK) and bun run test:cli:core."
doc_version: 2
doc_updated_at: "2026-02-07T16:20:07.548Z"
doc_updated_by: "CODER"
description: "Scan all task READMEs under .agentplane/tasks and migrate any mismatching documents to the current doc_version/template using the built-in migrator."
id_source: "generated"
---
## Summary

Migrate any historical task READMEs that do not match the current doc_version/template.

## Scope

In scope: run task migrate-doc across all tasks; ensure required sections exist and metadata is normalized.
Out of scope: translating existing task content.

## Plan

1. Run the built-in task README migrator across all tasks.
2. Run task lint to validate required sections and formatting.
3. Commit only the migrated task README changes (no caches, no tasks.json).
4. Record verification and finish the task.

## Risks

Risk: a large number of historical READMEs may change, increasing diff size.
Mitigation: the migrator is idempotent and only writes when needed; commits are allowlisted to .agentplane/tasks.

## Verification

- node packages/agentplane/bin/agentplane.js task migrate-doc --all
- node packages/agentplane/bin/agentplane.js task lint

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T16:20:02.717Z — VERIFY — ok

By: CODER

Note: Verified: Ran task migrate-doc --all (changed=504), then task lint OK. Also ran bun run test:cli:core (all tests passed).

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the migration commit(s) for this task to restore the previous task README formatting.
