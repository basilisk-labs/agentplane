---
id: "202601042107-TAG01"
title: "Clarify planner task tags + deps"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["tasks"]
verify: null
commit: { hash: "a13b7c8bf9ce6143bad33fb58ac0fed49089c83c", message: "✅ P7AMW3 close task" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Require PLANNER to review existing tags, apply the minimal set for navigation, and set dependencies when possible."
dirty: false
id_source: "custom"
---
# Summary

Clarify PLANNER instructions to always review existing tags, apply the minimal set for navigation, and set dependencies when possible when creating tasks.

# Scope

- Update PLANNER workflow guidance to enforce tag review/minimal tagging and dependency hints.

# Risks

- Low risk: guidance-only change; risk is limited to behavior alignment.

# Verify Steps

- None (documentation-only).

# Rollback Plan

- Revert the PLANNER instruction change if it causes confusion or conflicts with existing workflows.
