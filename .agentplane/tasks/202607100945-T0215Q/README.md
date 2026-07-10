---
id: "202607100945-T0215Q"
title: "Resolve release incident INC-20260710-01 website lint"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incident"
  - "release-0.6.22"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T09:46:02.198Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T09:57:03.987Z"
  updated_by: "REVIEWER"
  note: "Website lint restored with zero findings; Docusaurus-aware filename and generated-asset boundaries are narrow; docs typecheck, generation freshness, production build, ci:contract, test:fast, release incident gate, policy routing, and doctor passed. Doctor reports only pre-existing historical task metadata warnings."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T09:57:18.412Z"
  updated_by: "EVALUATOR"
  note: "The incident fix restores the website release gate without weakening repository-wide lint or release checks."
  evaluated_sha: "5a8b4d0ef6401f4b65bfecf5edab25374aafe733"
  blueprint_digest: "6f0e7d38454ff7afd12d4dcfb02bae7c132c7fd895253ff6ddd8e0afc7bda62d"
  evidence_refs:
    - ".agentplane/tasks/202607100945-T0215Q/README.md"
    - ".agentplane/tasks/202607100945-T0215Q/quality/20260710-095718412-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100945-T0215Q/quality/20260710-095718412-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100945-T0215Q/quality/20260710-095718412-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100945-T0215Q/blueprint/resolved-snapshot.json"
    - "commit 5a8b4d0ef640"
    - "bun run lint:website; bun run docs:site:typecheck; bun run docs:site:generate:check; bun run docs:site:build:check"
    - "bun run ci:contract; bun run test:fast; node scripts/check-release-incidents.mjs; node .agentplane/policy/check-routing.mjs; ap doctor"
  findings:
    - "Framework-specific filename exceptions are limited to React components, data modules, and Docusaurus theme paths; the generated exclusion is limited to one presentation subtree."
    - "Actionable source findings were corrected and verified by the production site build; the active incident was preserved in the durable archive before canonical and projected registries were cleared."
commit:
  hash: "b4617b09beac9479a09af3cf5ec8de8a11cba90a"
  message: "📝 T0215Q task: record pull request metadata"
comments:
  -
    author: "CODER"
    body: "Start: resolve INC-20260710-01 by making website lint clean with Docusaurus-aware rule boundaries and verified source fixes."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-10T09:47:07.767Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: resolve INC-20260710-01 by making website lint clean with Docusaurus-aware rule boundaries and verified source fixes."
  -
    type: "verify"
    at: "2026-07-10T09:57:03.987Z"
    author: "REVIEWER"
    state: "ok"
    note: "Website lint restored with zero findings; Docusaurus-aware filename and generated-asset boundaries are narrow; docs typecheck, generation freshness, production build, ci:contract, test:fast, release incident gate, policy routing, and doctor passed. Doctor reports only pre-existing historical task metadata warnings."
  -
    type: "status"
    at: "2026-07-10T10:05:48.762Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-10T10:05:48.763Z"
doc_updated_by: "CODER"
description: "For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest."
sections:
  Summary: |-
    Resolve release incident INC-20260710-01 website lint

    For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.
  Scope: |-
    - In scope: For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.
    - Out of scope: unrelated refactors not required for "Resolve release incident INC-20260710-01 website lint".
  Plan: |-
    1. Reproduce and classify all current website lint findings, separating Docusaurus-required naming/generated assets from actionable source defects.
    2. Add the narrowest website-specific ESLint boundaries for framework-owned conventions and fix the remaining source findings without changing site behavior.
    3. Verify website lint, typecheck, generated-doc freshness, build, core contract, and full fast tests.
    4. Archive INC-20260710-01 with the task/commit evidence, prove the release incident gate passes, and add this task to the v0.6.22 execution graph and release dependencies.
  Verify Steps: |-
    1. Run `bun run lint:website`. Expected: zero errors and zero warnings across the website surface.
    2. Run `bun run docs:site:typecheck`. Expected: website TypeScript passes.
    3. Run `bun run docs:site:generate:check`. Expected: generated site documentation remains fresh.
    4. Run `bun run docs:site:build:check`. Expected: the Docusaurus production build check passes.
    5. Run `bun run ci:contract`. Expected: repository contracts, architecture, Knip, clone, and coverage guards pass.
    6. Run `bun run test:fast`. Expected: the full fast regression suite passes.
    7. Run `node scripts/check-release-incidents.mjs`. Expected: no active release incident remains after INC-20260710-01 is archived with evidence.
    8. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T09:57:03.987Z — VERIFY — ok

    By: REVIEWER

    Note: Website lint restored with zero findings; Docusaurus-aware filename and generated-asset boundaries are narrow; docs typecheck, generation freshness, production build, ci:contract, test:fast, release incident gate, policy routing, and doctor passed. Doctor reports only pre-existing historical task metadata warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:47:07.767Z, excerpt_hash=sha256:f14ede3d0e9a6c7bf654d39ddb1dcd5393c3af4d0ebece77a754e5aa28cfdbf3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100945-T0215Q-resolve-website-lint-incident/.agentplane/tasks/202607100945-T0215Q/blueprint/resolved-snapshot.json
    - old_digest: 6f0e7d38454ff7afd12d4dcfb02bae7c132c7fd895253ff6ddd8e0afc7bda62d
    - current_digest: 6f0e7d38454ff7afd12d4dcfb02bae7c132c7fd895253ff6ddd8e0afc7bda62d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100945-T0215Q

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100945-T0215Q
    - diagnostic_command: agentplane pr check 202607100945-T0215Q
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  implementation_commit:
    hash: "5a8b4d0ef6401f4b65bfecf5edab25374aafe733"
    message: "🚧 T0215Q task: fix website lint release incident"
id_source: "generated"
---
## Summary

Resolve release incident INC-20260710-01 website lint

For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.

## Scope

- In scope: For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.
- Out of scope: unrelated refactors not required for "Resolve release incident INC-20260710-01 website lint".

## Plan

1. Reproduce and classify all current website lint findings, separating Docusaurus-required naming/generated assets from actionable source defects.
2. Add the narrowest website-specific ESLint boundaries for framework-owned conventions and fix the remaining source findings without changing site behavior.
3. Verify website lint, typecheck, generated-doc freshness, build, core contract, and full fast tests.
4. Archive INC-20260710-01 with the task/commit evidence, prove the release incident gate passes, and add this task to the v0.6.22 execution graph and release dependencies.

## Verify Steps

1. Run `bun run lint:website`. Expected: zero errors and zero warnings across the website surface.
2. Run `bun run docs:site:typecheck`. Expected: website TypeScript passes.
3. Run `bun run docs:site:generate:check`. Expected: generated site documentation remains fresh.
4. Run `bun run docs:site:build:check`. Expected: the Docusaurus production build check passes.
5. Run `bun run ci:contract`. Expected: repository contracts, architecture, Knip, clone, and coverage guards pass.
6. Run `bun run test:fast`. Expected: the full fast regression suite passes.
7. Run `node scripts/check-release-incidents.mjs`. Expected: no active release incident remains after INC-20260710-01 is archived with evidence.
8. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T09:57:03.987Z — VERIFY — ok

By: REVIEWER

Note: Website lint restored with zero findings; Docusaurus-aware filename and generated-asset boundaries are narrow; docs typecheck, generation freshness, production build, ci:contract, test:fast, release incident gate, policy routing, and doctor passed. Doctor reports only pre-existing historical task metadata warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:47:07.767Z, excerpt_hash=sha256:f14ede3d0e9a6c7bf654d39ddb1dcd5393c3af4d0ebece77a754e5aa28cfdbf3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100945-T0215Q-resolve-website-lint-incident/.agentplane/tasks/202607100945-T0215Q/blueprint/resolved-snapshot.json
- old_digest: 6f0e7d38454ff7afd12d4dcfb02bae7c132c7fd895253ff6ddd8e0afc7bda62d
- current_digest: 6f0e7d38454ff7afd12d4dcfb02bae7c132c7fd895253ff6ddd8e0afc7bda62d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100945-T0215Q

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100945-T0215Q
- diagnostic_command: agentplane pr check 202607100945-T0215Q
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
