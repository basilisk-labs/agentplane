---
id: "202605021842-PCRBTQ"
title: "Add evaluator agent profile and recursive planning contract"
result_summary: "Merged via PR #760."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "agents"
  - "docs"
  - "evals"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T18:42:36.331Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T18:45:55.808Z"
  updated_by: "DOCS"
  note: "Command: bun run agents:check -> pass (agents templates OK). Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: agentplane doctor -> pass (doctor OK; informational findings only)."
commit:
  hash: "ba947428bdb3cebaef69b237184b5be7b89db366"
  message: "Merge pull request #760 from basilisk-labs/task/202605021842-PCRBTQ/evaluator-agent-profile"
comments:
  -
    author: "DOCS"
    body: "Start: update the agent prompt surface by adding an evaluator role and tightening planner decomposition guidance while keeping changes scoped to bundled/project agent profiles."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #760 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-02T18:43:04.335Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update the agent prompt surface by adding an evaluator role and tightening planner decomposition guidance while keeping changes scoped to bundled/project agent profiles."
  -
    type: "verify"
    at: "2026-05-02T18:45:55.808Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun run agents:check -> pass (agents templates OK). Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: agentplane doctor -> pass (doctor OK; informational findings only)."
  -
    type: "status"
    at: "2026-05-02T18:49:07.278Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #760 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-02T18:49:07.284Z"
doc_updated_by: "INTEGRATOR"
description: "Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution."
sections:
  Summary: |-
    Add evaluator agent profile and recursive planning contract
    
    Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.
  Scope: |-
    - In scope: Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.
    - Out of scope: unrelated refactors not required for "Add evaluator agent profile and recursive planning contract".
  Plan: |-
    1. Update the canonical bundled PLANNER profile to make recursive decomposition explicit: classify every draft node, split composite nodes until leaves are atomic, and preserve the anti-overfragmentation lower bound.
    2. Add a bundled EVALUATOR profile with pass/rework/blocked verdict responsibilities over task README criteria, runner result manifests, trace/evidence, and LLM quality scoring inputs.
    3. Sync generated project agent mirrors and verify agent/profile consistency plus docs-policy checks.
  Verify Steps: |-
    - Run `bun run agents:check` to verify generated agent mirrors match bundled profiles.
    - Run `node .agentplane/policy/check-routing.mjs` for policy routing sanity after prompt-surface edits.
    - Run `agentplane doctor` for repository diagnostics.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T18:45:55.808Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: bun run agents:check -> pass (agents templates OK). Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: agentplane doctor -> pass (doctor OK; informational findings only).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T18:43:04.335Z, excerpt_hash=sha256:00d0a394e3c0bb466a59cace6fadd0c519b134426ba8e245c1696a9c574c0b1b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add evaluator agent profile and recursive planning contract

Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.

## Scope

- In scope: Introduce an EVALUATOR agent profile and tighten PLANNER guidance so approved goals are recursively decomposed into atomic dependent leaf tasks before execution.
- Out of scope: unrelated refactors not required for "Add evaluator agent profile and recursive planning contract".

## Plan

1. Update the canonical bundled PLANNER profile to make recursive decomposition explicit: classify every draft node, split composite nodes until leaves are atomic, and preserve the anti-overfragmentation lower bound.
2. Add a bundled EVALUATOR profile with pass/rework/blocked verdict responsibilities over task README criteria, runner result manifests, trace/evidence, and LLM quality scoring inputs.
3. Sync generated project agent mirrors and verify agent/profile consistency plus docs-policy checks.

## Verify Steps

- Run `bun run agents:check` to verify generated agent mirrors match bundled profiles.
- Run `node .agentplane/policy/check-routing.mjs` for policy routing sanity after prompt-surface edits.
- Run `agentplane doctor` for repository diagnostics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T18:45:55.808Z — VERIFY — ok

By: DOCS

Note: Command: bun run agents:check -> pass (agents templates OK). Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: git diff --check -> pass. Command: agentplane doctor -> pass (doctor OK; informational findings only).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T18:43:04.335Z, excerpt_hash=sha256:00d0a394e3c0bb466a59cace6fadd0c519b134426ba8e245c1696a9c574c0b1b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
