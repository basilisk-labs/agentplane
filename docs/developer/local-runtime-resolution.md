# Deterministic local subprocess runtime

Task: `202608251706-V287W1` (AP-RUNTIME-001).

`packages/agentplane/src/shared/runtime-env.ts` owns local executable discovery.
The runner and declared-check execution paths use the same environment normalization.
Recovery that resumes either path uses the same implementation.

## Resolution order

1. Explicit invocation/profile PATH entries.
2. Explicit absolute `NVM_BIN`, `VOLTA_HOME/bin`, and `BUN_INSTALL/bin` locations.
3. Inherited PATH entries in their original order.
4. The highest executable semantic-version Node installation under `HOME/.nvm/versions/node`.
5. `HOME/.bun/bin` and the running executable directory.

Normalization returns a copy. It does not mutate the parent environment or any authority.
Explicit executable arguments remain unchanged. No per-agent runtime path is required.
Empty manager variables never become implicit working-directory executable candidates.
Discovery rejects non-executable files and ignores relative PATH entries for identity resolution.
An explicit relative executable argument is resolved against the invocation working directory.
Windows executable discovery additionally uses PATHEXT.

## Evidence and failure classification

The runner observes the executable content SHA-256 and a digest of runtime-selection inputs.
The observed runtime is attached to the process-start event and to a required execution-receipt
check. Receipts do not store environment values or use environment data as authorization.
An unreadable executable identity remains unqualified.

Declared checks store runtime identity with their recorded command and outcome.
A missing/inaccessible executable is infrastructure evidence and returns the existing
`unsupported` verification status instead of an implementation-failure verdict.
A real process failure with a resolved runtime remains an implementation check failure.
The shell-check helper exposes `failure_kind: infrastructure` for launch failures.

## Qualification

Existing resolver and direct-verification tests cover override precedence, numeric NVM ordering,
non-executable candidates, missing commands, parent-environment preservation and typed evidence.
`packages/agentplane/src/runner/runtime-env.integration.test.ts` launches actual child processes
with a fixture HOME and reduced PATH. Its executable shim verifies lookup independently of a
machine-specific Bun installation. Standalone and root-referenced invocation identities share
resolution; a profile PATH wins. The test also writes and reads the execution receipt and
checks a genuinely absent executable. The POSIX executable-shim test is skipped on Windows;
portable resolver and receipt tests remain enabled.

Full local CI, evaluator acceptance, exact-head hosted checks and hosted closure remain required.
This change does not install a runtime, change remote/container execution, or publish 0.7.8.
