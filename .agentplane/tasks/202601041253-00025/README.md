---
id: "202601041253-00025"
title: "agentctl pr note: append handoff notes"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on:
  - "202601041253-00024"
tags:
  - "agentctl"
  - "workflow"
  - "pipeline"
verify:
  - "python -m compileall scripts/agentctl.py"
  - "python scripts/agentctl.py task lint"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "771cdf260f496ee5fb1a2e2e4f291141c455785f"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "CODER"
    body: "Start: add agentctl pr note to append '- ROLE: TEXT' under ## Handoff Notes in docs/workflow/prs/T-###/review.md; update .agent-plane/agentctl.md; verify via task lint and a manual note append smoke."
  -
    author: "CODER"
    body: "Implemented pr note helper; ready for review."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=ran; pr=docs/workflow/prs/T-069."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:25.482Z"
doc_updated_by: "agentplane"
description: "Add a convenience command to append correctly formatted bullets under the '## Handoff Notes' section in docs/workflow/prs/T-###/review.md. Acceptance: (1) python scripts/agentctl.py pr note T-### --author ROLE --body TEXT adds a '- ROLE: TEXT' entry under Handoff Notes; (2) preserves existing content and keeps formatting stable; (3) emits clear errors/fixes when the PR artifact is missing; (4) update .agent-plane/agentctl.md with the new command."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan


## Plan


## Verification
