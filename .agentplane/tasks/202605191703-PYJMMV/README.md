---
id: "202605191703-PYJMMV"
title: "Make maximum assimilation source-shaped and Obsidian-compatible"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "wiki"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T17:03:46.327Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T17:19:50.380Z"
  updated_by: "EVALUATOR"
  note: "Command: independent quality review against the updated maximum-assimilation contract and diff. Result: pass. Evidence: first-ingest behavior now skips fixed starter folders only when workspace mode is maximum-assimilation while retaining the starter scaffold test for non-maximum mode; generated CURATOR prompt requires source-shaped topology decision, granular synthesis, Obsidian-compatible wikilinks, coverage report, raw-deletion resilience review, and EVALUATOR review; blueprint evidence/stop rules include topology, wikilinks, and evaluator gates; docs clarify no .obsidian config is created by default. Scope: semantic quality gate for source-shaped wiki structure, useful wikilinks, provenance, coverage, glossary safety, and leakage risk."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T17:19:50.380Z"
  updated_by: "EVALUATOR"
  note: "Command: independent quality review against the updated maximum-assimilation contract and diff. Result: pass. Evidence: first-ingest behavior now skips fixed starter folders only when workspace mode is maximum-assimilation while retaining the starter scaffold test for non-maximum mode; generated CURATOR prompt requires source-shaped topology decision, granular synthesis, Obsidian-compatible wikilinks, coverage report, raw-deletion resilience review, and EVALUATOR review; blueprint evidence/stop rules include topology, wikilinks, and evaluator gates; docs clarify no .obsidian config is created by default. Scope: semantic quality gate for source-shaped wiki structure, useful wikilinks, provenance, coverage, glossary safety, and leakage risk."
  evaluated_sha: "cdffae04ff79d82e589eed934d02c3d38932488d"
  blueprint_digest: "50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5"
  evidence_refs:
    - ".agentplane/tasks/202605191703-PYJMMV/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191703-PYJMMV-max-assimilation-obsidian/.agentplane/tasks/202605191703-PYJMMV/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing maximum-assimilation context behavior in the dedicated branch_pr worktree, covering scaffold mode split, source-shaped Obsidian-compatible prompt contract, EVALUATOR quality checklist, docs, and focused tests."
events:
  -
    type: "status"
    at: "2026-05-19T17:04:03.125Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing maximum-assimilation context behavior in the dedicated branch_pr worktree, covering scaffold mode split, source-shaped Obsidian-compatible prompt contract, EVALUATOR quality checklist, docs, and focused tests."
  -
    type: "verify"
    at: "2026-05-19T17:18:51.254Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx prettier --check .agentplane/agents/EVALUATOR.json docs/user/local-context.mdx packages/agentplane/assets/agents/EVALUATOR.json packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/context/ingest.ts packages/agentplane/src/shared/builtin-assets.generated.ts; bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts; bunx eslint packages/agentplane/src/context/ingest.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/shared/builtin-assets.generated.ts; bun run typecheck; bun run docs:site:typecheck; bun run agents:check && bun run assets:builtin:check; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier OK; 42 focused tests passed; eslint passed; typecheck passed; docs site typecheck passed after framework bootstrap installed website deps; agents/builtin asset checks fresh; policy routing OK; doctor OK. Scope: maximum-assimilation scaffold split, generated CURATOR prompt/task extension, EVALUATOR criteria, docs, generated assets, and focused tests."
  -
    type: "verify"
    at: "2026-05-19T17:19:50.380Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Command: independent quality review against the updated maximum-assimilation contract and diff. Result: pass. Evidence: first-ingest behavior now skips fixed starter folders only when workspace mode is maximum-assimilation while retaining the starter scaffold test for non-maximum mode; generated CURATOR prompt requires source-shaped topology decision, granular synthesis, Obsidian-compatible wikilinks, coverage report, raw-deletion resilience review, and EVALUATOR review; blueprint evidence/stop rules include topology, wikilinks, and evaluator gates; docs clarify no .obsidian config is created by default. Scope: semantic quality gate for source-shaped wiki structure, useful wikilinks, provenance, coverage, glossary safety, and leakage risk."
doc_version: 3
doc_updated_at: "2026-05-19T17:19:50.732Z"
doc_updated_by: "CODER"
description: "Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience."
sections:
  Summary: |-
    Make maximum assimilation source-shaped and Obsidian-compatible

    Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.
  Scope: |-
    - In scope: Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.
    - Out of scope: unrelated refactors not required for "Make maximum assimilation source-shaped and Obsidian-compatible".
  Plan: "1. Split first-ingest wiki scaffold behavior by workspace mode: keep the fixed starter scaffold for non-maximum modes, but skip it for maximum-assimilation so CURATOR chooses the source-shaped wiki topology from content. 2. Strengthen generated maximum-assimilation task/prompt extensions: require a wiki topology decision, granular source-shaped pages/headings, Obsidian-compatible wikilinks for semantic page graph links, Markdown links for source refs, coverage report, raw-deletion resilience review, and explicit EVALUATOR quality checklist. 3. Update user docs and tests covering maximum mode scaffold behavior, normal mode scaffold retention, prompt content, and docs contract. 4. Run focused tests for context ingest/init/release readiness and blueprint validation, plus formatting/lint/policy checks required by task Verify Steps."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T17:18:51.254Z — VERIFY — ok

    By: CODER

    Note: Command: bunx prettier --check .agentplane/agents/EVALUATOR.json docs/user/local-context.mdx packages/agentplane/assets/agents/EVALUATOR.json packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/context/ingest.ts packages/agentplane/src/shared/builtin-assets.generated.ts; bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts; bunx eslint packages/agentplane/src/context/ingest.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/shared/builtin-assets.generated.ts; bun run typecheck; bun run docs:site:typecheck; bun run agents:check && bun run assets:builtin:check; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier OK; 42 focused tests passed; eslint passed; typecheck passed; docs site typecheck passed after framework bootstrap installed website deps; agents/builtin asset checks fresh; policy routing OK; doctor OK. Scope: maximum-assimilation scaffold split, generated CURATOR prompt/task extension, EVALUATOR criteria, docs, generated assets, and focused tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:04:03.125Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191703-PYJMMV-max-assimilation-obsidian/.agentplane/tasks/202605191703-PYJMMV/blueprint/resolved-snapshot.json
    - old_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
    - current_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191703-PYJMMV

    ### 2026-05-19T17:19:50.380Z — VERIFY — ok

    By: EVALUATOR

    Note: Command: independent quality review against the updated maximum-assimilation contract and diff. Result: pass. Evidence: first-ingest behavior now skips fixed starter folders only when workspace mode is maximum-assimilation while retaining the starter scaffold test for non-maximum mode; generated CURATOR prompt requires source-shaped topology decision, granular synthesis, Obsidian-compatible wikilinks, coverage report, raw-deletion resilience review, and EVALUATOR review; blueprint evidence/stop rules include topology, wikilinks, and evaluator gates; docs clarify no .obsidian config is created by default. Scope: semantic quality gate for source-shaped wiki structure, useful wikilinks, provenance, coverage, glossary safety, and leakage risk.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:18:53.442Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191703-PYJMMV-max-assimilation-obsidian/.agentplane/tasks/202605191703-PYJMMV/blueprint/resolved-snapshot.json
    - old_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
    - current_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191703-PYJMMV

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make maximum assimilation source-shaped and Obsidian-compatible

Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.

## Scope

- In scope: Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.
- Out of scope: unrelated refactors not required for "Make maximum assimilation source-shaped and Obsidian-compatible".

## Plan

1. Split first-ingest wiki scaffold behavior by workspace mode: keep the fixed starter scaffold for non-maximum modes, but skip it for maximum-assimilation so CURATOR chooses the source-shaped wiki topology from content. 2. Strengthen generated maximum-assimilation task/prompt extensions: require a wiki topology decision, granular source-shaped pages/headings, Obsidian-compatible wikilinks for semantic page graph links, Markdown links for source refs, coverage report, raw-deletion resilience review, and explicit EVALUATOR quality checklist. 3. Update user docs and tests covering maximum mode scaffold behavior, normal mode scaffold retention, prompt content, and docs contract. 4. Run focused tests for context ingest/init/release readiness and blueprint validation, plus formatting/lint/policy checks required by task Verify Steps.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T17:18:51.254Z — VERIFY — ok

By: CODER

Note: Command: bunx prettier --check .agentplane/agents/EVALUATOR.json docs/user/local-context.mdx packages/agentplane/assets/agents/EVALUATOR.json packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/context/ingest.ts packages/agentplane/src/shared/builtin-assets.generated.ts; bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts; bunx eslint packages/agentplane/src/context/ingest.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/shared/builtin-assets.generated.ts; bun run typecheck; bun run docs:site:typecheck; bun run agents:check && bun run assets:builtin:check; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier OK; 42 focused tests passed; eslint passed; typecheck passed; docs site typecheck passed after framework bootstrap installed website deps; agents/builtin asset checks fresh; policy routing OK; doctor OK. Scope: maximum-assimilation scaffold split, generated CURATOR prompt/task extension, EVALUATOR criteria, docs, generated assets, and focused tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:04:03.125Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191703-PYJMMV-max-assimilation-obsidian/.agentplane/tasks/202605191703-PYJMMV/blueprint/resolved-snapshot.json
- old_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
- current_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191703-PYJMMV

### 2026-05-19T17:19:50.380Z — VERIFY — ok

By: EVALUATOR

Note: Command: independent quality review against the updated maximum-assimilation contract and diff. Result: pass. Evidence: first-ingest behavior now skips fixed starter folders only when workspace mode is maximum-assimilation while retaining the starter scaffold test for non-maximum mode; generated CURATOR prompt requires source-shaped topology decision, granular synthesis, Obsidian-compatible wikilinks, coverage report, raw-deletion resilience review, and EVALUATOR review; blueprint evidence/stop rules include topology, wikilinks, and evaluator gates; docs clarify no .obsidian config is created by default. Scope: semantic quality gate for source-shaped wiki structure, useful wikilinks, provenance, coverage, glossary safety, and leakage risk.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:18:53.442Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191703-PYJMMV-max-assimilation-obsidian/.agentplane/tasks/202605191703-PYJMMV/blueprint/resolved-snapshot.json
- old_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
- current_digest: 50d9296a4fc61c3c7b6f21071ca1760784975791e2202d81593b7cf6b51b43e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191703-PYJMMV

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
