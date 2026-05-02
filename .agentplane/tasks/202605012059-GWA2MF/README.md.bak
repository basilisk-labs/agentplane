---
id: "202605012059-GWA2MF"
title: "Внедрить CLI performance benchmark framework"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "performance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T21:00:00.632Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T06:51:51.572Z"
  updated_by: "CODER"
  note: "Wall-time process for CLI now includes mandatory team PR local step and before/after report template; baseline thresholds updated and checked."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: внедрить unified CLI performance benchmark framework для оценки refactoring quality до изменения логики команд."
events:
  -
    type: "status"
    at: "2026-05-01T21:00:01.980Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: внедрить unified CLI performance benchmark framework для оценки refactoring quality до изменения логики команд."
  -
    type: "verify"
    at: "2026-05-02T06:51:51.572Z"
    author: "CODER"
    state: "ok"
    note: "Wall-time process for CLI now includes mandatory team PR local step and before/after report template; baseline thresholds updated and checked."
doc_version: 3
doc_updated_at: "2026-05-02T06:51:51.576Z"
doc_updated_by: "ORCHESTRATOR"
description: "Добавить механизмы замера и сравнения производительности CLI для оценки качества рефакторинга, покрыть hot-пути и хранить baseline/трендовые отчёты."
sections:
  Summary: |-
    Внедрить CLI performance benchmark framework
    
    Добавить механизмы замера и сравнения производительности CLI для оценки качества рефакторинга, покрыть hot-пути и хранить baseline/трендовые отчёты.
  Scope: |-
    - In scope: Добавить механизмы замера и сравнения производительности CLI для оценки качества рефакторинга, покрыть hot-пути и хранить baseline/трендовые отчёты.
    - Out of scope: unrelated refactors not required for "Внедрить CLI performance benchmark framework".
  Plan: |-
    1) Определить единый JSON формат метрик и набор сценариев (hot-path + write-path).
    2) Разделить скрипт измерения: runner + конфиг сценариев + единый summary (min/avg/median/p95/stddev).
    3) Ввести baseline/проверочный скрипт с правилами p95/median и delta-риск-логикой для рефакторинга.
    4) Обновить скриптовые команды и `docs/developer/performance-baselines.mdx`, добавить инструкции по локальному/CI сравнению.
    5) Расширить тесты для нового формата и сценариев, прогнать baseline snapshot и smoke-нагрузку.
  Verify Steps: |-
    1. Review the requested outcome for "Внедрить CLI performance benchmark framework". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    bun run bench:cli:time:check --suite cli_walltime_baseline --runs 5 --warmups 1
    
    CLI wall-time baseline OK (quickstart median=179.01ms (threshold=220ms, p95=179.515ms); task_list median=222.731ms (threshold=280ms, p95=224.674ms); task_search median=226.551ms (threshold=290ms, p95=230.09ms); task_next median=221.853ms (threshold=240ms, p95=223.851ms); preflight_quick median=268.291ms (threshold=330ms, p95=268.999ms); help median=180.457ms (threshold=220ms, p95=184.081ms); version median=185.539ms (threshold=220ms, p95=186.81ms))
    
    ### 2026-05-02T06:51:51.572Z — VERIFY — ok
    
    By: CODER
    
    Note: Wall-time process for CLI now includes mandatory team PR local step and before/after report template; baseline thresholds updated and checked.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T21:00:01.980Z, excerpt_hash=sha256:42441bba7a4ab578f388fc7836a06ee99fac7b095d907c248b2654a8846ac7b1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Внедрить CLI performance benchmark framework

Добавить механизмы замера и сравнения производительности CLI для оценки качества рефакторинга, покрыть hot-пути и хранить baseline/трендовые отчёты.

## Scope

- In scope: Добавить механизмы замера и сравнения производительности CLI для оценки качества рефакторинга, покрыть hot-пути и хранить baseline/трендовые отчёты.
- Out of scope: unrelated refactors not required for "Внедрить CLI performance benchmark framework".

## Plan

1) Определить единый JSON формат метрик и набор сценариев (hot-path + write-path).
2) Разделить скрипт измерения: runner + конфиг сценариев + единый summary (min/avg/median/p95/stddev).
3) Ввести baseline/проверочный скрипт с правилами p95/median и delta-риск-логикой для рефакторинга.
4) Обновить скриптовые команды и `docs/developer/performance-baselines.mdx`, добавить инструкции по локальному/CI сравнению.
5) Расширить тесты для нового формата и сценариев, прогнать baseline snapshot и smoke-нагрузку.

## Verify Steps

1. Review the requested outcome for "Внедрить CLI performance benchmark framework". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
bun run bench:cli:time:check --suite cli_walltime_baseline --runs 5 --warmups 1

CLI wall-time baseline OK (quickstart median=179.01ms (threshold=220ms, p95=179.515ms); task_list median=222.731ms (threshold=280ms, p95=224.674ms); task_search median=226.551ms (threshold=290ms, p95=230.09ms); task_next median=221.853ms (threshold=240ms, p95=223.851ms); preflight_quick median=268.291ms (threshold=330ms, p95=268.999ms); help median=180.457ms (threshold=220ms, p95=184.081ms); version median=185.539ms (threshold=220ms, p95=186.81ms))

### 2026-05-02T06:51:51.572Z — VERIFY — ok

By: CODER

Note: Wall-time process for CLI now includes mandatory team PR local step and before/after report template; baseline thresholds updated and checked.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T21:00:01.980Z, excerpt_hash=sha256:42441bba7a4ab578f388fc7836a06ee99fac7b095d907c248b2654a8846ac7b1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
