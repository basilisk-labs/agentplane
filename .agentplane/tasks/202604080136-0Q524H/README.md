---
id: "202604080136-0Q524H"
title: "Fix bootstrap doc generation to reject stale dist"
result_summary: "integrate: squash task/202604080136-0Q524H/bootstrap-doc-freshness"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bootstrap"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T01:37:03.323Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T04:05:43.701Z"
  updated_by: "CODER"
  note: |-
    Command: bun test packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
    Result: pass
    Evidence: 2 tests passed covering stale-dist and missing-dist rejection for bootstrap doc scripts.
    Scope: scripts/lib/generated-artifacts.mjs and bootstrap doc generator/check guards.
    
    Command: bun x eslint scripts/lib/generated-artifacts.mjs scripts/generate-agent-bootstrap-doc.mjs scripts/check-agent-bootstrap-fresh.mjs packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
    Result: pass
    Evidence: no lint errors after typing the script helper import in the regression test.
    Scope: touched scripts and new test only.
    
    Command: bun run framework:dev:bootstrap && node scripts/check-agent-bootstrap-fresh.mjs
    Result: pass
    Evidence: repo-local runtime rebuilt successfully and bootstrap freshness check reported docs/runtime surfaces aligned.
    Scope: real framework-worktree bootstrap and docs freshness path.
commit:
  hash: "0aa967241e7e9aa46c1b90e039092992c735be09"
  message: "📝 0Q524H task: sync GitHub PR metadata"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604080136-0Q524H/pr."
events:
  -
    type: "verify"
    at: "2026-04-08T04:05:43.701Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun test packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
      Result: pass
      Evidence: 2 tests passed covering stale-dist and missing-dist rejection for bootstrap doc scripts.
      Scope: scripts/lib/generated-artifacts.mjs and bootstrap doc generator/check guards.
      
      Command: bun x eslint scripts/lib/generated-artifacts.mjs scripts/generate-agent-bootstrap-doc.mjs scripts/check-agent-bootstrap-fresh.mjs packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
      Result: pass
      Evidence: no lint errors after typing the script helper import in the regression test.
      Scope: touched scripts and new test only.
      
      Command: bun run framework:dev:bootstrap && node scripts/check-agent-bootstrap-fresh.mjs
      Result: pass
      Evidence: repo-local runtime rebuilt successfully and bootstrap freshness check reported docs/runtime surfaces aligned.
      Scope: real framework-worktree bootstrap and docs freshness path.
  -
    type: "status"
    at: "2026-04-08T17:56:26.001Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604080136-0Q524H/pr."
doc_version: 3
doc_updated_at: "2026-04-08T17:56:26.005Z"
doc_updated_by: "INTEGRATOR"
description: "Generator and freshness check for agent bootstrap docs still import dist bootstrap-guide modules directly, so docs can be regenerated and validated against stale dist after src changes. Make the path source-truth safe or fail fast when dist is stale."
sections:
  Summary: |-
    Fix bootstrap doc generation to reject stale dist
    
    Generator and freshness check for agent bootstrap docs still import dist bootstrap-guide modules directly, so docs can be regenerated and validated against stale dist after src changes. Make the path source-truth safe or fail fast when dist is stale.
  Scope: |-
    - In scope: Generator and freshness check for agent bootstrap docs still import dist bootstrap-guide modules directly, so docs can be regenerated and validated against stale dist after src changes. Make the path source-truth safe or fail fast when dist is stale.
    - Out of scope: unrelated refactors not required for "Fix bootstrap doc generation to reject stale dist".
  Plan: |-
    1. Reproduce the stale-dist coupling in bootstrap doc generation and freshness checks.
    2. Refactor the generator/check path to depend on source-truth-safe rendering or explicit freshness validation.
    3. Add regression coverage and verify with targeted docs/bootstrap checks.
  Verify Steps: |-
    1. Modify bootstrap doc generation/check paths so src changes cannot validate against stale dist silently.
    2. Add or update tests that fail when bootstrap docs are generated from stale dist.
    3. Run the targeted test suite plus the bootstrap freshness check path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T04:05:43.701Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
    Result: pass
    Evidence: 2 tests passed covering stale-dist and missing-dist rejection for bootstrap doc scripts.
    Scope: scripts/lib/generated-artifacts.mjs and bootstrap doc generator/check guards.
    
    Command: bun x eslint scripts/lib/generated-artifacts.mjs scripts/generate-agent-bootstrap-doc.mjs scripts/check-agent-bootstrap-fresh.mjs packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
    Result: pass
    Evidence: no lint errors after typing the script helper import in the regression test.
    Scope: touched scripts and new test only.
    
    Command: bun run framework:dev:bootstrap && node scripts/check-agent-bootstrap-fresh.mjs
    Result: pass
    Evidence: repo-local runtime rebuilt successfully and bootstrap freshness check reported docs/runtime surfaces aligned.
    Scope: real framework-worktree bootstrap and docs freshness path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T01:37:02.903Z, excerpt_hash=sha256:0919077183c93be9fd6de243fa81149239c9988cb203e5ad37a479017f03ebeb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix bootstrap doc generation to reject stale dist

Generator and freshness check for agent bootstrap docs still import dist bootstrap-guide modules directly, so docs can be regenerated and validated against stale dist after src changes. Make the path source-truth safe or fail fast when dist is stale.

## Scope

- In scope: Generator and freshness check for agent bootstrap docs still import dist bootstrap-guide modules directly, so docs can be regenerated and validated against stale dist after src changes. Make the path source-truth safe or fail fast when dist is stale.
- Out of scope: unrelated refactors not required for "Fix bootstrap doc generation to reject stale dist".

## Plan

1. Reproduce the stale-dist coupling in bootstrap doc generation and freshness checks.
2. Refactor the generator/check path to depend on source-truth-safe rendering or explicit freshness validation.
3. Add regression coverage and verify with targeted docs/bootstrap checks.

## Verify Steps

1. Modify bootstrap doc generation/check paths so src changes cannot validate against stale dist silently.
2. Add or update tests that fail when bootstrap docs are generated from stale dist.
3. Run the targeted test suite plus the bootstrap freshness check path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T04:05:43.701Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
Result: pass
Evidence: 2 tests passed covering stale-dist and missing-dist rejection for bootstrap doc scripts.
Scope: scripts/lib/generated-artifacts.mjs and bootstrap doc generator/check guards.

Command: bun x eslint scripts/lib/generated-artifacts.mjs scripts/generate-agent-bootstrap-doc.mjs scripts/check-agent-bootstrap-fresh.mjs packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
Result: pass
Evidence: no lint errors after typing the script helper import in the regression test.
Scope: touched scripts and new test only.

Command: bun run framework:dev:bootstrap && node scripts/check-agent-bootstrap-fresh.mjs
Result: pass
Evidence: repo-local runtime rebuilt successfully and bootstrap freshness check reported docs/runtime surfaces aligned.
Scope: real framework-worktree bootstrap and docs freshness path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T01:37:02.903Z, excerpt_hash=sha256:0919077183c93be9fd6de243fa81149239c9988cb203e5ad37a479017f03ebeb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
