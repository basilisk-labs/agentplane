# Example: Policy Migration Note

- Before: monolithic gateway file mixed policy and procedures.
- After: policy gateway routes by trigger to explicit canonical modules and one incident log (`.agentplane/policy/incidents.md`).
- Compatibility: keep one canonical template in `packages/agentplane/assets/AGENTS.md`; render to selected gateway file name at install time.
- Enforcement: run `node .agentplane/policy/check-routing.mjs` in CI.
