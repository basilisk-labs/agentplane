---
id: "202603091039-8M94Y4"
title: "Draft release notes for v0.3.5"
result_summary: "Release notes for v0.3.5 are written, template-aligned, and ready for release apply."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T10:40:56.816Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T10:42:45.944Z"
  updated_by: "DOCS"
  note: "Reviewed the generated 0.3.5 release plan, drafted docs/releases/v0.3.5.md from the template, and passed bun run docs:site:check against the new notes file."
commit:
  hash: "ccfe97cb777313e8823ee65f3e887704e2cb9111"
  message: "📝 8M94Y4 docs: draft release notes for v0.3.5"
comments:
  -
    author: "DOCS"
    body: "Start: draft docs/releases/v0.3.5.md directly from the generated release plan so the notes fully cover the planned patch scope before any publish mutation starts."
  -
    author: "DOCS"
    body: "Verified: drafted docs/releases/v0.3.5.md directly from the generated release plan and confirmed the docs site still builds cleanly with the new release notes."
events:
  -
    type: "status"
    at: "2026-03-09T10:41:00.683Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: draft docs/releases/v0.3.5.md directly from the generated release plan so the notes fully cover the planned patch scope before any publish mutation starts."
  -
    type: "verify"
    at: "2026-03-09T10:42:45.944Z"
    author: "DOCS"
    state: "ok"
    note: "Reviewed the generated 0.3.5 release plan, drafted docs/releases/v0.3.5.md from the template, and passed bun run docs:site:check against the new notes file."
  -
    type: "status"
    at: "2026-03-09T10:42:50.689Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: drafted docs/releases/v0.3.5.md directly from the generated release plan and confirmed the docs site still builds cleanly with the new release notes."
doc_version: 3
doc_updated_at: "2026-03-09T10:42:50.689Z"
doc_updated_by: "DOCS"
description: "Write docs/releases/v0.3.5.md with human-readable coverage of the patch scope and a clean summary of user-visible changes."
id_source: "generated"
---
## Summary

- Problem: 0.3.5 needs release notes that explain the patch scope in plain user language and fully cover the release plan artifact.
- Target outcome: write `docs/releases/v0.3.5.md` with complete human-readable notes for every material change listed in the generated release plan.
- Constraint: the notes must stay in English, use the release template, and avoid omitting any listed change.

## Scope

### In scope
- Read the generated release plan for v0.3.5.
- Draft `docs/releases/v0.3.5.md` from the template.
- Cover user-visible outcomes across README v3, docs shell, test contours, backend projection work, and Redmine validation.

### Out of scope
- Applying or publishing the release.
- New implementation changes beyond the release-notes file.
- Re-scoping the release to include unrelated commits.

## Plan

1. Read the 0.3.5 release plan artifact and extract the concrete change themes and commit coverage requirements.
2. Draft `docs/releases/v0.3.5.md` from the template with complete, plain-language bullets that cover the release scope without omissions.
3. Verify the new notes file is present, consistent with the plan artifact, and ready for release apply.

## Verify Steps

1. Open `.agentplane/.release/plan/2026-03-09T10-40-10-601Z/instructions.md` and `changes.md`. Expected: the required target is `v0.3.5` and the covered change set matches the planned patch scope.
2. Check `docs/releases/v0.3.5.md`. Expected: the file exists, follows the release template, stays in English, and summarizes the patch changes in human-readable bullets.
3. Run `bun run docs:site:check` after the file is written. Expected: release notes remain consistent with the docs site build.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T10:42:45.944Z — VERIFY — ok

By: DOCS

Note: Reviewed the generated 0.3.5 release plan, drafted docs/releases/v0.3.5.md from the template, and passed bun run docs:site:check against the new notes file.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T10:41:00.683Z, excerpt_hash=sha256:df2053fdd8f915f1e58f0ab3f965fc336063ce752f6d1b38875fdb19add2edb4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Remove or revert `docs/releases/v0.3.5.md` if the notes were drafted against the wrong release plan.
2. Re-draft the notes from the correct plan artifact before publish.

## Findings
