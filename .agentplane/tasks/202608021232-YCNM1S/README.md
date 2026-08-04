---
id: "202608021232-YCNM1S"
title: "Qualify and publish AgentPlane v0.7.1"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202608021232-6BTB6D"
  - "202608021232-MT4FK2"
tags:
  - "release"
  - "v0.7.1"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run ci:contract"
  - "bun run e2e:v0.7.1:gate"
  - "npm view agentplane@0.7.1 version"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T08:35:47.310Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T08:36:16.852Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T08:36:16.852Z"
doc_updated_by: "INTEGRATOR"
description: "Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth."
sections:
  Summary: |-
    Qualify and publish AgentPlane v0.7.1

    Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.
  Scope: |-
    - In scope: Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.
    - Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane v0.7.1".
  Plan: "Release plan: version=0.7.1, tag=v0.7.1, scope=publish the already provider-qualified AgentPlane 0.7 candidate with concise user-facing notes and release-only metadata changes. 1. Reconfirm clean main/origin parity, empty active incident registry, frozen provider evidence (50 runs / 55 episodes, 0 blockers, 29.921280763879005% token reduction), and that post-qualification changes are test/task evidence only. 2. Create the branch_pr release worktree and replace fallback Verify Steps with exact checks for release manifests, TypeScript 7, the v0.7.1 product contract, package smoke, notes, and static/critical gates. 3. Generate the patch release plan, write concise docs/releases/v0.7.1.md separated from the full qualification ledger, and prepare version/manifests through the canonical release candidate flow without changing runtime code. 4. Run deterministic prepublish, pack, installed-package, and postpublish checks on the final candidate SHA; do not rerun provider episodes unless runtime/product code changes. 5. Publish the candidate PR, obtain an independent evaluator pass and hosted checks, then merge through the integration queue. 6. Dispatch Publish to npm for the exact merged release SHA and verify the v0.7.1 tag, GitHub Release, npm versions/dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, installed CLI smoke, postpublish audit, and local/remote main parity. Stop if the version/tag changes, active incidents appear, any required gate fails, or the candidate includes product code drift."
  Verify Steps: |-
    1. Inspect `git diff 82a0ffea3af6a1ca811a824e24289d9a68c4d684...HEAD` and the worktree status. Expected: the candidate contains release metadata, notes, generated release assets, and task evidence only; no runtime or product-source drift is present.
    2. Run `node scripts/release/check-release-notes.mjs --tag v0.7.1 --min-bullets 287` and `bun run format:check`. Expected: the concise release summary and complete collapsed commit ledger pass the repository contract.
    3. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`. Expected: the v0.7.1 product contract passes, including the shared supervisor default, compact agent packet, TypeScript 7 toolchain, and zero unused CLI exports.
    4. Run `bun run release:prepublish`. Expected: release parity, builds, static contracts, critical suites, package tarball checks, and installed-package smoke all pass for version 0.7.1.
    5. Reconfirm dependency task `202608021232-6BTB6D`. Expected: the frozen product candidate retains the single completed gate of 50 runs / 55 provider episodes with 0 blockers and 29.921280763879005% token reduction; do not rerun unless product code changes.
    6. Complete independent task verification, evaluator pass, hosted PR checks, and merge through the integration queue. Expected: every required check is green and the merged SHA is the exact publish input.
    7. Dispatch `Publish to npm` for the exact merged SHA, then run `bun run release:smoke:published` and `bun run release:postpublish:audit`. Expected: tag and GitHub Release `v0.7.1`, npm versions/dist-tags for all three public packages, installed CLI smoke, and local/remote `main` parity are confirmed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The release-notes validator requires one bullet per commit since v0.7.0 (287 entries). Keep the normal rendered view concise by placing the complete qualification ledger inside a collapsed details section; this avoids changing release tooling or provider-qualified product code.
    - Provider-qualified product code remains frozen at `de94bf9d91de1a8a854ad358968e8193e9803342`. Later merged work is limited to regression tests, task evidence, cleanup, and release metadata, so the successful 50-run / 55-episode gate remains authoritative unless product code drifts.
    - The heavy prepublish gate found 55 tracked volatile `.log` files from completed qualification tasks. Their canonical metrics and verdicts already exist in task READMEs, verification records, compact JSON reports, and per-scenario `output_tail` fields, so remove only the duplicate logs and make the task-local recorded-gate validator use the compact output instead of requiring forbidden files.
    - The release-ci suite exposed one stale agent-mode test that expected the pre-0.7 advanced `ap help` catalog. Update the test contract to the intentional compact canonical help surface; runtime behavior remains unchanged.
    - The release-ci suite exposed a second stale fixture that created a task without a semantic plan but expected `approval_required`. Preserve the intended approval-boundary coverage by recording a task-specific unapproved plan first; the correct no-plan boundary remains `semantic_input_required`, and runtime behavior is unchanged.
    - The user-supplied v0.7 audit was checked against the current candidate in `evidence/external-audit-assessment.md`. Its P0 product findings are already resolved by the v0.7.1 contract and provider-qualified code; package-splitting, composite complexity metrics, and broader evidence-retention backends remain non-blocking architecture follow-up.
extensions:
  workflow_route_baseline:
    start_head_sha: "82a0ffea3af6a1ca811a824e24289d9a68c4d684"
    version: 1
id_source: "generated"
---
## Summary

Qualify and publish AgentPlane v0.7.1

Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.

## Scope

- In scope: Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane v0.7.1".

## Plan

Release plan: version=0.7.1, tag=v0.7.1, scope=publish the already provider-qualified AgentPlane 0.7 candidate with concise user-facing notes and release-only metadata changes. 1. Reconfirm clean main/origin parity, empty active incident registry, frozen provider evidence (50 runs / 55 episodes, 0 blockers, 29.921280763879005% token reduction), and that post-qualification changes are test/task evidence only. 2. Create the branch_pr release worktree and replace fallback Verify Steps with exact checks for release manifests, TypeScript 7, the v0.7.1 product contract, package smoke, notes, and static/critical gates. 3. Generate the patch release plan, write concise docs/releases/v0.7.1.md separated from the full qualification ledger, and prepare version/manifests through the canonical release candidate flow without changing runtime code. 4. Run deterministic prepublish, pack, installed-package, and postpublish checks on the final candidate SHA; do not rerun provider episodes unless runtime/product code changes. 5. Publish the candidate PR, obtain an independent evaluator pass and hosted checks, then merge through the integration queue. 6. Dispatch Publish to npm for the exact merged release SHA and verify the v0.7.1 tag, GitHub Release, npm versions/dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, installed CLI smoke, postpublish audit, and local/remote main parity. Stop if the version/tag changes, active incidents appear, any required gate fails, or the candidate includes product code drift.

## Verify Steps

1. Inspect `git diff 82a0ffea3af6a1ca811a824e24289d9a68c4d684...HEAD` and the worktree status. Expected: the candidate contains release metadata, notes, generated release assets, and task evidence only; no runtime or product-source drift is present.
2. Run `node scripts/release/check-release-notes.mjs --tag v0.7.1 --min-bullets 287` and `bun run format:check`. Expected: the concise release summary and complete collapsed commit ledger pass the repository contract.
3. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`. Expected: the v0.7.1 product contract passes, including the shared supervisor default, compact agent packet, TypeScript 7 toolchain, and zero unused CLI exports.
4. Run `bun run release:prepublish`. Expected: release parity, builds, static contracts, critical suites, package tarball checks, and installed-package smoke all pass for version 0.7.1.
5. Reconfirm dependency task `202608021232-6BTB6D`. Expected: the frozen product candidate retains the single completed gate of 50 runs / 55 provider episodes with 0 blockers and 29.921280763879005% token reduction; do not rerun unless product code changes.
6. Complete independent task verification, evaluator pass, hosted PR checks, and merge through the integration queue. Expected: every required check is green and the merged SHA is the exact publish input.
7. Dispatch `Publish to npm` for the exact merged SHA, then run `bun run release:smoke:published` and `bun run release:postpublish:audit`. Expected: tag and GitHub Release `v0.7.1`, npm versions/dist-tags for all three public packages, installed CLI smoke, and local/remote `main` parity are confirmed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The release-notes validator requires one bullet per commit since v0.7.0 (287 entries). Keep the normal rendered view concise by placing the complete qualification ledger inside a collapsed details section; this avoids changing release tooling or provider-qualified product code.
- Provider-qualified product code remains frozen at `de94bf9d91de1a8a854ad358968e8193e9803342`. Later merged work is limited to regression tests, task evidence, cleanup, and release metadata, so the successful 50-run / 55-episode gate remains authoritative unless product code drifts.
- The heavy prepublish gate found 55 tracked volatile `.log` files from completed qualification tasks. Their canonical metrics and verdicts already exist in task READMEs, verification records, compact JSON reports, and per-scenario `output_tail` fields, so remove only the duplicate logs and make the task-local recorded-gate validator use the compact output instead of requiring forbidden files.
- The release-ci suite exposed one stale agent-mode test that expected the pre-0.7 advanced `ap help` catalog. Update the test contract to the intentional compact canonical help surface; runtime behavior remains unchanged.
- The release-ci suite exposed a second stale fixture that created a task without a semantic plan but expected `approval_required`. Preserve the intended approval-boundary coverage by recording a task-specific unapproved plan first; the correct no-plan boundary remains `semantic_input_required`, and runtime behavior is unchanged.
- The user-supplied v0.7 audit was checked against the current candidate in `evidence/external-audit-assessment.md`. Its P0 product findings are already resolved by the v0.7.1 contract and provider-qualified code; package-splitting, composite complexity metrics, and broader evidence-retention backends remain non-blocking architecture follow-up.
