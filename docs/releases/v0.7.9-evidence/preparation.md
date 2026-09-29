# Release candidate preparation evidence

## Source and scope

The release plan fixes stable version 0.7.9, previous tag v0.7.8, and protected base commit `a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270`. The copied `release-plan-version.json` and `release-plan-changes.json` preserve the native planner inputs. Release notes preserve every planned non-merge change as a one-for-one detailed record and add user-facing summaries for the stable release. The synchronized candidate head before preparation is `54a197116f195be3a5ad64bb42e922c0682cebbf`.

The candidate changes only canonical version surfaces, exact internal package pins, generated package references, release headers, release notes, and release evidence. It does not add a semantic source-code change. The source-only `agentplane-roadmap-r2` checkout is not part of this task worktree or candidate.

## Candidate checks

- `bun run release:version:bump -- --version 0.7.9 --write --skip-install --json`: passed; canonical package versions, internal pins, runtime version, expected CLI versions, and ACR example versions now report 0.7.9.
- `bun run release:parity`: passed after stable version preparation.
- `bun run docs:readme-header:generate`: passed and generated 14 headers for v0.7.9.
- `bun run docs:site:generate:check`: passed; generated package reference and `website/static/llms-full.txt` are fresh.
- `bun run docs:social:generate`: passed and generated the complete canonical set of 234 documentation social images.
- `bun run docs:social:check`: passed and verified 236 documentation social images.
- `node scripts/check-release-notes.mjs --tag v0.7.9 --min-bullets 632`: passed.
- `bun run release:check:registry -- --version 0.7.9`: passed; the stable version is available for every public npm package.
- `bun run release:check`: passed on the complete candidate.
- `bun run release:prepublish`: passed on the synchronized candidate.
- Supervisor requalification: every observed prepublish sub-check passed before the original 1,200,000 ms verification budget terminated the wrapper; the approved rerun budget is 3,600,000 ms.
- Supervisor requalification rerun: release-ci-base chunk 56 stopped only after the host reached `No space left on device`; removing 58,256 stale `agentplane-*` test directories restored 26 GiB of free space, and the exact 10-file chunk then passed all 111 tests.
- `git diff --check` and exact scope review: passed on the complete candidate.

## Boundaries

The locally qualified candidate commit is `9cbf8849066f8a3167e17023411642fdc31caa8c`. AgentPlane owns independent evaluation, verification persistence, PR publication, hosted CI, protected integration, and hosted close from this handoff.

Publication is absent from candidate preparation. It requires protected integration, a fresh exact-SHA publish authority grant, the hosted release workflow, canonical `publish-result.json`, and independent distribution readback. Anonymous GHCR availability is recorded separately if the provider does not expose it.
