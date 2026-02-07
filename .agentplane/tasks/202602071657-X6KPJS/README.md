---
id: "202602071657-X6KPJS"
title: "Gate: Enforce Verify Steps on start when require_plan=false"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-HC5CYR"
tags:
  - "code"
  - "workflow"
  - "approvals"
verify:
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
doc_updated_at: "2026-02-07T16:57:23.957Z"
doc_updated_by: "CODER"
description: "Add fail-fast check in start for verify-required tasks when plan approval is disabled."
id_source: "generated"
---
