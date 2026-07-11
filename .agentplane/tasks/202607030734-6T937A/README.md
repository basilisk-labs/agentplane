---
id: "202607030734-6T937A"
title: "Context help: expose nested v2 commands"
result_summary: "Merged via PR #4580."
status: "DONE"
priority: "med"
owner: "CURATOR"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-03T07:34:17.288Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-11T14:30:35.714Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.22."
quality_review:
  state: "pass"
  updated_at: "2026-07-11T14:17:46.445Z"
  updated_by: "EVALUATOR"
  note: "Included context-help implementation is present on main and current focused validation passes; only stale child-task closure metadata remained."
  evaluated_sha: null
  blueprint_digest: "b65e4399cbf3ca9ce1d4997993a0684edaf01d841d77bd7e4d6269fe798ea67a"
  evidence_refs:
    - ".agentplane/tasks/202607030734-6T937A/README.md"
    - ".agentplane/tasks/202607030734-6T937A/quality/20260711-141746445-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607030734-6T937A/quality/20260711-141746445-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607030734-6T937A/quality/20260711-141746445-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607030734-6T937A/blueprint/resolved-snapshot.json"
    - "https://github.com/basilisk-labs/agentplane/pull/4543; patch-id 5533f127c720861355410def020aa169caa891ea; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; bun run --filter=agentplane typecheck"
  findings:
    - "PR #4543 merged the identical patch; help contract 14/14 and agentplane typecheck pass on current main-derived branch."
commit:
  hash: "bd3a19c29cf2e3696943871f9edd92beef2b2226"
  message: "✅ 6T937A task: verify included context help on main"
comments:
  -
    author: "CURATOR"
    body: "Start: Implementing nested context command help discoverability as an included task in primary worktree 202607030734-7S66KX."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4580 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-07-03T07:34:58.046Z"
    author: "CURATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing nested context command help discoverability as an included task in primary worktree 202607030734-7S66KX."
  -
    type: "verify"
    at: "2026-07-03T07:38:56.455Z"
    author: "CURATOR"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: explicit help for context migrate and context extraction apply works without --all. Command: repo-local CLI help smoke; Result: pass; Evidence: compact help rendered for both advanced context commands. Scope: nested context command help discoverability."
  -
    type: "verify"
    at: "2026-07-11T14:17:43.940Z"
    author: "CURATOR"
    state: "ok"
    note: "Included implementation was merged by PR #4543; rebased patch-id matches d53b6cf, current help contract is 14/14 passing, and agentplane typecheck passes."
  -
    type: "status"
    at: "2026-07-11T14:21:58.867Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4580 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-07-11T14:30:35.714Z"
doc_updated_by: "DEUS"
description: "Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably."
sections:
  Summary: |-
    Context help: expose nested v2 commands

    Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.
  Scope: |-
    - In scope: Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.
    - Out of scope: unrelated refactors not required for "Context help: expose nested v2 commands".
  Plan: "1. Reproduce help discoverability gap for context migrate and context extraction apply. 2. Register nested context v2 command specs in the command catalog/help surface without changing execution semantics. 3. Add catalog/help regression coverage. 4. Verify direct command help works from the repo-local CLI."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - State: ok
    - Note: Hosted publish confirmed for v0.6.22.
    - Details:
      - release_sha: bd61ef4982f29cd0909587d0034cf6e35a62a03d
      - version: 0.6.22
      - tag: v0.6.22
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.22
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/29156079982
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Context help: expose nested v2 commands

Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.

## Scope

- In scope: Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.
- Out of scope: unrelated refactors not required for "Context help: expose nested v2 commands".

## Plan

1. Reproduce help discoverability gap for context migrate and context extraction apply. 2. Register nested context v2 command specs in the command catalog/help surface without changing execution semantics. 3. Add catalog/help regression coverage. 4. Verify direct command help works from the repo-local CLI.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- State: ok
- Note: Hosted publish confirmed for v0.6.22.
- Details:
  - release_sha: bd61ef4982f29cd0909587d0034cf6e35a62a03d
  - version: 0.6.22
  - tag: v0.6.22
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.22
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/29156079982
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings