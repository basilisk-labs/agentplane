# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Каноническая проверка создаётся и перезаписывается до получения эксклюзивной блокировки выбора. Параллельный запуск может заменить файл проверки после того, как победивший запуск вычислил его digest для source pack, поэтому задача CURATOR получает изменяемое или несогласованное доказательство.

## Evidence
- .agentplane/tasks/202607221852-WF8A0X/quality/20260730-174539004-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221852-WF8A0X/README.md

## Missing Tests
- Параллельный тест, который принудительно чередует запись canonical-check, вычисление source-row digest и получение selection lock, затем подтверждает, что source-set.lock.json и CURATOR task pack ссылаются на точный digest фактически сохранённой проверки.
- Проверка полного опубликованного следа из Verify Step 4: source refs, исходное решение task/PR, результат CURATOR и apply receipt после транзакционного применения.

## Hidden Assumptions
- Запуски, конкурирующие за одно предложение, сформируют байтово одинаковый canonical-check, хотя checked_at делает содержимое различным.
- Файл canonical-check не изменится между вычислением его digest и материализацией CURATOR task pack.
- Существующие критические тесты покрывают полный publication audit, хотя замороженная запись явно перечисляет только проверки proposal/context и общую CLI-совместимость.

## Residual Risks
- Перенести создание и фиксацию canonical-check под ту же эксклюзивную lease-блокировку, которая защищает выбор, либо создавать content-addressed неизменяемый снимок и атомарно связывать с ним selection receipt и CURATOR source pack. После этого добавить детерминированный тест указанного межпроцессного чередования и проверку полного apply receipt.
