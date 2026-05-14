---
id: "202605141604-37S5VS"
title: "Enable feedback issue prompts by default"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:04:34.617Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T16:17:45.588Z"
  updated_by: "CODER"
  note: "Implemented default-on feedback GitHub issue prompts with explicit opt-out commands and docs. Verification: framework:dev:bootstrap; focused Vitest 99 passed; docs:cli:check; schemas:check; format:check; typecheck; knip:check; lint:core; targeted ESLint for changed source/site files; docs:site:check; policy routing check; ap doctor OK. Residual: full lint:website still reports pre-existing Docusaurus type-aware lint errors outside changed file."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing default-on feedback issue prompts, explicit opt-out documentation, and focused tests/docs verification in the task worktree."
events:
  -
    type: "status"
    at: "2026-05-14T16:05:09.671Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing default-on feedback issue prompts, explicit opt-out documentation, and focused tests/docs verification in the task worktree."
  -
    type: "verify"
    at: "2026-05-14T16:17:45.588Z"
    author: "CODER"
    state: "ok"
    note: "Implemented default-on feedback GitHub issue prompts with explicit opt-out commands and docs. Verification: framework:dev:bootstrap; focused Vitest 99 passed; docs:cli:check; schemas:check; format:check; typecheck; knip:check; lint:core; targeted ESLint for changed source/site files; docs:site:check; policy routing check; ap doctor OK. Residual: full lint:website still reports pre-existing Docusaurus type-aware lint errors outside changed file."
doc_version: 3
doc_updated_at: "2026-05-14T16:17:45.594Z"
doc_updated_by: "CODER"
description: "Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs."
sections:
  Summary: |-
    Enable feedback issue prompts by default

    Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.
  Scope: |-
    - In scope: Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.
    - Out of scope: unrelated refactors not required for "Enable feedback issue prompts by default".
  Plan: |-
    1. Update feedback GitHub issue defaults so newly initialized AgentPlane projects enable feedback.github_issues.enabled by default while retaining explicit opt-out via config set.
    2. Ensure init presets/non-interactive flows write the new default consistently and tests cover default-on plus explicit false opt-out.
    3. Update README and website/docs copy to state the project intentionally enables this feedback issue prompt mode to speed development, and provide the disable command for users who do not want it.
    4. Regenerate generated docs/schemas if affected and run focused config/init/insights tests plus docs/schema/lint/type checks.
  Verify Steps: |-
    1. Run focused Vitest coverage for feedback config defaults, init prompt/default behavior, insights issue handling, CLI help snapshots, and command catalog/help contracts. Expected: all selected tests pass.
    2. Run generated artifact checks for config schemas and CLI reference docs. Expected: schemas and docs are in sync.
    3. Run formatting, TypeScript, knip, targeted ESLint for changed source/site files, and Docusaurus site checks. Expected: changed scope passes; any broader pre-existing website lint drift is recorded separately.
    4. Run AgentPlane policy/runtime checks. Expected: routing validation and ap doctor pass, with unrelated existing warnings explicitly noted if present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T16:17:45.588Z — VERIFY — ok

    By: CODER

    Note: Implemented default-on feedback GitHub issue prompts with explicit opt-out commands and docs. Verification: framework:dev:bootstrap; focused Vitest 99 passed; docs:cli:check; schemas:check; format:check; typecheck; knip:check; lint:core; targeted ESLint for changed source/site files; docs:site:check; policy routing check; ap doctor OK. Residual: full lint:website still reports pre-existing Docusaurus type-aware lint errors outside changed file.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:16:16.921Z, excerpt_hash=sha256:b467d93bfef52ab7d4450dd63c46359a9dea38257f34c3294e021090719faee9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141604-37S5VS-feedback-default-on/.agentplane/tasks/202605141604-37S5VS/blueprint/resolved-snapshot.json
    - old_digest: 76855933205c69520307c172c004c64b272820393b0dc96f697031b93b1725a9
    - current_digest: 76855933205c69520307c172c004c64b272820393b0dc96f697031b93b1725a9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141604-37S5VS

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: New default config and init presets set feedback.github_issues.enabled=true. Init supports --feedback-github-issues false, config supports agentplane config set feedback.github_issues.enabled false, and docs/README/site mention the deliberate default and opt-out path.
      Impact: New AgentPlane installs can suggest privacy-bounded GitHub issue payloads for internal AgentPlane errors by default, while users retain a direct command-level opt-out.
      Resolution: Committed code, generated schemas/docs, documentation, and task evidence in 1b662065a.
id_source: "generated"
---
## Summary

Enable feedback issue prompts by default

Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.

## Scope

- In scope: Change AgentPlane feedback GitHub issue prompts to be enabled by default, keep opt-out command support, and document the deliberate default in README and website docs.
- Out of scope: unrelated refactors not required for "Enable feedback issue prompts by default".

## Plan

1. Update feedback GitHub issue defaults so newly initialized AgentPlane projects enable feedback.github_issues.enabled by default while retaining explicit opt-out via config set.
2. Ensure init presets/non-interactive flows write the new default consistently and tests cover default-on plus explicit false opt-out.
3. Update README and website/docs copy to state the project intentionally enables this feedback issue prompt mode to speed development, and provide the disable command for users who do not want it.
4. Regenerate generated docs/schemas if affected and run focused config/init/insights tests plus docs/schema/lint/type checks.

## Verify Steps

1. Run focused Vitest coverage for feedback config defaults, init prompt/default behavior, insights issue handling, CLI help snapshots, and command catalog/help contracts. Expected: all selected tests pass.
2. Run generated artifact checks for config schemas and CLI reference docs. Expected: schemas and docs are in sync.
3. Run formatting, TypeScript, knip, targeted ESLint for changed source/site files, and Docusaurus site checks. Expected: changed scope passes; any broader pre-existing website lint drift is recorded separately.
4. Run AgentPlane policy/runtime checks. Expected: routing validation and ap doctor pass, with unrelated existing warnings explicitly noted if present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T16:17:45.588Z — VERIFY — ok

By: CODER

Note: Implemented default-on feedback GitHub issue prompts with explicit opt-out commands and docs. Verification: framework:dev:bootstrap; focused Vitest 99 passed; docs:cli:check; schemas:check; format:check; typecheck; knip:check; lint:core; targeted ESLint for changed source/site files; docs:site:check; policy routing check; ap doctor OK. Residual: full lint:website still reports pre-existing Docusaurus type-aware lint errors outside changed file.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T16:16:16.921Z, excerpt_hash=sha256:b467d93bfef52ab7d4450dd63c46359a9dea38257f34c3294e021090719faee9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141604-37S5VS-feedback-default-on/.agentplane/tasks/202605141604-37S5VS/blueprint/resolved-snapshot.json
- old_digest: 76855933205c69520307c172c004c64b272820393b0dc96f697031b93b1725a9
- current_digest: 76855933205c69520307c172c004c64b272820393b0dc96f697031b93b1725a9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141604-37S5VS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: New default config and init presets set feedback.github_issues.enabled=true. Init supports --feedback-github-issues false, config supports agentplane config set feedback.github_issues.enabled false, and docs/README/site mention the deliberate default and opt-out path.
  Impact: New AgentPlane installs can suggest privacy-bounded GitHub issue payloads for internal AgentPlane errors by default, while users retain a direct command-level opt-out.
  Resolution: Committed code, generated schemas/docs, documentation, and task evidence in 1b662065a.
