---
id: "202605091226-1DH19J"
title: "Fix cloud pull Node fetch timeout"
result_summary: "Merged PR 3499 to main with Node cloud fetch address-selection timeout normalization and verified live cloud pull."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T12:26:17.225Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T12:41:04.173Z"
  updated_by: "CODER"
  note: "Cloud pull timeout fix reverified with targeted backend route, canonical test fix, and live cloud pull before publish."
commit:
  hash: "fbc0ee5ac1b88bad387e24eb1c2ef33663709b89"
  message: "Merge pull request #3499 from basilisk-labs/codex/v05-cloud-pull-fetch-fix"
comments:
  -
    author: "CODER"
    body: "Start: fix cloud pull Node fetch connect timeout by normalizing address-selection attempt timing and proving live pull refresh."
  -
    author: "INTEGRATOR"
    body: "Verified: PR 3499 merged to main with cloud fetch timeout fix, focused cloud tests, full local pre-push gate, and hosted checks passing or intentionally skipped by routing."
events:
  -
    type: "status"
    at: "2026-05-09T12:26:22.164Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix cloud pull Node fetch connect timeout by normalizing address-selection attempt timing and proving live pull refresh."
  -
    type: "verify"
    at: "2026-05-09T12:26:38.539Z"
    author: "CODER"
    state: "ok"
    note: "Cloud pull Node fetch timeout fix verified with focused tests, typecheck, lint, bootstrap, and live pull."
  -
    type: "verify"
    at: "2026-05-09T12:29:50.051Z"
    author: "CODER"
    state: "ok"
    note: "Cloud pull fetch timeout fix verified after hotspot-safe test split."
  -
    type: "verify"
    at: "2026-05-09T12:41:04.173Z"
    author: "CODER"
    state: "ok"
    note: "Cloud pull timeout fix reverified with targeted backend route, canonical test fix, and live cloud pull before publish."
  -
    type: "status"
    at: "2026-05-09T13:19:52.350Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR 3499 merged to main with cloud fetch timeout fix, focused cloud tests, full local pre-push gate, and hosted checks passing or intentionally skipped by routing."
doc_version: 3
doc_updated_at: "2026-05-09T13:19:52.355Z"
doc_updated_by: "INTEGRATOR"
description: "Normalize Node address-selection attempt timeout for cloud fetch so backend sync pull can refresh large cloud projections instead of failing with UND_ERR_CONNECT_TIMEOUT."
sections:
  Summary: |-
    Fix cloud pull Node fetch timeout
    
    Normalize Node address-selection attempt timeout for cloud fetch so backend sync pull can refresh large cloud projections instead of failing with UND_ERR_CONNECT_TIMEOUT.
  Scope: |-
    - In scope: Normalize Node address-selection attempt timeout for cloud fetch so backend sync pull can refresh large cloud projections instead of failing with UND_ERR_CONNECT_TIMEOUT.
    - Out of scope: unrelated refactors not required for "Fix cloud pull Node fetch timeout".
  Plan: |-
    1. Normalize Node cloud fetch address-selection attempt timeout to 1000ms so dead first addresses do not exhaust undici's 10s connect path.
    2. Add focused regression coverage for the Node default 10000ms case while preserving the existing too-low timeout behavior.
    3. Verify with cloud backend tests, typecheck, lint, framework bootstrap, and live cloud pull.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T12:26:38.539Z — VERIFY — ok
    
    By: CODER
    
    Note: Cloud pull Node fetch timeout fix verified with focused tests, typecheck, lint, bootstrap, and live pull.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T12:26:22.169Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605091226-1DH19J/blueprint/resolved-snapshot.json
    - old_digest: b66b9eb8b8de1712464aaa28bafd9de0f4a1e7e1f3ff6ad737b29b426d975cf4
    - current_digest: b66b9eb8b8de1712464aaa28bafd9de0f4a1e7e1f3ff6ad737b29b426d975cf4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091226-1DH19J
    
    ### 2026-05-09T12:29:50.051Z — VERIFY — ok
    
    By: CODER
    
    Note: Cloud pull fetch timeout fix verified after hotspot-safe test split.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T12:26:38.545Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605091226-1DH19J/blueprint/resolved-snapshot.json
    - old_digest: b66b9eb8b8de1712464aaa28bafd9de0f4a1e7e1f3ff6ad737b29b426d975cf4
    - current_digest: b66b9eb8b8de1712464aaa28bafd9de0f4a1e7e1f3ff6ad737b29b426d975cf4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091226-1DH19J
    
    ### 2026-05-09T12:41:04.173Z — VERIFY — ok
    
    By: CODER
    
    Note: Cloud pull timeout fix reverified with targeted backend route, canonical test fix, and live cloud pull before publish.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T12:29:50.061Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend/cloud-backend-utils.test.ts. Result: pass. Evidence: 25 tests passed. Scope: cloud backend timeout/freshness coverage.
    Command: bunx vitest run targeted backend/task CLI suite. Result: pass. Evidence: 19 files, 186 tests passed. Scope: pre-push backend route.
    Command: bun run hotspots:check. Result: pass. Evidence: threshold check passed; oversized test baseline OK. Scope: hotspot budgets.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references.
    Command: bun run lint:core. Result: pass. Evidence: eslint exited 0. Scope: core lint surface.
    Command: bun run framework:dev:bootstrap && ap backend sync cloud --direction pull --conflict=diff --yes. Result: pass. Evidence: cloud pull diff changed=0 ignored_remote_only=0 conflicts=0. Scope: repo-local CLI build and live cloud pull.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605091226-1DH19J/blueprint/resolved-snapshot.json
    - old_digest: b66b9eb8b8de1712464aaa28bafd9de0f4a1e7e1f3ff6ad737b29b426d975cf4
    - current_digest: b66b9eb8b8de1712464aaa28bafd9de0f4a1e7e1f3ff6ad737b29b426d975cf4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091226-1DH19J
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts | Result: pass | Evidence: 25 tests passed, including Node default 10000ms timeout normalization regression. Scope: cloud backend sync behavior.\nCommand: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts.\nCommand: bun run lint:core | Result: pass | Evidence: eslint completed. Scope: repo lint contract.\nCommand: bun run framework:dev:bootstrap && ap backend sync cloud --direction pull --conflict=diff --yes | Result: pass | Evidence: repo-local runtime rebuilt; live pull returned changed=0 ignored_remote_only=0 conflicts=0. Scope: live cloud projection refresh.
      Impact: Node fetch no longer keeps the unsafe 10000ms address-selection attempt timeout that produced UND_ERR_CONNECT_TIMEOUT against sync.agentplane.cloud.
      Resolution: Normalize cloud fetch address-selection attempt timeout to 1000ms and cover both too-low and Node-default cases.
    
    - Observation: Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend/cloud-backend-utils.test.ts | Result: pass | Evidence: 25 tests passed across cloud backend and cloud backend utility suites. Scope: sync behavior and address-selection timeout normalization.\nCommand: bun run hotspots:check | Result: pass | Evidence: cloud-backend.ts is 598 LoC; oversized test baseline remains 10 entries. Scope: hotspot guard.\nCommand: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts.\nCommand: bun run lint:core | Result: pass | Evidence: eslint completed. Scope: repo lint contract.\nCommand: bun run framework:dev:bootstrap && ap backend sync cloud --direction pull --conflict=diff --yes | Result: pass | Evidence: live pull returned changed=0 ignored_remote_only=0 conflicts=0. Scope: live cloud projection refresh.
      Impact: Node fetch no longer keeps the unsafe 10000ms address-selection attempt timeout that produced UND_ERR_CONNECT_TIMEOUT; hotspot guard stays green without reintroducing allow-lists.
      Resolution: Normalize cloud fetch address-selection attempt timeout to 1000ms and move focused utility tests out of the oversized cloud backend suite.
id_source: "generated"
---
