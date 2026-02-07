---
id: "202602070855-JBHZSB"
title: "GitContext: memoized facade + guard/commit migration"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602070855-ZXJ9M4"
tags:
  - "code"
  - "git"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:cli:core"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
doc_version: 2
doc_updated_at: "2026-02-07T09:12:25.174Z"
doc_updated_by: "CODER"
description: "Implement GitContext(statusChangedPaths via one git status --porcelain -z, headCommit memoized, stage batched, commit). Migrate guard/commit pipeline and disallow direct git exec outside GitContext."
id_source: "explicit"
---
