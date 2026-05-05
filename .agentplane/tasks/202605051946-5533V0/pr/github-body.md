Task: `202605051946-5533V0`
Title: Draft v0.5 blueprint and recipe roadmaps

## Summary

Draft v0.5 blueprint and recipe roadmaps

Create a temporary roadmap document that captures recipe work needed for v0.5 and the blueprint roadmap to v0.5 without changing the canonical roadmap.

## Scope

- In scope: Create a temporary roadmap document that captures recipe work needed for v0.5 and the blueprint roadmap to v0.5 without changing the canonical roadmap.
- Out of scope: unrelated refactors not required for "Draft v0.5 blueprint and recipe roadmaps".

## Verification

- State: ok
- Note: Created temporary v0.5 planning document at .agentplane/tmp/roadmaps/v0.5-blueprints-and-recipes.md with recipe and blueprint epics, atomic tasks, acceptance criteria, PR sequence, minimum v0.5 bar, and deferred scope. Rechecked after task plan alignment. Checks passed: bunx prettier --check target markdown files; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T19:50:49.033Z
- Branch: task/202605051946-5533V0/v05-roadmaps
- Head: d99a99e264b6

```text
 .agentplane/tasks/202605051928-26C18X/README.md    | 117 +++++++++
 .../tasks/202605051928-26C18X/pr/diffstat.txt      |   6 +
 .../tasks/202605051928-26C18X/pr/github-body.md    |  41 ++++
 .../tasks/202605051928-26C18X/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605051928-26C18X/pr/meta.json |  14 ++
 .../tasks/202605051928-26C18X/pr/notes.jsonl       |   0
 .agentplane/tasks/202605051928-26C18X/pr/review.md |  62 +++++
 .../tasks/202605051928-26C18X/pr/verify.log        |   0
 .../tmp/roadmaps/v0.5-blueprints-and-recipes.md    | 264 +++++++++++++++++++++
 packages/agentplane/src/blueprints/explain.ts      |  63 +++++
 packages/agentplane/src/blueprints/index.ts        |  14 ++
 packages/agentplane/src/blueprints/model.ts        |  98 ++++++++
 packages/agentplane/src/blueprints/resolve.test.ts | 130 ++++++++++
 packages/agentplane/src/blueprints/resolve.ts      | 244 +++++++++++++++++++
 14 files changed, 1054 insertions(+)
```

</details>
