# Semantic quality review: rework

Provenance: evaluator_supplied

Rework: strict proof behavior passes the focused security suite, but the task fails the mandatory hotspot gate it itself regressed.

## Findings
- 5ZKP changes route-decision.ts from 598 to 613 lines and workflow-step.ts from 591 to 610 lines; both now exceed the runtime 600-line gate.
- 5ZKP changes workflow-step.test.ts from 999 to 1003 lines, creating a new oversized-test baseline violation; baseline growth must not be used to accept this regression.
- The task README states the hotspot failure is pre-existing and outside scope, but git history shows 5cae4c51 is the only commit after merge-base that modifies all three threshold-crossing files.
- Focused security behavior is otherwise corroborated: 68 proof and route tests plus 6 CLI-core worktree-runtime tests pass; real XBHBE5/THDN0G remains proof-null and its foreign README is preserved.

## Evidence
- .agentplane/tasks/202607252235-5ZKP6T/README.md
- bun run hotspots:check (failed: route-decision.ts 614 and workflow-step.ts 611 exceed 600; workflow-step.test.ts 1004 exceeds 1000; oversized baseline 11 entries and 12374 lines exceed budgets)
- git merge-base main HEAD = 220c7f110c07a14b2b055003cd338ad4c1c3503e; 5ZKP diff changes route-decision.ts +15, workflow-step.ts +19, workflow-step.test.ts +4
- bunx vitest run provenance suite: 7 passed
- bunx vitest run focused agentplane suite: 61 passed
- bunx vitest run cli-core worktree runtime: 6 passed
- bun run typecheck; bun run lint:core; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check (passed; doctor has only historical warnings)

## Missing Tests
- After refactoring for hotspot limits, rerun hotspots:check and preserve the strict provenance, route, and CLI-core suites.

## Hidden Assumptions
- The prior claim that threshold failures were pre-existing is false; the current task crosses every reported threshold relative to its merge base.

## Residual Risks
- Final path-based unlink remains inherently non-atomic against an external writer after the last revalidation; current contract mitigates by immediate identity and content revalidation but does not claim kernel-atomic compare-and-unlink.
