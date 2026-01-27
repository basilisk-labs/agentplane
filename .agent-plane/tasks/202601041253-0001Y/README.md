---
id: "202601041253-0001Y"
title: "Refresh project documentation + cleanup"
status: "DONE"
priority: "high"
owner: "DOCS"
tags: ["docs", "cleanup", "readme"]
verify: ["bash -n clean.sh", "python scripts/agentctl.py task lint"]
commit: { hash: "c4d8084771dabcdb57353f5e7792322010f648ed", message: "Legacy completion (backfill)" }
comments:
  - { author: "PLANNER", body: "Plan: refresh root docs + reorganize supporting docs under docs/, then tighten clean.sh so a cleanup leaves only the framework runtime files." }
  - { author: "REVIEWER", body: "Verified: Ran bash -n clean.sh and python scripts/agentctl.py task lint; docs refreshed and docs/architecture.md added; clean.sh now removes dev artifacts, preserves docs/agentctl.md when present, and recreates checksum-valid tasks.json." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Update the repo documentation to match the current codebase and workflow (agentctl-driven tasks, JSON agent registry, commit/verification cadence).\\\\n\\\\nScope:\\\\n- Refresh @README.md, @GUIDELINE.md, @CONTRIBUTING.md, @CODE_OF_CONDUCT.md to reflect current scripts and file layout.\\\\n- Restructure docs where helpful (move deep/auxiliary content into @docs/ and keep root docs as entrypoints with links).\\\\n- Update @clean.sh so it removes framework-development artifacts, leaving only what is necessary to *use* the framework (e.g., @AGENTS.md, @.AGENTS/, @scripts/, @.gitignore, and optionally @docs/agentctl.md).\\\\n\\\\nAcceptance criteria:\\\\n- Root docs are accurate and non-duplicative; links resolve.\\\\n- clean.sh is repo-root scoped, idempotent, and leaves only the minimal runtime files listed above.\\\\n- Verification commands pass."
dirty: false
---
