---
id: "202603120810-1MJKSD"
title: "Widen safe stale-dist inspection and runtime remediation"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:12:30.471Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-12T08:12:16.408Z"
doc_updated_by: "PLANNER"
description: "Allow more read-only inspection commands on stale builds and make runtime/version recovery guidance more actionable in framework checkouts."
id_source: "generated"
---
## Summary

Widen safe stale-dist inspection and runtime remediation

Allow more read-only inspection commands on stale builds and make runtime/version recovery guidance more actionable in framework checkouts.

## Scope

- In scope: Allow more read-only inspection commands on stale builds and make runtime/version recovery guidance more actionable in framework checkouts.
- Out of scope: unrelated refactors not required for "Widen safe stale-dist inspection and runtime remediation".

## Plan

1. Expand the stale-dist warning-only allowlist only for safe read-only inspection commands. 2. Make runtime and doctor recovery guidance more actionable for version drift and wrapper mismatch. 3. Cover policy and text output with focused tests.

## Verify Steps

- Command: bun x vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts --hookTimeout 60000 --testTimeout 60000
- Expected: safe inspection commands warn-and-run on stale builds and runtime recovery text points to the right remediation path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
