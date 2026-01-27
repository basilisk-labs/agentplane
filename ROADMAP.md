# Roadmap: AgentPlane (Node.js) — трансформация Python-фреймворка в универсальный CLI

Обновлено: 2026-01-27  
Цель v1: выпустить глобально устанавливаемый CLI `agentplane` (Node.js 20 LTS+, TypeScript + ESM), который **полностью заменяет** текущий Python `agentctl` по функциональности и при этом поддерживает **опциональные расширения через рецепты**.

---

## 0) Зафиксированные решения v1

- Полная замена `agentctl`: задачи / git workflow / PR артефакты / integrate / finish / guard / hooks / verify / upgrade / IDE entrypoints / backends / recipes.
- `agentplane init`:
  - интерактивный по умолчанию;
  - должен поддерживать non‑TTY режим через флаги;
  - offline‑first (без сети).
- Сеть только явными командами:
  - `agentplane upgrade` — обновление шаблонов/встроенных ресурсов из GitHub.
  - `agentplane recipe list-remote|install` — работа с удалённым каталогом рецептов.
- Каталог проекта: строго `.agentplane` (breaking change). Никакой совместимости/детекта `.agent-plane`.
- ОС: официально macOS + Linux (Windows — вне v1).
- Установка CLI: `npx agentplane …` и `npm i -g agentplane`.
- `init` безопасный: не перезаписывать по умолчанию; список конфликтов; `--force` и `--backup`.

---

## 1) Архитектура v1

### 1.1. Разделение «движок» vs «рецепты»

**Базовый движок (core)** обязан уметь:

- управлять задачами (локальное хранение + экспорт `tasks.json`);
- выполнять полный workflow (`task/branch/work/pr/integrate/finish/verify/guard/hooks`);
- поддерживать backends (как минимум `local` + `redmine` для parity);
- генерировать IDE entrypoints из `AGENTS.md`;
- управлять рецептами: устанавливать/удалять/листать/показывать детали/кэшировать remote‑каталог.

**Рецепты (recipes)** — это контентные расширения, устанавливаемые в проект по запросу:

- дополнительные агенты (`agents/`);
- инструменты (`tools/`) — самодостаточные скрипты;
- сценарии (`scenarios/`) — описания узкоспециализированных процедур «агент + инструменты»;
- манифест с кратким и расширенным описанием (для минимизации контекста при старте).

Движок должен работать без установленных рецептов.

### 1.2. Выбор и переключение режима workflow

Режимы:

- `direct`
- `branch_pr`

Выбор делается в `agentplane init`, но пользователь должен иметь возможность сменить режим позже:

- `agentplane mode set direct|branch_pr`
- без потери данных/артефактов и без «сломанных» guardrails.

---

## 2) Каноническая структура проекта (после init)

Минимум (ядро):

```
AGENTS.md
.agentplane/
  config.json
  agents/              # базовые агенты (ORCHESTRATOR + default set)
  tasks/
    <task-id>/README.md
  tasks.json
  backends/
    local/backend.json
  cache/
```

Опционально (устанавливается рецептами):

- `.agentplane/recipes/…`
- `.agentplane/backends/redmine/backend.json`
- `.agentplane/viewer/…` (если viewer реализован как рецепт)

---

## 3) Спецификация рецептов v1

### 3.1. Формат рецепта (архив)

Рецепт — архив (`.zip` или `.tar.gz`) со структурой:

```
manifest.json
agents/        # опционально
tools/         # опционально
scenarios/     # опционально
assets/        # опционально (например, HTML/шаблоны/статические файлы)
README.md      # опционально
```

### 3.2. Манифест `manifest.json` (рекомендуемая схема)

Минимальные поля:

- `schema_version`: `"1"`
- `id`: `"viewer"`, `"redmine"`, `"qa-pack"` …
- `version`: `"1.2.0"`
- `name`: человекочитаемое имя
- `summary`: короткое описание (ограничить длину; используется в «коротком списке»)
- `description`: расширенное описание (для `recipe info`)
- `agents`: массив описаний агентов (id, display_name, file)
- `tools`: массив описаний инструментов (id, runtime, entrypoint, summary, permissions)
- `scenarios`: массив описаний сценариев (id, summary, steps)

Рецепт может быть «конфиг‑рецептом» (только добавляет конфиги/агентов/сценарии без инструментов).

### 3.3. Команды recipes (публичный CLI)

Минимальный набор v1:

- `agentplane recipe list` — локально установленные рецепты (коротко)
- `agentplane recipe info <id>` — расширенное описание (агенты/инструменты/сценарии)
- `agentplane recipe install <url|id>` — установка:
  - по URL на архив
  - по `id` из remote‑каталога
  - из локального пути (offline)
- `agentplane recipe remove <id>`
- `agentplane recipe list-remote` — список доступных рецептов из remote‑каталога (кэшируемый)

Дополнительно (желательно v1):

- `agentplane recipe pin <id>@<version>` (или lockfile) для воспроизводимости
- `agentplane recipe refresh` — обновить кэш remote‑каталога

### 3.4. Минимизация контекста для агентов

При старте/после установки рецептов CLI генерирует файл индекса, который можно безопасно включать в контекст:

- `.agentplane/RECIPES.md` — **краткий список**: id + summary + “какую проблему решает”
- Детали по конкретному рецепту не включаются автоматически; доступны через:
  - `agentplane recipe info <id>`
  - (опционально) `.agentplane/recipes/<id>/manifest.json`

---

## 4) Remote‑хостинг рецептов (оптимально для старта)

**Выбор для v1: GitHub репозиторий + Releases + index.json.**  
Причины: версионирование, доступность, простая доставка архивов, возможность проверок целостности.

### 4.1. Предлагаемая структура репозитория `agentplane-recipes` (отдельный репо)

```
agentplane-recipes/
  README.md
  index.json                 # каталог доступных рецептов (id → versions → url/checksum)
  schemas/
    recipe-manifest.schema.json
    recipes-index.schema.json
  recipes/
    viewer/
      manifest.json
      agents/
      tools/
      scenarios/
      assets/
    redmine/
      manifest.json
      agents/
      tools/
      scenarios/
  scripts/
    build-release.ts          # сборка архивов рецептов + обновление index.json
  .github/workflows/
    release.yml               # публикует архивы в GitHub Releases и обновляет index.json
```

`index.json` содержит:

- список рецептов,
- версии,
- URL на release‑asset,
- `sha256`,
- `min_agentplane_version`,
- теги.

CLI `recipe list-remote` читает `index.json` по фиксированному URL (configurable).

---

## 5) План работ v1: последовательные атомизированные задачи

Ниже — линейный список задач в порядке зависимости.  
Формат: **AP-XXX** — задача, **Зависимости**, **Описание**, **DoD** (definition of done).

### AP-001 Зафиксировать публичный CLI-API v1 (команды/неймспейсы/алиасы)

**Зависимости:** —  
**Описание:**

- Утвердить команды (включая `recipe`, `mode`, `ide`, `backend`).
- Разрулить коллизию `sync`:
  - принять модель: `agentplane ide sync` (IDE entrypoints) и `agentplane backend sync <id>` (backends).
- Зафиксировать стабильные exit codes + базовый формат `--json` ошибок.  
  **DoD:**
- Документ `docs/cli-contract.md` с таблицей команд, флагов, кодов ошибок.

### AP-002 Зафиксировать файловые форматы v1 (tasks/exports/config/PR meta)

**Зависимости:** AP-001  
**Описание:**

- Формально описать:
  - `AGENTS.md` (контракт и секции),
  - `.agentplane/config.json` (schema_version, workflow_mode, paths, commit_policy, verify_policy),
  - формат task README (frontmatter + секции + doc metadata),
  - `tasks.json` (export schema + checksum canonicalization),
  - PR артефакты (`.agentplane/pr/...` если используются).  
    **DoD:**
- Пакет JSON-схем в `packages/spec/` + примеры.

### AP-003 Зафиксировать спецификацию рецепта v1 (manifest/schema/команды)

**Зависимости:** AP-001  
**Описание:**

- Утвердить:
  - структуру архива,
  - `manifest.json` schema v1,
  - lockfile (если нужен в v1),
  - список CLI команд recipes.  
    **DoD:**
- `schemas/recipe-manifest.schema.json` и `docs/recipes-spec.md`.

### AP-004 Создать Node/TS монорепо и сборку CLI (ESM, node20)

**Зависимости:** AP-001  
**Описание:**

- Репо-структура:
  - `packages/agentplane` (CLI),
  - `packages/core` (движок),
  - `packages/recipes` (менеджер рецептов + runner),
  - `packages/spec` (типы/схемы),
  - `packages/testkit` (фикстуры, e2e).
- Сборка `dist/`, бинарь `agentplane`.  
  **DoD:**
- `npx agentplane --help` работает; CI на macOS+Linux.

### AP-005 Реализовать обнаружение проекта и резолвер путей `.agentplane`

**Зависимости:** AP-004  
**Описание:**

- Определять git root.
- Резолвить `.agentplane` и конфиги из любой подпапки.
- `--root` override.  
  **DoD:**
- Библиотека `core/projectRoot` + тесты.

### AP-006 Реализовать конфигурацию проекта (`config.json`) + валидацию

**Зависимости:** AP-005, AP-002  
**Описание:**

- Чтение/запись, default values, schema validation.
- `agentplane config show|set`.  
  **DoD:**
- `agentplane config show` печатает валидный JSON; unit tests.

### AP-007 Реализовать workflow mode как часть config + команду переключения

**Зависимости:** AP-006  
**Описание:**

- `workflow_mode: direct|branch_pr`.
- `agentplane mode get|set <mode>`.
- При смене режима:
  - обновить guard/hook политики,
  - проверить наличие/игнорирование worktrees,
  - не терять данные задач.  
    **DoD:**
- `mode set` меняет поведение guardrails и workflow; e2e тест.

### AP-008 Перенести parser/writer frontmatter (byte-stable where required)

**Зависимости:** AP-002, AP-004  
**Описание:**

- Парсинг/рендер YAML frontmatter в README задач.
- Стабильные правила:
  - quoting,
  - порядок ключей (если фиксирован),
  - списки/словари в inline формате (как в Python).  
    **DoD:**
- Golden tests на фикстурах из Python-репо.

### AP-009 Реализовать локальный backend задач (CRUD + поиск + статусы)

**Зависимости:** AP-008, AP-006  
**Описание:**

- `task new|add|update|list|show|search|set-status|comment`.
- Обновление README + метаданные dirty/updated.
- Поддержка owners/agents mapping.  
  **DoD:**
- E2E: init → task new → task show → task list.

### AP-010 Реализовать doc metadata enforcement для README задач

**Зависимости:** AP-009  
**Описание:**

- Требовать поля:
  - `doc_version=2`,
  - `doc_updated_at`,
  - `doc_updated_by`.
- Запрет «ручной правки без обновления метадаты» через guard/lint (опционально) + `task doc set`.  
  **DoD:**
- `task doc set` обновляет метадату; lint ловит нарушения.

### AP-011 Реализовать export `.agentplane/tasks.json` + sha256 checksum canonicalization

**Зависимости:** AP-009, AP-002  
**Описание:**

- Генерация снапшота `tasks.json` со стабильным порядком и checksum.
- Явно определить canonical JSON (например: sorted keys, UTF-8,
  , без лишних пробелов).  
  **DoD:**
- Golden tests: Node export совпадает с эталоном (или с новой спецификацией).

### AP-012 Реализовать `task lint` (invariants сверх схемы)

**Зависимости:** AP-011  
**Описание:**

- Проверки:
  - DONE должен иметь commit hash+message,
  - owner должен существовать,
  - verify обязателен для заданных tags,
  - cycles в deps,
  - checksum соответствует содержимому.  
    **DoD:**
- Набор тестовых кейсов на валид/инвалид.

### AP-013 Реализовать base branch pinning (git config `agentplane.baseBranch`)

**Зависимости:** AP-005  
**Описание:**

- Читать/писать `agentplane.baseBranch`.
- Default: `main` (или выбор init).
- Команда: `agentplane branch base get|set`.  
  **DoD:**
- В новом репо base branch фиксируется; используется в workflow.

### AP-014 Реализовать commit policy: task suffix matching + запрет generic messages

**Зависимости:** AP-006, AP-013  
**Описание:**

- Извлечение `task_suffix` (последний сегмент после `-`).
- Проверка: subject содержит suffix (и/или полный id).
- `commit_generic_tokens` (из config) — запрет «слишком общих» коммитов.  
  **DoD:**
- Unit tests + интеграционный тест с `git commit --message`.

### AP-015 Реализовать `guard` по staged paths (allow/deny + suggest-allow)

**Зависимости:** AP-005, AP-006  
**Описание:**

- Правила staged файлов:
  - что можно коммитить в direct/branch_pr,
  - защита `.agentplane/tasks.json` и task README от «неправильных» веток/режимов.
- `guard suggest-allow` генерирует подсказку allowlist.  
  **DoD:**
- E2E: staged forbidden → guard fail; allowed → pass.

### AP-016 Реализовать git hooks install/uninstall (commit-msg, pre-commit, pre-push)

**Зависимости:** AP-014, AP-015  
**Описание:**

- Интерактивная установка в init и команда `agentplane hooks install`.
- Idempotent и безопасно:
  - не затирать чужие хуки без явного подтверждения,
  - поддержка shim-стратегии для `npx` (локальный wrapper в `.agentplane/bin/agentplane`).
- Поддержка env флагов:
  - `AGENT_PLANE_TASK_ID`, `AGENT_PLANE_ALLOW_TASKS`, `AGENT_PLANE_ALLOW_BASE`.  
    **DoD:**
- Hooks реально блокируют плохие коммиты в чистом repo.

### AP-017 Реализовать `commit` как обёртку (guard + policy + convenience)

**Зависимости:** AP-016  
**Описание:**

- `agentplane commit` выполняет:
  - guard staged files,
  - проверку commit subject,
  - поддержку `--confirm-*` политик.  
    **DoD:**
- `agentplane commit` заменяет ручной flow в документации.

### AP-018 Реализовать comment-driven commits и `status_commit_policy`

**Зависимости:** AP-009, AP-017  
**Описание:**

- Флаги:
  - `--commit-from-comment`
  - `--status-commit`
  - `--confirm-status-commit` (если policy = confirm)
- Нормализация текста comment → commit subject.  
  **DoD:**
- Тест: `start --commit-from-comment` создаёт корректный коммит и меняет статус.

### AP-019 Реализовать `start|block|finish` parity (direct mode)

**Зависимости:** AP-018  
**Описание:**

- `start`: статус IN_PROGRESS + comment.
- `block`: BLOCKED + comment.
- `finish`: DONE + commit metadata.
- Привязка к current task context (env/task id).  
  **DoD:**
- E2E в direct: task new → start → finish → export → lint passes.

### AP-020 Реализовать worktrees и `work start` (branch_pr mode)

**Зависимости:** AP-007, AP-013  
**Описание:**

- Создание ветки `task/<id>/<slug>`.
- Worktree в `.agentplane/worktrees/`.
- Авто‑игнор `.agentplane/worktrees` (gitignore или info/exclude).  
  **DoD:**
- E2E: `mode set branch_pr` → `work start` создаёт ветку+worktree.

### AP-021 Реализовать PR артефакты: `pr open|update|check|note`

**Зависимости:** AP-020, AP-002  
**Описание:**

- Генерация PR шаблонов (описание, чеклист).
- `pr update` обновляет auto‑summary блок:
  - `<!-- BEGIN AUTO SUMMARY -->` / `<!-- END AUTO SUMMARY -->`
- `pr check` валидирует полноту артефактов и verify requirements.  
  **DoD:**
- E2E: PR артефакты создаются и валидируются.

### AP-022 Реализовать `verify` parity (log + skip-if-unchanged + meta)

**Зависимости:** AP-021, AP-009  
**Описание:**

- `verify --skip-if-unchanged` (по last_verified_sha).
- Логи в PR артефакты (например `pr/verify.log`).
- Обновление `pr/meta.json` (timestamps, sha).  
  **DoD:**
- Повторный verify без изменений пропускается корректно.

### AP-023 Реализовать `integrate` (branch_pr) с моделью closure commit

**Зависимости:** AP-021, AP-022, AP-015  
**Описание:**

- Разделить:
  - merge изменений из task-ветки,
  - “closure commit” на base branch (обновление `tasks.json`, статусы, мета).
- Строгие правила:
  - запрет `tasks.json` на task‑ветке,
  - запрет коммита кода на base branch,
  - allow env‑флаги для интегратора.  
    **DoD:**
- E2E: work start → PR update/check → verify → integrate → finish.

### AP-024 Реализовать `cleanup` (worktrees/ветки/артефакты)

**Зависимости:** AP-023  
**Описание:**

- Удаление worktree, закрытие ветки, опциональная архивация артефактов.
- Безопасные проверки (не удалить base).  
  **DoD:**
- Команда освобождает ресурсы без потери истории.

### AP-025 Реализовать IDE entrypoints генерацию из `AGENTS.md`

**Зависимости:** AP-002  
**Описание:**

- `agentplane ide sync`:
  - Cursor → `.cursor/rules/*.mdc` (autogenerated)
  - Windsurf → `.windsurf/rules/*.md` (autogenerated)
- Идемпотентность и запрет ручного редактирования (header).  
  **DoD:**
- Файлы генерятся и обновляются без дрейфа.

### AP-026 Реализовать `agentplane init` (интерактивный диалог + non‑TTY флаги)

**Зависимости:** AP-004, AP-006, AP-007, AP-016, AP-025  
**Описание:**

- Диалог:
  - выбор IDE,
  - выбор workflow mode (direct/branch_pr),
  - выбор установки git hooks,
  - выбор установки опциональных рецептов (из встроенного каталога; без сети).
- non‑TTY:
  - `--ide`, `--workflow`, `--hooks`, `--recipes`, `--yes`.  
    **DoD:**
- `npx agentplane init` создаёт рабочий проект без сети.

### AP-027 Реализовать конфликт‑safe init (`--force`, `--backup`, список конфликтов)

**Зависимости:** AP-026  
**Описание:**

- При существующих файлах:
  - default: не трогать,
  - `--force`: перезапись,
  - `--backup`: `.bak.<timestamp>`.  
    **DoD:**
- Никаких silent overwrite.

### AP-028 Реализовать `agentplane upgrade` (GitHub source, dry-run, backup)

**Зависимости:** AP-026  
**Описание:**

- Сеть только здесь:
  - скачивание bundle шаблонов из GitHub (tagged release),
  - проверка целостности (sha256),
  - `--dry-run` diff,
  - backup по умолчанию.
- Обновляет: шаблоны (AGENTS, default agents, configs) и встроенный каталог рецептов (см. AP-033).  
  **DoD:**
- Upgrade воспроизводим и безопасен.

### AP-029 Реализовать базовый менеджер рецептов: install/remove/list/info (локально)

**Зависимости:** AP-003, AP-006  
**Описание:**

- Установка архива в `.agentplane/recipes/<id>/<version>/`.
- Ведение `recipes.lock.json` (id, version, sha256, source).
- `recipe list` печатает кратко (id, version, summary).  
  **DoD:**
- Offline install из локального файла работает.

### AP-030 Реализовать генерацию `.agentplane/RECIPES.md` (краткий индекс)

**Зависимости:** AP-029  
**Описание:**

- После install/remove обновлять файл индекса.
- Индекс содержит только summary, чтобы минимизировать контекст.  
  **DoD:**
- `recipe list` и файл индекса совпадают по данным.

### AP-031 Реализовать `recipe list-remote` + кэш каталога

**Зависимости:** AP-029  
**Описание:**

- Скачивание `index.json` из remote (см. AP-034).
- Кэш в `.agentplane/cache/recipes-index.json` + timestamps.
- Флаг `--refresh`.  
  **DoD:**
- Без сети: команда даёт понятную ошибку; с сетью: печатает список.

### AP-032 Реализовать `recipe install <id>` через remote‑каталог

**Зависимости:** AP-031  
**Описание:**

- `install viewer`:
  - найти в index.json latest совместимую версию,
  - скачать архив,
  - проверить sha256,
  - установить.  
    **DoD:**
- E2E: list-remote → install by id → list shows installed.

### AP-033 Встроенный (offline) каталог «официальных» рецептов для init

**Зависимости:** AP-029, AP-026  
**Описание:**

- В npm пакет `agentplane` встраивается snapshot каталога официальных рецептов:
  - список рецептов + локальные архивы (минимальный набор: viewer, redmine-enable).
- `init` показывает только этот встроенный каталог (offline).  
  **DoD:**
- `init` может установить viewer/redmine без сети.

### AP-034 Создать отдельный репозиторий `agentplane-recipes` и pipeline релизов

**Зависимости:** AP-003  
**Описание:**

- Скелет репо по структуре раздела 4.1.
- Скрипт сборки архивов + генерация `index.json`.
- GitHub Actions: publish release assets + обновить index.  
  **DoD:**
- Один тестовый релиз с 1–2 рецептами и валидным index.json.

### AP-035 Реализовать “рецепт‑применение” к проекту (копирование агентов/конфигов)

**Зависимости:** AP-029  
**Описание:**

- При установке рецепта:
  - агенты из `agents/` добавляются в `.agentplane/agents/` (с namespace/коллизиями),
  - assets складываются в `.agentplane/recipes/<id>/...`,
  - сценарии регистрируются (см. AP-036),
  - инструменты доступны через runner (см. AP-037).  
    **DoD:**
- Конфликт имён обрабатывается предсказуемо (fail/rename/override по флагу).

### AP-036 Реализовать модель сценариев (описание + вывод “как запустить”)

**Зависимости:** AP-003, AP-035  
**Описание:**

- Парсинг `scenarios/*.json` (или yaml) по schema v1.
- `agentplane scenario list` и `agentplane scenario info <recipe:scenario>`.
- В v1 сценарий может быть “описательным” (необязательно исполняемым), но должен иметь:
  - цель,
  - входы/выходы,
  - шаги (tools/agent).  
    **DoD:**
- CLI показывает сценарии без выполнения.

### AP-037 Реализовать runner инструментов (tools) для сценариев (минимальный)

**Зависимости:** AP-035  
**Описание:**

- Исполнение tools с runtime:
  - `node` (ESM),
  - `bash` (posix).
- Ограничения безопасности v1:
  - явный allowlist доступа (fs/network) только декларативно в манифесте + предупреждения (без sandbox).
- Логи и артефакты исполнения в `.agentplane/recipes/<id>/runs/...`.  
  **DoD:**
- Один эталонный tool запускается из сценария и производит артефакт.

### AP-038 Перенести/реализовать viewer как рецепт (опционально)

**Зависимости:** AP-033, AP-037  
**Описание:**

- Рецепт `viewer`:
  - `assets/tasks.html`,
  - `tools/viewer-server` (поднимает локальный сервер),
  - сценарий “Просмотр задач”.
- Команда‑алиас (если нужно): `agentplane viewer` вызывает recipe tool при наличии.  
  **DoD:**
- После установки viewer работает локально.

### AP-039 Реализовать Redmine backend parity (как встроенный backend + enable-рецепт)

**Зависимости:** AP-009, AP-028, AP-033  
**Описание:**

- Backend `redmine` реализуется в core для parity.
- Enable через рецепт `redmine`:
  - добавляет `backends/redmine/backend.json` шаблон,
  - добавляет redmine‑агентов/сценарии.
- Зафиксировать `.env` loading контракт (см. AP-040).  
  **DoD:**
- Подключение redmine делается установкой рецепта + настройкой env.

### AP-040 Зафиксировать и реализовать контракт `.env` (autoload, priority, no override)

**Зависимости:** AP-006, AP-039  
**Описание:**

- Автозагрузка `.env` в repo root:
  - не перетирать уже установленные env vars,
  - единый парсер.
- Документировать список `CODEXSWARM_REDMINE_*` и приоритетов.  
  **DoD:**
- Redmine backend берёт конфиг из env корректно.

### AP-041 Реализовать `backend sync redmine` (push/pull/conflicts)

**Зависимости:** AP-039, AP-040  
**Описание:**

- `backend sync redmine --direction push|pull`
- `--conflict diff|prefer-local|prefer-remote|fail`
- `--yes` для write операций.  
  **DoD:**
- Контракт‑тесты с mock Redmine.

### AP-042 Интеграционные тесты parity: golden fixtures из Python репо

**Зависимости:** AP-011, AP-021, AP-022, AP-041  
**Описание:**

- Вынести фикстуры из Python repo:
  - README задач,
  - tasks.json,
  - примеры PR артефактов.
- Golden tests на ключевые форматы.  
  **DoD:**
- CI ловит дрейф форматов.

### AP-043 Документация v1 (Node-first) + “breaking changes”

**Зависимости:** AP-026, AP-023, AP-029, AP-041  
**Описание:**

- Гайды:
  - install (`npx`, `-g`),
  - init (interactive + flags),
  - direct/branch_pr + mode switch,
  - recipes (list/install/info),
  - upgrade,
  - redmine/viewer как рецепты.
- One-pager breaking changes:
  - `.agent-plane` больше не поддерживается,
  - Python больше не нужен.  
    **DoD:**
- Документация достаточна для нового пользователя.

### AP-044 Релизная подготовка v1.0 (hardening)

**Зависимости:** AP-043  
**Описание:**

- Логи, UX ошибок, `--json` режим.
- Стабилизация help/вывода.
- Smoke E2E в CI: init → task → direct finish → install viewer → list recipes → mode switch → work start.  
  **DoD:**
- Release candidate готов к публикации в npm.

---

## 6) Милestones (контрольные точки)

- **M0:** AP-001…AP-006 (CLI + config + project resolver)
- **M1:** AP-008…AP-012 (tasks engine + export + lint)
- **M2:** AP-013…AP-019 (guard/hooks/commit + direct workflow)
- **M3:** AP-020…AP-024 (branch_pr workflow end-to-end)
- **M4:** AP-025…AP-028 (IDE sync + init + upgrade)
- **M5:** AP-029…AP-038 (recipes manager + viewer recipe)
- **M6:** AP-039…AP-041 (redmine backend + enable recipe)
- **M7:** AP-042…AP-044 (parity tests + docs + release)

---

## 7) Риски v1 (что может сломать перенос)

- Дрейф форматов README/tasks.json → лечится golden tests (AP-042).
- Непредсказуемость hooks при `npx` → лечится shim-стратегией (AP-016).
- Рецепты как исполняемый код → в v1 только предупреждения и явные permissions в манифесте (AP-037), sandbox — v2.
- Переключение режима workflow → лечится явной командой mode set + e2e tests (AP-007).
