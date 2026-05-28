---
id: "202605281713-EW6N63"
title: "Optimize prompt policy surfaces"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:13:28.555Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:26:58.389Z"
  updated_by: "DOCS"
  note: "Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bun run framework:dev:bootstrap -> pass; repo-local runtime 0.6.11 active. Command: ap task next-action 202605281713-EW6N63 --explain -> pass; prints authoritative_checkout_path, mutation_path_hint, safe_to_mutate. Command: ap doctor -> OK with 0 warnings. Command: git diff --check -> pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T17:33:53.022Z"
  updated_by: "EVALUATOR"
  note: "Route surfaces now expose authoritative checkout paths and mutation hints; base checkout tracked state is clean and task changes are isolated in the branch_pr worktree."
  evaluated_sha: "ba88e90b1dd2404277c21e8c68ca72c89f49ec72"
  blueprint_digest: "8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82"
  evidence_refs:
    - ".agentplane/tasks/202605281713-EW6N63/README.md"
    - ".agentplane/tasks/202605281713-EW6N63/quality/20260528-173353022-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605281713-EW6N63/quality/20260528-173353022-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605281713-EW6N63/quality/20260528-173353022-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605281713-EW6N63/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts"
    - "bunx tsc -p packages/agentplane/tsconfig.json --noEmit"
    - "node .agentplane/policy/check-routing.mjs"
    - "ap doctor"
  findings:
    - "Added route execution packet, path hints, CLI/runner rendering, and regression coverage for tools without cwd/workdir."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: optimize prompt and policy surfaces using GPT-5.5 prompt-guidance criteria while preserving strict route and approval behavior."
events:
  -
    type: "status"
    at: "2026-05-28T17:13:31.938Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: optimize prompt and policy surfaces using GPT-5.5 prompt-guidance criteria while preserving strict route and approval behavior."
  -
    type: "verify"
    at: "2026-05-28T17:17:42.317Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/command-guide.test.ts -> pass, 8 tests. Command: git diff --check scoped prompt files -> pass. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 ap doctor -> OK with pre-existing runtime warnings. Skipped: docs:bootstrap:check and docs:cli:check because repo-local CLI dist is missing and framework bootstrap fails on pre-existing duplicate identifiers in route-oracle.ts."
  -
    type: "verify"
    at: "2026-05-28T17:26:17.766Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: ap doctor -> OK with pre-existing runtime warnings about global binary 0.6.10 vs expected 0.6.11. Command: git diff --check -> pass."
  -
    type: "verify"
    at: "2026-05-28T17:26:58.389Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bun run framework:dev:bootstrap -> pass; repo-local runtime 0.6.11 active. Command: ap task next-action 202605281713-EW6N63 --explain -> pass; prints authoritative_checkout_path, mutation_path_hint, safe_to_mutate. Command: ap doctor -> OK with 0 warnings. Command: git diff --check -> pass."
doc_version: 3
doc_updated_at: "2026-05-28T17:26:58.418Z"
doc_updated_by: "DOCS"
description: "Shorten AGENTS and policy prompt surfaces while preserving clearer agent behavior and GPT-5.5 prompt-guidance alignment."
sections:
  Summary: |-
    Optimize prompt policy surfaces

    Shorten AGENTS and policy prompt surfaces while preserving clearer agent behavior and GPT-5.5 prompt-guidance alignment.
  Scope: |-
    - In scope: Shorten AGENTS and policy prompt surfaces while preserving clearer agent behavior and GPT-5.5 prompt-guidance alignment.
    - Out of scope: unrelated refactors not required for "Optimize prompt policy surfaces".
  Plan: "1. Use OpenAI GPT-5.5 prompt guidance as criteria: clear tool/use rules, persistence, verification loop, concise updates, no premature stopping, and less ambiguity. 2. Shorten AGENTS.md by removing duplicate command/DOD prose while keeping load rules, hard gates, and source-of-truth hierarchy. 3. Shorten branch_pr/direct/docs/governance policy modules by merging duplicate bullets and keeping executable route constraints. 4. Avoid removing ap:fragment markers unless generator checks prove they are unnecessary; remove ordinary horizontal separators and redundant blank spacing where safe. 5. Verify with policy routing, generated bootstrap freshness when affected, doctor if runnable, line counts, and diff review."
  Verify Steps: |-
    PLANNER fallback scaffold for "Optimize prompt policy surfaces". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Optimize prompt policy surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:17:42.317Z — VERIFY — ok

    By: DOCS

    Note: Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/command-guide.test.ts -> pass, 8 tests. Command: git diff --check scoped prompt files -> pass. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 ap doctor -> OK with pre-existing runtime warnings. Skipped: docs:bootstrap:check and docs:cli:check because repo-local CLI dist is missing and framework bootstrap fails on pre-existing duplicate identifiers in route-oracle.ts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:13:31.938Z, excerpt_hash=sha256:81475c9128ca690c689c8f9571958a8db924fa8c5e42d950fe554332701fb330

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605281713-EW6N63/blueprint/resolved-snapshot.json
    - old_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
    - current_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281713-EW6N63

    ### 2026-05-28T17:26:17.766Z — VERIFY — ok

    By: DOCS

    Note: Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: ap doctor -> OK with pre-existing runtime warnings about global binary 0.6.10 vs expected 0.6.11. Command: git diff --check -> pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:17:42.334Z, excerpt_hash=sha256:81475c9128ca690c689c8f9571958a8db924fa8c5e42d950fe554332701fb330

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605281713-EW6N63/blueprint/resolved-snapshot.json
    - old_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
    - current_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281713-EW6N63

    ### 2026-05-28T17:26:58.389Z — VERIFY — ok

    By: DOCS

    Note: Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bun run framework:dev:bootstrap -> pass; repo-local runtime 0.6.11 active. Command: ap task next-action 202605281713-EW6N63 --explain -> pass; prints authoritative_checkout_path, mutation_path_hint, safe_to_mutate. Command: ap doctor -> OK with 0 warnings. Command: git diff --check -> pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:26:17.789Z, excerpt_hash=sha256:81475c9128ca690c689c8f9571958a8db924fa8c5e42d950fe554332701fb330

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605281713-EW6N63/blueprint/resolved-snapshot.json
    - old_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
    - current_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281713-EW6N63

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Optimize prompt policy surfaces

Shorten AGENTS and policy prompt surfaces while preserving clearer agent behavior and GPT-5.5 prompt-guidance alignment.

## Scope

- In scope: Shorten AGENTS and policy prompt surfaces while preserving clearer agent behavior and GPT-5.5 prompt-guidance alignment.
- Out of scope: unrelated refactors not required for "Optimize prompt policy surfaces".

## Plan

1. Use OpenAI GPT-5.5 prompt guidance as criteria: clear tool/use rules, persistence, verification loop, concise updates, no premature stopping, and less ambiguity. 2. Shorten AGENTS.md by removing duplicate command/DOD prose while keeping load rules, hard gates, and source-of-truth hierarchy. 3. Shorten branch_pr/direct/docs/governance policy modules by merging duplicate bullets and keeping executable route constraints. 4. Avoid removing ap:fragment markers unless generator checks prove they are unnecessary; remove ordinary horizontal separators and redundant blank spacing where safe. 5. Verify with policy routing, generated bootstrap freshness when affected, doctor if runnable, line counts, and diff review.

## Verify Steps

PLANNER fallback scaffold for "Optimize prompt policy surfaces". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Optimize prompt policy surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:17:42.317Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/command-guide.test.ts -> pass, 8 tests. Command: git diff --check scoped prompt files -> pass. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 ap doctor -> OK with pre-existing runtime warnings. Skipped: docs:bootstrap:check and docs:cli:check because repo-local CLI dist is missing and framework bootstrap fails on pre-existing duplicate identifiers in route-oracle.ts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:13:31.938Z, excerpt_hash=sha256:81475c9128ca690c689c8f9571958a8db924fa8c5e42d950fe554332701fb330

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605281713-EW6N63/blueprint/resolved-snapshot.json
- old_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
- current_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281713-EW6N63

### 2026-05-28T17:26:17.766Z — VERIFY — ok

By: DOCS

Note: Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: ap doctor -> OK with pre-existing runtime warnings about global binary 0.6.10 vs expected 0.6.11. Command: git diff --check -> pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:17:42.334Z, excerpt_hash=sha256:81475c9128ca690c689c8f9571958a8db924fa8c5e42d950fe554332701fb330

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605281713-EW6N63/blueprint/resolved-snapshot.json
- old_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
- current_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281713-EW6N63

### 2026-05-28T17:26:58.389Z — VERIFY — ok

By: DOCS

Note: Command: bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts -> pass, 23 tests. Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass, policy routing OK. Command: bun run framework:dev:bootstrap -> pass; repo-local runtime 0.6.11 active. Command: ap task next-action 202605281713-EW6N63 --explain -> pass; prints authoritative_checkout_path, mutation_path_hint, safe_to_mutate. Command: ap doctor -> OK with 0 warnings. Command: git diff --check -> pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:26:17.789Z, excerpt_hash=sha256:81475c9128ca690c689c8f9571958a8db924fa8c5e42d950fe554332701fb330

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605281713-EW6N63/blueprint/resolved-snapshot.json
- old_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
- current_digest: 8e5e2f2f1e84d105849882f0fa8888a4e4e0be462ffa92ae85377f1129191d82
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281713-EW6N63

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
