---
id: "202604200946-0FAD2W"
title: "Add shared script argv parser"
result_summary: "Added parseScriptArgs for shared value/boolean flag parsing and migrated release tag checks away from hand-rolled argv loops."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-20T09:48:32.836Z"
  updated_by: "CODER"
  note: "Command: node scripts/check-release-version.mjs --tag=v0.3.15 -> pass. Command: node scripts/check-release-notes.mjs --tag=v0.3.15 --min-bullets=1 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
commit:
  hash: "bdffec112b982895804f44e70b34e94b3df1b3c2"
  message: "♻️ 0FAD2W scripts: share argv parsing"
comments:
  -
    author: "CODER"
    body: "Start: add a reusable script argv parser and migrate the two release tag checks that currently hand-roll flag loops."
  -
    author: "CODER"
    body: "Verified: release-version and release-notes scripts pass with shared parser; format and lint pass."
events:
  -
    type: "status"
    at: "2026-04-20T09:46:40.617Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a reusable script argv parser and migrate the two release tag checks that currently hand-roll flag loops."
  -
    type: "verify"
    at: "2026-04-20T09:48:32.836Z"
    author: "CODER"
    state: "ok"
    note: "Command: node scripts/check-release-version.mjs --tag=v0.3.15 -> pass. Command: node scripts/check-release-notes.mjs --tag=v0.3.15 --min-bullets=1 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
  -
    type: "status"
    at: "2026-04-20T09:48:39.546Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release-version and release-notes scripts pass with shared parser; format and lint pass."
doc_version: 3
doc_updated_at: "2026-04-20T09:48:39.547Z"
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
    ### 2026-04-20T09:48:32.836Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node scripts/check-release-version.mjs --tag=v0.3.15 -> pass. Command: node scripts/check-release-notes.mjs --tag=v0.3.15 --min-bullets=1 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:46:40.625Z, excerpt_hash=sha256:6cde93d1728d4cd72e0101ac1a7061c4e270603e9423bde97df850f5b66b4e08
    
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
### 2026-04-20T09:48:32.836Z — VERIFY — ok

By: CODER

Note: Command: node scripts/check-release-version.mjs --tag=v0.3.15 -> pass. Command: node scripts/check-release-notes.mjs --tag=v0.3.15 --min-bullets=1 -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:46:40.625Z, excerpt_hash=sha256:6cde93d1728d4cd72e0101ac1a7061c4e270603e9423bde97df850f5b66b4e08

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
