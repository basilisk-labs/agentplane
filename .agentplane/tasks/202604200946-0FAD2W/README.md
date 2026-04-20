---
id: "202604200946-0FAD2W"
title: "Add shared script argv parser"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "refactor"
  - "scripts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:46:40.308Z"
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
    author: "CODER"
    body: "Start: add a reusable script argv parser and migrate the two release tag checks that currently hand-roll flag loops."
events:
  -
    type: "status"
    at: "2026-04-20T09:46:40.617Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a reusable script argv parser and migrate the two release tag checks that currently hand-roll flag loops."
doc_version: 3
doc_updated_at: "2026-04-20T09:46:40.625Z"
doc_updated_by: "CODER"
description: "Add a reusable argv flag parser to script-runtime and migrate release-version plus release-notes checks away from hand-rolled flag loops."
sections:
  Summary: |-
    Add shared script argv parser
    
    Add a reusable argv flag parser to script-runtime and migrate release-version plus release-notes checks away from hand-rolled flag loops.
  Scope: |-
    - In scope: Add a reusable argv flag parser to script-runtime and migrate release-version plus release-notes checks away from hand-rolled flag loops.
    - Out of scope: unrelated refactors not required for "Add shared script argv parser".
  Plan: |-
    1. Add parseScriptArgs to scripts/lib/script-runtime.mjs for value flags, boolean flags, aliases, --flag=value, and positional collection.
    2. Migrate check-release-version.mjs to parseScriptArgs while preserving --tag/stdin/GitHub tag resolution.
    3. Migrate check-release-notes.mjs to defineCheck + parseScriptArgs while preserving --tag and --min-bullets behavior.
    4. Run focused release check smoke commands plus format/lint, then commit, verify, and finish.
  Verify Steps: |-
    1. Review the requested outcome for "Add shared script argv parser". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add shared script argv parser

Add a reusable argv flag parser to script-runtime and migrate release-version plus release-notes checks away from hand-rolled flag loops.

## Scope

- In scope: Add a reusable argv flag parser to script-runtime and migrate release-version plus release-notes checks away from hand-rolled flag loops.
- Out of scope: unrelated refactors not required for "Add shared script argv parser".

## Plan

1. Add parseScriptArgs to scripts/lib/script-runtime.mjs for value flags, boolean flags, aliases, --flag=value, and positional collection.
2. Migrate check-release-version.mjs to parseScriptArgs while preserving --tag/stdin/GitHub tag resolution.
3. Migrate check-release-notes.mjs to defineCheck + parseScriptArgs while preserving --tag and --min-bullets behavior.
4. Run focused release check smoke commands plus format/lint, then commit, verify, and finish.

## Verify Steps

1. Review the requested outcome for "Add shared script argv parser". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
