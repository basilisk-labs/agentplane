---
id: "202604200937-SW77BH"
title: "Introduce shared script entrypoint runner"
result_summary: "Added defineScript/runScriptMain to script-runtime and migrated generated-artifact scripts off local main().catch boilerplate."
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
  updated_at: "2026-04-20T09:37:38.343Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T09:43:32.114Z"
  updated_by: "CODER"
  note: "Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run docs:bootstrap:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
commit:
  hash: "bf146bfb712834a89b6c4d7046f6ba39d336040d"
  message: "♻️ SW77BH scripts: add shared script entrypoint"
comments:
  -
    author: "CODER"
    body: "Start: introduce a shared script entrypoint runner and migrate the scripts already touched by F′ to it first."
  -
    author: "CODER"
    body: "Verified: migrated generated-artifact checks and bootstrap generator keep their outputs and pass docs, format, and lint gates."
events:
  -
    type: "status"
    at: "2026-04-20T09:37:38.682Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce a shared script entrypoint runner and migrate the scripts already touched by F′ to it first."
  -
    type: "verify"
    at: "2026-04-20T09:43:32.114Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run docs:bootstrap:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
  -
    type: "status"
    at: "2026-04-20T09:43:40.709Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: migrated generated-artifact checks and bootstrap generator keep their outputs and pass docs, format, and lint gates."
doc_version: 3
doc_updated_at: "2026-04-20T09:43:40.710Z"
doc_updated_by: "CODER"
description: "Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it."
sections:
  Summary: |-
    Introduce shared script entrypoint runner
    
    Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.
  Scope: |-
    - In scope: Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.
    - Out of scope: unrelated refactors not required for "Introduce shared script entrypoint runner".
  Plan: |-
    1. Add defineScript({ name, run }) and runScriptMain to scripts/lib/script-runtime.mjs with a single error-reporting path.
    2. Replace generated-artifacts local runner export with the shared script-runtime runner.
    3. Migrate generated-artifact check scripts and generate-agent-bootstrap-doc.mjs to defineScript without changing output or validation semantics.
    4. Run the affected docs checks/generator dry path plus format/lint, then commit and finish.
  Verify Steps: |-
    1. Review the requested outcome for "Introduce shared script entrypoint runner". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T09:43:32.114Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run docs:bootstrap:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:37:38.692Z, excerpt_hash=sha256:85fa174a9582f525acc1f5ba6d1da696fc0155b3fd47d84961aacf801c99e7e4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce shared script entrypoint runner

Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.

## Scope

- In scope: Add defineScript to scripts/lib/script-runtime.mjs for consistent argv handling and error reporting, then migrate generated-artifact freshness checks and the bootstrap generator to use it.
- Out of scope: unrelated refactors not required for "Introduce shared script entrypoint runner".

## Plan

1. Add defineScript({ name, run }) and runScriptMain to scripts/lib/script-runtime.mjs with a single error-reporting path.
2. Replace generated-artifacts local runner export with the shared script-runtime runner.
3. Migrate generated-artifact check scripts and generate-agent-bootstrap-doc.mjs to defineScript without changing output or validation semantics.
4. Run the affected docs checks/generator dry path plus format/lint, then commit and finish.

## Verify Steps

1. Review the requested outcome for "Introduce shared script entrypoint runner". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T09:43:32.114Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run docs:bootstrap:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:37:38.692Z, excerpt_hash=sha256:85fa174a9582f525acc1f5ba6d1da696fc0155b3fd47d84961aacf801c99e7e4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
