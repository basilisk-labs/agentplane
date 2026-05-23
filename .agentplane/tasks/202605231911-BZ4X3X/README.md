---
id: "202605231911-BZ4X3X"
title: "Polish homepage GitHub label and radius"
result_summary: "Merged via PR #4112."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T19:11:50.375Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T19:22:46.955Z"
  updated_by: "EVALUATOR"
  note: "Evaluation accepted: built output contains Github navbar copy, screenshots render without Star label, and homepage radius changes are visually restrained."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T19:22:46.955Z"
  updated_by: "EVALUATOR"
  note: "Evaluation accepted: built output contains Github navbar copy, screenshots render without Star label, and homepage radius changes are visually restrained."
  evaluated_sha: "86b44a795f1bf356605d5d2c215e097af925ad8e"
  blueprint_digest: "39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844"
  evidence_refs:
    - ".agentplane/tasks/202605231911-BZ4X3X/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231911-BZ4X3X-github-label-radius/.agentplane/tasks/202605231911-BZ4X3X/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "23d7caf7d6e51545988642716544ffe4a18f924a"
  message: "Merge pull request #4112 from basilisk-labs/task/202605231911-BZ4X3X/github-label-radius"
comments:
  -
    author: "CODER"
    body: "Start: Renaming the GitHub star label to Github and adding a very small radius to homepage blocks and buttons."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4112 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T19:12:04.122Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Renaming the GitHub star label to Github and adding a very small radius to homepage blocks and buttons."
  -
    type: "verify"
    at: "2026-05-23T19:22:39.200Z"
    author: "CODER"
    state: "ok"
    note: "Local site checks passed: typecheck, build:check, format:changed, git diff --check, policy routing, doctor. Visual screenshots confirm Github label and small-radius homepage controls on desktop/mobile."
  -
    type: "verify"
    at: "2026-05-23T19:22:46.955Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluation accepted: built output contains Github navbar copy, screenshots render without Star label, and homepage radius changes are visually restrained."
  -
    type: "status"
    at: "2026-05-23T19:34:43.186Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4112 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T19:34:43.194Z"
doc_updated_by: "INTEGRATOR"
description: "Rename the public GitHub star label from Star to Github and give homepage blocks/buttons a very small border radius instead of fully square corners."
sections:
  Summary: |-
    Polish homepage GitHub label and radius

    Rename the public GitHub star label from Star to Github and give homepage blocks/buttons a very small border radius instead of fully square corners.
  Scope: |-
    - In scope: Rename the public GitHub star label from Star to Github and give homepage blocks/buttons a very small border radius instead of fully square corners.
    - Out of scope: unrelated refactors not required for "Polish homepage GitHub label and radius".
  Plan: |-
    1. Rename visible GitHub star fallback labels from Star to Github in the navbar surfaces.
    2. Add a very small radius to homepage buttons and bordered blocks while keeping the site visually restrained.
    3. Run focused website checks and production/build text checks for the renamed label and radius-safe output.
  Verify Steps: |-
    PLANNER fallback scaffold for "Polish homepage GitHub label and radius". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Polish homepage GitHub label and radius". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T19:22:39.200Z — VERIFY — ok

    By: CODER

    Note: Local site checks passed: typecheck, build:check, format:changed, git diff --check, policy routing, doctor. Visual screenshots confirm Github label and small-radius homepage controls on desktop/mobile.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T19:12:04.122Z, excerpt_hash=sha256:0d932777de0a65454ebe02186cbdc2dd4b186935172867464f3a20a16255fb05

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231911-BZ4X3X-github-label-radius/.agentplane/tasks/202605231911-BZ4X3X/blueprint/resolved-snapshot.json
    - old_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
    - current_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231911-BZ4X3X

    ### 2026-05-23T19:22:46.955Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluation accepted: built output contains Github navbar copy, screenshots render without Star label, and homepage radius changes are visually restrained.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T19:22:39.217Z, excerpt_hash=sha256:0d932777de0a65454ebe02186cbdc2dd4b186935172867464f3a20a16255fb05

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231911-BZ4X3X-github-label-radius/.agentplane/tasks/202605231911-BZ4X3X/blueprint/resolved-snapshot.json
    - old_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
    - current_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231911-BZ4X3X

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Homepage navbar and CTA surfaces now show Github/Open GitHub copy instead of Star fallback copy.
      Impact: User-facing site copy matches requested GitHub wording and avoids square homepage controls.
      Resolution: Updated Root runtime injection, GitHubStarsButton fallback copy, and homepage/global button radius styling.

    - Observation: Desktop and mobile screenshots from the local build show Github/Open GitHub and non-square CTA/block treatment.
      Impact: The requested site polish is visible in the production build artifact before merge.
      Resolution: No rework required.
id_source: "generated"
---
## Summary

Polish homepage GitHub label and radius

Rename the public GitHub star label from Star to Github and give homepage blocks/buttons a very small border radius instead of fully square corners.

## Scope

- In scope: Rename the public GitHub star label from Star to Github and give homepage blocks/buttons a very small border radius instead of fully square corners.
- Out of scope: unrelated refactors not required for "Polish homepage GitHub label and radius".

## Plan

1. Rename visible GitHub star fallback labels from Star to Github in the navbar surfaces.
2. Add a very small radius to homepage buttons and bordered blocks while keeping the site visually restrained.
3. Run focused website checks and production/build text checks for the renamed label and radius-safe output.

## Verify Steps

PLANNER fallback scaffold for "Polish homepage GitHub label and radius". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Polish homepage GitHub label and radius". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T19:22:39.200Z — VERIFY — ok

By: CODER

Note: Local site checks passed: typecheck, build:check, format:changed, git diff --check, policy routing, doctor. Visual screenshots confirm Github label and small-radius homepage controls on desktop/mobile.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T19:12:04.122Z, excerpt_hash=sha256:0d932777de0a65454ebe02186cbdc2dd4b186935172867464f3a20a16255fb05

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231911-BZ4X3X-github-label-radius/.agentplane/tasks/202605231911-BZ4X3X/blueprint/resolved-snapshot.json
- old_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
- current_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231911-BZ4X3X

### 2026-05-23T19:22:46.955Z — VERIFY — ok

By: EVALUATOR

Note: Evaluation accepted: built output contains Github navbar copy, screenshots render without Star label, and homepage radius changes are visually restrained.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T19:22:39.217Z, excerpt_hash=sha256:0d932777de0a65454ebe02186cbdc2dd4b186935172867464f3a20a16255fb05

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231911-BZ4X3X-github-label-radius/.agentplane/tasks/202605231911-BZ4X3X/blueprint/resolved-snapshot.json
- old_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
- current_digest: 39c6bf15991a075192d69958f0d1b76247071b88cb074ae46bb8940217e9b844
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231911-BZ4X3X

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Homepage navbar and CTA surfaces now show Github/Open GitHub copy instead of Star fallback copy.
  Impact: User-facing site copy matches requested GitHub wording and avoids square homepage controls.
  Resolution: Updated Root runtime injection, GitHubStarsButton fallback copy, and homepage/global button radius styling.

- Observation: Desktop and mobile screenshots from the local build show Github/Open GitHub and non-square CTA/block treatment.
  Impact: The requested site polish is visible in the production build artifact before merge.
  Resolution: No rework required.
