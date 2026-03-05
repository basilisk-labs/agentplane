# Workflow: upgrade

Use this module when task runs `agentplane upgrade` or touches `.agentplane/.upgrade/**`.

## Required sequence

1. Run upgrade command and capture run directory.
2. Read upgrade review report:
   - agent mode: `.agentplane/.upgrade/agent/<runId>/review.json`
   - auto mode: `.agentplane/.upgrade/last-review.json`
3. If any entry has `needsSemanticReview=true`, create executable task owned by `UPGRADER`.
4. In the UPGRADER task, reconcile `AGENTS.md`, `.agentplane/agents/*.json`, and `packages/agentplane/assets/*`.
5. Verify policy/agent consistency and routing checks.
6. Record run path, reviewed files, and decisions in task notes.

## Minimum verification

- `node .agentplane/policy/check-routing.mjs`
- `bun run agents:check`
