---
id: "202601041253-0001R"
title: "Add Mermaid agent workflow diagram to README"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["readme", "docs", "mermaid"]
verify: null
commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Update @README.md to include a short description and a Mermaid diagram (flowchart) showing the default agent workflow and handoffs (ORCHESTRATOR, PLANNER, CODER, TESTER, DOCS, REVIEWER).\\\\n\\\\nAcceptance criteria:\\\\n- README includes a Mermaid flowchart block describing the typical flow (plan -> implement -> test -> docs -> review -> finish).\\\\n- Diagram matches current agent rules (3-phase commits, DOCS artifact before DONE, CODER -> TESTER for dev work)."
dirty: false
id_source: "custom"
---
