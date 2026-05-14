---
id: "202605141717-84A77P"
title: "Announce v0.6 context management"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "context"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T17:17:50.282Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T17:23:22.088Z"
  updated_by: "DOCS"
  note: "Docs/site verification passed for v0.6 context-management announcement. node .agentplane/policy/check-routing.mjs: policy routing OK. agentplane doctor: OK with pre-existing branch_pr drift warnings unrelated to this task. bun run docs:site:typecheck: pass after restoring ignored website dependencies with bun install --ignore-scripts. bun run docs:site:build: pass; remaining warnings are pre-existing blueprints tag/truncation warnings. git diff --check: pass."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: documenting the v0.6 context-management story across README, user docs, website navigation, homepage copy, and a blog announcement grounded in the shipped local-context behavior and Karpathy LLM Wiki source."
events:
  -
    type: "status"
    at: "2026-05-14T17:18:06.890Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: documenting the v0.6 context-management story across README, user docs, website navigation, homepage copy, and a blog announcement grounded in the shipped local-context behavior and Karpathy LLM Wiki source."
  -
    type: "verify"
    at: "2026-05-14T17:23:22.088Z"
    author: "DOCS"
    state: "ok"
    note: "Docs/site verification passed for v0.6 context-management announcement. node .agentplane/policy/check-routing.mjs: policy routing OK. agentplane doctor: OK with pre-existing branch_pr drift warnings unrelated to this task. bun run docs:site:typecheck: pass after restoring ignored website dependencies with bun install --ignore-scripts. bun run docs:site:build: pass; remaining warnings are pre-existing blueprints tag/truncation warnings. git diff --check: pass."
doc_version: 3
doc_updated_at: "2026-05-14T17:23:22.098Z"
doc_updated_by: "DOCS"
description: "Add public announcement, README and docs coverage, website navigation, homepage context block, and a v0.6 blog article connecting AgentPlane context management to Andrej Karpathy's LLM Wiki pattern."
sections:
  Summary: |-
    Announce v0.6 context management
    
    Add public announcement, README and docs coverage, website navigation, homepage context block, and a v0.6 blog article connecting AgentPlane context management to Andrej Karpathy's LLM Wiki pattern.
  Scope: |-
    - In scope: Add public announcement, README and docs coverage, website navigation, homepage context block, and a v0.6 blog article connecting AgentPlane context management to Andrej Karpathy's LLM Wiki pattern.
    - Out of scope: unrelated refactors not required for "Announce v0.6 context management".
  Plan: "1. Add README and documentation entry points for AgentPlane context management, using the current local-context contract as the source of truth. 2. Expose context management in website navigation and homepage content without changing runtime behavior. 3. Add a v0.6 announcement blog article that cites Andrej Karpathy's LLM Wiki pattern and explains how AgentPlane adapts it for repo-owned agent work: raw sources, wiki/facts/graph, provenance, proposal-before-promotion, and verification. 4. Run docs/policy verification gates and record evidence."
  Verify Steps: |-
    - Run node .agentplane/policy/check-routing.mjs and confirm routing budgets pass.
    - Run agentplane doctor and confirm repo health gates pass or record concrete residual risk.
    - Run the fastest available docs/site validation for Docusaurus content/navigation after inspecting package scripts.
    - Confirm README, docs navigation, website navbar/homepage copy, and blog article point to the context-management story without claiming unimplemented vector/label retrieval as shipped.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T17:23:22.088Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs/site verification passed for v0.6 context-management announcement. node .agentplane/policy/check-routing.mjs: policy routing OK. agentplane doctor: OK with pre-existing branch_pr drift warnings unrelated to this task. bun run docs:site:typecheck: pass after restoring ignored website dependencies with bun install --ignore-scripts. bun run docs:site:build: pass; remaining warnings are pre-existing blueprints tag/truncation warnings. git diff --check: pass.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:20:13.438Z, excerpt_hash=sha256:87987643047b6f79d6a019fc6fb39c7a7a749c02b9523e8581e6c41064eb51ee
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141717-84A77P-context-management-announcement/.agentplane/tasks/202605141717-84A77P/blueprint/resolved-snapshot.json
    - old_digest: 8e068a9a29cd42d899e24282f784cf3654f32c47dc5b1f9f6beb6f0c4d1a3ceb
    - current_digest: 8e068a9a29cd42d899e24282f784cf3654f32c47dc5b1f9f6beb6f0c4d1a3ceb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141717-84A77P
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Announce v0.6 context management

Add public announcement, README and docs coverage, website navigation, homepage context block, and a v0.6 blog article connecting AgentPlane context management to Andrej Karpathy's LLM Wiki pattern.

## Scope

- In scope: Add public announcement, README and docs coverage, website navigation, homepage context block, and a v0.6 blog article connecting AgentPlane context management to Andrej Karpathy's LLM Wiki pattern.
- Out of scope: unrelated refactors not required for "Announce v0.6 context management".

## Plan

1. Add README and documentation entry points for AgentPlane context management, using the current local-context contract as the source of truth. 2. Expose context management in website navigation and homepage content without changing runtime behavior. 3. Add a v0.6 announcement blog article that cites Andrej Karpathy's LLM Wiki pattern and explains how AgentPlane adapts it for repo-owned agent work: raw sources, wiki/facts/graph, provenance, proposal-before-promotion, and verification. 4. Run docs/policy verification gates and record evidence.

## Verify Steps

- Run node .agentplane/policy/check-routing.mjs and confirm routing budgets pass.
- Run agentplane doctor and confirm repo health gates pass or record concrete residual risk.
- Run the fastest available docs/site validation for Docusaurus content/navigation after inspecting package scripts.
- Confirm README, docs navigation, website navbar/homepage copy, and blog article point to the context-management story without claiming unimplemented vector/label retrieval as shipped.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T17:23:22.088Z — VERIFY — ok

By: DOCS

Note: Docs/site verification passed for v0.6 context-management announcement. node .agentplane/policy/check-routing.mjs: policy routing OK. agentplane doctor: OK with pre-existing branch_pr drift warnings unrelated to this task. bun run docs:site:typecheck: pass after restoring ignored website dependencies with bun install --ignore-scripts. bun run docs:site:build: pass; remaining warnings are pre-existing blueprints tag/truncation warnings. git diff --check: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:20:13.438Z, excerpt_hash=sha256:87987643047b6f79d6a019fc6fb39c7a7a749c02b9523e8581e6c41064eb51ee

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141717-84A77P-context-management-announcement/.agentplane/tasks/202605141717-84A77P/blueprint/resolved-snapshot.json
- old_digest: 8e068a9a29cd42d899e24282f784cf3654f32c47dc5b1f9f6beb6f0c4d1a3ceb
- current_digest: 8e068a9a29cd42d899e24282f784cf3654f32c47dc5b1f9f6beb6f0c4d1a3ceb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141717-84A77P

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
