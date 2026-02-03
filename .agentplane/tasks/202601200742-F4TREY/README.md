---
id: "202601200742-F4TREY"
title: "Plan Redmine backend recipe migration"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "workflow"]
verify: []
commit: { hash: "2ada67f606a03c73e9f91bb20fdc88e17a512913", message: "✅ NNSHSS verified: close: redmine migration steps and dependencies recorded." }
comments:
  - { author: "ORCHESTRATOR", body: "Subtasks: 202601200743-6CQN5R (recipe spec), 202601200743-NNSHSS (migration steps)." }
  - { author: "ORCHESTRATOR", body: "verified: close: redmine backend audit and recipe migration plan complete." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:00.341Z"
doc_updated_by: "agentplane"
description: "Audit the current Redmine backend and define a recipe-based replacement (scenarios, inputs, outputs, guardrails) so Redmine support can be enabled or disabled."
---
## Summary

Audited the Redmine backend and defined the recipe-based replacement plan with scenarios, inputs, and migration steps.


## Context

Goal: move Redmine backend into a recipe so it is optional and user-enabled, while keeping local backend in core.


## Scope

Reviewed current Redmine backend implementation (.agent-plane/backends/redmine/backend.py, backend.json) and agentctl sync behavior. Defined recipe specification (202601200743-6CQN5R) and migration steps (202601200743-NNSHSS).


## Risks

Redmine backend migration requires careful handling of config and custom fields; recipe must enforce safe defaults and explicit confirmation for sync push.


## Verify Steps

Reviewed redmine backend code and agentctl sync command behavior; confirmed recipe plan covers install/disable/sync/verify flows.


## Rollback Plan

Leave core local backend untouched; migration can be abandoned by keeping local backend config and not installing the recipe payload.


## Notes

Next step is implementing the redmine-backend recipe and updating docs/12-redmine.md to reference it.
