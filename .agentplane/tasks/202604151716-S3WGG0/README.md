---
id: "202604151716-S3WGG0"
title: "Resolve workflow_dispatch publish target from latest release-ready SHA"
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
  updated_at: "2026-04-15T17:17:41.977Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T17:21:10.260Z"
  updated_by: "CODER"
  note: "Verified publish target selection workflow change locally."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing workflow_dispatch publish target selection so branch_pr main resolves the latest reachable release-ready candidate instead of raw HEAD, while preserving explicit historical-sha recovery semantics and keeping the change limited to publish-resolution codepaths."
events:
  -
    type: "status"
    at: "2026-04-15T17:18:03.504Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing workflow_dispatch publish target selection so branch_pr main resolves the latest reachable release-ready candidate instead of raw HEAD, while preserving explicit historical-sha recovery semantics and keeping the change limited to publish-resolution codepaths."
  -
    type: "verify"
    at: "2026-04-15T17:21:10.260Z"
    author: "CODER"
    state: "ok"
    note: "Verified publish target selection workflow change locally."
doc_version: 3
doc_updated_at: "2026-04-15T17:21:10.275Z"
doc_updated_by: "CODER"
description: "Manual publish on branch_pr main should resolve the latest reachable release-ready candidate instead of raw HEAD when closure/task-artifact commits sit on top of the code merge."
sections:
  Summary: |-
    Resolve workflow_dispatch publish target from latest release-ready SHA
    
    Manual publish on branch_pr main should resolve the latest reachable release-ready candidate instead of raw HEAD when closure/task-artifact commits sit on top of the code merge.
  Scope: |-
    - In scope: Manual publish on branch_pr main should resolve the latest reachable release-ready candidate instead of raw HEAD when closure/task-artifact commits sit on top of the code merge.
    - Out of scope: unrelated refactors not required for "Resolve workflow_dispatch publish target from latest release-ready SHA".
  Plan: |-
    1. Implement the change for "Resolve workflow_dispatch publish target from latest release-ready SHA".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Resolve workflow_dispatch publish target from latest release-ready SHA". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T17:21:10.260Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified publish target selection workflow change locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T17:18:03.515Z, excerpt_hash=sha256:e1f912bb7ea81c9e5742d2e83c7c2d64f8813373f87033789c4e2fdc6a8f4874
    
    Details:
    
    Command: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
    Result: pass
    Evidence: 5 tests passed.
    Scope: publish workflow contract for workflow_dispatch candidate selection.
    
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy budget/routing integrity after workflow changes.
    
    Command: export GITHUB_REPOSITORY=basilisk-labs/agentplane GITHUB_TOKEN="$(gh auth token)"; while IFS= read -r candidate; do if node scripts/resolve-release-ready-source.mjs --workflow ci.yml --sha "$candidate" --json > /tmp/release-ready-source.json 2>/tmp/release-ready-source.err; then echo "$candidate"; cat /tmp/release-ready-source.json; break; fi; done < <(git rev-list --first-parent --max-count=16 origin/main)
    Result: pass
    Evidence: first reachable release-ready candidate resolved to 6119107a74578369e06af4090c0d412bb669651a and the artifact payload reported ready_artifact_available.
    Scope: branch_pr main manual publish target selection.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Resolve workflow_dispatch publish target from latest release-ready SHA

Manual publish on branch_pr main should resolve the latest reachable release-ready candidate instead of raw HEAD when closure/task-artifact commits sit on top of the code merge.

## Scope

- In scope: Manual publish on branch_pr main should resolve the latest reachable release-ready candidate instead of raw HEAD when closure/task-artifact commits sit on top of the code merge.
- Out of scope: unrelated refactors not required for "Resolve workflow_dispatch publish target from latest release-ready SHA".

## Plan

1. Implement the change for "Resolve workflow_dispatch publish target from latest release-ready SHA".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Resolve workflow_dispatch publish target from latest release-ready SHA". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T17:21:10.260Z — VERIFY — ok

By: CODER

Note: Verified publish target selection workflow change locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T17:18:03.515Z, excerpt_hash=sha256:e1f912bb7ea81c9e5742d2e83c7c2d64f8813373f87033789c4e2fdc6a8f4874

Details:

Command: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
Result: pass
Evidence: 5 tests passed.
Scope: publish workflow contract for workflow_dispatch candidate selection.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy budget/routing integrity after workflow changes.

Command: export GITHUB_REPOSITORY=basilisk-labs/agentplane GITHUB_TOKEN="$(gh auth token)"; while IFS= read -r candidate; do if node scripts/resolve-release-ready-source.mjs --workflow ci.yml --sha "$candidate" --json > /tmp/release-ready-source.json 2>/tmp/release-ready-source.err; then echo "$candidate"; cat /tmp/release-ready-source.json; break; fi; done < <(git rev-list --first-parent --max-count=16 origin/main)
Result: pass
Evidence: first reachable release-ready candidate resolved to 6119107a74578369e06af4090c0d412bb669651a and the artifact payload reported ready_artifact_available.
Scope: branch_pr main manual publish target selection.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
