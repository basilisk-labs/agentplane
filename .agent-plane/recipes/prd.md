# Универсальные Recipes для agent-plane: манифест v1, компиляция сценариев и helper-CLI для IDE (с дорожной картой к полноценному CLI)

> Статус: проектное ТЗ / спецификация реализации.

## 1. Контекст и цель

Нужно реализовать **универсальный формат recipes** и **helper-скрипт** (CLI-интерфейс, вызываемый IDE и агентами внутри IDE), который:

1) **Сканирует** установленные рецепты в репозитории и формирует **единый inventory**.
2) По запросу **компилирует** выбранный сценарий рецепта в *bundle*:
   - **скомпилированный сценарий** (Markdown prompt) с подставленными входами;
   - **контекст** (список/сниппеты файлов, контроль размера, хэши);
   - **объяснение**, какие инструменты нужны и **как их запускать**;
   - список ожидаемых **артефактов** (outputs) и политики безопасности.

Сейчас интеграция идёт через **IDE UI**, позже будет добавлен полноценный **CLI runner**. Ключевая идея — **один manifest** и **одна модель данных**, которые подходят обоим режимам.


## 2. Базовые инварианты (не обсуждаются)

Эти правила считаются внешним контрактом системы (см. `AGENTS.md` текущей версии) и влияют на дизайн recipes:

1) **Весь workflow локальный**, внутри репозитория, открытого в IDE; удалённого рантайма нет.
2) **ORCHESTRATOR — единственный агент**, который может инициировать start-of-run.
3) **Task/Git guardrails** и операции с задачами выполняются **только через** `python .agent-plane/agentctl.py`.
4) **Нельзя вручную редактировать** `.agent-plane/tasks.json`; любые записи туда — только `agentctl`.
5) **Нельзя выдумывать внешние факты**; отсутствующие входы должны приводить к `Pending Actions`, а не к генерации данных.

Следствие: helper-CLI для recipes **не должен**:
- сам начинать “выполнение” или менять задачи;
- писать в task-структуры;
- ходить в сеть;
- неявно менять рабочие файлы.


## 3. Термины

- **Recipe (рецепт)** — самодостаточный workflow bundle: manifest + scenarios + tools.
- **Scenario (сценарий)** — Markdown prompt, который задаёт шаги, входы/выходы и обработку ошибок.
- **Tool (инструмент)** — локальный скрипт/команда, которую можно запускать для реализации сценария.
- **Inventory** — единый JSON-файл со списком установленных рецептов для discovery.
- **Compile (компиляция)** — превращение *scenario + inputs + context policy* в воспроизводимый **bundle**.
- **Bundle** — результат компиляции (машиночитаемый JSON + опционально human-readable Markdown), который IDE/агенты используют как “инструкцию выполнения”.


## 4. Директория recipes (на диске)

```
.agent-plane/
  recipes/
    _helpers/
      ... (опционально, generic helpers)
    <recipe-slug>/
      manifest.json
      README.md
      scenarios/
        <scenario-id>.md
        <scenario-id>.inputs.json   (рекомендуется)
      tools/
        ... (wrappers, vendor)
```

Требования:
- Рецепт **самодостаточен**: кроме env и файлов репо, ничего не требуется.
- Любые скрипты рецепта живут в `tools/`.
- Сценарии живут в `scenarios/`.


## 5. Универсальный manifest: `recipe-manifest@1`

### 5.1. Общая форма

Файл: `.agent-plane/recipes/<slug>/manifest.json`

Рекомендуемое начало файла:

```json
{
  "$schema": "./.agent-plane/schemas/recipe-manifest@1.schema.json",
  "schema_version": "recipe-manifest@1",
  ...
}
```

**Принцип:** один manifest поддерживает и IDE-интеграцию, и CLI-раннер — через блок `entrypoints`.


### 5.2. Поля manifest (нормализованная спецификация)

#### A) Идентичность
- `schema_version` (required): строка версии схемы, строго `recipe-manifest@1`.
- `slug` (required): имя папки рецепта, **должно совпадать** с `<recipe-slug>`.
- `name` (required): человекочитаемое имя.
- `summary` (required): 1 строка.
- `tags` (required): массив строк.
- `version` (optional): semver.

#### B) Entrypoints
`entrypoints` (required): объект с профилями запуска.

- `entrypoints.ide` (optional for future, но рекомендуется сейчас):
  - `action_id` (required): команда IDE, например `codexSwarm.recipe.run`.
  - `ui.form` (optional): путь к файлу schema формы (обычно `scenarios/<scenario>.inputs.json`).

- `entrypoints.cli` (optional сейчас, required когда появится runner):
  - `command` (required): команда, которая запускает wrapper.
  - `args_contract` (required): контракт аргументов. Для универсальности — `json-file`.

**Почему `json-file`:**
- IDE может передавать inputs без проблем с quoting/shell.
- CLI runner позже может делать то же самое.

#### C) Scenarios
`scenarios` (required): список сценариев.

Каждый сценарий:
- `id` (required): идентификатор (например `company`).
- `path` (required): относительный путь от корня рецепта, например `scenarios/company.md`.
- `title` (optional): если не задан, берём из первого `# Heading` в Markdown.
- `inputs_schema` (optional, strongly recommended): JSON schema формы.
- `outputs` (optional): список ожидаемых артефактов:
  - `id` (required)
  - `path_template` (required)
  - `description` (optional)
- `required_agents` (optional): список профилей агентов.

#### D) Tools
`tools` (optional): список инструментов, которые используются рецептом.

Каждый tool:
- `id` (required): короткий id.
- `type` (required): `node | python | shell | binary`.
- `command` (required): строка команды.
- `cwd` (optional): рабочая директория (по умолчанию корень рецепта).
- `reads` (optional): allowlist путей/глобов чтения.
- `writes` (optional): allowlist путей/глобов записи.
- `network` (optional): `deny | allow` (default: `deny`).
- `env` (optional): список env-ключей, которые tool читает (подмножество manifest.env).
- `how_to_run` (optional): человекочитаемая инструкция.
- `timeout_sec` (optional): лимит.

**Важно:** `tools` — декларативный план, а не место для бизнес-логики.

#### E) Env
`env` (optional): список required env keys (только ключи, без значений).

#### F) Context
`context` (optional): правила включения файлов в bundle.

- `include` (optional): glob-шаблоны для включения.
- `exclude` (optional): glob-шаблоны исключений.
- `max_files` (optional): лимит.
- `max_total_bytes` (optional): лимит.
- `max_file_bytes` (optional): лимит на файл.
- `inline_policy` (optional):
  - `mode`: `references_only | inline_small | inline_with_snippets`
  - `inline_max_bytes`: порог инлайна.
  - `snippet_lines`: сколько строк у сниппета.

Рекомендуемые дефолты:
- exclude: `.env`, `**/*.key`, `**/*secret*`, `.agent-plane/tasks/**`, `.git/**`.

#### G) Requires
`requires` (optional): метаданные зависимостей:
- `mcp`: список провайдеров
- `services`: локальные/удалённые сервисы (только как metadata)
- `features`: capability flags

#### H) Safety
`safety` (optional): политика безопасности.

Рекомендуемые флаги:
- `no_invented_inputs`: true
- `no_network_by_default`: true
- `writes_must_match_manifest`: true
- `forbid_paths`: список опасных путей (`~`, `/etc`, `C:\Windows`, …)


### 5.3. Пример manifest (минимально полный)

```json
{
  "$schema": "./.agent-plane/schemas/recipe-manifest@1.schema.json",
  "schema_version": "recipe-manifest@1",
  "slug": "research-company",
  "name": "Research company",
  "summary": "Collects company data and produces a synthesis report",
  "tags": ["research", "company"],
  "version": "0.1.0",

  "entrypoints": {
    "ide": {
      "action_id": "codexSwarm.recipe.run",
      "ui": { "form": "scenarios/company.inputs.json" }
    },
    "cli": {
      "command": "node .agent-plane/recipes/research-company/tools/run-company.js",
      "args_contract": "json-file"
    }
  },

  "scenarios": [
    {
      "id": "company",
      "path": "scenarios/company.md",
      "inputs_schema": "scenarios/company.inputs.json",
      "outputs": [
        { "id": "report", "path_template": "/deals/<slug>/research/<date>-<company>.md" }
      ],
      "required_agents": ["company-researcher", "synthesizer"]
    }
  ],

  "tools": [
    {
      "id": "run",
      "type": "node",
      "command": "node tools/run-company.js",
      "cwd": ".agent-plane/recipes/research-company",
      "writes": ["/deals/<slug>/research/"],
      "network": "deny",
      "how_to_run": "Run in the repo terminal; verify output path exists"
    }
  ],

  "env": ["DATABASE_URL", "PERPLEXITY_API_KEY"],

  "context": {
    "include": ["README.md", "docs/**/*.md", ".agent-plane/config.json"],
    "exclude": [".agent-plane/tasks/**", ".env", ".git/**"],
    "max_files": 200,
    "max_total_bytes": 2000000,
    "max_file_bytes": 200000,
    "inline_policy": { "mode": "inline_small", "inline_max_bytes": 20000, "snippet_lines": 80 }
  },

  "safety": {
    "no_invented_inputs": true,
    "no_network_by_default": true,
    "writes_must_match_manifest": true
  }
}
```


## 6. Контракт сценария (Scenario Markdown)

Сценарий — это **канонический prompt**, а не “описание”. Он должен быть самодостаточным.

### 6.1. Обязательные секции (рекомендуемый шаблон)

```md
# <Scenario Title>

## Required inputs
- company: string (legal name)
- date: string (YYYY-MM-DD) [optional; default: today]

## Agents
- company-researcher: collects facts
- synthesizer: writes report

## Context
- Must read: @README.md, @docs/...

## Steps
1) ...

## Outputs
- /deals/<slug>/research/<date>-<company>.md

## Failure handling
- If required input is missing, output "Pending Actions" with the list of missing fields.
```

### 6.2. Принцип “не выдумывать”
- Если вход отсутствует — сценарий **не генерирует** фиктивные данные.
- Должен быть сформирован раздел `Pending Actions`.


## 7. Inputs schema (для IDE форм и валидации)

Файл: `.agent-plane/recipes/<slug>/scenarios/<scenario>.inputs.json`

Это **JSON Schema** (draft 2020-12 или draft-07 — выбрать один и зафиксировать).

### 7.1. Минимальный пример

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "company": { "type": "string", "minLength": 1, "title": "Company" },
    "date": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$", "title": "Date" }
  },
  "required": ["company"],
  "additionalProperties": false
}
```

### 7.2. UI-расширения

Если IDE extension поддерживает UI-хинты, можно использовать расширения типа:
- `x-ui: { widget: "textarea", placeholder: "..." }`
- `x-order`, `x-group`

Важно: UI-хинты должны быть **опциональными** и не ломать JSON Schema.


## 8. Inventory (единый список рецептов)

### 8.1. Назначение
- IDE и агенты читают **один файл** вместо сканирования всей директории.
- Inventory — **генерируемый артефакт**, источник истины — manifests.

### 8.2. Путь по умолчанию
- `docs/recipes-inventory.json` (человекоориентированно)
- опционально: `.agent-plane/cache/recipes-inventory.json` (для IDE, не в git)

### 8.3. Схема inventory (минимум)

```json
{
  "generated_at": "2026-01-19T14:00:00Z",
  "schema_version": "recipes-inventory@1",
  "recipes": [
    {
      "slug": "research-company",
      "name": "Research company",
      "summary": "...",
      "tags": ["..."],
      "version": "0.1.0",
      "entrypoints": { "ide": {...}, "cli": {...} },
      "scenarios": [
        { "id": "company", "path": "...", "title": "...", "inputs_schema": "..." }
      ],
      "tools": [ { "id": "run", "type": "node", "command": "..." } ],
      "requires": { "mcp": [], "services": [], "features": [] },
      "env": ["DATABASE_URL", "PERPLEXITY_API_KEY"]
    }
  ]
}
```

### 8.4. Правила генерации

Сканер:
- перечисляет `.agent-plane/recipes/*/manifest.json`
- валидирует JSON
- валидирует `slug` == имя директории
- нормализует относительные пути
- для каждого scenario:
  - если `title` отсутствует, читает первый Markdown heading `# ...`

Ошибки:
- invalid JSON → exit non-zero
- schema violation → exit non-zero


## 9. Bundle: “скомпилированный сценарий” для IDE/агентов

### 9.1. Зачем нужен bundle

Bundle решает сразу 4 задачи:
1) Убирает двусмысленность “что запускать”.
2) Замораживает входы/контекст для воспроизводимости.
3) Даёт агенту строгое описание инструментов и ограничений.
4) Позволяет IDE показать человеку внятный “dry run”.


### 9.2. Формат `bundle.json` (recipe-bundle@1)

```json
{
  "bundle_version": "recipe-bundle@1",
  "generated_at": "...",
  "recipe": { "slug": "...", "version": "..." },
  "scenario": { "id": "...", "title": "...", "path": "..." },

  "inputs": { "...": "..." },

  "env_required": ["..."],
  "env_missing": ["..."],

  "context": {
    "policy": { "include": [], "exclude": [], "max_files": 200, "...": "..." },
    "files": [
      {
        "path": "docs/foo.md",
        "sha256": "...",
        "size": 1234,
        "mode": "inline|snippet|reference",
        "content": "...optional...",
        "snippet": "...optional..."
      }
    ],
    "warnings": ["Skipped binary file ...", "Truncated ..."]
  },

  "compiled_prompt_md": "# ...\n...",

  "tool_plan": [
    {
      "tool_id": "run",
      "type": "node",
      "command": "node tools/run-company.js",
      "cwd": ".agent-plane/recipes/research-company",
      "network": "deny",
      "writes_allowlist": ["/deals/<slug>/research/"],
      "reads_allowlist": ["README.md", "docs/**"],
      "timeout_sec": 900,
      "how_to_run": "..."
    }
  ],

  "outputs_expected": [
    { "id": "report", "path_template": "/deals/<slug>/research/<date>-<company>.md" }
  ],

  "pending_actions": ["Set PERPLEXITY_API_KEY"],

  "safety": {
    "no_invented_inputs": true,
    "writes_must_match_manifest": true,
    "no_network_by_default": true
  }
}
```

### 9.3. Опциональный `bundle.md`

Для людей полезно генерировать `bundle.md` рядом:
- Summary
- Inputs
- Env missing
- Context list
- Tool plan (как запускать)
- Outputs
- Pending Actions


## 10. Helper CLI: `recipes.py` (дополнение к agentctl)

### 10.1. Путь и статус

Файл:
- `.agent-plane/recipes.py`

Запуск:
- `python .agent-plane/recipes.py <command> ...`

Важно: это CLI-интерфейс для IDE/агентов, но он **не предназначен** как “пользовательский CLI workflow”.


### 10.2. Команды (MVP)

#### A) `scan`
Сканировать recipes и собрать inventory.

```
python .agent-plane/recipes.py scan \
  --recipes-dir .agent-plane/recipes \
  --output docs/recipes-inventory.json
```

Флаги:
- `--recipes-dir` (default: `.agent-plane/recipes`)
- `--output` (default: `docs/recipes-inventory.json`)
- `--strict` (default: true): любая ошибка валит процесс

Выход:
- JSON inventory

#### B) `show`
Показать нормализованный manifest (для дебага IDE).

```
python .agent-plane/recipes.py show research-company --json
```

#### C) `compile`
Скомпилировать bundle.

```
python .agent-plane/recipes.py compile research-company \
  --scenario company \
  --inputs .agent-plane/.runs/<run-id>/inputs.json \
  --out .agent-plane/.runs/<run-id>/bundle.json \
  --out-md .agent-plane/.runs/<run-id>/bundle.md
```

Флаги:
- `--scenario` (required)
- `--inputs` (optional): JSON-файл inputs; если не задан, inputs пустые.
- `--out` (required)
- `--out-md` (optional)
- `--stdout` (optional): печатает bundle.json на stdout (удобно для IDE)
- `--validate-env` (default: true)
- `--validate-inputs` (default: true)
- `--context-mode` (optional override): `references_only|inline_small|inline_with_snippets`

#### D) `explain`
Сгенерировать человекочитаемое объяснение.

```
python .agent-plane/recipes.py explain research-company --scenario company --inputs ...
```

Использование:
- IDE показывает explain в UI.
- Агент может вставить explain в сообщение ORCHESTRATOR для согласования плана.


### 10.3. Гарантии поведения (важные)

- `scan` и `compile` **не выполняют** entrypoint и не запускают tools.
- `compile` может читать файлы репо в рамках `context` policy.
- `compile` **никогда** не пишет в `.agent-plane/tasks/**` и `.agent-plane/tasks.json`.
- Нет сетевых запросов.


### 10.4. Валидация и ошибки

Рекомендуемые exit codes:
- `0`: ok
- `2`: invalid JSON
- `3`: missing file / path resolution failure
- `4`: schema validation failed
- `5`: missing env keys
- `6`: missing required inputs (по inputs_schema)
- `7`: context policy violation (слишком много/слишком большие файлы)

`compile` должен уметь работать в режиме “мягкой ошибки”:
- не падать, а заполнять `pending_actions` и `env_missing`, если IDE хочет показать пользователю, что надо исправить.

Рекомендуемая политика:
- `--strict` (по умолчанию false для compile): если strict, то missing env/input → exit non-zero.


### 10.5. Алгоритм `compile` (референс)

1) Найти рецепт: `.agent-plane/recipes/<slug>/manifest.json`.
2) Парсинг и JSON schema validation.
3) Выбрать scenario по `--scenario`.
4) Загрузить `inputs.json` (если есть).
5) Если есть `inputs_schema`:
   - валидировать inputs;
   - собрать missing required keys в `pending_actions`.
6) Проверить `env` keys:
   - собрать `env_missing` (по `os.environ` + опционально IDE secrets bridge).
7) Собрать контекст:
   - вычислить include/exclude glob
   - фильтр: не бинарные, не слишком большие, не запрещённые
   - хэшировать `sha256` для воспроизводимости
   - применить inline_policy
8) Скомпилировать prompt:
   - взять scenario markdown
   - выполнить подстановки переменных (см. §11)
   - добавить секцию `## Compiled Context` с:
     - ссылками вида `@relative/path`
     - или inline контентом малых файлов
9) Сформировать `tool_plan` из manifest.tools
10) Сформировать outputs_expected
11) Записать bundle.json (+ bundle.md)


## 11. Правила подстановки и шаблоны путей

### 11.1. Переменные

Поддержать два источника:
1) `manifest`: `slug`, `version`
2) `inputs`: ключи из inputs.json


### 11.2. Шаблоны `path_template`

Синтаксис: `<var>`

Примеры:
- `/deals/<slug>/research/<date>-<company>.md`

Правила:
- `<slug>` всегда доступен.
- Если переменная отсутствует → не “угадывать”, а:
  - либо оставить как `<var>`
  - либо перенести в `pending_actions` (“Provide input: var”).

Санитизация:
- значения, используемые в путях, должны быть нормализованы:
  - пробелы → `-`
  - запрещённые символы → удалять/заменять
  - запрет `..`, абсолютных путей, `~`


## 12. Контекст: политика включения файлов

### 12.1. Почему это сложно

Контекст легко превращается в:
- шум (слишком много файлов),
- утечку (секреты),
- тормоза (гигабайты).

Поэтому контекст всегда управляется *policy* из manifest.


### 12.2. Рекомендованные дефолты

Если `context` отсутствует:
- `include`: `[]` (ничего не включать автоматически)
- `exclude`: `.env`, `.git/**`, `.agent-plane/tasks/**`
- `inline_policy.mode`: `references_only`


### 12.3. Детект бинарников

Упрощённая эвристика:
- если файл содержит `\0` в первых N байтах → бинарный
- если расширение из denylist (`.png`, `.jpg`, `.pdf`, `.zip`, `.bin`) → binary

Бинарники:
- включать только как reference + metadata (path/size/hash), без content.


## 13. IDE-интеграция (сегодня)

### 13.1. Архитектура

Компоненты:
1) **IDE extension** (VS Code / Cursor / Windsurf API-совместимый слой)
2) **recipes.py** как backend “recipe service”
3) **agentctl.py** для задач/гита (не часть recipe service)

IDE extension:
- вызывает `recipes.py scan` при активации/по команде
- показывает recipes/scenarios
- при запуске сценария:
  - собирает inputs через форму
  - вызывает `recipes.py compile --stdout`
  - показывает explain + pending_actions
  - после согласования плана ORCHESTRATOR:
    - либо IDE запускает tool напрямую (subprocess)
    - либо агент запускает, следуя `tool_plan`.


### 13.2. UX: основные команды

- `Agent Plane: Run Recipe…`
- `Agent Plane: Run Scenario…`
- `Agent Plane: Rebuild Recipes Inventory`
- `Agent Plane: Show Recipe Bundle (Last)`


### 13.3. Где хранить inputs и bundles

Рекомендуемая структура run-артефактов:

```
.agent-plane/
  .runs/
    <run-id>/
      inputs.json
      bundle.json
      bundle.md
      manifest.snapshot.json
      scenario.snapshot.md
      logs/
        tool.stdout.log
        tool.stderr.log
```

Важно:
- `.agent-plane/.runs/**` по умолчанию не должен попадать в git.


### 13.4. Dry-run

IDE делает `compile` и показывает:
- какие env keys отсутствуют
- какие inputs не заполнены
- список context файлов
- tool_plan
- outputs


## 14. CLI runner (позже): как добавить без ломки

Когда потребуется настоящий CLI запуск:

### 14.1. Новый `run`
Добавить в recipes.py:

```
python .agent-plane/recipes.py run <slug> --scenario <id> --inputs ...
```

Реализация `run` = `compile` + `execute`.

### 14.2. Execute (строго по tool_plan)

- Проверить env/input ещё раз.
- Проверить writes allowlist.
- Запустить `entrypoints.cli.command` или `tools[0]` (выбрать один контракт и зафиксировать).

Рекомендация:
- **execution** в отдельном модуле, чтобы IDE могла использовать его тоже.


## 15. Совместимость со старым форматом

Если сейчас есть “старые” manifests (name/summary/tags/entrypoint/scenarios):

### 15.1. Маппинг

- `entrypoint.command` → `entrypoints.cli.command`
- `entrypoint.description` → `tools[].how_to_run` (или `entrypoints.cli.description` если хотите)
- `entrypoint.response` → scenario.outputs.path_template
- `scenarios` (список путей) → `scenarios[].path` + `id` (из имени файла)
- `env` (key→template) → manifest.env (список ключей)

### 15.2. Стратегия миграции

- `recipes.py scan` умеет читать оба формата и нормализовать в inventory.
- `recipes.py show` может выводить “normalized manifest” всегда в v1.
- Полный перевод manifests делается постепенно.


## 16. Реализация `recipes.py`: структура кода

### 16.1. Модули

- `recipes.py` (entry)
- `.agent-plane/recipes_lib/` (опционально)
  - `manifest.py` (load + normalize)
  - `schema.py` (validate)
  - `context.py` (scan + hashing + inline)
  - `compile.py` (render bundle)
  - `inventory.py` (scan + write)

### 16.2. Зависимости

- Только stdlib: `argparse`, `json`, `pathlib`, `glob`, `re`, `hashlib`, `datetime`, `fnmatch`, `os`.
- JSON schema validation:
  - вариант A: vendor minimal validator (ограниченно)
  - вариант B: разрешить `jsonschema` как dev dependency (если допустимо)

Если требование “без внешних deps” строго — лучше реализовать **минимальную** валидацию (тип/required/enum) и отдельно иметь “full schema validation” в CI.


## 17. Тестирование и критерии приёмки

### 17.1. Unit tests

- parsing/normalization manifests
- slug == folder name
- scenario heading extraction
- inputs schema required keys
- path_template substitution + sanitization
- context include/exclude correctness
- binary detection

### 17.2. Integration tests

- пример рецепта в `fixtures/`
- `scan` → inventory
- `compile` → bundle
- сверка golden bundle

### 17.3. Acceptance criteria (MVP)

1) `scan` генерирует корректный inventory для всех recipes.
2) `compile` генерирует bundle.json, который содержит:
   - compiled_prompt_md
   - tool_plan
   - context list + hashes
   - env_missing/pending_actions
3) Никаких сетевых операций.
4) Никаких записей в `.agent-plane/tasks/**` и `tasks.json`.


## 18. Критический чек: что может сломаться

1) **Размер контекста**: без лимитов IDE станет медленной.
   - решение: max_files/max_total_bytes + warnings.

2) **Секреты**: случайное включение `.env`.
   - решение: жёсткий default exclude + denylist.

3) **Непереносимые команды tools** (bash-only, powershell-only).
   - решение: manifest.tools[].type + platform constraints (можно добавить `platforms: ["linux", "darwin", "win32"]`).

4) **Расхождение IDE и CLI поведения**.
   - решение: единый `compile` и единый bundle как источник истины.


## 19. Приложение A: пример `bundle.md`

```md
# Recipe bundle: research-company / company

## Inputs
- company: ACME Inc
- date: 2026-01-19

## Env
Missing:
- PERPLEXITY_API_KEY

## Context
- @README.md (sha256: ...)
- @docs/company.md (sha256: ...)

## Tool plan
1) node tools/run-company.js
   - cwd: .agent-plane/recipes/research-company
   - network: deny
   - writes: /deals/<slug>/research/

## Outputs
- /deals/<slug>/research/<date>-<company>.md

## Pending Actions
- Set PERPLEXITY_API_KEY
```


## 20. Приложение B: минимальный wrapper contract (для tools)

Если `args_contract` = `json-file`, то wrapper должен:

- принимать путь к inputs JSON (например `--inputs <file>`)
- принимать `--scenario <id>`
- НЕ хранить бизнес-логику (только загрузка scenario prompt и запуск агента/оркестратора)

Пример интерфейса:

```bash
node tools/run-company.js --scenario company --inputs .agent-plane/.runs/<run-id>/inputs.json
```


---

**Конец спецификации.**
