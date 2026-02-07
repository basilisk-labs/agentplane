---
id: "202602071329-RCW48K"
title: "AP-POL-01: Single policy engine (rules + evaluatePolicy)"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
  - "202602071328-812ZA9"
  - "202602071329-3VB29M"
tags:
  - "roadmap"
  - "policy"
  - "refactor"
  - "guardrails"
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
doc_updated_at: "2026-02-07T13:29:07.264Z"
doc_updated_by: "CODER"
description: "Implement a policy domain with protectedPathsRule(ctx), commitSubjectRule(ctx), and evaluatePolicy(ctx) as an explicit pipeline. Entry points (guard/hooks/cli) must not orchestrate checks or call individual rules; they call only evaluatePolicy."
id_source: "generated"
---
