## Summary

Document prompt fragment contract and naming

Define the canonical prompt fragment naming scheme, marker conventions, mutability rules, and recipe patch semantics for gateway, policy, runner, and agent profile prompts before implementation changes.

## Scope

- In scope: Define the canonical prompt fragment naming scheme, marker conventions, mutability rules, and recipe patch semantics for gateway, policy, runner, and agent profile prompts before implementation changes.
- Out of scope: unrelated refactors not required for "Document prompt fragment contract and naming".

## Verification

- State: ok
- Note: Prompt fragment naming and recipe patch contract documentation is complete; declared docs verification passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T20:28:50.771Z
- Branch: task/202604292023-TV3J9J/prompt-fragment-contract
- Head: 6b7360407cff

```text
 .agentplane/tasks/202604292023-0BQZMA/README.md | 107 +++++++++++++++++++++++
 .agentplane/tasks/202604292023-GHNS95/README.md | 106 +++++++++++++++++++++++
 .agentplane/tasks/202604292023-RSQTPD/README.md | 107 +++++++++++++++++++++++
 .agentplane/tasks/202604292023-W6G3GC/README.md | 109 +++++++++++++++++++++++
 .agentplane/tasks/202604292024-BGZ798/README.md | 110 ++++++++++++++++++++++++
 docs/developer/modular-prompt-assembly.mdx      |  95 ++++++++++++++++++++
 docs/developer/recipes-how-it-works.mdx         |   5 ++
 docs/developer/recipes-spec.mdx                 |  20 +++++
 docs/developer/testing-and-quality.mdx          |   7 ++
 9 files changed, 666 insertions(+)
```

</details>
