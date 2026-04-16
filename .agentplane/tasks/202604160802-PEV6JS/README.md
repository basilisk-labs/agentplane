---
id: "202604160802-PEV6JS"
title: "Isolate framework core runtime resolution inside framework checkouts"
result_summary: "Merged via PR #346."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-16T08:03:13.970Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-16T08:06:04.497Z"
  updated_by: "CODER"
  note: "Verified framework runtime core isolation with focused checks: bun vitest run packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t runtime && bun run framework:dev:bootstrap && node packages/agentplane/bin/agentplane.js runtime explain && node packages/agentplane/bin/agentplane.js doctor"
commit:
  hash: "be57bc8e1fc2d7cdf07f025763a1299457ddfcda"
  message: "🚧 PEV6JS task: isolate framework core runtime resolution (#346)"
comments:
  -
    author: "CODER"
    body: "Start: isolating framework runtime core resolution so framework checkouts resolve @agentplaneorg/core from their own packages/core instead of the shared repo root."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #346 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-16T08:03:41.445Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolating framework runtime core resolution so framework checkouts resolve @agentplaneorg/core from their own packages/core instead of the shared repo root."
  -
    type: "verify"
    at: "2026-04-16T08:06:04.497Z"
    author: "CODER"
    state: "ok"
    note: "Verified framework runtime core isolation with focused checks: bun vitest run packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t runtime && bun run framework:dev:bootstrap && node packages/agentplane/bin/agentplane.js runtime explain && node packages/agentplane/bin/agentplane.js doctor"
  -
    type: "status"
    at: "2026-04-16T08:11:37.149Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #346 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-16T08:11:37.155Z"
doc_updated_by: "INTEGRATOR"
description: "Ensure runtime source reporting and framework-mode package resolution prefer the framework checkout's packages/core instead of falling back to the shared repo root when running inside a framework checkout."
sections:
  Summary: |-
    Isolate framework core runtime resolution inside framework checkouts
    
    Ensure runtime source reporting and framework-mode package resolution prefer the framework checkout's packages/core instead of falling back to the shared repo root when running inside a framework checkout.
  Scope: |-
    - In scope: Ensure runtime source reporting and framework-mode package resolution prefer the framework checkout's packages/core instead of falling back to the shared repo root when running inside a framework checkout.
    - Out of scope: unrelated refactors not required for "Isolate framework core runtime resolution inside framework checkouts".
  Plan: |-
    1. Inspect framework runtime resolution and identify the smallest change that makes @agentplaneorg/core resolve from the framework checkout when available. -> verify: source of mismatch is mapped in code and tests
    2. Implement the framework-checkout-aware core resolution path without changing non-framework runtime modes. -> verify: runtime explain and doctor-facing facts point to the framework checkout core root in framework mode
    3. Add focused regression coverage, then publish the branch_pr task through PR and hosted close. -> verify: targeted tests pass and the branch lands on main cleanly
  Verify Steps: |-
    1. Review the requested outcome for "Isolate framework core runtime resolution inside framework checkouts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-16T08:06:04.497Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified framework runtime core isolation with focused checks: bun vitest run packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t runtime && bun run framework:dev:bootstrap && node packages/agentplane/bin/agentplane.js runtime explain && node packages/agentplane/bin/agentplane.js doctor
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T08:03:41.456Z, excerpt_hash=sha256:ce41e9e563cc49aca5f55f6f7c5ab00fe0a205d29d53e207003545161dbf422a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Isolate framework core runtime resolution inside framework checkouts

Ensure runtime source reporting and framework-mode package resolution prefer the framework checkout's packages/core instead of falling back to the shared repo root when running inside a framework checkout.

## Scope

- In scope: Ensure runtime source reporting and framework-mode package resolution prefer the framework checkout's packages/core instead of falling back to the shared repo root when running inside a framework checkout.
- Out of scope: unrelated refactors not required for "Isolate framework core runtime resolution inside framework checkouts".

## Plan

1. Inspect framework runtime resolution and identify the smallest change that makes @agentplaneorg/core resolve from the framework checkout when available. -> verify: source of mismatch is mapped in code and tests
2. Implement the framework-checkout-aware core resolution path without changing non-framework runtime modes. -> verify: runtime explain and doctor-facing facts point to the framework checkout core root in framework mode
3. Add focused regression coverage, then publish the branch_pr task through PR and hosted close. -> verify: targeted tests pass and the branch lands on main cleanly

## Verify Steps

1. Review the requested outcome for "Isolate framework core runtime resolution inside framework checkouts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-16T08:06:04.497Z — VERIFY — ok

By: CODER

Note: Verified framework runtime core isolation with focused checks: bun vitest run packages/agentplane/src/shared/runtime-source.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t runtime && bun run framework:dev:bootstrap && node packages/agentplane/bin/agentplane.js runtime explain && node packages/agentplane/bin/agentplane.js doctor

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T08:03:41.456Z, excerpt_hash=sha256:ce41e9e563cc49aca5f55f6f7c5ab00fe0a205d29d53e207003545161dbf422a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
