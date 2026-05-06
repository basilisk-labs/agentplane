---
id: "202605061631-C38BR9"
title: "Fix incident promotion and clear active registry"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T16:31:37.441Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T16:59:22.789Z"
  updated_by: "CODER"
  note: "Implemented explicit incident promotion: task findings are local by default, --promote/--external/--repo-fixable opt into registry candidates, success verification summaries are excluded from auto-promotion, and the active incident registry is archived/cleared for release."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix incident promotion so successful verification notes remain task-local, archive current incident evidence, and clear the active registry."
events:
  -
    type: "status"
    at: "2026-05-06T16:32:44.677Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix incident promotion so successful verification notes remain task-local, archive current incident evidence, and clear the active registry."
  -
    type: "verify"
    at: "2026-05-06T16:58:21.188Z"
    author: "CODER"
    state: "ok"
    note: "Verified explicit incident promotion and active registry cleanup. Evidence: focused incident/findings/verify/help Vitest suite passed (8 files, 63 tests); bun run build; bun run typecheck; bun run lint:core; docs bootstrap and CLI reference checks; agents:sync/check; release incident gate; policy routing; git diff --check; ap doctor."
  -
    type: "verify"
    at: "2026-05-06T16:59:22.789Z"
    author: "CODER"
    state: "ok"
    note: "Implemented explicit incident promotion: task findings are local by default, --promote/--external/--repo-fixable opt into registry candidates, success verification summaries are excluded from auto-promotion, and the active incident registry is archived/cleared for release."
doc_version: 3
doc_updated_at: "2026-05-06T16:59:22.801Z"
doc_updated_by: "CODER"
description: "Prevent successful task verification summaries from being auto-promoted into active incidents, archive current incident entries with evidence, and leave the active incidents registry clean for release gates."
sections:
  Summary: |-
    Fix incident promotion and clear active registry
    
    Prevent successful task verification summaries from being auto-promoted into active incidents, archive current incident entries with evidence, and leave the active incidents registry clean for release gates.
  Scope: |-
    - In scope: Prevent successful task verification summaries from being auto-promoted into active incidents, archive current incident entries with evidence, and leave the active incidents registry clean for release gates.
    - Out of scope: unrelated refactors not required for "Fix incident promotion and clear active registry".
  Plan: |-
    1. Audit incident promotion code paths to identify why successful task findings enter the active incident registry.
    2. Change task finding defaults and/or promotion validation so only explicit failure-like reusable incidents are promotable; successful verification summaries stay task-local unless deliberately marked and failure-like.
    3. Add regression tests for non-failure structured findings and explicit failure-like incident promotion.
    4. Archive every current active incident entry into docs/developer/incident-archive.mdx with final disposition evidence.
    5. Reduce .agentplane/policy/incidents.md to the active-registry header only.
    6. Run focused incident tests, release incident gate, policy routing, doctor, and docs checks needed for changed policy/docs/code paths.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T16:58:21.188Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified explicit incident promotion and active registry cleanup. Evidence: focused incident/findings/verify/help Vitest suite passed (8 files, 63 tests); bun run build; bun run typecheck; bun run lint:core; docs bootstrap and CLI reference checks; agents:sync/check; release incident gate; policy routing; git diff --check; ap doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T16:32:44.677Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061631-C38BR9-incident-registry-cleanup/.agentplane/tasks/202605061631-C38BR9/blueprint/resolved-snapshot.json
    - old_digest: bab74a7efef08887c980107439be6e34c1d7397be2086891e47654e1d77107c1
    - current_digest: bab74a7efef08887c980107439be6e34c1d7397be2086891e47654e1d77107c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061631-C38BR9
    
    ### 2026-05-06T16:59:22.789Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented explicit incident promotion: task findings are local by default, --promote/--external/--repo-fixable opt into registry candidates, success verification summaries are excluded from auto-promotion, and the active incident registry is archived/cleared for release.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T16:58:21.204Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061631-C38BR9-incident-registry-cleanup/.agentplane/tasks/202605061631-C38BR9/blueprint/resolved-snapshot.json
    - old_digest: bab74a7efef08887c980107439be6e34c1d7397be2086891e47654e1d77107c1
    - current_digest: bab74a7efef08887c980107439be6e34c1d7397be2086891e47654e1d77107c1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061631-C38BR9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks passed: targeted incident/findings/verify tests (20 pass + 12 pass + focused branch_pr locality 1 pass), bun run lint:core, bun run typecheck, bun run format:check, bun run build, docs:cli:check, docs:bootstrap:check, release:incidents:check, node .agentplane/policy/check-routing.mjs, ap doctor, git diff --check.
      Impact: Successful task verification no longer becomes an active repo incident by default; agents must make cross-task incident promotion explicit.
      Resolution: Use task-local findings for normal verification evidence; use --promote, --external, or --repo-fixable only when a finding should enter incident collection.
id_source: "generated"
---
