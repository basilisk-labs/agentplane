---
id: "202602081636-JE2E5Y"
title: "Docs: sync help/docs with current CLI (verify/init)"
result_summary: "Docs synced with current CLI help/spec"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "cli"
  - "help"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T16:38:07.136Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user (2026-02-08)"
verification:
  state: "ok"
  updated_at: "2026-02-08T16:43:29.171Z"
  updated_by: "ORCHESTRATOR"
  note: "Docs aligned with cli2 help/spec; generated CLI reference; bun test:cli:core passed"
commit:
  hash: "0cb69cc4cc806bb43d331ed1cebff16d647d0505"
  message: "✅ JE2E5Y docs: Align docs with cli2 help/spec"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: auditing docs/help vs cli2 registry/spec; will update verify/init wording and examples and add generated CLI reference."
  -
    author: "ORCHESTRATOR"
    body: "Verified: docs aligned with cli2 help/spec; generated CLI reference; bun test:cli:core passed"
events:
  -
    type: "status"
    at: "2026-02-08T16:38:13.510Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing docs/help vs cli2 registry/spec; will update verify/init wording and examples and add generated CLI reference."
  -
    type: "verify"
    at: "2026-02-08T16:43:29.171Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Docs aligned with cli2 help/spec; generated CLI reference; bun test:cli:core passed"
  -
    type: "status"
    at: "2026-02-08T16:46:34.669Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs aligned with cli2 help/spec; generated CLI reference; bun test:cli:core passed"
doc_version: 2
doc_updated_at: "2026-02-08T16:46:34.669Z"
doc_updated_by: "ORCHESTRATOR"
description: "Audit and fix documentation drift vs cli2 registry/spec; clarify verify semantics (record vs run), update examples/flags, and add generated CLI reference."
id_source: "generated"
---
## Summary

Audit and fix documentation drift vs the current agentplane CLI (cli2 registry/spec), focusing on `verify` semantics (record-only vs executing commands during integrate) and `init` / common command examples.

## Scope

In scope:
- `docs/user/*` and `docs/help/*` wording and examples that reference CLI behavior.
- Root `README.md` and `packages/agentplane/README.md` quickstart examples.
- Add/update a generated CLI reference doc derived from `agentplane help --json` / cli2 registry.

Out of scope:
- Changing CLI behavior or the CLI contract.
- Renaming command ids or removing commands.

## Plan

Sync docs with current cli2 help/spec; clarify verify semantics and update init/verify examples; add generated CLI reference and link it.

## Risks

- Docs may conflate direct vs branch_pr behavior; ensure wording is explicit per mode.
- Generated CLI reference can drift if not regenerated; keep it clearly labeled as generated and derived from cli2.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T16:43:29.171Z — VERIFY — ok

By: ORCHESTRATOR

Note: Docs aligned with cli2 help/spec; generated CLI reference; bun test:cli:core passed

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T16:38:13.510Z, excerpt_hash=sha256:ed6256557a9caf23828e89f39b5fee4b9633ad3bb1c72a08002901b67d2828ee

Details:

Updated docs/help + docs/user + packages/agentplane/README.md. Generated docs/user/cli-reference.generated.mdx via agentplane docs cli. Verified by running bun run test:cli:core (passed).

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commit created by this task (docs-only changes). Delete docs/user/cli-reference.generated.mdx if added and revert doc wording to previous state.

## Verify Steps

Pass criteria:
- `docs/user/*` and `docs/help/*` do not claim that `agentplane verify` runs checks.
- Docs do not mention nonexistent flags (e.g. `verify --require`, `verify --skip-if-unchanged`).
- Examples for `init` and `verify` match `agentplane help init` and `agentplane help verify`.
- A CLI reference doc is generated from cli2 (`agentplane docs cli`).

Checks to run:
- `node packages/agentplane/bin/agentplane.js help init`
- `node packages/agentplane/bin/agentplane.js help verify`
- `node packages/agentplane/bin/agentplane.js help integrate`
- `node packages/agentplane/bin/agentplane.js docs cli --out docs/user/cli-reference.generated.mdx`
- `bun run test:cli:core`
