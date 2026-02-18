---
id: "202602111121-13TMPK"
title: "Init redmine backend stub: remove secret fields"
result_summary: "Init redmine backend stub now excludes url/api_key/project_id secrets."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
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
  hash: "5636709e1e4b00296f8c9222893ebfd59147773c"
  message: "✅ 13TMPK task: remove redmine secrets from backend stub"
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
  -
    type: "status"
    at: "2026-02-11T11:38:10.227Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
doc_version: 2
doc_updated_at: "2026-02-11T11:38:10.227Z"
doc_updated_by: "CODER"
description: "Redmine backend.json written by init must contain only non-secret/general settings; connection credentials are sourced from environment."
id_source: "generated"
---
