---
id: "202605131713-1GHKB1"
title: "Add public evaluator catalog commands"
result_summary: "Merged via PR #3652."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "evaluators"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T17:14:00.049Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T19:36:20.533Z"
  updated_by: "CODER"
  note: "CI format failure fixed and verified: format:check passes after formatting docs-render.ts; previous review-fix checks still covered evaluator root lookup and --builtin false behavior."
  attempts: 0
commit:
  hash: "4398f9e0e7d3131ea8828c151dab9e6e152d1713"
  message: "🚧 1GHKB1 task: Add public evaluator catalog commands [202605131713-1GHKB1] (#3652)"
comments:
  -
    author: "CODER"
    body: "Start: implement public evaluator catalog commands, seeded evaluator prompt modules, docs, and focused tests while deferring evaluator run to v0.8."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3652 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T17:15:45.315Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement public evaluator catalog commands, seeded evaluator prompt modules, docs, and focused tests while deferring evaluator run to v0.8."
  -
    type: "verify"
    at: "2026-05-13T17:44:14.733Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed: typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke."
  -
    type: "verify"
    at: "2026-05-13T18:49:29.166Z"
    author: "CODER"
    state: "ok"
    note: "Rebased verification passed: build; typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke."
  -
    type: "verify"
    at: "2026-05-13T18:50:01.673Z"
    author: "CODER"
    state: "ok"
    note: "Rebased verification passed after refreshing blueprint snapshot: build; typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke."
  -
    type: "verify"
    at: "2026-05-13T19:05:02.534Z"
    author: "CODER"
    state: "ok"
    note: "Post-second-rebase verification passed: build; focused evaluator/init/upgrade/release-smoke and lifecycle contract tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke."
  -
    type: "verify"
    at: "2026-05-13T19:27:44.955Z"
    author: "CODER"
    state: "ok"
    note: "Review fixes passed: typecheck; docs CLI freshness; builtin assets freshness; evaluator regression test; exact-file eslint/prettier; policy routing; doctor; local evaluator smoke for --builtin false and nested cwd."
  -
    type: "verify"
    at: "2026-05-13T19:36:20.533Z"
    author: "CODER"
    state: "ok"
    note: "CI format failure fixed and verified: format:check passes after formatting docs-render.ts; previous review-fix checks still covered evaluator root lookup and --builtin false behavior."
  -
    type: "status"
    at: "2026-05-13T20:51:30.457Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3652 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T20:51:30.465Z"
doc_updated_by: "INTEGRATOR"
description: "Add a public evaluator CLI surface backed by .agentplane/evaluators prompt modules, with list/show support now and evaluator run explicitly deferred to the v0.8 roadmap."
sections:
  Summary: |-
    Add public evaluator catalog commands
    
    Add a public evaluator CLI surface backed by .agentplane/evaluators prompt modules, with list/show support now and evaluator run explicitly deferred to the v0.8 roadmap.
  Scope: |-
    - In scope: Add a public evaluator CLI surface backed by .agentplane/evaluators prompt modules, with list/show support now and evaluator run explicitly deferred to the v0.8 roadmap.
    - Out of scope: unrelated refactors not required for "Add public evaluator catalog commands".
  Plan: "Implement the public evaluator catalog surface. Scope: add project-local .agentplane/evaluators prompt-module catalog seeded from packaged assets; add public CLI commands for evaluator list and evaluator show <id>; keep evaluator run out of the command catalog and document it as v0.8 roadmap work; include a recovery-context/invariant-review evaluator markdown that prompts a separate agent to inspect task contract, diff, invariants, negative cases, and missing tests. Update CLI help/generated docs and roadmap/docs surfaces as required. Verification: focused command/catalog tests, docs CLI freshness, policy routing, doctor, and local smoke of evaluator list/show."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T17:44:14.733Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification passed: typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:15:45.315Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
    - old_digest: 5d392286ac670a04f8c0a0b80fb593bc84bbf5dcf827b53f3b703e2e5da2b242
    - current_digest: 5d392286ac670a04f8c0a0b80fb593bc84bbf5dcf827b53f3b703e2e5da2b242
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131713-1GHKB1
    
    ### 2026-05-13T18:49:29.166Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased verification passed: build; typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:44:14.771Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
    - old_digest: 5d392286ac670a04f8c0a0b80fb593bc84bbf5dcf827b53f3b703e2e5da2b242
    - current_digest: dc35f553ca855fd3f31ab645cc981f36111b003c3457680de3a0ee96810712a1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131713-1GHKB1
    
    ### 2026-05-13T18:50:01.673Z — VERIFY — ok
    
    By: CODER
    
    Note: Rebased verification passed after refreshing blueprint snapshot: build; typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:49:29.194Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
    - old_digest: dc35f553ca855fd3f31ab645cc981f36111b003c3457680de3a0ee96810712a1
    - current_digest: dc35f553ca855fd3f31ab645cc981f36111b003c3457680de3a0ee96810712a1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131713-1GHKB1
    
    ### 2026-05-13T19:05:02.534Z — VERIFY — ok
    
    By: CODER
    
    Note: Post-second-rebase verification passed: build; focused evaluator/init/upgrade/release-smoke and lifecycle contract tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:50:01.692Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
    - old_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
    - current_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131713-1GHKB1
    
    ### 2026-05-13T19:27:44.955Z — VERIFY — ok
    
    By: CODER
    
    Note: Review fixes passed: typecheck; docs CLI freshness; builtin assets freshness; evaluator regression test; exact-file eslint/prettier; policy routing; doctor; local evaluator smoke for --builtin false and nested cwd.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:05:02.562Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
    - old_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
    - current_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131713-1GHKB1
    
    ### 2026-05-13T19:36:20.533Z — VERIFY — ok
    
    By: CODER
    
    Note: CI format failure fixed and verified: format:check passes after formatting docs-render.ts; previous review-fix checks still covered evaluator root lookup and --builtin false behavior.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:27:44.992Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
    - old_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
    - current_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131713-1GHKB1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added public evaluator list/show catalog commands, seeded recovery-context prompt module into .agentplane/evaluators during init, and kept evaluator execution out of the command catalog for v0.8.
      Impact: Users can inspect evaluator prompt modules publicly now without exposing a premature run surface.
      Resolution: Fresh repo-local build and smoke confirmed evaluator list/show resolve the project-local recovery-context module.
    
    - Observation: origin/main advanced with other active AgentPlane tasks, causing PR mergeStateStatus=DIRTY. Rebased task branch onto origin/main and regenerated builtin assets from the merged asset tree.
      Impact: PR is based on current main without using admin merge or branch-protection bypass.
      Resolution: Resolved generated asset conflict by rerunning assets:builtin:generate, rebuilt CLI dist before docs generation, and reran targeted checks on the rebased head.
    
    - Observation: origin/main advanced with other active AgentPlane tasks, causing PR mergeStateStatus=DIRTY. Rebased task branch onto origin/main, regenerated builtin assets from the merged asset tree, rebuilt CLI dist before docs generation, and refreshed the task blueprint snapshot.
      Impact: Task evidence now matches the rebased branch and current code.branch_pr route; no admin merge or branch-protection bypass was used.
      Resolution: Resolved generated asset conflict with assets:builtin:generate and reran targeted verification on the rebased head.
    
    - Observation: origin/main advanced again to lifecycle command-order guidance (#3661), changing the resolved blueprint snapshot. Rebased onto the new base and refreshed the blueprint snapshot.
      Impact: Task branch now carries evaluator changes on the latest branch_pr lifecycle contract base without admin merge or branch-protection bypass.
      Resolution: Resolved the generated builtin-assets conflict with assets:builtin:generate, rebuilt CLI docs from fresh dist, and reran touched-scope verification.
    
    - Observation: Codex review found two evaluator catalog regressions: project-root lookup errors were swallowed into builtin-only fallback, and the advertised builtin toggle could not disable packaged evaluator modules.
      Impact: Project evaluators now resolve from nested cwd without --root, explicit --root failures surface as Git errors, and users can request project-only evaluator listings with --builtin false.
      Resolution: Used read-only git-root discovery for no-root evaluator catalog lookup, converted --builtin to a true|false string option, regenerated CLI docs, and added regression coverage.
    
    - Observation: GitHub Core CI test failed at format:check on packages/agentplane/src/cli/spec/docs-render.ts after rebasing onto the new public CLI docs surface.
      Impact: Remote Core CI should progress past formatting on the next push; evaluator review fixes remain unchanged.
      Resolution: Formatted docs-render.ts with Prettier, reran format:check successfully, rebuilt framework runtime for the watched source change, and committed the format fix.
id_source: "generated"
---
## Summary

Add public evaluator catalog commands

Add a public evaluator CLI surface backed by .agentplane/evaluators prompt modules, with list/show support now and evaluator run explicitly deferred to the v0.8 roadmap.

## Scope

- In scope: Add a public evaluator CLI surface backed by .agentplane/evaluators prompt modules, with list/show support now and evaluator run explicitly deferred to the v0.8 roadmap.
- Out of scope: unrelated refactors not required for "Add public evaluator catalog commands".

## Plan

Implement the public evaluator catalog surface. Scope: add project-local .agentplane/evaluators prompt-module catalog seeded from packaged assets; add public CLI commands for evaluator list and evaluator show <id>; keep evaluator run out of the command catalog and document it as v0.8 roadmap work; include a recovery-context/invariant-review evaluator markdown that prompts a separate agent to inspect task contract, diff, invariants, negative cases, and missing tests. Update CLI help/generated docs and roadmap/docs surfaces as required. Verification: focused command/catalog tests, docs CLI freshness, policy routing, doctor, and local smoke of evaluator list/show.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T17:44:14.733Z — VERIFY — ok

By: CODER

Note: Verification passed: typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:15:45.315Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
- old_digest: 5d392286ac670a04f8c0a0b80fb593bc84bbf5dcf827b53f3b703e2e5da2b242
- current_digest: 5d392286ac670a04f8c0a0b80fb593bc84bbf5dcf827b53f3b703e2e5da2b242
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131713-1GHKB1

### 2026-05-13T18:49:29.166Z — VERIFY — ok

By: CODER

Note: Rebased verification passed: build; typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:44:14.771Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
- old_digest: 5d392286ac670a04f8c0a0b80fb593bc84bbf5dcf827b53f3b703e2e5da2b242
- current_digest: dc35f553ca855fd3f31ab645cc981f36111b003c3457680de3a0ee96810712a1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131713-1GHKB1

### 2026-05-13T18:50:01.673Z — VERIFY — ok

By: CODER

Note: Rebased verification passed after refreshing blueprint snapshot: build; typecheck; focused evaluator/init/upgrade/release-smoke tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:49:29.194Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
- old_digest: dc35f553ca855fd3f31ab645cc981f36111b003c3457680de3a0ee96810712a1
- current_digest: dc35f553ca855fd3f31ab645cc981f36111b003c3457680de3a0ee96810712a1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131713-1GHKB1

### 2026-05-13T19:05:02.534Z — VERIFY — ok

By: CODER

Note: Post-second-rebase verification passed: build; focused evaluator/init/upgrade/release-smoke and lifecycle contract tests; docs CLI freshness; builtin assets freshness; policy routing; doctor; local evaluator list/show smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:50:01.692Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
- old_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
- current_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131713-1GHKB1

### 2026-05-13T19:27:44.955Z — VERIFY — ok

By: CODER

Note: Review fixes passed: typecheck; docs CLI freshness; builtin assets freshness; evaluator regression test; exact-file eslint/prettier; policy routing; doctor; local evaluator smoke for --builtin false and nested cwd.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:05:02.562Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
- old_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
- current_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131713-1GHKB1

### 2026-05-13T19:36:20.533Z — VERIFY — ok

By: CODER

Note: CI format failure fixed and verified: format:check passes after formatting docs-render.ts; previous review-fix checks still covered evaluator root lookup and --builtin false behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:27:44.992Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131713-1GHKB1-public-evaluator-catalog/.agentplane/tasks/202605131713-1GHKB1/blueprint/resolved-snapshot.json
- old_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
- current_digest: 72486767bf784731a9326405cb5d27e9e1337c782a14c4a1b8ad3041e6e5e78e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131713-1GHKB1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added public evaluator list/show catalog commands, seeded recovery-context prompt module into .agentplane/evaluators during init, and kept evaluator execution out of the command catalog for v0.8.
  Impact: Users can inspect evaluator prompt modules publicly now without exposing a premature run surface.
  Resolution: Fresh repo-local build and smoke confirmed evaluator list/show resolve the project-local recovery-context module.

- Observation: origin/main advanced with other active AgentPlane tasks, causing PR mergeStateStatus=DIRTY. Rebased task branch onto origin/main and regenerated builtin assets from the merged asset tree.
  Impact: PR is based on current main without using admin merge or branch-protection bypass.
  Resolution: Resolved generated asset conflict by rerunning assets:builtin:generate, rebuilt CLI dist before docs generation, and reran targeted checks on the rebased head.

- Observation: origin/main advanced with other active AgentPlane tasks, causing PR mergeStateStatus=DIRTY. Rebased task branch onto origin/main, regenerated builtin assets from the merged asset tree, rebuilt CLI dist before docs generation, and refreshed the task blueprint snapshot.
  Impact: Task evidence now matches the rebased branch and current code.branch_pr route; no admin merge or branch-protection bypass was used.
  Resolution: Resolved generated asset conflict with assets:builtin:generate and reran targeted verification on the rebased head.

- Observation: origin/main advanced again to lifecycle command-order guidance (#3661), changing the resolved blueprint snapshot. Rebased onto the new base and refreshed the blueprint snapshot.
  Impact: Task branch now carries evaluator changes on the latest branch_pr lifecycle contract base without admin merge or branch-protection bypass.
  Resolution: Resolved the generated builtin-assets conflict with assets:builtin:generate, rebuilt CLI docs from fresh dist, and reran touched-scope verification.

- Observation: Codex review found two evaluator catalog regressions: project-root lookup errors were swallowed into builtin-only fallback, and the advertised builtin toggle could not disable packaged evaluator modules.
  Impact: Project evaluators now resolve from nested cwd without --root, explicit --root failures surface as Git errors, and users can request project-only evaluator listings with --builtin false.
  Resolution: Used read-only git-root discovery for no-root evaluator catalog lookup, converted --builtin to a true|false string option, regenerated CLI docs, and added regression coverage.

- Observation: GitHub Core CI test failed at format:check on packages/agentplane/src/cli/spec/docs-render.ts after rebasing onto the new public CLI docs surface.
  Impact: Remote Core CI should progress past formatting on the next push; evaluator review fixes remain unchanged.
  Resolution: Formatted docs-render.ts with Prettier, reran format:check successfully, rebuilt framework runtime for the watched source change, and committed the format fix.
