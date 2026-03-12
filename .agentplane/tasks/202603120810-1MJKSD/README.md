---
id: "202603120810-1MJKSD"
title: "Widen safe stale-dist inspection and runtime remediation"
result_summary: "Expanded stale-build inspections and runtime recovery guidance."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T08:24:40.127Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 44 tests passed across runtime, doctor, stale-dist policy, read-only stale build, handoff, and version expectation surfaces; Scope: read-only allowlist and actionable recovery text."
commit:
  hash: "03141344e57bb6da5833b6ae7952cf07711d966f"
  message: "✨ 1MJKSD task: widen stale-dist inspection recovery"
comments:
  -
    author: "CODER"
    body: "Verified: safe inspection commands now warn-and-run on stale builds and runtime recovery text points to concrete remediation commands."
events:
  -
    type: "verify"
    at: "2026-03-12T08:24:40.127Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 44 tests passed across runtime, doctor, stale-dist policy, read-only stale build, handoff, and version expectation surfaces; Scope: read-only allowlist and actionable recovery text."
  -
    type: "status"
    at: "2026-03-12T08:24:44.182Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: safe inspection commands now warn-and-run on stale builds and runtime recovery text points to concrete remediation commands."
doc_version: 3
doc_updated_at: "2026-03-12T08:24:44.182Z"
doc_updated_by: "CODER"
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
#### 2026-03-12T08:24:40.127Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/stale-dist-policy.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/shared/repo-cli-version.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 44 tests passed across runtime, doctor, stale-dist policy, read-only stale build, handoff, and version expectation surfaces; Scope: read-only allowlist and actionable recovery text.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T08:12:16.408Z, excerpt_hash=sha256:f269c344a1f878e84f8c79111f571c9b3cce1fc13ceac2345e8da115f368fcdb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
