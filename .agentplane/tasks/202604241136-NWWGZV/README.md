---
id: "202604241136-NWWGZV"
title: "v0.3 freeze C1: move run-cli test helpers into testkit"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "testing"
  - "testkit"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src/cli/run-cli"
  - "bun run typecheck"
  - "rg -n 'run-cli\\.core\\.' packages/agentplane/src packages/testkit/src"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T12:48:00.881Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after inspecting helper coupling; scope includes an internal testing bridge to avoid a testkit-agentplane package cycle while moving helper modules out of agentplane src/cli."
verification:
  state: "ok"
  updated_at: "2026-04-24T12:58:15.625Z"
  updated_by: "CODER"
  note: "C1 verified: run-cli helper modules moved to testkit subpaths, agentplane tsconfig helper exclusions removed, focused cli-core suites passed, testkit build/typecheck/format checks passed, release contract/vitest routing/knip checks passed, doctor OK."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move excluded run-cli helper modules into testkit while avoiding a package dependency cycle via a narrow internal testing bridge."
events:
  -
    type: "status"
    at: "2026-04-24T12:48:06.432Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move excluded run-cli helper modules into testkit while avoiding a package dependency cycle via a narrow internal testing bridge."
  -
    type: "verify"
    at: "2026-04-24T12:58:15.625Z"
    author: "CODER"
    state: "ok"
    note: "C1 verified: run-cli helper modules moved to testkit subpaths, agentplane tsconfig helper exclusions removed, focused cli-core suites passed, testkit build/typecheck/format checks passed, release contract/vitest routing/knip checks passed, doctor OK."
doc_version: 3
doc_updated_at: "2026-04-24T12:58:15.657Z"
doc_updated_by: "CODER"
description: "Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions."
sections:
  Summary: |-
    v0.3 freeze C1: move run-cli test helpers into testkit
    
    Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.
  Scope: |-
    - In scope: Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.
    - Out of scope: unrelated refactors not required for "v0.3 freeze C1: move run-cli test helpers into testkit".
  Plan: |-
    1. Create an internal agentplane testing bridge for the small set of CLI/runtime symbols that helper modules legitimately need, without exporting those helpers as production CLI API.
    2. Move the excluded run-cli.core helper modules into @agentplane/testkit/cli-core, update test imports to use @agentplane/testkit/cli-core, and remove the custom helper exclusions from packages/agentplane/tsconfig.json.
    3. Preserve test behavior with focused cli-core suites for lifecycle, PR flow, and task run/query helpers, then run typecheck, testkit build, grep checks, format/diff checks, and framework bootstrap/doctor if runtime drift appears.
  Verify Steps: |-
    1. Run `rg -n 'run-cli\.core\.(lifecycle\.helpers|pr-flow\.pr-support|tasks\.query-support)' packages/agentplane/src packages/testkit/src`. Expected: no helper module remains under `packages/agentplane/src`; imports point at `@agentplane/testkit/cli-core` or files under `packages/testkit/src`.
    2. Run `node -e 'const p=require("node:fs").readFileSync("packages/agentplane/tsconfig.json","utf8"); if (p.includes("run-cli.core")) process.exit(1)'`. Expected: custom run-cli helper exclusions are gone.
    3. Run focused CLI helper suites: `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.basic.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts`. Expected: pass.
    4. Run `bun run --filter=@agentplane/testkit build`. Expected: pass.
    5. Run `bun run typecheck`. Expected: pass.
    6. Run `git diff --check && bun run format:check`. Expected: pass.
    7. If watched runtime drift is reported by agentplane commands, run `bun run framework:dev:bootstrap` and `agentplane doctor`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T12:58:15.625Z — VERIFY — ok
    
    By: CODER
    
    Note: C1 verified: run-cli helper modules moved to testkit subpaths, agentplane tsconfig helper exclusions removed, focused cli-core suites passed, testkit build/typecheck/format checks passed, release contract/vitest routing/knip checks passed, doctor OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:48:06.459Z, excerpt_hash=sha256:d3399a3cb25a3697ea0334558398a618a97d8841901f8433db358d1a182e56bb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze C1: move run-cli test helpers into testkit

Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.

## Scope

- In scope: Move run-cli.core helper modules out of agentplane src into @agentplane/testkit/cli and remove custom tsconfig exclusions.
- Out of scope: unrelated refactors not required for "v0.3 freeze C1: move run-cli test helpers into testkit".

## Plan

1. Create an internal agentplane testing bridge for the small set of CLI/runtime symbols that helper modules legitimately need, without exporting those helpers as production CLI API.
2. Move the excluded run-cli.core helper modules into @agentplane/testkit/cli-core, update test imports to use @agentplane/testkit/cli-core, and remove the custom helper exclusions from packages/agentplane/tsconfig.json.
3. Preserve test behavior with focused cli-core suites for lifecycle, PR flow, and task run/query helpers, then run typecheck, testkit build, grep checks, format/diff checks, and framework bootstrap/doctor if runtime drift appears.

## Verify Steps

1. Run `rg -n 'run-cli\.core\.(lifecycle\.helpers|pr-flow\.pr-support|tasks\.query-support)' packages/agentplane/src packages/testkit/src`. Expected: no helper module remains under `packages/agentplane/src`; imports point at `@agentplane/testkit/cli-core` or files under `packages/testkit/src`.
2. Run `node -e 'const p=require("node:fs").readFileSync("packages/agentplane/tsconfig.json","utf8"); if (p.includes("run-cli.core")) process.exit(1)'`. Expected: custom run-cli helper exclusions are gone.
3. Run focused CLI helper suites: `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.basic.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-prepare.test.ts`. Expected: pass.
4. Run `bun run --filter=@agentplane/testkit build`. Expected: pass.
5. Run `bun run typecheck`. Expected: pass.
6. Run `git diff --check && bun run format:check`. Expected: pass.
7. If watched runtime drift is reported by agentplane commands, run `bun run framework:dev:bootstrap` and `agentplane doctor`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T12:58:15.625Z — VERIFY — ok

By: CODER

Note: C1 verified: run-cli helper modules moved to testkit subpaths, agentplane tsconfig helper exclusions removed, focused cli-core suites passed, testkit build/typecheck/format checks passed, release contract/vitest routing/knip checks passed, doctor OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:48:06.459Z, excerpt_hash=sha256:d3399a3cb25a3697ea0334558398a618a97d8841901f8433db358d1a182e56bb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
