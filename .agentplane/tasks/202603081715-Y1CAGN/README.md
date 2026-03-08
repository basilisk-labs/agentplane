---
id: "202603081715-Y1CAGN"
title: "Bind role help to installed agent profiles"
result_summary: "Bound agentplane role output to installed agent profiles so role help and shipped prompts share one role-specific source, while keeping built-in CLI/runtime guidance as a narrow supplement and preserving fallback behavior."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "agents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T17:15:35.183Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T17:19:27.156Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
    Result: pass
    Evidence: 12 tests passed across command-guide and core role command unit coverage.
    Scope: unified role rendering and JSON/text role command behavior.
    
    Command: bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/commands/core.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
    Result: pass
    Evidence: eslint exited cleanly for touched CLI files.
    Scope: updated command-guide/core implementation and tests.
    
    Command: bun run docs:site:check
    Result: pass
    Evidence: docs site generate/typecheck/build/design checks completed successfully after role/docs wording changes.
    Scope: docs/user/agents.mdx and docs/developer/cli-contract.mdx.
    
    Command: agentplane role CODER
    Result: pass
    Evidence: output now renders one unified CODER block with installed profile sections followed by CLI/runtime notes and no separate Agent profile header.
    Scope: live repo-local role help surface.
commit:
  hash: "f2004a8de9154cc7780defeebd321f8d100712bf"
  message: "🔗 Y1CAGN cli: unify role help with installed profiles"
comments:
  -
    author: "CODER"
    body: "Start: unify role help around installed agent profiles, keep narrow CLI supplements, and preserve safe fallback when no installed profile is available."
  -
    author: "CODER"
    body: "Verified: role help now renders a single installed-profile-first surface with narrow CLI/runtime supplements and updated role JSON payloads."
events:
  -
    type: "status"
    at: "2026-03-08T17:15:38.440Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify role help around installed agent profiles, keep narrow CLI supplements, and preserve safe fallback when no installed profile is available."
  -
    type: "verify"
    at: "2026-03-08T17:19:27.156Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
      Result: pass
      Evidence: 12 tests passed across command-guide and core role command unit coverage.
      Scope: unified role rendering and JSON/text role command behavior.
      
      Command: bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/commands/core.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
      Result: pass
      Evidence: eslint exited cleanly for touched CLI files.
      Scope: updated command-guide/core implementation and tests.
      
      Command: bun run docs:site:check
      Result: pass
      Evidence: docs site generate/typecheck/build/design checks completed successfully after role/docs wording changes.
      Scope: docs/user/agents.mdx and docs/developer/cli-contract.mdx.
      
      Command: agentplane role CODER
      Result: pass
      Evidence: output now renders one unified CODER block with installed profile sections followed by CLI/runtime notes and no separate Agent profile header.
      Scope: live repo-local role help surface.
  -
    type: "status"
    at: "2026-03-08T17:21:26.607Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: role help now renders a single installed-profile-first surface with narrow CLI/runtime supplements and updated role JSON payloads."
doc_version: 3
doc_updated_at: "2026-03-08T17:21:26.607Z"
doc_updated_by: "CODER"
description: "Refactor agentplane role output so installed .agentplane/agents JSON profiles become the primary source for role help, with static CLI/runtime deltas layered on top to reduce drift between prompts and CLI guidance."
id_source: "generated"
---
## Summary

Bind role help to installed agent profiles

Refactor agentplane role output so installed .agentplane/agents JSON profiles become the primary source for role help, with static CLI/runtime deltas layered on top to reduce drift between prompts and CLI guidance.

## Scope

- In scope: Refactor agentplane role output so installed .agentplane/agents JSON profiles become the primary source for role help, with static CLI/runtime deltas layered on top to reduce drift between prompts and CLI guidance.
- Out of scope: unrelated refactors not required for "Bind role help to installed agent profiles".

## Plan

1. Refactor role rendering so installed .agentplane/agents/<ROLE>.json becomes the primary role-help source and static CLI guidance becomes a narrow supplement.
2. Update role command execution and JSON output so text/help surfaces stay unified while preserving fallback behavior when no installed profile is available.
3. Refresh targeted tests and any touched docs/help surfaces, then verify the new role contract end-to-end.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts. Expected: role rendering and role command behavior pass with the installed-profile-first contract.
2. Run bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/commands/core.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts. Expected: touched CLI files pass lint cleanly.
3. Run agentplane role CODER and inspect the output shape. Expected: a single unified help surface reflects the installed agent profile plus narrow CLI/runtime supplements without a separate drift-prone profile block.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T17:19:27.156Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
Result: pass
Evidence: 12 tests passed across command-guide and core role command unit coverage.
Scope: unified role rendering and JSON/text role command behavior.

Command: bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/run-cli/commands/core.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
Result: pass
Evidence: eslint exited cleanly for touched CLI files.
Scope: updated command-guide/core implementation and tests.

Command: bun run docs:site:check
Result: pass
Evidence: docs site generate/typecheck/build/design checks completed successfully after role/docs wording changes.
Scope: docs/user/agents.mdx and docs/developer/cli-contract.mdx.

Command: agentplane role CODER
Result: pass
Evidence: output now renders one unified CODER block with installed profile sections followed by CLI/runtime notes and no separate Agent profile header.
Scope: live repo-local role help surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T17:15:38.440Z, excerpt_hash=sha256:cbc070baa34b61181d48ba8fef5b88fec01027aced244be995820c94f49cd390

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
