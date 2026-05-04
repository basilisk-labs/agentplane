Task: `202605041938-EWDGYZ`
Title: Expose public schemas from root catalog

## Summary

Expose public schemas from root catalog

Make root schemas/ include generated public schema mirrors such as ACR so README and hosted schema paths are discoverable from the repository root.

## Scope

- In scope: Make root schemas/ include generated public schema mirrors such as ACR so README and hosted schema paths are discoverable from the repository root.
- Out of scope: unrelated refactors not required for "Expose public schemas from root catalog".

## Verification

- State: ok
- Note: Command: bun run schemas:check -> pass (schemas OK). Command: bunx prettier --check <changed files> -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: agentplane doctor -> pass with one unrelated warning about two pre-existing shipped open tasks.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T19:49:24.140Z
- Branch: task/202605041938-EWDGYZ/root-schema-catalog
- Head: 916252748ea3

```text
 README.md                                          |   2 +-
 .../agent-change-record-implementation.mdx         |   1 +
 docs/developer/architecture.mdx                    |   4 +-
 .../documentation-information-architecture.mdx     |   2 +-
 docs/developer/project-layout.mdx                  |   2 +
 docs/developer/schema-validation-strategy.mdx      |   2 +-
 docs/help/troubleshooting-by-symptom.mdx           |   2 +-
 docs/help/troubleshooting.mdx                      |   2 +-
 schemas/README.md                                  |  14 +
 schemas/acr-v0.1.schema.json                       | 729 ++++++++++++++++++
 schemas/config.schema.json                         | 837 +++++++++++++++++++++
 schemas/pr-meta.schema.json                        | 143 ++++
 schemas/task-handoff.schema.json                   | 264 +++++++
 schemas/task-readme-frontmatter.schema.json        | 571 ++++++++++++++
 schemas/tasks-export.schema.json                   | 608 +++++++++++++++
 scripts/sync-schemas.mjs                           |  36 +-
 16 files changed, 3188 insertions(+), 31 deletions(-)
```

</details>
