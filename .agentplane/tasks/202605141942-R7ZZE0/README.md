---
id: "202605141942-R7ZZE0"
title: "Generate versioned README header images"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T19:42:33.387Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T19:49:40.237Z"
  updated_by: "CODER"
  note: "Command: bun run docs:readme-header:check | Result: pass | Evidence: README header artifacts are fresh for v0.6.0 | Scope: generated README header SVGs and README link blocks. Command: release distribution render checks | Result: pass with local credential skips for external PR checks | Evidence: distribution and GHCR checks passed; Homebrew/Scoop/setup-action local checks exited skipped_missing_credentials; publish workflow contract tests prove incomplete external distribution fails closed. Command: bunx vitest release workflow contract tests | Result: pass | Evidence: 5 files, 18 tests passed. Command: release:bun:check and release:parity | Result: pass | Evidence: Bun executable assets fresh for v0.6.0; package parity 0.6.0 aligned. Command: formatting, routing, doctor, SVG XML | Result: pass with pre-existing doctor warnings | Evidence: Prettier/diff-check/routing/xmllint passed; doctor OK with existing shipped-task reconciliation warnings."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extend the generated README header image pipeline and update linked README surfaces from the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-05-14T19:43:17.877Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend the generated README header image pipeline and update linked README surfaces from the dedicated task worktree."
  -
    type: "verify"
    at: "2026-05-14T19:49:40.237Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:readme-header:check | Result: pass | Evidence: README header artifacts are fresh for v0.6.0 | Scope: generated README header SVGs and README link blocks. Command: release distribution render checks | Result: pass with local credential skips for external PR checks | Evidence: distribution and GHCR checks passed; Homebrew/Scoop/setup-action local checks exited skipped_missing_credentials; publish workflow contract tests prove incomplete external distribution fails closed. Command: bunx vitest release workflow contract tests | Result: pass | Evidence: 5 files, 18 tests passed. Command: release:bun:check and release:parity | Result: pass | Evidence: Bun executable assets fresh for v0.6.0; package parity 0.6.0 aligned. Command: formatting, routing, doctor, SVG XML | Result: pass with pre-existing doctor warnings | Evidence: Prettier/diff-check/routing/xmllint passed; doctor OK with existing shipped-task reconciliation warnings."
doc_version: 3
doc_updated_at: "2026-05-14T19:49:40.250Z"
doc_updated_by: "CODER"
description: "Extend the README header image generator so the current AgentPlane version produces reusable header images and package/related README files link to those generated artifacts."
sections:
  Summary: |-
    Generate versioned README header images

    Extend the README header image generator so the current AgentPlane version produces reusable header images and package/related README files link to those generated artifacts.
  Scope: |-
    - In scope: Extend the README header image generator so the current AgentPlane version produces reusable header images and package/related README files link to those generated artifacts.
    - Out of scope: unrelated refactors not required for "Generate versioned README header images".
  Plan: "1. Inspect the existing README header generator, generated assets, and README surfaces in the current repo. 2. Extend the generator so the current package version emits reusable header images for the root README and package/related README files. 3. Update README links to use the generated artifacts without hand-maintained image drift. 4. Add or adjust checks so generator freshness fails closed when generated images or README links are stale. 5. Verify with the declared task checks, targeted generator/check commands, policy routing, and doctor. Scope is limited to this repository; no external publication or cross-repo writes."
  Verify Steps: |-
    1. Run `bun run docs:readme-header:check`. Expected: all generated README header SVGs and linked README header blocks are fresh for the current release tag.
    2. Run targeted release distribution checks: `bun run release:distribution:check`, `bun run release:homebrew:check`, `bun run release:scoop:check`, `bun run release:ghcr:check`, and `bun run release:setup-action:check`. Expected: platform/distribution renderers still validate for the current version.
    3. Run `bunx prettier --check` on changed README and generator files. Expected: generated and hand-edited text formatting is stable.
    4. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing and repo health pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T19:49:40.237Z — VERIFY — ok

    By: CODER

    Note: Command: bun run docs:readme-header:check | Result: pass | Evidence: README header artifacts are fresh for v0.6.0 | Scope: generated README header SVGs and README link blocks. Command: release distribution render checks | Result: pass with local credential skips for external PR checks | Evidence: distribution and GHCR checks passed; Homebrew/Scoop/setup-action local checks exited skipped_missing_credentials; publish workflow contract tests prove incomplete external distribution fails closed. Command: bunx vitest release workflow contract tests | Result: pass | Evidence: 5 files, 18 tests passed. Command: release:bun:check and release:parity | Result: pass | Evidence: Bun executable assets fresh for v0.6.0; package parity 0.6.0 aligned. Command: formatting, routing, doctor, SVG XML | Result: pass with pre-existing doctor warnings | Evidence: Prettier/diff-check/routing/xmllint passed; doctor OK with existing shipped-task reconciliation warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T19:43:17.877Z, excerpt_hash=sha256:c07de0050f4f8ec36a93b97cce84725f72bb27f6e481c3352cd00a47d84c7cf9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141942-R7ZZE0-versioned-readme-headers/.agentplane/tasks/202605141942-R7ZZE0/blueprint/resolved-snapshot.json
    - old_digest: b465b61b0bb1e734f934d3f26a563cba47206649fd23399f7432a1a2372a38c2
    - current_digest: b465b61b0bb1e734f934d3f26a563cba47206649fd23399f7432a1a2372a38c2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141942-R7ZZE0

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate versioned README header images

Extend the README header image generator so the current AgentPlane version produces reusable header images and package/related README files link to those generated artifacts.

## Scope

- In scope: Extend the README header image generator so the current AgentPlane version produces reusable header images and package/related README files link to those generated artifacts.
- Out of scope: unrelated refactors not required for "Generate versioned README header images".

## Plan

1. Inspect the existing README header generator, generated assets, and README surfaces in the current repo. 2. Extend the generator so the current package version emits reusable header images for the root README and package/related README files. 3. Update README links to use the generated artifacts without hand-maintained image drift. 4. Add or adjust checks so generator freshness fails closed when generated images or README links are stale. 5. Verify with the declared task checks, targeted generator/check commands, policy routing, and doctor. Scope is limited to this repository; no external publication or cross-repo writes.

## Verify Steps

1. Run `bun run docs:readme-header:check`. Expected: all generated README header SVGs and linked README header blocks are fresh for the current release tag.
2. Run targeted release distribution checks: `bun run release:distribution:check`, `bun run release:homebrew:check`, `bun run release:scoop:check`, `bun run release:ghcr:check`, and `bun run release:setup-action:check`. Expected: platform/distribution renderers still validate for the current version.
3. Run `bunx prettier --check` on changed README and generator files. Expected: generated and hand-edited text formatting is stable.
4. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing and repo health pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T19:49:40.237Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:readme-header:check | Result: pass | Evidence: README header artifacts are fresh for v0.6.0 | Scope: generated README header SVGs and README link blocks. Command: release distribution render checks | Result: pass with local credential skips for external PR checks | Evidence: distribution and GHCR checks passed; Homebrew/Scoop/setup-action local checks exited skipped_missing_credentials; publish workflow contract tests prove incomplete external distribution fails closed. Command: bunx vitest release workflow contract tests | Result: pass | Evidence: 5 files, 18 tests passed. Command: release:bun:check and release:parity | Result: pass | Evidence: Bun executable assets fresh for v0.6.0; package parity 0.6.0 aligned. Command: formatting, routing, doctor, SVG XML | Result: pass with pre-existing doctor warnings | Evidence: Prettier/diff-check/routing/xmllint passed; doctor OK with existing shipped-task reconciliation warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T19:43:17.877Z, excerpt_hash=sha256:c07de0050f4f8ec36a93b97cce84725f72bb27f6e481c3352cd00a47d84c7cf9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141942-R7ZZE0-versioned-readme-headers/.agentplane/tasks/202605141942-R7ZZE0/blueprint/resolved-snapshot.json
- old_digest: b465b61b0bb1e734f934d3f26a563cba47206649fd23399f7432a1a2372a38c2
- current_digest: b465b61b0bb1e734f934d3f26a563cba47206649fd23399f7432a1a2372a38c2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141942-R7ZZE0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
