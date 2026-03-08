---
id: "202603051205-MA6CBP"
title: "Add reason-code taxonomy map and CLI decoding hints"
result_summary: "CLI now emits centralized reason-code decode in text and JSON errors."
risk_level: "low"
status: "DONE"
priority: "med"
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
  updated_at: "2026-03-05T12:07:38.954Z"
  updated_by: "CODER"
  note: "Targeted tests and typecheck passed"
commit:
  hash: "283724e192c9cf1edab760dba7a98206ca6f555d"
  message: "🚧 MA6CBP cli: add reason-code taxonomy map and decode output"
comments:
  -
    author: "CODER"
    body: "Start: implement reason-code taxonomy map and CLI decode output."
  -
    author: "CODER"
    body: "Verified: reason-code taxonomy and CLI decode integrated with tests."
events:
  -
    type: "status"
    at: "2026-03-05T12:06:07.947Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement reason-code taxonomy map and CLI decode output."
  -
    type: "verify"
    at: "2026-03-05T12:07:38.954Z"
    author: "CODER"
    state: "ok"
    note: "Targeted tests and typecheck passed"
  -
    type: "status"
    at: "2026-03-05T12:18:37.180Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: reason-code taxonomy and CLI decode integrated with tests."
doc_version: 3
doc_updated_at: "2026-03-05T12:18:37.180Z"
doc_updated_by: "CODER"
description: "Introduce centralized reason-code metadata and show human-readable decode in CLI errors."
id_source: "generated"
---
## Summary

Added a centralized reason-code taxonomy map and wired CLI error output to include deterministic reason decode in text and JSON modes.

## Scope

In scope: packages/agentplane/src/cli/run-cli.ts, new reason-code map module, JSON error envelope, tests, and workflow-contract docs. Out of scope: changing workflow runtime schema or adding new reconcile gates.

## Plan

1. Add canonical reason-code map module.\n2. Use map in run-cli error writer to print decode details.\n3. Extend JSON error shape with reason_decode.\n4. Update tests and docs.\n5. Run targeted tests and typecheck.

## Verify Steps

1. bun test packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.core.test.ts\n2. bun run --filter=agentplane typecheck\nPass criteria: all commands exit 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T12:07:38.954Z — VERIFY — ok

By: CODER

Note: Targeted tests and typecheck passed

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T12:07:35.119Z, excerpt_hash=sha256:15c36cdddd5a9f530c6ddace8b3aaa1982f48b4d40c36a4f5c3ad6024ce3e3ba

Details:

bun test packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.core.test.ts\nbun run --filter=agentplane typecheck

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commit for task 202603051205-MA6CBP. If needed, remove reason_decode from JSON output and keep prior guidance-only behavior.

## Findings


## Risks

Risk: changing JSON error shape can affect external parsers. Mitigation: add optional field only; keep existing fields unchanged.
