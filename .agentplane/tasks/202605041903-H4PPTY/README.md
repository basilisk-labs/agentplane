---
id: "202605041903-H4PPTY"
title: "Document blueprint execution-route contracts"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T19:03:24.691Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T19:05:54.510Z"
  updated_by: "DOCS"
  note: "Blueprint developer specification docs passed verification."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: add the blueprint developer specification and docs navigation updates in the existing docs worktree, keeping this task limited to documentation and task evidence."
events:
  -
    type: "status"
    at: "2026-05-04T19:03:32.269Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: add the blueprint developer specification and docs navigation updates in the existing docs worktree, keeping this task limited to documentation and task evidence."
  -
    type: "verify"
    at: "2026-05-04T19:05:54.510Z"
    author: "DOCS"
    state: "ok"
    note: "Blueprint developer specification docs passed verification."
doc_version: 3
doc_updated_at: "2026-05-04T19:05:54.520Z"
doc_updated_by: "DOCS"
description: "Add a detailed developer specification for AgentPlane blueprints as task-specific execution-route contracts, including layer boundaries, node catalog, built-in blueprint routes, recipe extension rules, evidence, ACR relationship, runner relationship, stop rules, non-goals, and implementation backlog."
sections:
  Summary: |-
    Document blueprint execution-route contracts
    
    Add a detailed developer specification for AgentPlane blueprints as task-specific execution-route contracts, including layer boundaries, node catalog, built-in blueprint routes, recipe extension rules, evidence, ACR relationship, runner relationship, stop rules, non-goals, and implementation backlog.
  Scope: |-
    - In scope: Add a detailed developer specification for AgentPlane blueprints as task-specific execution-route contracts, including layer boundaries, node catalog, built-in blueprint routes, recipe extension rules, evidence, ACR relationship, runner relationship, stop rules, non-goals, and implementation backlog.
    - Out of scope: unrelated refactors not required for "Document blueprint execution-route contracts".
  Plan: |-
    1. Add docs/developer/blueprints.mdx as a detailed developer specification for blueprints as task-specific execution-route contracts.
    2. Define layer boundaries: task lifecycle, workflow mode, blueprint, recipe, runner, and ACR.
    3. Document blueprint anatomy, node catalog, built-in v0 routes, selection rules, recipe extension constraints, evidence model, ACR relationship, runner relationship, stop rules, non-goals, and implementation backlog.
    4. Link the page from docs/index.mdx and website/sidebars.ts.
    5. Run docs IA, formatting, policy routing, and doctor checks, then record verification evidence.
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
    2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
    3. Run bun run docs:ia:check. Expected: docs IA and sidebar references include the new developer page.
    4. Run bun run format:check -- docs/developer/blueprints.mdx docs/index.mdx website/sidebars.ts. Expected: touched docs and sidebar files are formatted.
    5. Review docs/developer/blueprints.mdx. Expected: the spec clearly separates blueprints from recipes, task lifecycle, runner execution, and ACR, and explicitly prevents code PR/CI pipelines from becoming the default for analysis/content tasks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T19:05:54.510Z — VERIFY — ok
    
    By: DOCS
    
    Note: Blueprint developer specification docs passed verification.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:03:32.269Z, excerpt_hash=sha256:2fc72f6e935fbe7e6e9290369ef431b33dc6703a749cc49bfc63a269b190108e
    
    Details:
    
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run format:check -- docs/developer/blueprints.mdx docs/index.mdx website/sidebars.ts; Result: pass; Evidence: All matched files use Prettier code style. Review: docs/developer/blueprints.mdx separates blueprint, recipe, lifecycle, runner, and ACR; it explicitly keeps analysis/content routes free of default CI/PR gates.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document blueprint execution-route contracts

Add a detailed developer specification for AgentPlane blueprints as task-specific execution-route contracts, including layer boundaries, node catalog, built-in blueprint routes, recipe extension rules, evidence, ACR relationship, runner relationship, stop rules, non-goals, and implementation backlog.

## Scope

- In scope: Add a detailed developer specification for AgentPlane blueprints as task-specific execution-route contracts, including layer boundaries, node catalog, built-in blueprint routes, recipe extension rules, evidence, ACR relationship, runner relationship, stop rules, non-goals, and implementation backlog.
- Out of scope: unrelated refactors not required for "Document blueprint execution-route contracts".

## Plan

1. Add docs/developer/blueprints.mdx as a detailed developer specification for blueprints as task-specific execution-route contracts.
2. Define layer boundaries: task lifecycle, workflow mode, blueprint, recipe, runner, and ACR.
3. Document blueprint anatomy, node catalog, built-in v0 routes, selection rules, recipe extension constraints, evidence model, ACR relationship, runner relationship, stop rules, non-goals, and implementation backlog.
4. Link the page from docs/index.mdx and website/sidebars.ts.
5. Run docs IA, formatting, policy routing, and doctor checks, then record verification evidence.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
3. Run bun run docs:ia:check. Expected: docs IA and sidebar references include the new developer page.
4. Run bun run format:check -- docs/developer/blueprints.mdx docs/index.mdx website/sidebars.ts. Expected: touched docs and sidebar files are formatted.
5. Review docs/developer/blueprints.mdx. Expected: the spec clearly separates blueprints from recipes, task lifecycle, runner execution, and ACR, and explicitly prevents code PR/CI pipelines from becoming the default for analysis/content tasks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T19:05:54.510Z — VERIFY — ok

By: DOCS

Note: Blueprint developer specification docs passed verification.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:03:32.269Z, excerpt_hash=sha256:2fc72f6e935fbe7e6e9290369ef431b33dc6703a749cc49bfc63a269b190108e

Details:

Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run format:check -- docs/developer/blueprints.mdx docs/index.mdx website/sidebars.ts; Result: pass; Evidence: All matched files use Prettier code style. Review: docs/developer/blueprints.mdx separates blueprint, recipe, lifecycle, runner, and ACR; it explicitly keeps analysis/content routes free of default CI/PR gates.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
