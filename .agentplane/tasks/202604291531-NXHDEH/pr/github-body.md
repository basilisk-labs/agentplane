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
- Note: Verified: reconciled PR metadata after rebased artifact refresh.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T17:30:04.681Z
- Branch: task/202604291531-NXHDEH/adopt-runner-prompt-bridge
- Head: 27100fdfb1f8

```text
 .agentplane/tasks/202604291531-1GHEJZ/README.md    | 115 +++++++++++
 .agentplane/tasks/202604291531-7R6H51/README.md    | 113 +++++++++++
 .agentplane/tasks/202604291531-864BKX/README.md    | 115 +++++++++++
 .agentplane/tasks/202604291531-E8NEFB/README.md    | 117 ++++++++++++
 .agentplane/tasks/202604291531-N0H28A/README.md    | 116 +++++++++++
 .agentplane/tasks/202604291531-Y7XR4M/README.md    | 115 +++++++++++
 .agentplane/tasks/202604291531-Z6XH6Q/README.md    | 114 +++++++++++
 .agentplane/tasks/202604291532-BV5NQT/README.md    | 118 ++++++++++++
 .../src/runner/context/base-prompts.test.ts        |  39 ++++
 .../agentplane/src/runner/context/base-prompts.ts  |   9 +-
 .../src/runner/context/prompt-module-bridge.ts     | 212 +++++++++++++++++++++
 11 files changed, 1182 insertions(+), 1 deletion(-)
```

</details>
