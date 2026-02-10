# Agentplane Development Policy

This file defines project-specific development rules for the `agentplane` repository.
It complements `AGENTS.md` and is intended to be applicable to contributors and automation.

## Scope

These rules apply to:

- All code changes under `packages/**`
- All documentation changes under `docs/**`
- All CI/release changes under `.github/**` and `scripts/**`
- All developer tooling configuration under repo root (eslint/prettier/lefthook/etc.)

## Non-Negotiables

1. **English-only.**
   - All user-facing strings, docs, comments, release notes, and task/policy templates must be written in English.
   - CI checks should reject non-English release notes and other user documentation where feasible.
2. **No accidental releases.**
   - Do not publish npm packages or create GitHub releases/tags without an explicit, human-issued command.
   - If something is published by mistake, recovery must prioritize safety and clarity (deprecate, move dist-tags, delete GitHub tags/releases if allowed).
3. **Safety around user data.**
   - Upgrade/init tooling must never overwrite user-owned task data (for example `.agentplane/tasks/**`) or other workspace state.
   - Framework-managed changes must be defined by an explicit allowlist/manifest.
4. **No uncommitted code changes.**
   - Any tracked code changes under `packages/**` must be captured in a git commit as part of a task (no “done” work left as a working tree diff).

## Code Quality Bar

### Required before merging to `main`

- `bun run lint` passes.
- `bun run test:full` passes.
- The change includes tests when behavior changes or a bug is fixed.
- Any CLI UX change updates the relevant help/docs and the help contract tests/snapshots as needed.

### Testing expectations

- Prefer unit tests for pure logic and policy/validation.
- Prefer integration tests for CLI flows that depend on git or filesystem behavior.
- Add regression tests for:
  - bug fixes
  - parsing and CLI surface area changes
  - upgrade safety invariants (deny managed paths that must never be modified)

### Architectural boundaries

Keep the layering constraints consistent with the repo architecture:

- `src/cli/**`:
  - parsing, formatting, exit codes, help rendering
  - must not perform domain side effects directly
- `src/usecases/**`:
  - orchestrates policy checks and side effects via ports
- `src/ports/**`:
  - interfaces only
- `src/adapters/**`:
  - the only place allowed to touch OS/git/network primitives directly

Practical enforcement:

- Avoid importing `fs`, `path`, or git clients outside adapters.
- Use policy engine checks in one place (no duplicated ad-hoc checks in multiple commands).

## CLI Behavior Rules

1. **Help is a contract.**
   - Every command must have accurate, spec-driven help output.
   - If you change flags/args, update the spec and help tests to prevent drift.
2. **Exit codes are consistent.**
   - CLI errors must not hardcode conflicting `exitCode` values.
   - Use a centralized mapping from error code to exit code.
3. **Direct mode is single-stream.**
   - In `workflow_mode=direct`, workflow commands must not create per-task branches by default.
   - Enforce a single active task in one checkout (lock file or equivalent) to prevent accidental parallel work.

## Release and Versioning Policy

### SemVer policy (project-specific)

- Default policy: only **minor** releases are allowed during normal development.
- **Patch** releases are allowed only as explicit hotfix/backport releases and must be documented (reason + risk) in the release notes and release PR/task.
- **Major** releases require an explicit, written approval in the release PR/task and must include:
  - a clear breaking change document
  - a migration plan
  - updated docs that reflect the new major expectations

### Version bump rules

- All published packages in this repo must share the same version:
  - `packages/agentplane/package.json`
  - `packages/core/package.json`
- Release notes are required:
  - `docs/releases/vX.Y.Z.md`
  - must be English and must include meaningful user-facing bullets

### Dist-tags and backports

- If a higher semver has been published, publishing a lower semver later may require explicitly setting an npm dist-tag.
- If you publish a patch on an older minor line after a newer minor exists, you must decide whether it should become `latest`.
  - If it should: publish with `--tag latest`.
  - If it should not: publish with a non-default tag (for example `--tag backport-0.2`).

## Git and Branch Hygiene

- `workflow_mode=direct` is treated as a single-checkout, single-stream workflow.
- Avoid leaving stale local task branches in developer machines.
  - Prefer cleanup tooling where available.
  - Do not rely on branch proliferation for core workflows in direct mode.

## Documentation Rules

- Docs must be accurate with respect to current CLI behavior.
- If behavior changes:
  - update docs and help text
  - add or update tests that validate help output
  - include a release notes bullet if user-visible

## Security and Network Rules

- Network operations must be explicit and gated by config approvals where applicable.
- Any fallback that removes integrity guarantees must be:
  - explicitly gated by a flag
  - clearly warned in output
  - limited to a strict allowlist of safe artifacts

## Required Review Points (Checklist)

Before merging:

- Did we add/update tests for changed behavior?
- Does `agentplane help` (and command help) match the implementation?
- Are exit codes and error codes consistent?
- Is English-only upheld (docs, release notes, user-facing strings)?
- Is the change safe for user workspaces (no writes outside managed allowlists)?
