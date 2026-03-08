---
id: "202603061414-F0B4QD"
title: "Refresh CLI reference and publish site"
result_summary: "The generated CLI reference now matches the current dist help/spec output, removing the final pre-push blocker for publishing the current website state."
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T14:14:33.090Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-06T14:15:15.916Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx, bunx prettier --write docs/user/cli-reference.generated.mdx, and bun run docs:cli:check now pass."
commit:
  hash: "dee2df13914e4d3527a3aff76e0668c79dd4f3ef"
  message: "📝 F0B4QD docs: refresh generated CLI reference"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: commit the regenerated CLI reference required by pre-push, then push main and verify the website publication workflows."
  -
    author: "ORCHESTRATOR"
    body: "Verified: generated CLI reference is refreshed and the freshness gate passes; main push can now proceed to site publication."
events:
  -
    type: "status"
    at: "2026-03-06T14:14:37.232Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: commit the regenerated CLI reference required by pre-push, then push main and verify the website publication workflows."
  -
    type: "verify"
    at: "2026-03-06T14:15:15.916Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Verified: node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx, bunx prettier --write docs/user/cli-reference.generated.mdx, and bun run docs:cli:check now pass."
  -
    type: "status"
    at: "2026-03-06T14:15:28.601Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: generated CLI reference is refreshed and the freshness gate passes; main push can now proceed to site publication."
doc_version: 3
doc_updated_at: "2026-03-06T14:15:28.601Z"
doc_updated_by: "ORCHESTRATOR"
description: "Commit the regenerated CLI reference required by pre-push after recent CLI help/policy changes, then push main and verify Docs CI / Pages Deploy."
id_source: "generated"
---
## Summary

Refresh CLI reference and publish site

Commit the regenerated CLI reference required by pre-push after recent CLI help/policy changes, then push main and verify Docs CI / Pages Deploy.

## Scope

- In scope: Commit the regenerated CLI reference required by pre-push after recent CLI help/policy changes, then push main and verify Docs CI / Pages Deploy..
- Out of scope: unrelated refactors not required for "Refresh CLI reference and publish site".

## Plan

1. Regenerate and commit docs/user/cli-reference.generated.mdx so the CLI docs freshness gate passes.\n2. Re-run the local gate relevant to the publish path.\n3. Push main and confirm Docs CI plus Pages Deploy succeeded for the current site.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T14:15:15.916Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx, bunx prettier --write docs/user/cli-reference.generated.mdx, and bun run docs:cli:check now pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T14:14:37.232Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
