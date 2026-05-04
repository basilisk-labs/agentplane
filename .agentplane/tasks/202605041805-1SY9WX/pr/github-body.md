Task: `202605041805-1SY9WX`
Title: Add experimental ap agent mode

## Summary

Add experimental ap agent mode

Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.

## Scope

- In scope: Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.
- Out of scope: unrelated refactors not required for "Add experimental ap agent mode".

## Verification

- State: ok
- Note: Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.test.ts -t 'experimental ap|ap init' | Result: pass | Evidence: 3 ap tests passed; compact help, shorthand expansion, non-interactive init structured error covered. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts | Result: pass | Evidence: 3 installed smoke tests passed, including experimental ap entrypoint. Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Command: bun run framework:dev:bootstrap | Result: pass | Evidence: core, agentplane, and testkit built; repo-local runtime ready. Command: node packages/agentplane/bin/ap.js next --help | Result: pass | Evidence: compact task next help printed without Examples section. Command: bun run package:tarball:check | Result: pass | Evidence: package tarball policy OK; agentplane=48 files including bin/ap.js. Command: bun run package:install-smoke | Result: pass | Evidence: local tarball install smoke OK and exercised ap. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with informational runtime handoff entries only. Observation: full run-cli.core.test.ts was also attempted and failed in two broad existing cases before command execution (schema validation fixture and last-known-good fixture); targeted ap cases passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T18:05:43.955Z
- Branch: task/202605041805-1SY9WX/ap-agent-mode
- Head: 4e774ca2e754

```text
No changes detected.
```

</details>
