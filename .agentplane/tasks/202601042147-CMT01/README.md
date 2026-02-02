---
id: "202601042147-CMT01"
title: "Clarify commit message suffix usage"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["git", "workflow"]
verify: []
commit: { hash: "f1568e3460bd7e7a293bca7448b9e81348b8a575", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Require agents to use only the unique task index (suffix after the last dash) in commit messages, omitting the timestamp portion."
dirty: false
id_source: "custom"
---
# Summary

Clarified agent instructions so commit messages use only the unique task index (suffix after the last dash) and omit the timestamp portion.

# Scope

- Update agent workflow guidance to standardize commit message indexing.

# Risks

- Low risk: guidance-only change; impact is limited to commit message formatting.

# Verify Steps

- None (documentation-only).

# Rollback Plan

- Revert the agent instruction change if the commit naming convention needs to include timestamps again.
