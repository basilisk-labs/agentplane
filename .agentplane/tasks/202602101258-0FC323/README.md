---
id: "202602101258-0FC323"
title: "T5: agentplane role reads .agentplane/agents profiles"
result_summary: "agentplane role works for JSON-defined roles (e.g. UPGRADER) within a project."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101258-P8B15P"
  - "202602101258-80YBTW"
tags:
  - "code"
  - "cli"
  - "ux"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T13:40:54.442Z"
  updated_by: "TESTER"
  note: "Verified: role command renders JSON agent profiles from .agentplane/agents when built-in guide is missing; unknown role message includes discovered roles; tests and lint passed."
commit:
  hash: "0a83fa8dac59332d087e0ce7cdf67b0da89822d6"
  message: "🚧 0FC323 cli: role renders .agentplane/agents profiles"
comments:
  -
    author: "CODER"
    body: "Start: Extend role command to render JSON agent profiles from .agentplane/agents when built-in guide is missing, and improve unknown-role UX."
  -
    author: "CODER"
    body: "Verified: role now renders .agentplane/agents/ROLE.json profiles when built-in guide is missing, and unknown role messages include discovered profile roles; lint and tests passed."
events:
  -
    type: "status"
    at: "2026-02-10T13:37:31.638Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extend role command to render JSON agent profiles from .agentplane/agents when built-in guide is missing, and improve unknown-role UX."
  -
    type: "verify"
    at: "2026-02-10T13:40:54.442Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: role command renders JSON agent profiles from .agentplane/agents when built-in guide is missing; unknown role message includes discovered roles; tests and lint passed."
  -
    type: "status"
    at: "2026-02-10T13:44:56.802Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: role now renders .agentplane/agents/ROLE.json profiles when built-in guide is missing, and unknown role messages include discovered profile roles; lint and tests passed."
doc_version: 2
doc_updated_at: "2026-02-10T13:44:56.802Z"
doc_updated_by: "CODER"
description: "Enhance agentplane role command to render roles from .agentplane/agents when not built-in; show combined output when both exist; improve Unknown role message."
id_source: "generated"
---
## Summary

Improve agentplane role so it can render role info from .agentplane/agents/ROLE.json when no built-in guide exists, and show both built-in guide and agent profile when both exist.

## Scope

In scope: packages/agentplane/src/cli/run-cli/commands/core.ts cmdRole; reading .agentplane/agents/*.json when a project is detected; unit tests under packages/agentplane/src/cli/run-cli/commands. Out of scope: changing agent profile schema or command-guide content.

## Plan

1. Inspect current cmdRole implementation. 2. Add best-effort project resolution and agent-profile loading when built-in role guide is missing (or in addition). 3. Render profile fields (id/role/description plus selected sections) in a stable format and print explicit source note. 4. Improve Unknown role error to list built-in roles plus discovered .agentplane/agents roles when available. 5. Add unit tests for JSON-only roles (UPGRADER) and combined output.

## Risks

Risk: changing role output can break snapshot/contract tests. Mitigation: update unit tests explicitly and keep formatting deterministic.

## Verify Steps

Commands:
- bun run test:agentplane packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
- bun run test:agentplane packages/agentplane/src/cli/help.all-commands.contract.test.ts
- bun run lint
Pass criteria:
- agentplane role UPGRADER prints the agent profile when inside a project.
- Unknown role output includes both built-in and JSON profile role lists when a project is detected.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T13:40:54.442Z — VERIFY — ok

By: TESTER

Note: Verified: role command renders JSON agent profiles from .agentplane/agents when built-in guide is missing; unknown role message includes discovered roles; tests and lint passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T13:37:31.638Z, excerpt_hash=sha256:88b56aef4d57d6782972115d96a45c9cb90556f0548335fb947083b91a2c46e3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the cmdRole changes and updated tests; re-run the same test commands.

## Context

agentplane role currently only uses packages/agentplane/src/cli/command-guide.ts. JSON-defined roles shipped in .agentplane/agents (for example UPGRADER) appear as Unknown, reducing CLI transparency.
