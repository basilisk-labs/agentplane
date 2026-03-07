---
id: "202603072032-4D9ASG"
title: "Expand read-only stale-dist policy and docs"
result_summary: "Expanded stale-dist warning-only handling to inspection surfaces like task/config/help/quickstart and synced framework-dev troubleshooting docs without weakening mutation guards."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603072032-V9VGT2"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T21:00:18.501Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T21:01:38.958Z"
  updated_by: "CODER"
  note: "Expanded stale-dist warning-only handling to safe inspection commands: help/version, quickstart, role, config show, and task list/show/verify-show. Verified with stale-dist classifier/integration tests, eslint, routing check, manual task-list warn-run on a dirty checkout, and a matching hard-fail for mutating task doc set."
commit:
  hash: "cc2b4a20d40db926a2dd50682dd6034c77e4e779"
  message: "🧭 4D9ASG docs: widen stale dist inspection mode"
comments:
  -
    author: "CODER"
    body: "Start: expand stale-dist warning-only handling to safe inspection commands so framework contributors can inspect state on a dirty checkout without rebuilding first."
  -
    author: "CODER"
    body: "Verified: safe inspection commands now warn and continue on a stale dirty checkout, while mutating commands still hard-fail until rebuild."
events:
  -
    type: "status"
    at: "2026-03-07T21:00:24.599Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expand stale-dist warning-only handling to safe inspection commands so framework contributors can inspect state on a dirty checkout without rebuilding first."
  -
    type: "verify"
    at: "2026-03-07T21:01:38.958Z"
    author: "CODER"
    state: "ok"
    note: "Expanded stale-dist warning-only handling to safe inspection commands: help/version, quickstart, role, config show, and task list/show/verify-show. Verified with stale-dist classifier/integration tests, eslint, routing check, manual task-list warn-run on a dirty checkout, and a matching hard-fail for mutating task doc set."
  -
    type: "status"
    at: "2026-03-07T21:02:08.241Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: safe inspection commands now warn and continue on a stale dirty checkout, while mutating commands still hard-fail until rebuild."
doc_version: 2
doc_updated_at: "2026-03-07T21:02:08.241Z"
doc_updated_by: "CODER"
description: "Apply the improved stale-dist contract to other read-only inspection commands, add regressions, and document framework-dev expectations."
id_source: "generated"
---
## Summary

Expand read-only stale-dist policy and docs

Apply the improved stale-dist contract to other read-only inspection commands, add regressions, and document framework-dev expectations.

## Scope

- In scope: Apply the improved stale-dist contract to other read-only inspection commands, add regressions, and document framework-dev expectations..
- Out of scope: unrelated refactors not required for "Expand read-only stale-dist policy and docs".

## Plan

1. Expand stale-dist policy classification to cover safe inspection surfaces used during framework development: quickstart/help/version, role guidance, config show, and task inspection commands such as list/show/verify-show. 2. Keep every mutating or state-changing command strict, update warning text/docs to reflect the broader inspection contract, and add regressions proving inspection warns-and-runs while mutation still blocks. 3. Verify with targeted tests plus a manual dirty-checkout inspection run, then close the task.

## Risks

- Risk: broadening warning-only behavior too far can let state-changing commands run on stale dist and hide real runtime drift.\n- Mitigation: explicitly enumerate safe inspection commands and leave all other argv shapes in strict mode.\n\n- Risk: docs may over-promise if the policy surface and human guidance diverge again.\n- Mitigation: update command docs/troubleshooting in the same task and add regressions for representative inspection and strict commands.

## Verify Steps

### Scope
- Primary tag: `code`
- Surfaces: stale-dist command classifier, warning-only inspection contract, framework-dev docs/troubleshooting.

### Checks
- `bunx vitest run packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts`
- `bunx eslint packages/agentplane/bin/stale-dist-policy.js packages/agentplane/bin/agentplane.js packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts`
- `agentplane task list`
- `agentplane runtime explain --json`
- `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record that inspection commands warn-and-run on a stale dirty checkout without rebuild, while a representative mutating command still hard-fails.

### Pass criteria
- Safe inspection commands no longer require rebuild first, but mutating commands still respect the stale-dist block.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T21:01:38.958Z — VERIFY — ok

By: CODER

Note: Expanded stale-dist warning-only handling to safe inspection commands: help/version, quickstart, role, config show, and task list/show/verify-show. Verified with stale-dist classifier/integration tests, eslint, routing check, manual task-list warn-run on a dirty checkout, and a matching hard-fail for mutating task doc set.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T21:00:24.599Z, excerpt_hash=sha256:428636b13121ef7b806e25b51753cd37c88daf581b97e1e10e9f8ffd4f0a85b8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Keep this task intentionally narrow: extend the read-only inspection set, do not reopen the freshness algorithm itself.\n- Prefer command-shape helpers over ad-hoc string checks so future additions remain reviewable.
