---
id: "202605031118-80309M"
title: "Add llm-wiki recipe"
result_summary: "Published llm-wiki recipe externally in agentplane-recipes and recorded final AgentPlane task closure."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T11:18:31.127Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T12:03:46.736Z"
  updated_by: "CODER"
  note: "Verified final publication: signed index.json.sig with key_id 2026-06, PR #5 merged to main, Socket checks passed, remote raw catalog lists llm-wiki, and remote install of llm-wiki@0.1.0 from https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json succeeds."
commit:
  hash: "5ae9406a6202c568d6470ba21b1e9f9f2f8b328f"
  message: "✅ RPMEKK close: Merged via PR #809. (202605031118-RPMEKK) [bun,code,release] (#810)"
comments:
  -
    author: "CODER"
    body: "Start: Implement llm-wiki recipe in the existing agentplane-recipes checkout because parent branch_pr worktree startup is blocked by detached HEAD and main is already checked out by another active task worktree."
  -
    author: "CODER"
    body: "Start: Implement llm-wiki recipe in the existing agentplane-recipes checkout; canonical branch_pr worktree startup is blocked because parent main is checked out by another active task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: llm-wiki recipe was published in basilisk-labs/agentplane-recipes via merged PR #5; signed catalog and remote install path were verified, and parent repo runtime changes were not required."
events:
  -
    type: "status"
    at: "2026-05-03T11:19:06.103Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement llm-wiki recipe in the existing agentplane-recipes checkout because parent branch_pr worktree startup is blocked by detached HEAD and main is already checked out by another active task worktree."
  -
    type: "status"
    at: "2026-05-03T11:19:16.339Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: Implement llm-wiki recipe in the existing agentplane-recipes checkout; canonical branch_pr worktree startup is blocked because parent main is checked out by another active task worktree."
  -
    type: "verify"
    at: "2026-05-03T11:28:54.457Z"
    author: "CODER"
    state: "ok"
    note: "Verified llm-wiki recipe package, catalog build, archive install, project vendoring, recipe enable prompt graph activation, targeted recipe runtime tests, policy routing, diff check, and agentplane doctor. Deviation: parent branch_pr work start was blocked by detached HEAD and another active main worktree, so recipe development stayed in the existing agentplane-recipes checkout."
  -
    type: "verify"
    at: "2026-05-03T12:03:46.736Z"
    author: "CODER"
    state: "ok"
    note: "Verified final publication: signed index.json.sig with key_id 2026-06, PR #5 merged to main, Socket checks passed, remote raw catalog lists llm-wiki, and remote install of llm-wiki@0.1.0 from https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json succeeds."
  -
    type: "status"
    at: "2026-05-03T12:52:24.132Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: llm-wiki recipe was published in basilisk-labs/agentplane-recipes via merged PR #5; signed catalog and remote install path were verified, and parent repo runtime changes were not required."
doc_version: 3
doc_updated_at: "2026-05-03T12:52:24.133Z"
doc_updated_by: "INTEGRATOR"
description: "Create and publish an installable llm-wiki recipe in agentplane-recipes with wiki ingest/query prompt discipline, scenario assets, catalog release artifacts, and installability verification."
sections:
  Summary: |-
    Add llm-wiki recipe
    
    Create and publish an installable llm-wiki recipe in agentplane-recipes with wiki ingest/query prompt discipline, scenario assets, catalog release artifacts, and installability verification.
  Scope: |-
    - In scope: create the llm-wiki recipe inside agentplane-recipes; update catalog allowlist; regenerate release artifacts; verify local installability.
    - In scope: encode wiki structure, ingest guard, query retrieval, raw preservation, and configurable input folder as recipe-owned prompt/scenario behavior.
    - Out of scope: changing AgentPlane runtime code, changing parent submodule pointer, signing index.json, or modifying unrelated recipe directories.
  Plan: "Implement one installable llm-wiki recipe in agentplane-recipes. Keep all recipe development in the existing agentplane-recipes checkout/worktree. Assets: manifest v2, skill, agent profile, scenario with task_template, prompt module, mutation set, catalog allowlist update, release archive/checksum/index refresh. Verification: build-release succeeds, manifest/assets are readable by current runtime, local install from generated tarball succeeds, and catalog contains llm-wiki."
  Verify Steps: |-
    1. Run node agentplane-recipes/scripts/build-release.ts --tag v0.1.0 from the recipes checkout. Expected: dist artifacts and index.json regenerate successfully and include llm-wiki.
    2. Run targeted recipe runtime validation or install from dist/llm-wiki-0.1.0.tar.gz. Expected: current AgentPlane accepts manifest, assets, prompt modules, mutation set, and scenario.
    3. Inspect generated catalog and tarball contents. Expected: llm-wiki is allowlisted, archive includes manifest, skills, agents, scenarios, and prompt-modules.
    4. Run parent policy/docs checks required by loaded docs policy when task metadata changed. Expected: routing and doctor pass or deviations are recorded.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T11:28:54.457Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified llm-wiki recipe package, catalog build, archive install, project vendoring, recipe enable prompt graph activation, targeted recipe runtime tests, policy routing, diff check, and agentplane doctor. Deviation: parent branch_pr work start was blocked by detached HEAD and another active main worktree, so recipe development stayed in the existing agentplane-recipes checkout.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:19:16.339Z, excerpt_hash=sha256:b2903e6efec7b68d52184ceeb831029bcfb74ff3df9c2b2408a5ccbbbf3a947b
    
    ### 2026-05-03T12:03:46.736Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified final publication: signed index.json.sig with key_id 2026-06, PR #5 merged to main, Socket checks passed, remote raw catalog lists llm-wiki, and remote install of llm-wiki@0.1.0 from https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json succeeds.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:28:54.468Z, excerpt_hash=sha256:b2903e6efec7b68d52184ceeb831029bcfb74ff3df9c2b2408a5ccbbbf3a947b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the llm-wiki recipe directory, catalog.json update, generated dist/index artifacts, generated task metadata, and any recipe publication commit. If a remote branch or PR was created, close it or supersede it with a corrected branch before publishing."
  Findings: |-
    - Observation: llm-wiki recipe installs and enables in a temporary initialized project; prompt graph contains recipe.llm-wiki policy module.
      Impact: Recipe is usable as an active overlay, not only as a cached archive.
      Resolution: Removed brittle bind_module dependency on a missing gateway endpoint and kept a required_module validator for the recipe-owned policy module.
    
    - Observation: Final published recipe commit is merge d342ee02c8c1837683e14f270252979886dc2b32 in basilisk-labs/agentplane-recipes main.
      Impact: The recipe is now available from the public signed recipes catalog, not only from the local archive.
      Resolution: Signed index locally using the explicitly approved ~/.ssh/recipes-index-2026-06.private.pem key and verified the remote install path after merge.
id_source: "generated"
---
## Summary

Add llm-wiki recipe

Create and publish an installable llm-wiki recipe in agentplane-recipes with wiki ingest/query prompt discipline, scenario assets, catalog release artifacts, and installability verification.

## Scope

- In scope: create the llm-wiki recipe inside agentplane-recipes; update catalog allowlist; regenerate release artifacts; verify local installability.
- In scope: encode wiki structure, ingest guard, query retrieval, raw preservation, and configurable input folder as recipe-owned prompt/scenario behavior.
- Out of scope: changing AgentPlane runtime code, changing parent submodule pointer, signing index.json, or modifying unrelated recipe directories.

## Plan

Implement one installable llm-wiki recipe in agentplane-recipes. Keep all recipe development in the existing agentplane-recipes checkout/worktree. Assets: manifest v2, skill, agent profile, scenario with task_template, prompt module, mutation set, catalog allowlist update, release archive/checksum/index refresh. Verification: build-release succeeds, manifest/assets are readable by current runtime, local install from generated tarball succeeds, and catalog contains llm-wiki.

## Verify Steps

1. Run node agentplane-recipes/scripts/build-release.ts --tag v0.1.0 from the recipes checkout. Expected: dist artifacts and index.json regenerate successfully and include llm-wiki.
2. Run targeted recipe runtime validation or install from dist/llm-wiki-0.1.0.tar.gz. Expected: current AgentPlane accepts manifest, assets, prompt modules, mutation set, and scenario.
3. Inspect generated catalog and tarball contents. Expected: llm-wiki is allowlisted, archive includes manifest, skills, agents, scenarios, and prompt-modules.
4. Run parent policy/docs checks required by loaded docs policy when task metadata changed. Expected: routing and doctor pass or deviations are recorded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T11:28:54.457Z — VERIFY — ok

By: CODER

Note: Verified llm-wiki recipe package, catalog build, archive install, project vendoring, recipe enable prompt graph activation, targeted recipe runtime tests, policy routing, diff check, and agentplane doctor. Deviation: parent branch_pr work start was blocked by detached HEAD and another active main worktree, so recipe development stayed in the existing agentplane-recipes checkout.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:19:16.339Z, excerpt_hash=sha256:b2903e6efec7b68d52184ceeb831029bcfb74ff3df9c2b2408a5ccbbbf3a947b

### 2026-05-03T12:03:46.736Z — VERIFY — ok

By: CODER

Note: Verified final publication: signed index.json.sig with key_id 2026-06, PR #5 merged to main, Socket checks passed, remote raw catalog lists llm-wiki, and remote install of llm-wiki@0.1.0 from https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json succeeds.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T11:28:54.468Z, excerpt_hash=sha256:b2903e6efec7b68d52184ceeb831029bcfb74ff3df9c2b2408a5ccbbbf3a947b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the llm-wiki recipe directory, catalog.json update, generated dist/index artifacts, generated task metadata, and any recipe publication commit. If a remote branch or PR was created, close it or supersede it with a corrected branch before publishing.

## Findings

- Observation: llm-wiki recipe installs and enables in a temporary initialized project; prompt graph contains recipe.llm-wiki policy module.
  Impact: Recipe is usable as an active overlay, not only as a cached archive.
  Resolution: Removed brittle bind_module dependency on a missing gateway endpoint and kept a required_module validator for the recipe-owned policy module.

- Observation: Final published recipe commit is merge d342ee02c8c1837683e14f270252979886dc2b32 in basilisk-labs/agentplane-recipes main.
  Impact: The recipe is now available from the public signed recipes catalog, not only from the local archive.
  Resolution: Signed index locally using the explicitly approved ~/.ssh/recipes-index-2026-06.private.pem key and verified the remote install path after merge.
