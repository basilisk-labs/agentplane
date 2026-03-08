---
id: "202603051514-1J8WX9"
title: "Install policy templates with init"
result_summary: "Init/upgrade now support bundled policy templates"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T15:19:09.002Z"
  updated_by: "CODER"
  note: "Verified: init now installs policy templates from assets; sync checks pass; upgrade accepts policy managed paths; targeted init/upgrade/template tests pass."
commit:
  hash: "296dce95e2873cb72265b1f742c7d16de25c87c2"
  message: "✨ 1J8WX9 init: install policy templates from assets"
comments:
  -
    author: "CODER"
    body: "Start: implement policy template installation via assets+init with sync checks and upgrade allowlist support."
  -
    author: "CODER"
    body: "Verified: agentplane init now installs .agentplane/policy templates from bundled assets; sync checks, init tests, and upgrade policy-path regression pass."
events:
  -
    type: "status"
    at: "2026-03-05T15:14:52.068Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement policy template installation via assets+init with sync checks and upgrade allowlist support."
  -
    type: "verify"
    at: "2026-03-05T15:19:09.002Z"
    author: "CODER"
    state: "ok"
    note: "Verified: init now installs policy templates from assets; sync checks pass; upgrade accepts policy managed paths; targeted init/upgrade/template tests pass."
  -
    type: "status"
    at: "2026-03-05T15:22:20.784Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: agentplane init now installs .agentplane/policy templates from bundled assets; sync checks, init tests, and upgrade policy-path regression pass."
doc_version: 3
doc_updated_at: "2026-03-05T15:22:20.784Z"
doc_updated_by: "CODER"
description: "Ship .agentplane/policy templates in assets and ensure agentplane init installs them, with sync/tests and upgrade path allowlist updates."
id_source: "generated"
---
## Summary

Ensure agentplane installation includes policy templates by shipping them in assets and copying them into .agentplane/policy during init.

## Scope

In scope: assets/policy templates, init install logic, sync/check scripts, upgrade allowlist+manifest entries, and targeted tests. Out of scope: redesigning policy content semantics.

## Plan

1) Add policy templates under packages/agentplane/assets/policy. 2) Extend template loader and init installer to copy policy files into .agentplane/policy. 3) Extend sync script and gitignore runtime lines for policy templates. 4) Update framework manifest and upgrade allowlist for policy paths. 5) Add regression tests for assets sync, init install, and upgrade acceptance.

## Verify Steps

Run: bun run policy:routing:check; bun run agents:check; bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts. Expected: init installs policy files, sync checks pass, and upgrade path accepts policy templates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T15:19:09.002Z — VERIFY — ok

By: CODER

Note: Verified: init now installs policy templates from assets; sync checks pass; upgrade accepts policy managed paths; targeted init/upgrade/template tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T15:19:01.875Z, excerpt_hash=sha256:c811524e9b7d47536c1239860f4f6709d8a26b2a24aa98fcf71d3e65a261bfa9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings

### Approvals / Overrides
- None.

### Decisions
- Policy templates are promoted to managed assets under packages/agentplane/assets/policy.
- `agentplane init` now installs `.agentplane/policy/**` alongside AGENTS and agent JSON files.
- Upgrade allowlist and framework manifest were extended for `.agentplane/policy/*` paths.

### Implementation Notes
- Added `loadPolicyTemplates()` with recursive loading from assets/policy.
- Extended init `ensureAgentsFiles()` to install policy templates and seed baseline snapshots.
- Extended `scripts/sync-agent-templates.mjs` to check/sync policy tree in addition to agents JSON.
- Updated runtime gitignore template lines to include `.agentplane/policy/` and policy backup patterns.
- Added policy entries into `packages/agentplane/assets/framework.manifest.json`.
- Extended upgrade path allowlist in `upgrade.ts` for `.agentplane/policy/*.md|*.ts`.

### Evidence / Links
- bun run agents:check
- bun run policy:routing:check
- bun test packages/agentplane/src/agents/agents-template.test.ts
- bun test packages/agentplane/src/commands/upgrade.merge.test.ts
- bun test packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts -t "init --yes creates baseline project files|init --gitignore-agents updates .gitignore and skips the install commit|init writes AGENTS.md and agent templates for direct mode"
- bunx eslint packages/agentplane/src/agents/agents-template.ts packages/agentplane/src/cli/run-cli/commands/init/write-agents.ts scripts/sync-agent-templates.mjs packages/agentplane/src/shared/runtime-artifacts.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts

## Risks

Risk 1: init behavior drift in existing tests. Mitigation: add explicit init tests for policy files. Risk 2: upgrade path rejects new policy managed files. Mitigation: update allowlist and framework manifest together.
