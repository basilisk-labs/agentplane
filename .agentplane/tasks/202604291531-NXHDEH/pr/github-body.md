## Summary

Adopt runner prompt module bridge

Land the current runner prompt module bridge as the first migration step, preserving RunnerPromptBlock output while introducing stable PromptModule addresses and provenance for runner, gateway, project skill, overlay, and recipe prompt blocks.

## Scope

- In scope: land the compatible runner prompt module bridge from the existing `task/202604291511-R17PSN/modular-runner-prompts` branch or equivalent implementation.
- In scope: preserve current `RunnerPromptBlock[]` bundle shape, ordering, sources, resolution traces, overlay metadata, and cached framework prompt identity.
- In scope: expose bridge helpers for graph roundtrip tests.
- Out of scope: init-time `AGENTS.md`/policy emission, recipe mutation application, public CLI diagnostics.

## Verification

- State: ok
- Note: Post-commit verification reconciled for current HEAD after adding migration task graph docs.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T15:38:46.471Z
- Branch: task/202604291531-NXHDEH/adopt-runner-prompt-bridge
- Head: b7d0abf29898

```text
 .agentplane/tasks/202604290751-CN5HST/README.md    | 144 ++++++++++++++
 .../tasks/202604290751-CN5HST/pr/diffstat.txt      |  12 ++
 .../tasks/202604290751-CN5HST/pr/github-body.md    |  36 ++++
 .../tasks/202604290751-CN5HST/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604290751-CN5HST/pr/meta.json |  20 ++
 .../tasks/202604290751-CN5HST/pr/notes.jsonl       |   0
 .agentplane/tasks/202604290751-CN5HST/pr/review.md |  61 ++++++
 .../tasks/202604290751-CN5HST/pr/verify.log        |   0
 .agentplane/tasks/202604290755-NHPR24/README.md    |  95 +++++++++
 .agentplane/tasks/202604290755-S0G8HZ/README.md    |  96 ++++++++++
 .agentplane/tasks/202604290756-126DF5/README.md    |  95 +++++++++
 .agentplane/tasks/202604290756-B32264/README.md    |  95 +++++++++
 .agentplane/tasks/202604290757-2HVEZV/README.md    |  94 +++++++++
 .agentplane/tasks/202604290757-M3V3RH/README.md    |  95 +++++++++
 .agentplane/tasks/202604290758-SHVVSR/README.md    |  95 +++++++++
 .agentplane/tasks/202604290800-ZP6QVY/README.md    | 146 ++++++++++++++
 .../tasks/202604290800-ZP6QVY/pr/diffstat.txt      |  16 ++
 .../tasks/202604290800-ZP6QVY/pr/github-body.md    |  51 +++++
 .../tasks/202604290800-ZP6QVY/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604290800-ZP6QVY/pr/meta.json |  20 ++
 .../tasks/202604290800-ZP6QVY/pr/notes.jsonl       |   0
 .agentplane/tasks/202604290800-ZP6QVY/pr/review.md |  76 ++++++++
 .../tasks/202604290800-ZP6QVY/pr/verify.log        |   0
 .agentplane/tasks/202604291531-1GHEJZ/README.md    | 115 +++++++++++
 .agentplane/tasks/202604291531-7R6H51/README.md    | 113 +++++++++++
 .agentplane/tasks/202604291531-864BKX/README.md    | 115 +++++++++++
 .agentplane/tasks/202604291531-E8NEFB/README.md    | 117 ++++++++++++
 .agentplane/tasks/202604291531-N0H28A/README.md    | 116 +++++++++++
 .agentplane/tasks/202604291531-Y7XR4M/README.md    | 115 +++++++++++
 .agentplane/tasks/202604291531-Z6XH6Q/README.md    | 114 +++++++++++
 .agentplane/tasks/202604291532-BV5NQT/README.md    | 118 ++++++++++++
 docs/developer/architecture.mdx                    |  12 +-
 docs/developer/framework-refactor-program.mdx      |   2 +-
 docs/developer/harness-engeneering.mdx             |   2 +-
 .../src/runner/context/base-prompts.test.ts        |  39 ++++
 .../agentplane/src/runner/context/base-prompts.ts  |   9 +-
 .../src/runner/context/prompt-module-bridge.ts     | 212 +++++++++++++++++++++
 37 files changed, 2439 insertions(+), 9 deletions(-)
```

</details>
