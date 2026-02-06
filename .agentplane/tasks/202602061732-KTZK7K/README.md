---
id: "202602061732-KTZK7K"
title: "P0.1: Fix commitFromComment allow-base env"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "cli"
  - "guard"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T17:35:11.882Z"
  updated_by: "CODER"
  note: "Plan approved: fix env bug + add regression test for base restriction bypass."
verification:
  state: "ok"
  updated_at: "2026-02-06T17:37:21.293Z"
  updated_by: "TESTER"
  note: "bun run test:agentplane passed; added unit test ensuring buildGitCommitEnv does not enable allow-base implicitly."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix commitFromComment env wiring so allow-tasks cannot enable allow-base; add regression coverage in run-cli lifecycle tests."
doc_version: 2
doc_updated_at: "2026-02-06T17:37:21.298Z"
doc_updated_by: "CODER"
description: "Fix guard/commitFromComment env wiring: AGENTPLANE_ALLOW_BASE must not mirror allowTasks; default to 0 unless explicitly allowed."
id_source: "generated"
---
## Summary

Fix env var wiring in guard commit-from-comment so base-branch bypass cannot be enabled via --allow-tasks.

## Scope

packages/agentplane/src/commands/guard/index.ts: commitFromComment env for git commit.

## Plan

1) Update commitFromComment to set AGENTPLANE_ALLOW_BASE=0 by default.\n2) Add/adjust CLI test to ensure commit-from-comment cannot bypass branch_pr base restriction.\n3) Run relevant vitest suite.

## Risks

Risk: Changing env behavior could break expected workflows that relied on the bug; test will codify intended restriction.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T17:37:21.293Z — VERIFY — ok

By: TESTER

Note: bun run test:agentplane passed; added unit test ensuring buildGitCommitEnv does not enable allow-base implicitly.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task; re-run bun run test:cli:core.

## Verify Steps

- bun run test:cli:core\n- bun run test:agentplane
