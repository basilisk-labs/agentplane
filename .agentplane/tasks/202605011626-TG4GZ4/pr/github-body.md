## Summary

Add Homebrew tap publication module

Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.

## Scope

- In scope: Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.
- Out of scope: unrelated refactors not required for "Add Homebrew tap publication module".

## Verification

- State: ok
- Note: Homebrew tap module verified: release:homebrew:check passed; release:distribution:check passed; workflows:command-check passed; docs:scripts:check passed; publish workflow contract test passed; lint:core passed; targeted Prettier check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T17:13:16.665Z
- Branch: task/202605011626-TG4GZ4/homebrew-tap-publication
- Head: 91fb43545abd

```text
 .github/workflows/publish.yml                      |  14 ++
 package.json                                       |   1 +
 .../release/publish-workflow-contract.test.ts      |   4 +
 scripts/README.md                                  |   1 +
 scripts/render-homebrew-formula.mjs                | 154 +++++++++++++++++++++
 5 files changed, 174 insertions(+)
```

</details>
