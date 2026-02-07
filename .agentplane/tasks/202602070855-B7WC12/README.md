---
id: "202602070855-B7WC12"
title: "TaskStore: cached get/update/list + migrate status commands"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602070855-JBHZSB"
tags:
  - "code"
  - "tasks"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:agentplane"
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
doc_updated_at: "2026-02-07T09:12:25.177Z"
doc_updated_by: "CODER"
description: "Add TaskStore layer per command to avoid read/parse/write duplication; implement update(taskId, updater) with mtime guard + writeIfChanged; migrate start/block/finish/verify/doc ops to TaskStore.update."
id_source: "explicit"
---
