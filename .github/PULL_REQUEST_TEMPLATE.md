## Summary

Describe the outcome and why it matters.

## Scope

- In scope:
- Out of scope:

## Verification

### Plan

List verify steps or commands.

```bash
bun run bench:cli:time:check --suite cli_walltime_baseline --runs 5 --warmups 1
```

### Current Status

- State:
- Note:

## Risks

- Risk level:
- Breaking change:

### Rollback

Describe rollback or migration notes.

## Handoff Notes

List reviewer or executor notes that matter for merge.

<details>
<summary>Raw evidence</summary>

- Branch:
- Head:

```text
Diffstat / raw evidence
```
</details>

### Performance before/after wall-time (mandatory for CLI-affecting changes)

Если PR меняет CLI поведение/производительность, приложите:

```bash
# baseline до изменений
bun run bench:cli:time --suite cli_walltime_baseline --runs 5 --warmups 1 > /tmp/cli-before.json

# после изменений
bun run bench:cli:time --suite cli_walltime_baseline --runs 5 --warmups 1 > /tmp/cli-after.json

# сравнение
bun run bench:cli:time:diff -- --before /tmp/cli-before.json --after /tmp/cli-after.json --tolerance 0.05
```

```text
Performance summary:
command: <id>
before_ms: <median_ms>
after_ms: <median_ms>
delta_ms: <delta_ms>
delta_pct: <delta_pct>
status: <ok|regression>
```
