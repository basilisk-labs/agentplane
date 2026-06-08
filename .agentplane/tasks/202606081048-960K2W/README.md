---
id: "202606081048-960K2W"
title: "Release AgentPlane 0.6.19"
result_summary: "Merged via PR #4489."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T10:48:54.482Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T12:03:57.171Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.19."
quality_review:
  state: "pass"
  updated_at: "2026-06-08T11:30:34.541Z"
  updated_by: "EVALUATOR"
  note: "Release candidate v0.6.19 satisfies the approved release scope and hosted gate evidence is green."
  evaluated_sha: "70747328493abba8347a52a5b2df91e26814c396"
  blueprint_digest: "2cf92bf7430ca34110a24d06cfe601d6afa933f167709660464f0764ebe8c47c"
  evidence_refs:
    - ".agentplane/tasks/202606081048-960K2W/README.md"
    - ".agentplane/tasks/202606081048-960K2W/quality/20260608-113034541-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606081048-960K2W/quality/20260608-113034541-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606081048-960K2W/quality/20260608-113034541-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606081048-960K2W/blueprint/resolved-snapshot.json"
    - "git:70747328493abba8347a52a5b2df91e26814c396"
    - "gh-pr:4489 checks pass"
    - "bun run release:prepublish:fast"
    - "node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202606081048-960K2W"
    - "bun run release:check:registry -- --version 0.6.19"
  findings:
    - "PASS: candidate branch contains exact 0.6.19 package parity, release notes, generated README headers, release social preview, and task-local verification; local gates and hosted PR #4489 checks passed, including Release-ready manifest and PR verification."
commit:
  hash: "c60446fecf114d6a538393c405ace3840fee025b"
  message: "📝 960K2W release: refresh generated reference"
comments:
  -
    author: "CODER"
    body: "Start: preparing AgentPlane 0.6.19 release candidate in branch_pr task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4489 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-08T10:50:02.644Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: preparing AgentPlane 0.6.19 release candidate in branch_pr task worktree."
  -
    type: "verify"
    at: "2026-06-08T11:30:18.500Z"
    author: "CODER"
    state: "ok"
    note: "Release candidate v0.6.19 prepared and checked locally and on GitHub PR #4489."
  -
    type: "status"
    at: "2026-06-08T11:52:25.957Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4489 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-08T12:03:57.171Z"
doc_updated_by: "DEUS"
description: "Prepare, verify, merge, and publish AgentPlane patch release 0.6.19."
sections:
  Summary: |-
    Release AgentPlane 0.6.19

    Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.
  Scope: |-
    - In scope: Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.
    - Out of scope: unrelated refactors not required for "Release AgentPlane 0.6.19".
  Plan: |-
    Goal: release AgentPlane 0.6.19 as a patch release.

    Acceptance criteria:
    1. Release candidate branch is created from current main in branch_pr mode and contains exact version/tag target 0.6.19 / v0.6.19.
    2. Candidate changes pass local release gates: routing policy check, ap doctor, docs/readme header check, docs/CLI check, typecheck, hotspot check, and release prepublish fast path.
    3. Candidate PR is opened, hosted checks pass, evaluator records a pass verdict with evidence.
    4. Candidate is integrated through branch_pr workflow into main.
    5. Publish release workflow is dispatched or verified on the exact release commit SHA, and external truth confirms GitHub tag/release plus npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes are 0.6.19.

    Constraints:
    - Do not publish from an unmerged candidate branch.
    - Do not treat release detect workflow success as publication.
    - Do not manually edit .agentplane/tasks.json.
    - Use ap task brief and ap task next-action --explain as the route oracle before mutating lifecycle steps.
    - Keep release artifacts in English.

    Planned execution:
    1. Start/recover dedicated CODER worktree with slug release-0-6-19.
    2. Run candidate preparation with exact version: bun run release:candidate:prepare -- --version 0.6.19 --write --push --yes.
    3. Inspect candidate diff and run required local checks.
    4. Open/update PR, record verification and evaluator pass.
    5. Integrate candidate into main after hosted checks.
    6. Dispatch/verify Publish release against the release commit SHA and confirm GitHub/npm external surfaces.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - State: ok
    - Note: Hosted publish confirmed for v0.6.19.
    - Details:
      - release_sha: aac63f77cf39ba79ccd2d342648bafb8f08ba410
      - version: 0.6.19
      - tag: v0.6.19
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.19
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/27136056972
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Local gates passed: release task readiness with current release task excluded, npm availability for 0.6.19, release:prepublish:fast, format:check, and pre-push fast CI including 2076 fast tests plus critical CLI chunks.
      Impact: Candidate branch contains exact package parity 0.6.19, release notes, generated README header assets, and release social preview.
      Resolution: Hosted PR #4489 checks passed: Core CI, Docs CI, CodeQL, PR verification, Release-ready manifest, test-windows, and required verify jobs.
id_source: "generated"
---
## Summary

Release AgentPlane 0.6.19

Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.

## Scope

- In scope: Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.
- Out of scope: unrelated refactors not required for "Release AgentPlane 0.6.19".

## Plan

Goal: release AgentPlane 0.6.19 as a patch release.

Acceptance criteria:
1. Release candidate branch is created from current main in branch_pr mode and contains exact version/tag target 0.6.19 / v0.6.19.
2. Candidate changes pass local release gates: routing policy check, ap doctor, docs/readme header check, docs/CLI check, typecheck, hotspot check, and release prepublish fast path.
3. Candidate PR is opened, hosted checks pass, evaluator records a pass verdict with evidence.
4. Candidate is integrated through branch_pr workflow into main.
5. Publish release workflow is dispatched or verified on the exact release commit SHA, and external truth confirms GitHub tag/release plus npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes are 0.6.19.

Constraints:
- Do not publish from an unmerged candidate branch.
- Do not treat release detect workflow success as publication.
- Do not manually edit .agentplane/tasks.json.
- Use ap task brief and ap task next-action --explain as the route oracle before mutating lifecycle steps.
- Keep release artifacts in English.

Planned execution:
1. Start/recover dedicated CODER worktree with slug release-0-6-19.
2. Run candidate preparation with exact version: bun run release:candidate:prepare -- --version 0.6.19 --write --push --yes.
3. Inspect candidate diff and run required local checks.
4. Open/update PR, record verification and evaluator pass.
5. Integrate candidate into main after hosted checks.
6. Dispatch/verify Publish release against the release commit SHA and confirm GitHub/npm external surfaces.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- State: ok
- Note: Hosted publish confirmed for v0.6.19.
- Details:
  - release_sha: aac63f77cf39ba79ccd2d342648bafb8f08ba410
  - version: 0.6.19
  - tag: v0.6.19
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.19
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/27136056972
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Local gates passed: release task readiness with current release task excluded, npm availability for 0.6.19, release:prepublish:fast, format:check, and pre-push fast CI including 2076 fast tests plus critical CLI chunks.
  Impact: Candidate branch contains exact package parity 0.6.19, release notes, generated README header assets, and release social preview.
  Resolution: Hosted PR #4489 checks passed: Core CI, Docs CI, CodeQL, PR verification, Release-ready manifest, test-windows, and required verify jobs.