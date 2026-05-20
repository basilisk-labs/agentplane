Task: `202605201202-KMFQJ8`
Title: Require root glossary for maximum assimilation
Canonical task record: `.agentplane/tasks/202605201202-KMFQJ8/README.md`

## Summary

Require root glossary for maximum assimilation

Update maximum-assimilation context mode so the canonical glossary is created or maintained as a separate root file, with generated guidance, blueprint evidence, docs, and focused tests aligned.

## Scope

- In scope: Update maximum-assimilation context mode so the canonical glossary is created or maintained as a separate root file, with generated guidance, blueprint evidence, docs, and focused tests aligned.
- Out of scope: unrelated refactors not required for "Require root glossary for maximum assimilation".

## Verification

- State: ok
- Note:

```text
Quality gate passed for maximum-assimilation root glossary scope. Evidence: diff limits changes to
blueprint evidence/stop rule, generated init and ingest guidance, user docs, and focused tests; root
glossary path is now asserted as context/wiki/glossary.md; glossary remains navigation/alias layer
rather than semantic source of truth; focused tests, prettier, eslint, policy routing, doctor, and
diff whitespace checks passed. Residual risk: runtime still enforces glossary content through
workflow contract and review gates, not a parser for glossary file contents.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T12:09:26.911Z
- Branch: task/202605201202-KMFQJ8/root-glossary
- Head: df88340d7aad

```text
 docs/user/local-context.mdx                                   | 10 +++++++---
 .../agentplane/src/blueprints/context-maximum-assimilation.ts |  8 +++++++-
 packages/agentplane/src/blueprints/validate.test.ts           |  4 ++++
 packages/agentplane/src/commands/context/init.ts              | 11 ++++++++---
 .../agentplane/src/commands/context/release-readiness.test.ts |  9 +++++++++
 packages/agentplane/src/context/ingest-task.ts                |  8 ++++++--
 6 files changed, 41 insertions(+), 9 deletions(-)
```

</details>
