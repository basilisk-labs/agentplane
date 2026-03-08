---
id: "202603080632-VZYM0B"
title: "Optimize fast local gate runtime"
result_summary: "Implemented diff-aware pre-push scope selection and path-aware fast CI routing with docs-only and targeted task/doctor buckets, plus explicit full-fast fallback for broad changes."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T08:33:28.388Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T08:46:45.860Z"
  updated_by: "TESTER"
  note: "Verified: path-aware fast CI selection is deterministic and materially cheaper for narrow scopes. Lint and hook tests passed; measured runtimes on this repository were docs-only ~16.66s, targeted task ~18.48s, and broad fallback ~153.11s."
commit:
  hash: "4cdbaa5fdac15bcc7150ff92da7f29f474a2f6a5"
  message: "⚡ VZYM0B ci: make fast local gate path-aware"
comments:
  -
    author: "CODER"
    body: "Start: trimming the default fast gate by moving release-only unit tests behind explicit full/release local paths while preserving those tests in a stronger lane."
  -
    author: "CODER"
    body: "Blocked: moving release-specific tests out of the default fast unit sweep did not materially improve runtime. Measured baseline remained about 64s on this repository, so the dominant cost is broader than release-only suites; the next iteration should use path-aware or bucketed fast-test selection rather than a simple exclusion split."
  -
    author: "CODER"
    body: "Start: switching the fast gate to path-aware selection with targeted buckets and full fallback for broad changes."
  -
    author: "CODER"
    body: "Verified: the fast local gate now routes docs-only and narrow task changes through cheaper deterministic buckets while keeping a broad full-fast fallback for infra-sensitive scopes."
events:
  -
    type: "status"
    at: "2026-03-08T07:14:13.734Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trimming the default fast gate by moving release-only unit tests behind explicit full/release local paths while preserving those tests in a stronger lane."
  -
    type: "status"
    at: "2026-03-08T07:16:49.202Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: moving release-specific tests out of the default fast unit sweep did not materially improve runtime. Measured baseline remained about 64s on this repository, so the dominant cost is broader than release-only suites; the next iteration should use path-aware or bucketed fast-test selection rather than a simple exclusion split."
  -
    type: "status"
    at: "2026-03-08T08:33:28.682Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: switching the fast gate to path-aware selection with targeted buckets and full fallback for broad changes."
  -
    type: "verify"
    at: "2026-03-08T08:46:45.860Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: path-aware fast CI selection is deterministic and materially cheaper for narrow scopes. Lint and hook tests passed; measured runtimes on this repository were docs-only ~16.66s, targeted task ~18.48s, and broad fallback ~153.11s."
  -
    type: "status"
    at: "2026-03-08T08:47:09.789Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the fast local gate now routes docs-only and narrow task changes through cheaper deterministic buckets while keeping a broad full-fast fallback for infra-sensitive scopes."
doc_version: 3
doc_updated_at: "2026-03-08T08:47:09.789Z"
doc_updated_by: "CODER"
description: "Reduce the cost of ci:local/test:fast so the default pre-push path stays materially cheaper than the full local CI track without weakening required coverage."
id_source: "generated"
---
## Summary

Optimize fast local gate runtime

Reduce the cost of ci:local/test:fast so the default pre-push path stays materially cheaper than the full local CI track without weakening required coverage.

## Scope

- In scope: Reduce the cost of ci:local/test:fast so the default pre-push path stays materially cheaper than the full local CI track without weakening required coverage..
- Out of scope: unrelated refactors not required for "Optimize fast local gate runtime".

## Plan

1. Parse pushed refs in the pre-push hook and compute the changed tracked paths for branch pushes when a remote base is available.
2. Route fast local CI by path buckets: skip heavy tests for docs-only changes, run narrow targeted suites for bounded code areas, and fall back to the existing blanket fast suite for broad or infra-sensitive changes.
3. Verify selector behavior, preserved coverage paths, and the measured fast-path runtime on this repository.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- `bun run lint:core -- scripts/run-local-ci.mjs scripts/run-pre-push-hook.mjs scripts/lib/local-ci-selection.mjs scripts/lib/pre-push-scope.mjs packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts`
- `bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000`
- `sh -c '/usr/bin/time -p env AGENTPLANE_FAST_CHANGED_FILES="docs/README.md" node scripts/run-local-ci.mjs --mode fast >/tmp/ci-fast-docs.out 2>/tmp/ci-fast-docs.err'`\n- `sh -c '/usr/bin/time -p env AGENTPLANE_FAST_CHANGED_FILES="packages/agentplane/src/commands/task/shared.ts" node scripts/run-local-ci.mjs --mode fast >/tmp/ci-fast-task.out 2>/tmp/ci-fast-task.err'`\n- `sh -c '/usr/bin/time -p env AGENTPLANE_FAST_CHANGED_FILES="scripts/run-local-ci.mjs" node scripts/run-local-ci.mjs --mode fast >/tmp/ci-fast-broad.out 2>/tmp/ci-fast-broad.err'`\n\n### Evidence / Commands\n- Record selector choice and wall-clock runtime for docs-only, targeted task, and broad fallback scopes.\n\n### Pass criteria\n- Docs-only and narrow task changes take the cheaper path, broad/infra-sensitive changes still force the blanket fast sweep, and the selector remains deterministic under pre-push.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T08:46:45.860Z — VERIFY — ok

By: TESTER

Note: Verified: path-aware fast CI selection is deterministic and materially cheaper for narrow scopes. Lint and hook tests passed; measured runtimes on this repository were docs-only ~16.66s, targeted task ~18.48s, and broad fallback ~153.11s.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T08:46:37.165Z, excerpt_hash=sha256:64dc598958d8e830a0078e41bdee985dfc6e442175f9ae0a14ec218688e35d4b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- First hypothesis failed: moving release tests out of the default fast sweep did not materially improve runtime.
- Implemented approach: diff-aware pre-push scope + path buckets in local fast CI.
- Measured on this repository after implementation: docs-only path ~16.66s, targeted task path ~18.48s, broad fallback path ~153.11s.
- Residual tradeoff: the doctor-specific bucket is still expensive because doctor.command.test.ts is itself heavy; that path may need separate test-bucket work later.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
