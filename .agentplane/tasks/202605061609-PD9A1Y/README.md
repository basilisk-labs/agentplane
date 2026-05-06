---
id: "202605061609-PD9A1Y"
title: "Document blueprint creation hints"
result_summary: "Documented task new blueprint creation hints and --show-blueprint preview."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T16:10:06.893Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T16:22:54.736Z"
  updated_by: "DOCS"
  note: "Documentation updated for blueprint-aware task creation hints and --show-blueprint stderr route preview."
commit:
  hash: "339bbacf062a38026e90b4778dffb4b8074dd58f"
  message: "Merge pull request #987 from basilisk-labs/task/202605061609-P86BJS/blueprint-task-new-preview"
comments:
  -
    author: "DOCS"
    body: "Start: Document blueprint-aware task creation hints and the new task creation route preview flag."
  -
    author: "INTEGRATOR"
    body: "Verified: Documentation landed with PR #987 at 339bbacf062a38026e90b4778dffb4b8074dd58f and generated CLI reference stayed fresh."
events:
  -
    type: "status"
    at: "2026-05-06T16:11:49.549Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Document blueprint-aware task creation hints and the new task creation route preview flag."
  -
    type: "verify"
    at: "2026-05-06T16:22:54.736Z"
    author: "DOCS"
    state: "ok"
    note: "Documentation updated for blueprint-aware task creation hints and --show-blueprint stderr route preview."
  -
    type: "status"
    at: "2026-05-06T16:32:33.604Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Documentation landed with PR #987 at 339bbacf062a38026e90b4778dffb4b8074dd58f and generated CLI reference stayed fresh."
doc_version: 3
doc_updated_at: "2026-05-06T16:32:33.605Z"
doc_updated_by: "INTEGRATOR"
description: "Document task-kind, mutation-scope, risk, blueprint-request, and task new route preview usage for blueprint-aware task creation."
sections:
  Summary: |-
    Document blueprint creation hints
    
    Document task-kind, mutation-scope, risk, blueprint-request, and task new route preview usage for blueprint-aware task creation.
  Scope: |-
    - In scope: Document task-kind, mutation-scope, risk, blueprint-request, and task new route preview usage for blueprint-aware task creation.
    - Out of scope: unrelated refactors not required for "Document blueprint creation hints".
  Plan: "Document blueprint-aware task creation. Scope: update blueprint developer docs and generated CLI reference for task new structured hints and --show-blueprint. Verification: docs:cli:check, actual command output review, doctor, routing."
  Verify Steps: |-
    1. Review the requested outcome for "Document blueprint creation hints". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T16:22:54.736Z — VERIFY — ok
    
    By: DOCS
    
    Note: Documentation updated for blueprint-aware task creation hints and --show-blueprint stderr route preview.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T16:11:49.549Z, excerpt_hash=sha256:b2f6c0239a770f7cb8ebbc35d0a649840ab52e7c9dd98cff9094422b302fecdf
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061609-P86BJS-blueprint-task-new-preview/.agentplane/tasks/202605061609-PD9A1Y/blueprint/resolved-snapshot.json
    - old_digest: 5589ce371b9eabde15012ad19c313128d6cc736f345ff36655f737a216e2b716
    - current_digest: 5589ce371b9eabde15012ad19c313128d6cc736f345ff36655f737a216e2b716
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061609-PD9A1Y
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: bun run docs:cli:generate; bun run docs:cli:check; bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -t 'help task new'; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check.
      Impact: Developer blueprint docs now describe structured creation fields, stdout/stderr behavior, and a preview example; generated CLI reference includes the new flag, note, and example.
      Resolution: Docs remain aligned with generated command spec and current resolver output.
id_source: "generated"
---
