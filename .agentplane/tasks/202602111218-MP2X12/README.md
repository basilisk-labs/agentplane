---
id: "202602111218-MP2X12"
title: "Stage hook shim in init install paths"
result_summary: "Init includes hook shim in install commit, preventing leftover tracked changes."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "init"
  - "code"
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
commit:
  hash: "f8ff63d7ee9862d99b6eeb65767db730599f3639"
  message: "✨ release: v0.2.16"
comments:
  -
    author: "CODER"
    body: "Verified: init now stages the generated hook shim in the install commit when hooks are enabled."
events:
  -
    type: "status"
    at: "2026-02-11T12:19:29.058Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: init now stages the generated hook shim in the install commit when hooks are enabled."
doc_version: 2
doc_updated_at: "2026-02-11T12:19:29.058Z"
doc_updated_by: "CODER"
description: "Add .agentplane/bin/agentplane to installPaths when hooks are installed during init; ensure no dirty tracked files remain."
id_source: "generated"
---
