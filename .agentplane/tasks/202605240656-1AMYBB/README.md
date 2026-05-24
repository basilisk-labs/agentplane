---
id: "202605240656-1AMYBB"
title: "Harden direct-mode hook publication recovery"
result_summary: "Merged via PR #4126."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-24T06:57:17.029Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-24T07:37:56.577Z"
  updated_by: "EVALUATOR"
  note: "Command: review-thread fix for PR #4126 discussion_r3294046432; Result: pass; Evidence: MJS and installed TypeScript pre-push paths now return empty scripts only when package.json is absent, and fail when existing package.json cannot be parsed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully after the HookFailure return fix. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 19 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold and oversized-test baseline OK. Command: bunx prettier --check changed review-fix files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-24T07:37:56.577Z"
  updated_by: "EVALUATOR"
  note: "Command: review-thread fix for PR #4126 discussion_r3294046432; Result: pass; Evidence: MJS and installed TypeScript pre-push paths now return empty scripts only when package.json is absent, and fail when existing package.json cannot be parsed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully after the HookFailure return fix. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 19 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold and oversized-test baseline OK. Command: bunx prettier --check changed review-fix files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass."
  evaluated_sha: "6e9a596ce64857cb18ac5f3bb0544608a2f967f5"
  blueprint_digest: "b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f"
  evidence_refs:
    - ".agentplane/tasks/202605240656-1AMYBB/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "ba77bedadf4876bb8306fa3ec2a2f3dccdcd0d41"
  message: "🐛 1AMYBB hooks: fail malformed package metadata"
comments:
  -
    author: "CODER"
    body: "Start: Implementing approved hook recovery hardening in the dedicated branch_pr worktree; scope is limited to direct-mode pre-push optional script handling, deploy-fix evidence bypass diagnostics, and focused hook tests."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4126 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-24T06:58:58.098Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing approved hook recovery hardening in the dedicated branch_pr worktree; scope is limited to direct-mode pre-push optional script handling, deploy-fix evidence bypass diagnostics, and focused hook tests."
  -
    type: "verify"
    at: "2026-05-24T07:13:34.194Z"
    author: "CODER"
    state: "ok"
    note: "Command: ap task verify-show 202605240656-1AMYBB; Result: pass; Evidence: task-specific Verify Steps are present and blueprint snapshot is current. Scope: task verification contract. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 38 tests passed. Scope: commit-msg/pre-push hook behavior. Command: bunx prettier --check changed hook/policy/test files; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: gateway policy routing. Command: ap doctor; Result: pass; Evidence: doctor OK with warnings=2 for pre-existing branch_pr reconciliation on 202605230451-N5F0HY. Scope: repo runtime/workflow health."
  -
    type: "verify"
    at: "2026-05-24T07:15:27.134Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Command: independent review of diff and recorded checks; Result: pass; Evidence: task adds constrained deploy-fix evidence route, optional-script skip parity in repository pre-push helper, and focused hook tests covering acceptance and rejection paths. Scope: quality review for PR #4126 before hosted checks complete."
  -
    type: "verify"
    at: "2026-05-24T07:19:40.525Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.deploy-fix.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 38 tests passed. Scope: deploy-fix, commit-msg, and pre-push hook behavior. Command: bun run hotspots:check; Result: pass; Evidence: runtime hotspot threshold and oversized-test baseline OK after splitting deploy-fix tests. Scope: size guard. Command: bunx prettier --check changed hook/policy/test files; Result: pass; Evidence: Prettier accepted changed files. Scope: changed files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: gateway routing. Command: ap doctor; Result: pass; Evidence: doctor OK with pre-existing branch_pr reconciliation warnings unrelated to this task. Scope: runtime/workflow health."
  -
    type: "verify"
    at: "2026-05-24T07:37:56.577Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Command: review-thread fix for PR #4126 discussion_r3294046432; Result: pass; Evidence: MJS and installed TypeScript pre-push paths now return empty scripts only when package.json is absent, and fail when existing package.json cannot be parsed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully after the HookFailure return fix. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 19 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold and oversized-test baseline OK. Command: bunx prettier --check changed review-fix files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass."
  -
    type: "status"
    at: "2026-05-24T07:53:55.797Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4126 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-24T07:53:55.807Z"
doc_updated_by: "INTEGRATOR"
description: "Fix GitHub issue #4119 by decomposing direct-mode hook publication friction into runtime/script diagnostics and a taskless deploy-fix recovery path that does not require --no-verify."
sections:
  Summary: |-
    Harden direct-mode hook publication recovery

    Fix GitHub issue #4119 by decomposing direct-mode hook publication friction into runtime/script diagnostics and a taskless deploy-fix recovery path that does not require --no-verify.
  Scope: |-
    - In scope: Fix GitHub issue #4119 by decomposing direct-mode hook publication friction into runtime/script diagnostics and a taskless deploy-fix recovery path that does not require --no-verify.
    - Out of scope: unrelated refactors not required for "Harden direct-mode hook publication recovery".
  Plan: "Fix GitHub issue #4119 as one hooks task with four subscopes: (1) keep installed clean-project pre-push fallback script checks capability-based instead of hard-failing on missing optional scripts, (2) align the repository pre-push helper with that behavior where applicable, (3) add a first-class direct-mode deploy-fix evidence bypass for tiny post-deploy publication fixes without requiring --no-verify or an active task, while keeping explicit trailers and diagnostics, and (4) cover task binding, optional script skip, and deploy-fix behavior with focused tests. Verify with task verify-show, focused hook tests, policy routing, and doctor."
  Verify Steps: |-
    1. Inspect changed hook and policy paths. Expected: direct-mode hook recovery covers optional script skip, deploy-fix commit-msg bypass, and pre-push outgoing commit audit without widening unrelated task-bound rules.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.deploy-fix.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: focused hook commit-msg/pre-push suite passes.
    3. Run `bunx prettier --check packages/agentplane/src/policy/model.ts packages/agentplane/src/policy/rules/task-bound-mutation.ts packages/agentplane/src/commands/hooks/run.commit-msg.ts packages/agentplane/src/commands/hooks/run.pre-push.ts scripts/checks/run-pre-push-hook.mjs packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts`. Expected: changed files use Prettier style.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
    5. Run `bun run hotspots:check`. Expected: hotspot thresholds and oversized-test baseline pass.
    6. Run `ap doctor`. Expected: doctor OK; unrelated pre-existing warnings, if any, are recorded in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-24T07:13:34.194Z — VERIFY — ok

    By: CODER

    Note: Command: ap task verify-show 202605240656-1AMYBB; Result: pass; Evidence: task-specific Verify Steps are present and blueprint snapshot is current. Scope: task verification contract. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 38 tests passed. Scope: commit-msg/pre-push hook behavior. Command: bunx prettier --check changed hook/policy/test files; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: gateway policy routing. Command: ap doctor; Result: pass; Evidence: doctor OK with warnings=2 for pre-existing branch_pr reconciliation on 202605230451-N5F0HY. Scope: repo runtime/workflow health.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:12:37.279Z, excerpt_hash=sha256:1dbed407d69e7ca62fd84ce4d976ed5882aaa241cacdabdab5aa1b85b4180fc2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
    - old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

    ### 2026-05-24T07:15:27.134Z — VERIFY — ok

    By: EVALUATOR

    Note: Command: independent review of diff and recorded checks; Result: pass; Evidence: task adds constrained deploy-fix evidence route, optional-script skip parity in repository pre-push helper, and focused hook tests covering acceptance and rejection paths. Scope: quality review for PR #4126 before hosted checks complete.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:13:34.217Z, excerpt_hash=sha256:1dbed407d69e7ca62fd84ce4d976ed5882aaa241cacdabdab5aa1b85b4180fc2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
    - old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

    ### 2026-05-24T07:19:40.525Z — VERIFY — ok

    By: EVALUATOR

    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.deploy-fix.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 38 tests passed. Scope: deploy-fix, commit-msg, and pre-push hook behavior. Command: bun run hotspots:check; Result: pass; Evidence: runtime hotspot threshold and oversized-test baseline OK after splitting deploy-fix tests. Scope: size guard. Command: bunx prettier --check changed hook/policy/test files; Result: pass; Evidence: Prettier accepted changed files. Scope: changed files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: gateway routing. Command: ap doctor; Result: pass; Evidence: doctor OK with pre-existing branch_pr reconciliation warnings unrelated to this task. Scope: runtime/workflow health.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:15:27.168Z, excerpt_hash=sha256:62958fce32671de695a28c23411f9a0a39e9191ac3f1720a3a4bbc7b84186b77

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
    - old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

    ### 2026-05-24T07:37:56.577Z — VERIFY — ok

    By: EVALUATOR

    Note: Command: review-thread fix for PR #4126 discussion_r3294046432; Result: pass; Evidence: MJS and installed TypeScript pre-push paths now return empty scripts only when package.json is absent, and fail when existing package.json cannot be parsed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully after the HookFailure return fix. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 19 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold and oversized-test baseline OK. Command: bunx prettier --check changed review-fix files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:19:40.550Z, excerpt_hash=sha256:62958fce32671de695a28c23411f9a0a39e9191ac3f1720a3a4bbc7b84186b77

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
    - old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - GitHub issue #4119 is a bundle, not one symptom: installed fallback optional-script behavior was already present in current TypeScript hook path, but repository MJS pre-push helper still hard-failed on missing `format:check`/`ci:local:*` scripts.
    - Added a constrained deploy-fix route: subject must be `deploy-fix:` or `🚑 deploy-fix:` and commit body must include `Deploy-Fix: true` plus `Deploy-Fix-Evidence: <evidence>`. This bypasses task binding only for explicitly evidenced deploy fixes; normal mutating commits still require task binding.
    - `ap doctor` passed after framework bootstrap. Residual warnings are pre-existing branch_pr reconciliation warnings for task `202605230451-N5F0HY`, unrelated to this hook fix.

    - Observation: Implemented optional-script skip parity in the repository pre-push helper and added constrained deploy-fix evidence handling across commit-msg and pre-push audits.
      Impact: Direct-mode deploy-only fixes can be published through explicit evidence trailers instead of --no-verify, while normal mutating commits remain task-bound.
      Resolution: Focused hook tests cover deploy-fix acceptance/rejection and missing optional script skips.

    - Observation: No scope drift found beyond GitHub issue #4119 hook recovery surfaces.
      Impact: The bypass is explicit-evidence based and does not disable normal task-bound mutation enforcement.
      Resolution: Proceed to hosted checks and integration once GitHub reports stable green.

    - Observation: Final review includes the hotspot correction that moved deploy-fix commit-msg coverage into a separate focused test file.
      Impact: The PR now satisfies both behavior coverage and repository size gates.
      Resolution: Proceed with PR #4126 hosted checks and integration when stable green.

    - Observation: Addressed the unresolved GitHub review by making malformed package.json a hard pre-push error instead of an optional-script skip.
      Impact: Clean projects without package.json still skip optional project scripts, but broken package metadata can no longer bypass formatting/CI gates.
      Resolution: Push the review fix and resolve the GitHub review thread after remote checks.
id_source: "generated"
---
## Summary

Harden direct-mode hook publication recovery

Fix GitHub issue #4119 by decomposing direct-mode hook publication friction into runtime/script diagnostics and a taskless deploy-fix recovery path that does not require --no-verify.

## Scope

- In scope: Fix GitHub issue #4119 by decomposing direct-mode hook publication friction into runtime/script diagnostics and a taskless deploy-fix recovery path that does not require --no-verify.
- Out of scope: unrelated refactors not required for "Harden direct-mode hook publication recovery".

## Plan

Fix GitHub issue #4119 as one hooks task with four subscopes: (1) keep installed clean-project pre-push fallback script checks capability-based instead of hard-failing on missing optional scripts, (2) align the repository pre-push helper with that behavior where applicable, (3) add a first-class direct-mode deploy-fix evidence bypass for tiny post-deploy publication fixes without requiring --no-verify or an active task, while keeping explicit trailers and diagnostics, and (4) cover task binding, optional script skip, and deploy-fix behavior with focused tests. Verify with task verify-show, focused hook tests, policy routing, and doctor.

## Verify Steps

1. Inspect changed hook and policy paths. Expected: direct-mode hook recovery covers optional script skip, deploy-fix commit-msg bypass, and pre-push outgoing commit audit without widening unrelated task-bound rules.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.deploy-fix.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: focused hook commit-msg/pre-push suite passes.
3. Run `bunx prettier --check packages/agentplane/src/policy/model.ts packages/agentplane/src/policy/rules/task-bound-mutation.ts packages/agentplane/src/commands/hooks/run.commit-msg.ts packages/agentplane/src/commands/hooks/run.pre-push.ts scripts/checks/run-pre-push-hook.mjs packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts`. Expected: changed files use Prettier style.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
5. Run `bun run hotspots:check`. Expected: hotspot thresholds and oversized-test baseline pass.
6. Run `ap doctor`. Expected: doctor OK; unrelated pre-existing warnings, if any, are recorded in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-24T07:13:34.194Z — VERIFY — ok

By: CODER

Note: Command: ap task verify-show 202605240656-1AMYBB; Result: pass; Evidence: task-specific Verify Steps are present and blueprint snapshot is current. Scope: task verification contract. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 38 tests passed. Scope: commit-msg/pre-push hook behavior. Command: bunx prettier --check changed hook/policy/test files; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: gateway policy routing. Command: ap doctor; Result: pass; Evidence: doctor OK with warnings=2 for pre-existing branch_pr reconciliation on 202605230451-N5F0HY. Scope: repo runtime/workflow health.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:12:37.279Z, excerpt_hash=sha256:1dbed407d69e7ca62fd84ce4d976ed5882aaa241cacdabdab5aa1b85b4180fc2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
- old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

### 2026-05-24T07:15:27.134Z — VERIFY — ok

By: EVALUATOR

Note: Command: independent review of diff and recorded checks; Result: pass; Evidence: task adds constrained deploy-fix evidence route, optional-script skip parity in repository pre-push helper, and focused hook tests covering acceptance and rejection paths. Scope: quality review for PR #4126 before hosted checks complete.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:13:34.217Z, excerpt_hash=sha256:1dbed407d69e7ca62fd84ce4d976ed5882aaa241cacdabdab5aa1b85b4180fc2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
- old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

### 2026-05-24T07:19:40.525Z — VERIFY — ok

By: EVALUATOR

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.deploy-fix.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 38 tests passed. Scope: deploy-fix, commit-msg, and pre-push hook behavior. Command: bun run hotspots:check; Result: pass; Evidence: runtime hotspot threshold and oversized-test baseline OK after splitting deploy-fix tests. Scope: size guard. Command: bunx prettier --check changed hook/policy/test files; Result: pass; Evidence: Prettier accepted changed files. Scope: changed files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: gateway routing. Command: ap doctor; Result: pass; Evidence: doctor OK with pre-existing branch_pr reconciliation warnings unrelated to this task. Scope: runtime/workflow health.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:15:27.168Z, excerpt_hash=sha256:62958fce32671de695a28c23411f9a0a39e9191ac3f1720a3a4bbc7b84186b77

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
- old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

### 2026-05-24T07:37:56.577Z — VERIFY — ok

By: EVALUATOR

Note: Command: review-thread fix for PR #4126 discussion_r3294046432; Result: pass; Evidence: MJS and installed TypeScript pre-push paths now return empty scripts only when package.json is absent, and fail when existing package.json cannot be parsed. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane bundle built successfully after the HookFailure return fix. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files passed, 19 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold and oversized-test baseline OK. Command: bunx prettier --check changed review-fix files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:19:40.550Z, excerpt_hash=sha256:62958fce32671de695a28c23411f9a0a39e9191ac3f1720a3a4bbc7b84186b77

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240656-1AMYBB-harden-direct-mode-hook-publication-recovery/.agentplane/tasks/202605240656-1AMYBB/blueprint/resolved-snapshot.json
- old_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- current_digest: b94ccc0208f562da4f824498cc3ab72784931a02110aab41c47be73a98201c0f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240656-1AMYBB

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- GitHub issue #4119 is a bundle, not one symptom: installed fallback optional-script behavior was already present in current TypeScript hook path, but repository MJS pre-push helper still hard-failed on missing `format:check`/`ci:local:*` scripts.
- Added a constrained deploy-fix route: subject must be `deploy-fix:` or `🚑 deploy-fix:` and commit body must include `Deploy-Fix: true` plus `Deploy-Fix-Evidence: <evidence>`. This bypasses task binding only for explicitly evidenced deploy fixes; normal mutating commits still require task binding.
- `ap doctor` passed after framework bootstrap. Residual warnings are pre-existing branch_pr reconciliation warnings for task `202605230451-N5F0HY`, unrelated to this hook fix.

- Observation: Implemented optional-script skip parity in the repository pre-push helper and added constrained deploy-fix evidence handling across commit-msg and pre-push audits.
  Impact: Direct-mode deploy-only fixes can be published through explicit evidence trailers instead of --no-verify, while normal mutating commits remain task-bound.
  Resolution: Focused hook tests cover deploy-fix acceptance/rejection and missing optional script skips.

- Observation: No scope drift found beyond GitHub issue #4119 hook recovery surfaces.
  Impact: The bypass is explicit-evidence based and does not disable normal task-bound mutation enforcement.
  Resolution: Proceed to hosted checks and integration once GitHub reports stable green.

- Observation: Final review includes the hotspot correction that moved deploy-fix commit-msg coverage into a separate focused test file.
  Impact: The PR now satisfies both behavior coverage and repository size gates.
  Resolution: Proceed with PR #4126 hosted checks and integration when stable green.

- Observation: Addressed the unresolved GitHub review by making malformed package.json a hard pre-push error instead of an optional-script skip.
  Impact: Clean projects without package.json still skip optional project scripts, but broken package metadata can no longer bypass formatting/CI gates.
  Resolution: Push the review fix and resolve the GitHub review thread after remote checks.
