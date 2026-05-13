---
id: "202605131649-61129E"
title: "Align public CLI docs with user command surface"
result_summary: "Merged via PR #3646."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "agentplane doctor"
  - "bun run docs:cli:check"
  - "bun run docs:ia:check"
  - "bun run docs:onboarding:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:50:12.353Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T19:03:07.583Z"
  updated_by: "CODER"
  note: "Addressed PR review comment r3236216569: group-only CLI docs filtering now treats optional single-token dispatch args named cmd/command/subcommand as group dispatchers, not only variadic dispatchers. Rebuilt generated CLI reference and confirmed task doc/task verify wrappers are absent while task run remains."
  attempts: 0
commit:
  hash: "f05ad5aa98a07557dcec0bed0790b4dae335fc0d"
  message: "Merge pull request #3646 from basilisk-labs/task/202605131649-61129E/public-cli-docs-surface"
comments:
  -
    author: "CODER"
    body: "Start: align public CLI documentation with the actual user command surface, keeping developer-only and advanced commands out of the main public flow while preserving generated reference accuracy."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3646 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T16:51:36.933Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align public CLI documentation with the actual user command surface, keeping developer-only and advanced commands out of the main public flow while preserving generated reference accuracy."
  -
    type: "verify"
    at: "2026-05-13T17:17:04.604Z"
    author: "CODER"
    state: "ok"
    note: "Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface."
  -
    type: "verify"
    at: "2026-05-13T17:36:44.786Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after rebasing onto origin/main: package build, docs generation, docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, docs:site:typecheck, and targeted docs-cli test with extended timeout passed. Public generated reference still excludes group roots and advanced/internal command groups."
  -
    type: "verify"
    at: "2026-05-13T18:30:29.868Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after rebasing onto current origin/main 707ddf167: package build, docs regeneration, docs:cli:check, docs:onboarding:check, docs:ia:check, lint:core, agentplane doctor, and targeted docs-cli test passed. Generated public CLI reference contains real user/action commands only and excludes group roots plus advanced/internal groups."
  -
    type: "verify"
    at: "2026-05-13T19:03:07.583Z"
    author: "CODER"
    state: "ok"
    note: "Addressed PR review comment r3236216569: group-only CLI docs filtering now treats optional single-token dispatch args named cmd/command/subcommand as group dispatchers, not only variadic dispatchers. Rebuilt generated CLI reference and confirmed task doc/task verify wrappers are absent while task run remains."
  -
    type: "status"
    at: "2026-05-13T19:05:25.109Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3646 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T19:05:25.109Z"
doc_updated_by: "INTEGRATOR"
description: "Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands."
sections:
  Summary: |-
    Align public CLI docs with user command surface
    
    Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.
  Scope: |-
    - In scope: Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.
    - Out of scope: unrelated refactors not required for "Align public CLI docs with user command surface".
  Plan: |-
    1. Inspect CLI docs generator, website docs navigation, and command catalog surface metadata.
    2. Update generated CLI reference filtering so default public reference excludes group-only command roots while preserving actionable subcommands.
    3. Replace stale public examples: use cleanup merged/finalize instead of nonexistent work end, remove context status/list, and route dev/advanced/internal commands into explicit hidden/maintenance guidance.
    4. Regenerate generated docs and run focused docs/CLI verification plus routing and doctor.
  Verify Steps: |-
    1. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:onboarding:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T17:17:04.604Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:51:36.933Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
    - old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - current_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131649-61129E
    
    ### 2026-05-13T17:36:44.786Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after rebasing onto origin/main: package build, docs generation, docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, docs:site:typecheck, and targeted docs-cli test with extended timeout passed. Public generated reference still excludes group roots and advanced/internal command groups.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:17:04.626Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
    - old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - current_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131649-61129E
    
    ### 2026-05-13T18:30:29.868Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after rebasing onto current origin/main 707ddf167: package build, docs regeneration, docs:cli:check, docs:onboarding:check, docs:ia:check, lint:core, agentplane doctor, and targeted docs-cli test passed. Generated public CLI reference contains real user/action commands only and excludes group roots plus advanced/internal groups.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:36:44.923Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075
    
    Details:
    
    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
    - old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - current_digest: a048dc32343f5b17a7cd1158432b7c92d4afa817b192d2fd64fa6da95ea21257
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131649-61129E
    
    ### 2026-05-13T19:03:07.583Z — VERIFY — ok
    
    By: CODER
    
    Note: Addressed PR review comment r3236216569: group-only CLI docs filtering now treats optional single-token dispatch args named cmd/command/subcommand as group dispatchers, not only variadic dispatchers. Rebuilt generated CLI reference and confirmed task doc/task verify wrappers are absent while task run remains.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:30:29.894Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075
    
    Details:
    
    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
    - old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - current_digest: a048dc32343f5b17a7cd1158432b7c92d4afa817b192d2fd64fa6da95ea21257
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131649-61129E
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Extra docs:site:build was attempted after installing website deps with --ignore-scripts; it failed during existing Docusaurus SSG for duplicate / route/default-export handling, outside this task's changed sidebar/docs contract. docs:site:typecheck passed.
      Impact: Required task verification is green; full Docusaurus production build remains a pre-existing website build issue not introduced by the CLI/docs-surface changes.
      Resolution: Recorded residual build issue explicitly; did not widen this task into website SSG repair.
    
    - Observation: The first targeted Bun test retry after rebase hit the default 5000ms timeout after 16/17 assertions on a slower run; rerunning the same test with --timeout 15000 passed in 4.886s. Earlier optional docs:site:build still fails in existing Docusaurus SSG for duplicate / route/default-export handling, outside this task scope.
      Impact: Required task verification is green on the rebased branch. Remaining Docusaurus production build issue is unrelated to the CLI docs/user-surface split.
      Resolution: Kept scope to docs surface/generation; did not widen into website SSG repair.
    
    - Observation: A full pre-push fast CI run was attempted and passed format, schemas, agent templates, policy routing, release parity, cold-start baseline, build, docs freshness, recipes inventory, scripts README, onboarding, hotspot baseline, vitest routing, lint:core, and most fast tests, but one release-smoke test failed once in the broad suite with exit 5. The same failing test passed when rerun directly. docs:site:build also remains blocked by an existing Docusaurus duplicate / route/default-export SSG issue outside this task.
      Impact: Task-specific checks and targeted regression checks are green; broad hook has a known unrelated flaky/interference failure, so the branch was pushed with explicit residual risk rather than widening scope.
      Resolution: Recorded residual verification caveat; kept scope limited to CLI docs generation and public/developer documentation separation.
    
    - Observation: Checks after review fix: docs:cli:check, docs:ia:check, docs:onboarding:check, agentplane doctor, lint:core, and targeted docs-cli test with --timeout 15000 all passed.
      Impact: Public generated CLI reference no longer leaks non-actionable single-subcommand group wrappers.
      Resolution: Updated docs renderer, generated reference, and regression assertions; ready to reply/resolve the PR thread.
id_source: "generated"
---
## Summary

Align public CLI docs with user command surface

Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.

## Scope

- In scope: Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.
- Out of scope: unrelated refactors not required for "Align public CLI docs with user command surface".

## Plan

1. Inspect CLI docs generator, website docs navigation, and command catalog surface metadata.
2. Update generated CLI reference filtering so default public reference excludes group-only command roots while preserving actionable subcommands.
3. Replace stale public examples: use cleanup merged/finalize instead of nonexistent work end, remove context status/list, and route dev/advanced/internal commands into explicit hidden/maintenance guidance.
4. Regenerate generated docs and run focused docs/CLI verification plus routing and doctor.

## Verify Steps

1. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:onboarding:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T17:17:04.604Z — VERIFY — ok

By: CODER

Note: Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:51:36.933Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
- old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- current_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131649-61129E

### 2026-05-13T17:36:44.786Z — VERIFY — ok

By: CODER

Note: Re-verified after rebasing onto origin/main: package build, docs generation, docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, docs:site:typecheck, and targeted docs-cli test with extended timeout passed. Public generated reference still excludes group roots and advanced/internal command groups.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:17:04.626Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
- old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- current_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131649-61129E

### 2026-05-13T18:30:29.868Z — VERIFY — ok

By: CODER

Note: Re-verified after rebasing onto current origin/main 707ddf167: package build, docs regeneration, docs:cli:check, docs:onboarding:check, docs:ia:check, lint:core, agentplane doctor, and targeted docs-cli test passed. Generated public CLI reference contains real user/action commands only and excludes group roots plus advanced/internal groups.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:36:44.923Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
- old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- current_digest: a048dc32343f5b17a7cd1158432b7c92d4afa817b192d2fd64fa6da95ea21257
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131649-61129E

### 2026-05-13T19:03:07.583Z — VERIFY — ok

By: CODER

Note: Addressed PR review comment r3236216569: group-only CLI docs filtering now treats optional single-token dispatch args named cmd/command/subcommand as group dispatchers, not only variadic dispatchers. Rebuilt generated CLI reference and confirmed task doc/task verify wrappers are absent while task run remains.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:30:29.894Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
- old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- current_digest: a048dc32343f5b17a7cd1158432b7c92d4afa817b192d2fd64fa6da95ea21257
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131649-61129E

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Extra docs:site:build was attempted after installing website deps with --ignore-scripts; it failed during existing Docusaurus SSG for duplicate / route/default-export handling, outside this task's changed sidebar/docs contract. docs:site:typecheck passed.
  Impact: Required task verification is green; full Docusaurus production build remains a pre-existing website build issue not introduced by the CLI/docs-surface changes.
  Resolution: Recorded residual build issue explicitly; did not widen this task into website SSG repair.

- Observation: The first targeted Bun test retry after rebase hit the default 5000ms timeout after 16/17 assertions on a slower run; rerunning the same test with --timeout 15000 passed in 4.886s. Earlier optional docs:site:build still fails in existing Docusaurus SSG for duplicate / route/default-export handling, outside this task scope.
  Impact: Required task verification is green on the rebased branch. Remaining Docusaurus production build issue is unrelated to the CLI docs/user-surface split.
  Resolution: Kept scope to docs surface/generation; did not widen into website SSG repair.

- Observation: A full pre-push fast CI run was attempted and passed format, schemas, agent templates, policy routing, release parity, cold-start baseline, build, docs freshness, recipes inventory, scripts README, onboarding, hotspot baseline, vitest routing, lint:core, and most fast tests, but one release-smoke test failed once in the broad suite with exit 5. The same failing test passed when rerun directly. docs:site:build also remains blocked by an existing Docusaurus duplicate / route/default-export SSG issue outside this task.
  Impact: Task-specific checks and targeted regression checks are green; broad hook has a known unrelated flaky/interference failure, so the branch was pushed with explicit residual risk rather than widening scope.
  Resolution: Recorded residual verification caveat; kept scope limited to CLI docs generation and public/developer documentation separation.

- Observation: Checks after review fix: docs:cli:check, docs:ia:check, docs:onboarding:check, agentplane doctor, lint:core, and targeted docs-cli test with --timeout 15000 all passed.
  Impact: Public generated CLI reference no longer leaks non-actionable single-subcommand group wrappers.
  Resolution: Updated docs renderer, generated reference, and regression assertions; ready to reply/resolve the PR thread.
