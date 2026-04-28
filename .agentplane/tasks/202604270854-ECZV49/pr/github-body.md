## Summary

Normalize remaining direct stdio output surfaces

Replace high-value direct stdout/stderr writes with the shared CLI emitter or structured output helpers in lifecycle-adjacent commands, starting from resume context, upgrade, doctor, hook, and task command surfaces.

## Scope

- In scope: Replace high-value direct stdout/stderr writes with the shared CLI emitter or structured output helpers in lifecycle-adjacent commands, starting from resume context, upgrade, doctor, hook, and task command surfaces.
- Out of scope: unrelated refactors not required for "Normalize remaining direct stdio output surfaces".

## Verification

- State: ok
- Note: Command: bun run lint:core; Result: pass. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; Result: pass, 2 files and 43 tests. Command: bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts; Result: pass, 1 file and 16 tests. Command: bun run typecheck; Result: pass. Command: git diff --check; Result: pass. Scope: resume-context output now routes through shared CLI emitter; close-shared async lint regression fixed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T06:44:30.032Z
- Branch: task/202604270854-ECZV49/normalize-resume-context-output
- Head: 1508e5567601

```text
No changes detected.
```

</details>
