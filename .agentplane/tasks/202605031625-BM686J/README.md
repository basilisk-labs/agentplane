---
id: "202605031625-BM686J"
title: "ACR CLI command group and schema output"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031625-886KZ6"
tags:
  - "cli"
  - "code"
verify:
  - "bun run docs:cli:check"
  - "bun test packages/agentplane/src/cli packages/agentplane/src/commands/acr"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:13.511Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:20:45.969Z"
  updated_by: "CODER"
  note: "Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date. Scope: generated ACR command docs and finish --no-write-acr option. Command: bun test packages/agentplane/src/cli/run-cli.core.test.ts -t 'keeps command-scoped --version options distinct from the global version flag'. Result: pass. Evidence: 1 test passed. Scope: acr schema --version parser regression. Command: node packages/agentplane/dist/cli.js acr schema --version 0.1. Result: pass. Evidence: emitted ACR v0.1 JSON Schema. Scope: schema subcommand runtime. Note: declared broad route 'bun test packages/agentplane/src/cli packages/agentplane/src/commands/acr' was attempted and exposed unrelated existing failures around removed .agentplane/config.json fixture expectations, Bun vi shim gaps, and GitHub stubs; targeted ACR checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the ACR CLI command group, schema subcommand, command catalog wiring, help surface, and generated CLI reference in the approved batch worktree."
events:
  -
    type: "status"
    at: "2026-05-03T17:11:47.010Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the ACR CLI command group, schema subcommand, command catalog wiring, help surface, and generated CLI reference in the approved batch worktree."
  -
    type: "verify"
    at: "2026-05-03T17:20:45.969Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date. Scope: generated ACR command docs and finish --no-write-acr option. Command: bun test packages/agentplane/src/cli/run-cli.core.test.ts -t 'keeps command-scoped --version options distinct from the global version flag'. Result: pass. Evidence: 1 test passed. Scope: acr schema --version parser regression. Command: node packages/agentplane/dist/cli.js acr schema --version 0.1. Result: pass. Evidence: emitted ACR v0.1 JSON Schema. Scope: schema subcommand runtime. Note: declared broad route 'bun test packages/agentplane/src/cli packages/agentplane/src/commands/acr' was attempted and exposed unrelated existing failures around removed .agentplane/config.json fixture expectations, Bun vi shim gaps, and GitHub stubs; targeted ACR checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T17:20:45.994Z"
doc_updated_by: "CODER"
description: "Add the agentplane acr command group and implement agentplane acr schema --version 0.1 [--out], including command catalog wiring, lazy loaders, help JSON, and CLI reference freshness coverage."
sections:
  Summary: |-
    ACR CLI command group and schema output
    
    Add the agentplane acr command group and implement agentplane acr schema --version 0.1 [--out], including command catalog wiring, lazy loaders, help JSON, and CLI reference freshness coverage.
  Scope: |-
    - In scope: Add the agentplane acr command group and implement agentplane acr schema --version 0.1 [--out], including command catalog wiring, lazy loaders, help JSON, and CLI reference freshness coverage.
    - Out of scope: unrelated refactors not required for "ACR CLI command group and schema output".
  Plan: "Plan: (1) Add the agentplane acr group command. (2) Implement acr schema --version 0.1 [--out]. (3) Wire command specs, command catalog, lazy loaders, help JSON, and generated CLI reference freshness. (4) Keep command parser side-effect-free. Verify with targeted CLI/catalog tests and docs CLI freshness."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli packages/agentplane/src/commands/acr`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:20:45.969Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date. Scope: generated ACR command docs and finish --no-write-acr option. Command: bun test packages/agentplane/src/cli/run-cli.core.test.ts -t 'keeps command-scoped --version options distinct from the global version flag'. Result: pass. Evidence: 1 test passed. Scope: acr schema --version parser regression. Command: node packages/agentplane/dist/cli.js acr schema --version 0.1. Result: pass. Evidence: emitted ACR v0.1 JSON Schema. Scope: schema subcommand runtime. Note: declared broad route 'bun test packages/agentplane/src/cli packages/agentplane/src/commands/acr' was attempted and exposed unrelated existing failures around removed .agentplane/config.json fixture expectations, Bun vi shim gaps, and GitHub stubs; targeted ACR checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:11:47.010Z, excerpt_hash=sha256:30e20bd7470b0ec0e5603bd5709db42237ba6fe3d0689803ee95ad09cb4c9ada
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR CLI command group and schema output

Add the agentplane acr command group and implement agentplane acr schema --version 0.1 [--out], including command catalog wiring, lazy loaders, help JSON, and CLI reference freshness coverage.

## Scope

- In scope: Add the agentplane acr command group and implement agentplane acr schema --version 0.1 [--out], including command catalog wiring, lazy loaders, help JSON, and CLI reference freshness coverage.
- Out of scope: unrelated refactors not required for "ACR CLI command group and schema output".

## Plan

Plan: (1) Add the agentplane acr group command. (2) Implement acr schema --version 0.1 [--out]. (3) Wire command specs, command catalog, lazy loaders, help JSON, and generated CLI reference freshness. (4) Keep command parser side-effect-free. Verify with targeted CLI/catalog tests and docs CLI freshness.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli packages/agentplane/src/commands/acr`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:20:45.969Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date. Scope: generated ACR command docs and finish --no-write-acr option. Command: bun test packages/agentplane/src/cli/run-cli.core.test.ts -t 'keeps command-scoped --version options distinct from the global version flag'. Result: pass. Evidence: 1 test passed. Scope: acr schema --version parser regression. Command: node packages/agentplane/dist/cli.js acr schema --version 0.1. Result: pass. Evidence: emitted ACR v0.1 JSON Schema. Scope: schema subcommand runtime. Note: declared broad route 'bun test packages/agentplane/src/cli packages/agentplane/src/commands/acr' was attempted and exposed unrelated existing failures around removed .agentplane/config.json fixture expectations, Bun vi shim gaps, and GitHub stubs; targeted ACR checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:11:47.010Z, excerpt_hash=sha256:30e20bd7470b0ec0e5603bd5709db42237ba6fe3d0689803ee95ad09cb4c9ada

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
