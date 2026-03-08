---
id: "202603081558-MG88QJ"
title: "Draft release notes for v0.3.3"
result_summary: "Release notes for v0.3.3 are ready for release apply."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603081557-2QA2Q0"
tags:
  - "docs"
  - "release"
verify:
  - "bun run docs:site:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T16:00:13.721Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T16:02:21.264Z"
  updated_by: "DOCS"
  note: "Docs checks: bun run docs:site:check passed, agentplane doctor stayed green, policy routing remained valid, and docs/releases/v0.3.3.md now covers the shipped v0.3.2..HEAD scope in the canonical release-note format."
commit:
  hash: "d74f16d45007446d9f7513629202cdfe272e5e8c"
  message: "✅ 2QA2Q0 close: Release 0.3.3 execution graph created and handed off to docs/release tasks. (202603081557-2QA2Q0) [tasks]"
comments:
  -
    author: "DOCS"
    body: "Start: inspect the v0.3.2..HEAD shipped scope, group already-landed changes into release-note themes, and author complete human-readable notes for v0.3.3 before release apply."
  -
    author: "DOCS"
    body: "Verified: authored docs/releases/v0.3.3.md from the shipped v0.3.2..HEAD scope, passed docs-site, kept doctor green, and preserved policy routing validity."
events:
  -
    type: "status"
    at: "2026-03-08T16:00:17.603Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the v0.3.2..HEAD shipped scope, group already-landed changes into release-note themes, and author complete human-readable notes for v0.3.3 before release apply."
  -
    type: "verify"
    at: "2026-03-08T16:02:21.264Z"
    author: "DOCS"
    state: "ok"
    note: "Docs checks: bun run docs:site:check passed, agentplane doctor stayed green, policy routing remained valid, and docs/releases/v0.3.3.md now covers the shipped v0.3.2..HEAD scope in the canonical release-note format."
  -
    type: "status"
    at: "2026-03-08T16:02:26.753Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: authored docs/releases/v0.3.3.md from the shipped v0.3.2..HEAD scope, passed docs-site, kept doctor green, and preserved policy routing validity."
doc_version: 3
doc_updated_at: "2026-03-08T16:02:26.753Z"
doc_updated_by: "DOCS"
description: "Prepare docs/releases/v0.3.3.md with complete, human-readable coverage of the already-landed 0.3.3 scope from v0.3.2 to HEAD, without introducing new implementation work."
id_source: "generated"
---
## Summary

Draft release notes for v0.3.3

Prepare docs/releases/v0.3.3.md with complete, human-readable coverage of the already-landed 0.3.3 scope from v0.3.2 to HEAD, without introducing new implementation work.

## Scope

- In scope: Prepare docs/releases/v0.3.3.md with complete, human-readable coverage of the already-landed 0.3.3 scope from v0.3.2 to HEAD, without introducing new implementation work.
- Out of scope: unrelated refactors not required for "Draft release notes for v0.3.3".

## Plan

1. Review release-note conventions and the shipped change set from v0.3.2 to HEAD. 2. Group already-landed changes into release-note categories with user-visible wording only. 3. Author docs/releases/v0.3.3.md so it fully covers the release plan scope without inventing unreleased work. 4. Run docs/policy verification and hand off the finished notes to the release-apply task.

## Verify Steps

1. Open `docs/releases/v0.3.3.md`. Expected: the file covers only shipped changes from `v0.3.2..HEAD` and uses the repository release-note structure.
2. Run `bun run docs:site:check`. Expected: docs build and docs-site checks pass with the new release-notes page present.
3. Run `agentplane doctor` and `node .agentplane/policy/check-routing.mjs`. Expected: repo health stays green and policy routing remains valid after the docs change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T16:02:21.264Z — VERIFY — ok

By: DOCS

Note: Docs checks: bun run docs:site:check passed, agentplane doctor stayed green, policy routing remained valid, and docs/releases/v0.3.3.md now covers the shipped v0.3.2..HEAD scope in the canonical release-note format.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T16:01:38.607Z, excerpt_hash=sha256:e33cc1a710100c50deb77fe89e338617d9e9d3230d926277c117463408b44ad1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
