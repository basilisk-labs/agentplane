---
id: "202602060850-P2VNYW"
title: "C4: Enforce require_plan by blocking start/work/integrate until approved"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "approvals", "guard", "cli"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: enforce require_plan via plan_approval.state guard in start/work start/integrate; update tests to require plan approval first." }
doc_version: 2
doc_updated_at: "2026-02-06T08:50:44.988Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement ensurePlanApprovedIfRequired guard and apply it to start, work start, and integrate when agents.approvals.require_plan=true."
id_source: "generated"
---
