---
id: "202605081720-03TR4S"
title: "Blueprint catalog docs and release checks"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605081720-JF941V"
tags:
  - "blueprint"
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "bun run docs:cli:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T17:21:18.612Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T18:37:49.936Z"
  updated_by: "DOCS"
  note: "Verified docs and release checks: docs/user/commands.mdx and docs/developer/blueprints.mdx document external catalog behavior, trust boundaries, pack semantics, and full-harness init; docs:cli:check, policy routing, and doctor passed."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Completing blueprint catalog documentation and release-check coverage after catalog install and init selection behavior landed."
events:
  -
    type: "status"
    at: "2026-05-08T18:37:40.572Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Completing blueprint catalog documentation and release-check coverage after catalog install and init selection behavior landed."
  -
    type: "verify"
    at: "2026-05-08T18:37:49.936Z"
    author: "DOCS"
    state: "ok"
    note: "Verified docs and release checks: docs/user/commands.mdx and docs/developer/blueprints.mdx document external catalog behavior, trust boundaries, pack semantics, and full-harness init; docs:cli:check, policy routing, and doctor passed."
doc_version: 3
doc_updated_at: "2026-05-08T18:37:49.960Z"
doc_updated_by: "DOCS"
description: "Document external blueprint catalog behavior, command usage, trust boundaries, pack semantics, and add focused regression coverage/docs freshness checks for the new CLI surfaces."
sections:
  Summary: |-
    Blueprint catalog docs and release checks
    
    Document external blueprint catalog behavior, command usage, trust boundaries, pack semantics, and add focused regression coverage/docs freshness checks for the new CLI surfaces.
  Scope: |-
    - In scope: Document external blueprint catalog behavior, command usage, trust boundaries, pack semantics, and add focused regression coverage/docs freshness checks for the new CLI surfaces.
    - Out of scope: unrelated refactors not required for "Blueprint catalog docs and release checks".
  Plan: "Epic: docs and release checks. Scope: update CLI/developer docs for blueprint catalog commands, trust model, individual blueprint installs, pack installs, and advanced init behavior after the code lands. Depends on 202605081720-JF941V. Verification: docs CLI freshness and policy routing."
  Verify Steps: |-
    1. Review the requested outcome for "Blueprint catalog docs and release checks". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T18:37:49.936Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified docs and release checks: docs/user/commands.mdx and docs/developer/blueprints.mdx document external catalog behavior, trust boundaries, pack semantics, and full-harness init; docs:cli:check, policy routing, and doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:37:40.607Z, excerpt_hash=sha256:c4b995dabc5113ebe37798ee93a3256e30fbe42ff0b276fe8fc5deb5f21e56a6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081720-03TR4S/blueprint/resolved-snapshot.json
    - old_digest: 82ca70a31e13a37952dcbf5da30eb019c6aafc238a1041cac685bab34dc9ea0b
    - current_digest: 82ca70a31e13a37952dcbf5da30eb019c6aafc238a1041cac685bab34dc9ea0b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081720-03TR4S
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
