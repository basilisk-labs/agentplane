---
id: "202605150501-76SFX1"
title: "Align website minimal OSS style and fix README image generator"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-15T05:02:00.129Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-15T05:05:47.126Z"
  updated_by: "CODER"
  note: "Website surface simplified to minimal OSS style and README header generator rewritten to deterministic minimal output (logo + version + latest release blog title subtitle). Verified with node scripts/generate/generate-readme-header.mjs --check after regeneration. Website build remains environment-blocked due missing 'sharp' dependency in this worktree runtime."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing website minimalism alignment with basilisk-labs.com and hardening README/social image generation template to avoid random text surfaces, with targeted style and script checks before verification."
events:
  -
    type: "status"
    at: "2026-05-15T05:02:01.682Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing website minimalism alignment with basilisk-labs.com and hardening README/social image generation template to avoid random text surfaces, with targeted style and script checks before verification."
  -
    type: "verify"
    at: "2026-05-15T05:05:47.126Z"
    author: "CODER"
    state: "ok"
    note: "Website surface simplified to minimal OSS style and README header generator rewritten to deterministic minimal output (logo + version + latest release blog title subtitle). Verified with node scripts/generate/generate-readme-header.mjs --check after regeneration. Website build remains environment-blocked due missing 'sharp' dependency in this worktree runtime."
doc_version: 3
doc_updated_at: "2026-05-15T05:05:47.137Z"
doc_updated_by: "CODER"
description: "Refine website to minimalist informative OSS style aligned with basilisk-labs.com, remove excess hovers/rounding, and fix README preview image generator to output only logo/version/title."
sections:
  Summary: |-
    Align website minimal OSS style and fix README image generator
    
    Refine website to minimalist informative OSS style aligned with basilisk-labs.com, remove excess hovers/rounding, and fix README preview image generator to output only logo/version/title.
  Scope: |-
    - In scope: Refine website to minimalist informative OSS style aligned with basilisk-labs.com, remove excess hovers/rounding, and fix README preview image generator to output only logo/version/title.
    - Out of scope: unrelated refactors not required for "Align website minimal OSS style and fix README image generator".
  Plan: "1) Audit current homepage/blog visual patterns and README/social image generator behavior. 2) Compare key layout and style primitives with ../basilisk-labs.com to extract minimalist conventions. 3) Remove decorative hover transitions and excessive rounding; simplify cards/sections while keeping information density. 4) Update social/readme image generator template to strict minimal composition: logo, version, and optional release blog title only. 5) Run targeted checks for website build/lint and generator script output contract."
  Verify Steps: |-
    PLANNER fallback scaffold for "Align website minimal OSS style and fix README image generator". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Align website minimal OSS style and fix README image generator". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-15T05:05:47.126Z — VERIFY — ok
    
    By: CODER
    
    Note: Website surface simplified to minimal OSS style and README header generator rewritten to deterministic minimal output (logo + version + latest release blog title subtitle). Verified with node scripts/generate/generate-readme-header.mjs --check after regeneration. Website build remains environment-blocked due missing 'sharp' dependency in this worktree runtime.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T05:02:01.682Z, excerpt_hash=sha256:4911cd0e124f52255be53532c9a5d96c6dc7b4ae152df39e3ee72fac71203021
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150501-76SFX1-minimal-oss-site/.agentplane/tasks/202605150501-76SFX1/blueprint/resolved-snapshot.json
    - old_digest: fdfb4f5d46546194a42af285b24a96c7efe8d376e42b684191e77e543a5b9eb6
    - current_digest: fdfb4f5d46546194a42af285b24a96c7efe8d376e42b684191e77e543a5b9eb6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605150501-76SFX1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align website minimal OSS style and fix README image generator

Refine website to minimalist informative OSS style aligned with basilisk-labs.com, remove excess hovers/rounding, and fix README preview image generator to output only logo/version/title.

## Scope

- In scope: Refine website to minimalist informative OSS style aligned with basilisk-labs.com, remove excess hovers/rounding, and fix README preview image generator to output only logo/version/title.
- Out of scope: unrelated refactors not required for "Align website minimal OSS style and fix README image generator".

## Plan

1) Audit current homepage/blog visual patterns and README/social image generator behavior. 2) Compare key layout and style primitives with ../basilisk-labs.com to extract minimalist conventions. 3) Remove decorative hover transitions and excessive rounding; simplify cards/sections while keeping information density. 4) Update social/readme image generator template to strict minimal composition: logo, version, and optional release blog title only. 5) Run targeted checks for website build/lint and generator script output contract.

## Verify Steps

PLANNER fallback scaffold for "Align website minimal OSS style and fix README image generator". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align website minimal OSS style and fix README image generator". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-15T05:05:47.126Z — VERIFY — ok

By: CODER

Note: Website surface simplified to minimal OSS style and README header generator rewritten to deterministic minimal output (logo + version + latest release blog title subtitle). Verified with node scripts/generate/generate-readme-header.mjs --check after regeneration. Website build remains environment-blocked due missing 'sharp' dependency in this worktree runtime.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T05:02:01.682Z, excerpt_hash=sha256:4911cd0e124f52255be53532c9a5d96c6dc7b4ae152df39e3ee72fac71203021

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150501-76SFX1-minimal-oss-site/.agentplane/tasks/202605150501-76SFX1/blueprint/resolved-snapshot.json
- old_digest: fdfb4f5d46546194a42af285b24a96c7efe8d376e42b684191e77e543a5b9eb6
- current_digest: fdfb4f5d46546194a42af285b24a96c7efe8d376e42b684191e77e543a5b9eb6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605150501-76SFX1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
