---
id: "202603081249-VKB30G"
title: "Add runtime-sensitive CLI targeted fast buckets"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T12:57:31.765Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: split runtime-sensitive CLI fallback into focused buckets while preserving broad fallback for residual paths."
verification:
  state: "ok"
  updated_at: "2026-03-08T13:07:05.186Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000; bun run lint:core -- scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/local-ci-selection.test.ts; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/cli/run-cli/globals.ts node scripts/run-local-ci.mjs --mode fast; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/bin/runtime-context.js node scripts/run-local-ci.mjs --mode fast; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts node scripts/run-local-ci.mjs --mode fast. Result: pass. Evidence: selector tests green; cli-core and cli-runtime targeted contours selected; residual init-upgrade path stayed on broad full-fast. Scope: scripts/lib/local-ci-selection.* and packages/agentplane/src/cli/local-ci-selection.test.ts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing focused cli-core and cli-runtime fast buckets for runtime-sensitive CLI paths, with selector regressions and fallback preservation for residual execution surfaces."
events:
  -
    type: "status"
    at: "2026-03-08T12:57:41.765Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing focused cli-core and cli-runtime fast buckets for runtime-sensitive CLI paths, with selector regressions and fallback preservation for residual execution surfaces."
  -
    type: "verify"
    at: "2026-03-08T13:07:05.186Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000; bun run lint:core -- scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/local-ci-selection.test.ts; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/cli/run-cli/globals.ts node scripts/run-local-ci.mjs --mode fast; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/bin/runtime-context.js node scripts/run-local-ci.mjs --mode fast; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts node scripts/run-local-ci.mjs --mode fast. Result: pass. Evidence: selector tests green; cli-core and cli-runtime targeted contours selected; residual init-upgrade path stayed on broad full-fast. Scope: scripts/lib/local-ci-selection.* and packages/agentplane/src/cli/local-ci-selection.test.ts."
doc_version: 3
doc_updated_at: "2026-03-08T13:07:05.187Z"
doc_updated_by: "CODER"
description: "Split the remaining run-cli and runtime-sensitive CLI broad fallback into narrower targeted fast-CI buckets without weakening coverage for execution, handoff, and stale-dist behavior."
id_source: "generated"
---
## Summary

Add runtime-sensitive CLI targeted fast buckets

Split the remaining run-cli and runtime-sensitive CLI broad fallback into narrower targeted fast-CI buckets without weakening coverage for execution, handoff, and stale-dist behavior.

## Scope

- In scope: Split the remaining run-cli and runtime-sensitive CLI broad fallback into narrower targeted fast-CI buckets without weakening coverage for execution, handoff, and stale-dist behavior..
- Out of scope: unrelated refactors not required for "Add runtime-sensitive CLI targeted fast buckets".

## Plan

1. Add a cli-core bucket for isolated run-cli execution-plumbing paths with a focused run-cli core suite, while excluding help, hooks, and guard surfaces that already have their own buckets.
2. Add a cli-runtime bucket for runtime freshness, repo-local handoff, and bin/runtime-watch paths with a focused runtime suite.
3. Add selector regressions and changed-file simulations proving cli-core and cli-runtime routes work, and keep residual runtime-sensitive CLI files on the broad fallback when no clear focused suite exists.

## Verify Steps

1. Run selector regressions for cli-core and cli-runtime. Expected: run-cli execution-plumbing paths resolve to cli-core, bin/runtime freshness-handoff paths resolve to cli-runtime, and residual unmapped CLI paths do not.
2. Run lint and the focused fast-CI suites for the changed selector files. Expected: all focused checks pass.
3. Simulate isolated changed-file scopes through scripts/run-local-ci.mjs --mode fast. Expected: run-cli core paths avoid the blanket full-fast contour via cli-core, runtime freshness-handoff paths avoid it via cli-runtime, and residual runtime-sensitive CLI paths still use the broad fallback.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T13:07:05.186Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000; bun run lint:core -- scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/local-ci-selection.test.ts; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/cli/run-cli/globals.ts node scripts/run-local-ci.mjs --mode fast; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/bin/runtime-context.js node scripts/run-local-ci.mjs --mode fast; AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts node scripts/run-local-ci.mjs --mode fast. Result: pass. Evidence: selector tests green; cli-core and cli-runtime targeted contours selected; residual init-upgrade path stayed on broad full-fast. Scope: scripts/lib/local-ci-selection.* and packages/agentplane/src/cli/local-ci-selection.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T13:06:54.030Z, excerpt_hash=sha256:4b99138359b30e1665db2147c5e75c0a31f7d6bb6c215794d3114c3d1b81b614

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: runtime-sensitive CLI broad fallback can be split safely into cli-core and cli-runtime without pulling docs-cli rendering or init-upgrade integration into those contours.
  Impact: isolated run-cli execution plumbing and bin/runtime freshness-handoff paths now avoid blanket full-fast runs, while residual paths such as run-cli.core.docs-cli.test.ts and run-cli.core.init-upgrade-backend.test.ts remain on the broad fallback by design.
  Resolution: added focused selector buckets, regressions, and changed-file simulations; kept ambiguous execution surfaces on broad fallback.
  Promotion: none
