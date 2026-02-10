---
id: "202602101802-G52CH8"
title: "Docs user: tasks and backends"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602101802-YQR0RR"
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
    body: "Start: Update tasks/backends docs (local/redmine, exports, canonical source) to match current backend model and commands."
events:
  -
    type: "status"
    at: "2026-02-10T18:23:43.033Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Update tasks/backends docs (local/redmine, exports, canonical source) to match current backend model and commands."
doc_version: 2
doc_updated_at: "2026-02-10T18:25:03.129Z"
doc_updated_by: "DOCS"
description: "Update tasks/backends docs (local/redmine, exports, canonical source) to match current backend model and commands."
id_source: "generated"
---
## Summary

Update tasks/backends documentation to match current backend commands (backend sync) and export semantics.

## Scope

In-scope: docs/user/tasks-and-backends.mdx, docs/user/backends.mdx, docs/user/backends/local.mdx, docs/user/backends/redmine.mdx. Out-of-scope: redmine top-level guide page (handled later).

## Plan

1. Replace legacy sync commands with  in user docs.\n2. Replace legacy export wording with .agentplane/tasks.json.\n3. Ensure conflict policy terms and network gating notes remain accurate.

## Risks

Risk: docs suggest non-existent commands, causing immediate onboarding failures. Mitigation: validate against `agentplane help backend sync --compact` and `agentplane help task export --compact`.

## Verify Steps

- Confirm no occurrences of  or  remain in these pages.\n- Confirm examples match CLI help for  and .

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits for this task to restore prior backend docs.

## Context

Docs currently reference legacy sync/export commands that no longer match the CLI (, ). The user guide must reflect  and .agentplane/tasks.json.
