---
id: "202602061915-DH1CKG"
title: "P2: Новый стандарт commit message (emoji map + body), без совместимости"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "hooks"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T19:41:25.123Z"
  updated_by: "USER"
  note: "Approved by user on 2026-02-06T19:41:25.123Z: implement new commit message standard; no backward compatibility required."
verification:
  state: "ok"
  updated_at: "2026-02-06T19:58:30.972Z"
  updated_by: "TESTER"
  note: "Verified locally on 2026-02-06T19:58:30.972Z: bun run test:core and bun run test:cli both pass (vitest)."
commit:
  hash: "b7f74c7c3f9e97e0dccef6a8a9f9547a140442af"
  message: "✨ DH1CKG commit"
comments:
  -
    author: "CODER"
    body: "Start: Implement new commit message standard (<emoji> <suffix> <scope>: <summary> + structured body) across core validator, guard/commitFromComment, hooks, tests, and docs; no backward-compat."
  -
    author: "CODER"
    body: "Verified: Enforced <emoji> <suffix> <scope>: <summary> subject standard (no backward-compat), generated structured bodies for comment-driven commits, updated hooks/docs/tests; ran bun run test:core and bun run test:cli."
doc_version: 2
doc_updated_at: "2026-02-06T20:03:11.697Z"
doc_updated_by: "CODER"
description: "(Tracking=202602061915-XCPF92; depends_on=202602061915-DZBAW0) Реализовать action/status emoji map, subject template, автогенерацию body для comment-driven коммитов; обновить commit-msg hook под новый формат без обратной совместимости; обновить docs (AGENTS.md)."
id_source: "generated"
---
## Summary

Enforced a new commit subject standard (<emoji> <suffix> <scope>: <summary>) with no backward compatibility; comment-driven commits now generate a structured body (Task/Agent/Status/Comment); hooks/guard/docs/tests updated accordingly.

## Scope

- core: enforce commit subject template in validateCommitSubject (no backward compat)
- agentplane: generate subject+body for comment-driven commits (start/block/finish/set-status)
- hooks: commit-msg uses core validator and requires AGENTPLANE_TASK_ID
- docs/tests: update AGENTS.md, command guide, and CLI tests to match the new template

## Plan

1. Update core CommitPolicy to enforce `<emoji> <suffix> <scope>: <summary>` (and keep anti-generic checks).
2. Update comment-driven commit generation to produce the new subject format and an informative body.
3. Update commit-msg hook to validate via core CommitPolicy and require `AGENTPLANE_TASK_ID`.
4. Update docs and examples (AGENTS.md, assets) to reflect the new standard and emoji map.
5. Update/repair affected tests and run `bun run test:core` + `bun run test:cli`.

## Risks

- Breaking change: commits not created via agentplane may fail commit-msg due to missing `AGENTPLANE_TASK_ID`.
- Any downstream tooling that assumed the old `<emoji> <suffix> <summary>` template will need updates.
- Strict subject validation may reject “generic” summaries more often; keep the rules aligned with docs/examples.

## Verification

Local verification: bun run test:core, bun run test:cli (see verify record below).

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T19:58:30.972Z — VERIFY — ok

By: TESTER

Note: Verified locally on 2026-02-06: bun run test:core and bun run test:cli both pass (vitest).

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the implementation commit for this task.
2. Restore the previous commit subject validator in core (accepting `<emoji> <suffix> <summary>`).
3. Relax commit-msg hook to not require `AGENTPLANE_TASK_ID` (or accept a fallback path).
4. Re-run `bun run test:core` + `bun run test:cli`.
