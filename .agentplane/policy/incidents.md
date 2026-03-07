# Policy Incidents Log

This is the single file for incident-derived and situational policy rules.

## Entry contract

- Add entries append-only.
- Every entry MUST include: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`.
- `rule` MUST be concrete and testable (`MUST` / `MUST NOT`).
- `state` values: `open`, `stabilized`, `promoted`.

## Entry template

- id: `INC-YYYYMMDD-NN`
- date: `YYYY-MM-DD`
- scope: `<affected scope>`
- failure: `<observed failure mode>`
- rule: `<new or refined MUST/MUST NOT>`
- evidence: `<task ids / logs / links>`
- enforcement: `<CI|test|lint|script|manual>`
- state: `<open|stabilized|promoted>`

<!-- example:start
- id: INC-20260305-01
- date: 2026-03-05
- scope: commit-msg hook in repo development mode
- failure: commit-msg rejected valid commits because stale-dist check blocked src_dirty/git_head_changed
- rule: commit-msg MUST validate subject semantics and MUST NOT block on stale dist freshness checks
- evidence: task 20260305-HOOKS-FIX, commit 9fe55c73
- enforcement: test + hook script
- state: open
example:end -->

## Entries

- id: INC-20260308-01
  date: 2026-03-08
  scope: framework checkout runtime selection
  failure: PATH-launched global agentplane kept executing the installed CLI inside the framework repo, creating runtime drift against the current checkout
  rule: Inside a framework checkout, the wrapper MUST hand off to the repo-local binary by default; using the global binary there MUST require explicit opt-out
  evidence: tasks 202603071647-M0Q79C, 202603071647-Y4BZ1T, 202603071647-25WS52; commits 093183c0, ec5b7b41, f4c55030
  enforcement: wrapper tests + docs
  state: promoted

- id: INC-20260308-02
  date: 2026-03-08
  scope: stale-dist freshness and diagnostics
  failure: stale-dist checks blocked read-only diagnostics on dirty runtime paths even after a local rebuild because freshness was keyed to git dirtiness instead of the built source snapshot
  rule: Stale-dist freshness MUST compare the current watched-runtime snapshot against the build-manifest snapshot; read-only diagnostics MUST warn-and-run instead of hard-failing
  evidence: tasks 202603072032-2M0V8V, 202603072032-1BC7VQ, 202603072032-V9VGT2, 202603072032-4D9ASG; commits 0c259fa8, 30e9ba26, 4771172d, cc2b4a20
  enforcement: dist-guard tests + build manifest snapshotting + docs
  state: promoted

- id: INC-20260308-03
  date: 2026-03-08
  scope: direct finish task closure
  failure: finishing a direct-mode task updated task README metadata and left tracked drift in the working tree unless a follow-up close commit was added manually
  rule: In workflow_mode=direct, finish MUST create the deterministic close commit by default so task README metadata does not leave tracked drift
  evidence: task 202603070958-W769HC; commit f09e4c50
  enforcement: finish command tests + docs
  state: promoted

- id: INC-20260308-04
  date: 2026-03-08
  scope: legacy project upgrade and managed policy tree recovery
  failure: partially upgraded projects could keep a new gateway but miss required managed policy files after stale or manual upgrade flows, making the repo state hybrid and confusing
  rule: Upgrade MUST apply managed framework files by default, and doctor MUST diagnose a missing managed policy tree with an explicit recovery action
  evidence: tasks 202603070958-FBM32H, 202603070958-VNGEEN; commits c37b59a0, ebb2bd84
  enforcement: upgrade tests + doctor diagnostics + docs
  state: promoted

- id: INC-20260308-05
  date: 2026-03-08
  scope: release preflight against burned npm versions
  failure: release publication attempted to reuse an npm version that had already been burned, which cannot be republished even after unpublish
  rule: Release preflight MUST fail before local release apply when the target npm version is already burned or otherwise not publishable
  evidence: task 202603071710-PQVS2V; commit d5961272
  enforcement: release preflight checks + tests
  state: promoted

- id: INC-20260308-06
  date: 2026-03-08
  scope: release-generated docs synchronization
  failure: release apply could bump versions and complete the local release path while leaving generated reference docs dirty afterward
  rule: Release apply MUST regenerate and stage version-sensitive generated docs after version bump and before the release commit/tag is finalized
  evidence: task 202603071745-T3QE04; commit 41b3e1ae
  enforcement: release apply tests + docs
  state: promoted
