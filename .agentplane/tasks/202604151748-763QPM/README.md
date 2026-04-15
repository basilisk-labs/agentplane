---
id: "202604151748-763QPM"
title: "Fix publish exact artifact selection for release-ready recovery"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T17:48:32.033Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T17:50:46.156Z"
  updated_by: "CODER"
  note: "Targeted release workflow checks passed: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The publish workflow now carries release_ready_artifact_name from source.json and downloads the exact detected artifact instead of hard-coding the generic release-ready name."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix publish exact artifact selection so detect carries the selected release-ready artifact identity into publish, cover it with minimal release tests, then replay the protected-main publish path for v0.3.12."
events:
  -
    type: "status"
    at: "2026-04-15T17:48:41.662Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix publish exact artifact selection so detect carries the selected release-ready artifact identity into publish, cover it with minimal release tests, then replay the protected-main publish path for v0.3.12."
  -
    type: "verify"
    at: "2026-04-15T17:50:46.156Z"
    author: "CODER"
    state: "ok"
    note: "Targeted release workflow checks passed: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The publish workflow now carries release_ready_artifact_name from source.json and downloads the exact detected artifact instead of hard-coding the generic release-ready name."
doc_version: 3
doc_updated_at: "2026-04-15T17:50:46.165Z"
doc_updated_by: "CODER"
description: "Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload."
sections:
  Summary: |-
    Fix publish exact artifact selection for release-ready recovery
    
    Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.
  Scope: |-
    - In scope: Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.
    - Out of scope: unrelated refactors not required for "Fix publish exact artifact selection for release-ready recovery".
  Plan: |-
    1. Implement the change for "Fix publish exact artifact selection for release-ready recovery".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Fix publish exact artifact selection for release-ready recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T17:50:46.156Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted release workflow checks passed: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The publish workflow now carries release_ready_artifact_name from source.json and downloads the exact detected artifact instead of hard-coding the generic release-ready name.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T17:48:41.676Z, excerpt_hash=sha256:fc2fb2fd1db596e73876d6140e28acc8699f63e46379a922a26780baac5c1d23
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix publish exact artifact selection for release-ready recovery

Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.

## Scope

- In scope: Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.
- Out of scope: unrelated refactors not required for "Fix publish exact artifact selection for release-ready recovery".

## Plan

1. Implement the change for "Fix publish exact artifact selection for release-ready recovery".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Fix publish exact artifact selection for release-ready recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T17:50:46.156Z — VERIFY — ok

By: CODER

Note: Targeted release workflow checks passed: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The publish workflow now carries release_ready_artifact_name from source.json and downloads the exact detected artifact instead of hard-coding the generic release-ready name.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T17:48:41.676Z, excerpt_hash=sha256:fc2fb2fd1db596e73876d6140e28acc8699f63e46379a922a26780baac5c1d23

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
