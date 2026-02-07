---
id: "202602071328-812ZA9"
title: "AP-MOD-01: Explicit contexts and no direct env/fs access in domains"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
tags:
  - "roadmap"
  - "refactor"
  - "policy"
  - "contract"
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
doc_updated_at: "2026-02-07T13:28:56.289Z"
doc_updated_by: "CODER"
description: "Introduce PolicyContext next to existing GitContext/CommandContext and enforce a strict boundary: policy/git domains must not read process/env/fs directly. Add lint restrictions for the policy directory to prevent hidden fallbacks and IO."
id_source: "generated"
---
