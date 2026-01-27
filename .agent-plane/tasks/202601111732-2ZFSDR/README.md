---
id: "202601111732-2ZFSDR"
title: "Update GitHub sync scripts and cleanup"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["github", "sync", "cleanup", "scripting"]
verify: [".venv/bin/ruff format .", ".venv/bin/ruff check .", ".venv/bin/mypy"]
commit: { hash: "abfa29f605aac03cf6d878f23cc2701db263ada3", message: "✨ 2ZFSDR Update GitHub sync script to reflect current task fields and keep viewer.sh in cleanup scripts." }
comments:
  - { author: "CODER", body: "Update GitHub sync script to reflect current task fields and keep viewer.sh in cleanup scripts." }
  - { author: "CODER", body: "Verified: ran .venv/bin/ruff format ., .venv/bin/ruff check ., and .venv/bin/mypy; all passed. Updated GitHub sync labeling/status handling and preserved viewer.sh in cleanup scripts." }
doc_version: 2
doc_updated_at: "2026-01-11T17:41:00+00:00"
doc_updated_by: "agentctl"
description: "Align GitHub task sync scripts with current backend/schema and keep viewer.sh during cleanup."
---
## Summary

Update GitHub task sync scripts/workflow to match current backend schema and keep viewer.sh during cleanup.

## Scope

- Align .github/scripts/sync_tasks.py with current tasks export fields and backend behavior.
- Adjust .github/workflows/sync-tasks.yml if needed for new args/envs.
- Remove viewer.sh from clean scripts so it is preserved.

## Risks

- GitHub API schema or project fields may differ from expected values.
- Workflow token permissions could block updates.

## Verify Steps

- .venv/bin/ruff format .
- .venv/bin/ruff check .
- .venv/bin/mypy

## Rollback Plan

Revert sync script and clean script changes; rerun ruff/mypy to confirm previous behavior.

