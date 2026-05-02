---
id: "202605021412-FDDWP8"
title: "Define standalone CLI artifact contract"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "distribution"
  - "docs"
  - "release"
verify:
  - "Review artifact contract against Homebrew/Scoop/setup-action requirements"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T16:01:52.470Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T16:10:07.837Z"
  updated_by: "PLANNER"
  note: |-
    Formatting follow-up after pre-push.
    
    Command: bunx prettier docs/developer/release-and-publishing.mdx --write
    Result: pass
    Evidence: formatted release docs.
    Scope: docs/developer/release-and-publishing.mdx
    Links: docs/developer/release-and-publishing.mdx
    
    Command: bun run format:check -- docs/developer/release-and-publishing.mdx
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: docs/developer/release-and-publishing.mdx
    Links: docs/developer/release-and-publishing.mdx
    
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing after formatting follow-up.
    Links: docs/developer/release-and-publishing.mdx
    
    Command: agentplane doctor
    Result: pass
    Evidence: doctor OK; errors=0 warnings=0.
    Scope: docs-only PR branch after formatting follow-up.
    Links: docs/developer/release-and-publishing.mdx
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: Define the bundled-runtime artifact contract in release documentation before downstream generator, workflow, Homebrew, Scoop, and setup-action tasks consume it."
events:
  -
    type: "status"
    at: "2026-05-02T16:02:20.989Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Define the bundled-runtime artifact contract in release documentation before downstream generator, workflow, Homebrew, Scoop, and setup-action tasks consume it."
  -
    type: "verify"
    at: "2026-05-02T16:03:48.540Z"
    author: "PLANNER"
    state: "ok"
    note: |-
      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: AGENTS/policy routing remains valid after release documentation update.
      Links: docs/developer/release-and-publishing.mdx
      
      Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; errors=0 warnings=0.
      Scope: repository health for docs-only task branch.
      Links: docs/developer/release-and-publishing.mdx
      
      Command: rg -n "Standalone CLI artifact contract|standalone_cli|bundled_node|depends_on \"node\"|setup-agentplane|agentplane-vX\.Y\.Z" docs/developer/release-and-publishing.mdx
      Result: pass
      Evidence: matched standalone contract heading, deterministic archive names, standalone_cli manifest kind, bundled_node install strategy, Homebrew no depends_on node rule, and setup-agentplane consumption rule.
      Scope: standalone CLI artifact contract and package-manager handoff rules.
      Links: docs/developer/release-and-publishing.mdx
  -
    type: "verify"
    at: "2026-05-02T16:08:35.812Z"
    author: "PLANNER"
    state: "ok"
    note: |-
      Review follow-up: addressed PR review comments.
      
      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK after review updates.
      Scope: release docs contract.
      Links: docs/developer/release-and-publishing.mdx
      
      Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; errors=0 warnings=0 after review updates.
      Scope: docs-only PR branch.
      Links: docs/developer/release-and-publishing.mdx
      
      Command: rg -n "agentplane\.cmd|setup action module|standalone CLI asset|depends_on \"node\"" docs/developer/release-and-publishing.mdx
      Result: pass
      Evidence: Windows smoke tests now use bin/agentplane.cmd and setup-action module now consumes standalone CLI assets from the manifest.
      Scope: addressed PR review comments.
      Links: docs/developer/release-and-publishing.mdx
  -
    type: "verify"
    at: "2026-05-02T16:10:07.837Z"
    author: "PLANNER"
    state: "ok"
    note: |-
      Formatting follow-up after pre-push.
      
      Command: bunx prettier docs/developer/release-and-publishing.mdx --write
      Result: pass
      Evidence: formatted release docs.
      Scope: docs/developer/release-and-publishing.mdx
      Links: docs/developer/release-and-publishing.mdx
      
      Command: bun run format:check -- docs/developer/release-and-publishing.mdx
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: docs/developer/release-and-publishing.mdx
      Links: docs/developer/release-and-publishing.mdx
      
      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: policy routing after formatting follow-up.
      Links: docs/developer/release-and-publishing.mdx
      
      Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; errors=0 warnings=0.
      Scope: docs-only PR branch after formatting follow-up.
      Links: docs/developer/release-and-publishing.mdx
doc_version: 3
doc_updated_at: "2026-05-02T16:10:07.846Z"
doc_updated_by: "PLANNER"
description: "Specify the bundled-runtime AgentPlane CLI artifact contract: supported platform/arch targets, archive layout, embedded Node version source, checksum/signature expectations, runtime path invariants, and security update policy."
sections:
  Summary: |-
    Define standalone CLI artifact contract
    
    Specify the bundled-runtime AgentPlane CLI artifact contract: supported platform/arch targets, archive layout, embedded Node version source, checksum/signature expectations, runtime path invariants, and security update policy.
  Scope: |-
    - In scope: Specify the bundled-runtime AgentPlane CLI artifact contract: supported platform/arch targets, archive layout, embedded Node version source, checksum/signature expectations, runtime path invariants, and security update policy.
    - Out of scope: unrelated refactors not required for "Define standalone CLI artifact contract".
  Plan: |-
    Define the standalone CLI artifact contract before implementation tasks consume it.
    
    Scope:
    - Update release/distribution documentation with the bundled-runtime artifact contract.
    - Specify target platforms, archive names, archive layout, runtime selection, checksum/manifest fields, smoke-test expectations, and package-manager consumption rules.
    - Keep this task docs-only; no generator/workflow/package-manager code changes in this task.
    
    Verification:
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
    - Targeted content/link inspection for docs/developer/release-and-publishing.mdx
  Verify Steps: |-
    1. Inspect docs/developer/release-and-publishing.mdx and confirm the standalone contract covers targets, archive names, archive layout, embedded runtime source, checksum/manifest fields, smoke tests, package-manager consumption rules, and release ordering. Expected: Homebrew/Scoop/setup-action implementation tasks can consume the contract without inventing missing fields.
    2. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing remains valid.
    3. Run agentplane doctor. Expected: repository health checks pass.
    4. Run rg -n "Standalone CLI artifact contract|standalone_cli|bundled_node|depends_on \"node\"|setup-agentplane" docs/developer/release-and-publishing.mdx. Expected: the updated canonical docs expose the contract and the no-external-Node package-manager rules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T16:03:48.540Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: AGENTS/policy routing remains valid after release documentation update.
    Links: docs/developer/release-and-publishing.mdx
    
    Command: agentplane doctor
    Result: pass
    Evidence: doctor OK; errors=0 warnings=0.
    Scope: repository health for docs-only task branch.
    Links: docs/developer/release-and-publishing.mdx
    
    Command: rg -n "Standalone CLI artifact contract|standalone_cli|bundled_node|depends_on \"node\"|setup-agentplane|agentplane-vX\.Y\.Z" docs/developer/release-and-publishing.mdx
    Result: pass
    Evidence: matched standalone contract heading, deterministic archive names, standalone_cli manifest kind, bundled_node install strategy, Homebrew no depends_on node rule, and setup-agentplane consumption rule.
    Scope: standalone CLI artifact contract and package-manager handoff rules.
    Links: docs/developer/release-and-publishing.mdx
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:03:08.113Z, excerpt_hash=sha256:a4afc2342bce3133d3a452b2ea9da4c3b8e1b3235234f7a1288429b10802529d
    
    ### 2026-05-02T16:08:35.812Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Review follow-up: addressed PR review comments.
    
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK after review updates.
    Scope: release docs contract.
    Links: docs/developer/release-and-publishing.mdx
    
    Command: agentplane doctor
    Result: pass
    Evidence: doctor OK; errors=0 warnings=0 after review updates.
    Scope: docs-only PR branch.
    Links: docs/developer/release-and-publishing.mdx
    
    Command: rg -n "agentplane\.cmd|setup action module|standalone CLI asset|depends_on \"node\"" docs/developer/release-and-publishing.mdx
    Result: pass
    Evidence: Windows smoke tests now use bin/agentplane.cmd and setup-action module now consumes standalone CLI assets from the manifest.
    Scope: addressed PR review comments.
    Links: docs/developer/release-and-publishing.mdx
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:03:48.548Z, excerpt_hash=sha256:a4afc2342bce3133d3a452b2ea9da4c3b8e1b3235234f7a1288429b10802529d
    
    ### 2026-05-02T16:10:07.837Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Formatting follow-up after pre-push.
    
    Command: bunx prettier docs/developer/release-and-publishing.mdx --write
    Result: pass
    Evidence: formatted release docs.
    Scope: docs/developer/release-and-publishing.mdx
    Links: docs/developer/release-and-publishing.mdx
    
    Command: bun run format:check -- docs/developer/release-and-publishing.mdx
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: docs/developer/release-and-publishing.mdx
    Links: docs/developer/release-and-publishing.mdx
    
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing after formatting follow-up.
    Links: docs/developer/release-and-publishing.mdx
    
    Command: agentplane doctor
    Result: pass
    Evidence: doctor OK; errors=0 warnings=0.
    Scope: docs-only PR branch after formatting follow-up.
    Links: docs/developer/release-and-publishing.mdx
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:08:35.829Z, excerpt_hash=sha256:a4afc2342bce3133d3a452b2ea9da4c3b8e1b3235234f7a1288429b10802529d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Define standalone CLI artifact contract

Specify the bundled-runtime AgentPlane CLI artifact contract: supported platform/arch targets, archive layout, embedded Node version source, checksum/signature expectations, runtime path invariants, and security update policy.

## Scope

- In scope: Specify the bundled-runtime AgentPlane CLI artifact contract: supported platform/arch targets, archive layout, embedded Node version source, checksum/signature expectations, runtime path invariants, and security update policy.
- Out of scope: unrelated refactors not required for "Define standalone CLI artifact contract".

## Plan

Define the standalone CLI artifact contract before implementation tasks consume it.

Scope:
- Update release/distribution documentation with the bundled-runtime artifact contract.
- Specify target platforms, archive names, archive layout, runtime selection, checksum/manifest fields, smoke-test expectations, and package-manager consumption rules.
- Keep this task docs-only; no generator/workflow/package-manager code changes in this task.

Verification:
- node .agentplane/policy/check-routing.mjs
- agentplane doctor
- Targeted content/link inspection for docs/developer/release-and-publishing.mdx

## Verify Steps

1. Inspect docs/developer/release-and-publishing.mdx and confirm the standalone contract covers targets, archive names, archive layout, embedded runtime source, checksum/manifest fields, smoke tests, package-manager consumption rules, and release ordering. Expected: Homebrew/Scoop/setup-action implementation tasks can consume the contract without inventing missing fields.
2. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing remains valid.
3. Run agentplane doctor. Expected: repository health checks pass.
4. Run rg -n "Standalone CLI artifact contract|standalone_cli|bundled_node|depends_on \"node\"|setup-agentplane" docs/developer/release-and-publishing.mdx. Expected: the updated canonical docs expose the contract and the no-external-Node package-manager rules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T16:03:48.540Z — VERIFY — ok

By: PLANNER

Note: Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: AGENTS/policy routing remains valid after release documentation update.
Links: docs/developer/release-and-publishing.mdx

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0.
Scope: repository health for docs-only task branch.
Links: docs/developer/release-and-publishing.mdx

Command: rg -n "Standalone CLI artifact contract|standalone_cli|bundled_node|depends_on \"node\"|setup-agentplane|agentplane-vX\.Y\.Z" docs/developer/release-and-publishing.mdx
Result: pass
Evidence: matched standalone contract heading, deterministic archive names, standalone_cli manifest kind, bundled_node install strategy, Homebrew no depends_on node rule, and setup-agentplane consumption rule.
Scope: standalone CLI artifact contract and package-manager handoff rules.
Links: docs/developer/release-and-publishing.mdx

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:03:08.113Z, excerpt_hash=sha256:a4afc2342bce3133d3a452b2ea9da4c3b8e1b3235234f7a1288429b10802529d

### 2026-05-02T16:08:35.812Z — VERIFY — ok

By: PLANNER

Note: Review follow-up: addressed PR review comments.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK after review updates.
Scope: release docs contract.
Links: docs/developer/release-and-publishing.mdx

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0 after review updates.
Scope: docs-only PR branch.
Links: docs/developer/release-and-publishing.mdx

Command: rg -n "agentplane\.cmd|setup action module|standalone CLI asset|depends_on \"node\"" docs/developer/release-and-publishing.mdx
Result: pass
Evidence: Windows smoke tests now use bin/agentplane.cmd and setup-action module now consumes standalone CLI assets from the manifest.
Scope: addressed PR review comments.
Links: docs/developer/release-and-publishing.mdx

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:03:48.548Z, excerpt_hash=sha256:a4afc2342bce3133d3a452b2ea9da4c3b8e1b3235234f7a1288429b10802529d

### 2026-05-02T16:10:07.837Z — VERIFY — ok

By: PLANNER

Note: Formatting follow-up after pre-push.

Command: bunx prettier docs/developer/release-and-publishing.mdx --write
Result: pass
Evidence: formatted release docs.
Scope: docs/developer/release-and-publishing.mdx
Links: docs/developer/release-and-publishing.mdx

Command: bun run format:check -- docs/developer/release-and-publishing.mdx
Result: pass
Evidence: All matched files use Prettier code style.
Scope: docs/developer/release-and-publishing.mdx
Links: docs/developer/release-and-publishing.mdx

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing after formatting follow-up.
Links: docs/developer/release-and-publishing.mdx

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0.
Scope: docs-only PR branch after formatting follow-up.
Links: docs/developer/release-and-publishing.mdx

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T16:08:35.829Z, excerpt_hash=sha256:a4afc2342bce3133d3a452b2ea9da4c3b8e1b3235234f7a1288429b10802529d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
