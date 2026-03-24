---
id: "202603241259-RQGQCP"
title: "Document runner approval semantics after Codex probe"
result_summary: "Main-repo docs now describe the removed runner approval field and the separate catalog-sync follow-up boundary."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202603241259-3XHFKR"
tags:
  - "docs"
  - "runner"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T13:29:16.300Z"
  updated_by: "ORCHESTRATOR"
  note: "Docs-only scope approved: update main-repo docs for the removed runner approval field and leave catalog/submodule sync to follow-up work."
verification:
  state: "ok"
  updated_at: "2026-03-24T13:30:27.331Z"
  updated_by: "DOCS"
  note: "Command: rg -n \"requires_human_approval\" docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx docs/recipes-inventory.json ; Result: pass ; Evidence: narrative docs now document removal of the runner approval field, and the only remaining hit is docs/recipes-inventory.json, which is explicitly documented as external catalog lag. Scope: user and developer docs for runner approval semantics. Command: node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor ; Result: pass ; Evidence: routing OK and doctor OK. Scope: repo policy/docs health after the docs update. Command: bunx prettier --check docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx ; Result: pass ; Evidence: prettier reported no formatting issues. Scope: touched docs files."
commit:
  hash: "c734f9009926e31d5f3cd8336fa22f45534f81dc"
  message: "✅ RQGQCP docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: document that the main-repo runner no longer supports requires_human_approval, and explicitly call out that catalog/inventory sync remains separate follow-up work."
  -
    author: "DOCS"
    body: "Verified: documented that the main-repo runner no longer supports requires_human_approval and called out the remaining external catalog lag explicitly."
events:
  -
    type: "status"
    at: "2026-03-24T13:29:24.197Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document that the main-repo runner no longer supports requires_human_approval, and explicitly call out that catalog/inventory sync remains separate follow-up work."
  -
    type: "verify"
    at: "2026-03-24T13:30:27.331Z"
    author: "DOCS"
    state: "ok"
    note: "Command: rg -n \"requires_human_approval\" docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx docs/recipes-inventory.json ; Result: pass ; Evidence: narrative docs now document removal of the runner approval field, and the only remaining hit is docs/recipes-inventory.json, which is explicitly documented as external catalog lag. Scope: user and developer docs for runner approval semantics. Command: node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor ; Result: pass ; Evidence: routing OK and doctor OK. Scope: repo policy/docs health after the docs update. Command: bunx prettier --check docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx ; Result: pass ; Evidence: prettier reported no formatting issues. Scope: touched docs files."
  -
    type: "status"
    at: "2026-03-24T13:30:40.607Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: documented that the main-repo runner no longer supports requires_human_approval and called out the remaining external catalog lag explicitly."
doc_version: 3
doc_updated_at: "2026-03-24T13:30:40.607Z"
doc_updated_by: "DOCS"
description: "Align user and developer documentation with the final requires_human_approval runner contract after the Codex approval-mode probe and code changes land."
sections:
  Summary: |-
    Document runner approval semantics after Codex probe
    
    Align user and developer documentation with the final requires_human_approval runner contract after the Codex approval-mode probe and code changes land.
  Scope: |-
    - In scope: update main-repo docs for the removed runner approval field and explain the current boundary between runtime contract and external catalog data.
    - Out of scope: editing the agentplane-recipes submodule or regenerating docs inventory from that external catalog.
  Plan: "1. Update main-repo docs to state that recipe runner no longer supports requires_human_approval as an execution contract. 2. Document the remaining boundary: external catalog and generated inventory may still show the legacy field until a separate submodule sync lands. 3. Run focused docs checks, record verification evidence, and finish with a docs-only commit."
  Verify Steps: |-
    1. Inspect the updated docs sections and confirm they state that requires_human_approval is no longer a supported runner execution field in the main repo.
    2. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor.
    3. Run bunx prettier --check on the touched docs files.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T13:30:27.331Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: rg -n "requires_human_approval" docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx docs/recipes-inventory.json ; Result: pass ; Evidence: narrative docs now document removal of the runner approval field, and the only remaining hit is docs/recipes-inventory.json, which is explicitly documented as external catalog lag. Scope: user and developer docs for runner approval semantics. Command: node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor ; Result: pass ; Evidence: routing OK and doctor OK. Scope: repo policy/docs health after the docs update. Command: bunx prettier --check docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx ; Result: pass ; Evidence: prettier reported no formatting issues. Scope: touched docs files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:30:27.169Z, excerpt_hash=sha256:409de76966d0a9b9e145dc38efcf8c3fb497e2fe7b20d02721a10bfc0efd6c99
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- docs/recipes-inventory.json still shows the legacy field because catalog synchronization depends on the external agentplane-recipes submodule and remains separate follow-up work."
id_source: "generated"
---
## Summary

Document runner approval semantics after Codex probe

Align user and developer documentation with the final requires_human_approval runner contract after the Codex approval-mode probe and code changes land.

## Scope

- In scope: update main-repo docs for the removed runner approval field and explain the current boundary between runtime contract and external catalog data.
- Out of scope: editing the agentplane-recipes submodule or regenerating docs inventory from that external catalog.

## Plan

1. Update main-repo docs to state that recipe runner no longer supports requires_human_approval as an execution contract. 2. Document the remaining boundary: external catalog and generated inventory may still show the legacy field until a separate submodule sync lands. 3. Run focused docs checks, record verification evidence, and finish with a docs-only commit.

## Verify Steps

1. Inspect the updated docs sections and confirm they state that requires_human_approval is no longer a supported runner execution field in the main repo.
2. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor.
3. Run bunx prettier --check on the touched docs files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T13:30:27.331Z — VERIFY — ok

By: DOCS

Note: Command: rg -n "requires_human_approval" docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx docs/recipes-inventory.json ; Result: pass ; Evidence: narrative docs now document removal of the runner approval field, and the only remaining hit is docs/recipes-inventory.json, which is explicitly documented as external catalog lag. Scope: user and developer docs for runner approval semantics. Command: node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor ; Result: pass ; Evidence: routing OK and doctor OK. Scope: repo policy/docs health after the docs update. Command: bunx prettier --check docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/user/commands.mdx ; Result: pass ; Evidence: prettier reported no formatting issues. Scope: touched docs files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:30:27.169Z, excerpt_hash=sha256:409de76966d0a9b9e145dc38efcf8c3fb497e2fe7b20d02721a10bfc0efd6c99

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- docs/recipes-inventory.json still shows the legacy field because catalog synchronization depends on the external agentplane-recipes submodule and remains separate follow-up work.
