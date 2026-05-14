---
id: "202605141638-3VAJ2V"
title: "Finish shared guard and sleep deduplication"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:41:03.645Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T18:02:06.777Z"
  updated_by: "CODER"
  note: "Guard/sleep dedup verified: local isRecord definitions in packages/agentplane/src were migrated to shared/guards except the approved RawFrontmatter narrowing guard, integrate queue now imports shared sleep, and guards:check enforces the definition allowlist in ci:contract. Checks: guards:check passed; agentplane typecheck passed; targeted eslint passed; policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Finishing shared guard and sleep deduplication inside the approved v0.6 audit follow-up batch worktree, including a guardrail against new local copies."
events:
  -
    type: "status"
    at: "2026-05-14T17:36:40.244Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Finishing shared guard and sleep deduplication inside the approved v0.6 audit follow-up batch worktree, including a guardrail against new local copies."
  -
    type: "verify"
    at: "2026-05-14T18:02:06.777Z"
    author: "CODER"
    state: "ok"
    note: "Guard/sleep dedup verified: local isRecord definitions in packages/agentplane/src were migrated to shared/guards except the approved RawFrontmatter narrowing guard, integrate queue now imports shared sleep, and guards:check enforces the definition allowlist in ci:contract. Checks: guards:check passed; agentplane typecheck passed; targeted eslint passed; policy routing passed."
doc_version: 3
doc_updated_at: "2026-05-14T18:02:06.790Z"
doc_updated_by: "CODER"
description: "Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules."
sections:
  Summary: |-
    Finish shared guard and sleep deduplication

    Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.
  Scope: |-
    - In scope: Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.
    - Out of scope: unrelated refactors not required for "Finish shared guard and sleep deduplication".
  Plan: "Finish utility dedup governance. Scope: migrate remaining local isRecord definitions in packages/agentplane/src where canonical imports are straightforward, replace integrate queue local sleep with shared concurrency helper, and add a lint/check guard against new local isRecord copies except approved canonical modules. Out of scope: packages/core and packages/recipes canonical guard design changes."
  Verify Steps: "1. Run a guard command that counts local isRecord definitions in packages/agentplane/src and fails on newly introduced non-canonical copies. 2. Run targeted tests or typecheck covering migrated modules. 3. Run bun run lint:core -- changed guard/refactor files. 4. Run node .agentplane/policy/check-routing.mjs. 5. Document any intentionally retained local guard wrappers in task Findings."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T18:02:06.777Z — VERIFY — ok

    By: CODER

    Note: Guard/sleep dedup verified: local isRecord definitions in packages/agentplane/src were migrated to shared/guards except the approved RawFrontmatter narrowing guard, integrate queue now imports shared sleep, and guards:check enforces the definition allowlist in ci:contract. Checks: guards:check passed; agentplane typecheck passed; targeted eslint passed; policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:40.244Z, excerpt_hash=sha256:59129b15d0e444e13372402ef5158a465af15fd376c1c5211495f376c1e8f952

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-3VAJ2V/blueprint/resolved-snapshot.json
    - old_digest: ba5296eac66a68178ec30d77108caae8690384666bba1d5f4181e6fdf90de7c2
    - current_digest: ba5296eac66a68178ec30d77108caae8690384666bba1d5f4181e6fdf90de7c2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141638-3VAJ2V

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Intentionally retained local guard: packages/agentplane/src/evaluators/catalog.ts narrows to RawFrontmatter, not a plain Record.
      Impact: Prevents new plain isRecord copies and closes the missed integrate-queue sleep duplication.
      Resolution: Added scripts/checks/check-shared-guards.mjs, package guards:check, CI hook-in, and migrated straightforward guard imports.
id_source: "generated"
---
## Summary

Finish shared guard and sleep deduplication

Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.

## Scope

- In scope: Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.
- Out of scope: unrelated refactors not required for "Finish shared guard and sleep deduplication".

## Plan

Finish utility dedup governance. Scope: migrate remaining local isRecord definitions in packages/agentplane/src where canonical imports are straightforward, replace integrate queue local sleep with shared concurrency helper, and add a lint/check guard against new local isRecord copies except approved canonical modules. Out of scope: packages/core and packages/recipes canonical guard design changes.

## Verify Steps

1. Run a guard command that counts local isRecord definitions in packages/agentplane/src and fails on newly introduced non-canonical copies. 2. Run targeted tests or typecheck covering migrated modules. 3. Run bun run lint:core -- changed guard/refactor files. 4. Run node .agentplane/policy/check-routing.mjs. 5. Document any intentionally retained local guard wrappers in task Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T18:02:06.777Z — VERIFY — ok

By: CODER

Note: Guard/sleep dedup verified: local isRecord definitions in packages/agentplane/src were migrated to shared/guards except the approved RawFrontmatter narrowing guard, integrate queue now imports shared sleep, and guards:check enforces the definition allowlist in ci:contract. Checks: guards:check passed; agentplane typecheck passed; targeted eslint passed; policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:40.244Z, excerpt_hash=sha256:59129b15d0e444e13372402ef5158a465af15fd376c1c5211495f376c1e8f952

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-3VAJ2V/blueprint/resolved-snapshot.json
- old_digest: ba5296eac66a68178ec30d77108caae8690384666bba1d5f4181e6fdf90de7c2
- current_digest: ba5296eac66a68178ec30d77108caae8690384666bba1d5f4181e6fdf90de7c2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141638-3VAJ2V

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Intentionally retained local guard: packages/agentplane/src/evaluators/catalog.ts narrows to RawFrontmatter, not a plain Record.
  Impact: Prevents new plain isRecord copies and closes the missed integrate-queue sleep duplication.
  Resolution: Added scripts/checks/check-shared-guards.mjs, package guards:check, CI hook-in, and migrated straightforward guard imports.
