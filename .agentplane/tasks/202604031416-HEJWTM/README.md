---
id: "202604031416-HEJWTM"
title: "Automate incidents registry and advice lookup"
result_summary: "integrate: squash task/202604031416-HEJWTM/incidents-registry"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T14:17:30.259Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-03T14:48:57.623Z"
  updated_by: "CODER"
  note: "Verified: added incidents runtime/CLI, finish auto-promotion, start-ready advice lookup, synced live + asset policy templates, and passed bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; pre-commit fast contour passed during source commit."
commit:
  hash: "690e76a27e3671b641065290130d27d6b9af6749"
  message: "🧩 HEJWTM integrate: policy/workflow: Automate incidents registry and advice lookup"
comments:
  -
    author: "CODER"
    body: "Start: implement a real incidents registry pipeline that can promote incident-candidate findings into incidents.md and surface relevant incident advice for analogous tasks before execution."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604031416-HEJWTM/pr."
events:
  -
    type: "status"
    at: "2026-04-03T14:18:11.260Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a real incidents registry pipeline that can promote incident-candidate findings into incidents.md and surface relevant incident advice for analogous tasks before execution."
  -
    type: "verify"
    at: "2026-04-03T14:48:57.623Z"
    author: "CODER"
    state: "ok"
    note: "Verified: added incidents runtime/CLI, finish auto-promotion, start-ready advice lookup, synced live + asset policy templates, and passed bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; pre-commit fast contour passed during source commit."
  -
    type: "status"
    at: "2026-04-03T14:51:06.837Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604031416-HEJWTM/pr."
doc_version: 3
doc_updated_at: "2026-04-03T14:51:06.839Z"
doc_updated_by: "INTEGRATOR"
description: "Make incidents.md accumulate resolved incident candidates from finished tasks and surface relevant incident advice for new tasks by tags or scope before release."
sections:
  Summary: |-
    Automate incidents registry and advice lookup
    
    Make incidents.md accumulate resolved incident candidates from finished tasks and surface relevant incident advice for new tasks by tags or scope before release.
  Scope: |-
    - In scope: Make incidents.md accumulate resolved incident candidates from finished tasks and surface relevant incident advice for new tasks by tags or scope before release.
    - Out of scope: unrelated refactors not required for "Automate incidents registry and advice lookup".
  Plan: "1. Define a structured incident-registry contract that can parse and append entries in .agentplane/policy/incidents.md without breaking existing manual entries. 2. Reuse or formalize the latent task Findings convention for incident candidates so finished tasks can be reviewed and promoted into the incident registry with deterministic evidence. 3. Add incident advice lookup for new tasks using task tags plus lightweight scope matching, and surface the matched advice in start/task workflows without forcing incidents.md into every startup path. 4. Cover the new collection and lookup paths with focused tests and update policy/docs where the incidents contract changes."
  Verify Steps: |-
    1. Run focused incident-registry and task-workflow tests that cover candidate extraction, incidents.md append, deduplication, and advice lookup. Expected: the new incident collection and advice surfaces behave deterministically and existing workflows stay green.
    2. Exercise the relevant CLI/task path on a fixture task with incident-candidate findings. Expected: the resolved incident is promotable into `.agentplane/policy/incidents.md` with traceable evidence and no manual file surgery.
    3. Start or inspect a new analogous task with matching tags/scope. Expected: the task workflow surfaces the relevant incident advice before execution so the same external/process failure is not rediscovered blindly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T14:48:57.623Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: added incidents runtime/CLI, finish auto-promotion, start-ready advice lookup, synced live + asset policy templates, and passed bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; pre-commit fast contour passed during source commit.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T14:18:11.266Z, excerpt_hash=sha256:f614c495bef639377ceb7483c931ff4392c49706201116a4a2d41c5665f7bf64
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Automate incidents registry and advice lookup

Make incidents.md accumulate resolved incident candidates from finished tasks and surface relevant incident advice for new tasks by tags or scope before release.

## Scope

- In scope: Make incidents.md accumulate resolved incident candidates from finished tasks and surface relevant incident advice for new tasks by tags or scope before release.
- Out of scope: unrelated refactors not required for "Automate incidents registry and advice lookup".

## Plan

1. Define a structured incident-registry contract that can parse and append entries in .agentplane/policy/incidents.md without breaking existing manual entries. 2. Reuse or formalize the latent task Findings convention for incident candidates so finished tasks can be reviewed and promoted into the incident registry with deterministic evidence. 3. Add incident advice lookup for new tasks using task tags plus lightweight scope matching, and surface the matched advice in start/task workflows without forcing incidents.md into every startup path. 4. Cover the new collection and lookup paths with focused tests and update policy/docs where the incidents contract changes.

## Verify Steps

1. Run focused incident-registry and task-workflow tests that cover candidate extraction, incidents.md append, deduplication, and advice lookup. Expected: the new incident collection and advice surfaces behave deterministically and existing workflows stay green.
2. Exercise the relevant CLI/task path on a fixture task with incident-candidate findings. Expected: the resolved incident is promotable into `.agentplane/policy/incidents.md` with traceable evidence and no manual file surgery.
3. Start or inspect a new analogous task with matching tags/scope. Expected: the task workflow surfaces the relevant incident advice before execution so the same external/process failure is not rediscovered blindly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T14:48:57.623Z — VERIFY — ok

By: CODER

Note: Verified: added incidents runtime/CLI, finish auto-promotion, start-ready advice lookup, synced live + asset policy templates, and passed bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; pre-commit fast contour passed during source commit.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T14:18:11.266Z, excerpt_hash=sha256:f614c495bef639377ceb7483c931ff4392c49706201116a4a2d41c5665f7bf64

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
