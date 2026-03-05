# Example: Policy Migration Note

- Before: monolithic AGENTS.md mixed policy and procedures.
- After: AGENTS.md routes by trigger to `.agentplane/policy/*.md` modules.
- Compatibility: keep `AGENTS.md` mirrored to `packages/agentplane/assets/AGENTS.md`.
- Enforcement: run `bun run policy:routing:check` in CI.
