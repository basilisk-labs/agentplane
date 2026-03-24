**Факты**
- В [base-prompts.test.ts](/Users/densmirnov/Github/agentplane/packages/agentplane/src/runner/context/base-prompts.test.ts#L80) добавлен один новый регрессионный `expect`, который фиксирует точную строку framework runner prompt про запрет рекурсивного вызова `agentplane task run` и `agentplane scenario execute`.
- Лишних правок нет: `git diff --stat` показывает только `packages/agentplane/src/runner/context/base-prompts.test.ts` с `3 insertions(+)`.

**Проверка**
- `bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts` -> `PASS`, `3 tests passed`.
- `git diff --stat` -> только целевой тестовый файл.

**Критическая проверка**
- Слабое место было в формулировке: первая версия ассерта проверяла мой пересказ, а не точный текст prompt. Исправлено на фактическую строку из `RUNNER.md`.
- Task metadata не трогал, потому что bootstrap bundle прямо запрещает lifecycle-изменения вне явного запроса.