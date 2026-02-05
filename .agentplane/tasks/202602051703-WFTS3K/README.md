---
id: "202602051703-WFTS3K"
title: "Fix ESLint unsafe-type warnings"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["testing"]
verify: []
commit: { hash: "f50b22b9557ddf437bf99baa07cd9c8a1d5127f4", message: "✨ WFTS3K type-safe task backend exports" }
comments:
  - { author: "CODER", body: "Start: fix ESLint no-unsafe-* warnings in task backend/tests by making typed exports and validating lint/test." }
  - { author: "CODER", body: "Verified: lint and test:fast passed; typed task backend exports to silence no-unsafe warnings." }
doc_version: 2
doc_updated_at: "2026-02-05T17:06:04.271Z"
doc_updated_by: "CODER"
description: "Resolve IDE ESLint no-unsafe-* warnings by ensuring typed exports in task backend; verify lint/test."
id_source: "generated"
---
## Summary

Remove ESLint no-unsafe-* warnings in task backend/tests by ensuring typed exports.

## Scope

- Ensure extractTaskDoc/mergeTaskDoc/atomicWriteFile/generateTaskId have explicit types in task backend.\n- Verify lint/test:fast.\n- Leave ignored-file ESLint warning for agentplane-recipes as non-issue.

## Risks

- Low risk; type-only changes could mask real type mismatches if mis-specified.

## Verify Steps

- bun run lint.\n- bun run test:fast.

## Verification

- ✅ bun run lint.\n- ✅ bun run test:fast.

## Rollback Plan

- Revert typed aliases if they cause mismatches.
