---
id: "202604241136-RTDFZS"
title: "v0.3 freeze B2: remove init v1 orchestrator and make one init path"
result_summary: "B2 complete: init now has a single orchestrator and shared apply path; compatibility aliases remain for --interactive-ui/--experimental-ui."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604241136-ESEK2A"
tags:
  - "cli"
  - "init"
  - "v0.3"
verify:
  - "bun run test -- packages/agentplane/src/cli/run-cli/commands/init"
  - "rg -n 'V2|v2|-v2|orchestrate-v2' packages/agentplane/src/cli/run-cli/commands/init"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T12:11:34.811Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved continuation of v0.3 freeze graph; B2 scope is unified init path with --yes/non-TTY compatibility preserved."
verification:
  state: "ok"
  updated_at: "2026-04-24T12:37:54.877Z"
  updated_by: "CODER"
  note: "B2 unified init path verified: v2/router naming removed, readline init production usage removed, init command unit tests and cli-core init integration tests pass, typecheck/format/diff checks pass, framework bootstrap and doctor pass."
commit:
  hash: "174837465c087c8f7bfa26365ae9be3cdb271be4"
  message: "✨ RTDFZS task: unify init orchestration"
comments:
  -
    author: "CODER"
    body: "Start: Unify init around one command path while preserving --yes, non-TTY, plain prompt mode, force/backup, and init mutation semantics."
  -
    author: "CODER"
    body: "Verified: unified init orchestration around one Clack/non-interactive apply path; removed v2-named files and AGENTPLANE_INIT_UI routing; preserved --yes/plain/non-TTY setup-profile behavior."
events:
  -
    type: "status"
    at: "2026-04-24T12:11:39.211Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Unify init around one command path while preserving --yes, non-TTY, plain prompt mode, force/backup, and init mutation semantics."
  -
    type: "verify"
    at: "2026-04-24T12:37:54.877Z"
    author: "CODER"
    state: "ok"
    note: "B2 unified init path verified: v2/router naming removed, readline init production usage removed, init command unit tests and cli-core init integration tests pass, typecheck/format/diff checks pass, framework bootstrap and doctor pass."
  -
    type: "status"
    at: "2026-04-24T12:38:34.036Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: unified init orchestration around one Clack/non-interactive apply path; removed v2-named files and AGENTPLANE_INIT_UI routing; preserved --yes/plain/non-TTY setup-profile behavior."
doc_version: 3
doc_updated_at: "2026-04-24T12:38:34.037Z"
doc_updated_by: "CODER"
description: "Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags."
sections:
  Summary: |-
    v0.3 freeze B2: remove init v1 orchestrator and make one init path
    
    Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.
  Scope: |-
    - In scope: Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.
    - Out of scope: unrelated refactors not required for "v0.3 freeze B2: remove init v1 orchestrator and make one init path".
  Plan: |-
    1. Preserve the init public contract: --yes, non-TTY, AGENTPLANE_PROMPTS=plain, --force/--backup, --gitignore-agents, setup profiles, cached recipe validation, and init commit behavior.
    2. Replace the router split with one cmdInit implementation: interactive TTY path uses v2 Clack steps; non-interactive/plain/--yes path synthesizes the same answer model without readline prompts.
    3. Extract shared init apply/mutation logic so interactive and non-interactive routes write config, agents, workflow, gitignore, hooks, IDE sync, recipes, and install commit through one code path.
    4. Remove obsolete v1 prompt wrappers and env router semantics that exist only to choose between v1/v2; keep compatibility flags only if tests/public contract still require them for this atom.
    5. Update focused init tests around v2/default/non-TTY expectations and run init-focused verification.
  Verify Steps: |-
    1. Run `rg -n 'V2|v2|-v2|orchestrate-v2|cmdInitV2|AGENTPLANE_INIT_UI' packages/agentplane/src/cli/run-cli packages/agentplane/src/cli/run-cli.core.init*.test.ts`. Expected: no v2/router naming remains after the unified init path lands.
    2. Run `rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts'`. Expected: no init production usage remains; only temporary compatibility aliases in `cli/prompts.ts` and recipe overlay variable false positives may remain before B3.
    3. Run init command unit tests: `bun run test -- packages/agentplane/src/cli/run-cli/commands/init`. Expected: pass.
    4. Run CLI init integration tests: `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts packages/agentplane/src/cli/run-cli.core.init.interactive.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts`. Expected: pass.
    5. Run `bun run typecheck`. Expected: pass.
    6. Run `git diff --check && bun run format:check`. Expected: pass.
    7. If watched runtime drift is reported by agentplane commands, run `bun run framework:dev:bootstrap` and record it.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T12:37:54.877Z — VERIFY — ok
    
    By: CODER
    
    Note: B2 unified init path verified: v2/router naming removed, readline init production usage removed, init command unit tests and cli-core init integration tests pass, typecheck/format/diff checks pass, framework bootstrap and doctor pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:37:15.280Z, excerpt_hash=sha256:e8273932722040ba6a92aee2cbdd3aef49f3977903b17d70865450341c6e865b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Unified orchestrator now uses one answer/apply flow for Clack, --yes, plain prompt mode, and non-TTY setup profiles.
      Impact: Removes duplicated init v1/v2 mutation paths while preserving setup-profile non-TTY behavior and compatibility aliases.
      Resolution: Kept --interactive-ui/--experimental-ui as compatibility aliases for this v0.3 atom; removed AGENTPLANE_INIT_UI router semantics and v2-named files/types.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

v0.3 freeze B2: remove init v1 orchestrator and make one init path

Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.

## Scope

- In scope: Collapse init v1/v2 into a single orchestrator, preserve non-TTY preset behavior, and remove obsolete interactive-ui and experimental-ui flags.
- Out of scope: unrelated refactors not required for "v0.3 freeze B2: remove init v1 orchestrator and make one init path".

## Plan

1. Preserve the init public contract: --yes, non-TTY, AGENTPLANE_PROMPTS=plain, --force/--backup, --gitignore-agents, setup profiles, cached recipe validation, and init commit behavior.
2. Replace the router split with one cmdInit implementation: interactive TTY path uses v2 Clack steps; non-interactive/plain/--yes path synthesizes the same answer model without readline prompts.
3. Extract shared init apply/mutation logic so interactive and non-interactive routes write config, agents, workflow, gitignore, hooks, IDE sync, recipes, and install commit through one code path.
4. Remove obsolete v1 prompt wrappers and env router semantics that exist only to choose between v1/v2; keep compatibility flags only if tests/public contract still require them for this atom.
5. Update focused init tests around v2/default/non-TTY expectations and run init-focused verification.

## Verify Steps

1. Run `rg -n 'V2|v2|-v2|orchestrate-v2|cmdInitV2|AGENTPLANE_INIT_UI' packages/agentplane/src/cli/run-cli packages/agentplane/src/cli/run-cli.core.init*.test.ts`. Expected: no v2/router naming remains after the unified init path lands.
2. Run `rg -n 'promptChoice|promptYesNo|promptInput' packages/agentplane/src --glob '!*.test.ts'`. Expected: no init production usage remains; only temporary compatibility aliases in `cli/prompts.ts` and recipe overlay variable false positives may remain before B3.
3. Run init command unit tests: `bun run test -- packages/agentplane/src/cli/run-cli/commands/init`. Expected: pass.
4. Run CLI init integration tests: `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts packages/agentplane/src/cli/run-cli.core.init.interactive.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts`. Expected: pass.
5. Run `bun run typecheck`. Expected: pass.
6. Run `git diff --check && bun run format:check`. Expected: pass.
7. If watched runtime drift is reported by agentplane commands, run `bun run framework:dev:bootstrap` and record it.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T12:37:54.877Z — VERIFY — ok

By: CODER

Note: B2 unified init path verified: v2/router naming removed, readline init production usage removed, init command unit tests and cli-core init integration tests pass, typecheck/format/diff checks pass, framework bootstrap and doctor pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:37:15.280Z, excerpt_hash=sha256:e8273932722040ba6a92aee2cbdd3aef49f3977903b17d70865450341c6e865b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Unified orchestrator now uses one answer/apply flow for Clack, --yes, plain prompt mode, and non-TTY setup profiles.
  Impact: Removes duplicated init v1/v2 mutation paths while preserving setup-profile non-TTY behavior and compatibility aliases.
  Resolution: Kept --interactive-ui/--experimental-ui as compatibility aliases for this v0.3 atom; removed AGENTPLANE_INIT_UI router semantics and v2-named files/types.
  Promotion: incident-candidate
  Fixability: external
