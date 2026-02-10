# Critical CLI E2E Tests

These tests are designed to run in a pre-push hook.

Principles:

- Each test creates its own temp workspace root.
- Use real `git` and the real filesystem.
- Run the CLI in a separate process (no in-process `runCli()` import) to catch env/cwd effects.
- Do not depend on developer machine state:
  - isolate `HOME` and `AGENTPLANE_HOME`
  - disable global/system git configs where possible
- No network.
