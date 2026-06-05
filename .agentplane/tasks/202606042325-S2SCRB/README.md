---
id: "202606042325-S2SCRB"
title: "Prepare v0.6.17 release candidate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "publish"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T23:25:36.498Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T01:27:28.533Z"
  updated_by: "REVIEWER"
  note: "Release PR cleanup fix verification passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T01:32:37.694Z"
  updated_by: "EVALUATOR"
  note: "v0.6.17 release candidate is ready after follow-up cleanup."
  evaluated_sha: "451a96881f3504f45485fe5132f0915b9ec86dc7"
  blueprint_digest: "d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096"
  evidence_refs:
    - ".agentplane/tasks/202606042325-S2SCRB/README.md"
    - ".agentplane/tasks/202606042325-S2SCRB/quality/20260605-013237694-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606042325-S2SCRB/quality/20260605-013237694-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606042325-S2SCRB/quality/20260605-013237694-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606042325-S2SCRB/blueprint/resolved-snapshot.json"
    - ".agentplane/.release/apply/2026-06-05T00-14-24-165Z.json"
  findings:
    - "Release branch includes cognitive-load refactors, lifecycle doctor cleanup, hosted cleanup hardening, clean agentplane doctor, local release:prepublish:heavy after rebase, and hosted PR checks all succeeded on PR #4448."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: prepare v0.6.17 release candidate from checked main head 693430900."
events:
  -
    type: "status"
    at: "2026-06-04T23:25:48.488Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.17 release candidate from checked main head 693430900."
  -
    type: "verify"
    at: "2026-06-05T00:53:38.335Z"
    author: "REVIEWER"
    state: "ok"
    note: "Release candidate verification passed."
  -
    type: "verify"
    at: "2026-06-05T01:19:46.383Z"
    author: "REVIEWER"
    state: "ok"
    note: "Post-rebase release candidate verification passed."
  -
    type: "verify"
    at: "2026-06-05T01:27:28.533Z"
    author: "REVIEWER"
    state: "ok"
    note: "Release PR cleanup fix verification passed."
doc_version: 3
doc_updated_at: "2026-06-05T01:27:28.624Z"
doc_updated_by: "CODER"
description: "Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete."
sections:
  Summary: |-
    Prepare v0.6.17 release candidate

    Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.
  Scope: |-
    - In scope: Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.17 release candidate".
  Plan: "Prepare v0.6.17 patch release candidate from the checked main head after all refactor, release notes, and social asset tasks are DONE. Use a dedicated branch_pr worktree, run release candidate --push --yes, merge the candidate PR after required checks, then publish v0.6.17 from the exact release commit SHA and verify GitHub Release plus npm package versions."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prepare v0.6.17 release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prepare v0.6.17 release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T00:53:38.335Z — VERIFY — ok

    By: REVIEWER

    Note: Release candidate verification passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:25:48.488Z, excerpt_hash=sha256:00205f6af9b6b46dfc0f0e3e2aa7cde795664a36282ed1c4f1df2a26c7059ff0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042325-S2SCRB/blueprint/resolved-snapshot.json
    - old_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
    - current_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042325-S2SCRB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606042325-S2SCRB
    - diagnostic_command: agentplane pr check 202606042325-S2SCRB
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-05T01:19:46.383Z — VERIFY — ok

    By: REVIEWER

    Note: Post-rebase release candidate verification passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:53:38.426Z, excerpt_hash=sha256:00205f6af9b6b46dfc0f0e3e2aa7cde795664a36282ed1c4f1df2a26c7059ff0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042325-S2SCRB/blueprint/resolved-snapshot.json
    - old_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
    - current_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042325-S2SCRB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606042325-S2SCRB
    - diagnostic_command: agentplane pr check 202606042325-S2SCRB
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-05T01:27:28.533Z — VERIFY — ok

    By: REVIEWER

    Note: Release PR cleanup fix verification passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T01:19:46.482Z, excerpt_hash=sha256:00205f6af9b6b46dfc0f0e3e2aa7cde795664a36282ed1c4f1df2a26c7059ff0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042325-S2SCRB/blueprint/resolved-snapshot.json
    - old_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
    - current_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042325-S2SCRB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606042325-S2SCRB
    - diagnostic_command: agentplane pr check 202606042325-S2SCRB
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Ran PATH=/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/pkg/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg00SZcNn:/Users/densmirnov/.antigravity/antigravity/bin:/Users/densmirnov/Downloads/google-cloud-sdk/bin:/Users/densmirnov/.cargo/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/bin:/opt/homebrew/opt/rustup/bin:/Users/densmirnov/.codeium/windsurf/bin:/Users/densmirnov/.orbstack/bin:/opt/homebrew/opt/python@3.12/libexec/bin:/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.foundry/bin:/Applications/Obsidian.app/Contents/MacOS:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS NODE_OPTIONS=--max-old-space-size=4096 bun run release:prepublish:heavy; all release prepublish checks passed including policy routing, schemas, examples, tests, coverage, architecture, knip baseline, build, package tarball, install smoke, CLI docs, recipes docs, release-ci-base, workflow coverage, significant coverage, and release-critical checks.
      Impact: v0.6.17 candidate is locally verified before PR publication.
      Resolution: Proceed with PR publication and hosted verification.

    - Observation: After rebasing the v0.6.17 release branch onto origin/main with lifecycle doctor cleanup, ran PATH=/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/pkg/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg00SZcNn:/Users/densmirnov/.antigravity/antigravity/bin:/Users/densmirnov/Downloads/google-cloud-sdk/bin:/Users/densmirnov/.cargo/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/bin:/opt/homebrew/opt/rustup/bin:/Users/densmirnov/.codeium/windsurf/bin:/Users/densmirnov/.orbstack/bin:/opt/homebrew/opt/python@3.12/libexec/bin:/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.foundry/bin:/Applications/Obsidian.app/Contents/MacOS:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS NODE_OPTIONS=--max-old-space-size=4096 bun run release:prepublish:heavy; all checks passed, including release-ci-base 69/69, workflow coverage, significant coverage, and release-critical 4 files / 16 tests.
      Impact: v0.6.17 release candidate includes all completed follow-up cleanup and remains release-ready.
      Resolution: Proceed with PR publication and hosted verification.

    - Observation: After hosted verify-unit exposed ENOTEMPTY cleanup race, added task 202606050125-P0DKWY and hardened release-critical-lifecycle.test.ts cleanup. Verification: bun test packages/agentplane/src/cli/release-critical-lifecycle.test.ts; bun run test:release:critical; prettier check for the changed test file.
      Impact: Release PR should no longer fail hosted verify-unit on transient temp git cleanup race.
      Resolution: Push updated release PR and rerun hosted checks.
id_source: "generated"
---
## Summary

Prepare v0.6.17 release candidate

Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.

## Scope

- In scope: Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.
- Out of scope: unrelated refactors not required for "Prepare v0.6.17 release candidate".

## Plan

Prepare v0.6.17 patch release candidate from the checked main head after all refactor, release notes, and social asset tasks are DONE. Use a dedicated branch_pr worktree, run release candidate --push --yes, merge the candidate PR after required checks, then publish v0.6.17 from the exact release commit SHA and verify GitHub Release plus npm package versions.

## Verify Steps

PLANNER fallback scaffold for "Prepare v0.6.17 release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prepare v0.6.17 release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T00:53:38.335Z — VERIFY — ok

By: REVIEWER

Note: Release candidate verification passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:25:48.488Z, excerpt_hash=sha256:00205f6af9b6b46dfc0f0e3e2aa7cde795664a36282ed1c4f1df2a26c7059ff0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042325-S2SCRB/blueprint/resolved-snapshot.json
- old_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
- current_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042325-S2SCRB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606042325-S2SCRB
- diagnostic_command: agentplane pr check 202606042325-S2SCRB
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- runner_required: false
- runner_failure_means: not_runner_route
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-05T01:19:46.383Z — VERIFY — ok

By: REVIEWER

Note: Post-rebase release candidate verification passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:53:38.426Z, excerpt_hash=sha256:00205f6af9b6b46dfc0f0e3e2aa7cde795664a36282ed1c4f1df2a26c7059ff0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042325-S2SCRB/blueprint/resolved-snapshot.json
- old_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
- current_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042325-S2SCRB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606042325-S2SCRB
- diagnostic_command: agentplane pr check 202606042325-S2SCRB
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- runner_required: false
- runner_failure_means: not_runner_route
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-05T01:27:28.533Z — VERIFY — ok

By: REVIEWER

Note: Release PR cleanup fix verification passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T01:19:46.482Z, excerpt_hash=sha256:00205f6af9b6b46dfc0f0e3e2aa7cde795664a36282ed1c4f1df2a26c7059ff0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042325-S2SCRB/blueprint/resolved-snapshot.json
- old_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
- current_digest: d514867b8334264b56c485de82f91407673273aef57fd645a0bf86f75c815096
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042325-S2SCRB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606042325-S2SCRB
- diagnostic_command: agentplane pr check 202606042325-S2SCRB
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- runner_required: false
- runner_failure_means: not_runner_route
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Ran PATH=/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/pkg/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg00SZcNn:/Users/densmirnov/.antigravity/antigravity/bin:/Users/densmirnov/Downloads/google-cloud-sdk/bin:/Users/densmirnov/.cargo/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/bin:/opt/homebrew/opt/rustup/bin:/Users/densmirnov/.codeium/windsurf/bin:/Users/densmirnov/.orbstack/bin:/opt/homebrew/opt/python@3.12/libexec/bin:/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.foundry/bin:/Applications/Obsidian.app/Contents/MacOS:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS NODE_OPTIONS=--max-old-space-size=4096 bun run release:prepublish:heavy; all release prepublish checks passed including policy routing, schemas, examples, tests, coverage, architecture, knip baseline, build, package tarball, install smoke, CLI docs, recipes docs, release-ci-base, workflow coverage, significant coverage, and release-critical checks.
  Impact: v0.6.17 candidate is locally verified before PR publication.
  Resolution: Proceed with PR publication and hosted verification.

- Observation: After rebasing the v0.6.17 release branch onto origin/main with lifecycle doctor cleanup, ran PATH=/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/pkg/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg00SZcNn:/Users/densmirnov/.antigravity/antigravity/bin:/Users/densmirnov/Downloads/google-cloud-sdk/bin:/Users/densmirnov/.cargo/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/bin:/opt/homebrew/opt/rustup/bin:/Users/densmirnov/.codeium/windsurf/bin:/Users/densmirnov/.orbstack/bin:/opt/homebrew/opt/python@3.12/libexec/bin:/Users/densmirnov/.nvm/versions/node/v24.11.1/bin:/Users/densmirnov/.foundry/bin:/Applications/Obsidian.app/Contents/MacOS:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS NODE_OPTIONS=--max-old-space-size=4096 bun run release:prepublish:heavy; all checks passed, including release-ci-base 69/69, workflow coverage, significant coverage, and release-critical 4 files / 16 tests.
  Impact: v0.6.17 release candidate includes all completed follow-up cleanup and remains release-ready.
  Resolution: Proceed with PR publication and hosted verification.

- Observation: After hosted verify-unit exposed ENOTEMPTY cleanup race, added task 202606050125-P0DKWY and hardened release-critical-lifecycle.test.ts cleanup. Verification: bun test packages/agentplane/src/cli/release-critical-lifecycle.test.ts; bun run test:release:critical; prettier check for the changed test file.
  Impact: Release PR should no longer fail hosted verify-unit on transient temp git cleanup race.
  Resolution: Push updated release PR and rerun hosted checks.
