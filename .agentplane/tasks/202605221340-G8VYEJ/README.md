---
id: "202605221340-G8VYEJ"
title: "Release AgentPlane v0.6.6"
result_summary: "Merged via PR #4019."
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T13:41:00.868Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T16:23:27.117Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.6."
quality_review:
  state: "pass"
  updated_at: "2026-05-22T16:01:03.720Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: local release:prepublish completed before candidate preparation; post-bump format, release:parity, registry availability, release:check, docs:site:check, ap doctor, policy routing, pre-push fast route, and hosted PR checks for #4019 passed. PR branch is one commit over origin/main and PR meta has no tracked head_sha."
  evaluated_sha: "260aed90723d5136fbadd49bd187697454f11d43"
  blueprint_digest: "a05c9163c2dac4a4f7692255d17c66e9a694aa039d4ffb4dfe85836072d6a0a1"
  evidence_refs:
    - ".agentplane/tasks/202605221340-G8VYEJ/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221340-G8VYEJ-release-v0-6-6/.agentplane/tasks/202605221340-G8VYEJ/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "92ca8827543c84a2584dfd886917e1b24d5a51d7"
  message: "Merge pull request #4019 from basilisk-labs/task/202605221340-G8VYEJ/release-v0-6-6"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: preparing AgentPlane v0.6.6 patch release from current main after clean preflight and confirmed v0.6.5 publication baseline."
  -
    author: "INTEGRATOR"
    body: "blocked: release readiness gate requires the release task to be outside DOING before candidate and publish checks | details: continuing candidate preparation from the dedicated release branch."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4019 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T13:41:06.198Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: preparing AgentPlane v0.6.6 patch release from current main after clean preflight and confirmed v0.6.5 publication baseline."
  -
    type: "status"
    at: "2026-05-22T13:43:09.190Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "BLOCKED"
    note: "blocked: release readiness gate requires the release task to be outside DOING before candidate and publish checks | details: continuing candidate preparation from the dedicated release branch."
  -
    type: "verify"
    at: "2026-05-22T16:01:03.720Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: local release:prepublish completed before candidate preparation; post-bump format, release:parity, registry availability, release:check, docs:site:check, ap doctor, policy routing, pre-push fast route, and hosted PR checks for #4019 passed. PR branch is one commit over origin/main and PR meta has no tracked head_sha."
  -
    type: "status"
    at: "2026-05-22T16:11:23.553Z"
    author: "INTEGRATOR"
    from: "BLOCKED"
    to: "DONE"
    note: "Verified: PR #4019 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T16:23:27.117Z"
doc_updated_by: "DEUS"
description: "Prepare and publish the next patch release from current main after validating repository state, full checks, release candidate, hosted merge, and npm/GitHub release evidence."
sections:
  Summary: |-
    Release AgentPlane v0.6.6

    Prepare and publish the next patch release from current main after validating repository state, full checks, release candidate, hosted merge, and npm/GitHub release evidence.
  Scope: |-
    - In scope: Prepare and publish the next patch release from current main after validating repository state, full checks, release candidate, hosted merge, and npm/GitHub release evidence.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.6".
  Plan: "Release plan: version=v0.6.6, tag=v0.6.6, scope=patch release from current main after PR #4015/#4018 and #4017/#4019 close tails. Verify repository state, active incidents empty, full local checks, release prepublish/parity gates, release candidate PR merge through branch_pr, hosted publish to npm/GitHub Release, and postpublish evidence via npm view, gh release view, and remote tag lookup."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - State: ok
    - Note: Hosted publish confirmed for v0.6.6.
    - Details:
      - release_sha: 92ca8827543c84a2584dfd886917e1b24d5a51d7
      - version: 0.6.6
      - tag: v0.6.6
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.6
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/26299153438
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release AgentPlane v0.6.6

Prepare and publish the next patch release from current main after validating repository state, full checks, release candidate, hosted merge, and npm/GitHub release evidence.

## Scope

- In scope: Prepare and publish the next patch release from current main after validating repository state, full checks, release candidate, hosted merge, and npm/GitHub release evidence.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.6".

## Plan

Release plan: version=v0.6.6, tag=v0.6.6, scope=patch release from current main after PR #4015/#4018 and #4017/#4019 close tails. Verify repository state, active incidents empty, full local checks, release prepublish/parity gates, release candidate PR merge through branch_pr, hosted publish to npm/GitHub Release, and postpublish evidence via npm view, gh release view, and remote tag lookup.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- State: ok
- Note: Hosted publish confirmed for v0.6.6.
- Details:
  - release_sha: 92ca8827543c84a2584dfd886917e1b24d5a51d7
  - version: 0.6.6
  - tag: v0.6.6
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.6
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/26299153438
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings