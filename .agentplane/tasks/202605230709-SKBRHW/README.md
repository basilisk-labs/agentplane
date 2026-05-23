---
id: "202605230709-SKBRHW"
title: "Refresh docs social image assets for release check"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T07:09:11.283Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T07:20:43.122Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after review fix: --check preserves semantic freshness through the generated manifest and avoids OS-dependent PNG byte comparison."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T07:20:43.122Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after review fix: --check preserves semantic freshness through the generated manifest and avoids OS-dependent PNG byte comparison."
  evaluated_sha: "c6ff6d1cd2228e5e6f127256f7972f19712f2b13"
  blueprint_digest: "2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d"
  evidence_refs:
    - ".agentplane/tasks/202605230709-SKBRHW/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Refresh checked-in docs social image assets so release publish validation can pass on the current v0.6.7 release branch."
events:
  -
    type: "status"
    at: "2026-05-23T07:09:24.149Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Refresh checked-in docs social image assets so release publish validation can pass on the current v0.6.7 release branch."
  -
    type: "verify"
    at: "2026-05-23T07:11:59.359Z"
    author: "DOCS"
    state: "ok"
    note: "Portable docs social image release check verified."
  -
    type: "verify"
    at: "2026-05-23T07:15:42.652Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: PR #4079 has one commit, hosted Docs CI/Core routed/CodeQL/PR verification passed, and local release:check passed after making social image checks portable."
  -
    type: "verify"
    at: "2026-05-23T07:20:41.670Z"
    author: "DOCS"
    state: "ok"
    note: "Portable docs social image release check verified with manifest freshness."
  -
    type: "verify"
    at: "2026-05-23T07:20:43.122Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after review fix: --check preserves semantic freshness through the generated manifest and avoids OS-dependent PNG byte comparison."
doc_version: 3
doc_updated_at: "2026-05-23T07:20:43.139Z"
doc_updated_by: "DOCS"
description: "Regenerate checked-in docs social images so publish-time release:check passes on main before npm publication."
sections:
  Summary: |-
    Refresh docs social image assets for release check

    Regenerate checked-in docs social images so publish-time release:check passes on main before npm publication.
  Scope: |-
    - In scope: Regenerate checked-in docs social images so publish-time release:check passes on main before npm publication.
    - Out of scope: unrelated refactors not required for "Refresh docs social image assets for release check".
  Plan: "Fix publish blocker for v0.6.7: regenerate docs social image assets from website/scripts/generate-social-images.mjs, keep the change scoped to generated website/static/img/social assets and task artifacts, verify with bun run docs:social:generate, bun run docs:social:check, bun run release:check, node .agentplane/policy/check-routing.mjs, and ap doctor."
  Verify Steps: |-
    PLANNER fallback scaffold for "Refresh docs social image assets for release check". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Refresh docs social image assets for release check". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T07:11:59.359Z — VERIFY — ok

    By: DOCS

    Note: Portable docs social image release check verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:09:24.149Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
    - old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

    ### 2026-05-23T07:15:42.652Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed: PR #4079 has one commit, hosted Docs CI/Core routed/CodeQL/PR verification passed, and local release:check passed after making social image checks portable.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:11:59.379Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
    - old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

    ### 2026-05-23T07:20:41.670Z — VERIFY — ok

    By: DOCS

    Note: Portable docs social image release check verified with manifest freshness.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:15:42.669Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
    - old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

    ### 2026-05-23T07:20:43.122Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after review fix: --check preserves semantic freshness through the generated manifest and avoids OS-dependent PNG byte comparison.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:20:41.687Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
    - old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Publish-time release:check failed on Ubuntu because docs social image --check compared PNG bytes rendered with environment-dependent system fonts.
      Impact: Manual publish for v0.6.7 stopped before npm/tag/GitHub Release publication even though release-ready artifact existed.
      Resolution: Changed social image --check to validate expected output set plus PNG format/dimensions, with --strict retaining byte-for-byte comparison for same-environment checks. Verified: bun run docs:social:check; cd website && bun run check-social-images -- --strict; bun run release:check; node .agentplane/policy/check-routing.mjs; ap doctor; bun run format:check -- website/scripts/generate-social-images.mjs .agentplane/tasks/202605230709-SKBRHW/README.md.

    - Observation: The fix changes only the social image check semantics and task/PR artifacts; generation output is unchanged.
      Impact: Release publish can validate social image assets on Ubuntu without depending on OS-specific PNG byte rendering.
      Resolution: Validated via PR #4079 hosted checks and local commands recorded in DOCS verification.

    - Observation: PNG byte comparison is not portable across OS font/rendering stacks, but shape-only checking would miss stale titles/routes.
      Impact: Release publish can run on Ubuntu without false stale PNG failures while still catching missing, extra, invalid, or semantically stale social image artifacts.
      Resolution: Added website/static/img/social/manifest.json as the deterministic freshness contract for routes, titles, breadcrumbs, logo hash, dimensions, and SVG-source hashes. Verified: bun run docs:social:generate; bun run docs:social:check; cd website && bun run check-social-images -- --strict; bun run release:check; node .agentplane/policy/check-routing.mjs; ap doctor; bun run format:check -- website/scripts/generate-social-images.mjs website/static/img/social/manifest.json .agentplane/tasks/202605230709-SKBRHW/README.md.

    - Observation: Codex review P1 correctly identified the initial shape-only check as too weak.
      Impact: The final contract preserves release freshness and should unblock Ubuntu publish validation.
      Resolution: Verified local release:check, social generate/check, strict same-environment check, formatting, policy routing, doctor, and updated PR evidence.
id_source: "generated"
---
## Summary

Refresh docs social image assets for release check

Regenerate checked-in docs social images so publish-time release:check passes on main before npm publication.

## Scope

- In scope: Regenerate checked-in docs social images so publish-time release:check passes on main before npm publication.
- Out of scope: unrelated refactors not required for "Refresh docs social image assets for release check".

## Plan

Fix publish blocker for v0.6.7: regenerate docs social image assets from website/scripts/generate-social-images.mjs, keep the change scoped to generated website/static/img/social assets and task artifacts, verify with bun run docs:social:generate, bun run docs:social:check, bun run release:check, node .agentplane/policy/check-routing.mjs, and ap doctor.

## Verify Steps

PLANNER fallback scaffold for "Refresh docs social image assets for release check". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Refresh docs social image assets for release check". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T07:11:59.359Z — VERIFY — ok

By: DOCS

Note: Portable docs social image release check verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:09:24.149Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
- old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

### 2026-05-23T07:15:42.652Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed: PR #4079 has one commit, hosted Docs CI/Core routed/CodeQL/PR verification passed, and local release:check passed after making social image checks portable.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:11:59.379Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
- old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

### 2026-05-23T07:20:41.670Z — VERIFY — ok

By: DOCS

Note: Portable docs social image release check verified with manifest freshness.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:15:42.669Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
- old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

### 2026-05-23T07:20:43.122Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after review fix: --check preserves semantic freshness through the generated manifest and avoids OS-dependent PNG byte comparison.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T07:20:41.687Z, excerpt_hash=sha256:bf1b94bc11a7481a97839d493c39a999f7940600e90046a60129c6a7167cc8f7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230709-SKBRHW-refresh-social-images/.agentplane/tasks/202605230709-SKBRHW/blueprint/resolved-snapshot.json
- old_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- current_digest: 2a146a1a6cb299367c27db495d8895ff7a7f7f50a47d2bb80d3c1529d412b95d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230709-SKBRHW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Publish-time release:check failed on Ubuntu because docs social image --check compared PNG bytes rendered with environment-dependent system fonts.
  Impact: Manual publish for v0.6.7 stopped before npm/tag/GitHub Release publication even though release-ready artifact existed.
  Resolution: Changed social image --check to validate expected output set plus PNG format/dimensions, with --strict retaining byte-for-byte comparison for same-environment checks. Verified: bun run docs:social:check; cd website && bun run check-social-images -- --strict; bun run release:check; node .agentplane/policy/check-routing.mjs; ap doctor; bun run format:check -- website/scripts/generate-social-images.mjs .agentplane/tasks/202605230709-SKBRHW/README.md.

- Observation: The fix changes only the social image check semantics and task/PR artifacts; generation output is unchanged.
  Impact: Release publish can validate social image assets on Ubuntu without depending on OS-specific PNG byte rendering.
  Resolution: Validated via PR #4079 hosted checks and local commands recorded in DOCS verification.

- Observation: PNG byte comparison is not portable across OS font/rendering stacks, but shape-only checking would miss stale titles/routes.
  Impact: Release publish can run on Ubuntu without false stale PNG failures while still catching missing, extra, invalid, or semantically stale social image artifacts.
  Resolution: Added website/static/img/social/manifest.json as the deterministic freshness contract for routes, titles, breadcrumbs, logo hash, dimensions, and SVG-source hashes. Verified: bun run docs:social:generate; bun run docs:social:check; cd website && bun run check-social-images -- --strict; bun run release:check; node .agentplane/policy/check-routing.mjs; ap doctor; bun run format:check -- website/scripts/generate-social-images.mjs website/static/img/social/manifest.json .agentplane/tasks/202605230709-SKBRHW/README.md.

- Observation: Codex review P1 correctly identified the initial shape-only check as too weak.
  Impact: The final contract preserves release freshness and should unblock Ubuntu publish validation.
  Resolution: Verified local release:check, social generate/check, strict same-environment check, formatting, policy routing, doctor, and updated PR evidence.
