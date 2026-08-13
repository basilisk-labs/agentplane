# Incident closeout source evidence

Captured for the exact incident-archive implementation `d0135b104218422ca56f064389bb3d56f5e3bf76`.

## INC-20260810-01 — declared-check validation and execution parity

- Canonical fix task: `.agentplane/tasks/202608111922-W4ZM7J/README.md`; tracked state is `DONE`.
- Implementation commit: `656f84c44be81e48d339bf5b15db9ccfce221a03`; the task's final semantic review records `pass` for this formatting-only child of the fully reviewed implementation.
- Hosted integration: PR `#4825`, <https://github.com/basilisk-labs/agentplane/pull/4825>, merged on 2026-08-11 as `206b349e8dd08051f695d68f8558db94b2e23cb5`.
- Hosted result: PR verification, verify-static, verify-tests, Windows, security, CodeQL, and hosted-close all concluded successfully.
- Current-main enforcement: `packages/agentplane/src/commands/shared/declared-check.test.ts` and `packages/agentplane/src/commands/task/direct-task-verification.test.ts` pass as part of the 37-test closeout regression set.

## INC-20260811-01 — RF-04 shared-worktree dependency seed

- Canonical fix task: `.agentplane/tasks/202608102115-7XGP97/README.md`; tracked state is `DONE`.
- Implementation commit: `7a12d1e8484b01172c5f6e0875519beec4c7c6a6`; the commit is reachable from the merged task history.
- Hosted integration: PR `#4824`, <https://github.com/basilisk-labs/agentplane/pull/4824>, merged on 2026-08-11 as `95308cce1419451193d18ce55c4b1e18a3a3ace5`.
- Hosted result: PR verification, verify-static, verify-tests, package runtime, Windows, security, CodeQL, and hosted-close all concluded successfully.
- Current-main enforcement: `packages/agentplane/src/commands/release/shared-worktree-dependency-manifest.test.ts` passes as part of the 37-test closeout regression set.

## Release-qualification hardening

- Canonical optimization task: `.agentplane/tasks/202608112259-T3ZDDM/README.md`; tracked state is `DONE`.
- Hosted integration: PR `#4830`, <https://github.com/basilisk-labs/agentplane/pull/4830>, merged on 2026-08-13 as `89dfabe89424ae6b69911a7174b9876f2713f24e`.
- Exact hosted results: Core CI `31715693508` succeeded on merge `89dfabe89424ae6b69911a7174b9876f2713f24e`; closure reuse run `31714796502` succeeded; PR verification and hosted-close concluded successfully.
- Provider qualification: the final report recorded `18 passed`, `1 advisory`, and `0 blocking` findings with `release_ready=true` and `local_ready=true`. The only non-pass item was the absolute CLI latency advisory; the matched-baseline CLI latency gate passed and superseded it. Provider evidence passed with 54.91% token reduction, verified success increasing from 8 to 19, scope violations decreasing from 17 to 5, and all approval checks preserved.
- Final task quality: `.agentplane/tasks/202608112259-T3ZDDM/quality/20260813-151544510-recovery-context/quality-report.json` records `pass` for the final implementation review.

## Closeout checks

- `bun run format:check`: pass on the complete repository.
- Focused current-main regressions: 37 passed, 0 failed across declared-check parsing, direct verification, and RF-04 shared-worktree dependency discovery.
- `node .agentplane/policy/check-routing.mjs`: pass.
- `bun run release:incidents:check`: pass with zero active incidents after this archive change.
- Both corrected archived SHA values resolve to commits in the complete repository.
- No remaining engineering or operator action is recorded by the three completed tasks or their hosted closeout. The active registry is empty, so these two resolved incident classes no longer block patch release planning.
