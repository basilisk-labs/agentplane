---
id: "202602071329-V0SPSH"
title: "AP-CLI-01: Clean up CLI layer (parsing vs execution, remove legacy)"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
tags:
  - "roadmap"
  - "cli"
  - "refactor"
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
doc_updated_at: "2026-02-07T13:29:22.448Z"
doc_updated_by: "CODER"
description: "Split CLI parsing from execution: parsing in dedicated functions/modules, the runner only wires commands and contexts. Remove deprecated/implicit flags and modes; all behavior must be explicit."
id_source: "generated"
---
