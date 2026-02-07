---
id: "202602071657-HC5CYR"
title: "Gate: Enforce Verify Steps on plan approve (verify-required tags)"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-F919EB"
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
doc_updated_at: "2026-02-07T16:57:23.524Z"
doc_updated_by: "CODER"
description: "Block task plan approve when Verify Steps is missing/empty/placeholder for verify-required tasks."
id_source: "generated"
---
