# workflow-playbooks

Operational playbooks for common Agentplane flows:

- `debug`
- `sync`
- `land`

Each scenario enforces required evidence capture via:

```json
"evidence": { "required": true, "files": ["evidence.json"] }
```

The tool writes `evidence.json` into `AGENTPLANE_STEP_DIR` for every run, including failure paths.
