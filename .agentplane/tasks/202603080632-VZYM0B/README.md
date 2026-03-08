---
id: "202603080632-VZYM0B"
title: "Optimize fast local gate runtime"
status: "BLOCKED"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T07:14:13.442Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: trimming the default fast gate by moving release-only unit tests behind explicit full/release local paths while preserving those tests in a stronger lane."
  -
    author: "CODER"
    body: "Blocked: moving release-specific tests out of the default fast unit sweep did not materially improve runtime. Measured baseline remained about 64s on this repository, so the dominant cost is broader than release-only suites; the next iteration should use path-aware or bucketed fast-test selection rather than a simple exclusion split."
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
doc_version: 2
doc_updated_at: "2026-03-08T07:16:49.202Z"
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

1. Remove release-specific unit tests from the default fast unit sweep and group them behind an explicit release/full-local gate.
2. Keep default pre-push coverage for general code paths while preserving a heavier local path that still runs release tests before full/release work.
3. Verify script wiring, release test execution, and the new test:fast runtime on this repository.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- `bun run lint:core -- scripts/run-local-ci.mjs package.json`
- `bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/release-check-script.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/check-release-parity-script.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000`
- `sh -c '/usr/bin/time -p bun run test:fast >/tmp/test-fast.out 2>/tmp/test-fast.err'`\n\n### Evidence / Commands\n- Record the new fast-path runtime and confirm release tests still have an explicit local execution path.\n\n### Pass criteria\n- Default fast gate is materially cheaper than before, and release-specific tests remain covered by an explicit full/release path.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
