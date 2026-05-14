---
id: "202605141812-S9TBZF"
title: "Reframe website as GitHub star gateway"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T18:13:07.544Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T18:51:11.313Z"
  updated_by: "CODER"
  note: "Implemented star-focused homepage, minimal editorial artifacts section, liquid-glass navbar only, real GitHub Button embeds with fallback links, and Node 24 docs alignment. Checks passed: policy routing, git diff --check, website typecheck, docs:site:build."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved website star-gateway scope in the dedicated branch_pr worktree, covering homepage funnel, navbar, analytics events, and Node 24 requirement consistency."
events:
  -
    type: "status"
    at: "2026-05-14T18:15:37.971Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved website star-gateway scope in the dedicated branch_pr worktree, covering homepage funnel, navbar, analytics events, and Node 24 requirement consistency."
  -
    type: "verify"
    at: "2026-05-14T18:51:11.313Z"
    author: "CODER"
    state: "ok"
    note: "Implemented star-focused homepage, minimal editorial artifacts section, liquid-glass navbar only, real GitHub Button embeds with fallback links, and Node 24 docs alignment. Checks passed: policy routing, git diff --check, website typecheck, docs:site:build."
doc_version: 3
doc_updated_at: "2026-05-14T18:51:11.327Z"
doc_updated_by: "CODER"
description: "Update AgentPlane website homepage, navbar, tracking, and Node requirement copy around the GitHub star funnel and the Basilisk Labs DESIGN.md instrument style while preserving liquid-glass only for the nav shell."
sections:
  Summary: |-
    Reframe website as GitHub star gateway
    
    Update AgentPlane website homepage, navbar, tracking, and Node requirement copy around the GitHub star funnel and the Basilisk Labs DESIGN.md instrument style while preserving liquid-glass only for the nav shell.
  Scope: |-
    - In scope: Update AgentPlane website homepage, navbar, tracking, and Node requirement copy around the GitHub star funnel and the Basilisk Labs DESIGN.md instrument style while preserving liquid-glass only for the nav shell.
    - Out of scope: unrelated refactors not required for "Reframe website as GitHub star gateway".
  Plan: |-
    Scope:
    - Rework the website homepage hero, proof strip, quickstart block, evidence artifact visual, comparison teaser, who-should-star section, and repeated GitHub star CTAs around the star/install funnel.
    - Reduce the top navbar to Docs, Compare, Quickstart, install command, and Star.
    - Keep liquid-glass styling only on the navbar shell; move the rest of the homepage toward the warm instrument-panel DESIGN.md system.
    - Add lightweight analytics events for copy/install/GitHub/quickstart/Docs/Compare home CTAs.
    - Align Node requirements to Node.js 24+ across package README/docs surfaces that currently disagree.
    
    Verification:
    - bun run --cwd website typecheck
    - bun run docs:site:build
    - node .agentplane/policy/check-routing.mjs
    - ap doctor
    - Browser smoke or static build review of the homepage if the site build succeeds.
  Verify Steps: |-
    PLANNER fallback scaffold for "Reframe website as GitHub star gateway". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Reframe website as GitHub star gateway". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T18:51:11.313Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented star-focused homepage, minimal editorial artifacts section, liquid-glass navbar only, real GitHub Button embeds with fallback links, and Node 24 docs alignment. Checks passed: policy routing, git diff --check, website typecheck, docs:site:build.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:15:37.971Z, excerpt_hash=sha256:405aac4118545c933937b77427cb9219f8603a57b8851898d1822998689009d5
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141812-S9TBZF-star-gateway-homepage/.agentplane/tasks/202605141812-S9TBZF/blueprint/resolved-snapshot.json
    - old_digest: 122cd133ffe78b83d92673471b6b5cbeb71df15c58d1c56ab062e5114bee0192
    - current_digest: 122cd133ffe78b83d92673471b6b5cbeb71df15c58d1c56ab062e5114bee0192
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141812-S9TBZF
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reframe website as GitHub star gateway

Update AgentPlane website homepage, navbar, tracking, and Node requirement copy around the GitHub star funnel and the Basilisk Labs DESIGN.md instrument style while preserving liquid-glass only for the nav shell.

## Scope

- In scope: Update AgentPlane website homepage, navbar, tracking, and Node requirement copy around the GitHub star funnel and the Basilisk Labs DESIGN.md instrument style while preserving liquid-glass only for the nav shell.
- Out of scope: unrelated refactors not required for "Reframe website as GitHub star gateway".

## Plan

Scope:
- Rework the website homepage hero, proof strip, quickstart block, evidence artifact visual, comparison teaser, who-should-star section, and repeated GitHub star CTAs around the star/install funnel.
- Reduce the top navbar to Docs, Compare, Quickstart, install command, and Star.
- Keep liquid-glass styling only on the navbar shell; move the rest of the homepage toward the warm instrument-panel DESIGN.md system.
- Add lightweight analytics events for copy/install/GitHub/quickstart/Docs/Compare home CTAs.
- Align Node requirements to Node.js 24+ across package README/docs surfaces that currently disagree.

Verification:
- bun run --cwd website typecheck
- bun run docs:site:build
- node .agentplane/policy/check-routing.mjs
- ap doctor
- Browser smoke or static build review of the homepage if the site build succeeds.

## Verify Steps

PLANNER fallback scaffold for "Reframe website as GitHub star gateway". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Reframe website as GitHub star gateway". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T18:51:11.313Z — VERIFY — ok

By: CODER

Note: Implemented star-focused homepage, minimal editorial artifacts section, liquid-glass navbar only, real GitHub Button embeds with fallback links, and Node 24 docs alignment. Checks passed: policy routing, git diff --check, website typecheck, docs:site:build.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T18:15:37.971Z, excerpt_hash=sha256:405aac4118545c933937b77427cb9219f8603a57b8851898d1822998689009d5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141812-S9TBZF-star-gateway-homepage/.agentplane/tasks/202605141812-S9TBZF/blueprint/resolved-snapshot.json
- old_digest: 122cd133ffe78b83d92673471b6b5cbeb71df15c58d1c56ab062e5114bee0192
- current_digest: 122cd133ffe78b83d92673471b6b5cbeb71df15c58d1c56ab062e5114bee0192
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141812-S9TBZF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
