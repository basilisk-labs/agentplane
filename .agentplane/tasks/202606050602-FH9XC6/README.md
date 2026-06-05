---
id: "202606050602-FH9XC6"
title: "Publish v0.6.18 patch release"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T06:02:49.932Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T06:40:05.049Z"
  updated_by: "EVALUATOR"
  note: "Release candidate v0.6.18 is ready for integration: local release candidate checks passed, remote PR artifact fallback blocker was fixed, and hosted PR checks passed 18/18 on PR #4454."
  evaluated_sha: "40c44683db28891a05ae982b73074022faacfc26"
  blueprint_digest: "63236ff197ead57e4c0b9ce2deb3df2f4522dc2b5b5b330287cce518f96350e9"
  evidence_refs:
    - ".agentplane/tasks/202606050602-FH9XC6/README.md"
    - ".agentplane/tasks/202606050602-FH9XC6/quality/20260605-064005049-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050602-FH9XC6/quality/20260605-064005049-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050602-FH9XC6/quality/20260605-064005049-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050602-FH9XC6/blueprint/resolved-snapshot.json"
    - ".agentplane/.release/apply/2026-06-05T06-27-10-240Z.json"
    - "https://github.com/basilisk-labs/agentplane/pull/4454"
  findings:
    - "No release-blocking issues remain. Residual local environment note: git hook invocation and bun-run lint path showed SIGKILL/hang behavior, but direct hook, full ESLint via node entrypoint, release heavy gate, and hosted checks passed."
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Preparing branch_pr patch release v0.6.18 from current main after prompt runner-guidance gating work. Scope includes release plan, candidate branch, hosted checks, publish dispatch, and registry/tag verification."
events:
  -
    type: "status"
    at: "2026-06-05T06:02:56.172Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Preparing branch_pr patch release v0.6.18 from current main after prompt runner-guidance gating work. Scope includes release plan, candidate branch, hosted checks, publish dispatch, and registry/tag verification."
doc_version: 3
doc_updated_at: "2026-06-05T06:02:56.172Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare and publish the next patch release after prompt routing cleanup. Scope: release v0.6.18 from current main, including runner guidance gating outside parallel-codex context, with release notes, candidate merge, npm publish evidence, and registry/tag verification."
sections:
  Summary: |-
    Publish v0.6.18 patch release

    Prepare and publish the next patch release after prompt routing cleanup. Scope: release v0.6.18 from current main, including runner guidance gating outside parallel-codex context, with release notes, candidate merge, npm publish evidence, and registry/tag verification.
  Scope: |-
    - In scope: Prepare and publish the next patch release after prompt routing cleanup. Scope: release v0.6.18 from current main, including runner guidance gating outside parallel-codex context, with release notes, candidate merge, npm publish evidence, and registry/tag verification.
    - Out of scope: unrelated refactors not required for "Publish v0.6.18 patch release".
  Plan: "Release plan: version=0.6.18, tag=v0.6.18, scope=patch release from current main after runner guidance gating fix. Branch_pr route: generate release plan, prepare release candidate with version bump and notes, push candidate branch, merge candidate after hosted checks, then dispatch Publish release for the release commit SHA and verify GitHub tag/release plus npm registry visibility for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes."
  Verify Steps: |-
    PLANNER fallback scaffold for "Publish v0.6.18 patch release". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Publish v0.6.18 patch release". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Publish v0.6.18 patch release

Prepare and publish the next patch release after prompt routing cleanup. Scope: release v0.6.18 from current main, including runner guidance gating outside parallel-codex context, with release notes, candidate merge, npm publish evidence, and registry/tag verification.

## Scope

- In scope: Prepare and publish the next patch release after prompt routing cleanup. Scope: release v0.6.18 from current main, including runner guidance gating outside parallel-codex context, with release notes, candidate merge, npm publish evidence, and registry/tag verification.
- Out of scope: unrelated refactors not required for "Publish v0.6.18 patch release".

## Plan

Release plan: version=0.6.18, tag=v0.6.18, scope=patch release from current main after runner guidance gating fix. Branch_pr route: generate release plan, prepare release candidate with version bump and notes, push candidate branch, merge candidate after hosted checks, then dispatch Publish release for the release commit SHA and verify GitHub tag/release plus npm registry visibility for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes.

## Verify Steps

PLANNER fallback scaffold for "Publish v0.6.18 patch release". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Publish v0.6.18 patch release". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
