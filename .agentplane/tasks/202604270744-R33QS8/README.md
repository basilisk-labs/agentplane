---
id: "202604270744-R33QS8"
title: "Switch workflow to branch_pr and audit task lifecycle"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T07:44:51.351Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T07:55:47.541Z"
  updated_by: "CODER"
  note: "Command: agentplane config show | rg '\"workflow_mode\"|branch_pr'; Result: pass; Evidence: workflow_mode is branch_pr. Scope: config switch. Command: agentplane branch base get; Result: pass; Evidence: base resolves to main. Scope: branch_pr route. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun x eslint packages/core/src/git/git-client.ts packages/agentplane/src/commands/task/hosted-merge-sync/local-branch.ts; Result: pass. Scope: touched code. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts; Result: pass; Evidence: 25 pass, 0 fail. Scope: doctor/runtime diagnostics. Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 info=8. Scope: branch_pr lifecycle diagnostic path. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: switch workflow_mode from direct to branch_pr through the CLI, then inspect lifecycle implementation surfaces for concrete error-reduction opportunities without widening into code refactors."
events:
  -
    type: "status"
    at: "2026-04-27T07:44:59.089Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch workflow_mode from direct to branch_pr through the CLI, then inspect lifecycle implementation surfaces for concrete error-reduction opportunities without widening into code refactors."
  -
    type: "verify"
    at: "2026-04-27T07:55:47.541Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane config show | rg '\"workflow_mode\"|branch_pr'; Result: pass; Evidence: workflow_mode is branch_pr. Scope: config switch. Command: agentplane branch base get; Result: pass; Evidence: base resolves to main. Scope: branch_pr route. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun x eslint packages/core/src/git/git-client.ts packages/agentplane/src/commands/task/hosted-merge-sync/local-branch.ts; Result: pass. Scope: touched code. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts; Result: pass; Evidence: 25 pass, 0 fail. Scope: doctor/runtime diagnostics. Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 info=8. Scope: branch_pr lifecycle diagnostic path. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace."
doc_version: 3
doc_updated_at: "2026-04-27T07:55:47.547Z"
doc_updated_by: "CODER"
description: "Switch repository workflow_mode from direct to branch_pr, then analyze task lifecycle code paths for optimization opportunities that reduce potential errors."
sections:
  Summary: |-
    Switch workflow to branch_pr and audit task lifecycle
    
    Switch repository workflow_mode from direct to branch_pr, then analyze task lifecycle code paths for optimization opportunities that reduce potential errors.
  Scope: |-
    - In scope: Switch repository workflow_mode from direct to branch_pr, then analyze task lifecycle code paths for optimization opportunities that reduce potential errors.
    - Out of scope: unrelated refactors not required for "Switch workflow to branch_pr and audit task lifecycle".
  Plan: "1. Confirm preflight state and loaded direct-mode mutation policy. 2. Switch workflow_mode from direct to branch_pr using agentplane config set. 3. Re-run config/quickstart and load branch_pr policy. 4. Inspect task lifecycle implementation surfaces for error-prone paths in task creation, work start, PR artifacts, verification, integrate, and finish. 5. Record verification evidence and close with the resulting config commit."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T07:55:47.541Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane config show | rg '"workflow_mode"|branch_pr'; Result: pass; Evidence: workflow_mode is branch_pr. Scope: config switch. Command: agentplane branch base get; Result: pass; Evidence: base resolves to main. Scope: branch_pr route. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun x eslint packages/core/src/git/git-client.ts packages/agentplane/src/commands/task/hosted-merge-sync/local-branch.ts; Result: pass. Scope: touched code. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts; Result: pass; Evidence: 25 pass, 0 fail. Scope: doctor/runtime diagnostics. Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 info=8. Scope: branch_pr lifecycle diagnostic path. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T07:55:25.627Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Facts:
    - workflow_mode switched to branch_pr via agentplane config set; generated workflow artifacts now also say branch_pr.
    - branch base resolves to main.
    - framework dev bootstrap passed after sourcing ~/.zshrc and adding /Users/densmirnov/.bun/bin to PATH.
    - Initial branch_pr doctor run exposed a concrete lifecycle diagnostic failure: historical task 202604090933-SXRWRM referenced commit fc5b0829cbc3308f80bdee3938d64354cbc6683c, which is not present as a local commit object.
    - Implemented a narrow hardening fix: hosted branch_pr local-sync checks now use commit-object existence before merge-base, and shared gitIsAncestor treats missing commit objects as false instead of surfacing an internal error.
    
    Optimization candidates to reduce lifecycle errors:
    1. Centralize branch_pr lifecycle context resolution across work start, pr open/update, verify, integrate, and finish. Today base branch, task branch, worktree path, PR dir, head_sha, and freshness are resolved in several command-local paths. A single typed resolver would reduce mismatched assumptions and make invalid route errors uniform.
    2. Make pr open less partial. cmdPrOpen currently does local sync/auto-commit, then push, then remote-aware sync. A failed push or remote step can leave fresh-looking local PR artifacts without a remote PR. Prefer a planned transaction shape: resolve -> push/link remote -> write final artifacts once, or persist an explicit staged/failed remote state.
    3. Keep integrate validation side-effect-light by default. prepareIntegrate can auto-run ensurePrArtifactsSynced when review freshness is stale and a worktree exists. That repair is useful, but hidden mutation during integrate validation makes failure recovery harder. Prefer explicit pr update guidance, with a --repair-artifacts option for the current behavior.
    4. Add lifecycle invariant tests for missing/pruned commit metadata in branch_pr state reconciliation. The live failure came from historical task metadata that looked syntactically valid but had no local commit object.
    
    Weakest link:
    - The largest remaining error source is branch_pr state reconciliation across task README, pr/meta.json, branch refs, and hosted GitHub state. The code already has many guards, but the guards are distributed; centralizing route/freshness invariants would reduce future edge-case divergence.
id_source: "generated"
---
## Summary

Switch workflow to branch_pr and audit task lifecycle

Switch repository workflow_mode from direct to branch_pr, then analyze task lifecycle code paths for optimization opportunities that reduce potential errors.

## Scope

- In scope: Switch repository workflow_mode from direct to branch_pr, then analyze task lifecycle code paths for optimization opportunities that reduce potential errors.
- Out of scope: unrelated refactors not required for "Switch workflow to branch_pr and audit task lifecycle".

## Plan

1. Confirm preflight state and loaded direct-mode mutation policy. 2. Switch workflow_mode from direct to branch_pr using agentplane config set. 3. Re-run config/quickstart and load branch_pr policy. 4. Inspect task lifecycle implementation surfaces for error-prone paths in task creation, work start, PR artifacts, verification, integrate, and finish. 5. Record verification evidence and close with the resulting config commit.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T07:55:47.541Z — VERIFY — ok

By: CODER

Note: Command: agentplane config show | rg '"workflow_mode"|branch_pr'; Result: pass; Evidence: workflow_mode is branch_pr. Scope: config switch. Command: agentplane branch base get; Result: pass; Evidence: base resolves to main. Scope: branch_pr route. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun x eslint packages/core/src/git/git-client.ts packages/agentplane/src/commands/task/hosted-merge-sync/local-branch.ts; Result: pass. Scope: touched code. Command: PATH=/Users/densmirnov/.bun/bin:/Users/densmirnov/.local/share/solana/install/active_release/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/pkg/env/active/bin:/opt/pmk/env/global/bin:/Library/Apple/usr/bin:/Library/TeX/texbin:/Users/densmirnov/.codex/tmp/arg0/codex-arg0zEDApF:/Applications/Codex.app/Contents/Resources:/Users/densmirnov/.foundry/bin:/Users/densmirnov/.orbstack/bin:/Applications/Obsidian.app/Contents/MacOS bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts; Result: pass; Evidence: 25 pass, 0 fail. Scope: doctor/runtime diagnostics. Command: agentplane doctor; Result: pass; Evidence: errors=0 warnings=0 info=8. Scope: branch_pr lifecycle diagnostic path. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T07:55:25.627Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Facts:
- workflow_mode switched to branch_pr via agentplane config set; generated workflow artifacts now also say branch_pr.
- branch base resolves to main.
- framework dev bootstrap passed after sourcing ~/.zshrc and adding /Users/densmirnov/.bun/bin to PATH.
- Initial branch_pr doctor run exposed a concrete lifecycle diagnostic failure: historical task 202604090933-SXRWRM referenced commit fc5b0829cbc3308f80bdee3938d64354cbc6683c, which is not present as a local commit object.
- Implemented a narrow hardening fix: hosted branch_pr local-sync checks now use commit-object existence before merge-base, and shared gitIsAncestor treats missing commit objects as false instead of surfacing an internal error.

Optimization candidates to reduce lifecycle errors:
1. Centralize branch_pr lifecycle context resolution across work start, pr open/update, verify, integrate, and finish. Today base branch, task branch, worktree path, PR dir, head_sha, and freshness are resolved in several command-local paths. A single typed resolver would reduce mismatched assumptions and make invalid route errors uniform.
2. Make pr open less partial. cmdPrOpen currently does local sync/auto-commit, then push, then remote-aware sync. A failed push or remote step can leave fresh-looking local PR artifacts without a remote PR. Prefer a planned transaction shape: resolve -> push/link remote -> write final artifacts once, or persist an explicit staged/failed remote state.
3. Keep integrate validation side-effect-light by default. prepareIntegrate can auto-run ensurePrArtifactsSynced when review freshness is stale and a worktree exists. That repair is useful, but hidden mutation during integrate validation makes failure recovery harder. Prefer explicit pr update guidance, with a --repair-artifacts option for the current behavior.
4. Add lifecycle invariant tests for missing/pruned commit metadata in branch_pr state reconciliation. The live failure came from historical task metadata that looked syntactically valid but had no local commit object.

Weakest link:
- The largest remaining error source is branch_pr state reconciliation across task README, pr/meta.json, branch refs, and hosted GitHub state. The code already has many guards, but the guards are distributed; centralizing route/freshness invariants would reduce future edge-case divergence.
