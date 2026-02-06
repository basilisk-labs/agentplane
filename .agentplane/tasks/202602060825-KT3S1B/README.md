---
id: "202602060825-KT3S1B"
title: "B1: Centralize task README writes + atomic update API"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "tasks", "io", "safety"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: add core task README atomic update helper and switch CLI writes (notably task scaffold) to use atomic write paths." }
doc_version: 2
doc_updated_at: "2026-02-06T08:25:37.267Z"
doc_updated_by: "ORCHESTRATOR"
description: "Introduce a single core API for reading/updating task README (frontmatter + body) and ensure all CLI writes go through atomic write paths (no direct writeFile for README)."
id_source: "generated"
---
