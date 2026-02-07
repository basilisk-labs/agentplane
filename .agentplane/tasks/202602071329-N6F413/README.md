---
id: "202602071329-N6F413"
title: "AP-ENTRY-01: Guard as a thin adapter"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071329-RCW48K"
tags:
  - "roadmap"
  - "guard"
  - "refactor"
  - "policy"
verify: []
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
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-07T13:29:12.298Z"
doc_updated_by: "CODER"
description: "Reduce guard to: parse args -> build ctx -> evaluatePolicy(ctx) -> exit. Remove business logic from guard; path protection, subject checks, base branch checks, and staging checks must live in git/policy domains."
id_source: "generated"
---
