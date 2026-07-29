# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- Замороженный пакет не подтверждает заявленный успешный прямой golden-path запуск на оцениваемом SHA: observed-checks содержит пустые verification_records и runner_history, а direct_supervision равен null. README перечисляет внешние артефакты из cache, но они не включены в замороженный evidence-набор и их целостность не подтверждена work order.
- Патч повышает допустимый clone baseline после ранее зафиксированного падения ci:contract, но замороженные доказательства не показывают повторного одобрения этого изменения критерия приемки. Успешный прогон после ослабления порога не доказывает отсутствие материального drift.
- Патч содержит типы human_input_required и wait_required, но замороженный diff не показывает тестов этих остановок, evaluator blocked/human_review и ограниченных retry-сценариев. Проверены approval, missing knowledge, rework, scope violation и adapter crash, поэтому отрицательное покрытие заявленного Scope неполно.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-064133234-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221850-0SFMS7/README.md
- .agentplane/policy/dod.code.md
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-064133234-recovery-context/evaluator-diff.patch
- .agentplane/policy/dod.core.md

## Missing Tests
- Интеграционные сценарии direct supervisor для route kind=human_input и route kind=wait с доказательством, что EXECUTOR не запускается и возвращается корректный typed stop.
- Сценарии EVALUATOR verdict=blocked и verdict=human_review, включая сохранение recovery_context и отсутствие verify/finish после остановки.
- Сценарий ограниченного retry после безопасно завершённой операции и сценарий запрета retry при неизвестном исходе.
- Замороженная проверка, связывающая наблюдаемый live golden-path trace и результаты всех обязательных команд непосредственно с evaluated_sha.

## Hidden Assumptions
- Текстовое утверждение TESTER в README считается эквивалентным замороженным и хешированным runtime-артефактам, хотя referenced cache-файлы отсутствуют в work_order.evidence.
- Повышение clone baseline не меняет критерий приемки и поэтому не требует повторного одобрения.
- Обобщённое отображение route kind в stop code достаточно доказывает waits, human input и retry semantics без отдельных тестов.

## Residual Risks
- Следующий исполнитель должен сформировать новый замороженный evidence-набор с direct_supervision, runner_history и verification_records для SHA 40ea12e7fe716282262ab1917bb739a3ea06f4a0, включить хешированные live golden-path и check-артефакты, получить явное повторное одобрение изменения clone baseline либо исключить его из патча, затем добавить отрицательные тесты wait/human/retry и blocked/human_review перед повторной оценкой.
