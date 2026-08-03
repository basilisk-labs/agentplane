---
id: "202608021534-J5G235"
title: "Reduce the v0.7.1 CLI dead-code and barrel baseline"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "knip"
  - "maintenance"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run knip:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T15:09:11.137Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T15:42:00.703Z"
  updated_by: "TESTER"
  note: "Verified CLI dead-code ratchet and compatibility preservation."
  attempts: 0
commit:
  hash: "c76ac407e7e16aa697a1d029df6cde3538329d85"
  message: "♻️ J5G235 task: remove dead CLI surface"
comments:
  -
    author: "CODER"
    body: "Start: reduce internal AgentPlane CLI dead-code and barrel exports against the approved 60 percent ratchet."
  -
    author: "CODER"
    body: "Implementation committed: reduced AgentPlane CLI Knip debt from 517 symbols plus one unused file to zero while preserving compatibility contracts; full contract and 3768-test suite pass."
events:
  -
    type: "status"
    at: "2026-08-03T15:09:30.786Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reduce internal AgentPlane CLI dead-code and barrel exports against the approved 60 percent ratchet."
  -
    type: "status"
    at: "2026-08-03T15:41:40.322Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: reduced AgentPlane CLI Knip debt from 517 symbols plus one unused file to zero while preserving compatibility contracts; full contract and 3768-test suite pass."
  -
    type: "verify"
    at: "2026-08-03T15:42:00.703Z"
    author: "TESTER"
    state: "ok"
    note: "Verified CLI dead-code ratchet and compatibility preservation."
doc_version: 3
doc_updated_at: "2026-08-03T15:42:01.555Z"
doc_updated_by: "CODER"
description: "Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth."
sections:
  Summary: |-
    Reduce the v0.7.1 CLI dead-code and barrel baseline

    Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.
  Scope: |-
    - In scope: Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.
    - Out of scope: unrelated refactors not required for "Reduce the v0.7.1 CLI dead-code and barrel baseline".
  Plan: |-
    1. Capture the exact Knip inventory by package and classify every AgentPlane CLI finding as dynamic entrypoint, public compatibility surface, internal barrel re-export, declaration-only export, or genuinely unreachable code; record the 517-symbol CLI baseline and preserve the @agentplaneorg/core surface.
    2. Remove unnecessary internal barrel re-exports in the highest-yield modules (blueprints, commands/task, prompt modules/fragments/protocol/approvals/harness), switch internal consumers to direct module imports where needed, and de-export declaration-only symbols that remain locally used.
    3. Delete code only when static references, command registries, build entries, runtime loaders, and focused tests prove it unreachable; retain explicit Knip configuration entries for dynamic loading rather than hiding uncertain findings in the baseline.
    4. Regenerate the ratcheted baseline with at most 207 unused AgentPlane CLI exports/types (minimum 60 percent reduction from 517), zero new unused files, and no increase in the core compatibility baseline; make the threshold and package split explicit in the checker.
    5. Verify Knip, package builds, CLI help/command registration, blueprint and prompt-runtime focused suites, public core compatibility, ci:contract, typecheck/lint/diff/hotspot guards, then record structured evidence and run the independent evaluator before integration.
  Verify Steps: |-
    1. Run `bun run knip:check`. Expected: AgentPlane CLI reports zero unused files and zero unused exports/types; the preserved `@agentplaneorg/core` compatibility budget remains at 21 or lower.
    2. Run `bun run ci:contract`. Expected: formatting, compatibility, agent-efficiency replay, TypeScript 7, trust-boundary, architecture, clone, Knip, and coverage guards all pass.
    3. Run `bun run test:fast`. Expected: all AgentPlane, core, recipes, and testkit test files pass with no regressions.
    4. Compare the working-tree compatibility surface with task parent `f44bc0c51c13652b21d61b5e314ca1d4f624c465`. Expected: CLI topology, machine output, workflow schema, package manifests, and agent-facing context contracts remain unchanged; only the reviewed tarball inventory change from deleting unreachable source is accepted by the cumulative v0.7 candidate.
    5. Inspect the final diff and `git diff --check`. Expected: changes are limited to declaration-only export removal, proven unreachable declarations/imports, the single unused file deletion, the Knip ratchet, and task evidence.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T15:42:00.703Z — VERIFY — ok

    By: TESTER

    Note: Verified CLI dead-code ratchet and compatibility preservation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T15:41:40.322Z, excerpt_hash=sha256:07c220d036dbf595d07476ec334b7b547bc8e753321b4b0c5cbfacbd8193e4b6

    Details:

    Evidence:
    - bun run knip:check: PASS; AgentPlane CLI files=0/0 and total=0/0; core compatibility total=21/21.
    - bun run ci:contract: PASS; compatibility, agent-efficiency replay, TypeScript 7, trust-boundary, architecture, clone, Knip, and coverage guards passed.
    - bun run test:fast: PASS; 533 test files and 3768 tests passed across agentplane, core, recipes, and testkit.
    - bun --filter agentplane typecheck: PASS.
    - bun run lint:core: PASS.
    - git diff --check: PASS.
    - Compatibility comparison against f44bc0c51c13652b21d61b5e314ca1d4f624c465: CLI topology, machine output, workflow schema, package manifests, and agent-facing contracts preserved.
    Result: 517 CLI unused symbols plus one unused file reduced to zero; repository total reduced from 539 to 21 reviewed core compatibility findings.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-J5G235-reduce-the-v0-7-1-cli-dead-code-and-barrel-basel/.agentplane/tasks/202608021534-J5G235/blueprint/resolved-snapshot.json
    - old_digest: 7c541d71caed0db53cbcb8224d444cdb78ce98237d0b02009f8e7e1b36c5d7b2
    - current_digest: 7c541d71caed0db53cbcb8224d444cdb78ce98237d0b02009f8e7e1b36c5d7b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021534-J5G235

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021534-J5G235
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - AgentPlane CLI Knip debt reduced from 517 symbols plus one unused file to 0 symbols and 0 unused files (100% reduction; target was at least 60%).
    - Repository-wide Knip total reduced from 539 to 21; the remaining 21 findings are the reviewed `@agentplaneorg/core` compatibility surface.
    - `contract-types.ts` remains byte-identical because it is an agent-facing compatibility contract; Knip ignores only exports/types in that exact file.
    - Two bootstrap constants are retained with the explicit `@dynamic` tag because the docs bootstrap checker imports them dynamically.
    - Removed `packages/agentplane/src/cli/critical/cli-runner.ts` after registries, builds, full tests, and compatibility checks proved it unreachable.
    - No remaining functional or compatibility blocker was observed.

    - Observation: Knip initially classified exports in the byte-frozen agent-facing SGR contract and dynamic bootstrap module as unused.
      Impact: Removing those exports would preserve compilation but drift the compatibility digest or break the docs bootstrap dynamic import.
      Resolution: Restored the byte-identical SGR contract, added a file-exact Knip compatibility exception, and tagged only the two dynamically imported bootstrap constants; compatibility and bootstrap checks now pass.
extensions:
  workflow_route_baseline:
    start_head_sha: "f44bc0c51c13652b21d61b5e314ca1d4f624c465"
    version: 1
id_source: "generated"
---
## Summary

Reduce the v0.7.1 CLI dead-code and barrel baseline

Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.

## Scope

- In scope: Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.
- Out of scope: unrelated refactors not required for "Reduce the v0.7.1 CLI dead-code and barrel baseline".

## Plan

1. Capture the exact Knip inventory by package and classify every AgentPlane CLI finding as dynamic entrypoint, public compatibility surface, internal barrel re-export, declaration-only export, or genuinely unreachable code; record the 517-symbol CLI baseline and preserve the @agentplaneorg/core surface.
2. Remove unnecessary internal barrel re-exports in the highest-yield modules (blueprints, commands/task, prompt modules/fragments/protocol/approvals/harness), switch internal consumers to direct module imports where needed, and de-export declaration-only symbols that remain locally used.
3. Delete code only when static references, command registries, build entries, runtime loaders, and focused tests prove it unreachable; retain explicit Knip configuration entries for dynamic loading rather than hiding uncertain findings in the baseline.
4. Regenerate the ratcheted baseline with at most 207 unused AgentPlane CLI exports/types (minimum 60 percent reduction from 517), zero new unused files, and no increase in the core compatibility baseline; make the threshold and package split explicit in the checker.
5. Verify Knip, package builds, CLI help/command registration, blueprint and prompt-runtime focused suites, public core compatibility, ci:contract, typecheck/lint/diff/hotspot guards, then record structured evidence and run the independent evaluator before integration.

## Verify Steps

1. Run `bun run knip:check`. Expected: AgentPlane CLI reports zero unused files and zero unused exports/types; the preserved `@agentplaneorg/core` compatibility budget remains at 21 or lower.
2. Run `bun run ci:contract`. Expected: formatting, compatibility, agent-efficiency replay, TypeScript 7, trust-boundary, architecture, clone, Knip, and coverage guards all pass.
3. Run `bun run test:fast`. Expected: all AgentPlane, core, recipes, and testkit test files pass with no regressions.
4. Compare the working-tree compatibility surface with task parent `f44bc0c51c13652b21d61b5e314ca1d4f624c465`. Expected: CLI topology, machine output, workflow schema, package manifests, and agent-facing context contracts remain unchanged; only the reviewed tarball inventory change from deleting unreachable source is accepted by the cumulative v0.7 candidate.
5. Inspect the final diff and `git diff --check`. Expected: changes are limited to declaration-only export removal, proven unreachable declarations/imports, the single unused file deletion, the Knip ratchet, and task evidence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T15:42:00.703Z — VERIFY — ok

By: TESTER

Note: Verified CLI dead-code ratchet and compatibility preservation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T15:41:40.322Z, excerpt_hash=sha256:07c220d036dbf595d07476ec334b7b547bc8e753321b4b0c5cbfacbd8193e4b6

Details:

Evidence:
- bun run knip:check: PASS; AgentPlane CLI files=0/0 and total=0/0; core compatibility total=21/21.
- bun run ci:contract: PASS; compatibility, agent-efficiency replay, TypeScript 7, trust-boundary, architecture, clone, Knip, and coverage guards passed.
- bun run test:fast: PASS; 533 test files and 3768 tests passed across agentplane, core, recipes, and testkit.
- bun --filter agentplane typecheck: PASS.
- bun run lint:core: PASS.
- git diff --check: PASS.
- Compatibility comparison against f44bc0c51c13652b21d61b5e314ca1d4f624c465: CLI topology, machine output, workflow schema, package manifests, and agent-facing contracts preserved.
Result: 517 CLI unused symbols plus one unused file reduced to zero; repository total reduced from 539 to 21 reviewed core compatibility findings.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021534-J5G235-reduce-the-v0-7-1-cli-dead-code-and-barrel-basel/.agentplane/tasks/202608021534-J5G235/blueprint/resolved-snapshot.json
- old_digest: 7c541d71caed0db53cbcb8224d444cdb78ce98237d0b02009f8e7e1b36c5d7b2
- current_digest: 7c541d71caed0db53cbcb8224d444cdb78ce98237d0b02009f8e7e1b36c5d7b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021534-J5G235

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021534-J5G235
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- AgentPlane CLI Knip debt reduced from 517 symbols plus one unused file to 0 symbols and 0 unused files (100% reduction; target was at least 60%).
- Repository-wide Knip total reduced from 539 to 21; the remaining 21 findings are the reviewed `@agentplaneorg/core` compatibility surface.
- `contract-types.ts` remains byte-identical because it is an agent-facing compatibility contract; Knip ignores only exports/types in that exact file.
- Two bootstrap constants are retained with the explicit `@dynamic` tag because the docs bootstrap checker imports them dynamically.
- Removed `packages/agentplane/src/cli/critical/cli-runner.ts` after registries, builds, full tests, and compatibility checks proved it unreachable.
- No remaining functional or compatibility blocker was observed.

- Observation: Knip initially classified exports in the byte-frozen agent-facing SGR contract and dynamic bootstrap module as unused.
  Impact: Removing those exports would preserve compilation but drift the compatibility digest or break the docs bootstrap dynamic import.
  Resolution: Restored the byte-identical SGR contract, added a file-exact Knip compatibility exception, and tagged only the two dynamically imported bootstrap constants; compatibility and bootstrap checks now pass.
