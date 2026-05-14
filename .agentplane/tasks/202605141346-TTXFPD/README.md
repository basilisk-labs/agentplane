---
id: "202605141346-TTXFPD"
title: "Add opt-in GitHub issue feedback prompts"
result_summary: "Merged via PR #3719."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T13:47:03.562Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T19:42:36.044Z"
  updated_by: "CODER"
  note: "Verified: resolved origin/main merge conflicts while preserving opt-in feedback defaults and newer agent-context diagnostics. Checks passed: focused Vitest/Bun tests for prompt steps, config, error-map, insights report/spec; bun run typecheck; bun run schemas:check; bun run docs:cli:check; bun run format:check; git diff --check; conflict marker scan; node .agentplane/policy/check-routing.mjs; ap doctor OK with pre-existing branch_pr warnings. Optional bun run lint:core still fails on repo-local bin import resolution for ../dist/cli.js after bootstrap, not on conflict files."
  attempts: 0
commit:
  hash: "58d63b4fd5f21e2622ce92e0596db473e7f997fb"
  message: "Merge pull request #3719 from basilisk-labs/task/202605141346-TTXFPD/feedback-issue-prompts"
comments:
  -
    author: "CODER"
    body: "Start: implementing explicit feedback issue opt-in, mandatory internal-error prompting, privacy-bounded report reuse, and focused tests/docs in the task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3719 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T13:47:50.877Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing explicit feedback issue opt-in, mandatory internal-error prompting, privacy-bounded report reuse, and focused tests/docs in the task worktree."
  -
    type: "verify"
    at: "2026-05-14T14:22:07.483Z"
    author: "CODER"
    state: "ok"
    note: "Implemented explicit opt-in feedback.github_issues config, init flag/prompt, mandatory E_INTERNAL issue suggestion, and insights issue payload/creation flow. Checks passed: focused Bun tests, typecheck, format:check, docs:cli:check, schema sync check, policy routing, ap doctor."
  -
    type: "verify"
    at: "2026-05-14T14:24:08.020Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after commit amend and PR creation. Current implementation commit is 43b06e622; local checks remain passed: focused Bun tests, typecheck, format:check, docs:cli:check, schema sync check, policy routing, ap doctor."
  -
    type: "verify"
    at: "2026-05-14T15:52:06.454Z"
    author: "CODER"
    state: "ok"
    note: "Final verification on head 2fac48f7. Implemented explicit feedback.github_issues opt-in, full init prompt/flag support, mandatory E_INTERNAL issue suggestion, and insights issue dry-run/create flow. Checks passed: focused Vitest/Bun tests, typecheck, format:check, lint targets, knip:check, schema/docs checks, ap doctor, policy routing, GitHub Docs CI, GitHub Core CI test/test-windows/release-ready manifest."
  -
    type: "verify"
    at: "2026-05-14T19:42:36.044Z"
    author: "CODER"
    state: "ok"
    note: "Verified: resolved origin/main merge conflicts while preserving opt-in feedback defaults and newer agent-context diagnostics. Checks passed: focused Vitest/Bun tests for prompt steps, config, error-map, insights report/spec; bun run typecheck; bun run schemas:check; bun run docs:cli:check; bun run format:check; git diff --check; conflict marker scan; node .agentplane/policy/check-routing.mjs; ap doctor OK with pre-existing branch_pr warnings. Optional bun run lint:core still fails on repo-local bin import resolution for ../dist/cli.js after bootstrap, not on conflict files."
  -
    type: "status"
    at: "2026-05-14T20:23:39.967Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3719 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T20:23:39.973Z"
doc_updated_by: "INTEGRATOR"
description: "Add an explicit init/config feedback mode that prompts users to create an AgentPlane GitHub issue when internal AgentPlane errors are detected, using privacy-bounded insights diagnostics."
sections:
  Summary: |-
    Add opt-in GitHub issue feedback prompts
    
    Add an explicit init/config feedback mode that prompts users to create an AgentPlane GitHub issue when internal AgentPlane errors are detected, using privacy-bounded insights diagnostics.
  Scope: |-
    - In scope: Add an explicit init/config feedback mode that prompts users to create an AgentPlane GitHub issue when internal AgentPlane errors are detected, using privacy-bounded insights diagnostics.
    - Out of scope: unrelated refactors not required for "Add opt-in GitHub issue feedback prompts".
  Plan: "Implement an explicit feedback issue opt-in. Scope: add config schema/defaults for feedback.github issue prompting; extend init flags/answers/config writing so users can opt in or leave it disabled; add a diagnostics command that prepares a privacy-bounded GitHub issue from insights report data and creates it only after explicit command invocation; add a shared error-feedback prompt helper so internal AgentPlane errors can instruct users to run the issue command when feedback is enabled or show the opt-in path when unset/disabled; update CLI docs and focused tests. Verification: focused feedback/init/insights tests, typecheck or targeted typecheck if available, generated CLI docs if command catalog changes, routing check, agentplane doctor."
  Verify Steps: |-
    1. Run focused tests for config, init, error guidance, insights issue, and help/catalog surfaces. Expected: all pass.
    2. Run TypeScript project build. Expected: typecheck passes.
    3. Check generated CLI docs and runtime schema artifacts. Expected: docs:cli:check and schema sync check pass.
    4. Run AgentPlane policy/runtime checks. Expected: agentplane doctor and routing check pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T14:22:07.483Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented explicit opt-in feedback.github_issues config, init flag/prompt, mandatory E_INTERNAL issue suggestion, and insights issue payload/creation flow. Checks passed: focused Bun tests, typecheck, format:check, docs:cli:check, schema sync check, policy routing, ap doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:06:55.423Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
    - old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141346-TTXFPD
    
    ### 2026-05-14T14:24:08.020Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after commit amend and PR creation. Current implementation commit is 43b06e622; local checks remain passed: focused Bun tests, typecheck, format:check, docs:cli:check, schema sync check, policy routing, ap doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:22:07.530Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
    - old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141346-TTXFPD
    
    ### 2026-05-14T15:52:06.454Z — VERIFY — ok
    
    By: CODER
    
    Note: Final verification on head 2fac48f7. Implemented explicit feedback.github_issues opt-in, full init prompt/flag support, mandatory E_INTERNAL issue suggestion, and insights issue dry-run/create flow. Checks passed: focused Vitest/Bun tests, typecheck, format:check, lint targets, knip:check, schema/docs checks, ap doctor, policy routing, GitHub Docs CI, GitHub Core CI test/test-windows/release-ready manifest.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:24:08.112Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
    - old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141346-TTXFPD
    
    ### 2026-05-14T19:42:36.044Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: resolved origin/main merge conflicts while preserving opt-in feedback defaults and newer agent-context diagnostics. Checks passed: focused Vitest/Bun tests for prompt steps, config, error-map, insights report/spec; bun run typecheck; bun run schemas:check; bun run docs:cli:check; bun run format:check; git diff --check; conflict marker scan; node .agentplane/policy/check-routing.mjs; ap doctor OK with pre-existing branch_pr warnings. Optional bun run lint:core still fails on repo-local bin import resolution for ../dist/cli.js after bootstrap, not on conflict files.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:52:06.483Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
    - old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141346-TTXFPD
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add opt-in GitHub issue feedback prompts

Add an explicit init/config feedback mode that prompts users to create an AgentPlane GitHub issue when internal AgentPlane errors are detected, using privacy-bounded insights diagnostics.

## Scope

- In scope: Add an explicit init/config feedback mode that prompts users to create an AgentPlane GitHub issue when internal AgentPlane errors are detected, using privacy-bounded insights diagnostics.
- Out of scope: unrelated refactors not required for "Add opt-in GitHub issue feedback prompts".

## Plan

Implement an explicit feedback issue opt-in. Scope: add config schema/defaults for feedback.github issue prompting; extend init flags/answers/config writing so users can opt in or leave it disabled; add a diagnostics command that prepares a privacy-bounded GitHub issue from insights report data and creates it only after explicit command invocation; add a shared error-feedback prompt helper so internal AgentPlane errors can instruct users to run the issue command when feedback is enabled or show the opt-in path when unset/disabled; update CLI docs and focused tests. Verification: focused feedback/init/insights tests, typecheck or targeted typecheck if available, generated CLI docs if command catalog changes, routing check, agentplane doctor.

## Verify Steps

1. Run focused tests for config, init, error guidance, insights issue, and help/catalog surfaces. Expected: all pass.
2. Run TypeScript project build. Expected: typecheck passes.
3. Check generated CLI docs and runtime schema artifacts. Expected: docs:cli:check and schema sync check pass.
4. Run AgentPlane policy/runtime checks. Expected: agentplane doctor and routing check pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T14:22:07.483Z — VERIFY — ok

By: CODER

Note: Implemented explicit opt-in feedback.github_issues config, init flag/prompt, mandatory E_INTERNAL issue suggestion, and insights issue payload/creation flow. Checks passed: focused Bun tests, typecheck, format:check, docs:cli:check, schema sync check, policy routing, ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:06:55.423Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
- old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141346-TTXFPD

### 2026-05-14T14:24:08.020Z — VERIFY — ok

By: CODER

Note: Re-verified after commit amend and PR creation. Current implementation commit is 43b06e622; local checks remain passed: focused Bun tests, typecheck, format:check, docs:cli:check, schema sync check, policy routing, ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:22:07.530Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
- old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141346-TTXFPD

### 2026-05-14T15:52:06.454Z — VERIFY — ok

By: CODER

Note: Final verification on head 2fac48f7. Implemented explicit feedback.github_issues opt-in, full init prompt/flag support, mandatory E_INTERNAL issue suggestion, and insights issue dry-run/create flow. Checks passed: focused Vitest/Bun tests, typecheck, format:check, lint targets, knip:check, schema/docs checks, ap doctor, policy routing, GitHub Docs CI, GitHub Core CI test/test-windows/release-ready manifest.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:24:08.112Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
- old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141346-TTXFPD

### 2026-05-14T19:42:36.044Z — VERIFY — ok

By: CODER

Note: Verified: resolved origin/main merge conflicts while preserving opt-in feedback defaults and newer agent-context diagnostics. Checks passed: focused Vitest/Bun tests for prompt steps, config, error-map, insights report/spec; bun run typecheck; bun run schemas:check; bun run docs:cli:check; bun run format:check; git diff --check; conflict marker scan; node .agentplane/policy/check-routing.mjs; ap doctor OK with pre-existing branch_pr warnings. Optional bun run lint:core still fails on repo-local bin import resolution for ../dist/cli.js after bootstrap, not on conflict files.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:52:06.483Z, excerpt_hash=sha256:48cd4ca40cc85f84859fc317facb175ef56442602d4d0802826611a5bd510b81

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141346-TTXFPD-feedback-issue-prompts/.agentplane/tasks/202605141346-TTXFPD/blueprint/resolved-snapshot.json
- old_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- current_digest: a5b8695068d9f65dea3fb3100d3cdf0523724078cb7e0c965d0ee858f073cdb1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141346-TTXFPD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
