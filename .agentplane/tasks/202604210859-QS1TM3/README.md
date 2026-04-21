---
id: "202604210859-QS1TM3"
title: "Add production no-console guard"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604210859-3GKMTX"
tags:
  - "code"
  - "lint"
  - "logging"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:27:34.667Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:31:48.551Z"
  updated_by: "CODER"
  note: "Added executable no-console guard tests and documented production logging hygiene; current logging baseline and scoped lint pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: enforce no new production console usage using existing inventory/check surface while preserving approved CLI UX paths."
events:
  -
    type: "status"
    at: "2026-04-21T10:27:39.711Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce no new production console usage using existing inventory/check surface while preserving approved CLI UX paths."
  -
    type: "verify"
    at: "2026-04-21T10:31:48.551Z"
    author: "CODER"
    state: "ok"
    note: "Added executable no-console guard tests and documented production logging hygiene; current logging baseline and scoped lint pass."
doc_version: 3
doc_updated_at: "2026-04-21T10:31:48.557Z"
doc_updated_by: "CODER"
description: "Turn the console inventory into an enforced guard for production core/command paths after logger migration."
sections:
  Summary: "Enforce no new console.* usage in production paths while allowing tests, scripts, and deliberately human-facing CLI plumbing."
  Scope: "In scope: ESLint/check configuration and baseline removal/tightening after T9. Out of scope: replacing every UX stdout writer."
  Plan: |-
    1. Decide whether existing ESLint or script-runtime check is the right enforcement surface.
    2. Configure forbidden console usage for core and command production paths.
    3. Add explicit allowlist comments/config for scripts/tests/approved UX paths.
    4. Run lint/checks.
  Verify Steps: |-
    - A new console.warn in core would fail lint/check.
    - Existing approved stdout/stderr UX paths still pass.
    - The guard is documented by config, not tribal knowledge.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-QS1TM3`
      - Result: pass
      - Evidence: contract requires artificial production console growth failure, approved UX paths passing, and documented guard behavior.
      - Scope: task acceptance contract.
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/cli/check-no-console-script.test.ts`
      - Result: pass
      - Evidence: 1 file passed, 2 tests passed; production console.warn over baseline fails and .test.ts/.spec.ts files are ignored.
      - Scope: no-console guard behavior.
    - Command: `bun run logging:check`
      - Result: pass
      - Evidence: production console usage OK (count=24, max=25).
      - Scope: current repository production console baseline.
    - Command: `bunx eslint scripts/check-no-console.mjs packages/agentplane/src/cli/check-no-console-script.test.ts`
      - Result: pass
      - Evidence: scoped ESLint exited with code 0.
      - Scope: changed no-console script and focused test.
    - Command: `git diff --check -- scripts/check-no-console.mjs packages/agentplane/src/cli/check-no-console-script.test.ts docs/developer/testing-and-quality.mdx .agentplane/tasks/202604210859-QS1TM3/README.md`
      - Result: pass
      - Evidence: no whitespace errors.
      - Scope: changed files for this task.
    - Skipped: `bun run lint:core`
      - Reason: parallel signing-policy task currently has dirty work in packages/agentplane/src/commands/recipes/impl/index.ts that triggers a lint failure outside QS1TM3 scope.
      - Risk: full-repo lint remains a cross-task integration check before release readiness.
      - Approval: implicit parallel execution scope; QS1TM3 used scoped ESLint for its own changed files.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:31:48.551Z — VERIFY — ok
    
    By: CODER
    
    Note: Added executable no-console guard tests and documented production logging hygiene; current logging baseline and scoped lint pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:31:47.887Z, excerpt_hash=sha256:22e9fff38700a3b6dfb3c70fb3df5fe0528451caed3075cdad8ea29630b2d944
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert lint/check enforcement and restore previous baseline behavior."
  Findings: "Depends on T9 to avoid creating noisy false positives."
id_source: "generated"
---
## Summary

Enforce no new console.* usage in production paths while allowing tests, scripts, and deliberately human-facing CLI plumbing.

## Scope

In scope: ESLint/check configuration and baseline removal/tightening after T9. Out of scope: replacing every UX stdout writer.

## Plan

1. Decide whether existing ESLint or script-runtime check is the right enforcement surface.
2. Configure forbidden console usage for core and command production paths.
3. Add explicit allowlist comments/config for scripts/tests/approved UX paths.
4. Run lint/checks.

## Verify Steps

- A new console.warn in core would fail lint/check.
- Existing approved stdout/stderr UX paths still pass.
- The guard is documented by config, not tribal knowledge.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-QS1TM3`
  - Result: pass
  - Evidence: contract requires artificial production console growth failure, approved UX paths passing, and documented guard behavior.
  - Scope: task acceptance contract.
- Command: `bun run test:project -- agentplane --run packages/agentplane/src/cli/check-no-console-script.test.ts`
  - Result: pass
  - Evidence: 1 file passed, 2 tests passed; production console.warn over baseline fails and .test.ts/.spec.ts files are ignored.
  - Scope: no-console guard behavior.
- Command: `bun run logging:check`
  - Result: pass
  - Evidence: production console usage OK (count=24, max=25).
  - Scope: current repository production console baseline.
- Command: `bunx eslint scripts/check-no-console.mjs packages/agentplane/src/cli/check-no-console-script.test.ts`
  - Result: pass
  - Evidence: scoped ESLint exited with code 0.
  - Scope: changed no-console script and focused test.
- Command: `git diff --check -- scripts/check-no-console.mjs packages/agentplane/src/cli/check-no-console-script.test.ts docs/developer/testing-and-quality.mdx .agentplane/tasks/202604210859-QS1TM3/README.md`
  - Result: pass
  - Evidence: no whitespace errors.
  - Scope: changed files for this task.
- Skipped: `bun run lint:core`
  - Reason: parallel signing-policy task currently has dirty work in packages/agentplane/src/commands/recipes/impl/index.ts that triggers a lint failure outside QS1TM3 scope.
  - Risk: full-repo lint remains a cross-task integration check before release readiness.
  - Approval: implicit parallel execution scope; QS1TM3 used scoped ESLint for its own changed files.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:31:48.551Z — VERIFY — ok

By: CODER

Note: Added executable no-console guard tests and documented production logging hygiene; current logging baseline and scoped lint pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:31:47.887Z, excerpt_hash=sha256:22e9fff38700a3b6dfb3c70fb3df5fe0528451caed3075cdad8ea29630b2d944

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert lint/check enforcement and restore previous baseline behavior.

## Findings

Depends on T9 to avoid creating noisy false positives.
