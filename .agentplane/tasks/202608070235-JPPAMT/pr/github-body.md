Task: `202608070235-JPPAMT`
Title: Restore the release lint baseline
Canonical task record: `.agentplane/tasks/202608070235-JPPAMT/README.md`

## Summary

Restore the release lint baseline

Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.

## Scope

- In scope: Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
- Out of scope: unrelated refactors not required for "Restore the release lint baseline".

## Verification

- State: ok
- Note: Release lint baseline restored with a behavior-preserving String.replaceAll migration.

Command: bunx eslint website/scripts/generate-social-images.mjs
Result: pass
Evidence: targeted ESLint completed with exit code 0
Scope: social image generator lint regression

Command: bun run lint
Result: pass
Evidence: core and website ESLint completed with exit code 0
Scope: complete repository lint surface

Command: bun run docs:social:check
Result: pass
Evidence: checked 226 documentation social images
Scope: generated social preview parity

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style
Scope: repository formatting

Command: bun run typecheck
Result: pass
Evidence: repository TypeScript build completed with exit code 0
Scope: TypeScript contracts
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-07T02:35:47.801Z
- Branch: task/202608070235-JPPAMT/restore-the-release-lint-baseline
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/scripts/generate-social-images.mjs | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
