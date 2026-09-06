# Release candidate preparation evidence

## Source and scope

The release plan fixes stable version 0.7.8, previous tag v0.7.7, and base commit `262da3130bc5628a7641c400c74368ae355000bf`. The copied `release-plan-version.json` and `release-plan-changes.json` preserve the native planner inputs. Release notes contain each of the 1,417 planned commit links exactly once and start with two accessible prose paragraphs.

Only existing semantic version surfaces, their generated package reference, release notes, and release-specific qualification artifacts changed. The dependency lockfile is unchanged.

## Baseline and focused checks

- `bun run ci:local:full`: passed on the integrated preparation base before candidate metadata edits. Captured log SHA-256: `b55efb2ccaa9d2611eb07fa1d6973110671a6adfe2d04d9606ebe8fb0ca8d555`.
- `bun run framework:dev:bootstrap`: passed for the 0.7.8 candidate checkout.
- `bun run release:parity`: passed with CLI, core, recipes, internal pins, and recipes runtime at 0.7.8.
- `bun run docs:site:generate:check`: passed; package reference and full LLM document are fresh.
- `node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417`: passed.
- Prettier checks and `git diff --check`: passed for changed product artifacts.

## Preliminary installed upgrade qualification

`node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs` passed before the implementation commit. This is preparation evidence; the native supervisor reruns the declared command against the committed candidate for formal verification. The script uses a published npm 0.7.7 installation and three locally packed 0.7.8 packages in isolated temporary prefixes. It removes those prefixes and fixture repositories after the run.

| Fixture   | Task before and after            | Upgrade commit                             | Checks                                                                       | Repeat apply                            |
| --------- | -------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------- | --------------------------------------- |
| direct    | DOING, same identity and content | `1d587c2b2f91c2bca194455ae0d00dfb709e4c66` | doctor, routing, agents, project sentinel, task brief and next action passed | no additional commit or tracked changes |
| branch_pr | DOING, same identity and content | `68be6a1781791f56b77cf4bf359594d68b485300` | doctor, routing, agents, project sentinel, task brief and next action passed | no additional commit or tracked changes |

The direct fixture retains one worktree. The branch_pr fixture retains its base plus the original active task worktree. Both installed runtimes resolve CLI and core version 0.7.8 outside the framework checkout. Upgrade review reports were read for both fixtures.

## Remaining formal evidence

The declared native checks include canonical prepublish, packed mixed-scope lifecycle, the exact published upgrade script, and release-note validation. Their results must be attached to the committed implementation by AgentPlane. Publication is still pending at this preparation stage and requires integrated main, exact-SHA hosted release-ready evidence, explicit GitHub workflow dispatch, canonical publish-result, and public distribution readback.
