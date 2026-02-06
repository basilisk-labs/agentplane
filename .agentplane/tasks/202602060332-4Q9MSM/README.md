---
id: "202602060332-4Q9MSM"
title: "AP-BR-02 Effective base resolver"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["branching"]
verify: []
commit: { hash: "01fb738a7780db1f8f3c140d0bc6de6455909a7d", message: "📝 S76RDP record task metadata" }
comments:
  - { author: "CODER", body: "Start: design effective base resolver and refactor callers to use unified selection; update tests/docs." }
  - { author: "CODER", body: "Verified: bun run test:core; bun run test:cli:core; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build.\\nSummary: Implemented base-branch cleanup (remove base_branch, new base resolution/clear/explain), direct work start without worktree, task exports only via task export, docs/tests updates.\\nCommit: 01fb738a7780db1f8f3c140d0bc6de6455909a7d." }
  - { author: "CODER", body: "Commit update: 7a1d5d3d1ada80c2c1c1b136238e17e2d0bf60ea (main changes), 938f94545ae17e44868559cd779fa1a18d5a9b31 (task finish/export snapshots)." }
doc_version: 2
doc_updated_at: "2026-02-06T04:23:17.312Z"
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
