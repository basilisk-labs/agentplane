---
id: "202603081731-DYC4GW"
title: "Remove repo-only bootstrap references from install surfaces"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "install"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T17:35:06.923Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T17:43:14.859Z"
  updated_by: "CODER"
  note: "Verified install-first startup contract: quickstart/role surfaces are self-contained; bootstrap docs remain docs-site only; AGENTS/runtime checks pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove repo-only bootstrap doc references from installed runtime surfaces, keep docs bootstrap generation as a docs-only artifact, and lock the new install-first contract with targeted checks."
events:
  -
    type: "status"
    at: "2026-03-08T17:35:11.076Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove repo-only bootstrap doc references from installed runtime surfaces, keep docs bootstrap generation as a docs-only artifact, and lock the new install-first contract with targeted checks."
  -
    type: "verify"
    at: "2026-03-08T17:43:14.859Z"
    author: "CODER"
    state: "ok"
    note: "Verified install-first startup contract: quickstart/role surfaces are self-contained; bootstrap docs remain docs-site only; AGENTS/runtime checks pass."
doc_version: 3
doc_updated_at: "2026-03-08T17:43:14.860Z"
doc_updated_by: "CODER"
description: "Treat npm-installed agentplane as the primary product surface by removing runtime/help/managed-file references to docs artifacts that are not shipped in the npm package or installed into user repositories."
id_source: "generated"
---
## Summary

Remove repo-only bootstrap references from install surfaces

Treat npm-installed agentplane as the primary product surface by removing runtime/help/managed-file references to docs artifacts that are not shipped in the npm package or installed into user repositories.

## Scope

- In scope: Treat npm-installed agentplane as the primary product surface by removing runtime/help/managed-file references to docs artifacts that are not shipped in the npm package or installed into user repositories.
- Out of scope: unrelated refactors not required for "Remove repo-only bootstrap references from install surfaces".

## Plan

1. Replace repo-only bootstrap references in installed runtime surfaces so quickstart, role guidance, and managed AGENTS.md are self-contained for npm-installed users.
2. Keep docs-site bootstrap generation intact, but update drift checks and docs wording so the generated page remains a docs artifact rather than an installed runtime dependency.
3. Add or refresh targeted tests/checks that lock the new install-first startup contract.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts. Expected: quickstart and role surfaces pass with the install-first startup contract.
2. Run bun run lint:core -- packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts scripts/check-agent-bootstrap-fresh.mjs scripts/check-agent-onboarding-scenario.mjs. Expected: touched CLI/check scripts lint cleanly.
3. Run bun run docs:bootstrap:check and agentplane quickstart. Expected: docs bootstrap generation still stays fresh, while runtime quickstart no longer points to repo-only docs paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T17:43:14.859Z — VERIFY — ok

By: CODER

Note: Verified install-first startup contract: quickstart/role surfaces are self-contained; bootstrap docs remain docs-site only; AGENTS/runtime checks pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T17:35:11.076Z, excerpt_hash=sha256:1f08e8cad7ef6c322776ea5e11dbe8dc65e57dcf081a42df83b719e5f8fe827e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
