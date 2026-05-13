---
id: "202605131637-33VQFN"
title: "Add local insights report command"
result_summary: "Merged via PR #3645."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "diagnostics"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:38:06.111Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T17:12:25.652Z"
  updated_by: "CODER"
  note: "Verified: implemented local-only insights report CLI with privacy-bounded payload, generated CLI docs, and targeted command coverage. Checks passed: bun test packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (8 pass); bun run typecheck; bun run lint:core; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; node packages/agentplane/bin/agentplane.js insights report --json --recent-limit 1. Full bun run lint still fails in unrelated website TypeScript/Docusaurus typing files outside this task scope; core lint passes."
  attempts: 0
commit:
  hash: "092f19afeea175340b18f5e9905f0f86e0b2acb5"
  message: "Merge pull request #3645 from basilisk-labs/task/202605131637-33VQFN/insights-report"
comments:
  -
    author: "CODER"
    body: "Start: implement a local-only insights report CLI command in the dedicated task worktree, preserving privacy boundaries and adding targeted command coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3645 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T16:38:35.223Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a local-only insights report CLI command in the dedicated task worktree, preserving privacy boundaries and adding targeted command coverage."
  -
    type: "verify"
    at: "2026-05-13T17:12:25.652Z"
    author: "CODER"
    state: "ok"
    note: "Verified: implemented local-only insights report CLI with privacy-bounded payload, generated CLI docs, and targeted command coverage. Checks passed: bun test packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (8 pass); bun run typecheck; bun run lint:core; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; node packages/agentplane/bin/agentplane.js insights report --json --recent-limit 1. Full bun run lint still fails in unrelated website TypeScript/Docusaurus typing files outside this task scope; core lint passes."
  -
    type: "status"
    at: "2026-05-13T18:35:19.117Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3645 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T18:35:19.117Z"
doc_updated_by: "INTEGRATOR"
description: "Implement a local-only agentplane insights report command that summarizes privacy-safe repository and AgentPlane diagnostic state for user-shared support analysis without uploading telemetry."
sections:
  Summary: |-
    Add local insights report command
    
    Implement a local-only agentplane insights report command that summarizes privacy-safe repository and AgentPlane diagnostic state for user-shared support analysis without uploading telemetry.
  Scope: |-
    - In scope: Implement a local-only agentplane insights report command that summarizes privacy-safe repository and AgentPlane diagnostic state for user-shared support analysis without uploading telemetry.
    - Out of scope: unrelated refactors not required for "Add local insights report command".
  Plan: |-
    1. Inspect existing CLI command registry/spec patterns and task/config store APIs.
    2. Add agentplane insights report as a local-only command with JSON default output and optional pretty output if existing CLI conventions support it.
    3. Include bounded diagnostics: AgentPlane version/config summary, workflow mode/backend id, git branch/dirty counts, task status counts, recent error/status evidence from local task metadata, and explicit privacy metadata stating no network/upload and excluded content classes.
    4. Add focused CLI tests covering command output, no sensitive raw task text exposure, and usage/help wiring.
    5. Regenerate CLI reference docs if command registry changes generated docs.
    6. Verify with targeted tests, docs CLI freshness check, check-routing, and agentplane doctor.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T17:12:25.652Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: implemented local-only insights report CLI with privacy-bounded payload, generated CLI docs, and targeted command coverage. Checks passed: bun test packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (8 pass); bun run typecheck; bun run lint:core; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; node packages/agentplane/bin/agentplane.js insights report --json --recent-limit 1. Full bun run lint still fails in unrelated website TypeScript/Docusaurus typing files outside this task scope; core lint passes.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:38:35.223Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131637-33VQFN-insights-report/.agentplane/tasks/202605131637-33VQFN/blueprint/resolved-snapshot.json
    - old_digest: 7ffbb3963f8d2ce2f32fdf09503d7ece0df46db896d5e24e2cda3bb979e7213d
    - current_digest: 7ffbb3963f8d2ce2f32fdf09503d7ece0df46db896d5e24e2cda3bb979e7213d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131637-33VQFN
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command evidence: targeted tests 8 pass; JSON smoke returned schema=agentplane.insights.report.v1, version=0.6.0, network=not_used, upload=not_supported; routing OK; doctor OK.
      Impact: The command gives users a pasteable local diagnostic state report without telemetry upload or raw task prose/traces.
      Resolution: Keep broad website lint failure as unrelated residual; this task verifies CLI/core scope with lint:core, typecheck, format, routing, doctor, generated docs, and smoke.
id_source: "generated"
---
## Summary

Add local insights report command

Implement a local-only agentplane insights report command that summarizes privacy-safe repository and AgentPlane diagnostic state for user-shared support analysis without uploading telemetry.

## Scope

- In scope: Implement a local-only agentplane insights report command that summarizes privacy-safe repository and AgentPlane diagnostic state for user-shared support analysis without uploading telemetry.
- Out of scope: unrelated refactors not required for "Add local insights report command".

## Plan

1. Inspect existing CLI command registry/spec patterns and task/config store APIs.
2. Add agentplane insights report as a local-only command with JSON default output and optional pretty output if existing CLI conventions support it.
3. Include bounded diagnostics: AgentPlane version/config summary, workflow mode/backend id, git branch/dirty counts, task status counts, recent error/status evidence from local task metadata, and explicit privacy metadata stating no network/upload and excluded content classes.
4. Add focused CLI tests covering command output, no sensitive raw task text exposure, and usage/help wiring.
5. Regenerate CLI reference docs if command registry changes generated docs.
6. Verify with targeted tests, docs CLI freshness check, check-routing, and agentplane doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T17:12:25.652Z — VERIFY — ok

By: CODER

Note: Verified: implemented local-only insights report CLI with privacy-bounded payload, generated CLI docs, and targeted command coverage. Checks passed: bun test packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (8 pass); bun run typecheck; bun run lint:core; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; node packages/agentplane/bin/agentplane.js insights report --json --recent-limit 1. Full bun run lint still fails in unrelated website TypeScript/Docusaurus typing files outside this task scope; core lint passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:38:35.223Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131637-33VQFN-insights-report/.agentplane/tasks/202605131637-33VQFN/blueprint/resolved-snapshot.json
- old_digest: 7ffbb3963f8d2ce2f32fdf09503d7ece0df46db896d5e24e2cda3bb979e7213d
- current_digest: 7ffbb3963f8d2ce2f32fdf09503d7ece0df46db896d5e24e2cda3bb979e7213d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131637-33VQFN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command evidence: targeted tests 8 pass; JSON smoke returned schema=agentplane.insights.report.v1, version=0.6.0, network=not_used, upload=not_supported; routing OK; doctor OK.
  Impact: The command gives users a pasteable local diagnostic state report without telemetry upload or raw task prose/traces.
  Resolution: Keep broad website lint failure as unrelated residual; this task verifies CLI/core scope with lint:core, typecheck, format, routing, doctor, generated docs, and smoke.
