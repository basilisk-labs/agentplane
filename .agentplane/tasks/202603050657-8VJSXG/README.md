---
id: "202603050657-8VJSXG"
title: "Add playbook recipe layer for debug/sync/land with mandatory evidence capture"
result_summary: "Moved playbook behavior to core workflow commands and reduced recipes to true extensions."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T08:01:32.345Z"
  updated_by: "CODER"
  note: "Validated core workflow debug/sync/land commands, recipe-layer cleanup, snapshot updates, and targeted Vitest + lint runs."
commit:
  hash: "30ff24b482b93d454b3faa84f7f047f86220e0c4"
  message: "✅ 8VJSXG docs: regenerate CLI reference after workflow core changes"
comments:
  -
    author: "CODER"
    body: "Start: Migrate debug/sync/land from recipes into core workflow commands, simplify extension catalog, and refresh generated CLI docs."
  -
    author: "CODER"
    body: "Verified: Core workflow operations now cover debug/sync/land with evidence capture, extension recipes are narrowed to non-core domains, and docs/CLI snapshots were regenerated and validated."
events:
  -
    type: "status"
    at: "2026-03-05T08:01:18.564Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Migrate debug/sync/land from recipes into core workflow commands, simplify extension catalog, and refresh generated CLI docs."
  -
    type: "verify"
    at: "2026-03-05T08:01:32.345Z"
    author: "CODER"
    state: "ok"
    note: "Validated core workflow debug/sync/land commands, recipe-layer cleanup, snapshot updates, and targeted Vitest + lint runs."
  -
    type: "status"
    at: "2026-03-05T08:01:40.659Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Core workflow operations now cover debug/sync/land with evidence capture, extension recipes are narrowed to non-core domains, and docs/CLI snapshots were regenerated and validated."
doc_version: 2
doc_updated_at: "2026-03-05T08:01:40.659Z"
doc_updated_by: "CODER"
description: "Implement a recipe/playbook layer for debug, sync, and land operations and enforce evidence capture in scenario run artifacts."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T08:01:32.345Z — VERIFY — ok

By: CODER

Note: Validated core workflow debug/sync/land commands, recipe-layer cleanup, snapshot updates, and targeted Vitest + lint runs.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T08:01:18.564Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

Details:

Checks run:\n- bunx eslint (changed workflow/recipes/docs files)\n- bunx vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u\n- bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts\n- node packages/agentplane/bin/agentplane.js docs cli --out docs/user/cli-reference.generated.mdx\n- bunx prettier --write docs/user/cli-reference.generated.mdx

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
