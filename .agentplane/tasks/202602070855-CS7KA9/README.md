---
id: "202602070855-CS7KA9"
title: "IO utils: stable JSON + write-if-changed"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "io"
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
comments:
  -
    author: "CODER"
    body: "Start: Implement write-if-changed + stable JSON helpers and migrate critical writes to reduce diff-noise and IO."
doc_version: 2
doc_updated_at: "2026-02-07T09:12:25.177Z"
doc_updated_by: "CODER"
description: "Add writeTextIfChanged (atomic write + compare) and writeJsonStableIfChanged (canonicalize + stable key order + atomic) and switch config/cache/export writes to these helpers."
id_source: "explicit"
---
