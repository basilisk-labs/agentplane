---
id: "202603241404-9A2V24"
title: "Refresh generated CLI reference after runner subcommands drift"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "cli"
  - "generated"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T14:04:58.434Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T14:05:47.316Z"
  updated_by: "DOCS"
  note: "ok: regenerated docs/user/cli-reference.generated.mdx, confirmed the new runner subcommands appear in the generated reference, and passed check-cli-reference-fresh."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: regenerate the generated CLI reference, keep the diff limited to docs/user/cli-reference.generated.mdx, and clear the pre-push docs:cli:check blocker before retrying the push."
events:
  -
    type: "status"
    at: "2026-03-24T14:05:10.787Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate the generated CLI reference, keep the diff limited to docs/user/cli-reference.generated.mdx, and clear the pre-push docs:cli:check blocker before retrying the push."
  -
    type: "verify"
    at: "2026-03-24T14:05:47.316Z"
    author: "DOCS"
    state: "ok"
    note: "ok: regenerated docs/user/cli-reference.generated.mdx, confirmed the new runner subcommands appear in the generated reference, and passed check-cli-reference-fresh."
doc_version: 3
doc_updated_at: "2026-03-24T14:05:47.332Z"
doc_updated_by: "DOCS"
description: "Regenerate docs/user/cli-reference.generated.mdx so pre-push docs:cli:check matches the current shipped command catalog, including task run show/tail/trace."
sections:
  Summary: |-
    Refresh generated CLI reference after runner subcommands drift
    
    Regenerate docs/user/cli-reference.generated.mdx so pre-push docs:cli:check matches the current shipped command catalog, including task run show/tail/trace.
  Scope: |-
    - In scope: Regenerate docs/user/cli-reference.generated.mdx so pre-push docs:cli:check matches the current shipped command catalog, including task run show/tail/trace.
    - Out of scope: unrelated refactors not required for "Refresh generated CLI reference after runner subcommands drift".
  Plan: |-
    1. Regenerate docs/user/cli-reference.generated.mdx from the current CLI command catalog.
    2. Verify the diff is limited to the generated CLI reference content for the shipped runner subcommands.
    3. Rerun docs CLI freshness and then push main again.
  Verify Steps: |-
    1. Run bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx and confirm the generated file updates.
    2. Run node scripts/check-cli-reference-fresh.mjs and confirm it reports the CLI reference as up to date.
    3. Re-run git push origin main and confirm pre-push no longer blocks on docs:cli:check.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T14:05:47.316Z — VERIFY — ok
    
    By: DOCS
    
    Note: ok: regenerated docs/user/cli-reference.generated.mdx, confirmed the new runner subcommands appear in the generated reference, and passed check-cli-reference-fresh.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:05:46.747Z, excerpt_hash=sha256:d70e7b1937649027f85cad9232746e3a421719468722e003b5fee52bd3481dc1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. Regenerated docs/user/cli-reference.generated.mdx from the current command catalog.
    2. The generated reference now includes task run show, task run tail, and task run trace, which was the exact freshness delta blocking pre-push.
id_source: "generated"
---
## Summary

Refresh generated CLI reference after runner subcommands drift

Regenerate docs/user/cli-reference.generated.mdx so pre-push docs:cli:check matches the current shipped command catalog, including task run show/tail/trace.

## Scope

- In scope: Regenerate docs/user/cli-reference.generated.mdx so pre-push docs:cli:check matches the current shipped command catalog, including task run show/tail/trace.
- Out of scope: unrelated refactors not required for "Refresh generated CLI reference after runner subcommands drift".

## Plan

1. Regenerate docs/user/cli-reference.generated.mdx from the current CLI command catalog.
2. Verify the diff is limited to the generated CLI reference content for the shipped runner subcommands.
3. Rerun docs CLI freshness and then push main again.

## Verify Steps

1. Run bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx and confirm the generated file updates.
2. Run node scripts/check-cli-reference-fresh.mjs and confirm it reports the CLI reference as up to date.
3. Re-run git push origin main and confirm pre-push no longer blocks on docs:cli:check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T14:05:47.316Z — VERIFY — ok

By: DOCS

Note: ok: regenerated docs/user/cli-reference.generated.mdx, confirmed the new runner subcommands appear in the generated reference, and passed check-cli-reference-fresh.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T14:05:46.747Z, excerpt_hash=sha256:d70e7b1937649027f85cad9232746e3a421719468722e003b5fee52bd3481dc1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Regenerated docs/user/cli-reference.generated.mdx from the current command catalog.
2. The generated reference now includes task run show, task run tail, and task run trace, which was the exact freshness delta blocking pre-push.
