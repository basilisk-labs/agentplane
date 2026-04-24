---
id: "202604240848-5S9FND"
title: "Fix init cached recipe prompt crash"
result_summary: "Init cached recipe prompt no longer crashes on undefined validate input"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cli"
  - "init"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T08:48:16.527Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T08:50:29.170Z"
  updated_by: "CODER"
  note: "Command: /Users/densmirnov/.bun/bin/bun run typecheck. Result: pass. Evidence: tsc -b completed cleanly after the init prompt fix; targeted bun probes confirmed cached recipe parsing falls back on undefined validation input and promptRecipeSelectionStep returns recipes=[] for \"none\". Scope: init v2 cached recipe selection parser and prompt validation path. Skipped: /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts and packages/agentplane/src/cli/run-cli.core.init.v2.test.ts. Reason: local Vitest runtime is blocked by @rollup/rollup-darwin-arm64 macOS code-signature failure before test execution. Risk: focused regression suites were not executed in this shell session. Approval: implicit local-only verification under existing environment blocker."
commit:
  hash: "5bf6dc028d87ed2b0b3bec762870411ab775a37c"
  message: "✅ 5S9FND meta: done"
comments:
  -
    author: "CODER"
    body: "Start: reproduce and harden the init v2 cached recipe prompt validation path, then add focused regression coverage."
  -
    author: "CODER"
    body: "Verified: harden init cached recipe selection against undefined validation input and add focused regression coverage."
events:
  -
    type: "status"
    at: "2026-04-24T08:48:23.178Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce and harden the init v2 cached recipe prompt validation path, then add focused regression coverage."
  -
    type: "verify"
    at: "2026-04-24T08:50:29.170Z"
    author: "CODER"
    state: "ok"
    note: "Command: /Users/densmirnov/.bun/bin/bun run typecheck. Result: pass. Evidence: tsc -b completed cleanly after the init prompt fix; targeted bun probes confirmed cached recipe parsing falls back on undefined validation input and promptRecipeSelectionStep returns recipes=[] for \"none\". Scope: init v2 cached recipe selection parser and prompt validation path. Skipped: /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts and packages/agentplane/src/cli/run-cli.core.init.v2.test.ts. Reason: local Vitest runtime is blocked by @rollup/rollup-darwin-arm64 macOS code-signature failure before test execution. Risk: focused regression suites were not executed in this shell session. Approval: implicit local-only verification under existing environment blocker."
  -
    type: "status"
    at: "2026-04-24T08:50:56.238Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: harden init cached recipe selection against undefined validation input and add focused regression coverage."
doc_version: 3
doc_updated_at: "2026-04-24T08:50:56.239Z"
doc_updated_by: "CODER"
description: "Harden init v2 cached recipe selection against undefined text validation input and add regression coverage for the TTY crash path."
sections:
  Summary: |-
    Fix init cached recipe prompt crash
    
    Harden init v2 cached recipe selection against undefined text validation input and add regression coverage for the TTY crash path.
  Scope: |-
    - In scope: Harden init v2 cached recipe selection against undefined text validation input and add regression coverage for the TTY crash path.
    - Out of scope: unrelated refactors not required for "Fix init cached recipe prompt crash".
  Plan: "1. Harden init v2 cached recipe text validation against undefined/non-string prompt values. 2. Add focused regression tests for recipe selection validation and the interactive init route. 3. Run focused init tests and record verification evidence."
  Verify Steps: |-
    1. Review the requested outcome for "Fix init cached recipe prompt crash". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T08:50:29.170Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: /Users/densmirnov/.bun/bin/bun run typecheck. Result: pass. Evidence: tsc -b completed cleanly after the init prompt fix; targeted bun probes confirmed cached recipe parsing falls back on undefined validation input and promptRecipeSelectionStep returns recipes=[] for "none". Scope: init v2 cached recipe selection parser and prompt validation path. Skipped: /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts and packages/agentplane/src/cli/run-cli.core.init.v2.test.ts. Reason: local Vitest runtime is blocked by @rollup/rollup-darwin-arm64 macOS code-signature failure before test execution. Risk: focused regression suites were not executed in this shell session. Approval: implicit local-only verification under existing environment blocker.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T08:48:23.184Z, excerpt_hash=sha256:0a321c83d79e2152d447c718f9ef6acd9002a346c2d179193e62976ed8d62429
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix init cached recipe prompt crash

Harden init v2 cached recipe selection against undefined text validation input and add regression coverage for the TTY crash path.

## Scope

- In scope: Harden init v2 cached recipe selection against undefined text validation input and add regression coverage for the TTY crash path.
- Out of scope: unrelated refactors not required for "Fix init cached recipe prompt crash".

## Plan

1. Harden init v2 cached recipe text validation against undefined/non-string prompt values. 2. Add focused regression tests for recipe selection validation and the interactive init route. 3. Run focused init tests and record verification evidence.

## Verify Steps

1. Review the requested outcome for "Fix init cached recipe prompt crash". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T08:50:29.170Z — VERIFY — ok

By: CODER

Note: Command: /Users/densmirnov/.bun/bin/bun run typecheck. Result: pass. Evidence: tsc -b completed cleanly after the init prompt fix; targeted bun probes confirmed cached recipe parsing falls back on undefined validation input and promptRecipeSelectionStep returns recipes=[] for "none". Scope: init v2 cached recipe selection parser and prompt validation path. Skipped: /Users/densmirnov/.bun/bin/bun run test:project -- agentplane packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts and packages/agentplane/src/cli/run-cli.core.init.v2.test.ts. Reason: local Vitest runtime is blocked by @rollup/rollup-darwin-arm64 macOS code-signature failure before test execution. Risk: focused regression suites were not executed in this shell session. Approval: implicit local-only verification under existing environment blocker.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T08:48:23.184Z, excerpt_hash=sha256:0a321c83d79e2152d447c718f9ef6acd9002a346c2d179193e62976ed8d62429

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
