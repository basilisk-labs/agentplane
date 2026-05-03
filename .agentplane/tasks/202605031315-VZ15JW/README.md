---
id: "202605031315-VZ15JW"
title: "Update package discovery metadata"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031315-E9WZ3G"
tags:
  - "code"
  - "discovery"
  - "package"
verify:
  - "bun run test:fast"
  - "node -e \"for (const p of ['packages/agentplane/package.json','packages/core/package.json','packages/recipes/package.json']) { const j=require('./'+p); if (!j.description || !j.keywords?.length) throw new Error(p) }\""
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T13:15:58.402Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:43:04.302Z"
  updated_by: "DOCS"
  note: "Updated public and internal package metadata descriptions, keywords, and homepages to match the audit-layer positioning without changing versions, exports, files, or runtime code. Verified JSON parsing, package tarball policy, and git diff --check."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: update package discovery metadata after README/site positioning has landed."
events:
  -
    type: "status"
    at: "2026-05-03T13:42:03.599Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update package discovery metadata after README/site positioning has landed."
  -
    type: "verify"
    at: "2026-05-03T13:43:04.302Z"
    author: "DOCS"
    state: "ok"
    note: "Updated public and internal package metadata descriptions, keywords, and homepages to match the audit-layer positioning without changing versions, exports, files, or runtime code. Verified JSON parsing, package tarball policy, and git diff --check."
doc_version: 3
doc_updated_at: "2026-05-03T13:43:04.308Z"
doc_updated_by: "DOCS"
description: "Update package.json descriptions and keywords for repository-owned npm discovery surfaces without doing a breaking package namespace migration in this batch."
sections:
  Summary: |-
    Update package discovery metadata
    
    Update package.json descriptions and keywords for repository-owned npm discovery surfaces without doing a breaking package namespace migration in this batch.
  Scope: |-
    - In scope: Update package.json descriptions and keywords for repository-owned npm discovery surfaces without doing a breaking package namespace migration in this batch.
    - Out of scope: unrelated refactors not required for "Update package discovery metadata".
  Plan: "Update package.json description/keywords for packages/agentplane, packages/core, and packages/recipes to improve npm discovery for Claude Code/Codex/Cursor/Aider and recipes. Acceptance: do not rename packages or scopes in this batch; metadata remains accurate; test:fast passes."
  Verify Steps: |-
    1. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node -e "for (const p of ['packages/agentplane/package.json','packages/core/package.json','packages/recipes/package.json']) { const j=require('./'+p); if (!j.description || !j.keywords?.length) throw new Error(p) }"`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:43:04.302Z — VERIFY — ok
    
    By: DOCS
    
    Note: Updated public and internal package metadata descriptions, keywords, and homepages to match the audit-layer positioning without changing versions, exports, files, or runtime code. Verified JSON parsing, package tarball policy, and git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:42:03.599Z, excerpt_hash=sha256:aa48f03f6fc3016e945cd9fcc0100a733ad38cf5e874d4f47e8dd9375b37ed3b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: package:tarball:check passed for @agentplaneorg/core, @agentplaneorg/recipes, and agentplane after metadata edits.
      Impact: npm/package discovery now uses the same coding-agent audit-layer category as the README and website surfaces.
      Resolution: Keep package metadata changes scoped to discovery fields; publication still requires the normal release path.
id_source: "generated"
---
## Summary

Update package discovery metadata

Update package.json descriptions and keywords for repository-owned npm discovery surfaces without doing a breaking package namespace migration in this batch.

## Scope

- In scope: Update package.json descriptions and keywords for repository-owned npm discovery surfaces without doing a breaking package namespace migration in this batch.
- Out of scope: unrelated refactors not required for "Update package discovery metadata".

## Plan

Update package.json description/keywords for packages/agentplane, packages/core, and packages/recipes to improve npm discovery for Claude Code/Codex/Cursor/Aider and recipes. Acceptance: do not rename packages or scopes in this batch; metadata remains accurate; test:fast passes.

## Verify Steps

1. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node -e "for (const p of ['packages/agentplane/package.json','packages/core/package.json','packages/recipes/package.json']) { const j=require('./'+p); if (!j.description || !j.keywords?.length) throw new Error(p) }"`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:43:04.302Z — VERIFY — ok

By: DOCS

Note: Updated public and internal package metadata descriptions, keywords, and homepages to match the audit-layer positioning without changing versions, exports, files, or runtime code. Verified JSON parsing, package tarball policy, and git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:42:03.599Z, excerpt_hash=sha256:aa48f03f6fc3016e945cd9fcc0100a733ad38cf5e874d4f47e8dd9375b37ed3b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: package:tarball:check passed for @agentplaneorg/core, @agentplaneorg/recipes, and agentplane after metadata edits.
  Impact: npm/package discovery now uses the same coding-agent audit-layer category as the README and website surfaces.
  Resolution: Keep package metadata changes scoped to discovery fields; publication still requires the normal release path.
