Task: `202611241717-AH4MKJ`
Title: Verify only git-reported changed files in repo-local CLI dist freshness guard
Canonical task record: `.agentplane/tasks/202611241717-AH4MKJ/README.md`

## Summary

Verify only git-reported changed files in repo-local CLI dist freshness guard

In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.

## Scope

- In scope: In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.
- Out of scope: unrelated refactors not required for "Verify only git-reported changed files in repo-local CLI dist freshness guard".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-24T17:24:39.893Z
- Branch: task/202611241717-AH4MKJ/verify-only-git-reported-changed-files-in-repo-l
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/bin/dist-guard.js          |  69 ++++++++++++++--
 packages/agentplane/src/cli/dist-guard.test.ts | 107 +++++++++++++++++++++++++
 2 files changed, 170 insertions(+), 6 deletions(-)
```

</details>
