---
id: "202601041253-00029"
title: "Reduce integrate noise: auto-sync PR meta head_sha"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["sync"]
verify: []
commit: { hash: "6ee132fca0297c6909cdb6b2b60fa5e3f83bcc28", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Speed up the pipeline by removing the common integrate warning about stale PR meta head_sha. Acceptance: (1) python scripts/agentctl.py integrate no longer prints \\\"PR meta head_sha differs\\\" in normal usage; (2) integrate uses the actual task branch HEAD SHA for verify and writes it into docs/workflow/prs/T-###/meta.json on main (head_sha + last_verified_sha) so artifacts stay consistent; (3) safe in workflow_mode=branch_pr and never writes to the task branch; (4) meta.json ends up correct after integration."
dirty: false
id_source: "custom"
---
