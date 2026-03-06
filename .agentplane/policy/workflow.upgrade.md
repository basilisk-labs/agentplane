# Workflow: upgrade

Use this module when task runs `agentplane upgrade` or touches `.agentplane/.upgrade/**`.

## Required sequence

1. Run upgrade command and capture run directory.
2. Read upgrade review report:
   - agent mode: `.agentplane/.upgrade/agent/<runId>/review.json`
   - auto mode: `.agentplane/.upgrade/last-review.json`
3. Apply upgrade as replace-all for managed files (`agentplane upgrade --auto`), excluding task data paths.
4. For `.agentplane/policy/incidents.md`, keep existing local content and append incoming policy content (never replace non-empty local incidents file).
5. Ensure the upgrade produced a dedicated upgrade commit with version in commit message.
6. Verify policy/agent consistency and routing checks.
7. Record run path and reviewed files in task notes.

## Minimum verification

- `node .agentplane/policy/check-routing.mjs`
- `agentplane agents`
