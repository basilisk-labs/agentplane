# Branch disposition audit

Audit base: `origin/main` at `3b4ea1fa8e78bf28cd51e6d3fb2eb585533b3a8f`.

Excluded by explicit scope: `origin/agentplane-loops`.

## Release and historical branches

| Branch | Disposition | Evidence |
| --- | --- | --- |
| `origin/0.1` through `origin/0.5` | Historical, no port | All five branches are ancestors of `origin/main` and have zero patch-unique commits. |
| `origin/task-close/202606081820-XZFZBD/0b33a0fa905f-publish` | Historical, no port | Zero patch-unique commits versus `origin/main`. |
| `origin/task-close/202606191443-4TV0GC/bbbaf605e276-publish` | Historical, no port | Zero patch-unique commits versus `origin/main`. |
| `origin/task/202606032154-9DX697/handle-blocked-runner-manifests-without-internal` | Superseded, no port | Zero patch-unique commits versus `origin/main`. |
| `origin/task/202606040619-JYCTPN/patch-release` | Evidence-only, no port | The only patch-unique commit records obsolete v0.6.16 evaluator artifacts. |
| `origin/task/202607221908-0JP0ZZ/qualify-the-agentplane-0-7-0-beta-2-milestone` | Evidence-only, no port | The only patch-unique commit refreshes artifacts for an abandoned beta.2 qualification task. |
| `origin/codex/open-pr-assimilation-2026-06-03` | Historical report, no port | Its report listed PRs 4409, 4414, 4420, 4422, 4424, and 4425; all are now merged into `main`. |

## v0.6.26 maintenance line

`v0.6.26` and `v0.7.0` diverge from merge base `30f62b82dff28909dcb3ccc2ace2bf3e356203bb`; `v0.6.26` is not an ancestor of `v0.7.0`. The maintenance line contains 18 non-release-artifact implementation commits grouped below.

| Maintenance change | Disposition in v0.7 | Evidence |
| --- | --- | --- |
| JBHKDW argv-safe direct closeout | Deliberately superseded | v0.6.26 synthesizes a semantic `--result`; v0.7 requires the agent to own the semantic completion result. The worktree-resume route is already present and exercised by this task's route. |
| SWF2VC large verification output and streaming | Already present | Current `pr-meta/verify-log.ts` and integration verification use bounded streaming/tail capture and large-output handling. |
| ST7XZY state-neutral direct routing and stale pre-merge closure rejection | Already present | Current typed route emits `agent.direct_verification`; current cleanup/route tests reject stale closure evidence. |
| YT435C verify environment and runtime-provenance isolation | Already present | Current verification process uses the isolated proof/runtime environment contract. |
| B67DP1 immutable integration head | Already present | Current finalization resolves diffstat and integration evidence from the immutable branch head. |
| 773BXT cleanup race tolerance | Ported | A stale worktree hint may remove only the atomically SHA-bound branch; the hinted directory is preserved. Without `expectedHeadSha`, cleanup still fails closed. |

## Stale task PR branches

| Branch / PR | Disposition | Evidence |
| --- | --- | --- |
| `origin/task/202607252218-XBHBE5/...` / #4623 | Superseded | KnowledgeRef incident archival already landed through task `202607270445-Y3V80T`. |
| `origin/task/202607252223-THDN0G/...` / #4626 | Ported compatibly | Command-scoped branch inventory memoization, bounded `task active` fan-out, and read-only runner inspection were adapted to current v0.7. |
| `origin/task/202607252235-5ZKP6T/...` / #4625 | Ported compatibly | Worktree materialization no longer copies foreign task READMEs; historical replicas receive provenance-gated, revalidated deterministic repair. |
| `origin/task/202607260005-EMP7RC/...` / #4628 | Ported compatibly | Provider-rebased cleanup now requires canonical commit objects, symmetric patch proof, closure coverage, and provider-snapshot revalidation while preserving later v0.7 authority-tail and GitHub update-head handling. |
| `origin/task/202607291650-R1N8C5/...` / #4673 | Superseded | Current `gitRefreshBranchTrackingRef` and branch-publication coverage implement the constrained-refspec repair with later v0.7 safeguards. |
| `origin/task/202607300641-72A55V/...` / #4683 | Superseded | RF-04 archival already landed through task `202607300654-0ANCWF`. |

## Dependency branches

Dependency updates are not maintenance correctness fixes and are not mixed into this compatibility task.

| Branch / PR | Disposition | Current blocker |
| --- | --- | --- |
| `origin/dependabot/github_actions/github-actions-640176b5ab` / #4529 | Defer to a dependency task | Major `actions/checkout` update; branch is behind current `main`. |
| `origin/dependabot/bun/eslint-plugin-unicorn-68.0.0` / #4531 | Defer and regenerate | Conflicts with current `main`; includes compatibility exceptions tied to the stale dependency graph. |
| `origin/dependabot/bun/types/node-26.0.0` / #4532 | Defer to a dependency task | Major type-surface update; branch is behind current `main`. |
| `origin/dependabot/bun/website/typescript-7.0.2` / #4586 | Do not port into v0.7.1 | Docs check fails. v0.7 intentionally uses TypeScript 7 for the native maintainer check while retaining TypeScript 6 for compiler-API and website compatibility. |
| `origin/dependabot/bun/root-dependencies-b84a880bf4` / #4594 | Do not port while red | Current run fails `verify-contract`, `verify-cli-critical`, and aggregate PR verification. |
| `origin/dependabot/bun/website/website-dependencies-9b1a7d9f78` / #4640 | Defer while red | Docs check fails on the branch. |

## Result

Every non-main remote branch in scope has an explicit disposition. Missing correctness behavior is confined to THDN0G, 5ZKP6T, EMP7RC, and the SHA-bound subset of 773BXT; those changes are implemented in this task. No stale branch is merged wholesale.

## Verification contract observations

- Declared Verify Step 1 uses `bun test` for a mixed set that includes the existing Vitest-only `finalize.test.ts` (`vi.hoisted` is unavailable in Bun's test runner). The unchanged five-file set passes through the repository's configured Vitest runner: 5 files, 58 tests. The Bun runner completed 52 tests before reaching that incompatible existing file.
- Declared Verify Step 3 names the absent `test:cli:critical` script. The repository's canonical `test:critical` route passes all 12 chunks and 79 tests.
- `ap doctor` completes with zero errors. Its four warnings describe pre-existing base-branch lifecycle normalization/archive debt outside this task; none names this task or an assimilated implementation path.
