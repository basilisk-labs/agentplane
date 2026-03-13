---
id: "202603130722-0MT45C"
title: "Fix protected allow flags in commit auto-stage"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T07:22:57.307Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T07:27:44.227Z"
  updated_by: "CODER"
  note: "Verified protected allow-flag auto-stage semantics: unit, policy, CLI guard, commit wrapper regressions, eslint, prettier, and both package builds all pass; --allow-ci now works without redundant explicit path prefixes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: unify path-scoped protected allow flags so commit auto-stage and staged allowlist semantics treat --allow-ci and sibling overrides as real path scopes instead of requiring redundant explicit prefixes."
events:
  -
    type: "status"
    at: "2026-03-13T07:23:02.881Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify path-scoped protected allow flags so commit auto-stage and staged allowlist semantics treat --allow-ci and sibling overrides as real path scopes instead of requiring redundant explicit prefixes."
  -
    type: "verify"
    at: "2026-03-13T07:27:44.227Z"
    author: "CODER"
    state: "ok"
    note: "Verified protected allow-flag auto-stage semantics: unit, policy, CLI guard, commit wrapper regressions, eslint, prettier, and both package builds all pass; --allow-ci now works without redundant explicit path prefixes."
doc_version: 3
doc_updated_at: "2026-03-13T07:27:44.229Z"
doc_updated_by: "CODER"
description: "Make path-based protected overrides like --allow-ci expand commit auto-stage and staged allowlist semantics without requiring redundant explicit --allow prefixes."
id_source: "generated"
---
## Summary

Fix protected allow flags in commit auto-stage

Make path-based protected overrides like --allow-ci expand commit auto-stage and staged allowlist semantics without requiring redundant explicit --allow prefixes.

## Scope

- In scope: Make path-based protected overrides like --allow-ci expand commit auto-stage and staged allowlist semantics without requiring redundant explicit --allow prefixes.
- Out of scope: unrelated refactors not required for "Fix protected allow flags in commit auto-stage".

## Plan

1. Extend protected-path allowlist expansion so path-based override flags (tasks/policy/config/hooks/ci) contribute canonical prefixes to staged allowlist checks and top-level commit auto-stage.
2. Keep guard commit staged-only, but make policy evaluation accept path-scoped protected overrides without redundant explicit --allow prefixes.
3. Add targeted regressions for stageAllowlist, evaluatePolicy, and cmdCommit around CI-only scope; verify with focused vitest suites and a dogfood commit check if needed.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: protected allow-flag regressions pass.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/commands/guard/impl/allow.ts packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/policy/rules/allowlist.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts`. Expected: no lint issues.
3. Inspect a minimal commit path mentally against `.github/workflows/publish.yml`. Expected: `agentplane commit <task-id> --allow-ci` can auto-stage matching CI changes without redundant `--allow .github/workflows`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T07:27:44.227Z — VERIFY — ok

By: CODER

Note: Verified protected allow-flag auto-stage semantics: unit, policy, CLI guard, commit wrapper regressions, eslint, prettier, and both package builds all pass; --allow-ci now works without redundant explicit path prefixes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T07:23:02.882Z, excerpt_hash=sha256:994c5d5e8799686f13ddb3804f4ae15102e9ddedf0311b7f00dd3f1dfa00dfeb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
