---
id: "202605091753-5G5506"
title: "Deduplicate CLI benchmark script helpers"
result_summary: "Merged via PR #3528."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "bun run clone:check"
  - "bun run clone:report"
  - "bun run test:project -- scripts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T17:55:08.763Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T18:28:03.684Z"
  updated_by: "CODER"
  note: "Verified: extracted shared benchmark helper module; help paths, walltime smoke, perf smoke, Prettier, typecheck, clone:report, and clone:check passed. Clone metrics improved from 1546 duplicated lines / 16193 tokens after the previous task to 1465 duplicated lines / 15457 tokens, with clone count 88 -> 85."
  attempts: 0
commit:
  hash: "171e577bf335bb93a66ccdeb2f2414fde67364fd"
  message: "Merge pull request #3528 from basilisk-labs/task/202605091753-5G5506/benchmark-helpers"
comments:
  -
    author: "CODER"
    body: "Start: extracting shared CLI benchmark helper code from benchmark runner scripts while preserving command-specific defaults and validating with clone/type/script checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3528 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-09T18:22:55.723Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting shared CLI benchmark helper code from benchmark runner scripts while preserving command-specific defaults and validating with clone/type/script checks."
  -
    type: "verify"
    at: "2026-05-09T18:28:03.684Z"
    author: "CODER"
    state: "ok"
    note: "Verified: extracted shared benchmark helper module; help paths, walltime smoke, perf smoke, Prettier, typecheck, clone:report, and clone:check passed. Clone metrics improved from 1546 duplicated lines / 16193 tokens after the previous task to 1465 duplicated lines / 15457 tokens, with clone count 88 -> 85."
  -
    type: "status"
    at: "2026-05-09T18:29:54.550Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3528 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-09T18:29:54.556Z"
doc_updated_by: "INTEGRATOR"
description: "Move shared duration statistics, suite argument parsing, config loading, interpolation, and command formatting from benchmark scripts into a script-local helper module without changing benchmark semantics."
sections:
  Summary: |-
    Deduplicate CLI benchmark script helpers
    
    Move shared duration statistics, suite argument parsing, config loading, interpolation, and command formatting from benchmark scripts into a script-local helper module without changing benchmark semantics.
  Scope: |-
    - In scope: Move shared duration statistics, suite argument parsing, config loading, interpolation, and command formatting from benchmark scripts into a script-local helper module without changing benchmark semantics.
    - Out of scope: unrelated refactors not required for "Deduplicate CLI benchmark script helpers".
  Plan: "Extract script-local benchmark helper functions for duration summaries, positive integer parsing, suite config parsing/loading, argument interpolation, and command formatting. Keep command-specific defaults and output semantics in the current scripts. Verify with focused script checks if available, typecheck, clone report, and clone baseline check."
  Verify Steps: |-
    1. Run `bun run clone:report`. Expected: benchmark script helper clones are gone and total clone metrics decrease versus the pre-task report.
    2. Run `node scripts/measure-cli-walltime.mjs --help >/tmp/agentplane-walltime-help.txt && node scripts/measure-cli-perf.mjs --help >/tmp/agentplane-perf-help.txt`. Expected: both help paths render successfully.
    3. Run `node scripts/measure-cli-walltime.mjs --runs 1 --command-id version`. Expected: JSON payload is emitted with failed_count=0.
    4. Run `node scripts/measure-cli-perf.mjs --runs 1 --command-id quickstart`. Expected: JSON payload is emitted with failed_count=0.
    5. Run `bunx prettier --check scripts/lib/cli-benchmark-shared.mjs scripts/cli-benchmark-runner.mjs scripts/measure-cli-walltime.mjs`. Expected: changed files are formatted.
    6. Run `bun run typecheck`. Expected: TypeScript project references compile.
    7. Run `bun run clone:check`. Expected: clone baseline guard passes without updating the baseline.
    8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T18:28:03.684Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: extracted shared benchmark helper module; help paths, walltime smoke, perf smoke, Prettier, typecheck, clone:report, and clone:check passed. Clone metrics improved from 1546 duplicated lines / 16193 tokens after the previous task to 1465 duplicated lines / 15457 tokens, with clone count 88 -> 85.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T18:27:52.838Z, excerpt_hash=sha256:67672282255775ebb2705db21f8fdf331bd0a4df407c230a6976b4f4d0eb3951
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091753-5G5506-benchmark-helpers/.agentplane/tasks/202605091753-5G5506/blueprint/resolved-snapshot.json
    - old_digest: 40c43f19f10e2e5299610ae39047253064e701498c2c7dfe085d6be0a223e5cd
    - current_digest: 40c43f19f10e2e5299610ae39047253064e701498c2c7dfe085d6be0a223e5cd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091753-5G5506
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The originally seeded Verify Steps contained an invalid scripts project test command; replaced it with direct benchmark script smoke checks that exercise the changed surfaces.
      Impact: The benchmark scripts now share stats, argument parsing, suite config loading, interpolation, and preview formatting without changing command-specific payload semantics.
      Resolution: Keep remaining clone clusters in the separate hook, task-doc, task transition, and verify spec tasks.
id_source: "generated"
---
