---
id: "202603111910-SHZ4ZD"
title: "Restyle init welcome dialog with OpenClaw framing"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-03-11T19:11:38.841Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved for the user-requested init welcome UI restyle with no scope expansion."
verification:
  state: "ok"
  updated_at: "2026-03-11T19:16:13.201Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts; Result: pass; Evidence: 2 tests passed. Scope: init UI renderer/tests. Command: bun --eval renderInitWelcome/renderInitSection sanity-check; Result: pass; Evidence: rendered framed rail layout matched the intended style. Scope: terminal presentation sanity-check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the OpenClaw-style framed welcome block for init UI."
events:
  -
    type: "status"
    at: "2026-03-11T19:11:46.706Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the OpenClaw-style framed welcome block for init UI."
  -
    type: "verify"
    at: "2026-03-11T19:16:13.201Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts; Result: pass; Evidence: 2 tests passed. Scope: init UI renderer/tests. Command: bun --eval renderInitWelcome/renderInitSection sanity-check; Result: pass; Evidence: rendered framed rail layout matched the intended style. Scope: terminal presentation sanity-check."
doc_version: 3
doc_updated_at: "2026-03-11T19:16:13.203Z"
doc_updated_by: "CODER"
description: "Update the interactive init welcome screen to add a framed, left-rail terminal callout after the ASCII art."
id_source: "generated"
---
## Summary

Refresh the interactive init welcome screen so it shows an OpenClaw-style framed terminal callout immediately after the existing ASCII art.

## Scope

In scope: the init welcome renderer and its unit tests for terminal layout, ANSI-safe alignment, and presence of the new framed block. Out of scope: init flow logic, flags, auth behavior, and non-init CLI output.

## Plan

1. Update the init welcome renderer to add an OpenClaw-like framed callout with a left rail, colored title treatment, and ANSI-safe box drawing after the ASCII logo.\n2. Extend the init UI tests to assert the new structure and preserve width alignment with colors enabled.\n3. Run the targeted init UI test command and record the result in task verification.

## Verify Steps

1. Run 
 RUN  v4.0.18 /Users/densmirnov/Github/agentplane

 ✓ packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts (1 test) 3ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  02:11:13
   Duration  194ms (transform 35ms, setup 0ms, import 48ms, tests 3ms, environment 0ms). Expected: the init UI tests pass and confirm ANSI-safe alignment for the framed welcome block.\n2. Review the rendered welcome string structure in tests/manual output. Expected: the ASCII art is followed by a left-rail framed callout with distinct title, border, and body styling.

## Verification

- Command: bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts
- Result: pass
- Evidence: 2 tests passed; the new framed welcome block keeps ANSI-safe width alignment and section styling is asserted.
- Scope: packages/agentplane/src/cli/run-cli/commands/init/ui.ts and packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts

- Command: bun --eval renderInitWelcome/renderInitSection sanity-check
- Result: pass
- Evidence: rendered output shows the ASCII art followed by a left-rail framed callout and themed section headers.
- Scope: terminal presentation sanity-check for the interactive init flow.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-11T19:16:13.201Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts; Result: pass; Evidence: 2 tests passed. Scope: init UI renderer/tests. Command: bun --eval renderInitWelcome/renderInitSection sanity-check; Result: pass; Evidence: rendered framed rail layout matched the intended style. Scope: terminal presentation sanity-check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-11T19:16:05.236Z, excerpt_hash=sha256:8d933793ca7a7afa90001d7a2f22f6ada67015eecee7eafc1863cee5f50a16c4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the init welcome renderer and its test updates so the interactive init screen returns to the previous plain box layout if the new framing causes readability or alignment regressions.

## Findings
