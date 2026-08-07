Task: `202608061742-G2ZA4T`
Title: Redesign init around safe defaults and progressive disclosure
Canonical task record: `.agentplane/tasks/202608061742-G2ZA4T/README.md`

## Summary

Redesign init around safe defaults and progressive disclosure

Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.

## Scope

- In scope: Replace the long upfront questionnaire with a short user-first init path that detects repository defaults, asks only decisions that materially change policy or workflow, provides an advanced configuration path, and prints a first-task next step.
- Out of scope: unrelated refactors not required for "Redesign init around safe defaults and progressive disclosure".

## Verification

- State: ok
- Note:

```text
Progressive init is verified with concrete local evidence across behavior, onboarding, generated
help, types, and routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T23:24:02.615Z
- Branch: task/202608061742-G2ZA4T/redesign-init-around-safe-defaults-and-progressi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202608061646-30TKV4/README.md    | 869 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 596 ++++++++++++++
 .../tasks/202608061646-30TKV4/pr/diffstat.txt      |  14 +
 .../tasks/202608061646-30TKV4/pr/github-body.md    |  51 ++
 .../tasks/202608061646-30TKV4/pr/github-title.txt  |   1 +
 .agentplane/tasks/202608061646-30TKV4/pr/meta.json |  24 +
 .agentplane/tasks/202608061646-30TKV4/pr/review.md |  49 ++
 .../evaluator-episode.json                         |  42 +
 .../evaluator-evidence-manifest.json               |  55 ++
 .../evaluator-follow-up.json                       |  38 +
 .../evaluator-opinion.md                           |  28 +
 .../evaluator-result.json                          |  48 ++
 .../evaluator-work-order.json                      | 111 +++
 .../quality-report.json                            |  35 +
 .../evaluator-evidence-manifest.json               |  55 ++
 .../evaluator-work-order.json                      | 113 +++
 .../evaluator-episode.json                         |  42 +
 .../evaluator-evidence-manifest.json               |  55 ++
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-result.json                          |  23 +
 .../evaluator-work-order.json                      | 113 +++
 .../quality-report.json                            |  21 +
 .../evaluator-episode.json                         |  42 +
 .../evaluator-evidence-manifest.json               |  55 ++
 .../evaluator-follow-up.json                       |  49 ++
 .../evaluator-opinion.md                           |  26 +
 .../evaluator-result.json                          |  58 ++
 .../evaluator-work-order.json                      | 113 +++
 .../quality-report.json                            |  33 +
 .../evaluator-episode.json                         |  42 +
 .../evaluator-evidence-manifest.json               |  55 ++
 .../evaluator-follow-up.json                       |  28 +
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-result.json                          |  33 +
 .../evaluator-work-order.json                      | 113 +++
 .../quality-report.json                            |  28 +
 .../evaluator-episode.json                         |  42 +
 .../evaluator-evidence-manifest.json               |  55 ++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-result.json                          |  26 +
 .../evaluator-work-order.json                      | 113 +++
 .../quality-report.json                            |  22 +
 ...3aaf8e7662593dd31a6302ae4ad8add25fcf455349.json | Bin 0 -> 1298 bytes
 ...8e793a685c7755b05c5b282a955d3d9071108dad0a.json | Bin 0 -> 1141 bytes
 ...8cb8cbc402d18fb41a738304a7cbae8616f732ad1.patch | Bin 0 -> 65076 bytes
 ...e9cf6a04d6d108a140fb15dc1a773a2e5c309bd591e6.md | Bin 0 -> 5030 bytes
 ...32d050c22a335492decec015c807fb273c428f729.patch | Bin 0 -> 62507 bytes
 ...0ac83290977a16fdf6a35d74fe3f0c781f5388ee6d.json | Bin 0 -> 16067 bytes
 ...730dee176c4789604a56feeb6ee7852737416f132.patch | Bin 0 -> 44113 bytes
 ...cb30da75e6ea60ae230404761417cab8340a07000d.json | Bin 0 -> 1165 bytes
 ...a01d1287c7fc8a8d4a030b4c888ab7f43d88e9717a.json | Bin 0 -> 1105 bytes
 ...f82d247554ad0947d935144919b8eecde8ac56c3e3.json | Bin 0 -> 1124 bytes
 ...358d360264a85ee905be64a8723bbdd4ca71e02d4a.json | Bin 0 -> 3478 bytes
 ...55a8e7053c5aeaa2e472319c930d7ef873b4f2603bae.md | Bin 0 -> 5030 bytes
 ...fd792077f9f6f0c8428ac5663b73fc8547041a6fdda9.md | Bin 0 -> 5030 bytes
 ...ab515862696169490e862ea5f5db6c659c46a024c2f9.md | Bin 0 -> 5030 bytes
 ...4097f6c8dc524659f1968fb0a20b5c8a6df501f38.patch | Bin 0 -> 62251 bytes
 ...6ce9895dadc52f2cbc8b357d2cfecc8a3890ea40fb99.md | Bin 0 -> 5030 bytes
 ...170b9a0ef7999010897132c16afc96098a7ca686009e.md | Bin 0 -> 5030 bytes
 .../20260806195317361-b18111f72a312cf9.json        |  15 +
 .../20260806200209449-a03aef059064a503.json        |  15 +
 .../20260806235416823-b6355c5c52208ecf.json        |  15 +
 .../20260806235616032-e77244303af23abc.json        |  15 +
 .../20260807000019724-a1dd7242eb62686b.json        |  15 +
 docs/user/cli-reference.generated.mdx              |  91 +--
 docs/user/setup.mdx                                |  53 +-
 packages/agentplane/src/cli/command-invocations.ts |   1 +
 .../src/cli/run-cli.core.init.interactive.test.ts  | 115 ++-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  43 +-
 .../src/cli/run-cli.core.route-decision.test.ts    |   8 +
 .../src/cli/run-cli.core.task-run.test.ts          | 112 +--
 .../src/cli/run-cli.core.tasks.create.test.ts      | 282 +++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   9 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/cli/run-cli/commands/init/answers.ts       | 173 +++-
 .../cli/run-cli/commands/init/execution.test.ts    |   1 +
 .../src/cli/run-cli/commands/init/execution.ts     |   4 +
 .../src/cli/run-cli/commands/init/init-plan.ts     |   7 +-
 .../src/cli/run-cli/commands/init/model.ts         |   1 +
 .../src/cli/run-cli/commands/init/modes.ts         |   9 +-
 .../src/cli/run-cli/commands/init/orchestrate.ts   |  24 +-
 .../src/cli/run-cli/commands/init/spec.ts          |   7 +-
 .../cli/run-cli/commands/init/steps/contracts.ts   |   6 +-
 .../src/cli/run-cli/commands/init/steps/index.ts   |   2 +
 .../cli/run-cli/commands/init/steps/init-mode.ts   |  34 +
 .../commands/init/steps/prompt-steps.test.ts       |  32 +-
 .../src/cli/run-cli/commands/init/steps/tool.ts    |  37 +
 .../cli/run-cli/commands/init/steps/workflow.ts    |   9 +-
 .../agentplane/src/cli/run-cli/commands/init/ui.ts |   9 +-
 .../agentplane/src/commands/task/create.command.ts | 409 ++++++++++
 packages/agentplane/src/commands/task/new.ts       | 333 ++++----
 .../agentplane/src/commands/task/run-render.ts     | 122 ++-
 .../agentplane/src/commands/task/run.command.ts    |   6 +-
 .../agentplane/src/commands/task/status.command.ts |  13 +-
 .../agentplane/src/commands/task/task.command.ts   |  10 +-
 95 files changed, 5059 insertions(+), 360 deletions(-)
```

</details>
