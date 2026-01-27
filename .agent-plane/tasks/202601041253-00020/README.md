---
id: "202601041253-00020"
title: "Restructure framework folders into .agent-plane"
status: "DONE"
priority: "normal"
owner: "CODER"
tags: ["framework", "refactor"]
verify: ["python scripts/agentctl.py task lint", "python scripts/agentctl.py agents", "python scripts/agentctl.py quickstart > /dev/null", "bash -n clean.sh"]
commit: { hash: "eb7cf5363ce55ec602fb9cc078069bc8d262a130", message: "Legacy completion (backfill)" }
comments:
  - { author: "REVIEWER", body: "Verified: Ran python scripts/agentctl.py verify T-064 (task lint, agents, quickstart, bash -n clean.sh); framework paths now live under .agent-plane." }
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Move all framework-specific artifacts under .agent-plane (agents + agentctl docs + config), update references/docs, and update clean.sh accordingly."
dirty: false
---
