---
id: "202604241137-XX1M2W"
title: "v0.3 hygiene H3: resolve agentplane-recipes submodule residue"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "git"
  - "v0.3"
verify:
  - "git submodule status"
  - "test ! -f .gitmodules || cat .gitmodules"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T14:43:45.330Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T14:44:17.429Z"
  updated_by: "CODER"
  note: "Command: git submodule status. Result: pass. Evidence: agentplane-recipes is pinned at 021c99bc8527220bf9339872903cf30105adea97. Scope: submodule initialization state. Command: test ! -f .gitmodules || cat .gitmodules. Result: pass. Evidence: .gitmodules contains path=agentplane-recipes and basilisk-labs/agentplane-recipes URL. Scope: submodule metadata. Additional checks: git ls-tree HEAD agentplane-recipes shows mode 160000 gitlink; git -C agentplane-recipes status --short --untracked-files=no is clean."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Resolve the agentplane-recipes submodule hygiene item by checking the current gitlink, .gitmodules metadata, and live directory contents before deciding whether any repo metadata should change."
events:
  -
    type: "status"
    at: "2026-04-24T14:43:55.142Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Resolve the agentplane-recipes submodule hygiene item by checking the current gitlink, .gitmodules metadata, and live directory contents before deciding whether any repo metadata should change."
  -
    type: "verify"
    at: "2026-04-24T14:44:17.429Z"
    author: "CODER"
    state: "ok"
    note: "Command: git submodule status. Result: pass. Evidence: agentplane-recipes is pinned at 021c99bc8527220bf9339872903cf30105adea97. Scope: submodule initialization state. Command: test ! -f .gitmodules || cat .gitmodules. Result: pass. Evidence: .gitmodules contains path=agentplane-recipes and basilisk-labs/agentplane-recipes URL. Scope: submodule metadata. Additional checks: git ls-tree HEAD agentplane-recipes shows mode 160000 gitlink; git -C agentplane-recipes status --short --untracked-files=no is clean."
doc_version: 3
doc_updated_at: "2026-04-24T14:44:17.435Z"
doc_updated_by: "CODER"
description: "Decide and apply the repository treatment for the empty agentplane-recipes submodule reference: initialize it as active or remove the stale .gitmodules entry."
sections:
  Summary: |-
    v0.3 hygiene H3: resolve agentplane-recipes submodule residue

    Decide and apply the repository treatment for the empty agentplane-recipes submodule reference: initialize it as active or remove the stale .gitmodules entry.
  Scope: |-
    - In scope: Decide and apply the repository treatment for the empty agentplane-recipes submodule reference: initialize it as active or remove the stale .gitmodules entry.
    - Out of scope: unrelated refactors not required for "v0.3 hygiene H3: resolve agentplane-recipes submodule residue".
  Plan: |-
    1. Inspect .gitmodules, gitlink status, and agentplane-recipes working directory contents to determine whether the audit's empty-submodule premise still holds.
    2. Verify the submodule is initialized and clean, or remove stale metadata only if the submodule is actually dead.
    3. Record a task-local decision with evidence. Keep .gitmodules unchanged when it represents an active recipes source used by docs/scripts/tests.
    4. Run the declared submodule checks, record verification, and finish with traceable task metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 hygiene H3: resolve agentplane-recipes submodule residue". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T14:44:17.429Z — VERIFY — ok

    By: CODER

    Note: Command: git submodule status. Result: pass. Evidence: agentplane-recipes is pinned at 021c99bc8527220bf9339872903cf30105adea97. Scope: submodule initialization state. Command: test ! -f .gitmodules || cat .gitmodules. Result: pass. Evidence: .gitmodules contains path=agentplane-recipes and basilisk-labs/agentplane-recipes URL. Scope: submodule metadata. Additional checks: git ls-tree HEAD agentplane-recipes shows mode 160000 gitlink; git -C agentplane-recipes status --short --untracked-files=no is clean.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:44:08.715Z, excerpt_hash=sha256:a2aedc152ae5b7c9999d4b6dabcd7d4fd92f5fa663fc0749f1e8c34f149cb774

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The audit premise that agentplane-recipes is an empty submodule residue is no longer true in the current checkout: .gitmodules defines the submodule and git records agentplane-recipes as gitlink 021c99bc8527220bf9339872903cf30105adea97.
      Impact: Removing .gitmodules or the gitlink would break recipes inventory generation, bootstrap guidance, docs, and tests that read agentplane-recipes/index.json.
      Resolution: Keep the active submodule metadata unchanged for v0.3; treat bootstrap initialization as the supported path for fresh checkouts.
id_source: "generated"
---
## Summary

v0.3 hygiene H3: resolve agentplane-recipes submodule residue

Decide and apply the repository treatment for the empty agentplane-recipes submodule reference: initialize it as active or remove the stale .gitmodules entry.

## Scope

- In scope: Decide and apply the repository treatment for the empty agentplane-recipes submodule reference: initialize it as active or remove the stale .gitmodules entry.
- Out of scope: unrelated refactors not required for "v0.3 hygiene H3: resolve agentplane-recipes submodule residue".

## Plan

1. Inspect .gitmodules, gitlink status, and agentplane-recipes working directory contents to determine whether the audit's empty-submodule premise still holds.
2. Verify the submodule is initialized and clean, or remove stale metadata only if the submodule is actually dead.
3. Record a task-local decision with evidence. Keep .gitmodules unchanged when it represents an active recipes source used by docs/scripts/tests.
4. Run the declared submodule checks, record verification, and finish with traceable task metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 hygiene H3: resolve agentplane-recipes submodule residue". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T14:44:17.429Z — VERIFY — ok

By: CODER

Note: Command: git submodule status. Result: pass. Evidence: agentplane-recipes is pinned at 021c99bc8527220bf9339872903cf30105adea97. Scope: submodule initialization state. Command: test ! -f .gitmodules || cat .gitmodules. Result: pass. Evidence: .gitmodules contains path=agentplane-recipes and basilisk-labs/agentplane-recipes URL. Scope: submodule metadata. Additional checks: git ls-tree HEAD agentplane-recipes shows mode 160000 gitlink; git -C agentplane-recipes status --short --untracked-files=no is clean.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:44:08.715Z, excerpt_hash=sha256:a2aedc152ae5b7c9999d4b6dabcd7d4fd92f5fa663fc0749f1e8c34f149cb774

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The audit premise that agentplane-recipes is an empty submodule residue is no longer true in the current checkout: .gitmodules defines the submodule and git records agentplane-recipes as gitlink 021c99bc8527220bf9339872903cf30105adea97.
  Impact: Removing .gitmodules or the gitlink would break recipes inventory generation, bootstrap guidance, docs, and tests that read agentplane-recipes/index.json.
  Resolution: Keep the active submodule metadata unchanged for v0.3; treat bootstrap initialization as the supported path for fresh checkouts.
