---
id: "202604241137-YDECVA"
title: "v0.3 hygiene H1: ratchet Knip baseline after cleanup"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604241136-NWWGZV"
  - "202604241136-R6RZ93"
  - "202604241136-ZE24F8"
  - "202604241137-ZE0F39"
tags:
  - "cleanup"
  - "tooling"
  - "v0.3"
verify:
  - "bun run knip"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T14:38:49.185Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T14:39:54.989Z"
  updated_by: "CODER"
  note: "Command: bun run knip:check. Result: pass. Evidence: Knip unused-code baseline OK (files=5/5, exports=236/236, types=294/294, enumMembers=0/0, namespaceMembers=0/0, total=535/535). Scope: scripts/check-knip-baseline.mjs baseline enforcement after v0.3 cleanup. Additional checks: git diff --check passed; agentplane doctor passed with 0 errors and 0 warnings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Ratchet the Knip unused-code baseline after completed v0.3 cleanup, keeping the change limited to the enforcement script and verifying with the repository Knip check surface."
events:
  -
    type: "status"
    at: "2026-04-24T14:39:02.423Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Ratchet the Knip unused-code baseline after completed v0.3 cleanup, keeping the change limited to the enforcement script and verifying with the repository Knip check surface."
  -
    type: "verify"
    at: "2026-04-24T14:39:54.989Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run knip:check. Result: pass. Evidence: Knip unused-code baseline OK (files=5/5, exports=236/236, types=294/294, enumMembers=0/0, namespaceMembers=0/0, total=535/535). Scope: scripts/check-knip-baseline.mjs baseline enforcement after v0.3 cleanup. Additional checks: git diff --check passed; agentplane doctor passed with 0 errors and 0 warnings."
doc_version: 3
doc_updated_at: "2026-04-24T14:39:55.000Z"
doc_updated_by: "CODER"
description: "Lower the Knip unused-code baseline by the amount removed during v0.3 freeze cleanup."
sections:
  Summary: |-
    v0.3 hygiene H1: ratchet Knip baseline after cleanup
    
    Lower the Knip unused-code baseline by the amount removed during v0.3 freeze cleanup.
  Scope: |-
    - In scope: Lower the Knip unused-code baseline by the amount removed during v0.3 freeze cleanup.
    - Out of scope: unrelated refactors not required for "v0.3 hygiene H1: ratchet Knip baseline after cleanup".
  Plan: |-
    1. Inspect the current Knip baseline enforcement script and package scripts to identify the checked maxima and the executable verification command.
    2. Run the current Knip baseline check/report to capture actual unused-code counts after completed freeze cleanup.
    3. Lower only the Knip baseline maxima that are now below the old ceiling, without changing Knip scan scope.
    4. Verify with the repository Knip check command, record task verification evidence, then finish with a traceable commit.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 hygiene H1: ratchet Knip baseline after cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T14:39:54.989Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run knip:check. Result: pass. Evidence: Knip unused-code baseline OK (files=5/5, exports=236/236, types=294/294, enumMembers=0/0, namespaceMembers=0/0, total=535/535). Scope: scripts/check-knip-baseline.mjs baseline enforcement after v0.3 cleanup. Additional checks: git diff --check passed; agentplane doctor passed with 0 errors and 0 warnings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:39:02.449Z, excerpt_hash=sha256:c5153e8735978054756687d08fe5503bea87b2c886670d764444681f6828bb65
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 hygiene H1: ratchet Knip baseline after cleanup

Lower the Knip unused-code baseline by the amount removed during v0.3 freeze cleanup.

## Scope

- In scope: Lower the Knip unused-code baseline by the amount removed during v0.3 freeze cleanup.
- Out of scope: unrelated refactors not required for "v0.3 hygiene H1: ratchet Knip baseline after cleanup".

## Plan

1. Inspect the current Knip baseline enforcement script and package scripts to identify the checked maxima and the executable verification command.
2. Run the current Knip baseline check/report to capture actual unused-code counts after completed freeze cleanup.
3. Lower only the Knip baseline maxima that are now below the old ceiling, without changing Knip scan scope.
4. Verify with the repository Knip check command, record task verification evidence, then finish with a traceable commit.

## Verify Steps

1. Review the requested outcome for "v0.3 hygiene H1: ratchet Knip baseline after cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T14:39:54.989Z — VERIFY — ok

By: CODER

Note: Command: bun run knip:check. Result: pass. Evidence: Knip unused-code baseline OK (files=5/5, exports=236/236, types=294/294, enumMembers=0/0, namespaceMembers=0/0, total=535/535). Scope: scripts/check-knip-baseline.mjs baseline enforcement after v0.3 cleanup. Additional checks: git diff --check passed; agentplane doctor passed with 0 errors and 0 warnings.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:39:02.449Z, excerpt_hash=sha256:c5153e8735978054756687d08fe5503bea87b2c886670d764444681f6828bb65

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
