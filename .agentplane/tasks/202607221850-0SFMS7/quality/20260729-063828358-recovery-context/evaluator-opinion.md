# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- Для оцениваемого SHA нет замороженного доказательства успешного прямого golden-path запуска и обязательных проверок: verification_records и runner_history пусты, direct_supervision равен null, а последняя запись verification=ok не содержит результатов проверок.
- Сравнение с baseline 0.6.24 не измеряет фактический кандидат: успешный тест конструирует candidate как baseline минус один, поэтому он доказывает только работу функции сравнения, но не снижение стоимости реального golden-path запуска.
- Патч обновляет clone baseline после зафиксированного падения ci:contract, но замороженные доказательства не показывают успешный ci:contract на оцениваемом SHA и не содержат отдельного обоснования допустимости нового baseline.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-063828358-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221850-0SFMS7/README.md
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-063828358-recovery-context/evaluator-diff.patch

## Missing Tests
- Интеграционный запуск утвержденной direct-задачи на оцениваемом SHA с сохраненными receipt, runner history, direct_supervision, результатами всех declared checks, EVALUATOR pass и фактическим finish.
- Измерение candidate lifecycle_calls, tool_calls и duplicate_executor_context_bytes из реального golden-path trace с последующим сравнением с замороженным baseline 0.6.24.
- Успешный bun run ci:contract на оцениваемом SHA после изменения clone baseline с проверкой происхождения новых baseline-значений.

## Hidden Assumptions
- Модульные тесты с моками считаются эквивалентом наблюдаемого end-to-end direct запуска.
- Искусственно заданные candidate=baseline-1 значения считаются фактическими метриками реализации.
- Обновление clone baseline допустимо без замороженного успешного ci:contract на оцениваемом SHA.

## Residual Risks
- Повторная оценка должна опираться на новый замороженный work order, содержащий фактический direct golden-path trace для финального SHA, непустые verification_records/runner_history/direct_supervision, успешные результаты всех четырех declared checks и измеренные candidate-метрики вместо синтетических baseline-minus-one значений.
