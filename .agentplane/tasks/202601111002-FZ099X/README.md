---
id: "202601111002-FZ099X"
title: "Redmine backend CRUD check"
status: "DONE"
priority: "normal"
owner: "REDMINE"
depends_on: []
tags: ["redmine"]
verify: []
commit: { hash: "0e5bacb3095951ee4f4d7a36658dfc733b580f4b", message: "✨ W1A6H8 FZ099X switch to redmine backend and add redmine sync smoke tests" }
comments:
  - { author: "CODER", body: "Test comment via Redmine backend" }
  - { author: "CODER", body: "Verified: created task via Redmine backend, set docs, added comment; task show confirms doc metadata and stored comment after sync pull." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:38.970Z"
doc_updated_by: "agentplane"
description: "Create/update/comment tasks directly against Redmine backend to verify CLI flows."
dirty: false
id_source: "custom"
---
## Summary

Validate that Redmine backend supports create/update/comment flows via agentctl in sandbox.


## Context

- Need assurance that Redmine backend works end-to-end with the current CLI without backend-specific hacks.
- Sandbox project is cleared; repo state is canonical so new tasks should appear and round-trip cleanly.


## Scope

- Create the task via Redmine backend and confirm it appears in task list.
- Update doc sections and add a comment to verify custom fields and journals.
- Pull the task again to confirm fields persist.


## Risks

- API latency could cause commands to time out; retries may be needed.
- If sandbox contains old data, lists may mix test and legacy issues.


## Verify Steps

- python .agent-plane/agentctl.py task show 202601111002-FZ099X --quiet
- python .agent-plane/agentctl.py task comment 202601111002-FZ099X --author CODER --body "Test comment via Redmine backend"
- python .agent-plane/agentctl.py task doc show 202601111002-FZ099X --quiet


## Rollback Plan

- Delete the test issue from Redmine if it pollutes the sandbox.
- Re-run task list to confirm it is gone.
