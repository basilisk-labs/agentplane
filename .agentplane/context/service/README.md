# Context Service Workspace

This directory is reserved for context-owned service state.

The global SQLite projection/cache database lives at `.agentplane/cache.sqlite`.
Context-only runtime directories such as `cache/`, `embeddings/`, and `remotes/`
may be created here by commands as disposable service workspace data.
