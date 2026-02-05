---
id: "202602051709-TF7WD8"
title: "Fix ESLint no-unsafe warnings"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["testing"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: fix ESLint no-unsafe warnings across workflow/config/recipes/run-cli/archive/task-backend and clarify ignored-file warning." }
doc_version: 2
doc_updated_at: "2026-02-05T17:10:00.730Z"
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
