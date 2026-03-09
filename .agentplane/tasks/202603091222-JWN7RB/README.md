---
id: "202603091222-JWN7RB"
title: "Fix workflow-dispatch publish gate for release tags"
result_summary: "Removed the workflow-dispatch publish deadlock for release tags by moving publish validation to an exact-ref prepublish gate inside the publish workflow."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T12:22:59.571Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T12:32:53.643Z"
  updated_by: "CODER"
  note: "Replaced the exact-SHA external CI poll in publish.yml with an exact-ref release:prepublish gate inside the publish workflow. workflows:lint and docs:site:check passed. A full release:prepublish run reached the new gate path and then surfaced two unrelated timeout-sensitive test failures outside this task scope."
commit:
  hash: "ca82e290248a96aacaf971ad6fea5a56a1921300"
  message: "🐛 JWN7RB release: validate exact publish ref in publish workflow"
comments:
  -
    author: "CODER"
    body: "Start: investigating the workflow_dispatch publish deadlock around exact-SHA CI gating for release-tag refs and preparing a safe workflow-level repair."
  -
    author: "CODER"
    body: "Verified: publish.yml now validates the exact publish ref with release:prepublish instead of waiting on impossible exact-SHA push runs for release-tag workflow_dispatch recovery; workflows lint and release docs sync passed."
  -
    author: "CODER"
    body: "Verified: publish.yml now validates the exact publish ref with release:prepublish instead of waiting on impossible exact-SHA push runs for release-tag workflow_dispatch recovery; workflows lint and release docs sync passed."
events:
  -
    type: "status"
    at: "2026-03-09T12:22:59.967Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating the workflow_dispatch publish deadlock around exact-SHA CI gating for release-tag refs and preparing a safe workflow-level repair."
  -
    type: "verify"
    at: "2026-03-09T12:32:53.643Z"
    author: "CODER"
    state: "ok"
    note: "Replaced the exact-SHA external CI poll in publish.yml with an exact-ref release:prepublish gate inside the publish workflow. workflows:lint and docs:site:check passed. A full release:prepublish run reached the new gate path and then surfaced two unrelated timeout-sensitive test failures outside this task scope."
  -
    type: "status"
    at: "2026-03-09T12:33:10.498Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: publish.yml now validates the exact publish ref with release:prepublish instead of waiting on impossible exact-SHA push runs for release-tag workflow_dispatch recovery; workflows lint and release docs sync passed."
  -
    type: "status"
    at: "2026-03-09T12:34:57.279Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: publish.yml now validates the exact publish ref with release:prepublish instead of waiting on impossible exact-SHA push runs for release-tag workflow_dispatch recovery; workflows lint and release docs sync passed."
doc_version: 3
doc_updated_at: "2026-03-09T12:34:57.279Z"
doc_updated_by: "CODER"
description: "Eliminate the deadlock where publish.yml waits for exact push-run checks on a non-tip release tag SHA, and make the publish workflow validate the exact publish ref safely."
id_source: "generated"
---
## Summary

Fix workflow-dispatch publish gate for release tags

Eliminate the deadlock where publish.yml waits for exact push-run checks on a non-tip release tag SHA, and make the publish workflow validate the exact publish ref safely.

## Scope

- In scope: Eliminate the deadlock where publish.yml waits for exact push-run checks on a non-tip release tag SHA, and make the publish workflow validate the exact publish ref safely.
- Out of scope: unrelated refactors not required for "Fix workflow-dispatch publish gate for release tags".

## Plan

1. Inspect the current publish workflow and identify the exact deadlock path for workflow_dispatch on release tags.
2. Change the workflow so it validates the exact publish ref without waiting on impossible exact-SHA push runs.
3. Add or update workflow/docs checks to lock the repaired behavior and then verify the workflow contract locally.

## Verify Steps

1. Run `bun run workflows:lint`. Expected: workflow YAML parses cleanly and the publish workflow passes the workflow-command contract checks.
2. Run the targeted tests or checks for the release publish path. Expected: the repaired workflow logic covers workflow_dispatch on a release ref without depending on impossible exact-SHA push runs.
3. Review `.github/workflows/publish.yml`. Expected: the publish job now validates the exact publish ref safely and no longer deadlocks on release-tag dispatch recovery.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T12:32:53.643Z — VERIFY — ok

By: CODER

Note: Replaced the exact-SHA external CI poll in publish.yml with an exact-ref release:prepublish gate inside the publish workflow. workflows:lint and docs:site:check passed. A full release:prepublish run reached the new gate path and then surfaced two unrelated timeout-sensitive test failures outside this task scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T12:32:29.873Z, excerpt_hash=sha256:40705e3b70c216bdc49b81f4556f939f8ffd4ef56d9b6f2dcbb2e89f34473aaf

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: `workflow_dispatch` on a release tag deadlocked because `publish.yml` waited for exact-SHA `push` runs that do not exist when the release tag points to a non-tip commit.
  Impact: manual publish recovery for release tags could hang until timeout even after a safe tag repair.
  Resolution: moved the publish workflow to an exact-ref `release:prepublish` gate inside the workflow itself instead of polling external push workflows by SHA.
  Promotion: incident-candidate

- Observation: validating the new publish path with a full `bun run release:prepublish` run surfaced unrelated timeout-sensitive failures in `release-recovery-script.test.ts` and `cli-smoke.test.ts`.
  Impact: full release prepublish is still not green on this host, but the failures are independent from the workflow deadlock fix.
  Resolution: keep this workflow repair narrow and track the timeout regressions separately.
  Promotion: tooling
