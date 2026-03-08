---
id: "202603081437-46C0W2"
title: "Sync generated CLI reference after init approval UX change"
result_summary: "The generated CLI reference is synchronized with the init approval UX change, so pre-push no longer fails on stale CLI docs."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603081422-FFKF4E"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:38:03.898Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T14:39:02.189Z"
  updated_by: "DOCS"
  note: "Verified: regenerated docs/user/cli-reference.generated.mdx with the dist CLI, formatted it with Prettier, CLI docs freshness now passes, and docs-site checks remain green."
commit:
  hash: "112086cca91d5a6d5f57f6228dcbc4800bfdead7"
  message: "📝 46C0W2 docs: sync generated CLI reference after init UX change"
comments:
  -
    author: "DOCS"
    body: "Start: regenerating the generated CLI reference after the init approval UX change so the pending init package becomes pushable again without changing runtime behavior further."
  -
    author: "DOCS"
    body: "Verified: regenerated docs/user/cli-reference.generated.mdx with the dist CLI, formatted it with Prettier, CLI docs freshness now passes, and docs-site checks remain green after the init approval UX change."
events:
  -
    type: "status"
    at: "2026-03-08T14:38:04.514Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerating the generated CLI reference after the init approval UX change so the pending init package becomes pushable again without changing runtime behavior further."
  -
    type: "verify"
    at: "2026-03-08T14:39:02.189Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: regenerated docs/user/cli-reference.generated.mdx with the dist CLI, formatted it with Prettier, CLI docs freshness now passes, and docs-site checks remain green."
  -
    type: "status"
    at: "2026-03-08T14:39:15.555Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: regenerated docs/user/cli-reference.generated.mdx with the dist CLI, formatted it with Prettier, CLI docs freshness now passes, and docs-site checks remain green after the init approval UX change."
doc_version: 3
doc_updated_at: "2026-03-08T14:39:15.555Z"
doc_updated_by: "DOCS"
description: "Regenerate docs/user/cli-reference.generated.mdx after the init approval UX change so pre-push no longer fails on CLI docs freshness drift."
id_source: "generated"
---
## Summary

- Problem: the init approval UX change left `docs/user/cli-reference.generated.mdx` stale, so `pre-push` fails on CLI docs freshness.
- Target outcome: regenerate the CLI reference so generated docs match the current init command contract.
- Constraint: keep the change limited to generated CLI reference sync and required verification.

## Scope

### In scope
- regenerate the generated CLI reference
- verify CLI docs freshness
- keep the pending init UX change pushable again

### Out of scope
- additional init behavior changes
- unrelated docs rewrites
- broader CLI help redesign

## Plan

1. Regenerate `docs/user/cli-reference.generated.mdx` from the current CLI spec.
2. Re-run CLI docs freshness and docs-site checks.
3. Close the task and push the pending init UX package.

## Verify Steps

1. Run `agentplane docs cli --out docs/user/cli-reference.generated.mdx` or the dist fallback. Expected: the generated CLI reference updates to the current init contract.
2. Run `node scripts/check-cli-reference-fresh.mjs`. Expected: the freshness check passes.
3. Run `bun run docs:site:check`. Expected: docs build cleanly with the regenerated reference.

## Rollback Plan

1. Revert the generated reference sync commit.
2. Re-run the freshness check to confirm the previous drift is restored only if needed for comparison.

## Findings


## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:39:02.189Z — VERIFY — ok

By: DOCS

Note: Verified: regenerated docs/user/cli-reference.generated.mdx with the dist CLI, formatted it with Prettier, CLI docs freshness now passes, and docs-site checks remain green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:38:04.514Z, excerpt_hash=sha256:a680af0ce67168a6f66fae60545d262f22cb93f61db804a7c2aecc55cdf48d3a

<!-- END VERIFICATION RESULTS -->
