---
id: "202602060332-4Q9MSM"
title: "AP-BR-02 Effective base resolver"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["branching"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: design effective base resolver and refactor callers to use unified selection; update tests/docs." }
doc_version: 2
doc_updated_at: "2026-02-06T04:08:45.698Z"
doc_updated_by: "CODER"
description: "Add resolveBaseBranch helper with prioritized base selection; unify base resolution in work start/integrate/cleanup/guard and add tests+docs."
id_source: "generated"
---
## Summary

Added resolveBaseBranch for effective base selection and updated branch_pr commands to use it.

## Scope

Core git base-branch utilities, workflow command base resolution, and related tests.

## Risks

Branch_pr fallback now uses current branch when unpinned; users should pin base to avoid unexpected diffs.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert resolveBaseBranch additions and restore getBaseBranch usage in workflow commands/tests.
