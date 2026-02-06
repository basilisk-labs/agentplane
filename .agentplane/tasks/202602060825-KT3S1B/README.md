---
id: "202602060825-KT3S1B"
title: "B1: Centralize task README writes + atomic update API"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "tasks", "io", "safety"]
verify: []
commit: { hash: "05886cf7ca33dc206dccbfea9cec3efeae40149c", message: "✨ KT3S1B core" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: add core task README atomic update helper and switch CLI writes (notably task scaffold) to use atomic write paths." }
  - { author: "ORCHESTRATOR", body: "Verified: added core updateTaskReadmeAtomic helper and switched task scaffold to atomic writes; core+agentplane fast tests pass." }
doc_version: 2
doc_updated_at: "2026-02-06T08:27:15.789Z"
doc_updated_by: "ORCHESTRATOR"
description: "Introduce a single core API for reading/updating task README (frontmatter + body) and ensure all CLI writes go through atomic write paths (no direct writeFile for README)."
id_source: "generated"
---
