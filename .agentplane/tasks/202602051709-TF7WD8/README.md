---
id: "202602051709-TF7WD8"
title: "Fix ESLint no-unsafe warnings"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["testing"]
verify: []
commit: { hash: "f8e481e8923cafbe3d10af9ac8e61af3b8e79361", message: "✨ TF7WD8 align ESLint settings" }
comments:
  - { author: "CODER", body: "Start: fix ESLint no-unsafe warnings across workflow/config/recipes/run-cli/archive/task-backend and clarify ignored-file warning." }
  - { author: "CODER", body: "Verified: ESLint now uses flat config in IDE; lint and test:fast passed to confirm no-unsafe warnings are resolved." }
doc_version: 2
doc_updated_at: "2026-02-05T17:18:07.448Z"
doc_updated_by: "CODER"
description: "Resolve remaining @typescript-eslint/no-unsafe-* warnings in workflow/config/recipes/run-cli/archive/task-backend paths; document ignored file warning."
id_source: "generated"
---
## Summary

Resolve remaining ESLint no-unsafe warnings in key modules and note ignored-file warning.

## Scope

- Address no-unsafe-* ESLint warnings in workflow.ts, config.ts, archive.ts, recipes tests, run-cli recipes tests, task-backend/test.\n- Keep behavior unchanged; add explicit typing/casts where needed.\n- Note ignored-file ESLint warning for agentplane-recipes/scripts/sign-index.ts.

## Risks

- Type-only changes might hide real issues if misapplied.\n- Avoid behavior changes.

## Verify Steps

- bun run lint.\n- bun run test:fast.

## Verification


## Rollback Plan

- Revert type annotations if they cause mismatches.
