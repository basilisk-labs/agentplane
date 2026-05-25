---
id: "202605250929-N9FJB1"
title: "Fix upgrade markdown fragment leak"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "upgrade"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T09:29:59.126Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-25T09:41:52.329Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade renders managed markdown assets before writing installed policy files'. Result: pass. Evidence: 1 pass, 0 fail; regression confirms installed dod.code.md has no ap:fragment markers. Scope: targeted upgrade markdown rendering regression. Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: 14 pass, 0 fail, 113 expect calls. Scope: existing upgrade CLI behavior. Command: bun test packages/agentplane/src/commands/upgrade.merge.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 42 expect calls. Scope: upgrade planner merge semantics. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing constraints. Command: ap agents. Result: pass after framework bootstrap. Evidence: listed installed agent profiles. Scope: upgrade policy minimum verification."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-25T09:42:37.191Z"
  updated_by: "EVALUATOR"
  note: "Upgrade planner now renders managed markdown assets before writing installed policy files; regression and upgrade planner tests pass."
  evaluated_sha: "caa43500b61c746fd315b3e0e1fdc62fb287db29"
  blueprint_digest: "39605e3ceb9e21858000a94f4a7885acb1aa921d5b3278f8b7fece299303d241"
  evidence_refs:
    - ".agentplane/tasks/202605250929-N9FJB1/README.md"
    - ".agentplane/tasks/202605250929-N9FJB1/quality/20260525-094237191-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605250929-N9FJB1/quality/20260525-094237191-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605250929-N9FJB1/quality/20260525-094237191-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605250929-N9FJB1/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/run-cli.core.upgrade.test.ts"
    - "packages/agentplane/src/commands/upgrade/plan.ts"
  findings:
    - "No remaining fragment-marker leak found in covered upgrade path."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement upgrade markdown rendering regression fix for managed policy files, preserving existing branch_pr task scope and targeted verification."
events:
  -
    type: "status"
    at: "2026-05-25T09:30:16.672Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement upgrade markdown rendering regression fix for managed policy files, preserving existing branch_pr task scope and targeted verification."
  -
    type: "verify"
    at: "2026-05-25T09:41:52.329Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade renders managed markdown assets before writing installed policy files'. Result: pass. Evidence: 1 pass, 0 fail; regression confirms installed dod.code.md has no ap:fragment markers. Scope: targeted upgrade markdown rendering regression. Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: 14 pass, 0 fail, 113 expect calls. Scope: existing upgrade CLI behavior. Command: bun test packages/agentplane/src/commands/upgrade.merge.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 42 expect calls. Scope: upgrade planner merge semantics. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing constraints. Command: ap agents. Result: pass after framework bootstrap. Evidence: listed installed agent profiles. Scope: upgrade policy minimum verification."
doc_version: 3
doc_updated_at: "2026-05-25T09:41:52.347Z"
doc_updated_by: "CODER"
description: "Prevent agentplane upgrade from writing raw ap:fragment markers into installed managed markdown policy files in user repositories."
sections:
  Summary: |-
    Fix upgrade markdown fragment leak

    Prevent agentplane upgrade from writing raw ap:fragment markers into installed managed markdown policy files in user repositories.
  Scope: |-
    - In scope: Prevent agentplane upgrade from writing raw ap:fragment markers into installed managed markdown policy files in user repositories.
    - Out of scope: unrelated refactors not required for "Fix upgrade markdown fragment leak".
  Plan: "1. Add a regression test proving upgrade output for installed managed markdown policy files does not contain ap:fragment markers. 2. Update upgrade planning so incoming markdown assets are rendered to installed form before diffing/writing, while preserving special incidents merge behavior. 3. Run targeted upgrade tests plus routing checks and record verification."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t "upgrade renders managed markdown assets before writing installed policy files"`. Expected: regression passes and installed `.agentplane/policy/dod.code.md` contains no `ap:fragment` markers after upgrade.
    2. Run `bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts`. Expected: existing upgrade behavior remains green.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing constraints still pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-25T09:41:52.329Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade renders managed markdown assets before writing installed policy files'. Result: pass. Evidence: 1 pass, 0 fail; regression confirms installed dod.code.md has no ap:fragment markers. Scope: targeted upgrade markdown rendering regression. Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: 14 pass, 0 fail, 113 expect calls. Scope: existing upgrade CLI behavior. Command: bun test packages/agentplane/src/commands/upgrade.merge.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 42 expect calls. Scope: upgrade planner merge semantics. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing constraints. Command: ap agents. Result: pass after framework bootstrap. Evidence: listed installed agent profiles. Scope: upgrade policy minimum verification.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T09:33:46.929Z, excerpt_hash=sha256:5105266045b51033fd3e894b6299eda9428667650e991ac882edc7056a875067

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605250929-N9FJB1-upgrade-fragment-render/.agentplane/tasks/202605250929-N9FJB1/blueprint/resolved-snapshot.json
    - old_digest: 39605e3ceb9e21858000a94f4a7885acb1aa921d5b3278f8b7fece299303d241
    - current_digest: 39605e3ceb9e21858000a94f4a7885acb1aa921d5b3278f8b7fece299303d241
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605250929-N9FJB1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix upgrade markdown fragment leak

Prevent agentplane upgrade from writing raw ap:fragment markers into installed managed markdown policy files in user repositories.

## Scope

- In scope: Prevent agentplane upgrade from writing raw ap:fragment markers into installed managed markdown policy files in user repositories.
- Out of scope: unrelated refactors not required for "Fix upgrade markdown fragment leak".

## Plan

1. Add a regression test proving upgrade output for installed managed markdown policy files does not contain ap:fragment markers. 2. Update upgrade planning so incoming markdown assets are rendered to installed form before diffing/writing, while preserving special incidents merge behavior. 3. Run targeted upgrade tests plus routing checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t "upgrade renders managed markdown assets before writing installed policy files"`. Expected: regression passes and installed `.agentplane/policy/dod.code.md` contains no `ap:fragment` markers after upgrade.
2. Run `bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts`. Expected: existing upgrade behavior remains green.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing constraints still pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-25T09:41:52.329Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade renders managed markdown assets before writing installed policy files'. Result: pass. Evidence: 1 pass, 0 fail; regression confirms installed dod.code.md has no ap:fragment markers. Scope: targeted upgrade markdown rendering regression. Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: 14 pass, 0 fail, 113 expect calls. Scope: existing upgrade CLI behavior. Command: bun test packages/agentplane/src/commands/upgrade.merge.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 42 expect calls. Scope: upgrade planner merge semantics. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing constraints. Command: ap agents. Result: pass after framework bootstrap. Evidence: listed installed agent profiles. Scope: upgrade policy minimum verification.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T09:33:46.929Z, excerpt_hash=sha256:5105266045b51033fd3e894b6299eda9428667650e991ac882edc7056a875067

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605250929-N9FJB1-upgrade-fragment-render/.agentplane/tasks/202605250929-N9FJB1/blueprint/resolved-snapshot.json
- old_digest: 39605e3ceb9e21858000a94f4a7885acb1aa921d5b3278f8b7fece299303d241
- current_digest: 39605e3ceb9e21858000a94f4a7885acb1aa921d5b3278f8b7fece299303d241
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605250929-N9FJB1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
