---
id: "202601041253-0001M"
title: "Add TESTER agent + enforce post-CODER testing"
status: "DONE"
priority: "normal"
owner: "CREATOR"
depends_on: []
tags: ["agents", "testing"]
verify: ["python scripts/agentctl.py agents", "python scripts/agentctl.py task lint"]
commit: { hash: "cc0a0a73dd2d3864f6d2cb9619d8837465046887", message: "Legacy completion (backfill)" }
comments:
  - { author: "CREATOR", body: "Start: add TESTER agent JSON + update CODER/AGENTS/README to enforce post-CODER test coverage." }
  - { author: "REVIEWER", body: "Verified: agent registry lists TESTER, JSON prompts validate, and tasks.json lints clean (workflow now defaults to CODER -> TESTER -> REVIEWER for dev work)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:21.646Z"
doc_updated_by: "agentplane"
description: "Add a new TESTER specialist agent responsible for adding automated test coverage for code changes. Wire the workflow so development-oriented plans always schedule TESTER after CODER before REVIEWER, and update CODER instructions to explicitly hand off to TESTER after implementation/self-check.\\\\n\\\\nAcceptance criteria:\\\\n- New @.AGENTS/TESTER.json exists (id=TESTER) with clear inputs/outputs/permissions/workflow for adding/maintaining tests.\\\\n- @.AGENTS/CODER.json explicitly hands off to TESTER for test coverage after implementation and local checks.\\\\n- @AGENTS.md updates ORCHESTRATOR rules so dev tasks plan CODER -> TESTER -> REVIEWER by default (unless justified).\\\\n- @README.md reflects the new agent in the lineup and repository layout.\\\\n\\\\nNotes:\\\\n- Prefer existing test framework; if 202601041253-00001, propose a dedicated task to introduce test infrastructure rather than inventing one ad-hoc."
dirty: false
---
## Summary






## Scope


## Risks


## Verify Steps


## Rollback Plan
