---
id: "202601041253-0002F"
title: "Docs: remove remaining legacy prs/ mentions"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["docs"]
verify: null
commit: { hash: "6b04b9b75b7c783b4beb33fac5d6a2fc3a95ce36", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Finish migration documentation cleanup.\\n\\nAcceptance:\\n- Update docs so they no longer instruct using `docs/workflow/prs/...` or `docs/workflow/T-###.md` (except clearly marked legacy notes).\\n- Includes at least: `docs/workflow/T-066/README.md`, `docs/workflow/T-067/README.md`, and any other references found via ripgrep.\\n- Do not rewrite historical task text in `tasks.json`; keep changes doc-only."
dirty: false
id_source: "custom"
---
