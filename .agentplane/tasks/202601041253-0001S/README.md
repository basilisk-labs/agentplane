---
id: "202601041253-0001S"
title: "Fix Mermaid workflow diagram for GitHub rendering"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["mermaid", "docs", "workflow"]
verify: []
commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Fix the Mermaid workflow diagram in @README.md so it renders correctly on GitHub (avoid problematic label characters like ### in node text).\\\\n\\\\nAcceptance criteria:\\\\n- Mermaid block renders on GitHub README view.\\\\n- Diagram still reflects current workflow (CODER->TESTER, DOCS before finish, 3-phase commits)."
dirty: false
id_source: "custom"
---
