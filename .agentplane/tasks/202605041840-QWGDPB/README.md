---
id: "202605041840-QWGDPB"
title: "Extract marketing docs repository"
result_summary: "Merged via PR #876."
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:40:44.085Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:57:04.220Z"
  updated_by: "DOCS"
  note: "Command: non-ASCII scan of agentplane-marketing current tree and git rev-list history. Result: pass; no Cyrillic text remained after the English-only orphan history rewrite and force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check is not final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build."
commit:
  hash: "1ebf780ba394cc27da48ed3bb7db0bda65e30ae1"
  message: "📝 QWGDPB docs: move marketing sources to submodule"
comments:
  -
    author: "DOCS"
    body: "Start: creating the dedicated marketing repository, moving approved positioning and public-surface documents, and wiring the result back as a Git submodule with focused docs verification."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #876 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T18:41:17.150Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: creating the dedicated marketing repository, moving approved positioning and public-surface documents, and wiring the result back as a Git submodule with focused docs verification."
  -
    type: "verify"
    at: "2026-05-04T18:55:54.619Z"
    author: "DOCS"
    state: "ok"
    note: "Command: non-ASCII scan of the current tree and git rev-list history in agentplane-marketing. Result: pass; no Cyrillic remained in current tree or branch history after orphan force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check was not used as final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build."
  -
    type: "verify"
    at: "2026-05-04T18:57:04.220Z"
    author: "DOCS"
    state: "ok"
    note: "Command: non-ASCII scan of agentplane-marketing current tree and git rev-list history. Result: pass; no Cyrillic text remained after the English-only orphan history rewrite and force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check is not final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build."
  -
    type: "status"
    at: "2026-05-04T19:11:25.737Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #876 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T19:11:25.742Z"
doc_updated_by: "INTEGRATOR"
description: "Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule."
sections:
  Summary: |-
    Extract marketing docs repository
    
    Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.
  Scope: |-
    - In scope: Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.
    - Out of scope: unrelated refactors not required for "Extract marketing docs repository".
  Plan: "1. Create a dedicated marketing repository under the current GitHub owner and initialize it with agentplane. 2. Build a basic marketing-document structure and move AgentPlane editorial, positioning, listing, manifesto, showcase, launch, website IA, visual identity, and public social asset sources into it. 3. Add the new repository back to this checkout as a Git submodule and replace moved docs in the main repo with narrow pointers where current navigation expects pages. 4. Verify with policy routing, agentplane doctor, docs link sanity where practical, and git/submodule status."
  Verify Steps: |-
    1. Review the requested outcome for "Extract marketing docs repository". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:55:54.619Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: non-ASCII scan of the current tree and git rev-list history in agentplane-marketing. Result: pass; no Cyrillic remained in current tree or branch history after orphan force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check was not used as final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:41:17.150Z, excerpt_hash=sha256:67c019ad7382b87695ab76561875d293eb8b36ec34260766e9778c4389f5500e
    
    ### 2026-05-04T18:57:04.220Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: non-ASCII scan of agentplane-marketing current tree and git rev-list history. Result: pass; no Cyrillic text remained after the English-only orphan history rewrite and force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check is not final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:55:54.630Z, excerpt_hash=sha256:67c019ad7382b87695ab76561875d293eb8b36ec34260766e9778c4389f5500e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract marketing docs repository

Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.

## Scope

- In scope: Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.
- Out of scope: unrelated refactors not required for "Extract marketing docs repository".

## Plan

1. Create a dedicated marketing repository under the current GitHub owner and initialize it with agentplane. 2. Build a basic marketing-document structure and move AgentPlane editorial, positioning, listing, manifesto, showcase, launch, website IA, visual identity, and public social asset sources into it. 3. Add the new repository back to this checkout as a Git submodule and replace moved docs in the main repo with narrow pointers where current navigation expects pages. 4. Verify with policy routing, agentplane doctor, docs link sanity where practical, and git/submodule status.

## Verify Steps

1. Review the requested outcome for "Extract marketing docs repository". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:55:54.619Z — VERIFY — ok

By: DOCS

Note: Command: non-ASCII scan of the current tree and git rev-list history in agentplane-marketing. Result: pass; no Cyrillic remained in current tree or branch history after orphan force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check was not used as final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:41:17.150Z, excerpt_hash=sha256:67c019ad7382b87695ab76561875d293eb8b36ec34260766e9778c4389f5500e

### 2026-05-04T18:57:04.220Z — VERIFY — ok

By: DOCS

Note: Command: non-ASCII scan of agentplane-marketing current tree and git rev-list history. Result: pass; no Cyrillic text remained after the English-only orphan history rewrite and force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check is not final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:55:54.630Z, excerpt_hash=sha256:67c019ad7382b87695ab76561875d293eb8b36ec34260766e9778c4389f5500e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
