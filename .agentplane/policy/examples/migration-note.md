# Example: Policy Migration Note

- Before: monolithic AGENTS.md mixed policy and procedures.
- After: AGENTS.md routes by trigger to explicit canonical modules and one incident log (`.agentplane/policy/incidents.md`).
- Compatibility: keep `AGENTS.md` mirrored to `packages/agentplane/assets/AGENTS.md`.
- Enforcement: run `bun run policy:routing:check` in CI.
