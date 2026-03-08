---
id: "202603081051-E9GGZE"
title: "Sync generated CLI reference after README v3 task template rollout"
result_summary: "The generated CLI reference is back in sync with the current task creation/help text, so pre-push no longer fails on docs cli freshness."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T10:52:03.615Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T10:52:59.126Z"
  updated_by: "DOCS"
  note: "Generated CLI reference now matches the README v3 task creation summary; the diff is limited to docs/user/cli-reference.generated.mdx and the freshness check passes."
commit:
  hash: "32a5647282956cf033a0c42aa1050020510cbc1f"
  message: "📝 E9GGZE task: sync generated CLI reference for README v3"
comments:
  -
    author: "DOCS"
    body: "Start: regenerate the generated CLI reference for the README v3 task template/help text and clear the pre-push blocker."
  -
    author: "DOCS"
    body: "Verified: docs/user/cli-reference.generated.mdx now reflects the README v3 task creation summary, and the CLI reference freshness check passes again."
events:
  -
    type: "status"
    at: "2026-03-08T10:52:07.886Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate the generated CLI reference for the README v3 task template/help text and clear the pre-push blocker."
  -
    type: "verify"
    at: "2026-03-08T10:52:59.126Z"
    author: "DOCS"
    state: "ok"
    note: "Generated CLI reference now matches the README v3 task creation summary; the diff is limited to docs/user/cli-reference.generated.mdx and the freshness check passes."
  -
    type: "status"
    at: "2026-03-08T10:53:42.485Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs/user/cli-reference.generated.mdx now reflects the README v3 task creation summary, and the CLI reference freshness check passes again."
doc_version: 2
doc_updated_at: "2026-03-08T10:53:42.485Z"
doc_updated_by: "DOCS"
description: "Regenerate and commit docs/user/cli-reference.generated.mdx so pre-push reflects the README v3 task creation/help text introduced by recent task template changes."
id_source: "generated"
---
## Summary

Sync generated CLI reference after README v3 task template rollout

Regenerate and commit docs/user/cli-reference.generated.mdx so pre-push reflects the README v3 task creation/help text introduced by recent task template changes.

## Scope

- In scope: Regenerate and commit docs/user/cli-reference.generated.mdx so pre-push reflects the README v3 task creation/help text introduced by recent task template changes..
- Out of scope: unrelated refactors not required for "Sync generated CLI reference after README v3 task template rollout".

## Plan

1. Regenerate docs/user/cli-reference.generated.mdx from the current CLI dist so task creation/help text reflects README v3 defaults.
2. Verify the diff is limited to the expected README v3 task surfaces and rerun the CLI freshness check.
3. Record verification, finish the task, and push main once pre-push passes.

## Verify Steps

1. Run `node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx` and `bunx prettier --write docs/user/cli-reference.generated.mdx`. Expected: the generated reference updates without command errors.
2. Inspect the diff in `docs/user/cli-reference.generated.mdx`. Expected: changes are limited to README v3 task creation/help text and related section wording.
3. Run `node scripts/check-cli-reference-fresh.mjs`. Expected: the CLI reference freshness check passes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T10:52:59.126Z — VERIFY — ok

By: DOCS

Note: Generated CLI reference now matches the README v3 task creation summary; the diff is limited to docs/user/cli-reference.generated.mdx and the freshness check passes.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T10:52:34.436Z, excerpt_hash=sha256:c465fa4bf7b02280707946a1c724a6e9d35797f31d29ba69e821d589603ca087

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
