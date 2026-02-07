---
id: "202602071329-3VB29M"
title: "AP-GIT-01: Strict resolveBaseBranch without fallbacks"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
  - "202602071328-812ZA9"
tags:
  - "roadmap"
  - "git"
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
doc_updated_at: "2026-02-07T13:29:01.760Z"
doc_updated_by: "CODER"
description: "Centralize base branch resolution in the git domain: a single resolveBaseBranch(gitCtx) function. Remove heuristics (origin/HEAD, silent env fallbacks). Base branch must be explicitly pinned/set or the command fails fast."
id_source: "generated"
---
