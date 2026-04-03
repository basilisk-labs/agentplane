---
id: "202604030423-BRRQ94"
title: "Fix workflow mode drift between AGENTS.md and init config"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:23:15.406Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-03T04:31:14.033Z"
  updated_by: "CODER"
  note: "Targeted vitest suites passed, policy routing check passed, and fresh direct init no longer hardcodes branch_pr in AGENTS.md."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align policy gateway workflow wording with generated config and workflow-mode sync paths."
events:
  -
    type: "status"
    at: "2026-04-03T04:24:36.511Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align policy gateway workflow wording with generated config and workflow-mode sync paths."
  -
    type: "verify"
    at: "2026-04-03T04:31:14.033Z"
    author: "CODER"
    state: "ok"
    note: "Targeted vitest suites passed, policy routing check passed, and fresh direct init no longer hardcodes branch_pr in AGENTS.md."
doc_version: 3
doc_updated_at: "2026-04-03T04:31:14.036Z"
doc_updated_by: "CODER"
description: "Eliminate fresh-install and mode-switch drift where the policy gateway implies branch_pr while .agentplane/config.json is direct. Keep one workflow source, minimize code duplication, update tests, and preserve GitHub-facing UX clarity."
sections:
  Summary: |-
    Fix workflow mode drift between AGENTS.md and init config
    
    Eliminate fresh-install and mode-switch drift where the policy gateway implies branch_pr while .agentplane/config.json is direct. Keep one workflow source, minimize code duplication, update tests, and preserve GitHub-facing UX clarity.
  Scope: |-
    - In scope: Eliminate fresh-install and mode-switch drift where the policy gateway implies branch_pr while .agentplane/config.json is direct. Keep one workflow source, minimize code duplication, update tests, and preserve GitHub-facing UX clarity.
    - Out of scope: unrelated refactors not required for "Fix workflow mode drift between AGENTS.md and init config".
  Plan: "1. Reproduce the direct-mode gateway/config drift from init and workflow-mode changes. 2. Refactor gateway rendering so workflow-specific guidance is derived from one workflow input instead of hardcoded branch_pr prose. 3. Ensure init and mode/config changes refresh the gateway consistently. 4. Add regression tests for fresh direct init, branch_pr init, and workflow mode switching. 5. Run targeted verification and record evidence."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000`. Expected: both suites pass.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: output is `policy routing OK`.
    3. Initialize a temporary repo with `node packages/agentplane/bin/agentplane.js init --yes --root <tmp>`. Expected: generated `AGENTS.md` says the route is determined by `workflow_mode` and does not hardcode `workflow_mode=branch_pr`.
  Verification: |-
    - `bunx vitest run packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000` -> pass (`48` tests).
    - `node .agentplane/policy/check-routing.mjs` -> `policy routing OK`.
    - Manual temp-repo repro with `node packages/agentplane/bin/agentplane.js init --yes --root <tmp>` -> generated `AGENTS.md` now points to `workflow_mode` instead of hardcoding `workflow_mode=branch_pr`.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T04:31:14.033Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted vitest suites passed, policy routing check passed, and fresh direct init no longer hardcodes branch_pr in AGENTS.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T04:31:08.145Z, excerpt_hash=sha256:1f670691f3a0380c60e55eea51db34d8e9613fe5507de4f5e1af4152b10a4a13
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix workflow mode drift between AGENTS.md and init config

Eliminate fresh-install and mode-switch drift where the policy gateway implies branch_pr while .agentplane/config.json is direct. Keep one workflow source, minimize code duplication, update tests, and preserve GitHub-facing UX clarity.

## Scope

- In scope: Eliminate fresh-install and mode-switch drift where the policy gateway implies branch_pr while .agentplane/config.json is direct. Keep one workflow source, minimize code duplication, update tests, and preserve GitHub-facing UX clarity.
- Out of scope: unrelated refactors not required for "Fix workflow mode drift between AGENTS.md and init config".

## Plan

1. Reproduce the direct-mode gateway/config drift from init and workflow-mode changes. 2. Refactor gateway rendering so workflow-specific guidance is derived from one workflow input instead of hardcoded branch_pr prose. 3. Ensure init and mode/config changes refresh the gateway consistently. 4. Add regression tests for fresh direct init, branch_pr init, and workflow mode switching. 5. Run targeted verification and record evidence.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000`. Expected: both suites pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: output is `policy routing OK`.
3. Initialize a temporary repo with `node packages/agentplane/bin/agentplane.js init --yes --root <tmp>`. Expected: generated `AGENTS.md` says the route is determined by `workflow_mode` and does not hardcode `workflow_mode=branch_pr`.

## Verification

- `bunx vitest run packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000` -> pass (`48` tests).
- `node .agentplane/policy/check-routing.mjs` -> `policy routing OK`.
- Manual temp-repo repro with `node packages/agentplane/bin/agentplane.js init --yes --root <tmp>` -> generated `AGENTS.md` now points to `workflow_mode` instead of hardcoding `workflow_mode=branch_pr`.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T04:31:14.033Z — VERIFY — ok

By: CODER

Note: Targeted vitest suites passed, policy routing check passed, and fresh direct init no longer hardcodes branch_pr in AGENTS.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T04:31:08.145Z, excerpt_hash=sha256:1f670691f3a0380c60e55eea51db34d8e9613fe5507de4f5e1af4152b10a4a13

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
