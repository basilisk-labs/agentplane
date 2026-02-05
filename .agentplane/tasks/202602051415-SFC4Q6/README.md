---
id: "202602051415-SFC4Q6"
title: "AP-070a: Backend selection at init"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "backend", "cli"]
verify: ["bun run lint", "bun run test:fast"]
commit: { hash: "cce2f88e5946ebeae4cf6fa898fc93278c1ae92f", message: "✨ SFC4Q6 add init backend selection" }
comments:
  - { author: "CODER", body: "Start: add init backend selection flag/prompt and write backend config templates." }
  - { author: "CODER", body: "Verified: bun run lint/test:fast and pre-commit hooks; init now supports backend selection." }
doc_version: 2
doc_updated_at: "2026-02-05T14:21:15.704Z"
doc_updated_by: "CODER"
description: "Add init flag/prompt to choose local vs redmine backend and write config for selected backend (create both configs)."
id_source: "generated"
---
## Summary

Add init backend choice and write config files for local/redmine backends.

## Scope

Extend init flags and prompts for backend selection, write backend config files, and update config to selected backend path.

## Risks

Non-interactive init may require new flag; ensure default remains local.

## Verify Steps

- Run bun run lint.\n- Run bun run test:fast.\n- Run node packages/agentplane/bin/agentplane.js hooks run pre-commit.\n- Validate init writes backend config path for local/redmine.

## Verification

Verified on 2026-02-05: bun run lint, bun run test:fast, hooks pre-commit; init now supports --backend selection and writes config paths.

## Rollback Plan

Revert init backend selection changes and restore single local backend config path.
