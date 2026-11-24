Task: `202611242051-2ZYP6J`
Title: Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step
Canonical task record: `.agentplane/tasks/202611242051-2ZYP6J/README.md`

## Summary

Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step

The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync.

## Scope

- In scope: The root postinstall script runs lefthook install on every bun install. It replaces the AgentPlane-managed hook shims in .git/hooks that framework bootstrap installs and treats lefthook hooks as legacy. Run lefthook install from postinstall only when no AgentPlane-managed hook is present, so bun install keeps the active hook owner. Add node:test coverage and keep the scripts README and hook docs in sync.
- Out of scope: unrelated refactors not required for "Keep AgentPlane-managed git hooks when bun install runs the postinstall lefthook step".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-24T20:53:41.621Z
- Branch: task/202611242051-2ZYP6J/keep-agentplane-managed-git-hooks-when-bun-insta
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/code-quality.mdx             |  2 +-
 package.json                                |  2 +-
 scripts/README.md                           |  2 +-
 scripts/workflow/postinstall-hooks.mjs      | 66 +++++++++++++++++++++
 scripts/workflow/postinstall-hooks.test.mjs | 91 +++++++++++++++++++++++++++++
 5 files changed, 160 insertions(+), 3 deletions(-)
```

</details>
