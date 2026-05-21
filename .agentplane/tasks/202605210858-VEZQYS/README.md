---
id: "202605210858-VEZQYS"
title: "Harden Obsidian context wiki links and source notes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "wiki"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T08:58:33.844Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-21T09:39:26.898Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for current commit f267a89b, including the routed CI submodule initialization fix required by hosted merge gate."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-21T09:39:26.898Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for current commit f267a89b, including the routed CI submodule initialization fix required by hosted merge gate."
  evaluated_sha: "f267a89ba50106671e08c9bcf9fcd5d85ab01b3a"
  blueprint_digest: "35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5"
  evidence_refs:
    - ".agentplane/tasks/202605210858-VEZQYS/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved context wiki hardening for Obsidian case-stable internal links, generated Obsidian-friendly context elements, and numeric source notes that point to raw-source references."
events:
  -
    type: "status"
    at: "2026-05-21T08:58:56.976Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved context wiki hardening for Obsidian case-stable internal links, generated Obsidian-friendly context elements, and numeric source notes that point to raw-source references."
  -
    type: "verify"
    at: "2026-05-21T09:07:50.003Z"
    author: "CODER"
    state: "ok"
    note: "Implemented case-stable Obsidian wiki link linting, generated Obsidian wiki properties, and numeric source-note output for context wiki pages."
  -
    type: "verify"
    at: "2026-05-21T09:09:41.942Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality review passed for Obsidian context wiki behavior and source-note contract; targeted tests and local checks cover the changed surfaces."
  -
    type: "verify"
    at: "2026-05-21T09:20:25.744Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for current commit 77326c7df with cited local verification evidence."
  -
    type: "verify"
    at: "2026-05-21T09:34:37.962Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for current implementation commit 1d3fb0088 after splitting Obsidian context tests below hotspot budget."
  -
    type: "verify"
    at: "2026-05-21T09:39:26.898Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for current commit f267a89b, including the routed CI submodule initialization fix required by hosted merge gate."
doc_version: 3
doc_updated_at: "2026-05-21T09:39:26.916Z"
doc_updated_by: "CODER"
description: "Fix case-sensitive Obsidian cross-link breakage during context assimilation, add automatic Obsidian-friendly context wiki elements, and support numeric source note references that resolve to raw-data links at the end of generated pages."
sections:
  Summary: |-
    Harden Obsidian context wiki links and source notes

    Fix case-sensitive Obsidian cross-link breakage during context assimilation, add automatic Obsidian-friendly context wiki elements, and support numeric source note references that resolve to raw-data links at the end of generated pages.
  Scope: |-
    - In scope: Fix case-sensitive Obsidian cross-link breakage during context assimilation, add automatic Obsidian-friendly context wiki elements, and support numeric source note references that resolve to raw-data links at the end of generated pages.
    - Out of scope: unrelated refactors not required for "Harden Obsidian context wiki links and source notes".
  Plan: |-
    1. Inspect current context wiki/maximum-assimilation link generation, linting, and verify-task gates.
    2. Add deterministic Obsidian link normalization so generated internal wiki links resolve to canonical page paths independent of display-case drift.
    3. Add automatic Obsidian-friendly context wiki elements for generated assimilation output, preferably as projection/navigation metadata that does not replace canonical wiki pages.
    4. Add source-note rendering guidance/validation so pages can cite sources as numeric markers that point to a Sources section with raw-data links.
    5. Add focused tests for case-normalized wikilinks, Obsidian elements, and numeric source notes; run context/wiki targeted checks plus routing/doctor.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-21T09:07:50.003Z — VERIFY — ok

    By: CODER

    Note: Implemented case-stable Obsidian wiki link linting, generated Obsidian wiki properties, and numeric source-note output for context wiki pages.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T08:58:56.976Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
    - old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

    ### 2026-05-21T09:09:41.942Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality review passed for Obsidian context wiki behavior and source-note contract; targeted tests and local checks cover the changed surfaces.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:07:50.035Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
    - old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

    ### 2026-05-21T09:20:25.744Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for current commit 77326c7df with cited local verification evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:09:41.974Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
    - old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

    ### 2026-05-21T09:34:37.962Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for current implementation commit 1d3fb0088 after splitting Obsidian context tests below hotspot budget.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:20:25.777Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
    - old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

    ### 2026-05-21T09:39:26.898Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for current commit f267a89b, including the routed CI submodule initialization fix required by hosted merge gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:34:37.980Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
    - old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks passed: targeted context release-readiness Vitest, touched-file ESLint, changed-file Prettier, git diff --check, policy routing, typecheck, context wiki lint, and ap doctor.
      Impact: Context assimilation output now catches case-drifted Obsidian wikilinks before vault use and renders generated wiki pages with aliases/tags/cssclasses plus numbered raw-source notes.
      Resolution: Ready for EVALUATOR review and branch_pr integration.

    - Observation: Reviewed generated wiki output, lint behavior for case-drifted wikilinks, maximum-assimilation prompt/gate changes, and docs alignment.
      Impact: The change is scoped to context wiki generation/linting/prompt contracts and does not alter raw source storage or task Obsidian projection behavior.
      Resolution: Proceed with branch_pr publication/integration when approved.

    - Observation: Current task branch commit includes only the reviewed Obsidian wiki link/source-note implementation and task evidence updates.
      Impact: Quality gate now references the current implementation commit expected by branch_pr integration.
      Resolution: Rerun integrate with run-verify.

    - Observation: Focused Obsidian tests were moved into wiki.obsidian.unit.test.ts and release-readiness stayed within the oversized-test budget.
      Impact: Pre-push hotspot baseline no longer blocks publication while preserving coverage for generated Obsidian properties, numeric source notes, and case-stable wikilinks.
      Resolution: Proceed with PR open and merge route.

    - Observation: Hosted verify-routed failed because docs:recipes:check ran without agentplane-recipes initialized; routed CI now initializes only that required submodule.
      Impact: The PR can re-run the same remote gate with the required recipe inventory source present, matching local pre-push behavior.
      Resolution: Push updated branch and re-check hosted PR gate.
id_source: "generated"
---
## Summary

Harden Obsidian context wiki links and source notes

Fix case-sensitive Obsidian cross-link breakage during context assimilation, add automatic Obsidian-friendly context wiki elements, and support numeric source note references that resolve to raw-data links at the end of generated pages.

## Scope

- In scope: Fix case-sensitive Obsidian cross-link breakage during context assimilation, add automatic Obsidian-friendly context wiki elements, and support numeric source note references that resolve to raw-data links at the end of generated pages.
- Out of scope: unrelated refactors not required for "Harden Obsidian context wiki links and source notes".

## Plan

1. Inspect current context wiki/maximum-assimilation link generation, linting, and verify-task gates.
2. Add deterministic Obsidian link normalization so generated internal wiki links resolve to canonical page paths independent of display-case drift.
3. Add automatic Obsidian-friendly context wiki elements for generated assimilation output, preferably as projection/navigation metadata that does not replace canonical wiki pages.
4. Add source-note rendering guidance/validation so pages can cite sources as numeric markers that point to a Sources section with raw-data links.
5. Add focused tests for case-normalized wikilinks, Obsidian elements, and numeric source notes; run context/wiki targeted checks plus routing/doctor.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-21T09:07:50.003Z — VERIFY — ok

By: CODER

Note: Implemented case-stable Obsidian wiki link linting, generated Obsidian wiki properties, and numeric source-note output for context wiki pages.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T08:58:56.976Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
- old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

### 2026-05-21T09:09:41.942Z — VERIFY — ok

By: EVALUATOR

Note: Quality review passed for Obsidian context wiki behavior and source-note contract; targeted tests and local checks cover the changed surfaces.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:07:50.035Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
- old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

### 2026-05-21T09:20:25.744Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for current commit 77326c7df with cited local verification evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:09:41.974Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
- old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

### 2026-05-21T09:34:37.962Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for current implementation commit 1d3fb0088 after splitting Obsidian context tests below hotspot budget.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:20:25.777Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
- old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

### 2026-05-21T09:39:26.898Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for current commit f267a89b, including the routed CI submodule initialization fix required by hosted merge gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T09:34:37.980Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210858-VEZQYS-obsidian-context-links/.agentplane/tasks/202605210858-VEZQYS/blueprint/resolved-snapshot.json
- old_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- current_digest: 35668b115e73c6890d224fba4fbac8c65990b44a97294c9a418c091486a953d5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210858-VEZQYS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks passed: targeted context release-readiness Vitest, touched-file ESLint, changed-file Prettier, git diff --check, policy routing, typecheck, context wiki lint, and ap doctor.
  Impact: Context assimilation output now catches case-drifted Obsidian wikilinks before vault use and renders generated wiki pages with aliases/tags/cssclasses plus numbered raw-source notes.
  Resolution: Ready for EVALUATOR review and branch_pr integration.

- Observation: Reviewed generated wiki output, lint behavior for case-drifted wikilinks, maximum-assimilation prompt/gate changes, and docs alignment.
  Impact: The change is scoped to context wiki generation/linting/prompt contracts and does not alter raw source storage or task Obsidian projection behavior.
  Resolution: Proceed with branch_pr publication/integration when approved.

- Observation: Current task branch commit includes only the reviewed Obsidian wiki link/source-note implementation and task evidence updates.
  Impact: Quality gate now references the current implementation commit expected by branch_pr integration.
  Resolution: Rerun integrate with run-verify.

- Observation: Focused Obsidian tests were moved into wiki.obsidian.unit.test.ts and release-readiness stayed within the oversized-test budget.
  Impact: Pre-push hotspot baseline no longer blocks publication while preserving coverage for generated Obsidian properties, numeric source notes, and case-stable wikilinks.
  Resolution: Proceed with PR open and merge route.

- Observation: Hosted verify-routed failed because docs:recipes:check ran without agentplane-recipes initialized; routed CI now initializes only that required submodule.
  Impact: The PR can re-run the same remote gate with the required recipe inventory source present, matching local pre-push behavior.
  Resolution: Push updated branch and re-check hosted PR gate.
