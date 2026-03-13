---
id: "202603130729-VXD8D9"
title: "Clarify protected allow flag semantics in commit help"
result_summary: "Commit help/docs now distinguish standalone protected path scopes from branch-only --allow-base and show protected-scope examples explicitly."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T07:29:53.072Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T07:32:16.062Z"
  updated_by: "CODER"
  note: "Verified commit help/docs semantics: help snapshot and docs-cli contract pass, generated CLI reference is refreshed, and wording now distinguishes standalone protected path scopes from branch-only --allow-base."
commit:
  hash: "24d207da7b37731f9b97239aaf95056c4e7dd2b3"
  message: "📝 VXD8D9 task: clarify protected allow help semantics"
comments:
  -
    author: "CODER"
    body: "Start: clarify commit help so path-scoped protected allow flags are documented as standalone scopes, while --allow-base remains branch-only and non-path-based."
  -
    author: "CODER"
    body: "Verified: commit and guard-commit help now state which protected flags are standalone path scopes, examples show CI-only usage without redundant prefixes, and the generated CLI reference matches the updated command specs."
events:
  -
    type: "status"
    at: "2026-03-13T07:30:08.696Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: clarify commit help so path-scoped protected allow flags are documented as standalone scopes, while --allow-base remains branch-only and non-path-based."
  -
    type: "verify"
    at: "2026-03-13T07:32:16.062Z"
    author: "CODER"
    state: "ok"
    note: "Verified commit help/docs semantics: help snapshot and docs-cli contract pass, generated CLI reference is refreshed, and wording now distinguishes standalone protected path scopes from branch-only --allow-base."
  -
    type: "status"
    at: "2026-03-13T07:32:45.906Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: commit and guard-commit help now state which protected flags are standalone path scopes, examples show CI-only usage without redundant prefixes, and the generated CLI reference matches the updated command specs."
doc_version: 3
doc_updated_at: "2026-03-13T07:32:45.908Z"
doc_updated_by: "CODER"
description: "Update commit/guard help and docs so path-scoped protected flags are documented as standalone scope selectors, while --allow-base remains branch-only and not a path allowlist."
id_source: "generated"
---
## Summary

Clarify protected allow flag semantics in commit help

Update commit/guard help and docs so path-scoped protected flags are documented as standalone scope selectors, while --allow-base remains branch-only and not a path allowlist.

## Scope

- In scope: Update commit/guard help and docs so path-scoped protected flags are documented as standalone scope selectors, while --allow-base remains branch-only and not a path allowlist.
- Out of scope: unrelated refactors not required for "Clarify protected allow flag semantics in commit help".

## Plan

1. Implement the change for "Clarify protected allow flag semantics in commit help".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: help/docs contracts pass with the new wording.
2. Run `agentplane docs cli --out docs/user/cli-reference.generated.mdx`. Expected: generated CLI reference matches current specs.
3. Run `./node_modules/.bin/prettier --check packages/agentplane/src/commands/commit.spec.ts packages/agentplane/src/commands/guard/commit.command.ts docs/user/commands.mdx docs/user/cli-reference.generated.mdx packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`. Expected: no formatting drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T07:32:16.062Z — VERIFY — ok

By: CODER

Note: Verified commit help/docs semantics: help snapshot and docs-cli contract pass, generated CLI reference is refreshed, and wording now distinguishes standalone protected path scopes from branch-only --allow-base.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T07:30:08.697Z, excerpt_hash=sha256:3a0fb16985e7d04d4edacb329e3d8565f7969ccdb8a14da66e1cc04aba925b1c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
