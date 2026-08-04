Task: `202608021232-YCNM1S`
Title: Qualify and publish AgentPlane v0.7.1
Canonical task record: `.agentplane/tasks/202608021232-YCNM1S/README.md`

## Summary

Qualify and publish AgentPlane v0.7.1

Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.

## Scope

- In scope: Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane v0.7.1".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-04T08:36:16.971Z
- Branch: task/202608021232-YCNM1S/qualify-and-publish-agentplane-v0-7-1
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../logs/cli-latency.log                           |   9 -
 .../logs/context-matrix.log                        |   7 -
 .../logs/critical-cli.log                          |  29 --
 .../final-20729a30f-deterministic/logs/doctor.log  |  31 --
 .../logs/full-contract.log                         | 364 ---------------------
 .../logs/hosted-boundary-matrix.log                |   7 -
 .../logs/lifecycle-matrix.log                      |   9 -
 .../logs/matched-cli-latency.log                   |   4 -
 .../logs/packaged-candidate-flow.log               |   5 -
 .../logs/qualification-contract.log                |  34 --
 .../logs/recovery-matrix.log                       |   7 -
 .../logs/release-task-state.log                    |   6 -
 .../logs/supervisor-frontends.log                  |   4 -
 .../logs/supervisor-latency.log                    |   4 -
 .../logs/supervisor-parity.log                     |   9 -
 .../logs/typecheck.log                             |   4 -
 .../logs/workflow-coverage.log                     |  27 --
 .../evidence/final-2da557536/logs/cli-latency.log  |  10 -
 .../final-2da557536/logs/context-matrix.log        |   7 -
 .../evidence/final-2da557536/logs/critical-cli.log |  29 --
 .../evidence/final-2da557536/logs/doctor.log       |  31 --
 .../final-2da557536/logs/full-contract.log         | 364 ---------------------
 .../logs/hosted-boundary-matrix.log                |   7 -
 .../final-2da557536/logs/lifecycle-matrix.log      |   7 -
 .../final-2da557536/logs/matched-cli-latency.log   |   4 -
 .../logs/packaged-candidate-flow.log               |   5 -
 .../logs/qualification-contract.log                |  33 --
 .../final-2da557536/logs/recovery-matrix.log       |   7 -
 .../final-2da557536/logs/release-task-state.log    |   6 -
 .../final-2da557536/logs/supervisor-frontends.log  |   4 -
 .../final-2da557536/logs/supervisor-latency.log    |   4 -
 .../final-2da557536/logs/supervisor-parity.log     |   9 -
 .../evidence/final-2da557536/logs/typecheck.log    |   4 -
 .../final-2da557536/logs/workflow-coverage.log     |  27 --
 .../final-de94bf9d9-gate/logs/cli-latency.log      |  10 -
 .../final-de94bf9d9-gate/logs/context-matrix.log   |   7 -
 .../final-de94bf9d9-gate/logs/critical-cli.log     |  29 --
 .../evidence/final-de94bf9d9-gate/logs/doctor.log  |  31 --
 .../logs/efficiency-evidence.log                   |   4 -
 .../final-de94bf9d9-gate/logs/full-contract.log    | 364 ---------------------
 .../logs/hosted-boundary-matrix.log                |   7 -
 .../final-de94bf9d9-gate/logs/lifecycle-matrix.log |   9 -
 .../logs/matched-cli-latency.log                   |   4 -
 .../logs/packaged-candidate-flow.log               |   5 -
 .../final-de94bf9d9-gate/logs/provider-matrix.log  |   4 -
 .../logs/qualification-contract.log                |  34 --
 .../final-de94bf9d9-gate/logs/recovery-matrix.log  |   7 -
 .../logs/release-task-state.log                    |   6 -
 .../logs/supervisor-frontends.log                  |   4 -
 .../logs/supervisor-latency.log                    |   4 -
 .../logs/supervisor-parity.log                     |   9 -
 .../final-de94bf9d9-gate/logs/typecheck.log        |   4 -
 .../logs/workflow-coverage.log                     |  27 --
 .../logs/matched-cli-latency.log                   |   4 -
 .../logs/supervisor-latency.log                    |   4 -
 docs/releases/v0.7.1.md                            | 337 +++++++++++++++++++
 website/static/img/social/docs/releases/v0.7.1.png | Bin 0 -> 52228 bytes
 website/static/img/social/manifest.json            |   8 +
 58 files changed, 345 insertions(+), 1695 deletions(-)
```

</details>
