---
id: "202602070956-RYPQJ5"
title: "Direct mode: легализовать task branches"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T09:58:10.894Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by USER in chat (2026-02-07)."
verification:
  state: "ok"
  updated_at: "2026-02-07T10:23:56.047Z"
  updated_by: "ORCHESTRATOR"
  note: "Tests: bun run test:cli:core"
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Align direct-mode branch policy and CLI guidance with work start behavior; remove contradictions."
events:
  -
    type: "status"
    at: "2026-02-07T09:58:51.252Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Align direct-mode branch policy and CLI guidance with work start behavior; remove contradictions."
  -
    type: "verify"
    at: "2026-02-07T10:23:56.047Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Tests: bun run test:cli:core"
doc_version: 2
doc_updated_at: "2026-02-07T10:23:56.053Z"
doc_updated_by: "ORCHESTRATOR"
description: "Align AGENTS.md and CLI guidance with actual direct-mode work start behavior (branch checkout without worktree). Remove policy/code contradiction; keep semantics explicit to reduce accidental branch switching."
id_source: "generated"
---
## Summary

Устранить противоречие между AGENTS.md (direct mode) и фактическим поведением agentplane work start: легализовать task branches в direct mode и синхронизировать policy/CLI guidance с кодом.

## Scope

- In scope: AGENTS.md direct mode rules; quickstart/role text that describes direct-mode work start; work start behavior in direct mode (docs/branch checkout); tests.
- Out of scope: branch_pr workflow semantics; Redmine sync; release/publish.

## Plan

1) Проверить фактическое поведение agentplane work start в direct (создание/checkout ветки при отсутствии worktree) и точки, где это описано (AGENTS.md, quickstart, role output).
2) Обновить policy (AGENTS.md) и CLI guidance (quickstart/role), чтобы direct mode явно разрешал task branches (без worktree) и описывал ограничения/ожидаемое поведение.
3) При необходимости сделать семантику work start в direct более явной (никаких имплицитных checkout без явного флага) или хотя бы согласовать текстовые подсказки с текущим поведением.
4) Добавить/обновить тесты на direct-mode behavior (work start + docs).
5) Прогнать локальный verify (unit tests) и зафиксировать результаты в Verification.

## Risks

- Риск 1: breaking change для пользователей, которые ожидают имплицитный checkout ветки в direct mode.
- Риск 2: появится третья “правда” (help/quickstart/AGENTS.md), если обновить не все места.
- Риск 3: скрытые сетевые запросы (update-check) во время команд agentplane; снижать через --no-update-check в verify/командах.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T10:23:56.047Z — VERIFY — ok

By: ORCHESTRATOR

Note: Tests: bun run test:cli:core

Details:

- bun run test:cli:core (vitest): PASS\n- Checked policy/code alignment: direct mode allows task branches; --worktree is branch_pr-only.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert commit, созданный для этой задачи, через обычный git revert (или отменить локально до коммита).
- Проверить, что AGENTS.md/quickstart вернулись к предыдущей версии, и что work start поведение/тесты соответствуют.

## Verify Steps

1) pnpm test (или npm test, если pnpm не используется).
2) Дополнительно: node packages/agentplane/bin/agentplane.js --no-update-check task plan approve <id> должен проходить; work start в direct mode должен соответствовать описанию в AGENTS.md/quickstart.
