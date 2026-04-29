## Summary

Compile init gateway and policy from modules

Switch init-time AGENTS.md/CLAUDE.md and .agentplane/policy emission to use the prompt module compiler while preserving byte-for-byte or intentional-equivalent output and upgrade baseline seeding.

## Scope

- In scope: `agentplane init` gateway and `.agentplane/policy/**` emission from compiled PromptModules.
- In scope: policy gateway flavor rendering for `AGENTS.md` and `CLAUDE.md`, workflow-mode filtering, and baseline seeding for installed files.
- Out of scope: agent profile JSON emission and recipe module mutations.

## Verification

- State: ok
- Note: Verified init gateway/policy module compilation: focused init/template/routing tests passed (17 tests), policy:routing:check passed, typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings. Extra touched-file prettier/eslint checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T18:19:40.906Z
- Branch: task/202604291531-E8NEFB/init-gateway-policy-modules
- Head: e7d750da87ea

```text
 .../cli/run-cli/commands/init/steps/apply.test.ts  |  60 ++++++++++
 .../src/cli/run-cli/commands/init/write-agents.ts  | 133 ++++++++++++++++++---
 2 files changed, 179 insertions(+), 14 deletions(-)
```

</details>
