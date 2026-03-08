---
id: "202603081612-DA2WJ5"
title: "Fix docs CLI MDX idempotence for release notes generation"
result_summary: "Release-prepublish docs-cli idempotence blocker removed."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts"
  - "bun run lint:core -- packages/agentplane/src/cli/spec/docs-render.ts packages/agentplane/src/commands/task/migrate-doc.command.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T16:12:53.823Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T16:14:14.169Z"
  updated_by: "CODER"
  note: "Focused regression checks: run-cli.core.docs-cli.test.ts passes after prettier-stable MDX escaping, lint passes on the touched generator/help files, and the runtime was rebuilt before lifecycle mutation."
commit:
  hash: "53ca93da224e5dab897a2117403ba98b556a6130"
  message: "🩺 DA2WJ5 cli: stabilize docs-cli mdx escaping"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the docs-cli MDX drift, fix the generator so plain-text help survives prettier unchanged, and rerun the focused regression before handing the release gate back."
  -
    author: "CODER"
    body: "Verified: made CLI docs MDX generation stable under prettier by escaping plain-text markdown metacharacters in the docs renderer, reran the focused docs-cli regression, and rebuilt the runtime before closing the task."
events:
  -
    type: "status"
    at: "2026-03-08T16:13:00.333Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the docs-cli MDX drift, fix the generator so plain-text help survives prettier unchanged, and rerun the focused regression before handing the release gate back."
  -
    type: "verify"
    at: "2026-03-08T16:14:14.169Z"
    author: "CODER"
    state: "ok"
    note: "Focused regression checks: run-cli.core.docs-cli.test.ts passes after prettier-stable MDX escaping, lint passes on the touched generator/help files, and the runtime was rebuilt before lifecycle mutation."
  -
    type: "status"
    at: "2026-03-08T16:14:21.043Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: made CLI docs MDX generation stable under prettier by escaping plain-text markdown metacharacters in the docs renderer, reran the focused docs-cli regression, and rebuilt the runtime before closing the task."
  -
    type: "status"
    at: "2026-03-08T16:15:53.718Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
doc_version: 3
doc_updated_at: "2026-03-08T16:15:53.718Z"
doc_updated_by: "CODER"
description: "Make the generated docs cli MDX output stable under prettier so the release prepublish gate passes without output drift in task migrate-doc help text."
id_source: "generated"
---
## Summary

Fix docs CLI MDX idempotence for release notes generation

Make the generated docs cli MDX output stable under prettier so the release prepublish gate passes without output drift in task migrate-doc help text.

## Scope

- In scope: Make the generated docs cli MDX output stable under prettier so the release prepublish gate passes without output drift in task migrate-doc help text.
- Out of scope: unrelated refactors not required for "Fix docs CLI MDX idempotence for release notes generation".

## Plan

1. Reproduce the docs-cli idempotence failure from the generated MDX diff. 2. Fix the docs-render/help rendering path so generated CLI MDX survives prettier without content changes. 3. Re-run the focused docs-cli regression and lint the touched generator/help files. 4. Hand the clean result back to the blocked release task.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run lint:core -- packages/agentplane/src/cli/spec/docs-render.ts packages/agentplane/src/commands/task/migrate-doc.command.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T16:14:14.169Z — VERIFY — ok

By: CODER

Note: Focused regression checks: run-cli.core.docs-cli.test.ts passes after prettier-stable MDX escaping, lint passes on the touched generator/help files, and the runtime was rebuilt before lifecycle mutation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T16:13:00.333Z, excerpt_hash=sha256:6284da3ce5e5f1220477e32616b370e6cc46a04f2dd457bb0ed6da5cc5bff403

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
