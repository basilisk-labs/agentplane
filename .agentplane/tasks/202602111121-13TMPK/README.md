---
id: "202602111121-13TMPK"
title: "Init redmine backend stub: remove secret fields"
result_summary: "Init redmine backend stub now excludes url/api_key/project_id secrets."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111121-6X0V0K"
  - "202602111121-ZTD2AP"
tags:
  - "cli"
  - "init"
  - "security"
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
  hash: "f501a0d5ffa705c76e234409da059aad149f1884"
  message: "✅ ZTD2AP task: generate redmine .env template during init"
comments:
  -
    author: "CODER"
    body: "Verified: redmine backend stub no longer stores connection secrets and remains env-driven."
events:
  -
    type: "status"
    at: "2026-02-11T11:27:52.447Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: redmine backend stub no longer stores connection secrets and remains env-driven."
doc_version: 2
doc_updated_at: "2026-02-11T11:27:52.447Z"
doc_updated_by: "CODER"
description: "Redmine backend.json written by init must contain only non-secret/general settings; connection credentials are sourced from environment."
id_source: "generated"
---
