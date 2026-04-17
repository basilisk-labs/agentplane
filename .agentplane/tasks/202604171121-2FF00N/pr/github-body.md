## Summary

Add SKILL_EXTRACTOR agent

Create a new agent profile that mines completed tasks, commits, and incidents into reusable repo-local skills under skills/, then wire it into the bundled agent set and any required guidance surfaces.

## Scope

- In scope: Create a new agent profile that mines completed tasks, commits, and incidents into reusable repo-local skills under skills/, then wire it into the bundled agent set and any required guidance surfaces.
- Out of scope: unrelated refactors not required for "Add SKILL_EXTRACTOR agent".

## Verification

- State: ok
- Note: Command: bun test packages/agentplane/src/agents/agents-template.test.ts; Result: pass; Evidence: 11 tests passed and the repo .agentplane/agents copy stayed in sync with bundled assets after adding SKILL_EXTRACTOR. Scope: bundled/install agent parity and manifest coverage. Command: node packages/agentplane/bin/agentplane.js agents; Result: pass; Evidence: the CLI table now lists SKILL_EXTRACTOR with the expected role text. Scope: installed-agent discovery. Command: node packages/agentplane/bin/agentplane.js role SKILL_EXTRACTOR; Result: pass; Evidence: role output renders the new profile, permissions, and workflow contract without extra CLI code changes. Scope: role guidance usability.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T11:28:56.891Z
- Branch: task/202604171121-2FF00N/skill-extractor
- Head: 1e743a7eba21

```text
 .agentplane/agents/SKILL_EXTRACTOR.json            | 31 ++++++++++++++++++++++
 .../agentplane/assets/agents/SKILL_EXTRACTOR.json  | 31 ++++++++++++++++++++++
 packages/agentplane/assets/framework.manifest.json |  7 +++++
 3 files changed, 69 insertions(+)
```

</details>
