Task: `202607221846-SXJ75T`
Title: Capture 0.6.24 compatibility and agent-efficiency baselines
Canonical task record: `.agentplane/tasks/202607221846-SXJ75T/README.md`

## Summary

Capture 0.6.24 compatibility and agent-efficiency baselines

RF-04: freeze the pre-refactor public contract and measure agent cognitive, token, orchestration, latency, and evidence-provenance costs on deterministic golden scenarios.

## Scope

- In scope: deterministic golden scenarios for direct, branch_pr, context assimilation, stale state, approvals, missing knowledge, evaluator rework, scope violation, adapter failure, and one-step Hermes supervision; normalized CLI/schema/package/engine snapshots; runner token, byte, episode, lifecycle-call, latency, rework, and observed-versus-claimed evidence metrics.
- Out of scope: changing production behavior or declaring improvement from token count alone.

## Verification

- State: ok
- Note:

```text
Commit 08ff471fb. Baseline: published v0.6.24 tag 30f62b82 and task-parent main 1a702e160. Method:
deterministic Git-derived compatibility snapshot plus 10 RF-04 scenarios with provenance-aware
structural, quality, safety, timing, token, retrieval, and evidence cells. Runs: compatibility 2/2
byte-identical SHA-256 29fa03085735dd881e7f2101a84766169c43f1397fd3fff1134a61fe30ff913b; efficiency
2/2 byte-identical raw measurement SHA-256
2debb54bab58acd9180ae424fc5f945ab9deadcb2635de8919979b2148a58286; structural SHA-256
a9b855c5887f697c21690d7386c627c555f8d46d7b083cab8c54636411e47351. Threshold: exact compatibility;
10% structural-cost ratchet only at equivalent quality/safety; latency diagnostic. Verdict: local
pass. Quality: targeted critical 6/6, typecheck, formatting, ESLint, workflow/route, architecture
and repository guards pass; broad Node-runnable Vitest 2177/2186 pass, with all 9 failures caused by
missing Bun.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T21:05:12.077Z
- Branch: task/202607221846-SXJ75T/capture-0-6-24-compatibility-and-agent-efficienc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |   11 +
 .github/workflows/prepublish.yml                   |    7 +
 docs/internal/v0.7-agent-efficiency-baseline.md    |  137 +
 package.json                                       |    6 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  373 ++
 scripts/README.md                                  |   60 +-
 .../baselines/agent-efficiency-pre-v0.7-main.json  | 1924 +++++++++
 .../baselines/v0.6.24-compatibility-contract.json  | 4444 ++++++++++++++++++++
 scripts/bench/agent-efficiency-fixtures.json       |  306 ++
 scripts/bench/capture-compatibility-contract.mjs   |  201 +
 scripts/bench/measure-agent-efficiency.mjs         |   98 +
 scripts/checks/check-agent-efficiency-baseline.mjs |  283 ++
 .../check-compatibility-contract-baseline.mjs      |  305 ++
 scripts/lib/agent-efficiency-baseline.mjs          | 1140 +++++
 scripts/lib/compatibility-contract.mjs             |  851 ++++
 scripts/lib/package-tarball-policy.mjs             |   87 +
 scripts/release/check-package-tarball.mjs          |   63 +-
 17 files changed, 10214 insertions(+), 82 deletions(-)
```

</details>
